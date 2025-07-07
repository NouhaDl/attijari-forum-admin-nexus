
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
import { useLocation, useNavigate } from "react-router-dom";

interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
}

const DashboardSidebar = ({ open, onClose }: DashboardSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    {
      name: "Tableau de bord",
      icon: LayoutDashboard,
      path: "/",
      current: location.pathname === "/"
    },

    {
      name: "Utilisateurs",
      icon: Users,
      path: "/users",
      current: location.pathname === "/users"
    },
    {
      name: "Publications",
      icon: FileText,
      path: "/posts",
      current: location.pathname === "/posts"
    },
    {
      name: "Commentaires",
      icon: MessageSquare,
      path: "/comments",
      current: false
    },
    {
      name: "Tags",
      icon: Tags,
      path: "/tags",
      current: false
    },
    {
      name: "Analytiques",
      icon: BarChart3,
      path: "/analytics",
      current: false
    },
    {
      name: "Modération",
      icon: Shield,
      path: "/moderation",
      current: false
    },
    {
      name: "Paramètres",
      icon: Settings,
      path: "/settings",
      current: false
    },
    {
      name: "Aide",
      icon: HelpCircle,
      path: "/help",
      current: false
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose(); // Close sidebar on mobile after navigation
  };

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
        "fixed top-0 left-0 z-50 h-full w-64 bg-card/95 backdrop-blur-xl border-r border-border/50 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-xl lg:shadow-none",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-6 lg:hidden border-b border-border/50">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/1ea28dad-351e-4960-91bf-d4b9ba85d914.png" 
              alt="Attijariwafa Bank" 
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-lg font-semibold text-foreground">AttijariCommunity</h1>
              <p className="text-xs text-muted-foreground">Administration</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="hidden lg:flex items-center gap-3 p-6 border-b border-border/50">
          <img 
            src="/lovable-uploads/1ea28dad-351e-4960-91bf-d4b9ba85d914.png" 
            alt="Attijariwafa Bank" 
            className="h-8 w-auto"
          />
          <div>
            <h1 className="text-lg font-semibold text-foreground"> AttijariCommunity</h1>
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
                  "w-full justify-start gap-3 h-11 transition-all duration-200",
                  item.current 
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-sm" 
                    : "hover:bg-accent/50 hover:text-accent-foreground"
                )}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-colors",
                  item.current ? "text-primary" : "text-muted-foreground"
                )} />
                {item.name}
              </Button>
            ))}
          </nav>
        </ScrollArea>

        
      </div>
    </>
  );
};

export default DashboardSidebar;
