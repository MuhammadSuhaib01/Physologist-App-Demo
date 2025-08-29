import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Users, TrendingUp, Calendar, Settings, Download, Eye, Edit } from "lucide-react"

// Mock data for demonstration
const patients = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 34,
    condition: "Stroke Recovery",
    therapyType: "Motor & Cognitive",
    lastSession: "2024-01-15",
    progress: 78,
    sessionsCompleted: 24,
    totalSessions: 30,
    status: "active",
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 67,
    condition: "Parkinson's Disease",
    therapyType: "Motor",
    lastSession: "2024-01-14",
    progress: 65,
    sessionsCompleted: 18,
    totalSessions: 25,
    status: "active",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    age: 28,
    condition: "Anxiety Disorder",
    therapyType: "Emotional",
    lastSession: "2024-01-13",
    progress: 82,
    sessionsCompleted: 16,
    totalSessions: 20,
    status: "active",
  },
]

const weeklyData = [
  { week: "Week 1", sessions: 45, avgScore: 72 },
  { week: "Week 2", sessions: 52, avgScore: 75 },
  { week: "Week 3", sessions: 48, avgScore: 78 },
  { week: "Week 4", sessions: 55, avgScore: 81 },
]

const gamePerformance = [
  { game: "Memory Match", avgScore: 85, sessions: 120 },
  { game: "Reaction Time", avgScore: 78, sessions: 98 },
  { game: "Drag Target", avgScore: 72, sessions: 87 },
  { game: "Breathing", avgScore: 91, sessions: 156 },
]

export default function TherapistDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Therapist Control Panel</h1>
          <p className="text-lg text-gray-600">Monitor patient progress and manage therapy sessions</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">+5% improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">Excellent adherence</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="patients">Patient Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Therapy Settings</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Overview</CardTitle>
                <CardDescription>Monitor your patients' progress and manage their therapy plans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={`/abstract-geometric-shapes.png?height=40&width=40&query=${patient.name}`} />
                          <AvatarFallback>
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{patient.name}</h3>
                          <p className="text-sm text-gray-600">
                            {patient.condition} • Age {patient.age}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary">{patient.therapyType}</Badge>
                            <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                              {patient.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Progress:</span>
                          <span className="font-semibold">{patient.progress}%</span>
                        </div>
                        <Progress value={patient.progress} className="w-24" />
                        <p className="text-xs text-gray-500">
                          {patient.sessionsCompleted}/{patient.totalSessions} sessions
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Session Trends</CardTitle>
                  <CardDescription>Sessions completed and average scores over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="sessions" stroke="#d97706" strokeWidth={2} />
                      <Line type="monotone" dataKey="avgScore" stroke="#6366f1" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Game Performance Analysis</CardTitle>
                  <CardDescription>Average scores across different therapy games</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={gamePerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="game" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avgScore" fill="#d97706" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Therapy Configuration</CardTitle>
                <CardDescription>Customize therapy parameters and difficulty settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Cognitive Therapy Settings</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Memory Game Difficulty</label>
                      <Progress value={65} className="w-full" />
                      <p className="text-xs text-gray-600">Adaptive difficulty enabled</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Reaction Time Threshold</label>
                      <Progress value={80} className="w-full" />
                      <p className="text-xs text-gray-600">Target: 800ms average</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Motor Therapy Settings</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Movement Precision</label>
                      <Progress value={70} className="w-full" />
                      <p className="text-xs text-gray-600">Tolerance: ±15px</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Speed Requirements</label>
                      <Progress value={55} className="w-full" />
                      <p className="text-xs text-gray-600">Moderate pace</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button>Save Settings</Button>
                  <Button variant="outline">Reset to Defaults</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Clinical Reports</CardTitle>
                <CardDescription>Generate and download patient progress reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Individual Patient Reports</h3>
                    <div className="space-y-2">
                      {patients.map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between p-3 border rounded">
                          <span className="font-medium">{patient.name}</span>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download PDF
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Aggregate Reports</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Weekly Summary Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Monthly Progress Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Clinical Outcomes Analysis
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
