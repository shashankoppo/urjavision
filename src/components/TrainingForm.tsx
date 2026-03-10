import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { validateEmail, validatePhone } from '../utils/helpers';

const TrainingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    qualification: '',
    course: '',
    experience: '',
    city: '',
    message: ''
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
    if (!formData.course) newErrors.course = 'Please select a course';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      console.log('Training form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', qualification: '', course: '', experience: '', city: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-white rounded-lg card-shadow p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
          <GraduationCap className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#1F1F1F]">Training Registration</h3>
          <p className="text-sm text-gray-600">Enroll in our solar training programs</p>
        </div>
      </div>

      {submitted && (
        <div className="bg-[#1E8449]/10 border border-[#1E8449] text-[#1E8449] p-4 rounded-lg mb-6">
          Thank you for registering! We will send you course details soon.
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
            Select Course *
          </label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
              errors.course ? 'border-red-500' : 'border-gray-300 focus:border-[#1E8449]'
            }`}
          >
            <option value="">Choose a course</option>
            <option value="installation">Solar Installation Training</option>
            <option value="technician">Solar Technician Certification</option>
            <option value="internship">Renewable Energy Internship</option>
            <option value="business">Solar Business Training</option>
          </select>
          {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
              Qualification
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

          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
              Prior Experience
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1E8449] focus:outline-none"
              placeholder="Any relevant experience"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1E8449] focus:outline-none"
            placeholder="Your city"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1F1F1F] mb-2">
            Additional Information
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1E8449] focus:outline-none"
            placeholder="Any questions or additional information"
          />
        </div>

        <button type="submit" className="w-full btn-primary">
          Register Now
        </button>
      </form>
    </div>
  );
};

export default TrainingForm;
