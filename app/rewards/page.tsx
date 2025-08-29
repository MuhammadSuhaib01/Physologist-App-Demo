"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Trophy, Star, Zap, Target, Calendar, TrendingUp, Gift, Crown, Medal } from "lucide-react"
import Link from "next/link"

// Mock achievements data
const achievements = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first therapy session",
    icon: Star,
    category: "Milestone",
    points: 50,
    earned: true,
    earnedDate: "2024-01-01",
    rarity: "common",
  },
  {
    id: 2,
    name: "Consistent Player",
    description: "Maintain a 7-day therapy streak",
    icon: Calendar,
    category: "Streak",
    points: 100,
    earned: true,
    earnedDate: "2024-01-08",
    rarity: "uncommon",
  },
  {
    id: 3,
    name: "Focus Master",
    description: "Complete 10 cognitive therapy sessions",
    icon: Zap,
    category: "Cognitive",
    points: 150,
    earned: true,
    earnedDate: "2024-01-12",
    rarity: "rare",
  },
  {
    id: 4,
    name: "Speed Demon",
    description: "Achieve reaction time under 400ms",
    icon: TrendingUp,
    category: "Performance",
    points: 200,
    earned: false,
    progress: 75,
    rarity: "rare",
  },
  {
    id: 5,
    name: "Perfectionist",
    description: "Score 100% accuracy in any game",
    icon: Target,
    category: "Performance",
    points: 250,
    earned: false,
    progress: 92,
    rarity: "epic",
  },
  {
    id: 6,
    name: "Therapy Champion",
    description: "Complete 50 therapy sessions",
    icon: Trophy,
    category: "Milestone",
    points: 500,
    earned: false,
    progress: 84,
    rarity: "legendary",
  },
]

const streakRewards = [
  { days: 3, reward: "Bronze Badge", points: 25, earned: true },
  { days: 7, reward: "Silver Badge", points: 50, earned: true },
  { days: 14, reward: "Gold Badge", points: 100, earned: true },
  { days: 30, reward: "Platinum Badge", points: 200, earned: false, progress: 47 },
  { days: 60, reward: "Diamond Badge", points: 500, earned: false, progress: 23 },
]

const levelSystem = {
  currentLevel: 8,
  currentXP: 1250,
  nextLevelXP: 1500,
  totalXP: 1250,
  levelName: "Dedicated Learner",
}

export default function RewardsPage() {
  const earnedAchievements = achievements.filter((a) => a.earned)
  const unearned = achievements.filter((a) => !a.earned)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-serif font-bold text-xl text-foreground">Rewards</span>
              </Link>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Level Progress */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-2xl">Level {levelSystem.currentLevel}</h2>
                  <p className="text-muted-foreground">{levelSystem.levelName}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-2xl text-primary">{levelSystem.totalXP} XP</div>
                <p className="text-sm text-muted-foreground">Total Experience</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Level {levelSystem.currentLevel + 1}</span>
                <span>
                  {levelSystem.currentXP}/{levelSystem.nextLevelXP} XP
                </span>
              </div>
              <Progress value={(levelSystem.currentXP / levelSystem.nextLevelXP) * 100} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {levelSystem.nextLevelXP - levelSystem.currentXP} XP needed for next level
              </p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="streaks">Streak Rewards</TabsTrigger>
            <TabsTrigger value="leaderboard">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6">
            {/* Earned Achievements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Earned Achievements ({earnedAchievements.length})
                </CardTitle>
                <CardDescription>Your therapy accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earnedAchievements.map((achievement) => {
                    const IconComponent = achievement.icon
                    return (
                      <div key={achievement.id} className="p-4 border rounded-lg bg-primary/5 border-primary/20">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{achievement.name}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {achievement.category}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-primary">+{achievement.points} XP</span>
                          <span className="text-xs text-muted-foreground">
                            Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* In Progress Achievements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <Target className="w-5 h-5 text-muted-foreground" />
                  In Progress ({unearned.length})
                </CardTitle>
                <CardDescription>Achievements you're working towards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {unearned.map((achievement) => {
                    const IconComponent = achievement.icon
                    return (
                      <div key={achievement.id} className="p-4 border rounded-lg bg-muted/30">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-muted-foreground">{achievement.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {achievement.category}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                        {achievement.progress && (
                          <div className="space-y-1 mb-2">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress} className="h-2" />
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-muted-foreground">+{achievement.points} XP</span>
                          <Badge variant="outline" className="text-xs">
                            {achievement.rarity}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="streaks" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Streak Rewards
                </CardTitle>
                <CardDescription>Consistency pays off! Earn rewards for daily therapy sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {streakRewards.map((reward, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg ${reward.earned ? "bg-primary/5 border-primary/20" : "bg-muted/30"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${reward.earned ? "bg-primary" : "bg-muted"}`}
                          >
                            <Medal
                              className={`w-6 h-6 ${reward.earned ? "text-primary-foreground" : "text-muted-foreground"}`}
                            />
                          </div>
                          <div>
                            <h3
                              className={`font-semibold ${reward.earned ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {reward.days} Day Streak
                            </h3>
                            <p className="text-sm text-muted-foreground">{reward.reward}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${reward.earned ? "text-primary" : "text-muted-foreground"}`}>
                            +{reward.points} XP
                          </div>
                          {reward.earned ? (
                            <Badge variant="secondary">Earned</Badge>
                          ) : reward.progress ? (
                            <div className="text-xs text-muted-foreground">
                              {Math.round((reward.progress / 100) * reward.days)}/{reward.days} days
                            </div>
                          ) : (
                            <Badge variant="outline">Locked</Badge>
                          )}
                        </div>
                      </div>
                      {reward.progress && !reward.earned && (
                        <div className="mt-3">
                          <Progress value={reward.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-serif">Personal Milestones</CardTitle>
                  <CardDescription>Your therapy journey highlights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                    <span className="font-medium">Total Sessions Completed</span>
                    <span className="font-bold text-primary">42</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary/5 rounded-lg">
                    <span className="font-medium">Current Streak</span>
                    <span className="font-bold text-secondary">14 days</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
                    <span className="font-medium">Best Weekly Score</span>
                    <span className="font-bold text-accent">94%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Achievements Earned</span>
                    <span className="font-bold">
                      {earnedAchievements.length}/{achievements.length}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-serif">Motivation Boost</CardTitle>
                  <CardDescription>Keep up the great work!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                    <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-serif font-bold text-lg mb-2">You're doing amazing!</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your consistency is paying off. Keep up the great work and you'll unlock even more rewards!
                    </p>
                    <Button className="w-full">Continue Therapy</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
