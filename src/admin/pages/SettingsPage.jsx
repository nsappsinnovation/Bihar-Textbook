import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Bell, Globe } from 'lucide-react';
import { FormInput, ToggleSwitch } from '../components/Modal';
import { getProfile } from '../../services/authService';
import { getSetting, saveSetting } from '../../services/settingService';
import { errorMessage } from '../../services/api';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'system', label: 'System', icon: Globe },
];

// Browser-only preferences (not account data)
const PREFS_KEY = 'adminPreferences';
const loadPrefs = () => {
  try {
    return { notificationsEnabled: true, emailAlerts: true, ...JSON.parse(localStorage.getItem(PREFS_KEY) || '{}') };
  } catch {
    return { notificationsEnabled: true, emailAlerts: true };
  }
};

export default function SettingsPage({ addToast }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [prefs, setPrefs] = useState(loadPrefs);
  const [siteConfig, setSiteConfig] = useState({ siteName: '', supportEmail: '' });

  useEffect(() => {
    getProfile().then(setProfile).catch(() => addToast('Could not load profile', 'error'));
    getSetting('site_config', {}).then((value) => setSiteConfig((prev) => ({ ...prev, ...value })));
  }, [addToast]);

  const handleSave = async () => {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    try {
      await saveSetting('site_config', siteConfig, 'System');
      addToast('Settings saved successfully', 'success');
    } catch (error) {
      addToast(errorMessage(error, 'Could not save settings'), 'error');
    }
  };

  const profileRows = profile
    ? [
        ['Full Name', profile.fullName],
        ['Email Address', profile.email],
        ['Phone Number', profile.phone || '—'],
        ['Member Since', new Date(profile.createdAt).toLocaleDateString()],
      ]
    : [];

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
        {activeTab !== 'profile' && (
          <motion.button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Save className="w-4 h-4" />
            Save Changes
          </motion.button>
        )}
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
                <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Profile</h3>
                {profile ? (
                  <>
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-24 h-24 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-3xl font-bold uppercase">
                        {profile.fullName.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                      </div>
                      <p className="text-sm text-gray-500 max-w-sm">
                        Account details are managed by the development team. Contact them to change your name, email or password.
                      </p>
                    </div>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {profileRows.map(([label, value]) => (
                        <div key={label}>
                          <dt className="text-sm font-medium text-gray-500 mb-1">{label}</dt>
                          <dd className="text-sm font-semibold text-gray-800">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">Loading profile…</p>
                )}
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Notification Preferences</h3>
                <div className="space-y-6 max-w-lg">
                  <ToggleSwitch label="Push Notifications" checked={prefs.notificationsEnabled} onChange={(val) => setPrefs({ ...prefs, notificationsEnabled: val })} id="push" />
                  <p className="text-sm text-gray-500 -mt-4 mb-4">Receive notifications in your browser</p>

                  <ToggleSwitch label="Email Alerts" checked={prefs.emailAlerts} onChange={(val) => setPrefs({ ...prefs, emailAlerts: val })} id="email-alerts" />
                  <p className="text-sm text-gray-500 -mt-4 mb-4">Receive daily summary emails</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'system' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">System Settings</h3>
                <p className="text-sm text-gray-500 mb-6">Manage global system configurations.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput label="Site Name" value={siteConfig.siteName} onChange={(val) => setSiteConfig({ ...siteConfig, siteName: val })} id="site-name" />
                  <FormInput label="Support Email" value={siteConfig.supportEmail} onChange={(val) => setSiteConfig({ ...siteConfig, supportEmail: val })} id="support-email" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
