import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import AdminRoute from './components/AdminRoute'; // This is the bouncer we just made!
import CreateProject from './pages/CreateProject';

export default function App() {
  return (
    <BrowserRouter>
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

        {/* Regular User Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}  />
        </Route>

        {/* Admin Only Routes - Keep it inside <Routes>! */}
        <Route element={<AdminRoute />}>
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/create-project' element={<CreateProject />} />
          {/* Future admin pages go here */}
        </Route>

        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}