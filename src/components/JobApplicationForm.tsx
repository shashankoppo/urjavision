import { useState } from 'react';
import { Briefcase as BriefcaseBusiness, Upload } from 'lucide-react';
import { validateEmail, validatePhone } from '../utils/helpers';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    position: '',
    experience: '',
    qualification: '',
    location: '',
    coverLetter: ''
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
    if (!formData.position) newErrors.position = 'Please select a position';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      console.log('Job application submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', position: '', experience: '', qualification: '', location: '', coverLetter: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-white rounded-lg card-shadow p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
          <BriefcaseBusiness className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#1F1F1F]">Job Application Form</h3>
          <p className="text-sm text-gray-600">Apply for open positions at Urja Vision</p>
        </div>
      </div>

      {submitted && (
        <div className="bg-[#1E8449]/10 border border-[#1E8449] text-[#1E8449] p-4 rounded-lg mb-6">
          Thank you for applying! We will review your application and contact you if shortlisted.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
              errors.name ? 'border-red-500' : 'border-gray-300 focus:border-[#1E8449]'
            }`}
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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

        <div>
          <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
            Position Applied For *
          </label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
              errors.position ? 'border-red-500' : 'border-gray-300 focus:border-[#1E8449]'
            }`}
          >
            <option value="">Select position</option>
            <option value="solar-engineer">Solar Engineer</option>
            <option value="solar-technician">Solar Technician</option>
            <option value="electrical-engineer">Electrical Engineer</option>
            <option value="sales-executive">Solar Sales Executive</option>
            <option value="project-manager">Project Manager</option>
          </select>
          {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
              Total Experience
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1E8449] focus:outline-none"
              placeholder="Years of experience"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
              Highest Qualification
            </label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1E8449] focus:outline-none"
              placeholder="Your qualification"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
            Current Location
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
            Cover Letter / Why should we hire you?
          </label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1E8449] focus:outline-none"
            placeholder="Tell us about yourself and why you'd be a great fit"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
            Upload Resume
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1E8449] transition cursor-pointer">
            <Upload size={32} className="mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
          </div>
        </div>

        <button type="submit" className="w-full btn-primary">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
