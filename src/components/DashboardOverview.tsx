
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useNavigate } from "react-router-dom";

const DashboardOverview = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Utilisateurs",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      onClick: () => navigate("/users")
    },
    {
      title: "Publications",
      value: "1,293",
      change: "+8.2%",
      icon: FileText,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      onClick: () => navigate("/posts")
    },
    {
      title: "Commentaires",
      value: "4,521",
      change: "+23.1%",
      icon: MessageSquare,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    },
    {
      title: "Engagement",
      value: "89.2%",
      change: "+5.4%",
      icon: TrendingUp,
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20"
    }
  ];

  const statusData = [
    { name: 'Approuvés', value: 65, color: '#10b981' },
    { name: 'En attente', value: 25, color: '#f59e0b' },
    { name: 'Signalés', value: 7, color: '#ef4444' },
    { name: 'Rejetés', value: 3, color: '#6b7280' }
  ];

  const activityData = [
    { month: 'Jan', posts: 120, comments: 340, users: 89 },
    { month: 'Fév', posts: 132, comments: 389, users: 124 },
    { month: 'Mar', posts: 145, comments: 420, users: 156 },
    { month: 'Avr', posts: 159, comments: 467, users: 198 },
    { month: 'Mai', posts: 167, comments: 512, users: 234 },
    { month: 'Jun', posts: 180, comments: 589, users: 267 }
  ];

  const engagementData = [
    { month: 'Jan', engagement: 82.5 },
    { month: 'Fév', engagement: 85.2 },
    { month: 'Mar', engagement: 87.8 },
    { month: 'Avr', engagement: 86.4 },
    { month: 'Mai', engagement: 88.9 },
    { month: 'Jun', engagement: 89.2 }
  ];

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-background to-muted/20 min-h-full">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
            Tableau de bord AttijariForum
          </h1>
          <p className="text-lg text-muted-foreground">
            Gérez votre communauté avec des outils d'administration avancés
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg border-0 ${stat.bgColor}`}
              onClick={stat.onClick}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-3 rounded-xl ${stat.color} shadow-lg`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-muted-foreground">vs mois dernier</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold">Répartition des statuts</CardTitle>
              <CardDescription>Distribution des publications par statut</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold">Activité mensuelle</CardTitle>
              <CardDescription>Publications, commentaires et nouveaux utilisateurs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="posts" fill="#3b82f6" name="Publications" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="comments" fill="#10b981" name="Commentaires" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="users" fill="#8b5cf6" name="Nouveaux utilisateurs" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Chart */}
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Évolution de l'engagement</CardTitle>
            <CardDescription>Taux d'engagement de la communauté au fil du temps</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#f59e0b', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Actions rapides</CardTitle>
            <CardDescription>Accès direct aux fonctionnalités principales</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button onClick={() => navigate("/users")} className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Gérer les utilisateurs
            </Button>
            <Button onClick={() => navigate("/posts")} variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Modérer les publications
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Voir les commentaires
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analyser les tendances
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
