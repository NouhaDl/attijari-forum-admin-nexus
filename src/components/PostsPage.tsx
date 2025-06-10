
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Plus,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PostsPage = () => {
  const posts = [
    {
      id: 1,
      title: "Guide complet sur les investissements bancaires",
      author: {
        name: "Ahmed Bennani",
        avatar: "/placeholder.svg",
        email: "ahmed.bennani@attijari.com"
      },
      status: "approuvé",
      tags: ["Finance", "Investissement", "Guide"],
      comments: 23,
      views: 1540,
      likes: 89,
      publishDate: "2024-06-08",
      lastModified: "2024-06-09",
      excerpt: "Un guide détaillé pour comprendre les différents types d'investissements..."
    },
    {
      id: 2,
      title: "Nouvelles réglementations bancaires 2024",
      author: {
        name: "Fatima El Alami",
        avatar: "/placeholder.svg",
        email: "fatima.elalami@attijari.com"
      },
      status: "en_attente",
      tags: ["Réglementation", "Banking", "2024"],
      comments: 12,
      views: 890,
      likes: 45,
      publishDate: "2024-06-07",
      lastModified: "2024-06-07",
      excerpt: "Analyse des nouvelles réglementations qui entrent en vigueur cette année..."
    },
    {
      id: 3,
      title: "Digitalisation des services bancaires",
      author: {
        name: "Omar Tazi",
        avatar: "/placeholder.svg",
        email: "omar.tazi@external.com"
      },
      status: "signalé",
      tags: ["Digital", "Innovation", "Technologie"],
      comments: 45,
      views: 2340,
      likes: 156,
      publishDate: "2024-06-06",
      lastModified: "2024-06-06",
      excerpt: "L'impact de la transformation digitale sur les services bancaires..."
    },
    {
      id: 4,
      title: "Stratégies de crédit pour PME",
      author: {
        name: "Aicha Mansouri",
        avatar: "/placeholder.svg",
        email: "aicha.mansouri@attijari.com"
      },
      status: "approuvé",
      tags: ["Crédit", "PME", "Stratégie"],
      comments: 67,
      views: 3120,
      likes: 234,
      publishDate: "2024-06-05",
      lastModified: "2024-06-05",
      excerpt: "Comment optimiser l'accès au crédit pour les petites et moyennes entreprises..."
    },
    {
      id: 5,
      title: "Impact de l'IA sur le secteur bancaire",
      author: {
        name: "Youssef Alami",
        avatar: "/placeholder.svg",
        email: "youssef.alami@external.com"
      },
      status: "rejeté",
      tags: ["IA", "Technologie", "Futur"],
      comments: 34,
      views: 1890,
      likes: 78,
      publishDate: "2024-06-04",
      lastModified: "2024-06-04",
      excerpt: "Exploration des applications de l'intelligence artificielle dans la banque..."
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approuvé: { 
        variant: "default" as const, 
        className: "bg-green-100 text-green-800 hover:bg-green-100",
        icon: CheckCircle
      },
      en_attente: { 
        variant: "secondary" as const, 
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        icon: Clock
      },
      signalé: { 
        variant: "destructive" as const, 
        className: "bg-red-100 text-red-800 hover:bg-red-100",
        icon: AlertTriangle
      },
      rejeté: { 
        variant: "outline" as const, 
        className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
        icon: XCircle
      }
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.en_attente;
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Gestion des publications
            </h1>
            <p className="text-muted-foreground mt-1">
              Modérez et administrez le contenu de votre communauté
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle publication
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approuvées</p>
                  <p className="text-2xl font-bold">1,847</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">En attente</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Signalées</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-950/20 dark:to-gray-900/20 border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejetées</p>
                  <p className="text-2xl font-bold">67</p>
                </div>
                <XCircle className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Table */}
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl">Liste des publications</CardTitle>
                <CardDescription>Administrez et modérez les publications de votre communauté</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Rechercher une publication..." 
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
                    <TableHead>Engagement</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => {
                    const StatusIcon = getStatusBadge(post.status).icon;
                    return (
                      <TableRow key={post.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="max-w-md">
                            <p className="font-medium text-foreground line-clamp-2">{post.title}</p>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={post.author.avatar} alt={post.author.name} />
                              <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{post.author.name}</p>
                              <p className="text-xs text-muted-foreground">{post.author.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={getStatusBadge(post.status).variant}
                            className={`${getStatusBadge(post.status).className} flex items-center gap-1 w-fit`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {post.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 max-w-32">
                            {post.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Eye className="h-3 w-3 text-muted-foreground" />
                              <span>{post.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <MessageSquare className="h-3 w-3 text-muted-foreground" />
                              <span>{post.comments}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <span className="text-red-500">♥</span>
                              <span>{post.likes}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Publié: {post.publishDate}</p>
                            <p className="text-xs text-muted-foreground">Modifié: {post.lastModified}</p>
                          </div>
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
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approuver
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                Signaler
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostsPage;
