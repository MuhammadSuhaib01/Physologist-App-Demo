"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Sparkles, Gift } from "lucide-react"

interface Achievement {
  name: string
  description: string
  points: number
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  icon?: React.ComponentType<any>
}

interface CelebrationModalProps {
  isOpen: boolean
  onClose: () => void
  achievement?: Achievement
  type: "achievement" | "level_up" | "streak" | "milestone"
  data?: any
}

const rarityColors = {
  common: "bg-gray-500",
  uncommon: "bg-green-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-yellow-500",
}

export default function CelebrationModal({ isOpen, onClose, achievement, type, data }: CelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const renderContent = () => {
    switch (type) {
      case "achievement":
        if (!achievement) return null
        const IconComponent = achievement.icon || Trophy
        return (
          <div className="text-center space-y-6">
            <div className="relative">
              {showConfetti && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
                </div>
              )}
              <div
                className={`w-24 h-24 ${rarityColors[achievement.rarity]} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
              >
                <IconComponent className="w-12 h-12 text-white" />
              </div>
            </div>
            <div>
              <h2 className="font-serif font-bold text-2xl mb-2">Achievement Unlocked!</h2>
              <h3 className="font-semibold text-xl text-primary mb-2">{achievement.name}</h3>
              <p className="text-muted-foreground mb-4">{achievement.description}</p>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary">+{achievement.points} XP</Badge>
                <Badge variant="outline" className="capitalize">
                  {achievement.rarity}
                </Badge>
              </div>
            </div>
          </div>
        )

      case "level_up":
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Star className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-2xl mb-2">Level Up!</h2>
              <h3 className="font-semibold text-xl text-primary mb-2">Level {data?.newLevel}</h3>
              <p className="text-muted-foreground mb-4">You've reached a new level in your therapy journey!</p>
              <Badge variant="secondary">+{data?.bonusXP || 100} Bonus XP</Badge>
            </div>
          </div>
        )

      case "streak":
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Gift className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-2xl mb-2">Streak Milestone!</h2>
              <h3 className="font-semibold text-xl text-primary mb-2">{data?.days} Day Streak</h3>
              <p className="text-muted-foreground mb-4">Your consistency is paying off!</p>
              <Badge variant="secondary">+{data?.points || 50} XP</Badge>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>Celebration</DialogTitle>
          <DialogDescription>You've earned a reward!</DialogDescription>
        </DialogHeader>

        <div className="py-6">{renderContent()}</div>

        <div className="flex gap-2">
          <Button onClick={onClose} className="flex-1">
            Awesome!
          </Button>
          <Button variant="outline" onClick={onClose}>
            View All Rewards
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
