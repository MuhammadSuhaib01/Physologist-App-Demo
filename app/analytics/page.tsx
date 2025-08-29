"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { ArrowLeft, Download, TrendingUp, Calendar, Award, Target, Brain, Zap, Heart } from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from API
const weeklyProgressData = [
  { week: "Week 1", cognitive: 65, motor: 70, emotional: 60, overall: 65 },
  { week: "Week 2", cognitive: 68, motor: 72, emotional: 65, overall: 68 },
  { week: "Week 3", cognitive: 72, motor: 75, emotional: 68, overall: 72 },
  { week: "Week 4", cognitive: 75, motor: 78, emotional: 72, overall: 75 },
  { week: "Week 5", cognitive: 78, motor: 80, emotional: 75, overall: 78 },
  { week: "Week 6", cognitive: 82, motor: 83, emotional: 78, overall: 81 },
  { week: "Week 7", cognitive: 85, motor: 85, emotional: 82, overall: 84 },
  { week: "Week 8", cognitive: 88, motor: 87, emotional: 85, overall: 87 },
]

const dailySessionData = [
  { date: "2024-01-01", sessions: 2, duration: 45, accuracy: 85 },
  { date: "2024-01-02", sessions: 1, duration: 30, accuracy: 88 },
  { date: "2024-01-03", sessions: 3, duration: 60, accuracy: 92 },
  { date: "2024-01-04", sessions: 2, duration: 40, accuracy: 87 },
  { date: "2024-01-05", sessions: 1, duration: 25, accuracy: 90 },
  { date: "2024-01-06", sessions: 2, duration: 50, accuracy: 94 },
  { date: "2024-01-07", sessions: 1, duration: 35, accuracy: 89 },
  { date: "2024-01-08", sessions: 2, duration: 45, accuracy: 91 },
  { date: "2024-01-09", sessions: 3, duration: 65, accuracy: 93 },
  { date: "2024-01-10", sessions: 2, duration: 40, accuracy: 88 },
  { date: "2024-01-11", sessions: 1, duration: 30, accuracy: 86 },
  { date: "2024-01-12", sessions: 2, duration: 50, accuracy: 95 },
  { date: "2024-01-13", sessions: 1, duration: 35, accuracy: 92 },
  { date: "2024-01-14", sessions: 2, duration: 45, accuracy: 89 },
]

const gamePerformanceData = [
  { game: "Memory Match", sessions: 15, avgScore: 88, improvement: 12 },
  { game: "Reaction Time", sessions: 12, avgScore: 92, improvement: 8 },
  { game: "Motor Coordination", sessions: 10, avgScore: 85, improvement: 15 },
  { game: "Breathing Exercise", sessions: 18, avgScore: 95, improvement: 5 },
]

