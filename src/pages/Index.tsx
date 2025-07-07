import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardOverview from "@/components/DashboardOverview";
import UsersPage from "@/components/UsersPage";
import PostsPage from "@/components/PostsPage";
import LoginForm from "@/components/LoginForm";
import Tags from "@/components/Tags"; // <-- ajoute ceci
import CommentPage from "@/components/comment"; // ✅ import manquant ajouté



const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; password: string } | null>(null);

  const handleLogin = (credentials: { email: string; password: string }) => {
    console.log("Tentative de connexion :", credentials);
    if (credentials.email && credentials.password) {
      setUser(credentials);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/comments" element={<CommentPage />} />


          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Index;
