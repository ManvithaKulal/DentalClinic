import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        Contact Us
      </h1>
      <p className="text-gray-500 text-center mb-12">
        Have a question or need to reach us? We'd love to hear from you.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-primary text-xl mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">Address</h3>
              <p className="text-gray-600">
                Car Street, near Sharada Press, Road, Mangaluru, Karnataka
                575001
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaPhone className="text-primary text-xl mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">Phone</h3>
              <p className="text-gray-600">+91 80501 02869</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaEnvelope className="text-primary text-xl mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">Email</h3>
              <p className="text-gray-600">manvithakulal2005@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaClock className="text-primary text-xl mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">Working Hours</h3>
              <p className="text-gray-600">Mon – Sat: 11:00 AM – 3:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Contact Form (static, no backend handler needed) */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Send a Message
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              rows="4"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition disabled:opacity-50"
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
