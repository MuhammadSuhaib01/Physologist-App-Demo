"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, RotateCcw, Play, Pause } from "lucide-react"

interface BreathingStats {
  duration: number
  cycles: number
  consistency: number
  relaxationScore: number
}

interface BreathingExerciseProps {
  difficulty: "easy" | "medium" | "hard"
  onGameComplete: (stats: BreathingStats) => void
}

export default function BreathingExercise({ difficulty, onGameComplete }: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale")
  const [timeInPhase, setTimeInPhase] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [cycles, setCycles] = useState(0)
  const [targetCycles, setTargetCycles] = useState(5)
  const [breathingPattern, setBreathingPattern] = useState({ inhale: 4, hold: 4, exhale: 4, rest: 2 })

  const getDifficultySettings = () => {
    switch (difficulty) {
      case "easy":
        return {
          pattern: { inhale: 4, hold: 2, exhale: 4, rest: 2 },
          cycles: 5,
          duration: 60,
        }
      case "medium":
        return {
          pattern: { inhale: 4, hold: 4, exhale: 4, rest: 2 },
          cycles: 8,
          duration: 120,
        }
      case "hard":
        return {
          pattern: { inhale: 6, hold: 6, exhale: 6, rest: 2 },
          cycles: 10,
          duration: 180,
        }
      default:
        return {
          pattern: { inhale: 4, hold: 2, exhale: 4, rest: 2 },
          cycles: 5,
          duration: 60,
        }
    }
  }

  const { pattern, cycles: targetCyclesCount, duration } = getDifficultySettings()

  useEffect(() => {
    setBreathingPattern(pattern)
    setTargetCycles(targetCyclesCount)
  }, [difficulty])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimeInPhase((prev) => prev + 0.1)
        setTotalTime((prev) => prev + 0.1)
      }, 100)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, isPaused])

  useEffect(() => {
    if (!isActive) return

    const currentPhaseDuration = breathingPattern[phase]

    if (timeInPhase >= currentPhaseDuration) {
      setTimeInPhase(0)

      switch (phase) {
        case "inhale":
          setPhase("hold")
          break
        case "hold":
          setPhase("exhale")
          break
        case "exhale":
          setPhase("rest")
          break
        case "rest":
          setPhase("inhale")
          setCycles((prev) => prev + 1)
          break
      }
    }
  }, [timeInPhase, phase, breathingPattern, isActive])

  useEffect(() => {
    if (cycles >= targetCycles && isActive) {
      completeExercise()
    }
  }, [cycles, targetCycles, isActive])

  const startExercise = () => {
    setIsActive(true)
    setIsPaused(false)
    setPhase("inhale")
    setTimeInPhase(0)
    setTotalTime(0)
    setCycles(0)
  }

  const pauseExercise = () => {
    setIsPaused(!isPaused)
  }

  const resetExercise = () => {
    setIsActive(false)
    setIsPaused(false)
    setPhase("inhale")
    setTimeInPhase(0)
    setTotalTime(0)
    setCycles(0)
  }

  const completeExercise = () => {
    setIsActive(false)
    const consistency = Math.max(0, 100 - (Math.abs(totalTime - duration) / duration) * 100)
    const relaxationScore = Math.min(100, 70 + (cycles / targetCycles) * 30)

    onGameComplete({
      duration: Math.round(totalTime),
      cycles,
      consistency: Math.round(consistency),
      relaxationScore: Math.round(relaxationScore),
    })
  }

  const getPhaseInstruction = () => {
    switch (phase) {
      case "inhale":
        return "Breathe In"
      case "hold":
        return "Hold"
      case "exhale":
        return "Breathe Out"
      case "rest":
        return "Rest"
    }
  }

  const getPhaseColor = () => {
    switch (phase) {
      case "inhale":
        return "bg-blue-400"
      case "hold":
        return "bg-purple-400"
      case "exhale":
        return "bg-green-400"
      case "rest":
        return "bg-gray-400"
    }
  }

  const progress = (timeInPhase / breathingPattern[phase]) * 100
  const circleScale =
    phase === "inhale"
      ? 1 + (progress / 100) * 0.5
      : phase === "exhale"
        ? 1.5 - (progress / 100) * 0.5
        : phase === "hold"
          ? 1.5
          : 1

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg">Breathing Exercise</h3>
            <Badge variant="outline">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</Badge>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={resetExercise}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Exercise Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-0 bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="font-serif font-bold text-lg">{cycles}</div>
            <div className="text-sm text-muted-foreground">Cycles</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="font-serif font-bold text-lg">{Math.round(totalTime)}s</div>
            <div className="text-sm text-muted-foreground">Duration</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="font-serif font-bold text-lg">{targetCycles}</div>
            <div className="text-sm text-muted-foreground">Target</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="font-serif font-bold text-lg">{getPhaseInstruction()}</div>
            <div className="text-sm text-muted-foreground">Current</div>
          </CardContent>
        </Card>
      </div>

      {/* Breathing Visualization */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          {!isActive && cycles < targetCycles ? (
            <div className="text-center space-y-4">
              <div className="text-lg font-semibold">Mindful Breathing</div>
              <p className="text-muted-foreground">
                Follow the breathing pattern to relax and center yourself. Complete {targetCycles} breathing cycles.
              </p>
              <div className="text-sm text-muted-foreground">
                Pattern: {breathingPattern.inhale}s in → {breathingPattern.hold}s hold → {breathingPattern.exhale}s out
                → {breathingPattern.rest}s rest
              </div>
              <Button onClick={startExercise} size="lg">
                <Play className="w-5 h-5 mr-2" />
                Start Exercise
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              {/* Breathing Circle */}
              <div className="relative flex items-center justify-center h-80">
                <div
                  className={`w-48 h-48 rounded-full ${getPhaseColor()} transition-all duration-300 ease-in-out flex items-center justify-center`}
                  style={{
                    transform: `scale(${circleScale})`,
                    opacity: 0.7,
                  }}
                >
                  <div className="text-white font-bold text-2xl">{getPhaseInstruction()}</div>
                </div>

                {/* Progress Ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-64 h-64 transform -rotate-90">
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-muted-foreground/20"
                    />
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 120}`}
                      strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                      className="text-accent transition-all duration-100"
                    />
                  </svg>
                </div>
              </div>

              {/* Phase Timer */}
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-foreground">
                  {Math.ceil(breathingPattern[phase] - timeInPhase)}
                </div>
                <div className="text-muted-foreground">seconds remaining</div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={pauseExercise}>
                  {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
                  {isPaused ? "Resume" : "Pause"}
                </Button>
                <Button variant="outline" onClick={resetExercise}>
                  Stop Exercise
                </Button>
              </div>

              {cycles >= targetCycles && (
                <div className="mt-6 text-center space-y-4 p-6 bg-accent/5 rounded-lg">
                  <div className="text-xl font-serif font-bold text-accent">Exercise Complete!</div>
                  <p className="text-muted-foreground">
                    You've completed {cycles} breathing cycles. Take a moment to notice how you feel.
                  </p>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div>
                      <div className="font-bold text-lg">{Math.round(totalTime)}s</div>
                      <div className="text-sm text-muted-foreground">Total Duration</div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">{cycles}</div>
                      <div className="text-sm text-muted-foreground">Cycles Completed</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
