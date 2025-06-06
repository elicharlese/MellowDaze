"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Check, AlertTriangle } from "lucide-react"

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Mock settings
  const [settings, setSettings] = useState({
    emailNotifications: true,
    marketingEmails: false,
    orderUpdates: true,
    passwordCurrent: "",
    passwordNew: "",
    passwordConfirm: "",
  })

  const handleNotificationChange = (key, value) => {
    setSettings({
      ...settings,
      [key]: value,
    })
  }

  const handleSaveNotifications = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError("")

    try {
      // In a real app, this would make an API call
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError("Failed to update notification settings")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError("")

    // Validate passwords
    if (settings.passwordNew !== settings.passwordConfirm) {
      setError("New passwords do not match")
      setLoading(false)
      return
    }

    try {
      // In a real app, this would make an API call
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset password fields
      setSettings({
        ...settings,
        passwordCurrent: "",
        passwordNew: "",
        passwordConfirm: "",
      })

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError("Failed to update password")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        // In a real app, this would make an API call
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Log the user out
        logout()

        // Redirect to home page
        window.location.href = "/"
      } catch (err) {
        console.error("Failed to delete account", err)
      }
    }
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <Tabs defaultValue="notifications">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications and updates</CardDescription>
            </CardHeader>

            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 border-green-500 text-green-500">
                  <Check className="h-4 w-4 mr-2" />
                  <AlertDescription>Settings updated successfully</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSaveNotifications} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications" className="font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails" className="font-medium">
                      Marketing Emails
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about new products, promotions, and discounts
                    </p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="orderUpdates" className="font-medium">
                      Order Updates
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about your order status</p>
                  </div>
                  <Switch
                    id="orderUpdates"
                    checked={settings.orderUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("orderUpdates", checked)}
                  />
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>

            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 border-green-500 text-green-500">
                  <Check className="h-4 w-4 mr-2" />
                  <AlertDescription>Password updated successfully</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="passwordCurrent">Current Password</Label>
                  <Input
                    id="passwordCurrent"
                    type="password"
                    value={settings.passwordCurrent}
                    onChange={(e) => setSettings({ ...settings, passwordCurrent: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordNew">New Password</Label>
                  <Input
                    id="passwordNew"
                    type="password"
                    value={settings.passwordNew}
                    onChange={(e) => setSettings({ ...settings, passwordNew: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordConfirm">Confirm New Password</Label>
                  <Input
                    id="passwordConfirm"
                    type="password"
                    value={settings.passwordConfirm}
                    onChange={(e) => setSettings({ ...settings, passwordConfirm: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Account Information</h3>
                <p className="text-sm text-muted-foreground mb-1">Email: {user.email}</p>
                <p className="text-sm text-muted-foreground">Member since: {new Date().toLocaleDateString()}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Data & Privacy</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You can request a copy of your data or delete your account at any time.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline">Request Data Export</Button>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-red-500 mb-2">Danger Zone</h3>
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <AlertDescription>
                    Deleting your account is permanent and cannot be undone. All your data will be permanently removed.
                  </AlertDescription>
                </Alert>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

