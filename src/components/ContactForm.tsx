import { useState } from 'react';
import { Send } from 'lucide-react';
import { validateEmail, validatePhone } from '../utils/helpers';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
}

const ContactForm = ({ title = 'Get Free Consultation', subtitle = 'Fill the form and our team will contact you within 24 hours' }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    message: ''
  });

  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', city: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="card-premium bg-white p-8 md:p-10">
      <h3 className="text-3xl font-bold text-[#1F1F1F] mb-2">{title}</h3>
      <p className="text-gray-600 mb-8 text-lg">{subtitle}</p>

      {submitted && (
        <div className="bg-[#1E8449]/5 border-l-4 border-[#1E8449] text-[#1E8449] p-5 rounded-r-lg mb-6 animate-fade-in-up">
          <p className="font-semibold">Thank you for your interest!</p>
          <p className="text-sm mt-1">Our team will contact you within 24 hours.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-[#1F1F1F] mb-3 uppercase tracking-wider">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-5 py-3 border-2 rounded-lg transition-all duration-200 ${
              errors.name
                ? 'border-red-400 bg-red-50'
                : 'border-gray-200 hover:border-gray-300 focus:border-[#1E8449]'
            }`}
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.name}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-[#1F1F1F] mb-3 uppercase tracking-wider">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-5 py-3 border-2 rounded-lg transition-all duration-200 ${
                errors.phone
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300 focus:border-[#1E8449]'
              }`}
              placeholder="+91"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1F1F1F] mb-3 uppercase tracking-wider">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg hover:border-gray-300 focus:border-[#1E8449] transition-all duration-200"
              placeholder="Your city"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1F1F1F] mb-3 uppercase tracking-wider">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-5 py-3 border-2 rounded-lg transition-all duration-200 ${
              errors.email
                ? 'border-red-400 bg-red-50'
                : 'border-gray-200 hover:border-gray-300 focus:border-[#1E8449]'
            }`}
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1F1F1F] mb-3 uppercase tracking-wider">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg hover:border-gray-300 focus:border-[#1E8449] transition-all duration-200 resize-none"
            placeholder="Tell us about your solar requirements..."
          />
        </div>

        <button
          type="submit"
          className="w-full btn-primary flex items-center justify-center gap-2 font-bold py-4 rounded-xl hover:gap-4 transition-all group mt-8"
        >
          <Send size={20} className="group-hover:rotate-45 transition-transform" />
          Send Inquiry
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
