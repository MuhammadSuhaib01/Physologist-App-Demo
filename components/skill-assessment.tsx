"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SkillAssessmentProps {
  onComplete: (score: number) => void
}

interface AssessmentItem {
  id: number
  color: string
  position: { x: number; y: number }
  targetPosition: { x: number; y: number }
  isDragging: boolean
  isCorrect: boolean
}

export default function SkillAssessment({ onComplete }: SkillAssessmentProps) {
  const [currentRound, setCurrentRound] = useState(1)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isActive, setIsActive] = useState(false)
  const [items, setItems] = useState<AssessmentItem[]>([])

  const totalRounds = 3
  const colors = ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400"]

  // Initialize assessment items
  useEffect(() => {
    generateItems()
  }, [currentRound])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleRoundComplete()
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const generateItems = () => {
    const newItems: AssessmentItem[] = []
    const itemCount = Math.min(3 + currentRound, 6) // Increase difficulty

    for (let i = 0; i < itemCount; i++) {
      newItems.push({
        id: i,
        color: colors[i % colors.length],
        position: { x: Math.random() * 300, y: Math.random() * 200 },
        targetPosition: { x: 50 + i * 60, y: 300 },
        isDragging: false,
        isCorrect: false,
      })
    }
    setItems(newItems)
  }

  const startAssessment = () => {
    setIsActive(true)
    setTimeLeft(30)
  }

  const handleItemClick = (id: number) => {
    if (!isActive) return

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id && !item.isCorrect) {
          const distance = Math.sqrt(
            Math.pow(item.position.x - item.targetPosition.x, 2) + Math.pow(item.position.y - item.targetPosition.y, 2),
          )

          if (distance < 50) {
            setScore((s) => s + 10)
            return { ...item, isCorrect: true, position: item.targetPosition }
          } else {
            return { ...item, position: item.targetPosition }
          }
        }
        return item
      }),
    )
  }

  const handleRoundComplete = () => {
    setIsActive(false)
    if (currentRound < totalRounds) {
      setTimeout(() => {
        setCurrentRound((r) => r + 1)
        setTimeLeft(30)
      }, 1000)
    } else {
      // Assessment complete
      const finalScore = Math.min(Math.round((score / (totalRounds * 60)) * 100), 100)
      setTimeout(() => onComplete(finalScore), 1000)
    }
  }

  const skipAssessment = () => {
    onComplete(50) // Default score
  }

  if (currentRound > totalRounds) {
    return (
      <div className="text-center space-y-4">
        <div className="text-2xl font-serif">Assessment Complete!</div>
        <div className="text-lg">Your Score: {Math.round((score / (totalRounds * 60)) * 100)}%</div>
        <p className="text-muted-foreground">Great job! We'll use this to customize your experience.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="text-sm font-medium">
            Round {currentRound} of {totalRounds}
          </div>
          <div className="text-xs text-muted-foreground">Click items to move them to their targets</div>
        </div>
        <div className="text-right space-y-1">
          <div className="text-sm font-medium">Time: {timeLeft}s</div>
          <div className="text-xs text-muted-foreground">Score: {score}</div>
        </div>
      </div>

      <Progress value={(score / (totalRounds * 60)) * 100} className="h-2" />

      <Card className="relative h-96 overflow-hidden bg-muted/20">
        <CardContent className="p-4 h-full">
          {!isActive && currentRound === 1 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-lg font-semibold">Ready to start?</div>
                <p className="text-muted-foreground">Click the colored circles and drag them to the bottom targets</p>
                <Button onClick={startAssessment}>Start Assessment</Button>
              </div>
            </div>
          ) : (
            <div className="relative h-full">
              {/* Target areas */}
              {items.map((item) => (
                <div
                  key={`target-${item.id}`}
                  className="absolute w-12 h-12 border-2 border-dashed border-muted-foreground/30 rounded-full"
                  style={{
                    left: item.targetPosition.x,
                    top: item.targetPosition.y,
                  }}
                />
              ))}

              {/* Draggable items */}
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`absolute w-12 h-12 ${item.color} rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${
                    item.isCorrect ? "ring-2 ring-green-500" : ""
                  }`}
                  style={{
                    left: item.position.x,
                    top: item.position.y,
                  }}
                  onClick={() => handleItemClick(item.id)}
                />
              ))}

              {!isActive && currentRound > 1 && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <div className="text-center space-y-2">
                    <div className="text-lg font-semibold">Round {currentRound - 1} Complete!</div>
                    <Button onClick={() => setIsActive(true)}>Continue</Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline" onClick={skipAssessment}>
          Skip Assessment
        </Button>
      </div>
    </div>
  )
}
