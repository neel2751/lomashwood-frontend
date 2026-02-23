"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import api from "@/lib/api";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  appointmentReminders: z.boolean(),
  orderUpdates: z.boolean(),
  newsletterSubscription: z.boolean(),
});

const preferencesSchema = z.object({
  language: z.string(),
  currency: z.string(),
  measurementUnit: z.enum(["metric", "imperial"]),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;
type NotificationFormValues = z.infer<typeof notificationSchema>;
type PreferencesFormValues = z.infer<typeof preferencesSchema>;

interface UserSettings {
  notifications: NotificationFormValues;
  preferences: PreferencesFormValues;
}

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery<UserSettings>({
    queryKey: ["user-settings"],
    queryFn: async () => {
      const response = await api.get("/user/settings");
      return response.data;
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    values: settings?.notifications || {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
      appointmentReminders: true,
      orderUpdates: true,
      newsletterSubscription: false,
    },
  });

  const preferencesForm = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesSchema),
    values: settings?.preferences || {
      language: "en",
      currency: "INR",
      measurementUnit: "metric",
    },
  });

  const passwordMutation = useMutation({
    mutationFn: async (data: PasswordFormValues) => {
      await api.post("/user/change-password", data);
    },
    onSuccess: () => {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      passwordForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Failed to change password. Please try again.",
        variant: "error",
      });
    },
  });

  const notificationMutation = useMutation({
    mutationFn: async (data: NotificationFormValues) => {
      await api.put("/user/settings/notifications", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-settings"] });
      toast({
        title: "Settings saved",
        description: "Your notification preferences have been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "error",
      });
    },
  });

  const preferencesMutation = useMutation({
    mutationFn: async (data: PreferencesFormValues) => {
      await api.put("/user/settings/preferences", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-settings"] });
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "error",
      });
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      await api.delete("/user/account");
    },
    onSuccess: () => {
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      });
      window.location.href = "/";
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "error",
      });
    },
  });

  const onPasswordSubmit = (data: PasswordFormValues) => {
    passwordMutation.mutate(data);
  };

  const onNotificationSubmit = (data: NotificationFormValues) => {
    notificationMutation.mutate(data);
  };

  const onPreferencesSubmit = (data: PreferencesFormValues) => {
    preferencesMutation.mutate(data);
  };

  const handleDeleteAccount = () => {
    deleteAccountMutation.mutate();
    setDeleteDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Change Password Section */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="currentPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Current Password
              </label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  {...passwordForm.register("currentPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordForm.formState.errors.currentPassword && (
                <p className="text-sm font-medium text-destructive">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                New Password
              </label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  {...passwordForm.register("newPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Must be at least 8 characters with uppercase, lowercase, and number
              </p>
              {passwordForm.formState.errors.newPassword && (
                <p className="text-sm font-medium text-destructive">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  {...passwordForm.register("confirmPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-sm font-medium text-destructive">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={passwordMutation.isPending}
              className="w-full sm:w-auto"
            >
              {passwordMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notification Preferences Section */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose how you want to receive updates and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}
            className="space-y-6"
          >
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <label htmlFor="emailNotifications" className="text-base font-medium">
                  Email Notifications
                </label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={notificationForm.watch("emailNotifications")}
                onCheckedChange={(checked) =>
                  notificationForm.setValue("emailNotifications", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <label htmlFor="smsNotifications" className="text-base font-medium">
                  SMS Notifications
                </label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via text message
                </p>
              </div>
              <Switch
                id="smsNotifications"
                checked={notificationForm.watch("smsNotifications")}
                onCheckedChange={(checked) =>
                  notificationForm.setValue("smsNotifications", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <label htmlFor="appointmentReminders" className="text-base font-medium">
                  Appointment Reminders
                </label>
                <p className="text-sm text-muted-foreground">
                  Get reminders for upcoming appointments
                </p>
              </div>
              <Switch
                id="appointmentReminders"
                checked={notificationForm.watch("appointmentReminders")}
                onCheckedChange={(checked) =>
                  notificationForm.setValue("appointmentReminders", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <label htmlFor="orderUpdates" className="text-base font-medium">
                  Order Updates
                </label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about your orders
                </p>
              </div>
              <Switch
                id="orderUpdates"
                checked={notificationForm.watch("orderUpdates")}
                onCheckedChange={(checked) =>
                  notificationForm.setValue("orderUpdates", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <label htmlFor="marketingEmails" className="text-base font-medium">
                  Marketing Emails
                </label>
                <p className="text-sm text-muted-foreground">
                  Receive promotional offers and updates
                </p>
              </div>
              <Switch
                id="marketingEmails"
                checked={notificationForm.watch("marketingEmails")}
                onCheckedChange={(checked) =>
                  notificationForm.setValue("marketingEmails", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <label htmlFor="newsletterSubscription" className="text-base font-medium">
                  Newsletter
                </label>
                <p className="text-sm text-muted-foreground">
                  Subscribe to our monthly newsletter
                </p>
              </div>
              <Switch
                id="newsletterSubscription"
                checked={notificationForm.watch("newsletterSubscription")}
                onCheckedChange={(checked) =>
                  notificationForm.setValue("newsletterSubscription", checked)
                }
              />
            </div>

            <Button
              type="submit"
              disabled={notificationMutation.isPending}
              className="w-full sm:w-auto"
            >
              {notificationMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Preferences
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Account Preferences Section */}
      <Card>
        <CardHeader>
          <CardTitle>Account Preferences</CardTitle>
          <CardDescription>
            Customize your experience on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="language" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Language
              </label>
              <Select
                value={preferencesForm.watch("language")}
                onValueChange={(value) => preferencesForm.setValue("language", value)}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="gu">Gujarati</SelectItem>
                </SelectContent>
              </Select>
              {preferencesForm.formState.errors.language && (
                <p className="text-sm font-medium text-destructive">
                  {preferencesForm.formState.errors.language.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="currency" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Currency
              </label>
              <Select
                value={preferencesForm.watch("currency")}
                onValueChange={(value) => preferencesForm.setValue("currency", value)}
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
              {preferencesForm.formState.errors.currency && (
                <p className="text-sm font-medium text-destructive">
                  {preferencesForm.formState.errors.currency.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="measurementUnit" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Measurement Unit
              </label>
              <Select
                value={preferencesForm.watch("measurementUnit")}
                onValueChange={(value) =>
                  preferencesForm.setValue("measurementUnit", value as "metric" | "imperial")
                }
              >
                <SelectTrigger id="measurementUnit">
                  <SelectValue placeholder="Select measurement unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (cm, meters)</SelectItem>
                  <SelectItem value="imperial">Imperial (inches, feet)</SelectItem>
                </SelectContent>
              </Select>
              {preferencesForm.formState.errors.measurementUnit && (
                <p className="text-sm font-medium text-destructive">
                  {preferencesForm.formState.errors.measurementUnit.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={preferencesMutation.isPending}
              className="w-full sm:w-auto"
            >
              {preferencesMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Preferences
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Danger Zone Section */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions that affect your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Delete Account</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. All your
                data, including saved designs, appointments, and order history
                will be permanently deleted.
              </p>
              <Button
                variant="destructive"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers including saved
              designs, appointments, order history, and personal information.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteAccountMutation.isPending
                ? "Deleting..."
                : "Yes, delete my account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}