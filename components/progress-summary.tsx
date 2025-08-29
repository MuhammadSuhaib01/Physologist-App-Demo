"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { TrendingUp, Calendar, Target, Award } from "lucide-react"

interface ProgressSummaryProps {
  data: {
    overallProgress: number
    totalSessions: number
    currentStreak: number
    averageAccuracy: number
    achievements: number
    weeklyData: Array<{ date: string; score: number }>
    improvements: {
      cognitive: number
      motor: number
      emotional: number
    }
  }
}

export default function ProgressSummary({ data }: ProgressSummaryProps) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-0 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                +{data.improvements.cognitive}%
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-serif font-bold">{data.overallProgress}%</div>
              <div className="text-xs text-muted-foreground">Overall Progress</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-secondary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-5 h-5 text-secondary" />
              <Badge variant="secondary">{data.currentStreak} days</Badge>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-serif font-bold">{data.totalSessions}</div>
              <div className="text-xs text-muted-foreground">Total Sessions</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-accent" />
              <Badge variant="secondary">{data.averageAccuracy}%</Badge>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-serif font-bold">{data.averageAccuracy}%</div>
              <div className="text-xs text-muted-foreground">Avg Accuracy</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-chart-1/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-5 h-5 text-chart-1" />
              <Badge variant="secondary">+3 new</Badge>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-serif font-bold">{data.achievements}</div>
              <div className="text-xs text-muted-foreground">Achievements</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="font-serif">Weekly Progress</CardTitle>
          <CardDescription>Your improvement trend over the past weeks</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.weeklyData}>
              <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Skill Improvements */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="font-serif">Skill Improvements</CardTitle>
          <CardDescription>Your progress in different therapy areas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Cognitive Function</span>
              <span className="text-primary">+{data.improvements.cognitive}%</span>
            </div>
            <Progress value={85 + data.improvements.cognitive} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Motor Skills</span>
              <span className="text-secondary">+{data.improvements.motor}%</span>
            </div>
            <Progress value={78 + data.improvements.motor} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Emotional Regulation</span>
              <span className="text-accent">+{data.improvements.emotional}%</span>
            </div>
            <Progress value={82 + data.improvements.emotional} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
