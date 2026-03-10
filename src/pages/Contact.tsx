import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../utils/constants';
import { getPhoneLink, getEmailLink, getWhatsAppLink, validateEmail, validatePhone } from '../utils/helpers';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', city: '', interest: '', message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const interests = [
    'Residential Solar', 'Commercial Solar', 'Industrial Solar', 'Solar Pump (Kisan)',
    'Solar Products', 'Training / Internship', 'Vendor / Partner', 'General Inquiry'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = 'Full name is required';
    if (!formData.phone.trim()) e.phone = 'Phone number is required';
    else if (!validatePhone(formData.phone.replace(/\s+/g, ''))) e.phone = 'Enter a valid 10-digit number';
    if (!formData.email.trim()) e.email = 'Email address is required';
    else if (!validateEmail(formData.email)) e.email = 'Enter a valid email address';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', city: '', interest: '', message: '' });
      setTimeout(() => setSubmitted(false), 7000);
    }, 1500);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 text-center">
          <div className="section-tag !bg-white/10 !text-white !border-white/20 mx-auto w-fit mb-4">
            <MessageCircle size={12} /> Get In Touch
          </div>
          <h1 className="text-white mb-4">Let's Talk Solar</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Reach out for a free consultation, site survey, or any questions about solar energy — our experts are ready to help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">

            {/* Left Info Column */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="mb-2">Contact Information</h2>
                <p className="text-gray-500 text-sm">Our team is available Mon-Sat, 9 AM to 6 PM</p>
              </div>

              {/* Contact Cards */}
              {[
                {
                  icon: Phone,
                  title: 'Call Us',
                  main: COMPANY_INFO.contact.phone,
                  sub: 'Mon-Sat, 9AM-6PM',
                  href: getPhoneLink(COMPANY_INFO.contact.phone),
                  color: 'icon-wrapper-green'
                },
                {
                  icon: Mail,
                  title: 'Email Us',
                  main: COMPANY_INFO.contact.email,
                  sub: 'Response within 24 hours',
                  href: getEmailLink(COMPANY_INFO.contact.email),
                  color: 'icon-wrapper-amber'
                },
                {
                  icon: MapPin,
                  title: 'Visit Us',
                  main: `${COMPANY_INFO.address.line1}, ${COMPANY_INFO.address.city}`,
                  sub: `${COMPANY_INFO.address.state} - ${COMPANY_INFO.address.pincode}`,
                  href: 'https://maps.google.com/?q=Jabalpur+Madhya+Pradesh',
                  color: 'icon-wrapper-green'
                },
                {
                  icon: Clock,
                  title: 'Business Hours',
                  main: 'Monday – Saturday',
                  sub: '9:00 AM – 6:00 PM',
                  href: null,
                  color: 'icon-wrapper-amber'
                }
              ].map((item) => (
                <div key={item.title} className="card p-5 flex items-start gap-4">
                  <div className={`icon-wrapper ${item.color} w-11 h-11 flex-shrink-0`}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">{item.title}</div>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        className="font-bold text-gray-900 hover:text-emerald-600 transition-colors text-sm block">
                        {item.main}
                      </a>
                    ) : (
                      <div className="font-bold text-gray-900 text-sm">{item.main}</div>
                    )}
                    <div className="text-xs text-gray-400 mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href={getWhatsAppLink(COMPANY_INFO.contact.phone, 'Hi! I need a solar consultation.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-4 rounded-xl transition-all hover:scale-105 shadow-lg w-full"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L0 24l6.335-1.508A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.648-.502-5.164-1.38l-.37-.22-3.758.895.942-3.651-.241-.386A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
                <div>
                  <div className="text-sm">Chat on WhatsApp</div>
                  <div className="text-xs text-green-100">Fastest response</div>
                </div>
              </a>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-3">
              <div className="card p-6 md:p-8">
                <h3 className="mb-1">Get Free Solar Consultation</h3>
                <p className="text-sm text-gray-500 mb-6">Fill out the form and our expert will reach you within 24 hours.</p>

                {submitted && (
                  <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl mb-6 animate-fade-up">
                    <CheckCircle size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Thank you! We've received your inquiry.</div>
                      <div className="text-sm mt-1">Our solar expert will contact you within 24 hours.</div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`input-field ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className={`input-field ${errors.phone ? 'error' : ''}`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Your city"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`input-field ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      I'm Interested In
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select a topic</option>
                      {interests.map((i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your solar needs, property, electricity bill, etc."
                      className="input-field resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-4 text-base disabled:opacity-60 disabled:cursor-wait"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Submit Inquiry
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-padding-sm bg-white">
        <div className="container">
          <div className="rounded-2xl overflow-hidden shadow-xl h-72 md:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58792.16148!2d79.9864!3d23.1815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981b1d4e4c20b25%3A0x83543e806c99c45c!2sJabalpur%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Urja Vision Office Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
