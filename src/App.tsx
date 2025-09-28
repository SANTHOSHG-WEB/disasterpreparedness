import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Learning from "./pages/Learning";
import ModulePage from "./pages/ModulePage";
import EmergencyContacts from "./pages/EmergencyContacts";
import Map from "./pages/Map";
import Weather from "./pages/Weather";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAuth from "./pages/AdminAuth";
import Certificate from "./components/Certificate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/module/:moduleId" element={<ModulePage />} />
              <Route path="/emergency-contacts" element={<EmergencyContacts />} />
              <Route path="/admin/auth" element={<AdminAuth />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/map" element={<Map />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/about" element={<About />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
