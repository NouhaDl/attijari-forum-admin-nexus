import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Save, X, TrendingUp } from "lucide-react";

interface Tag {
  id: number;
  name: string;
  color: string;
  postCount: number;
}

const Tags = () => {
  const [tags, setTags] = useState<Tag[]>([
    { id: 1, name: "Finance", color: "#F97316", postCount: 245 },
    { id: 2, name: "Investissement", color: "#F97316", postCount: 189 },
    { id: 3, name: "Crédit", color: "#F97316", postCount: 156 },
    { id: 4, name: "Épargne", color: "#F97316", postCount: 134 },
    { id: 5, name: "Assurance", color: "#F97316", postCount: 123 },
    { id: 6, name: "Banque Digitale", color: "#F97316", postCount: 98 },
    { id: 7, name: "Conseils", color: "#F97316", postCount: 87 },
    { id: 8, name: "Cartes Bancaires", color: "#F97316", postCount: 76 },
    { id: 9, name: "Prêt Immobilier", color: "#F97316", postCount: 65 },
    { id: 10, name: "Services", color: "#F97316", postCount: 54 },
  ]);

  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const handleEdit = (tag: Tag) => setEditingTag(tag);
  const handleCancel = () => setEditingTag(null);

  const handleSave = () => {
    if (editingTag) {
      setTags((prev) =>
        prev.map((tag) =>
          tag.id === editingTag.id ? { ...editingTag } : tag
        )
      );
      setEditingTag(null);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce tag ?")) {
      setTags((prev) => prev.filter((tag) => tag.id !== id));
    }
  };

  const colorOptions = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EF4444",
    "#06B6D4",
    "#84CC16",
    "#F97316",
    "#EC4899",
    "#6366F1",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Tags</h1>
          <p className="text-muted-foreground mt-2">
            Gérez les catégories qui organisent votre contenu
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          Tags les plus populaires
        </div>
      </div>

      {/* List of Tags */}
      <div className="grid gap-4">
        {tags.map((tag, index) => (
          <Card
            key={tag.id}
            className="transition-all duration-300 hover:shadow-lg border border-border/40"
          >
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="text-lg font-semibold text-muted-foreground w-6">
                  #{index + 1}
                </div>

                {editingTag?.id === tag.id ? (
                  <div className="flex items-center gap-3">
                    <Input
                      value={editingTag.name}
                      onChange={(e) =>
                        setEditingTag({ ...editingTag, name: e.target.value })
                      }
                      className="w-40"
                    />
                    <div className="flex gap-1">
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          className={`w-6 h-6 rounded-full border-2 ${
                            editingTag.color === color
                              ? "border-foreground"
                              : "border-border"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() =>
                            setEditingTag({ ...editingTag, color })
                          }
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Badge
                      className="text-white font-medium px-3 py-1"
                      style={{ backgroundColor: tag.color }}
                    >
                      {tag.name}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {tag.postCount} publications
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {editingTag?.id === tag.id ? (
                  <>
                    <Button size="sm" className="h-8" onClick={handleSave}>
                      <Save className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8"
                      onClick={handleCancel}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8"
                      onClick={() => handleEdit(tag)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(tag.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistiques */}
      <Card className="bg-muted/30 border border-border/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Statistiques</CardTitle>
          <CardDescription>
            Aperçu global de l'engagement autour des tags
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{tags.length}</div>
            <div className="text-sm text-muted-foreground">Tags actifs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {tags.reduce((sum, tag) => sum + tag.postCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">
              Publications totales
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {Math.round(
                tags.reduce((sum, tag) => sum + tag.postCount, 0) / tags.length
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Moyenne par tag
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tags;
