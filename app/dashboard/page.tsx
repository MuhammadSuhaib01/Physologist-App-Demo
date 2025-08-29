"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, TrendingUp, Target, Award, Brain, Heart, Zap, Bell, Settings, User, BarChart3 } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import ProgressSummary from "@/components/progress-summary"
import CelebrationModal from "@/components/celebration-modal"
import { useState } from "react"

// Mock data - in real app this would come from API
const mockProgressData = [
  { date: "2024-01-01", cognitive: 65, motor: 70, emotional: 60 },
  { date: "2024-01-02", cognitive: 68, motor: 72, emotional: 65 },
  { date: "2024-01-03", cognitive: 72, motor: 75, emotional: 68 },
  { date: "2024-01-04", cognitive: 75, motor: 78, emotional: 72 },
  { date: "2024-01-05", cognitive: 78, motor: 80, emotional: 75 },
  { date: "2024-01-06", cognitive: 82, motor: 83, emotional: 78 },
  { date: "2024-01-07", cognitive: 85, motor: 85, emotional: 82 },
]

const mockWeeklyData = [
  { day: "Mon", sessions: 2, duration: 45 },
  { day: "Tue", sessions: 1, duration: 30 },
  { day: "Wed", sessions: 3, duration: 60 },
  { day: "Thu", sessions: 2, duration: 40 },
  { day: "Fri", sessions: 1, duration: 25 },
  { day: "Sat", sessions: 2, duration: 50 },
  { day: "Sun", sessions: 1, duration: 35 },
]

const progressSummaryData = {
  overallProgress: 87,
  totalSessions: 42,
  currentStreak: 14,
  averageAccuracy: 91,
  achievements: 12,
  weeklyData: [
    { date: "2024-01-01", score: 65 },
    { date: "2024-01-02", score: 68 },
    { date: "2024-01-03", score: 72 },
    { date: "2024-01-04", score: 75 },
    { date: "2024-01-05", score: 78 },
    { date: "2024-01-06", score: 82 },
    { date: "2024-01-07", score: 87 },
  ],
  improvements: {
    cognitive: 12,
    motor: 8,
    emotional: 15,
  },
}

