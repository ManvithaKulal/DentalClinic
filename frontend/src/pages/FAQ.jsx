import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    q: "What are your working hours?",
    a: "We operate from 11:00 AM to 3:00 PM, Monday to Saturday. Lunch break is from 1:00 PM to 1:30 PM.",
  },
  {
    q: "How do I book an appointment?",
    a: "You can book an appointment online by clicking the 'Book Appointment' button. Log in with your Google account, select a date and available time slot.",
  },
  {
    q: "Can I cancel my appointment?",
    a: "Yes, you can contact us or the admin can cancel your appointment from the admin panel.",
  },
  {
    q: "Do you accept walk-ins?",
    a: "We recommend booking online to guarantee a slot. Walk-ins are accepted based on availability.",
  },
  {
    q: "What dental services do you offer?",
    a: "We offer general dentistry, cosmetic procedures, orthodontics, oral surgery, root canals, and dental X-rays.",
  },
  {
    q: "Is the first consultation free?",
    a: "Yes! Your first consultation and dental check-up is completely free of charge.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        Frequently Asked Questions
      </h1>
      <p className="text-gray-500 text-center mb-12">
        Got questions? We've got answers.
      </p>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="font-medium text-gray-800 text-left">
                {faq.q}
              </span>
              {openIndex === i ? (
                <FaChevronUp className="text-primary" />
              ) : (
                <FaChevronDown className="text-gray-400" />
              )}
            </button>
            {openIndex === i && (
              <div className="px-6 pb-4 text-gray-600 bg-gray-50">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
