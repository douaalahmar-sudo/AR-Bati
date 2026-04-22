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

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}  />
        </Route>
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}