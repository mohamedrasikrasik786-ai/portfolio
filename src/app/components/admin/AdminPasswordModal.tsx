import { useState } from 'react';
import { X } from 'lucide-react';

interface AdminPasswordModalProps {
  onAuthenticate: (success: boolean) => void;
  onClose: () => void;
}

export function AdminPasswordModal({ onAuthenticate, onClose }: AdminPasswordModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === '938470') {
      // Store auth in sessionStorage first
      sessionStorage.setItem('adminAuth', 'true');
      // Then notify parent component
      onAuthenticate(true);
      // Don't call onClose - let parent handle the state transition
    } else {
      setError('Incorrect password');
      setAttempts(prev => prev + 1);
      setPassword('');
      
      if (attempts >= 2) {
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-[#1C1C1C] border border-white/10 rounded-xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <div className="size-12 bg-[#FFEB01]/10 rounded-lg flex items-center justify-center mb-4">
            <svg className="size-6 text-[#FFEB01]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-['Barlow_Condensed',sans-serif] text-white mb-2">
            Admin Access
          </h2>
          <p className="text-white/60 text-sm">
            Enter password to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-[#0E0E0E] border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFEB01]/50 transition-colors"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
            {attempts >= 2 && (
              <p className="mt-2 text-sm text-red-500">Too many attempts. Closing...</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!password || attempts >= 2}
              className="flex-1 px-4 py-3 bg-[#FFEB01] hover:bg-[#FFD700] text-[#0E0E0E] font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Unlock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}