import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    twoFactorAuth: false,
    theme: 'light',
  });

  const handleToggle = (key: string) => {
    setSettings({
      ...settings,
      [key]: !settings[key as keyof typeof settings],
    });
    toast.success('Setting updated!');
  };

  const handleThemeChange = (theme: string) => {
    setSettings({ ...settings, theme });
    toast.success(`Theme changed to ${theme}!`);
  };

  return (
    <Layout title="Settings">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl shadow-lg text-white p-6 mb-6">
          <div className="flex items-center">
            <Cog6ToothIcon className="w-10 h-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">Settings</h2>
              <p className="text-gray-200">Manage your account preferences</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Notifications Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
                <button
                  onClick={() => handleToggle('emailNotifications')}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      settings.emailNotifications ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">SMS Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates via SMS</p>
                </div>
                <button
                  onClick={() => handleToggle('smsNotifications')}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    settings.smsNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      settings.smsNotifications ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Security</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Add extra security to your account</p>
                </div>
                <button
                  onClick={() => handleToggle('twoFactorAuth')}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    settings.twoFactorAuth ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      settings.twoFactorAuth ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Appearance</h3>
            <div className="space-y-3">
              <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer" style={{borderColor: settings.theme === 'light' ? '#2563eb' : '#d1d5db'}}>
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={settings.theme === 'light'}
                  onChange={(e) => handleThemeChange(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="ml-3 font-semibold text-gray-900">Light Theme</span>
              </label>
              <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer" style={{borderColor: settings.theme === 'dark' ? '#2563eb' : '#d1d5db'}}>
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={settings.theme === 'dark'}
                  onChange={(e) => handleThemeChange(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="ml-3 font-semibold text-gray-900">Dark Theme</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full py-3 px-6 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-lg hover:shadow-xl">
            Save Settings
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
