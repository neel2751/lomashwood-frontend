import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getShowroomBySlug, showrooms } from "@/types/showrooms.types"
import { ShowroomDetail } from "@/components/showroom/showroomDetailNew"

interface ShowroomPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return showrooms.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: ShowroomPageProps): Promise<Metadata> {
  const { slug } = await params
  const showroom = getShowroomBySlug(slug)

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
  const showroom = getShowroomBySlug(slug)

  if (!showroom) {
    notFound()
  }

  return (
    <>
      <main>
        <ShowroomDetail showroom={showroom} />
      </main>
    </>
  )
}
