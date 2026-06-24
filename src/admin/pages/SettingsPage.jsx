import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Bell, Shield, PaintBucket, Globe } from 'lucide-react';
import { FormInput, ToggleSwitch } from '../components/Modal';

import { useRef } from 'react';
const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'system', label: 'System', icon: Globe },
];

export default function SettingsPage({ addToast }) {
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef(null);
  
  // Load settings from localStorage or use defaults
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('adminSettings');
    return saved ? JSON.parse(saved) : {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@bstbpc.gov.in',
      phone: '+91 9876543210',
      bio: 'System administrator for BSTBPC portal.',
      notificationsEnabled: true,
      emailAlerts: true,
      darkMode: false,
      siteName: 'BSTBPC Admin Portal',
      supportEmail: 'support@bstbpc.gov.in'
    };
  });

  const handleChange = (id, value) => {
    setSettings(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    
    // Reflect changes globally
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Dispatch a custom event to notify other components (like Sidebar)
    window.dispatchEvent(new Event('settingsUpdated'));
    
    addToast('Settings saved successfully and reflected across dashboard', 'success');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('avatar', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your account and system preferences</p>
        </div>
        <motion.button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save className="w-4 h-4" />
          Save Changes
        </motion.button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-card border border-gray-100/50 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-card border border-gray-100/50 p-6 md:p-8">
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Profile Settings</h3>
                <div className="flex items-center gap-6 mb-8">
                  {settings.avatar ? (
                    <img src={settings.avatar} alt="Avatar" className="w-24 h-24 rounded-2xl object-cover border border-gray-100" />
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-3xl font-bold uppercase">
                      {settings.firstName[0]}{settings.lastName[0]}
                    </div>
                  )}
                  <div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleAvatarChange} 
                    />
                    <div className="flex items-center gap-2 mb-2">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Change Avatar
                      </button>
                      {settings.avatar && (
                        <button 
                          onClick={() => handleChange('avatar', null)}
                          className="px-4 py-2 rounded-xl border border-red-200 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Remove Avatar
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput label="First Name" value={settings.firstName} onChange={(val) => handleChange('firstName', val)} id="fname" />
                  <FormInput label="Last Name" value={settings.lastName} onChange={(val) => handleChange('lastName', val)} id="lname" />
                  <FormInput label="Email Address" value={settings.email} type="email" onChange={(val) => handleChange('email', val)} id="email" />
                  <FormInput label="Phone Number" value={settings.phone} onChange={(val) => handleChange('phone', val)} id="phone" />
                </div>
                <div className="mt-4">
                  <FormInput label="Bio" type="textarea" value={settings.bio} onChange={(val) => handleChange('bio', val)} id="bio" />
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Notification Preferences</h3>
                <div className="space-y-6 max-w-lg">
                  <ToggleSwitch label="Push Notifications" checked={settings.notificationsEnabled} onChange={(val) => handleChange('notificationsEnabled', val)} id="push" />
                  <p className="text-sm text-gray-500 -mt-4 mb-4">Receive notifications in your browser</p>
                  
                  <ToggleSwitch label="Email Alerts" checked={settings.emailAlerts} onChange={(val) => handleChange('emailAlerts', val)} id="email-alerts" />
                  <p className="text-sm text-gray-500 -mt-4 mb-4">Receive daily summary emails</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Security Settings</h3>
                <div className="max-w-md space-y-4">
                  <FormInput label="Current Password" type="password" placeholder="••••••••" id="curr-pass" />
                  <FormInput label="New Password" type="password" placeholder="••••••••" id="new-pass" />
                  <FormInput label="Confirm New Password" type="password" placeholder="••••••••" id="conf-pass" />
                  <button className="mt-4 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                    Update Password
                  </button>
                </div>
              </motion.div>
            )}



             {activeTab === 'system' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">System Settings</h3>
                <p className="text-sm text-gray-500 mb-6">Manage global system configurations.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormInput label="Site Name" value={settings.siteName} onChange={(val) => handleChange('siteName', val)} id="site-name" />
                    <FormInput label="Support Email" value={settings.supportEmail} onChange={(val) => handleChange('supportEmail', val)} id="support-email" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
