import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save, Trash2, Eye, EyeOff } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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

const Switch = ({
  id,
  checked,
  onCheckedChange,
  disabled,
}: {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    id={id}
    disabled={disabled}
    onClick={() => onCheckedChange(!checked)}
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      checked ? "bg-primary" : "bg-input"
    )}
  >
    <span
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
        checked ? "translate-x-5" : "translate-x-0"
      )}
    />
  </button>
);

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  orderUpdates: z.boolean(),
  appointmentReminders: z.boolean(),
  promotionalEmails: z.boolean(),
  newsletterSubscription: z.boolean(),
  productUpdates: z.boolean(),
});

const preferencesSchema = z.object({
  language: z.string(),
  currency: z.string(),
  dateFormat: z.string(),
  timeZone: z.string(),
});

type PasswordFormData = z.infer<typeof passwordSchema>;
type NotificationFormData = z.infer<typeof notificationSchema>;
type PreferencesFormData = z.infer<typeof preferencesSchema>;

interface SettingsFormProps {
  initialNotifications?: Partial<NotificationFormData>;
  initialPreferences?: Partial<PreferencesFormData>;
  onPasswordChange?: (data: PasswordFormData) => Promise<void>;
  onNotificationsUpdate?: (data: NotificationFormData) => Promise<void>;
  onPreferencesUpdate?: (data: PreferencesFormData) => Promise<void>;
  onAccountDelete?: () => Promise<void>;
  className?: string;
}

