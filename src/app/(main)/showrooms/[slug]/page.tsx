import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { Showroom } from "@/types/showrooms.types"
import { ShowroomDetail } from "@/components/showroom/showroomDetailNew"

interface ShowroomPageProps {
  params: Promise<{ slug: string }>
}

type RawShowroom = Record<string, any>

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const DAY_ALIAS_TO_INDEX: Record<string, number> = {
  sun: 0,
  sunday: 0,
  mon: 1,
  monday: 1,
  tue: 2,
  tues: 2,
  tuesday: 2,
  wed: 3,
  weds: 3,
  wednesday: 3,
  thu: 4,
  thur: 4,
  thurs: 4,
  thursday: 4,
  fri: 5,
  friday: 5,
  sat: 6,
  saturday: 6,
}

function getShowroomApiUrls(pathSuffix = "") {
  const configuredBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")
  const urlsToTry: string[] = []

  if (configuredBase) {
    if (configuredBase.endsWith("/api/v1")) {
      urlsToTry.push(`${configuredBase}/showrooms${pathSuffix}`)
    } else if (configuredBase.endsWith("/api")) {
      urlsToTry.push(`${configuredBase}/v1/showrooms${pathSuffix}`)
    } else {
      urlsToTry.push(`${configuredBase}/api/v1/showrooms${pathSuffix}`)
      urlsToTry.push(`${configuredBase}/showrooms${pathSuffix}`)
    }
  }

  urlsToTry.push(`https://lomashwood-backend.vercel.app/api/v1/showrooms${pathSuffix}`)

  return Array.from(new Set(urlsToTry))
}

function normalizeImage(value: unknown) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return ""
  }
  return value
}

function getCurrentWeekMonday() {
  const now = new Date()
  const monday = new Date(now)
  const currentDay = now.getDay()
  const distanceFromMonday = (currentDay + 6) % 7
  monday.setDate(now.getDate() - distanceFromMonday)
  monday.setHours(0, 0, 0, 0)
  return monday
}

function getDayIndex(dayValue: unknown) {
  const normalized = String(dayValue || "").trim().toLowerCase()
  return DAY_ALIAS_TO_INDEX[normalized]
}

function getDateForDayIndex(dayIndex: number) {
  const monday = getCurrentWeekMonday()
  const offset = (dayIndex + 6) % 7
  const date = new Date(monday)
  date.setDate(monday.getDate() + offset)

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
  }).format(date)
}

function normalizeOpeningHours(items: unknown) {
  if (!Array.isArray(items)) {
    return [] as Showroom["openingHours"]
  }

  return items.map((item: any) => {
    const dayIndex = getDayIndex(item?.day)
    const normalizedDay =
      typeof dayIndex === "number"
        ? DAY_NAMES[dayIndex]
        : String(item?.day || "")

    const normalizedDate =
      typeof dayIndex === "number"
        ? getDateForDayIndex(dayIndex)
        : String(item?.date || "")

    return {
      day: normalizedDay,
      date: normalizedDate,
      hours: String(item?.hours || "Closed"),
    }
  })
}

function mapShowroom(raw: RawShowroom): Showroom {
  return {
    slug: String(raw?.slug || ""),
    name: String(raw?.name || ""),
    city: String(raw?.city || ""),
    address: String(raw?.address || ""),
    postcode: String(raw?.postcode || ""),
    phone: String(raw?.phone || ""),
    email: String(raw?.email || ""),
    image: normalizeImage(raw?.image),
    coordinates:
      typeof raw?.latitude === "number" && typeof raw?.longitude === "number"
        ? { lat: raw.latitude, lng: raw.longitude }
        : raw?.coordinates,
    openToday: String(raw?.openToday || "Closed"),
    facilities: Array.isArray(raw?.facilities)
      ? raw.facilities.filter((item: unknown): item is string => typeof item === "string")
      : [],
    team: Array.isArray(raw?.team)
      ? raw.team.map((member: any) => ({
          name: String(member?.name || member?.fullName || "Team Member"),
          role: String(member?.role || member?.designation || "Design Consultant"),
        }))
      : [],
    kitchensOnDisplay: Array.isArray(raw?.displayProducts)
      ? raw.displayProducts.reduce<Showroom["kitchensOnDisplay"]>((acc, entry: any) => {
          const product = entry?.product
          if (!product) return acc

          acc.push({
            name: String(product?.title || "Display Product"),
            image: normalizeImage(product?.image || raw?.image),
            style: String(product?.style || "Kitchen"),
            isPrimary: Boolean(entry?.isPrimary),
          })

          return acc
        }, [])
      : [],
    openingHours: normalizeOpeningHours(raw?.openingHours),
    nearbyStores: Array.isArray(raw?.nearbyStores)
      ? raw.nearbyStores.filter((item: unknown): item is string => typeof item === "string")
      : [],
  }
}

