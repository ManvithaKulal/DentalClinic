import { useAuth } from "../context/AuthContext";
import { FaGoogle } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const { user } = useAuth();

  const handleGoogleLogin = () => {
    window.open(`${API_URL}/auth/google`, "_self");
  };

  if (user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome, {user.name || "User"}!
        </h2>
        <p className="text-gray-600">You are already logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🦷</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to DentalCare
        </h2>
        <p className="text-gray-500 mb-8">
          Sign in to book appointments and more.
        </p>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition"
        >
          <FaGoogle />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
