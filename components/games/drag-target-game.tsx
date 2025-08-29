"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, RotateCcw, Play } from "lucide-react"

interface DragTarget {
  id: number
  x: number
  y: number
  size: number
  color: string
  hit: boolean
}

interface DragStats {
  accuracy: number
  averageTime: number
  totalTargets: number
  hits: number
}

interface DragTargetGameProps {
  difficulty: "easy" | "medium" | "hard"
  onGameComplete: (stats: DragStats) => void
}

export default function DragTargetGame({ difficulty, onGameComplete }: DragTargetGameProps) {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [targets, setTargets] = useState<DragTarget[]>([])
  const [currentTarget, setCurrentTarget] = useState(0)
  const [dragPosition, setDragPosition] = useState({ x: 50, y: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [targetTimes, setTargetTimes] = useState<number[]>([])
  const [hits, setHits] = useState(0)
  const gameAreaRef = useRef<HTMLDivElement>(null)

  const getDifficultySettings = () => {
    switch (difficulty) {
      case "easy":
        return { targetCount: 8, targetSize: 60, timeLimit: 120 }
      case "medium":
        return { targetCount: 12, targetSize: 45, timeLimit: 90 }
      case "hard":
        return { targetCount: 16, targetSize: 30, timeLimit: 60 }
      default:
        return { targetCount: 8, targetSize: 60, timeLimit: 120 }
    }
  }

  const { targetCount, targetSize, timeLimit } = getDifficultySettings()
  const colors = ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400"]

  useEffect(() => {
    generateTargets()
  }, [difficulty])

  const generateTargets = () => {
    const newTargets: DragTarget[] = []
    for (let i = 0; i < targetCount; i++) {
      newTargets.push({
        id: i,
        x: Math.random() * (400 - targetSize) + targetSize / 2,
        y: Math.random() * (300 - targetSize) + targetSize / 2,
        size: targetSize,
        color: colors[i % colors.length],
        hit: false,
      })
    }
    setTargets(newTargets)
    setCurrentTarget(0)
    setHits(0)
    setTargetTimes([])
    setGameStarted(false)
    setGameComplete(false)
  }

  const startGame = () => {
    setGameStarted(true)
    setStartTime(Date.now())
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!gameStarted || gameComplete) return
    setIsDragging(true)
    updateDragPosition(e)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    updateDragPosition(e)
  }

  const handleMouseUp = () => {
    if (!isDragging || !gameStarted || gameComplete) return
    setIsDragging(false)
    checkTargetHit()
  }

  const updateDragPosition = (e: React.MouseEvent) => {
    if (!gameAreaRef.current) return
    const rect = gameAreaRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setDragPosition({ x: Math.max(15, Math.min(x, 485)), y: Math.max(15, Math.min(y, 285)) })
  }

  const checkTargetHit = () => {
    const target = targets[currentTarget]
    if (!target || target.hit) return

    const distance = Math.sqrt(Math.pow(dragPosition.x - target.x, 2) + Math.pow(dragPosition.y - target.y, 2))

    const isHit = distance < target.size / 2 + 15 // 15 is cursor radius
    const timeToHit = Date.now() - startTime

    setTargets((prev) => prev.map((t) => (t.id === target.id ? { ...t, hit: isHit } : t)))

    if (isHit) {
      setHits((prev) => prev + 1)
      setTargetTimes((prev) => [...prev, timeToHit])
    }

    // Move to next target or complete game
    setTimeout(() => {
      if (currentTarget + 1 >= targetCount) {
        const averageTime =
          targetTimes.length > 0 ? Math.round(targetTimes.reduce((a, b) => a + b, 0) / targetTimes.length) : 0
        const accuracy = Math.round((hits / targetCount) * 100)

        setGameComplete(true)
        onGameComplete({
          accuracy,
          averageTime,
          totalTargets: targetCount,
          hits: isHit ? hits + 1 : hits,
        })
      } else {
        setCurrentTarget((prev) => prev + 1)
        setStartTime(Date.now())
      }
    }, 500)
  }

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg">Drag to Target</h3>
            <Badge variant="outline">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</Badge>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={generateTargets}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-0 bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="font-serif font-bold text-lg">{currentTarget + 1}</div>
            <div className="text-sm text-muted-foreground">Target</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="font-serif font-bold text-lg">{hits}</div>
            <div className="text-sm text-muted-foreground">Hits</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="font-serif font-bold text-lg">
              {targetTimes.length > 0 ? Math.round(targetTimes.reduce((a, b) => a + b, 0) / targetTimes.length) : 0}ms
            </div>
            <div className="text-sm text-muted-foreground">Avg Time</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="font-serif font-bold text-lg">{Math.round((hits / Math.max(currentTarget, 1)) * 100)}%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </CardContent>
        </Card>
      </div>

      {/* Game Area */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          {!gameStarted ? (
            <div className="text-center space-y-4">
              <div className="text-lg font-semibold">Motor Coordination Challenge</div>
              <p className="text-muted-foreground">
                Drag the cursor to hit each target as quickly and accurately as possible.
              </p>
              <Button onClick={startGame} size="lg">
                <Play className="w-5 h-5 mr-2" />
                Start Game
              </Button>
            </div>
          ) : (
            <div
              ref={gameAreaRef}
              className="relative h-80 bg-muted/10 rounded-lg cursor-none overflow-hidden"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => setIsDragging(false)}
            >
              {/* Targets */}
              {targets.map((target, index) => (
                <div
                  key={target.id}
                  className={`absolute rounded-full transition-all duration-300 ${target.color} ${
                    index === currentTarget
                      ? "opacity-100 scale-100"
                      : target.hit
                        ? "opacity-50 scale-75"
                        : "opacity-30 scale-90"
                  } ${index === currentTarget ? "ring-4 ring-white ring-opacity-50" : ""}`}
                  style={{
                    left: target.x - target.size / 2,
                    top: target.y - target.size / 2,
                    width: target.size,
                    height: target.size,
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center text-white font-bold">
                    {index === currentTarget ? "●" : target.hit ? "✓" : "○"}
                  </div>
                </div>
              ))}

              {/* Cursor */}
              <div
                className="absolute w-8 h-8 bg-primary rounded-full border-2 border-white shadow-lg transition-all duration-75 pointer-events-none"
                style={{
                  left: dragPosition.x - 16,
                  top: dragPosition.y - 16,
                  transform: isDragging ? "scale(1.2)" : "scale(1)",
                }}
              />

              {gameComplete && (
                <div className="absolute inset-0 bg-background/90 flex items-center justify-center">
                  <div className="text-center space-y-4 p-6 bg-accent/5 rounded-lg">
                    <div className="text-xl font-serif font-bold text-accent">Game Complete!</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="font-bold text-lg">{Math.round((hits / targetCount) * 100)}%</div>
                        <div className="text-sm text-muted-foreground">Accuracy</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">
                          {hits}/{targetCount}
                        </div>
                        <div className="text-sm text-muted-foreground">Targets Hit</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      {hits / targetCount > 0.8
                        ? "Excellent coordination!"
                        : hits / targetCount > 0.6
                          ? "Good motor control!"
                          : "Keep practicing to improve!"}
                    </p>
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