async function fetchShowroomList() {
  for (const url of getShowroomApiUrls()) {
    try {
      const res = await fetch(url, { next: { revalidate: 3600 } })
      if (!res.ok) continue

      const payload = await res.json()
      const rows = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload)
          ? payload
          : []

      if (rows.length > 0) {
        return rows as RawShowroom[]
      }
    } catch {
      continue
    }
  }

  return [] as RawShowroom[]
}

async function fetchShowroomById(id: string) {
  for (const url of getShowroomApiUrls(`/${id}`)) {
    try {
      const res = await fetch(url, { next: { revalidate: 3600 } })
      if (!res.ok) continue
      const payload = await res.json()
      if (payload && typeof payload === "object") {
        return payload as RawShowroom
      }
    } catch {
      continue
    }
  }

  return null
}

async function getShowroomData(slug: string) {
  const allRawShowrooms = await fetchShowroomList()
  const matchedFromList = allRawShowrooms.find((row) => String(row?.slug || "") === slug)
  if (!matchedFromList) return null

  const detailedRaw = matchedFromList?.id
    ? (await fetchShowroomById(String(matchedFromList.id))) ?? matchedFromList
    : matchedFromList

  const knownShowroomIds = new Set(
    allRawShowrooms
      .map((row) => String(row?.id || "").toLowerCase())
      .filter((id) => id.length > 0)
  )

  const nearbyIds = Array.isArray(detailedRaw?.nearbyStores)
    ? detailedRaw.nearbyStores.map((item: unknown) => String(item || "").toLowerCase().trim())
    : []

  const invalidNearbyValues = nearbyIds.filter((value) => value.length > 0 && !knownShowroomIds.has(value))
  if (invalidNearbyValues.length > 0) {
    console.warn(
      `[showrooms] Invalid nearbyStores values for slug "${slug}". Expected showroom ids, received: ${invalidNearbyValues.join(
        ", "
      )}`
    )
  }

  const nearbyMapped = allRawShowrooms
    .filter((row) => {
      const id = String(row?.id || "").toLowerCase()
      const rowSlug = String(row?.slug || "").toLowerCase()
      const isCurrent = rowSlug === slug.toLowerCase()
      if (isCurrent) return false
      return nearbyIds.includes(id)
    })
    .map(mapShowroom)

  return {
    showroom: mapShowroom(detailedRaw),
    nearbyStores: nearbyMapped,
  }
}

export async function generateStaticParams() {
  const allRawShowrooms = await fetchShowroomList()
  return allRawShowrooms
    .map((row) => String(row?.slug || ""))
    .filter((slug) => slug.length > 0)
    .map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: ShowroomPageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await getShowroomData(slug)
  const showroom = result?.showroom

  if (!showroom) {
    return { title: "Showroom Not Found | Lomash Wood" }
  }

  return {
    title: `Kitchen & Bedroom Showrooms ${showroom.city} | Lomash Wood`,
    description: `Visit the Lomash Wood showroom in ${showroom.city}. See premium kitchen and bedroom displays, meet our expert designers, and book a free consultation. ${showroom.address}, ${showroom.postcode}.`,
  }
}

export default async function ShowroomPage({ params }: ShowroomPageProps) {
  const { slug } = await params
  const result = await getShowroomData(slug)
  const showroom = result?.showroom

  if (!showroom) {
    notFound()
  }

  return (
    <>
      <main>
        <ShowroomDetail showroom={showroom} nearbyStores={result?.nearbyStores ?? []} />
      </main>
    </>
  )
}
