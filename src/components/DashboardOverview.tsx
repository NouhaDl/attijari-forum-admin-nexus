
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  TrendingUp,
  ArrowUpRight,
  Tag,
  Eye
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
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
      title: "Tags Actifs",
      value: "156",
      change: "+15.3%",
      icon: Tag,
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

  const recentComments = [
    {
      id: 1,
      author: "Ahmed Bennani",
      content: "Excellente initiative pour la digitalisation bancaire !",
      post: "Nouvelle stratégie digitale AWB",
      time: "il y a 2h",
      status: "approved"
    },
    {
      id: 2,
      author: "Fatima El Alami",
      content: "J'aimerais avoir plus de détails sur cette procédure...",
      post: "Mise à jour des processus KYC",
      time: "il y a 4h",
      status: "pending"
    },
    {
      id: 3,
      author: "Omar Tazi",
      content: "Très informatif, merci pour le partage !",
      post: "Formation sur les nouveaux outils",
      time: "il y a 6h",
      status: "approved"
    }
  ];

  const popularTags = [
    { name: "Innovation", count: 234, trend: "+12%" },
    { name: "Digital", count: 189, trend: "+8%" },
    { name: "Formation", count: 156, trend: "+15%" },
    { name: "Réglementation", count: 134, trend: "+5%" },
    { name: "Stratégie", count: 98, trend: "+22%" }
  ];

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-background via-background to-muted/10 min-h-full">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="text-center lg:text-left space-y-4">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full px-6 py-3 backdrop-blur-sm border border-primary/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">Système en ligne</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            AttijariForum
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Tableau de bord intelligent pour la gestion de votre communauté d'entreprise
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={`group relative overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border-0 ${stat.bgColor} hover:bg-gradient-to-br hover:from-card hover:to-accent/20`}
              onClick={stat.onClick}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.title}
                </CardTitle>
                <div className={`p-3 rounded-xl ${stat.color} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-foreground mb-2 group-hover:text-4xl transition-all duration-300">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                  <ArrowUpRight className="h-4 w-4 text-green-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  <span className="text-xs text-muted-foreground">vs mois dernier</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Status Chart */}
          <Card className="lg:col-span-1 shadow-2xl border-0 bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-primary to-primary/60 rounded-full"></div>
                Répartition des statuts
              </CardTitle>
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

          {/* Activity Chart */}
          <Card className="lg:col-span-2 shadow-2xl border-0 bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                Activité mensuelle
              </CardTitle>
              <CardDescription>Publications, commentaires et nouveaux utilisateurs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="posts" fill="#3b82f6" name="Publications" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="comments" fill="#10b981" name="Commentaires" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="users" fill="#8b5cf6" name="Nouveaux utilisateurs" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Comments and Tags Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Comments */}
          <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                Commentaires récents
              </CardTitle>
              <CardDescription>Dernières interactions de la communauté</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentComments.map((comment) => (
                <div key={comment.id} className="p-4 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 transition-all duration-300 border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-medium text-sm text-foreground">{comment.author}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      comment.status === 'approved' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {comment.status === 'approved' ? 'Approuvé' : 'En attente'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{comment.content}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium">{comment.post}</span>
                    <span>{comment.time}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                <Eye className="h-4 w-4 mr-2" />
                Voir tous les commentaires
              </Button>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Tag className="h-5 w-5 text-orange-600" />
                Tags populaires
              </CardTitle>
              <CardDescription>Sujets les plus discutés ce mois</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {popularTags.map((tag, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 transition-all duration-300 border border-border/50 group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">#{tag.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-foreground">{tag.count}</div>
                    <div className="text-xs text-green-600 font-medium">{tag.trend}</div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                <Tag className="h-4 w-4 mr-2" />
                Gérer les tags
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-2xl border-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Actions rapides</CardTitle>
            <CardDescription>Accès direct aux fonctionnalités principales de modération</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button onClick={() => navigate("/users")} className="flex items-center gap-2 h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <Users className="h-5 w-5" />
              Gérer les utilisateurs
            </Button>
            <Button onClick={() => navigate("/posts")} className="flex items-center gap-2 h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <FileText className="h-5 w-5" />
              Modérer les publications
            </Button>
            <Button className="flex items-center gap-2 h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <MessageSquare className="h-5 w-5" />
              Gérer les commentaires
            </Button>
            <Button className="flex items-center gap-2 h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <TrendingUp className="h-5 w-5" />
              Analyser les tendances
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
