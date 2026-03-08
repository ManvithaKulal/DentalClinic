import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Gallery from "../pages/Gallery";
import FAQ from "../pages/FAQ";
import Contact from "../pages/Contact";
import BookAppointment from "../pages/BookAppointment";
import MyAppointments from "../pages/MyAppointments";
import Login from "../pages/Login";
import Dashboard from "../pages/admin/Dashboard";
import Patients from "../pages/admin/Patients";
import Appointments from "../pages/admin/Appointments";
import UploadGallery from "../pages/admin/UploadGallery";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/book" element={<BookAppointment />} />
      <Route path="/my-appointments" element={<MyAppointments />} />
      <Route path="/login" element={<Login />} />

      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/patients"
        element={
          <ProtectedRoute role="admin">
            <Patients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/appointments"
        element={
          <ProtectedRoute role="admin">
            <Appointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/upload-gallery"
        element={
          <ProtectedRoute role="admin">
            <UploadGallery />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
