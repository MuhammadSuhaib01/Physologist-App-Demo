"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, RotateCcw, Play } from "lucide-react"

interface ReactionStats {
  averageTime: number
  bestTime: number
  attempts: number
  accuracy: number
}

interface ReactionTimeGameProps {
  difficulty: "easy" | "medium" | "hard"
  onGameComplete: (stats: ReactionStats) => void
}

export default function ReactionTimeGame({ difficulty, onGameComplete }: ReactionTimeGameProps) {
  const [gameState, setGameState] = useState<"waiting" | "ready" | "active" | "result" | "complete">("waiting")
  const [reactionTimes, setReactionTimes] = useState<number[]>([])
  const [currentRound, setCurrentRound] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [waitTime, setWaitTime] = useState(0)
  const [falseStarts, setFalseStarts] = useState(0)

  const getDifficultySettings = () => {
    switch (difficulty) {
      case "easy":
        return { rounds: 5, minWait: 2000, maxWait: 5000 }
      case "medium":
        return { rounds: 8, minWait: 1500, maxWait: 4000 }
      case "hard":
        return { rounds: 10, minWait: 1000, maxWait: 3000 }
      default:
        return { rounds: 5, minWait: 2000, maxWait: 5000 }
    }
  }

  const { rounds, minWait, maxWait } = getDifficultySettings()

  const startNewRound = useCallback(() => {
    if (currentRound >= rounds) {
      const averageTime =
        reactionTimes.length > 0 ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length) : 0
      const bestTime = reactionTimes.length > 0 ? Math.min(...reactionTimes) : 0
      const accuracy = Math.round(((rounds - falseStarts) / rounds) * 100)

      onGameComplete({
        averageTime,
        bestTime,
        attempts: rounds,
        accuracy,
      })
      setGameState("complete")
      return
    }

    setGameState("ready")
    const randomWait = Math.random() * (maxWait - minWait) + minWait
    setWaitTime(randomWait)

    setTimeout(() => {
      setStartTime(Date.now())
      setGameState("active")
    }, randomWait)
  }, [currentRound, rounds, reactionTimes, falseStarts, minWait, maxWait, onGameComplete])

  const handleClick = () => {
    if (gameState === "ready") {
      // False start
      setFalseStarts((prev) => prev + 1)
      setGameState("result")
      setTimeout(() => {
        setCurrentRound((prev) => prev + 1)
        startNewRound()
      }, 2000)
    } else if (gameState === "active") {
      // Valid reaction
      const reactionTime = Date.now() - startTime
      setReactionTimes((prev) => [...prev, reactionTime])
      setGameState("result")
      setTimeout(() => {
        setCurrentRound((prev) => prev + 1)
        startNewRound()
      }, 2000)
    }
  }

  const resetGame = () => {
    setGameState("waiting")
    setReactionTimes([])
    setCurrentRound(0)
    setFalseStarts(0)
    setStartTime(0)
    setWaitTime(0)
  }

  const startGame = () => {
    setCurrentRound(0)
    startNewRound()
  }

  const averageTime =
    reactionTimes.length > 0 ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length) : 0
  const bestTime = reactionTimes.length > 0 ? Math.min(...reactionTimes) : 0

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg">Reaction Time Test</h3>
            <Badge variant="outline">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</Badge>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={resetGame}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-0 bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="font-serif font-bold text-lg">{currentRound}</div>
            <div className="text-sm text-muted-foreground">Round</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="font-serif font-bold text-lg">{averageTime}ms</div>
            <div className="text-sm text-muted-foreground">Average</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="font-serif font-bold text-lg">{bestTime}ms</div>
            <div className="text-sm text-muted-foreground">Best</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="font-serif font-bold text-lg">{falseStarts}</div>
            <div className="text-sm text-muted-foreground">False Starts</div>
          </CardContent>
        </Card>
      </div>

      {/* Game Area */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          {gameState === "waiting" && (
            <div className="text-center space-y-4">
              <div className="text-lg font-semibold">Test Your Reflexes</div>
              <p className="text-muted-foreground">
                Click as quickly as possible when the screen turns green. Complete {rounds} rounds.
              </p>
              <Button onClick={startGame} size="lg">
                <Play className="w-5 h-5 mr-2" />
                Start Test
              </Button>
            </div>
          )}

          {gameState === "ready" && (
            <div
              className="h-64 bg-red-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-red-200"
              onClick={handleClick}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">Wait...</div>
                <div className="text-red-500">Click when it turns green</div>
              </div>
            </div>
          )}

          {gameState === "active" && (
            <div
              className="h-64 bg-green-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-green-200"
              onClick={handleClick}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">GO!</div>
                <div className="text-green-500">Click now!</div>
              </div>
            </div>
          )}

          {gameState === "result" && (
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                {reactionTimes.length > currentRound ? (
                  <>
                    <div className="text-2xl font-bold text-primary mb-2">
                      {reactionTimes[reactionTimes.length - 1]}ms
                    </div>
                    <div className="text-muted-foreground">Great reaction!</div>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-destructive mb-2">Too Early!</div>
                    <div className="text-muted-foreground">Wait for green</div>
                  </>
                )}
              </div>
            </div>
          )}

          {gameState === "complete" && (
            <div className="text-center space-y-4 p-6 bg-secondary/5 rounded-lg">
              <div className="text-xl font-serif font-bold text-secondary">Test Complete!</div>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div>
                  <div className="font-bold text-lg">{averageTime}ms</div>
                  <div className="text-sm text-muted-foreground">Average Time</div>
                </div>
                <div>
                  <div className="font-bold text-lg">{bestTime}ms</div>
                  <div className="text-sm text-muted-foreground">Best Time</div>
                </div>
              </div>
              <p className="text-muted-foreground">
                {averageTime < 300
                  ? "Excellent reflexes!"
                  : averageTime < 500
                    ? "Good reaction time!"
                    : "Keep practicing to improve!"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
