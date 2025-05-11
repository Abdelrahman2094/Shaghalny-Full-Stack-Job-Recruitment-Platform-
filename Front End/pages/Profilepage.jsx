import { useState, useEffect } from 'react';
import { User, MapPin, Calendar, Phone, Mail, Plus, ChevronDown, Edit, Save } from 'lucide-react';
import axios from 'axios';

export default function ProfileUser() {
  const [profileData, setProfileData] = useState(null);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/auth/me', {
          headers: { Authorization: `Bearer ${token} `},
        });
        setProfileData(res.data);
        setFormData(res.data); // initialize form
      } catch (err) {
        console.error('Failed to fetch profile:', err.response?.data?.message || err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const updatedData = { ...formData, story: formData.story ? formData.story.trim() : '' };

      const res = await axios.put('http://localhost:3000/auth/update', updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileData(res.data);
      setEditMode(false);
    } catch (err) {
      console.error('Failed to update profile:', err.response?.data?.message || err.message);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddSkill = () => {
    const newSkill = prompt("Enter a new skill:");
    if (newSkill) {
      setFormData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill]
      }));
    }
  };

  if (!profileData) {
    return <div className="text-center p-6">Loading...</div>;
  }

  const displayedSkills = showAllSkills ? (formData.skills || []) : (formData.skills || []).slice(0, 8);

  return (
    <div className="bg-gray-100 min-h-screen p-4">

      {/* Header */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
        <div className="bg-purple-700 h-24 relative">
          <button
            type="button"
            onClick={() => (editMode ? handleUpdate() : setEditMode(true))}
            className="absolute top-4 right-4 bg-white p-2 rounded-full z-20"
          >
            {editMode ? <Save size={16} /> : <Edit size={16} />}
          </button>
        </div>
        <div className="px-6 pb-6 relative">
          <div className="absolute -top-12 right-6">
            <div className="bg-gray-200 w-24 h-24 rounded-full flex items-center justify-center border-4 border-white">
              <User size={40} className="text-gray-500" />
            </div>
          </div>
          <div className="pt-4">
            <h2 className="text-xl font-bold text-purple-800">{profileData.firstName} {profileData.lastName}</h2>
            {editMode ? (
              <input name="title" value={formData.title || ''} onChange={handleChange} placeholder="Title" className="text-gray-600 border-b w-full" />
            ) : (
              <p className="text-gray-600">{profileData.title || "No Title Yet"}</p>
            )}
            <div className="flex items-center text-gray-500 mt-1">
              <MapPin size={16} className="mr-1" />
              {editMode ? (
                <input name="location" value={formData.location || ''} onChange={handleChange} placeholder="Location" className="text-sm border-b w-full" />
              ) : (
                <span className="text-sm">{profileData.location || "No Location"}</span>
              )}
            </div>
            <div className="flex items-center text-green-600 mt-1">
              <Calendar size={16} className="mr-1" />
              <span className="text-sm">Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h3 className="font-bold text-xl mb-4">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <Mail size={18} className="text-gray-400 mr-3" />
            <span>{profileData.email}</span>
          </div>
          <div className="flex items-center">
            <Phone size={18} className="text-gray-400 mr-3" />
            {editMode ? (
              <input name="phone" value={formData.phone || ''} onChange={handleChange} placeholder="Phone" className="border-b" />
            ) : (
              <span>{profileData.phone || "No phone number added"}</span>
            )}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h3 className="font-bold text-xl mb-4">About</h3>
        {editMode ? (
          <textarea name="about" value={formData.about || ''} onChange={handleChange} rows={4} className="w-full border p-2 rounded" />
        ) : (
          <p className="text-gray-700">{profileData.about || "No about description yet."}</p>
        )}
      </div>

      {/* Skills */}
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Skills</h3>
          {editMode && (
            <button onClick={handleAddSkill} className="text-purple-800 text-sm font-medium flex items-center">
              <Plus size={16} className="mr-1" />
              Add Skill
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {displayedSkills.map((skill, index) => (
            <span key={index} className="bg-purple-800 text-white py-1 px-3 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
        {formData.skills && formData.skills.length > 8 && (
          <button
            onClick={() => setShowAllSkills(!showAllSkills)}
            className="text-purple-800 text-sm mt-3 font-medium flex items-center"
          >
            {showAllSkills ? 'Show Less' : 'Show All'}
            <ChevronDown size={16} className={`ml-1 transform ${showAllSkills ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {/* Story */}
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h3 className="font-bold text-xl mb-4">My Story</h3>
        {editMode ? (
          <textarea
            name="story"
            value={formData.story || ''}
            onChange={handleChange}
            rows={4}
            className="w-full border p-2 rounded"
            placeholder="Share your success story"
          />
        ) : (
          <p className="text-gray-700">{profileData.story || "No story yet."}</p>
        )}
      </div>
    </div>
  );
}