import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BookOpen, Heart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <GraduationCap className="h-16 w-16 text-purple-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">SkillLink</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with fellow students, share your skills, and learn something new. Swipe to discover your perfect
            study buddy!
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Connect</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Meet students with complementary skills and shared interests</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Discover new skills from your peers and expand your knowledge</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Heart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Match</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Find your perfect study partner through our smart matching system</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
