"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Edit, MapPin, Mail, Star, BookOpen, Target, Lightbulb } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    console.log("User data:", userData)
    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/app" className="text-purple-600 hover:text-purple-700 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to App
          </Link>
          <h1 className="text-xl font-bold">Profile</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={user.photo || "/placeholder.svg"} />
              </Avatar>
              <p className="text-gray-600 mb-2">@{user.username}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>{user.age} years old</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {user.city}, {user.country}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-medium text-lg">{user.points} points</span>
              </div>
              <Button className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>

            {user.description && (
              <div className="text-center">
                <p className="text-gray-700 max-w-md mx-auto">{user.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <span>{user.email}</span>
            </div>
          </CardContent>
        </Card>

        {/* Skills & Interests */}
        <div className="grid md:grid-cols-2 gap-6">
          {user.skills && user.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {user.interests && user.interests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {user.teaches && user.teaches.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-green-600" />
                  Can Teach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.teaches.map((teach: string, index: number) => (
                    <Badge key={index} className="bg-green-100 text-green-800">
                      {teach}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {user.wantsToLearn && user.wantsToLearn.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-orange-600" />
                  Wants to Learn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.wantsToLearn.map((learn: string, index: number) => (
                    <Badge key={index} className="bg-blue-100 text-blue-800">
                      {learn}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
