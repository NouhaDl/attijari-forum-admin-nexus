
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

const UsersPage = () => {
  const users = [
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
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      actif: { variant: "default" as const, className: "bg-green-100 text-green-800 hover:bg-green-100" },
      inactif: { variant: "secondary" as const, className: "bg-gray-100 text-gray-800 hover:bg-gray-100" },
      suspendu: { variant: "destructive" as const, className: "bg-red-100 text-red-800 hover:bg-red-100" }
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.actif;
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      "Administrateur": { variant: "default" as const, className: "bg-purple-100 text-purple-800 hover:bg-purple-100" },
      "Modérateur": { variant: "secondary" as const, className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
      "Utilisateur": { variant: "outline" as const, className: "bg-gray-50 text-gray-700 hover:bg-gray-50" }
    };
    
    return roleConfig[role as keyof typeof roleConfig] || roleConfig.Utilisateur;
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Gestion des utilisateurs
            </h1>
            <p className="text-muted-foreground mt-1">
              Administrez les comptes utilisateurs de votre communauté
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Ajouter un utilisateur
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">2,847</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Actifs</p>
                  <p className="text-2xl font-bold">2,456</p>
                </div>
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Inactifs</p>
                  <p className="text-2xl font-bold">345</p>
                </div>
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Suspendus</p>
                  <p className="text-2xl font-bold">46</p>
                </div>
                <Shield className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl">Liste des utilisateurs</CardTitle>
                <CardDescription>Gérez les comptes et permissions de vos utilisateurs</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Rechercher un utilisateur..." 
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
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Publications</TableHead>
                    <TableHead>Commentaires</TableHead>
                    <TableHead>Inscription</TableHead>
                    <TableHead>Dernière activité</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{user.email}</p>
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
                        <span className="text-sm font-medium">{user.posts}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{user.comments}</span>
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
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir le profil
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              Changer les permissions
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
    </div>
  );
};

export default UsersPage;
