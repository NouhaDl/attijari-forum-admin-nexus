import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle,
  Download,
  Edit,
  Eye,
  Filter,
  Loader2,
  MessageSquare,
  MoreHorizontal,
  Search,
  ThumbsUp,
  Trash2,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Comment {
  id: number;
  content: string;
  author: string;
  profileImage?: string;
  postId: number;
  postTitle?: string;
  date: string;
  likesCount?: number;
  status?: "approved" | "flagged" | "rejected";
}

const CommentsPage: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<{ content: string }>({ content: "" });
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  /* --------------------------------- Helpers -------------------------------- */

  const formatDate = (_: string) => {
    return "20-06-2025";
  };
  

  const getRandomStatus = () => {
    const statuses: Comment["status"][] = ["approved", "rejected", "flagged"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getStatusBadge = (status: Comment["status"]) => {
    const statusConfig = {
      approved: {
        variant: "default" as const,
        className: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-950/20 dark:text-green-200",
        icon: CheckCircle,
        label: "Approuvé",
      },
      flagged: {
        variant: "secondary" as const,
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-950/20 dark:text-yellow-200",
        icon: AlertTriangle,
        label: "Signalé",
      },
      rejected: {
        variant: "destructive" as const,
        className: "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-200",
        icon: XCircle,
        label: "Rejeté",
      },
    } as const;

    return statusConfig[status || "approved"];
  };

  const getStats = () => {
    const stats = {
      approved: 0,
      rejected: 0,
      flagged: 0,
    };

    comments.forEach((comment) => {
      const status = comment.status || getRandomStatus();
      stats[status! as keyof typeof stats]++;
    });

    return stats;
  };

  /* --------------------------- CRUD API Interaction -------------------------- */

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8081/api/comments");
      if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
      const data = await response.json();
      setComments(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce commentaire ?")) return;
    try {
      const response = await fetch(`http://localhost:8081/api/comments/${commentId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Échec de la suppression");
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      alert("Commentaire supprimé avec succès !");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const updateComment = async () => {
    if (!selectedComment) return;
    try {
      setIsUpdating(true);
      const body = { content: editForm.content.trim() };
      const response = await fetch(`http://localhost:8081/api/comments/${selectedComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(`Erreur ${response.status}`);
      const updated = await response.json();
      setComments((prev) =>
        prev.map((c) => (c.id === updated.id ? { ...c, content: updated.content } : c))
      );
      setIsEditModalOpen(false);
      alert("Commentaire mis à jour avec succès !");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  /* -------------------------------- Lifecycle -------------------------------- */

  useEffect(() => {
    fetchComments();
  }, []);

  /* --------------------------------- Stats ---------------------------------- */

  const stats = getStats();

  /* ---------------------------------- Render --------------------------------- */

  if (loading) {
    return (
      <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-full flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Chargement des commentaires...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-full flex items-center justify-center">
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-300">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Erreur de chargement</span>
            </div>
            <p className="text-red-600 dark:text-red-300 mt-2">{error}</p>
            <Button onClick={fetchComments} className="mt-4" variant="outline">
              Réessayer
            </Button>
          </CardContent>
        </Card>
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
              Gestion des commentaires
            </h1>
            <p className="text-muted-foreground mt-1">
              Modérez et administrez les commentaires de votre communauté ({comments.length} commentaires)
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchComments} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approuvés</p>
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
                  <p className="text-sm text-muted-foreground">Signalés</p>
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
                  <p className="text-sm text-muted-foreground">Rejetés</p>
                  <p className="text-2xl font-bold">{stats.rejected}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comments Table */}
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl">Liste des commentaires</CardTitle>
                <CardDescription>
                  Administrez et modérez les commentaires de votre communauté
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Rechercher un commentaire..." className="pl-10 w-full sm:w-64" />
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
                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Commentaire</th>
                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Auteur</th>
                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Publication</th>
                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Statut</th>
                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Likes</th>
                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Date</th>
                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {comments.map((comment) => {
                    const status = comment.status || getRandomStatus();
                    const StatusIcon = getStatusBadge(status).icon;
                    return (
                      <tr
                        key={comment.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle max-w-md">
                          <p className="line-clamp-2 font-medium text-foreground">
                            {comment.content.substring(0, 120)}...
                          </p>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.profileImage} alt={comment.author} />
                              <AvatarFallback>
                                {comment.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{comment.author}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle max-w-xs">
                          <p className="line-clamp-1 text-sm text-muted-foreground">
                            {comment.postTitle || `Publication #${comment.postId}`}
                          </p>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge
                            variant={getStatusBadge(status).variant}
                            className={`${getStatusBadge(status).className} flex items-center gap-1 w-fit`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {getStatusBadge(status).label}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle text-center">
                          <div className="flex items-center gap-1 text-orange-500 justify-center">
                            <ThumbsUp className="h-4 w-4 fill-orange-500 stroke-orange-500" />
                            <span>{comment.likesCount || 0}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <p className="text-xs text-muted-foreground">{formatDate(comment.date)}</p>
                        </td>
                        <td className="p-4 align-middle">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedComment(comment);
                                  setIsViewModalOpen(true);
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" /> Voir
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedComment(comment);
                                  setEditForm({ content: comment.content });
                                  setIsEditModalOpen(true);
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" /> Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => deleteComment(comment.id)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Supprimer
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

      {/* View Modal */}
      {isViewModalOpen && selectedComment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">Commentaire #{selectedComment.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    Posté par {selectedComment.author} le {formatDate(selectedComment.date)}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsViewModalOpen(false)}>
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="whitespace-pre-line">{selectedComment.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedComment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">Modifier le commentaire #{selectedComment.id}</h3>
                  <p className="text-sm text-muted-foreground">Auteur : {selectedComment.author}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(false)} disabled={isUpdating}>
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Contenu</label>
                <textarea
                  className="w-full p-2 border rounded-md bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  rows={6}
                  value={editForm.content}
                  onChange={(e) => setEditForm({ content: e.target.value })}
                  disabled={isUpdating}
                />
              </div>

              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note :</strong> Seul le contenu peut être modifié.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)} disabled={isUpdating}>
                  Annuler
                </Button>
                <Button onClick={updateComment} disabled={isUpdating || !editForm.content.trim()}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mise à jour...
                    </>
                  ) : (
                    "Enregistrer"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsPage;
