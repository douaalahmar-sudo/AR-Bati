import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Header from './components/Header';
import PrivateRoute from './components/Private.Route';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Services from './pages/Services';
import Projects from './pages/Projects';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute'; 
import CreateProject from './pages/CreateProject';
import Devis from './pages/Devis';
import AdminInquiries from './components/AdminInquiries';

// This sub-component handles the "Smart Padding" and Route logic
function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={isHomePage ? "" : "pt-24 md:pt-28 min-h-screen bg-white"}>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/devis" element={<Devis />} />

        {/* Regular User Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin Specific Private Routes */}
        <Route element={<AdminRoute />}>
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/create-project' element={<CreateProject />} />
          
          {/* FIX: Combined Dashboard and Inbox routes here */}
          <Route path="/dashboard" element={<AdminInquiries />} />
          <Route path="/inbox" element={<AdminInquiries />} />
          <Route path="/admin-inquiries" element={<AdminInquiries />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}