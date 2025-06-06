"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Loader2, AlertCircle, Sun } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, signup, socialLogin, isAuthenticated, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("login")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Form states
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Set active tab based on URL parameter
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "signup") {
      setActiveTab("signup")
    }
  }, [searchParams])

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = searchParams.get("redirectTo") || "/account"
      router.push(redirectTo)
    }
  }, [isAuthenticated, router, searchParams])

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validate email format
      if (!validateEmail(loginData.email)) {
        setError("Please enter a valid email address")
        setLoading(false)
        return
      }

      // Validate password
      if (loginData.password.length < 6) {
        setError("Password must be at least 6 characters")
        setLoading(false)
        return
      }

      const success = await login(loginData.email, loginData.password)
      if (success) {
        const redirectTo = searchParams.get("redirectTo") || "/account"
        router.push(redirectTo)
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred during login")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Validate email format
    if (!validateEmail(signupData.email)) {
      setError("Please enter a valid email address")
      return
    }

    // Validate password
    if (signupData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    // Validate passwords match
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      const success = await signup(
        {
          firstName: signupData.firstName,
          lastName: signupData.lastName,
          email: signupData.email,
        },
        signupData.password,
      )

      if (success) {
        const redirectTo = searchParams.get("redirectTo") || "/account"
        router.push(redirectTo)
      } else {
        setError("Failed to create account")
      }
    } catch (err) {
      setError("An error occurred during signup")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError("")
    setLoading(true)

    try {
      // In a real app, this would redirect to Google OAuth
      // For demo purposes, we'll simulate a successful Google login

      // Mock Google user data
      const googleUserData = {
        email: "user@gmail.com",
        firstName: "Google",
        lastName: "User",
        avatar: "/placeholder.svg?height=40&width=40&text=G",
      }

      const success = await socialLogin("google", googleUserData)

      if (success) {
        const redirectTo = searchParams.get("redirectTo") || "/account"
        router.push(redirectTo)
      } else {
        setError("Failed to sign in with Google")
      }
    } catch (err) {
      setError("An error occurred during Google sign in")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Email validation helper
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sunshine-yellow" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <Card className="border-sunshine-yellow/20">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-sunshine-yellow flex items-center justify-center">
              <Sun className="h-6 w-6 text-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center font-quicksand">Welcome to MellowDaze</CardTitle>
          <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-muted">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-sunshine-yellow data-[state=active]:text-foreground"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-sunshine-yellow data-[state=active]:text-foreground"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="border-sunshine-blue/30 focus-visible:ring-sunshine-yellow"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-sunshine-blue hover:text-sunshine-orange">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="border-sunshine-blue/30 focus-visible:ring-sunshine-yellow"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-sunshine-yellow hover:bg-sunshine-orange text-foreground"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border-sunshine-blue/30 text-sunshine-blue hover:bg-sunshine-blue/10"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Image
                    src="/placeholder.svg?height=20&width=20&text=G"
                    alt="Google"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                )}
                Sign in with Google
              </Button>
            </TabsContent>

            <TabsContent value="signup">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSignupSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      required
                      value={signupData.firstName}
                      onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                      className="border-sunshine-blue/30 focus-visible:ring-sunshine-yellow"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      required
                      value={signupData.lastName}
                      onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                      className="border-sunshine-blue/30 focus-visible:ring-sunshine-yellow"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupEmail">Email</Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="border-sunshine-blue/30 focus-visible:ring-sunshine-yellow"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupPassword">Password</Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    required
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    className="border-sunshine-blue/30 focus-visible:ring-sunshine-yellow"
                  />
                  <p className="text-xs text-muted-foreground">Password must be at least 6 characters long</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    className="border-sunshine-blue/30 focus-visible:ring-sunshine-yellow"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-sunshine-yellow hover:bg-sunshine-orange text-foreground"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border-sunshine-blue/30 text-sunshine-blue hover:bg-sunshine-blue/10"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Image
                    src="/placeholder.svg?height=20&width=20&text=G"
                    alt="Google"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                )}
                Sign up with Google
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-sunshine-blue hover:text-sunshine-orange">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-sunshine-blue hover:text-sunshine-orange">
              Privacy Policy
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