export default function SettingsForm({
  initialNotifications,
  initialPreferences,
  onPasswordChange,
  onNotificationsUpdate,
  onPreferencesUpdate,
  onAccountDelete,
  className,
}: SettingsFormProps) {
  const { toast } = useToast();
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isPasswordChanging, setIsPasswordChanging] = React.useState(false);
  const [isNotificationsUpdating, setIsNotificationsUpdating] = React.useState(false);
  const [isPreferencesUpdating, setIsPreferencesUpdating] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const notificationForm = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: initialNotifications?.emailNotifications ?? true,
      smsNotifications: initialNotifications?.smsNotifications ?? false,
      orderUpdates: initialNotifications?.orderUpdates ?? true,
      appointmentReminders: initialNotifications?.appointmentReminders ?? true,
      promotionalEmails: initialNotifications?.promotionalEmails ?? true,
      newsletterSubscription: initialNotifications?.newsletterSubscription ?? false,
      productUpdates: initialNotifications?.productUpdates ?? false,
    },
  });

  const preferencesForm = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      language: initialPreferences?.language ?? 'en',
      currency: initialPreferences?.currency ?? 'INR',
      dateFormat: initialPreferences?.dateFormat ?? 'DD/MM/YYYY',
      timeZone: initialPreferences?.timeZone ?? 'Asia/Kolkata',
    },
  });

  const handlePasswordSubmit = async (data: PasswordFormData) => {
    if (!onPasswordChange) return;

    setIsPasswordChanging(true);
    try {
      await onPasswordChange(data);
      toast({
        title: 'Password Changed',
        description: 'Your password has been updated successfully.',
      });
      passwordForm.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to change password',
        variant: 'error',
      });
    } finally {
      setIsPasswordChanging(false);
    }
  };

  const handleNotificationsSubmit = async (data: NotificationFormData) => {
    if (!onNotificationsUpdate) return;

    setIsNotificationsUpdating(true);
    try {
      await onNotificationsUpdate(data);
      toast({
        title: 'Settings Updated',
        description: 'Your notification preferences have been saved.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update notification settings',
        variant: 'error',
      });
    } finally {
      setIsNotificationsUpdating(false);
    }
  };

  const handlePreferencesSubmit = async (data: PreferencesFormData) => {
    if (!onPreferencesUpdate) return;

    setIsPreferencesUpdating(true);
    try {
      await onPreferencesUpdate(data);
      toast({
        title: 'Preferences Updated',
        description: 'Your preferences have been saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update preferences',
        variant: 'error',
      });
    } finally {
      setIsPreferencesUpdating(false);
    }
  };

  const handleAccountDelete = async () => {
    if (!onAccountDelete) return;

    setIsDeleting(true);
    try {
      await onAccountDelete();
      toast({
        title: 'Account Deleted',
        description: 'Your account has been permanently deleted.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete account',
        variant: 'error',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <div onSubmit={(e) => { e.preventDefault(); passwordForm.handleSubmit(handlePasswordSubmit)(e); }}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  {...passwordForm.register('currentPassword')}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
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
                <p className="text-sm text-destructive">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  {...passwordForm.register('newPassword')}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordForm.formState.errors.newPassword && (
                <p className="text-sm text-destructive">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...passwordForm.register('confirmPassword')}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
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
                <p className="text-sm text-destructive">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="button" onClick={passwordForm.handleSubmit(handlePasswordSubmit)} disabled={isPasswordChanging}>
              {isPasswordChanging ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Changing Password...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Change Password
                </>
              )}
            </Button>
          </CardFooter>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Manage how you receive notifications from us
          </CardDescription>
        </CardHeader>
        <div>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={notificationForm.watch('emailNotifications')}
                  onCheckedChange={(checked: boolean) =>
                    notificationForm.setValue('emailNotifications', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via SMS
                  </p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={notificationForm.watch('smsNotifications')}
                  onCheckedChange={(checked: boolean) =>
                    notificationForm.setValue('smsNotifications', checked)
                  }
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Notification Types</h4>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="orderUpdates">Order Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about your order status
                  </p>
                </div>
                <Switch
                  id="orderUpdates"
                  checked={notificationForm.watch('orderUpdates')}
                  onCheckedChange={(checked: boolean) =>
                    notificationForm.setValue('orderUpdates', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="appointmentReminders">Appointment Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Reminders for upcoming appointments
                  </p>
                </div>
                <Switch
                  id="appointmentReminders"
                  checked={notificationForm.watch('appointmentReminders')}
                  onCheckedChange={(checked: boolean) =>
                    notificationForm.setValue('appointmentReminders', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="promotionalEmails">Promotional Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Special offers and promotions
                  </p>
                </div>
                <Switch
                  id="promotionalEmails"
                  checked={notificationForm.watch('promotionalEmails')}
                  onCheckedChange={(checked: boolean) =>
                    notificationForm.setValue('promotionalEmails', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newsletterSubscription">Newsletter</Label>
                  <p className="text-sm text-muted-foreground">
                    Monthly newsletter with tips and ideas
                  </p>
                </div>
                <Switch
                  id="newsletterSubscription"
                  checked={notificationForm.watch('newsletterSubscription')}
                  onCheckedChange={(checked: boolean) =>
                    notificationForm.setValue('newsletterSubscription', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="productUpdates">Product Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    New product launches and updates
                  </p>
                </div>
                <Switch
                  id="productUpdates"
                  checked={notificationForm.watch('productUpdates')}
                  onCheckedChange={(checked: boolean) =>
                    notificationForm.setValue('productUpdates', checked)
                  }
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="button" onClick={notificationForm.handleSubmit(handleNotificationsSubmit)} disabled={isNotificationsUpdating}>
              {isNotificationsUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </>
              )}
            </Button>
          </CardFooter>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>General Preferences</CardTitle>
          <CardDescription>
            Customize your account preferences
          </CardDescription>
        </CardHeader>
        <div>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                value={preferencesForm.watch('language')}
                onChange={(e) => preferencesForm.setValue('language', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <select
                id="currency"
                value={preferencesForm.watch('currency')}
                onChange={(e) => preferencesForm.setValue('currency', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <select
                id="dateFormat"
                value={preferencesForm.watch('dateFormat')}
                onChange={(e) => preferencesForm.setValue('dateFormat', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeZone">Time Zone</Label>
              <select
                id="timeZone"
                value={preferencesForm.watch('timeZone')}
                onChange={(e) => preferencesForm.setValue('timeZone', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
              </select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="button" onClick={preferencesForm.handleSubmit(handlePreferencesSubmit)} disabled={isPreferencesUpdating}>
              {isPreferencesUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </>
              )}
            </Button>
          </CardFooter>
        </div>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={isDeleting}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove all your data from our servers including orders,
                  appointments, saved designs, and personal information.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleAccountDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete Account'
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}