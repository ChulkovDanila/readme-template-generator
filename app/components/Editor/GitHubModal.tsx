import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (username: string, profile: string, handle: string) => void;
  initialUsername?: string;
  initialProfile?: string;
  initialHandle?: string;
}

export default function GitHubModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialUsername = '',
  initialProfile = '',
  initialHandle = ''
}: GitHubModalProps) {
  const [username, setUsername] = useState(initialUsername);
  const [profile, setProfile] = useState(initialProfile);
  const [handle, setHandle] = useState(initialHandle);

  useEffect(() => {
    setUsername(initialUsername);
    setProfile(initialProfile);
    setHandle(initialHandle);
  }, [initialUsername, initialProfile, initialHandle]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (username.trim()) {
      onSave(
        username.trim(), 
        profile.trim(), 
        handle.trim()
      );
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSave();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ 
        zIndex: 9999,
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
      onClick={onClose}
    >
      <div 
        className="bg-[#1f2125] border border-[#30363d] rounded-lg p-6 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              GitHub Username <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="octocat"
              className="w-full px-3 py-2 bg-[#27292d] border border-[#30363d] rounded-md text-gray-100 text-sm focus:outline-none focus:border-[#58a6ff]"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-1">
              Used in GitHub Stats and links
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              LinkedIn Profile (optional)
            </label>
            <input
              type="text"
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              placeholder="octocat"
              className="w-full px-3 py-2 bg-[#27292d] border border-[#30363d] rounded-md text-gray-100 text-sm focus:outline-none focus:border-[#58a6ff]"
            />
            <p className="text-xs text-gray-500 mt-1">
              If empty, placeholder will remain unchanged
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Twitter Handle (optional)
            </label>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="octocat"
              className="w-full px-3 py-2 bg-[#27292d] border border-[#30363d] rounded-md text-gray-100 text-sm focus:outline-none focus:border-[#58a6ff]"
            />
            <p className="text-xs text-gray-500 mt-1">
              If empty, placeholder will remain unchanged
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!username.trim()}
            className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-medium rounded-md transition-colors"
          >
            Save
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Ctrl+Enter to save • Esc to cancel
        </p>
      </div>
    </div>
  );
}
