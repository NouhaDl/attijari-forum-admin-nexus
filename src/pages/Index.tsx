
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardOverview from "@/components/DashboardOverview";
import UsersPage from "@/components/UsersPage";
import PostsPage from "@/components/PostsPage";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/posts" element={<PostsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Index;
