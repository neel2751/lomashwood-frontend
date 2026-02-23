"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Upload,
  X,
  Check,
  Camera,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

const Label = ({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
);



const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be 6 digits").optional(),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  company: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  initialData?: Partial<ProfileFormData>;
  avatar?: string;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  onAvatarChange?: (file: File) => Promise<void>;
  className?: string;
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export default function ProfileForm({
  initialData,
  avatar,
  onSubmit,
  onAvatarChange,
  className,
}: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(avatar || null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      dateOfBirth: initialData?.dateOfBirth || "",
      gender: initialData?.gender || undefined,
      address: initialData?.address || "",
      city: initialData?.city || "",
      state: initialData?.state || "",
      pincode: initialData?.pincode || "",
      bio: initialData?.bio || "",
      website: initialData?.website || "",
      company: initialData?.company || "",
    },
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        variant: "error",
        title: "Invalid file type",
        description: "Please upload an image file",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "error",
        title: "File too large",
        description: "Image must be less than 5MB",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    if (onAvatarChange) {
      setIsUploadingAvatar(true);
      try {
        await onAvatarChange(file);
        toast({
          title: "Avatar updated",
          description: "Your profile picture has been updated successfully",
        });
      } catch (error) {
        toast({
          variant: "error",
          title: "Upload failed",
          description: "Failed to upload avatar. Please try again.",
        });
        setAvatarPreview(avatar || null);
      } finally {
        setIsUploadingAvatar(false);
      }
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    // Reset file input
    const fileInput = document.getElementById("avatar-upload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const onFormSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error) {
      toast({
        variant: "error",
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = () => {
    const firstName = form.watch("firstName");
    const lastName = form.watch("lastName");
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)} className={cn("space-y-6", className)}>
      {/* Avatar Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Update your profile picture</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarPreview || undefined} />
                <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
              </Avatar>
              {isUploadingAvatar && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                </div>
              )}
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
              >
                <Camera className="h-4 w-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="sr-only"
                  disabled={isUploadingAvatar}
                />
              </label>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Upload a new photo</p>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG or GIF. Max size 5MB.
                </p>
              </div>
              <div className="flex gap-2">
                <label htmlFor="avatar-upload">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isUploadingAvatar}
                    asChild
                  >
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </span>
                  </Button>
                </label>
                {avatarPreview && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveAvatar}
                    disabled={isUploadingAvatar}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                {...form.register("firstName")}
                placeholder="John"
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                {...form.register("lastName")}
                placeholder="Doe"
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="john.doe@example.com"
                  className="pl-9"
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  {...form.register("phone")}
                  placeholder="9876543210"
                  maxLength={10}
                  className="pl-9"
                />
              </div>
              {form.formState.errors.phone && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...form.register("dateOfBirth")}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="male"
                    value="male"
                    checked={form.watch("gender") === "male"}
                    onChange={(e) => form.setValue("gender", e.target.value as "male" | "female" | "other" | "prefer-not-to-say")}
                    className="h-4 w-4 rounded-full border border-primary text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                  <Label htmlFor="male" className="cursor-pointer">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="female"
                    value="female"
                    checked={form.watch("gender") === "female"}
                    onChange={(e) => form.setValue("gender", e.target.value as "male" | "female" | "other" | "prefer-not-to-say")}
                    className="h-4 w-4 rounded-full border border-primary text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                  <Label htmlFor="female" className="cursor-pointer">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="other"
                    value="other"
                    checked={form.watch("gender") === "other"}
                    onChange={(e) => form.setValue("gender", e.target.value as "male" | "female" | "other" | "prefer-not-to-say")}
                    className="h-4 w-4 rounded-full border border-primary text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                  <Label htmlFor="other" className="cursor-pointer">Other</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              {...form.register("bio")}
              placeholder="Tell us about yourself..."
              rows={4}
              maxLength={500}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Optional</span>
              <span>{form.watch("bio")?.length || 0}/500</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle>Address Information</CardTitle>
          <CardDescription>Your primary address details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="address"
                {...form.register("address")}
                placeholder="House/Flat No., Street, Area"
                rows={2}
                className="pl-9"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" {...form.register("city")} placeholder="Mumbai" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <select
                value={form.watch("state")}
                onChange={(e) => form.setValue("state", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select state</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                {...form.register("pincode")}
                placeholder="400001"
                maxLength={6}
              />
              {form.formState.errors.pincode && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.pincode.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>Optional professional details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                {...form.register("company")}
                placeholder="Company Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                {...form.register("website")}
                placeholder="https://example.com"
              />
              {form.formState.errors.website && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.website.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          <span className="text-destructive">*</span> Required fields
        </p>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isSubmitting}
            className="flex-1 sm:flex-initial"
          >
            Reset
          </Button>
          <Button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-initial">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}