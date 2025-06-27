import { useState, useEffect } from "react";
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
  ShieldCheck,
  Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Table components inline implementation
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ApiUser {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

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
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fonction utilitaire pour générer des données aléatoires
  const generateRandomData = (apiUser: ApiUser): User => {
    const statuses = ['actif', 'inactif', 'suspendu'];
    const roles = ['Administrateur', 'Modérateur', 'Utilisateur'];
    const domains = ['@attijari.com', '@external.com', '@gmail.com', '@outlook.com'];
    
    // Générer email basé sur le nom
    const email = `${apiUser.firstName.toLowerCase()}.${apiUser.lastName.toLowerCase()}${domains[Math.floor(Math.random() * domains.length)]}`;
    
    // Générer dates aléatoires
    const joinDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
      .toISOString().split('T')[0];
    
    const lastActiveOptions = [
      'il y a 1h', 'il y a 2h', 'il y a 30min', 'il y a 1 jour', 
      'il y a 2 jours', 'il y a 1 semaine', 'maintenant'
    ];

    return {
      id: parseInt(apiUser.id),
      name: `${apiUser.firstName} ${apiUser.lastName}`.trim(),
      email: email,
      role: roles[Math.floor(Math.random() * roles.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      posts: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 300),
      joinDate: joinDate,
      lastActive: lastActiveOptions[Math.floor(Math.random() * lastActiveOptions.length)],
      avatar: apiUser.profileImage
    };
  };

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8081/api/auth/users');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const apiUsers: ApiUser[] = await response.json();
        
        // Transform API data to User format with random data
        const transformedUsers = apiUsers.map(generateRandomData);
        
        setUsers(transformedUsers);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
    console.log('Edit user:', user);
    // Implement edit functionality
  };

  const handleDeleteUser = (user: User) => {
    console.log('Delete user:', user);
    // Implement delete functionality
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Chargement des utilisateurs...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Erreur de chargement</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Réessayer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              Administrez les comptes utilisateurs de la communauté AWB
            </p>
          </div>
          <Button 
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
          >
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
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b hover:bg-muted/30">
                    <th className="text-left p-4 font-semibold">Utilisateur</th>
                    <th className="text-left p-4 font-semibold">Email</th>
                    <th className="text-left p-4 font-semibold">Rôle</th>
                    <th className="text-left p-4 font-semibold">Statut</th>
                    <th className="text-left p-4 font-semibold">Publications</th>
                    <th className="text-left p-4 font-semibold">Commentaires</th>
                    <th className="text-left p-4 font-semibold">Inscription</th>
                    <th className="text-left p-4 font-semibold">Dernière activité</th>
                    <th className="text-left p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-gradient-to-r from-primary to-primary/60 text-white font-semibold">
                              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium">{user.email}</p>
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant={getRoleBadge(user.role).variant}
                          className={getRoleBadge(user.role).className}
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant={getStatusBadge(user.status).variant}
                          className={getStatusBadge(user.status).className}
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-semibold text-blue-600">{user.posts}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-semibold text-green-600">{user.comments}</span>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-muted-foreground">{user.joinDate}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-muted-foreground">{user.lastActive}</p>
                      </td>
                      <td className="p-4">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Aucun utilisateur trouvé</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsersPage;