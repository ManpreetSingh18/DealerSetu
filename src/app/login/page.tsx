"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Home, Building, Users } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isSignUp) {
        await signUp(email, password)
        alert('Account created! Please check your email to verify your account.')
      } else {
        await signIn(email, password)
        router.push('/my-inventory')
      }
    } catch (error: any) {
      alert(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">DealerSetu</h1>
          <p className="text-gray-600">Property Dealer Network</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </CardTitle>
            <p className="text-gray-600">
              {isSignUp ? 'Sign up to start managing your properties' : 'Sign in to access your inventory'}
            </p>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary hover:text-primary/80 font-medium"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Demo Credentials</h3>
          <p className="text-sm text-blue-800">
            For testing, you can use any email and password to create an account.
            The system will automatically create a new user account.
          </p>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-2xl z-20 lg:hidden">
        <div className="container mx-auto px-4 max-w-sm sm:max-w-md md:max-w-2xl">
          <div className="flex justify-around py-4">
            <Link href="/">
              <Button 
                variant="ghost" 
                size="lg"
                className="flex flex-col items-center space-y-2 px-4 py-3 rounded-2xl transition-all duration-300 text-primary bg-primary/10"
              >
                <Home className="w-6 h-6" />
                <span className="text-xs font-semibold">Home</span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="lg"
              className="flex flex-col items-center space-y-2 px-4 py-3 rounded-2xl transition-all duration-300 text-gray-500 hover:text-primary hover:bg-gray-50"
            >
              <Building className="w-6 h-6" />
              <span className="text-xs font-semibold">Inventory</span>
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="flex flex-col items-center space-y-2 px-4 py-3 rounded-2xl transition-all duration-300 text-gray-500 hover:text-primary hover:bg-gray-50"
            >
              <Users className="w-6 h-6" />
              <span className="text-xs font-semibold">Community</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

