import { useAuth } from "../context/AuthContext";
import { FaGoogle, FaShieldAlt, FaTooth } from "react-icons/fa";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const { user } = useAuth();

  const handleGoogleLogin = () => {
    window.open(`${API_URL}/auth/google`, "_self");
  };

  if (user) {
    return (
      <div className="page-container max-w-2xl">
        <div className="card-surface py-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Welcome back, {user.name || "User"}.
          </h2>
          <p className="mt-2 text-slate-600">You are already signed in.</p>
          <div className="mt-6 flex justify-center">
            <Link to="/book" className="btn-primary">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container min-h-[68vh] max-w-5xl">
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        <section className="card-surface hidden p-8 lg:block">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FaTooth />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">
            Your Dental Journey, Simplified
          </h2>
          <p className="mt-3 text-slate-600">
            Sign in to book appointments, manage schedules, and view your visit
            history in one place.
          </p>
          <div className="mt-8 rounded-2xl bg-slate-50 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FaShieldAlt className="text-primary" />
              Secure Google Sign-In
            </p>
            <p className="mt-2 text-sm text-slate-600">
              We use trusted authentication to keep your profile and appointment
              data protected.
            </p>
          </div>
        </section>

        <section className="card-surface flex items-center p-8 sm:p-10">
          <div className="mx-auto w-full max-w-md text-center">
            <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-teal-400 text-xl text-white shadow">
              <FaTooth />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Sign In</h1>
            <p className="mt-2 text-slate-600">
              Access your DentalCare account to continue.
            </p>
            <button
              onClick={handleGoogleLogin}
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              <FaGoogle />
              Sign in with Google
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
