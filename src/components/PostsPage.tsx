import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp } from "lucide-react";

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
  Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Table components implemented inline
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const handleViewPost = (post) => {
    setSelectedPost(post);
    setIsViewModalOpen(true);
  };

  // Fonction pour récupérer les posts depuis l'API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8081/api/posts');
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      setPosts(data);
      setError(null);
    } catch (err) {
      console.error('Erreur lors de la récupération des posts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Charger les posts au montage du composant
  useEffect(() => {
    fetchPosts();
  }, []);

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Fonction pour générer un statut aléatoire (seulement les 3 statuts demandés)
  const getRandomStatus = () => {
    const statuses = ['approved', 'rejected', 'flagged'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: { 
        variant: "default", 
        className: "bg-green-100 text-green-800 hover:bg-green-100",
        icon: CheckCircle
      },
      flagged: { 
        variant: "secondary", 
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        icon: AlertTriangle
      },
      rejected: { 
        variant: "destructive", 
        className: "bg-red-100 text-red-800 hover:bg-red-100",
        icon: XCircle
      }
    };
    
    return statusConfig[status] || statusConfig.approved;
  };

  // Calculer les statistiques basées sur les posts récupérés
  const getStats = () => {
    const stats = {
      approved: 0,
      rejected: 0,
      flagged: 0
    };

    posts.forEach(post => {
      const status = post.status || getRandomStatus();
      stats[status]++;
    });

    return stats;
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Chargement des publications...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-full">
        <div className="max-w-7xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">Erreur de chargement</span>
              </div>
              <p className="text-red-600 mt-2">{error}</p>
              <Button onClick={fetchPosts} className="mt-4" variant="outline">
                Réessayer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
              Modérez et administrez le contenu de votre communauté ({posts.length} publications)
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchPosts} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Actualiser
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nouvelle publication
            </Button>
          </div>
        </div>

        {/* Stats Cards - Seulement 3 cartes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approuvées</p>
                  <p className="text-2xl font-bold">{stats.approved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Signalées</p>
                  <p className="text-2xl font-bold">{stats.flagged}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejetées</p>
                  <p className="text-2xl font-bold">{stats.rejected}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
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
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Publication</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Auteur</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Statut</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tags</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Engagement</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {posts.map((post) => {
                    const status = post.status || getRandomStatus();
                    const StatusIcon = getStatusBadge(status).icon;
                    return (
                      <tr key={post.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle">
                          <div className="max-w-md">
                            <p className="font-medium text-foreground line-clamp-2">
                              Publication #{post.id}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {post.content.substring(0, 120)}...
                            </p>
                          </div>
                          
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={post.profileImage} alt={post.author} />
                              <AvatarFallback>
                                {post.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{post.author}</p>
                              <p className="text-xs text-muted-foreground">
                                {post.author.toLowerCase().replace(' ', '.')}@attijari.com
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge 
                            variant={getStatusBadge(status).variant}
                            className={`${getStatusBadge(status).className} flex items-center gap-1 w-fit`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {status === 'approved' ? 'Approuvé' : 
                             status === 'flagged' ? 'Signalé' : 
                             'Rejeté'}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
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
                        </td>
                        <td className="p-4 align-middle">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Eye className="h-3 w-3 text-muted-foreground" />
                              <span>{post.viewsCount || 0}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <MessageSquare className="h-3 w-3 text-muted-foreground" />
                              <span>{post.commentsCount || 0}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-orange-500">
                              <ThumbsUp className="h-3 w-3 fill-orange-500 stroke-orange-500" />
                              <span>{post.isLiked ? 1 : 0}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">
                              {formatDate(post.date)}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewPost(post)}>
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
                              <DropdownMenuItem>
                                <XCircle className="mr-2 h-4 w-4" />
                                Rejeter
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Modal pour voir le post complet */}
{isViewModalOpen && selectedPost && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">Publication #{selectedPost.id}</h3>
            <p className="text-sm text-muted-foreground">
              Posté par {selectedPost.author} le {formatDate(selectedPost.date)}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsViewModalOpen(false)}
          >
            <XCircle className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="whitespace-pre-line">{selectedPost.content}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {selectedPost.tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{selectedPost.viewsCount || 0} vues</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{selectedPost.commentsCount || 0} commentaires</span>
          </div>
          <div className="flex items-center gap-1 text-orange-500">
            <ThumbsUp className="h-4 w-4 fill-orange-500 stroke-orange-500" />
            <span className="text-sm">{selectedPost.isLiked ? 1 : 0} j'aime</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default PostsPage;