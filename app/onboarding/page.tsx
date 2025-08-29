"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Play, ArrowRight, ArrowLeft, Brain, Heart, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import SkillAssessment from "@/components/skill-assessment"
import AvatarBuilder from "@/components/avatar-builder"

type OnboardingStep = "basics" | "goals" | "assessment" | "avatar" | "complete"

interface OnboardingData {
  age: string
  therapyGoals: string[]
  primaryFocus: string
  assessmentScore: number
  avatar: {
    color: string
    outfit: string
    accessory: string
  }
}

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("basics")
  const [data, setData] = useState<OnboardingData>({
    age: "",
    therapyGoals: [],
    primaryFocus: "",
    assessmentScore: 0,
    avatar: {
      color: "blue",
      outfit: "casual",
      accessory: "none",
    },
  })

  const steps = ["basics", "goals", "assessment", "avatar", "complete"]
  const currentStepIndex = steps.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex] as OnboardingStep)
    }
  }

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex] as OnboardingStep)
    }
  }

  const handleComplete = () => {
    // TODO: Save onboarding data to backend
    console.log("Onboarding data:", data)
    router.push("/dashboard")
  }

  const updateGoals = (goal: string, checked: boolean) => {
    setData((prev) => ({
      ...prev,
      therapyGoals: checked ? [...prev.therapyGoals, goal] : prev.therapyGoals.filter((g) => g !== goal),
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-card via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Play className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-serif font-bold text-2xl">TherapyPlay</span>
          </div>
          <p className="text-muted-foreground">Let's personalize your therapy experience</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="border-0 shadow-xl">
          {currentStep === "basics" && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="font-serif text-2xl">Tell us about yourself</CardTitle>
                <CardDescription>This helps us customize your therapy experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={data.age}
                    onChange={(e) => setData((prev) => ({ ...prev, age: e.target.value }))}
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" disabled>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNext} disabled={!data.age}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === "goals" && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="font-serif text-2xl">What are your therapy goals?</CardTitle>
                <CardDescription>Select all that apply to your rehabilitation needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {[
                    {
                      id: "cognitive",
                      label: "Cognitive Function",
                      desc: "Memory, attention, problem-solving",
                      icon: Brain,
                    },
                    { id: "motor", label: "Motor Skills", desc: "Movement, coordination, strength", icon: Zap },
                    {
                      id: "emotional",
                      label: "Emotional Wellbeing",
                      desc: "Mood, anxiety, stress management",
                      icon: Heart,
                    },
                  ].map(({ id, label, desc, icon: Icon }) => (
                    <div
                      key={id}
                      className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Checkbox
                        id={id}
                        checked={data.therapyGoals.includes(id)}
                        onCheckedChange={(checked) => updateGoals(id, checked as boolean)}
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <Label htmlFor={id} className="font-semibold cursor-pointer">
                            {label}
                          </Label>
                          <p className="text-sm text-muted-foreground">{desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Label>What's your primary focus?</Label>
                  <RadioGroup
                    value={data.primaryFocus}
                    onValueChange={(value) => setData((prev) => ({ ...prev, primaryFocus: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="recovery" id="recovery" />
                      <Label htmlFor="recovery">Recovery from injury/illness</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maintenance" id="maintenance" />
                      <Label htmlFor="maintenance">Maintaining current abilities</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="improvement" id="improvement" />
                      <Label htmlFor="improvement">General improvement</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNext} disabled={data.therapyGoals.length === 0 || !data.primaryFocus}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === "assessment" && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="font-serif text-2xl">Quick Skill Assessment</CardTitle>
                <CardDescription>This helps us set the right difficulty level for you</CardDescription>
              </CardHeader>
              <CardContent>
                <SkillAssessment
                  onComplete={(score) => {
                    setData((prev) => ({ ...prev, assessmentScore: score }))
                    handleNext()
                  }}
                />
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button variant="outline" onClick={handleNext}>
                    Skip Assessment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === "avatar" && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="font-serif text-2xl">Create Your Avatar</CardTitle>
                <CardDescription>Personalize your therapy companion</CardDescription>
              </CardHeader>
              <CardContent>
                <AvatarBuilder avatar={data.avatar} onChange={(avatar) => setData((prev) => ({ ...prev, avatar }))} />
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNext}>
                    Complete Setup
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === "complete" && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="font-serif text-2xl">You're all set!</CardTitle>
                <CardDescription>Your personalized therapy experience is ready</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Play className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg">Welcome to TherapyPlay!</p>
                  <p className="text-muted-foreground">
                    Based on your preferences, we've customized your therapy experience. You can always adjust these
                    settings later.
                  </p>
                </div>
                <Button onClick={handleComplete} size="lg" className="w-full">
                  Start Your Journey
                </Button>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
