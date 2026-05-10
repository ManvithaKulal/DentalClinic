import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import ScrollManager from "./components/ScrollManager";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollManager />
      <Toaster position="top-right" richColors closeButton />
      <Navbar />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default App;
