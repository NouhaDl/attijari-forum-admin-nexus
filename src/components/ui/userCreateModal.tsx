// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Upload, UserPlus, X } from "lucide-react";
// import { z } from "zod";
// import { useToast } from "@/hooks/use-toast";

// interface UserCreateModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (newUser: any) => void;
// }

// // Create a schema for form validation
// const userSchema = z.object({
//   name: z.string().min(3, { message: "Le nom doit contenir au moins 3 caractères" }),
//   email: z.string().email({ message: "Adresse email invalide" }),
//   role: z.string().min(1, { message: "Veuillez sélectionner un rôle" }),
//   status: z.string().min(1, { message: "Veuillez sélectionner un statut" }),
//   avatar: z.string().optional(),
// });

// const UserCreateModal = ({ isOpen, onClose, onSave }: UserCreateModalProps) => {
//   const { toast } = useToast();
  
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "Utilisateur",
//     status: "actif",
//     avatar: "/placeholder.svg",
//     posts: 0,
//     comments: 0,
//     bio: "",
//   });
  
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [previewAvatar, setPreviewAvatar] = useState("");

//   // Reset form data when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       setFormData({
//         name: "",
//         email: "",
//         role: "Utilisateur",
//         status: "actif",
//         avatar: "/placeholder.svg",
//         posts: 0,
//         comments: 0,
//         bio: "",
//       });
//       setErrors({});
//       setIsSubmitting(false);
//       setPreviewAvatar("");
//     }
//   }, [isOpen]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
    
//     // Clear error for this field if it exists
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
    
//     // Clear error for this field if it exists
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Create a blob URL for image preview
//       const objectUrl = URL.createObjectURL(file);
//       setPreviewAvatar(objectUrl);
      
//       // In a real implementation, you would upload the image to a server
//       // For now, we'll just pretend we've uploaded it
//       setFormData((prev) => ({ ...prev, avatar: objectUrl }));
      
//       // Clean up the preview URL when the component unmounts
//       return () => URL.revokeObjectURL(objectUrl);
//     }
//   };

//   const validateForm = () => {
//     try {
//       userSchema.parse(formData);
//       return true;
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Record<string, string> = {};
//         error.errors.forEach((err) => {
//           if (err.path[0]) {
//             newErrors[err.path[0].toString()] = err.message;
//           }
//         });
//         setErrors(newErrors);
//       }
//       return false;
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     // Generate a random ID for the new user
//     const newUser = {
//       ...formData,
//       id: Math.floor(Math.random() * 1000) + 5, // Start from ID 6 to avoid conflicts with existing users
//       joinDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
//       lastActive: "à l'instant",
//     };
    
//     // Simulate API call
//     setTimeout(() => {
//       onSave(newUser);
//       toast({
//         title: "Utilisateur créé",
//         description: `Le compte pour ${newUser.name} a été créé avec succès.`,
//       });
//       onClose();
//       setIsSubmitting(false);
//     }, 600);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md md:max-w-xl bg-card/90 backdrop-blur-sm border-0 shadow-xl">
//         <DialogHeader className="border-b pb-4">
//           <DialogTitle className="text-xl flex items-center gap-2">
//             <UserPlus className="h-5 w-5 text-primary" />
//             Ajouter un nouvel utilisateur
//           </DialogTitle>
//           <DialogDescription>
//             Créez un nouveau compte utilisateur dans le système
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Profile Section */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-foreground">Informations du profil</h3>
            
//             <div className="flex flex-col sm:flex-row gap-6 items-start">
//               {/* Avatar Upload */}
//               <div className="flex flex-col items-center gap-2">
//                 <Avatar className="h-24 w-24 ring-4 ring-primary/20">
//                   <AvatarImage 
//                     src={previewAvatar || formData.avatar} 
//                     alt="Preview" 
//                   />
//                   <AvatarFallback className="bg-gradient-to-r from-primary to-primary/60 text-white text-xl">
//                     {formData.name ? formData.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'NU'}
//                   </AvatarFallback>
//                 </Avatar>
                
//                 <div className="relative">
//                   <input
//                     type="file"
//                     id="avatar-upload"
//                     accept="image/*"
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     onChange={handleImageUpload}
//                   />
//                   <Button 
//                     type="button" 
//                     variant="outline" 
//                     size="sm"
//                     className="flex items-center gap-2 text-xs"
//                   >
//                     <Upload className="h-3 w-3" /> 
//                     Choisir une image
//                   </Button>
//                 </div>
//               </div>
              
