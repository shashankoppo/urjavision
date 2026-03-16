import { useState } from 'react';
import { Mail } from 'lucide-react';
import { validateEmail } from '../utils/helpers';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }
    
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: email,
          phone: '-',
          city: '-',
          interest: 'Newsletter Subscription',
          message: `Subscriber: ${email}`
        })
      });
      setSubscribed(true);
      setEmail('');
      setError('');
      setTimeout(() => setSubscribed(false), 5000);
    } catch (err) {
      console.error('Newsletter sub failed', err);
    }
  };

  return (
    <div className="bg-gradient-primary p-8 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
          <Mail className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Subscribe to Our Newsletter</h3>
          <p className="text-sm text-white/90">Get solar tips and latest updates</p>
        </div>
      </div>

      {subscribed && (
        <div className="bg-white/20 border border-white/40 text-white p-3 rounded-lg mb-4 text-sm">
          Thank you for subscribing! Check your email for confirmation.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            className={`w-full px-4 py-3 rounded-lg focus:outline-none ${
              error ? 'border-2 border-red-500' : ''
            }`}
            placeholder="Enter your email address"
          />
          {error && <p className="text-white text-sm mt-1">{error}</p>}
        </div>
        <button type="submit" className="btn-secondary whitespace-nowrap">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterForm;
