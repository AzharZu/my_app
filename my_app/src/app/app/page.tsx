"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, X, MapPin, BookOpen, Target, Lightbulb, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data for other users
const mockUsers = [
  {
    id: "2",
    name: "Sarah Johnson",
    username: "sarahj",
    age: 21,
    description:
      "Art student who loves digital design and photography. Always looking to learn new creative techniques!",
    photo: "/placeholder.svg?height=400&width=400",
    city: "Los Angeles",
    country: "USA",
    skills: ["Photoshop", "Illustrator", "Photography"],
    interests: ["Digital Art", "UI/UX", "Photography"],
    teaches: ["Digital Art", "Photography"],
    wantsToLearn: ["3D Modeling", "Animation"],
    points: 200,
  },
  {
    id: "3",
    name: "Alex Chen",
    username: "alexc",
    age: 23,
    description: "Computer Science major specializing in AI and machine learning. Love solving complex problems!",
    photo: "/placeholder.svg?height=400&width=400",
    city: "San Francisco",
    country: "USA",
    skills: ["Python", "Machine Learning", "TensorFlow"],
    interests: ["AI", "Data Science", "Robotics"],
    teaches: ["Python", "Data Analysis"],
    wantsToLearn: ["Deep Learning", "Computer Vision"],
    points: 350,
  },
  {
    id: "4",
    name: "Maria Garcia",
    username: "mariag",
    age: 20,
    description:
      "Business student with a passion for entrepreneurship and marketing. Let's build something amazing together!",
    photo: "/placeholder.svg?height=400&width=400",
    city: "Miami",
    country: "USA",
    skills: ["Marketing", "Business Strategy", "Social Media"],
    interests: ["Entrepreneurship", "Marketing", "Finance"],
    teaches: ["Marketing", "Business Planning"],
    wantsToLearn: ["Web Development", "Data Analytics"],
    points: 180,
  },
  {
    id: "5",
    name: "David Kim",
    username: "davidk",
    age: 22,
    description: "Music production student who also codes. I believe creativity and technology go hand in hand!",
    photo: "/placeholder.svg?height=400&width=400",
    city: "Nashville",
    country: "USA",
    skills: ["Music Production", "JavaScript", "Audio Engineering"],
    interests: ["Music", "Technology", "Sound Design"],
    teaches: ["Music Production", "Audio Editing"],
    wantsToLearn: ["React", "Mobile Development"],
    points: 220,
  },
]

export default function AppPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [matches, setMatches] = useState<any[]>([])
  const [showMatch, setShowMatch] = useState(false)
  const [lastMatch, setLastMatch] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setCurrentUser(JSON.parse(userData))
  }, [router])

  const handleSwipe = (liked: boolean) => {
    const currentProfile = mockUsers[currentUserIndex]

    if (liked) {
      // Simulate a match (50% chance)
      if (Math.random() > 0.5) {
        setMatches((prev) => [...prev, currentProfile])
        setLastMatch(currentProfile)
        setShowMatch(true)
        setTimeout(() => setShowMatch(false), 3000)
      }
    }

    if (currentUserIndex < mockUsers.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1)
    } else {
      setCurrentUserIndex(0) // Loop back to start
    }
  }

  if (!currentUser) {
    return <div>Loading...</div>
  }

  const currentProfile = mockUsers[currentUserIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">SkillLink</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">{currentUser.points} pts</span>
            </div>
            <Link href="/profile">
              <Avatar className="cursor-pointer">
                <AvatarImage src={currentUser.photo || "/placeholder.svg"} />
              </Avatar>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-md">
        {showMatch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 text-center">
              <CardContent>
                <Heart className="h-16 w-16 mx-auto mb-4 text-white" />
                <h2 className="text-2xl font-bold mb-2">It's a Match!</h2>
                <p>You and {lastMatch?.name} liked each other</p>
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="max-w-sm mx-auto overflow-hidden">
          <div className="relative">
            <img
              src={currentProfile.photo || "/placeholder.svg"}
              alt={currentProfile.name}
              className="w-full h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
              <h2 className="text-2xl font-bold">
                {currentProfile.name}, {currentProfile.age}
              </h2>
              <div className="flex items-center gap-1 text-sm opacity-90">
                <MapPin className="h-4 w-4" />
                {currentProfile.city}, {currentProfile.country}
              </div>
            </div>
          </div>

          <CardContent className="p-6 space-y-4">
            <p className="text-gray-600">{currentProfile.description}</p>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentProfile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Interests</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.map((interest, index) => (
                  <Badge key={index} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-green-600" />
                <span className="font-medium">Can Teach</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentProfile.teaches.map((teach, index) => (
                  <Badge key={index} className="bg-green-100 text-green-800">
                    {teach}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-orange-600" />
                <span className="font-medium">Wants to Learn</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentProfile.wantsToLearn.map((learn, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800">
                    {learn}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">{currentProfile.points} points</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mt-6">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full w-16 h-16 border-red-200 hover:bg-red-50 bg-transparent"
            onClick={() => handleSwipe(false)}
          >
            <X className="h-8 w-8 text-red-500" />
          </Button>
          <Button
            size="lg"
            className="rounded-full w-16 h-16 bg-green-500 hover:bg-green-600"
            onClick={() => handleSwipe(true)}
          >
            <Heart className="h-8 w-8 text-white" />
          </Button>
        </div>

        {/* Matches Counter */}
        {matches.length > 0 && (
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              You have {matches.length} match{matches.length !== 1 ? "es" : ""}!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
