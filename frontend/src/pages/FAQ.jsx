import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    q: "What are your working hours?",
    a: "We operate from 11:00 AM to 3:00 PM, Monday to Saturday. Sunday is closed.",
  },
  {
    q: "How do I book an appointment?",
    a: "Use the Book Appointment page, log in with Google, select a date, and pick an available slot.",
  },
  {
    q: "Can I cancel my appointment?",
    a: "Yes. Please contact us directly, or an admin can update the booking status from the admin panel.",
  },
  {
    q: "Do you accept walk-ins?",
    a: "Walk-ins are accepted based on availability, but booking online is recommended for faster service.",
  },
  {
    q: "What dental services do you offer?",
    a: "We provide general dentistry, cosmetic treatments, orthodontics, oral surgery, root canal, and X-ray diagnostics.",
  },
  {
    q: "Is the first consultation free?",
    a: "Yes. Your first consultation and basic dental check-up are free of charge.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="page-container max-w-4xl">
      <div className="mb-10 text-center">
        <h1 className="section-title">Frequently Asked Questions</h1>
        <p className="section-subtitle mx-auto">
          Quick answers to common questions about appointments, services, and
          clinic policies.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <article
            key={faq.q}
            className="card-surface overflow-hidden"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-slate-50"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="pr-4 text-base font-semibold text-slate-900">
                {faq.q}
              </span>
              <span className="text-primary">
                {openIndex === i ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            {openIndex === i && (
              <div className="border-t border-slate-100 bg-slate-50/80 px-6 py-4 text-slate-600">
                {faq.a}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
