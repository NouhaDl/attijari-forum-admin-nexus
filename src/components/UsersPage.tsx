
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Shield,
  ShieldCheck
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
import UserEditModal from "./UserEditModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  posts: number;
  comments: number;
  joinDate: string;
  lastActive: string;
  avatar: string;
}

const UsersPage = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Ahmed Bennani",
      email: "ahmed.bennani@attijari.com",
      role: "Administrateur",
      status: "actif",
      posts: 23,
      comments: 145,
      joinDate: "2023-01-15",
      lastActive: "il y a 2h",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Fatima El Alami",
      email: "fatima.elalami@attijari.com",
      role: "Modérateur",
      status: "actif",
      posts: 67,
      comments: 289,
      joinDate: "2023-03-22",
      lastActive: "il y a 1h",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Omar Tazi",
      email: "omar.tazi@external.com",
      role: "Utilisateur",
      status: "inactif",
      posts: 12,
      comments: 56,
      joinDate: "2023-05-10",
      lastActive: "il y a 2 jours",
      avatar: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Aicha Mansouri",
      email: "aicha.mansouri@attijari.com",
      role: "Utilisateur",
      status: "actif",
      posts: 89,
      comments: 234,
      joinDate: "2023-02-08",
      lastActive: "il y a 30min",
      avatar: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Youssef Alami",
      email: "youssef.alami@external.com",
      role: "Utilisateur",
      status: "suspendu",
      posts: 5,
      comments: 23,
      joinDate: "2024-01-20",
      lastActive: "il y a 1 semaine",
      avatar: "/placeholder.svg"
    }
  ]);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      actif: { variant: "default" as const, className: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-950/20 dark:text-green-400" },
      inactif: { variant: "secondary" as const, className: "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-950/20 dark:text-gray-400" },
      suspendu: { variant: "destructive" as const, className: "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400" }
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.actif;
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      "Administrateur": { variant: "default" as const, className: "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-950/20 dark:text-purple-400" },
      "Modérateur": { variant: "secondary" as const, className: "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400" },
      "Utilisateur": { variant: "outline" as const, className: "bg-gray-50 text-gray-700 hover:bg-gray-50 dark:bg-gray-950/20 dark:text-gray-300" }
    };
    
    return roleConfig[role as keyof typeof roleConfig] || roleConfig.Utilisateur;
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    toast({
      title: "Utilisateur modifié",
      description: `Les informations de ${updatedUser.name} ont été mises à jour avec succès.`,
    });
  };

  const handleDeleteUser = (user: User) => {
    setDeletingUser(user);
  };

  const confirmDeleteUser = () => {
    if (deletingUser) {
      setUsers(users.filter(u => u.id !== deletingUser.id));
      toast({
        title: "Utilisateur supprimé",
        description: `${deletingUser.name} a été supprimé définitivement.`,
        variant: "destructive",
      });
      setDeletingUser(null);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background to-muted/10 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Gestion des utilisateurs
            </h1>
            <p className="text-muted-foreground text-lg">
              Administrez les comptes utilisateurs de votre communauté AttijariForum
            </p>
          </div>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300">
            <UserPlus className="h-4 w-4" />
            Ajouter un utilisateur
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Utilisateurs</p>
                  <p className="text-3xl font-bold text-foreground">{users.length}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-500 shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Actifs</p>
                  <p className="text-3xl font-bold text-foreground">{users.filter(u => u.status === 'actif').length}</p>
                </div>
                <div className="p-3 rounded-full bg-green-500 shadow-lg">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Inactifs</p>
                  <p className="text-3xl font-bold text-foreground">{users.filter(u => u.status === 'inactif').length}</p>
                </div>
                <div className="p-3 rounded-full bg-yellow-500 shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Suspendus</p>
                  <p className="text-3xl font-bold text-foreground">{users.filter(u => u.status === 'suspendu').length}</p>
                </div>
                <div className="p-3 rounded-full bg-red-500 shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl font-semibold">Liste des utilisateurs</CardTitle>
                <CardDescription>Gérez les comptes et permissions de vos utilisateurs</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Rechercher un utilisateur..." 
                    className="pl-10 w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm" className="hover:bg-accent/80">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-accent/80">
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
                  <TableRow className="hover:bg-muted/30">
                    <TableHead className="font-semibold">Utilisateur</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Rôle</TableHead>
                    <TableHead className="font-semibold">Statut</TableHead>
                    <TableHead className="font-semibold">Publications</TableHead>
                    <TableHead className="font-semibold">Commentaires</TableHead>
                    <TableHead className="font-semibold">Inscription</TableHead>
                    <TableHead className="font-semibold">Dernière activité</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-gradient-to-r from-primary to-primary/60 text-white font-semibold">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-medium">{user.email}</p>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={getRoleBadge(user.role).variant}
                          className={getRoleBadge(user.role).className}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={getStatusBadge(user.status).variant}
                          className={getStatusBadge(user.status).className}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-semibold text-blue-600">{user.posts}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-semibold text-green-600">{user.comments}</span>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">{user.joinDate}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">{user.lastActive}</p>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-accent/80">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border border-border/50">
                            <DropdownMenuItem className="hover:bg-accent/80">
                              <Eye className="mr-2 h-4 w-4" />
                              Voir le profil
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditUser(user)} className="hover:bg-accent/80">
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-accent/80">
                              <Shield className="mr-2 h-4 w-4" />
                              Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteUser(user)}
                              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
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

        {/* Modals */}
        <UserEditModal
          user={editingUser}
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSaveUser}
        />

        <DeleteConfirmModal
          isOpen={!!deletingUser}
          onClose={() => setDeletingUser(null)}
          onConfirm={confirmDeleteUser}
          title="Supprimer l'utilisateur"
          description="Êtes-vous sûr de vouloir supprimer cet utilisateur ? Toutes ses publications et commentaires seront également supprimés."
          itemName={deletingUser?.name}
        />
      </div>
    </div>
  );
};

export default UsersPage;