export default function DashboardPage() {
  const currentStreak = 7
  const totalSessions = 42
  const weeklyGoal = 5
  const completedThisWeek = 3

  const [celebrationModal, setCelebrationModal] = useState({
    isOpen: false,
    type: "achievement" as const,
    achievement: undefined as any,
    data: undefined as any,
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-serif font-bold text-xl text-foreground">TherapyPlay</span>
              </Link>
              <div className="hidden md:block">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {currentStreak} day streak!
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-serif font-bold text-3xl text-foreground">Welcome back, Alex!</h1>
              <p className="text-muted-foreground mt-1">Ready to continue your therapy journey?</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="font-serif font-bold text-2xl text-foreground">{currentStreak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="font-serif font-bold text-2xl text-foreground">{totalSessions}</div>
                <div className="text-sm text-muted-foreground">Total Sessions</div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/analytics">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="secondary">Ready</Badge>
              </div>
              <h3 className="font-serif font-bold text-xl mb-2">Start Today's Therapy</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Your personalized session is ready. Estimated time: 25 minutes
              </p>
              <Button className="w-full" asChild>
                <Link href="/therapy/session">Begin Session</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-secondary" />
                </div>
                <Badge variant="outline">
                  {completedThisWeek}/{weeklyGoal}
                </Badge>
              </div>
              <h3 className="font-serif font-bold text-xl mb-2">Weekly Goal</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {weeklyGoal - completedThisWeek} more sessions to reach your goal
              </p>
              <Progress value={(completedThisWeek / weeklyGoal) * 100} className="h-2" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <Badge variant="secondary">New!</Badge>
              </div>
              <h3 className="font-serif font-bold text-xl mb-2">Achievement Unlocked</h3>
              <p className="text-muted-foreground text-sm mb-4">"Focus Master" - Completed 5 cognitive sessions</p>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/rewards">View All Rewards</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Progress Overview */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-serif flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Weekly Progress
                    </CardTitle>
                    <CardDescription>Your improvement across all therapy areas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={mockProgressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="cognitive" stroke="hsl(var(--primary))" strokeWidth={2} />
                        <Line type="monotone" dataKey="motor" stroke="hsl(var(--secondary))" strokeWidth={2} />
                        <Line type="monotone" dataKey="emotional" stroke="hsl(var(--accent))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-sm">Cognitive</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-secondary rounded-full"></div>
                        <span className="text-sm">Motor</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-accent rounded-full"></div>
                        <span className="text-sm">Emotional</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-serif flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Session Activity
                    </CardTitle>
                    <CardDescription>Your therapy sessions this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={mockWeeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sessions" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-serif">Your Next Goal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Cognitive Improvement</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You're making great progress! Keep up the consistent practice to reach your 85% target.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-serif">Therapist Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm">
                          "Excellent improvement in reaction time. Consider increasing difficulty level for motor
                          exercises."
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">Dr. Sarah Johnson - 2 days ago</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        View All Notes
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-serif">Upcoming</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Therapist Check-in</p>
                          <p className="text-xs text-muted-foreground">Tomorrow at 2:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Progress Review</p>
                          <p className="text-xs text-muted-foreground">Friday at 10:00 AM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <ProgressSummary data={progressSummaryData} />

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Cognitive</CardTitle>
                  <CardDescription>Memory, attention, problem-solving</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-3xl font-serif font-bold text-primary">85%</div>
                  <Progress value={85} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold">Reaction Time</div>
                      <div className="text-muted-foreground">450ms avg</div>
                    </div>
                    <div>
                      <div className="font-semibold">Accuracy</div>
                      <div className="text-muted-foreground">92%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-secondary" />
                  </div>
                  <CardTitle className="font-serif">Motor Skills</CardTitle>
                  <CardDescription>Movement, coordination, strength</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-3xl font-serif font-bold text-secondary">78%</div>
                  <Progress value={78} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold">Precision</div>
                      <div className="text-muted-foreground">88%</div>
                    </div>
                    <div>
                      <div className="font-semibold">Speed</div>
                      <div className="text-muted-foreground">Good</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="font-serif">Emotional</CardTitle>
                  <CardDescription>Mood, anxiety, stress management</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-3xl font-serif font-bold text-accent">82%</div>
                  <Progress value={82} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold">Stress Level</div>
                      <div className="text-muted-foreground">Low</div>
                    </div>
                    <div>
                      <div className="font-semibold">Engagement</div>
                      <div className="text-muted-foreground">High</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Memory Match", type: "Cognitive", difficulty: "Medium", lastPlayed: "2 hours ago", score: 92 },
                { name: "Reaction Training", type: "Motor", difficulty: "Hard", lastPlayed: "Yesterday", score: 88 },
                {
                  name: "Breathing Exercise",
                  type: "Emotional",
                  difficulty: "Easy",
                  lastPlayed: "3 days ago",
                  score: 95,
                },
                {
                  name: "Pattern Recognition",
                  type: "Cognitive",
                  difficulty: "Medium",
                  lastPlayed: "1 week ago",
                  score: 85,
                },
                {
                  name: "Coordination Challenge",
                  type: "Motor",
                  difficulty: "Medium",
                  lastPlayed: "2 days ago",
                  score: 78,
                },
                { name: "Mindfulness Game", type: "Emotional", difficulty: "Easy", lastPlayed: "Yesterday", score: 90 },
              ].map((activity, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline">{activity.type}</Badge>
                      <Badge variant="secondary">{activity.difficulty}</Badge>
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-2">{activity.name}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Last played:</span>
                        <span>{activity.lastPlayed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Best score:</span>
                        <span>{activity.score}%</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-transparent" variant="outline">
                      Play Again
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-serif">Current Goals</CardTitle>
                  <CardDescription>Your active therapy objectives</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { goal: "Improve reaction time to under 400ms", progress: 75, target: "End of month" },
                    { goal: "Complete 5 sessions per week", progress: 60, target: "Ongoing" },
                    { goal: "Achieve 90% accuracy in memory games", progress: 85, target: "Next week" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.goal}</span>
                        <span className="text-muted-foreground">{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                      <div className="text-xs text-muted-foreground">Target: {item.target}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-serif">Achievements</CardTitle>
                  <CardDescription>Your therapy milestones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "First Steps", desc: "Completed your first therapy session", earned: true },
                    { name: "Consistent Player", desc: "7-day therapy streak", earned: true },
                    { name: "Focus Master", desc: "Completed 10 cognitive sessions", earned: true },
                    { name: "Speed Demon", desc: "Reaction time under 400ms", earned: false },
                    { name: "Perfectionist", desc: "100% accuracy in any game", earned: false },
                  ].map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg ${achievement.earned ? "bg-primary/5" : "bg-muted/30"}`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div
                          className={`font-semibold ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {achievement.name}
                        </div>
                        <div className="text-sm text-muted-foreground">{achievement.desc}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <CelebrationModal
        isOpen={celebrationModal.isOpen}
        onClose={() => setCelebrationModal((prev) => ({ ...prev, isOpen: false }))}
        achievement={celebrationModal.achievement}
        type={celebrationModal.type}
        data={celebrationModal.data}
      />
    </div>
  )
}
