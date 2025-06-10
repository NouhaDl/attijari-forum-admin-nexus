
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data for the dashboard
  const stats = [
    {
      title: "Total Utilisateurs",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Publications",
      value: "1,293",
      change: "+8.2%",
      icon: FileText,
      color: "bg-green-500"
    },
    {
      title: "Commentaires",
      value: "4,521",
      change: "+23.1%",
      icon: MessageSquare,
      color: "bg-purple-500"
    },
    {
      title: "Engagement",
      value: "89.2%",
      change: "+5.4%",
      icon: TrendingUp,
      color: "bg-orange-500"
    }
  ];

  const posts = [
    {
      id: 1,
      title: "Guide complet sur les investissements bancaires",
      author: "Ahmed Bennani",
      status: "approuvé",
      tags: ["Finance", "Investissement"],
      comments: 23,
      views: 1540,
      date: "2024-06-08"
    },
    {
      id: 2,
      title: "Nouvelles réglementations bancaires 2024",
      author: "Fatima El Alami",
      status: "en_attente",
      tags: ["Réglementation", "Banking"],
      comments: 12,
      views: 890,
      date: "2024-06-07"
    },
    {
      id: 3,
      title: "Digitalisation des services bancaires",
      author: "Omar Tazi",
      status: "signalé",
      tags: ["Digital", "Innovation"],
      comments: 45,
      views: 2340,
      date: "2024-06-06"
    },
    {
      id: 4,
      title: "Stratégies de crédit pour PME",
      author: "Aicha Mansouri",
      status: "approuvé",
      tags: ["Crédit", "PME"],
      comments: 67,
      views: 3120,
      date: "2024-06-05"
    },
    {
      id: 5,
      title: "Impact de l'IA sur le secteur bancaire",
      author: "Youssef Alami",
      status: "rejeté",
      tags: ["IA", "Technologie"],
      comments: 34,
      views: 1890,
      date: "2024-06-04"
    }
  ];

  const statusData = [
    { name: 'Approuvés', value: 65, color: '#22c55e' },
    { name: 'En attente', value: 25, color: '#f59e0b' },
    { name: 'Signalés', value: 7, color: '#ef4444' },
    { name: 'Rejetés', value: 3, color: '#6b7280' }
  ];

  const activityData = [
    { month: 'Jan', posts: 120, comments: 340 },
    { month: 'Fév', posts: 132, comments: 389 },
    { month: 'Mar', posts: 145, comments: 420 },
    { month: 'Avr', posts: 159, comments: 467 },
    { month: 'Mai', posts: 167, comments: 512 },
    { month: 'Jun', posts: 180, comments: 589 }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approuvé: { variant: "default" as const, className: "bg-green-100 text-green-800 hover:bg-green-100" },
      en_attente: { variant: "secondary" as const, className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
      signalé: { variant: "destructive" as const, className: "bg-red-100 text-red-800 hover:bg-red-100" },
      rejeté: { variant: "outline" as const, className: "bg-gray-100 text-gray-800 hover:bg-gray-100" }
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.en_attente;
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Tableau de bord AttijariForum
              </h1>
              <p className="text-muted-foreground">
                Gérez votre communauté en ligne avec des outils d'administration avancés
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-md ${stat.color}`}>
                      <stat.icon className="h-4 w-4 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <p className="text-xs text-green-600 font-medium">{stat.change} vs mois dernier</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Répartition des statuts</CardTitle>
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

              <Card>
                <CardHeader>
                  <CardTitle>Activité mensuelle</CardTitle>
                  <CardDescription>Évolution des publications et commentaires</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="posts" fill="#3b82f6" name="Publications" />
                      <Bar dataKey="comments" fill="#10b981" name="Commentaires" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Posts Management */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Gestion des publications</CardTitle>
                    <CardDescription>Administrez et modérez les publications de votre communauté</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        placeholder="Rechercher..." 
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtrer
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Exporter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Publication</TableHead>
                        <TableHead>Auteur</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Commentaires</TableHead>
                        <TableHead>Vues</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>
                            <div className="max-w-xs">
                              <p className="font-medium text-foreground truncate">{post.title}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-muted-foreground">{post.author}</p>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={getStatusBadge(post.status).variant}
                              className={getStatusBadge(post.status).className}
                            >
                              {post.status.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {post.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{post.comments}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{post.views.toLocaleString()}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-muted-foreground">{post.date}</p>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Voir
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Modifier
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
