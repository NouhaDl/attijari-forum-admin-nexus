
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  Tags,
  BarChart3,
  Settings,
  Shield,
  HelpCircle,
  X
} from "lucide-react";

interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
}

const DashboardSidebar = ({ open, onClose }: DashboardSidebarProps) => {
  const navigation = [
    {
      name: "Tableau de bord",
      icon: LayoutDashboard,
      current: true
    },
    {
      name: "Utilisateurs",
      icon: Users,
      current: false
    },
    {
      name: "Publications",
      icon: FileText,
      current: false
    },
    {
      name: "Commentaires",
      icon: MessageSquare,
      current: false
    },
    {
      name: "Tags",
      icon: Tags,
      current: false
    },
    {
      name: "Analytiques",
      icon: BarChart3,
      current: false
    },
    {
      name: "Modération",
      icon: Shield,
      current: false
    },
    {
      name: "Paramètres",
      icon: Settings,
      current: false
    },
    {
      name: "Aide",
      icon: HelpCircle,
      current: false
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-6 lg:hidden">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/1ea28dad-351e-4960-91bf-d4b9ba85d914.png" 
              alt="Attijariwafa Bank" 
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-lg font-semibold text-foreground">AttijariForum</h1>
              <p className="text-xs text-muted-foreground">Administration</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="hidden lg:flex items-center gap-3 p-6 border-b border-border">
          <img 
            src="/lovable-uploads/1ea28dad-351e-4960-91bf-d4b9ba85d914.png" 
            alt="Attijariwafa Bank" 
            className="h-8 w-auto"
          />
          <div>
            <h1 className="text-lg font-semibold text-foreground">AttijariForum</h1>
            <p className="text-xs text-muted-foreground">Administration</p>
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 py-6">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={item.current ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11",
                  item.current && "bg-accent text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Button>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-6 border-t border-border">
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium text-sm text-foreground mb-1">Mise à niveau</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Accédez à plus de fonctionnalités avec notre plan Pro
            </p>
            <Button size="sm" className="w-full">
              Découvrir Pro
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
