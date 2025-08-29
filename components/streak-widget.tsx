"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Flame, Trophy } from "lucide-react"

interface StreakWidgetProps {
  currentStreak: number
  longestStreak: number
  weeklyGoal: number
  completedThisWeek: number
}

export default function StreakWidget({
  currentStreak,
  longestStreak,
  weeklyGoal,
  completedThisWeek,
}: StreakWidgetProps) {
  const streakLevel =
    currentStreak >= 30 ? "legendary" : currentStreak >= 14 ? "epic" : currentStreak >= 7 ? "rare" : "common"

  const streakColors = {
    common: "text-gray-600 bg-gray-100",
    rare: "text-blue-600 bg-blue-100",
    epic: "text-purple-600 bg-purple-100",
    legendary: "text-yellow-600 bg-yellow-100",
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-semibold">Daily Streak</span>
          </div>
          <Badge variant="secondary" className={streakColors[streakLevel]}>
            {streakLevel}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-serif font-bold text-primary mb-1">{currentStreak}</div>
            <div className="text-sm text-muted-foreground">Days in a row</div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-2 bg-muted/50 rounded">
              <Trophy className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
              <div className="font-semibold">{longestStreak}</div>
              <div className="text-xs text-muted-foreground">Best Streak</div>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded">
              <Calendar className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
              <div className="font-semibold">
                {completedThisWeek}/{weeklyGoal}
              </div>
              <div className="text-xs text-muted-foreground">This Week</div>
            </div>
          </div>

          {currentStreak > 0 && (
            <div className="text-center text-sm text-muted-foreground">
              Keep it up! Complete today's session to extend your streak.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
