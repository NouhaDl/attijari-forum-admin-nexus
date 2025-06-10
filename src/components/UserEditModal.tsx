
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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

interface UserEditModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
}

const UserEditModal = ({ user, isOpen, onClose, onSave }: UserEditModalProps) => {
  const [editedUser, setEditedUser] = useState<User | null>(user);

  const handleSave = () => {
    if (editedUser) {
      onSave(editedUser);
      onClose();
    }
  };

  if (!editedUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-xl border border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Modifier l'utilisateur
          </DialogTitle>
          <DialogDescription>
            Modifiez les informations de l'utilisateur sélectionné
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right font-medium">
              Nom
            </Label>
            <Input
              id="name"
              value={editedUser.name}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right font-medium">
              Rôle
            </Label>
            <Select
              value={editedUser.role}
              onValueChange={(value) => setEditedUser({ ...editedUser, role: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Administrateur">Administrateur</SelectItem>
                <SelectItem value="Modérateur">Modérateur</SelectItem>
                <SelectItem value="Utilisateur">Utilisateur</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right font-medium">
              Statut
            </Label>
            <Select
              value={editedUser.status}
              onValueChange={(value) => setEditedUser({ ...editedUser, status: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="inactif">Inactif</SelectItem>
                <SelectItem value="suspendu">Suspendu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">
              Statistiques
            </Label>
            <div className="col-span-3 flex gap-2">
              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/20">
                {editedUser.posts} posts
              </Badge>
              <Badge variant="outline" className="bg-green-50 dark:bg-green-950/20">
                {editedUser.comments} commentaires
              </Badge>
            </div>
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            Sauvegarder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditModal;
