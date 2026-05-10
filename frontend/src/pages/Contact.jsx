import { useState } from "react";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import API from "../api/axios";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/contact/send", formData);
      toast.success(res.data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  const infoItems = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      value: "Car Street, near Sharada Press, Mangaluru, Karnataka 575001",
    },
    {
      icon: <FaPhone />,
      title: "Phone",
      value: "+91 80501 02869",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      value: "manvithakulal2005@gmail.com",
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      value: "Mon - Sat: 11:00 AM - 3:00 PM | Sunday: Closed",
    },
  ];

  return (
    <div className="page-container">
      <div className="mb-10 text-center">
        <h1 className="section-title">Contact Us</h1>
        <p className="section-subtitle mx-auto">
          Questions, appointments, or treatment guidance. Reach out and our team
          will help you promptly.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <aside className="card-surface p-7 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Let&apos;s Start with a Conversation
          </h2>
          <p className="mt-2 text-slate-600">
            We are here to answer your questions and guide you to the right care.
          </p>

          <div className="mt-7 space-y-5">
            {infoItems.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="card-surface p-7 sm:p-8">
          <h3 className="text-2xl font-bold text-slate-900">Send a Message</h3>
          <p className="mt-2 text-sm text-slate-600">
            Fill out the form and we will get back to you as soon as possible.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="label-text">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="field"
              />
            </div>

            <div>
              <label htmlFor="email" className="label-text">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="field"
              />
            </div>

            <div>
              <label htmlFor="message" className="label-text">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                name="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                required
                className="field resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
