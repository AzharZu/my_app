"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus, ArrowLeft, ArrowRight, User, Mail, MapPin, BookOpen, Target, Lightbulb } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const steps = [
  { title: "Personal Info", icon: User },
  { title: "Contact", icon: Mail },
  { title: "Location", icon: MapPin },
  { title: "Skills & Interests", icon: BookOpen },
]

export default function RegisterPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    username: "",
    password: "",
    description: "",
    photo: "",
    country: "",
    city: "",
    skills: [] as string[],
    interests: [] as string[],
    teaches: [] as string[],
    wantsToLearn: [] as string[],
  })

  const [newSkill, setNewSkill] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [newTeaches, setNewTeaches] = useState("")
  const [newWantsToLearn, setNewWantsToLearn] = useState("")

  const addItem = (field: keyof typeof formData, value: string, setter: (value: string) => void) => {
    if (value.trim() && !formData[field].includes(value.trim())) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()],
      }))
      setter("")
    }
  }

  const removeItem = (field: keyof typeof formData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://skilllink-backend-qbsv.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: Number.parseInt(formData.age),
          points: 0,
        }),
      })

      if (response.ok) {
        const userData = await response.json()
        localStorage.setItem("user", JSON.stringify({...formData, age: Number.parseInt(formData.age), points: 0}))
        router.push("/profile")
      } else {
        alert("Registration failed. Please try again.")
      }
    } catch (error) {
      alert("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name && formData.username && formData.password
      case 1:
        return formData.email && formData.age
      case 2:
        return formData.country && formData.city
      case 3:
        return formData.skills.length > 0 || formData.interests.length > 0
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <Link href="/" className="text-purple-600 hover:text-purple-700 flex items-center gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="flex justify-between items-center mb-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      index <= currentStep ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 ${index < currentStep ? "bg-purple-600" : "bg-gray-200"}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>
              Step {currentStep + 1} of {steps.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 0 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                    placeholder="Choose a username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder="Create a password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo">Profile Photo URL (optional)</Label>
                  <Input
                    id="photo"
                    value={formData.photo}
                    onChange={(e) => setFormData((prev) => ({ ...prev, photo: e.target.value }))}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
              </>
            )}

            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    max="120"
                    value={formData.age}
                    onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                    placeholder="Enter your age"
                  />
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                    placeholder="Enter your country"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                    placeholder="Enter your city"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">About You (optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Tell others about yourself..."
                    className="min-h-[100px]"
                  />
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="space-y-4">
                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4" />
                      Skills You Have
                    </Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill"
                        onKeyPress={(e) => e.key === "Enter" && addItem("skills", newSkill, setNewSkill)}
                      />
                      <Button type="button" onClick={() => addItem("skills", newSkill, setNewSkill)} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem("skills", index)} />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4" />
                      Interests
                    </Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        placeholder="Add an interest"
                        onKeyPress={(e) => e.key === "Enter" && addItem("interests", newInterest, setNewInterest)}
                      />
                      <Button type="button" onClick={() => addItem("interests", newInterest, setNewInterest)} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.interests.map((interest, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          {interest}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem("interests", index)} />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4" />
                      What You Can Teach
                    </Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={newTeaches}
                        onChange={(e) => setNewTeaches(e.target.value)}
                        placeholder="What can you teach?"
                        onKeyPress={(e) => e.key === "Enter" && addItem("teaches", newTeaches, setNewTeaches)}
                      />
                      <Button type="button" onClick={() => addItem("teaches", newTeaches, setNewTeaches)} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.teaches.map((teach, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="flex items-center gap-1 bg-green-100 text-green-800"
                        >
                          {teach}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem("teaches", index)} />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4" />
                      What You Want to Learn
                    </Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={newWantsToLearn}
                        onChange={(e) => setNewWantsToLearn(e.target.value)}
                        placeholder="What do you want to learn?"
                        onKeyPress={(e) =>
                          e.key === "Enter" && addItem("wantsToLearn", newWantsToLearn, setNewWantsToLearn)
                        }
                      />
                      <Button
                        type="button"
                        onClick={() => addItem("wantsToLearn", newWantsToLearn, setNewWantsToLearn)}
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.wantsToLearn.map((learn, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="flex items-center gap-1 bg-blue-100 text-blue-800"
                        >
                          {learn}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem("wantsToLearn", index)} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button onClick={nextStep} disabled={!isStepValid() || loading}>
                {loading ? "Creating Account..." : currentStep === steps.length - 1 ? "Create Account" : "Next"}
                {currentStep < steps.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
