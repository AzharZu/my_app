"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Fake login - just simulate a successful login
    setTimeout(() => {
      const fakeUser = {
        id: "1",
        name: "Demo User",
        username: formData.username,
        email: "demo@example.com",
        age: 22,
        skills: ["JavaScript", "React", "Node.js"],
        interests: ["Web Development", "AI", "Music"],
        teaches: ["JavaScript", "React"],
        wantsToLearn: ["Python", "Machine Learning"],
        description: "Computer Science student passionate about web development",
        photo: "/placeholder.svg?height=400&width=400",
        country: "USA",
        city: "New York",
        points: 150,
      }

      localStorage.setItem("user", JSON.stringify(fakeUser))
      router.push("/app")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-md">
        <Link href="/" className="text-purple-600 hover:text-purple-700 flex items-center gap-2 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your SkillLink account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {"Don't have an account? "}
                <Link href="/register" className="text-purple-600 hover:text-purple-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