const skillRadarData = [
  { skill: "Memory", current: 88, target: 95 },
  { skill: "Attention", current: 85, target: 90 },
  { skill: "Coordination", current: 82, target: 88 },
  { skill: "Reaction Time", current: 90, target: 95 },
  { skill: "Emotional Regulation", current: 87, target: 92 },
  { skill: "Problem Solving", current: 83, target: 90 },
]

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "hsl(var(--chart-1))"]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("8weeks")
  const [comparisonMode, setComparisonMode] = useState("week")

  const exportReport = () => {
    // TODO: Implement PDF export functionality
    console.log("Exporting report...")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4weeks">4 Weeks</SelectItem>
                  <SelectItem value="8weeks">8 Weeks</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={exportReport}>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif font-bold text-3xl text-foreground mb-2">Progress Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into your therapy journey and improvements</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  +12%
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-serif font-bold">87%</div>
                <div className="text-sm text-muted-foreground">Overall Progress</div>
                <div className="text-xs text-green-600">vs last month</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  14 days
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-serif font-bold">42</div>
                <div className="text-sm text-muted-foreground">Total Sessions</div>
                <div className="text-xs text-blue-600">Current streak</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  92%
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-serif font-bold">91%</div>
                <div className="text-sm text-muted-foreground">Average Accuracy</div>
                <div className="text-xs text-purple-600">Across all games</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-chart-1/10 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-chart-1" />
                </div>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  +3
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-serif font-bold">12</div>
                <div className="text-sm text-muted-foreground">Achievements</div>
                <div className="text-xs text-orange-600">This month</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-serif">Weekly Progress Trend</CardTitle>
                  <CardDescription>Your improvement across all therapy areas over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="cognitive" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="motor" stroke="hsl(var(--secondary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="emotional" stroke="hsl(var(--accent))" strokeWidth={2} />
                      <Line type="monotone" dataKey="overall" stroke="hsl(var(--chart-1))" strokeWidth={3} />
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
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-chart-1 rounded-full"></div>
                      <span className="text-sm font-semibold">Overall</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-serif">Daily Session Activity</CardTitle>
                  <CardDescription>Your therapy engagement over the past two weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailySessionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sessions" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-serif">Game Performance Summary</CardTitle>
                  <CardDescription>Your performance across different therapy games</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gamePerformanceData.map((game, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{game.game}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{game.sessions} sessions</span>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              +{game.improvement}%
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={game.avgScore} className="flex-1 h-2" />
                          <span className="text-sm font-medium w-12">{game.avgScore}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-serif">Session Duration Distribution</CardTitle>
                  <CardDescription>How long you typically spend in therapy sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "15-30 min", value: 25, fill: COLORS[0] },
                          { name: "30-45 min", value: 45, fill: COLORS[1] },
                          { name: "45-60 min", value: 25, fill: COLORS[2] },
                          { name: "60+ min", value: 5, fill: COLORS[3] },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: "15-30 min", value: 25 },
                          { name: "30-45 min", value: 45 },
                          { name: "45-60 min", value: 25 },
                          { name: "60+ min", value: 5 },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">Compare:</span>
              <Select value={comparisonMode} onValueChange={setComparisonMode}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week vs Last Week</SelectItem>
                  <SelectItem value="month">This Month vs Last Month</SelectItem>
                  <SelectItem value="quarter">This Quarter vs Last Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Cognitive Performance</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">This Week</div>
                    <div className="text-3xl font-serif font-bold text-primary">88%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Last Week</div>
                    <div className="text-2xl font-serif font-bold text-muted-foreground">82%</div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    +6% improvement
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-secondary" />
                  </div>
                  <CardTitle className="font-serif">Motor Skills</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">This Week</div>
                    <div className="text-3xl font-serif font-bold text-secondary">85%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Last Week</div>
                    <div className="text-2xl font-serif font-bold text-muted-foreground">83%</div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    +2% improvement
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="font-serif">Emotional Wellbeing</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">This Week</div>
                    <div className="text-3xl font-serif font-bold text-accent">92%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Last Week</div>
                    <div className="text-2xl font-serif font-bold text-muted-foreground">87%</div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    +5% improvement
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif">Skill Assessment Radar</CardTitle>
                <CardDescription>Your current abilities vs target goals across different skill areas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={skillRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Current"
                      dataKey="current"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Target"
                      dataKey="target"
                      stroke="hsl(var(--secondary))"
                      fill="hsl(var(--secondary))"
                      fillOpacity={0.1}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm">Current Level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-secondary rounded-full"></div>
                    <span className="text-sm">Target Goal</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "First Steps",
                  description: "Completed your first therapy session",
                  earned: true,
                  date: "2024-01-01",
                  icon: "🎯",
                },
                {
                  name: "Consistent Player",
                  description: "Maintained a 7-day therapy streak",
                  earned: true,
                  date: "2024-01-07",
                  icon: "🔥",
                },
                {
                  name: "Focus Master",
                  description: "Achieved 90%+ accuracy in cognitive games",
                  earned: true,
                  date: "2024-01-10",
                  icon: "🧠",
                },
                {
                  name: "Speed Demon",
                  description: "Reaction time under 300ms",
                  earned: true,
                  date: "2024-01-12",
                  icon: "⚡",
                },
                {
                  name: "Zen Master",
                  description: "Completed 20 breathing exercises",
                  earned: true,
                  date: "2024-01-14",
                  icon: "🧘",
                },
                {
                  name: "Perfectionist",
                  description: "100% accuracy in any game",
                  earned: false,
                  date: null,
                  icon: "💎",
                },
                {
                  name: "Marathon Runner",
                  description: "30-day therapy streak",
                  earned: false,
                  date: null,
                  icon: "🏃",
                },
                {
                  name: "Improvement Champion",
                  description: "50% improvement in any skill area",
                  earned: false,
                  date: null,
                  icon: "🏆",
                },
                {
                  name: "Therapy Graduate",
                  description: "Complete 100 therapy sessions",
                  earned: false,
                  date: null,
                  icon: "🎓",
                },
              ].map((achievement, index) => (
                <Card
                  key={index}
                  className={`border-0 shadow-lg transition-all hover:shadow-xl ${achievement.earned ? "bg-primary/5" : "bg-muted/20"}`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3
                      className={`font-serif font-bold text-lg mb-2 ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                    {achievement.earned ? (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Earned {new Date(achievement.date!).toLocaleDateString()}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Not Yet Earned</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
