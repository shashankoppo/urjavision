import { useState } from 'react';
import { Briefcase } from 'lucide-react';
import { validateEmail, validatePhone } from '../utils/helpers';

const VendorForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    businessType: '',
    experience: '',
    location: '',
    details: ''
  });

  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
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
    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('/api/enquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `${formData.contactPerson} (${formData.companyName})`,
            email: formData.email,
            phone: formData.phone,
            city: formData.location,
            interest: `Vendor: ${formData.businessType}`,
            message: `Exp: ${formData.experience}. Details: ${formData.details}`
          })
        });

        if (response.ok) {
          setSubmitted(true);
          setFormData({ companyName: '', contactPerson: '', phone: '', email: '', businessType: '', experience: '', location: '', details: '' });
          setTimeout(() => setSubmitted(false), 5000);
        }
      } catch (err) {
        console.error('Failed to submit vendor form', err);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-white rounded-lg card-shadow p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Briefcase className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#1F1F1F]">Vendor Partnership Registration</h3>
          <p className="text-sm text-gray-600">Join our growing network of solar partners</p>
        </div>
      </div>

      {submitted && (
        <div className="bg-[#1E8449]/10 border border-[#1E8449] text-[#1E8449] p-4 rounded-lg mb-6">
          Thank you for your interest! We will review your application and contact you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
              Company Name *
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                errors.companyName ? 'border-red-500' : 'border-gray-300 focus:border-[#1E8449]'
              }`}
              placeholder="Your company name"
            />
            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
              Contact Person *
            </label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                errors.contactPerson ? 'border-red-500' : 'border-gray-300 focus:border-[#1E8449]'
              }`}
              placeholder="Contact person name"
            />
            {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-[#1E8449]'
              }`}
              placeholder="Contact number"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-300 focus:border-[#1E8449]'
              }`}
              placeholder="Email address"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
              Business Type *
            </label>
            <select
              name="businessType"
              title="Business Type"
              value={formData.businessType}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                errors.businessType ? 'border-red-500' : 'border-gray-300 focus:border-[#1E8449]'
              }`}
            >
              <option value="">Select business type</option>
              <option value="supplier">Solar Equipment Supplier</option>
              <option value="contractor">Installation Contractor</option>
              <option value="electrical">Electrical Contractor</option>
              <option value="distributor">Solar Distributor</option>
              <option value="other">Other</option>
            </select>
            {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
              Years of Experience
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1E8449] focus:outline-none"
              placeholder="Years in business"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1E8449] focus:outline-none"
            placeholder="City / State"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
            Additional Details
          </label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1E8449] focus:outline-none"
            placeholder="Tell us about your business and what you can offer"
          />
        </div>

        <button type="submit" className="w-full btn-primary">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default VendorForm;
