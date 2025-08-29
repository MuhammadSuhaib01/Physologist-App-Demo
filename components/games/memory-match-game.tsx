"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, RotateCcw, Play } from "lucide-react"

interface MemoryCard {
  id: number
  symbol: string
  isFlipped: boolean
  isMatched: boolean
}

interface GameStats {
  moves: number
  matches: number
  timeElapsed: number
  accuracy: number
}

interface MemoryMatchGameProps {
  difficulty: "easy" | "medium" | "hard"
  onGameComplete: (stats: GameStats) => void
}

export default function MemoryMatchGame({ difficulty, onGameComplete }: MemoryMatchGameProps) {
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [stats, setStats] = useState<GameStats>({
    moves: 0,
    matches: 0,
    timeElapsed: 0,
    accuracy: 0,
  })

  const symbols = ["🎯", "🌟", "🎨", "🎵", "🌈", "⚡", "🔥", "💎", "🌸", "🎪", "🎭", "🎨"]

  const getDifficultySettings = () => {
    switch (difficulty) {
      case "easy":
        return { pairs: 6, timeLimit: 120 }
      case "medium":
        return { pairs: 8, timeLimit: 90 }
      case "hard":
        return { pairs: 12, timeLimit: 60 }
      default:
        return { pairs: 6, timeLimit: 120 }
    }
  }

  const { pairs, timeLimit } = getDifficultySettings()

  useEffect(() => {
    initializeGame()
  }, [difficulty])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (gameStarted && !gameComplete) {
      interval = setInterval(() => {
        setStats((prev) => {
          const newTime = prev.timeElapsed + 1
          if (newTime >= timeLimit) {
            setGameComplete(true)
            onGameComplete({ ...prev, timeElapsed: newTime })
          }
          return { ...prev, timeElapsed: newTime }
        })
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [gameStarted, gameComplete, timeLimit, onGameComplete])

  const initializeGame = () => {
    const gameSymbols = symbols.slice(0, pairs)
    const cardPairs = [...gameSymbols, ...gameSymbols]
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }))

    setCards(shuffledCards)
    setFlippedCards([])
    setGameStarted(false)
    setGameComplete(false)
    setStats({ moves: 0, matches: 0, timeElapsed: 0, accuracy: 0 })
  }

  const startGame = () => {
    setGameStarted(true)
  }

  const handleCardClick = (cardId: number) => {
    if (!gameStarted || gameComplete) return
    if (flippedCards.length === 2) return
    if (cards[cardId].isFlipped || cards[cardId].isMatched) return

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    setCards((prev) => prev.map((card) => (card.id === cardId ? { ...card, isFlipped: true } : card)))

    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards
      const isMatch = cards[firstCard].symbol === cards[secondCard].symbol

      setStats((prev) => ({
        ...prev,
        moves: prev.moves + 1,
        matches: isMatch ? prev.matches + 1 : prev.matches,
        accuracy: Math.round(((isMatch ? prev.matches + 1 : prev.matches) / (prev.moves + 1)) * 100),
      }))

      setTimeout(() => {
        if (isMatch) {
          setCards((prev) =>
            prev.map((card) => (newFlippedCards.includes(card.id) ? { ...card, isMatched: true } : card)),
          )

          // Check if game is complete
          const updatedCards = cards.map((card) =>
            newFlippedCards.includes(card.id) ? { ...card, isMatched: true } : card,
          )

          if (updatedCards.every((card) => card.isMatched)) {
            setGameComplete(true)
            const finalStats = {
              moves: stats.moves + 1,
              matches: stats.matches + 1,
              timeElapsed: stats.timeElapsed,
              accuracy: Math.round(((stats.matches + 1) / (stats.moves + 1)) * 100),
            }
            onGameComplete(finalStats)
          }
        } else {
          setCards((prev) =>
            prev.map((card) => (newFlippedCards.includes(card.id) ? { ...card, isFlipped: false } : card)),
          )
        }
        setFlippedCards([])
      }, 1000)
    }
  }

  const timeRemaining = timeLimit - stats.timeElapsed
  const progressPercentage = (stats.timeElapsed / timeLimit) * 100

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg">Memory Match</h3>
            <Badge variant="outline">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</Badge>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={initializeGame}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-0 bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="font-serif font-bold text-lg">{stats.moves}</div>
            <div className="text-sm text-muted-foreground">Moves</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="font-serif font-bold text-lg">{stats.matches}</div>
            <div className="text-sm text-muted-foreground">Matches</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="font-serif font-bold text-lg">{stats.accuracy}%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-muted/20">
          <CardContent className="p-4 text-center">
            <div className="font-serif font-bold text-lg">{Math.max(0, timeRemaining)}s</div>
            <div className="text-sm text-muted-foreground">Time Left</div>
          </CardContent>
        </Card>
      </div>

      {/* Timer Progress */}
      {gameStarted && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Time Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      )}

      {/* Game Board */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          {!gameStarted ? (
            <div className="text-center space-y-4">
              <div className="text-lg font-semibold">Ready to test your memory?</div>
              <p className="text-muted-foreground">
                Find matching pairs by flipping cards. Complete all pairs before time runs out!
              </p>
              <Button onClick={startGame} size="lg">
                <Play className="w-5 h-5 mr-2" />
                Start Game
              </Button>
            </div>
          ) : (
            <div className={`grid gap-3 ${pairs <= 6 ? "grid-cols-4" : pairs <= 8 ? "grid-cols-4" : "grid-cols-6"}`}>
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`aspect-square rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center text-2xl font-bold ${
                    card.isFlipped || card.isMatched
                      ? card.isMatched
                        ? "bg-primary/20 text-primary border-2 border-primary"
                        : "bg-secondary/20 text-secondary border-2 border-secondary"
                      : "bg-muted hover:bg-muted/80 border-2 border-transparent"
                  }`}
                  onClick={() => handleCardClick(card.id)}
                >
                  {card.isFlipped || card.isMatched ? card.symbol : "?"}
                </div>
              ))}
            </div>
          )}

          {gameComplete && (
            <div className="mt-6 text-center space-y-4 p-6 bg-primary/5 rounded-lg">
              <div className="text-xl font-serif font-bold text-primary">
                {stats.matches === pairs ? "Congratulations!" : "Time's Up!"}
              </div>
              <p className="text-muted-foreground">
                {stats.matches === pairs
                  ? `You completed the game with ${stats.accuracy}% accuracy!`
                  : `You matched ${stats.matches} out of ${pairs} pairs.`}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
