import { useState } from 'react';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
  
    // Full Name: Only letters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    } else if (!nameRegex.test(formData.fullName)) {
      newErrors.fullName = "Full Name must only contain letters and spaces.";
    }
  
    // Email: Simple presence check (you can use a regex too if needed)
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }
  
    // Phone: Must be exactly 12 digits
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 11 digits.";
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setErrors({});
    setIsSubmitting(true);
  
    try {
      const response = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) throw new Error('Submission failed');
      setIsSubmitted(true);
      setFormData({ fullName: '', email: '', phone: '', company: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ form: 'Failed to send. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-purple-50">
      {/* Header Banner */}
      <header className="w-full py-16 px-6 bg-purple-50 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch With Our Team</h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Whether you're looking to hire top talent or find your next career opportunity, we're here to help you
          navigate the process.
        </p>
      </header>

      {/* Contact Form Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h2 className="text-3xl font-bold mb-2">Send Us a Message</h2>
          <p className="text-gray-600 mb-6">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="company" className="block font-medium mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block font-medium mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-purple-600 text-white font-medium rounded flex items-center justify-center hover:bg-purple-700 transition-colors"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
            </button>

            {isSubmitted && (
              <div className="p-4 bg-green-100 text-green-700 rounded">
                Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
              </div>
            )}

            {errors.form && (
              <div className="p-4 bg-red-100 text-red-700 rounded">
                {errors.form}
              </div>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-2">Contact Information</h2>
          <p className="text-gray-600 mb-8">Reach out to us directly or visit one of our offices.</p>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full mr-4">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Main Headquarters</h3>
                <p className="text-gray-600">Madinty Plaza, B3</p>
                <p className="text-gray-600">Cairo, Madinty</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full mr-4">
                <Phone className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-gray-600">+20 (212) 555-7890</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full mr-4">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-gray-600">shaghalny@re</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
