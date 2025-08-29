"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Home, ChevronRight } from "lucide-react"
import Link from "next/link"
import MemoryMatchGame from "@/components/games/memory-match-game"
import ReactionTimeGame from "@/components/games/reaction-time-game"
import DragTargetGame from "@/components/games/drag-target-game"
import BreathingExercise from "@/components/games/breathing-exercise"

type GameType = "memory" | "reaction" | "drag" | "breathing"
type Difficulty = "easy" | "medium" | "hard"

interface GameSession {
  type: GameType
  name: string
  description: string
  difficulty: Difficulty
}

export default function TherapySessionPage() {
  const [currentGameIndex, setCurrentGameIndex] = useState(0)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [gameResults, setGameResults] = useState<any[]>([])

  const gameSession: GameSession[] = [
    { type: "memory", name: "Memory Match", description: "Test your cognitive recall", difficulty: "medium" },
    { type: "reaction", name: "Reaction Time", description: "Improve your response speed", difficulty: "medium" },
    { type: "drag", name: "Motor Coordination", description: "Enhance hand-eye coordination", difficulty: "medium" },
    { type: "breathing", name: "Mindful Breathing", description: "Practice relaxation techniques", difficulty: "easy" },
  ]

  const currentGame = gameSession[currentGameIndex]
  const sessionProgress = ((currentGameIndex + (sessionComplete ? 1 : 0)) / gameSession.length) * 100

  const handleGameComplete = (stats: any) => {
    setGameResults((prev) => [...prev, { game: currentGame.name, stats }])

    if (currentGameIndex < gameSession.length - 1) {
      setTimeout(() => {
        setCurrentGameIndex((prev) => prev + 1)
      }, 2000)
    } else {
      setTimeout(() => {
        setSessionComplete(true)
      }, 2000)
    }
  }

  const renderCurrentGame = () => {
    switch (currentGame.type) {
      case "memory":
        return <MemoryMatchGame difficulty={currentGame.difficulty} onGameComplete={handleGameComplete} />
      case "reaction":
        return <ReactionTimeGame difficulty={currentGame.difficulty} onGameComplete={handleGameComplete} />
      case "drag":
        return <DragTargetGame difficulty={currentGame.difficulty} onGameComplete={handleGameComplete} />
      case "breathing":
        return <BreathingExercise difficulty={currentGame.difficulty} onGameComplete={handleGameComplete} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-card via-background to-muted">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">
                Game {currentGameIndex + 1} of {gameSession.length}
              </Badge>
              <div className="text-sm text-muted-foreground">Progress: {Math.round(sessionProgress)}%</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Session Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif font-bold text-3xl text-foreground mb-2">Today's Therapy Session</h1>
          <p className="text-muted-foreground">
            Personalized exercises for your cognitive, motor, and emotional development
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Session Progress</span>
            <span>{Math.round(sessionProgress)}% Complete</span>
          </div>
          <Progress value={sessionProgress} className="h-3" />
        </div>

        {/* Game Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {gameSession.map((game, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    index < currentGameIndex
                      ? "bg-primary text-primary-foreground"
                      : index === currentGameIndex
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {game.name}
                </div>
                {index < gameSession.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />}
              </div>
            ))}
          </div>
        </div>

        {/* Current Game or Session Complete */}
        {!sessionComplete ? (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="font-serif text-2xl">{currentGame.name}</CardTitle>
                <CardDescription>{currentGame.description}</CardDescription>
              </CardHeader>
            </Card>

            {renderCurrentGame()}
          </div>
        ) : (
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="font-serif text-2xl">Session Complete!</CardTitle>
              <CardDescription>Excellent work! You've completed today's therapy session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎉</span>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-serif font-bold text-primary">Outstanding Performance!</div>
                  <p className="text-muted-foreground">You've earned points and maintained your daily streak</p>
                </div>
              </div>

              {/* Session Summary */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-center">Session Summary</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {gameResults.map((result, index) => (
                    <Card key={index} className="border-0 bg-muted/20">
                      <CardContent className="p-4">
                        <div className="font-semibold mb-2">{result.game}</div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          {result.game === "Memory Match" && (
                            <>
                              <div>Accuracy: {result.stats.accuracy}%</div>
                              <div>Moves: {result.stats.moves}</div>
                            </>
                          )}
                          {result.game === "Reaction Time" && (
                            <>
                              <div>Average: {result.stats.averageTime}ms</div>
                              <div>Best: {result.stats.bestTime}ms</div>
                            </>
                          )}
                          {result.game === "Motor Coordination" && (
                            <>
                              <div>Accuracy: {result.stats.accuracy}%</div>
                              <div>
                                Hits: {result.stats.hits}/{result.stats.totalTargets}
                              </div>
                            </>
                          )}
                          {result.game === "Mindful Breathing" && (
                            <>
                              <div>Duration: {result.stats.duration}s</div>
                              <div>Cycles: {result.stats.cycles}</div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    <Home className="w-5 h-5 mr-2" />
                    Return to Dashboard
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  View Detailed Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