//               {/* Basic Info */}
//               <div className="flex-1 space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name" className="text-sm font-medium">
//                     Nom complet <span className="text-destructive">*</span>
//                   </Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     placeholder="Ahmed Bennani"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className={errors.name ? "border-destructive" : ""}
//                   />
//                   {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="email" className="text-sm font-medium">
//                     Email <span className="text-destructive">*</span>
//                   </Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="ahmed.bennani@attijari.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={errors.email ? "border-destructive" : ""}
//                   />
//                   {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="bio" className="text-sm font-medium">
//                     Bio (optionnelle)
//                   </Label>
//                   <Textarea
//                     id="bio"
//                     name="bio"
//                     placeholder="Description du profil utilisateur..."
//                     value={formData.bio}
//                     onChange={handleChange}
//                     className="resize-none h-20"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Account Settings */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-foreground">Paramètres du compte</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="role" className="text-sm font-medium">
//                   Rôle <span className="text-destructive">*</span>
//                 </Label>
//                 <Select 
//                   value={formData.role} 
//                   onValueChange={(value) => handleSelectChange("role", value)}
//                 >
//                   <SelectTrigger className={errors.role ? "border-destructive" : ""}>
//                     <SelectValue placeholder="Sélectionner un rôle" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Administrateur">
//                       <div className="flex items-center gap-2">
//                         Administrateur
//                         <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-950/20 dark:text-purple-400">
//                           Admin
//                         </Badge>
//                       </div>
//                     </SelectItem>
//                     <SelectItem value="Modérateur">
//                       <div className="flex items-center gap-2">
//                         Modérateur
//                         <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400">
//                           Mod
//                         </Badge>
//                       </div>
//                     </SelectItem>
//                     <SelectItem value="Utilisateur">
//                       <div className="flex items-center gap-2">
//                         Utilisateur
//                         <Badge className="bg-gray-50 text-gray-700 dark:bg-gray-950/20 dark:text-gray-300">
//                           User
//                         </Badge>
//                       </div>
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//                 {errors.role && <p className="text-destructive text-xs">{errors.role}</p>}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="status" className="text-sm font-medium">
//                   Statut <span className="text-destructive">*</span>
//                 </Label>
//                 <Select 
//                   value={formData.status} 
//                   onValueChange={(value) => handleSelectChange("status", value)}
//                 >
//                   <SelectTrigger className={errors.status ? "border-destructive" : ""}>
//                     <SelectValue placeholder="Sélectionner un statut" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="actif">
//                       <div className="flex items-center gap-2">
//                         Actif
//                         <Badge className="bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-400">
//                           Actif
//                         </Badge>
//                       </div>
//                     </SelectItem>
//                     <SelectItem value="sliver">
//                       <div className="flex items-center gap-2">
//                         Silver
//                         <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-950/20 dark:text-gray-400">
//                           Silver
//                         </Badge>
//                       </div>
//                     </SelectItem>
//                     <SelectItem value="Gold">
//                       <div className="flex items-center gap-2">
//                         Gold
//                         <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-400">
//                           Gold
//                         </Badge>
//                       </div>
//                     </SelectItem>
//                     <SelectItem value="inactif">
//                       <div className="flex items-center gap-2">
//                         Inactif
//                         <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-950/20 dark:text-gray-400">
//                           Inactif
//                         </Badge>
//                       </div>
//                     </SelectItem>
//                     <SelectItem value="suspendu">
//                       <div className="flex items-center gap-2">
//                         Suspendu
//                         <Badge className="bg-red-100 text-red-800 dark:bg-red-950/20 dark:text-red-400">
//                           Suspendu
//                         </Badge>
//                       </div>
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//                 {errors.status && <p className="text-destructive text-xs">{errors.status}</p>}
//               </div>
//             </div>
//           </div>

//           <DialogFooter className="pt-4 border-t flex flex-col sm:flex-row gap-2">
//             <Button 
//               type="button" 
//               variant="outline" 
//               onClick={onClose}
//               className="flex items-center gap-1 w-full sm:w-auto"
//             >
//               <X className="h-4 w-4" />
//               Annuler
//             </Button>
//             <Button 
//               type="submit"
//               disabled={isSubmitting}
//               className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg w-full sm:w-auto"
//             >
//               {isSubmitting ? "Création en cours..." : "Créer l'utilisateur"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UserCreateModal;