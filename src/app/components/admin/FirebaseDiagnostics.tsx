import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader2, ChevronDown } from 'lucide-react';
import { getFirebaseStatus, testFirebaseConnection } from '@/config/firebaseHelpers';

export function FirebaseDiagnostics() {
  const [status, setStatus] = useState<{
    initialized: boolean;
    connected: boolean;
    testing: boolean;
    error: string | null;
  }>({
    initialized: false,
    connected: false,
    testing: true,
    error: null
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    checkFirebase();
  }, []);

  const checkFirebase = async () => {
    setStatus(prev => ({ ...prev, testing: true, error: null }));
    
    try {
      const { available } = getFirebaseStatus();
      const connected = await testFirebaseConnection();
      
      setStatus({
        initialized: available,
        connected,
        testing: false,
        error: null
      });
    } catch (error: any) {
      setStatus({
        initialized: false,
        connected: false,
        testing: false,
        error: error.message || 'Unknown error'
      });
    }
  };

  const allGood = status.initialized && status.connected && !status.testing;

  return (
    <div className="relative">
      {/* Compact Status Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3 py-2 bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg hover:bg-[#2a2a2a] transition-all text-sm"
      >
        {status.testing ? (
          <Loader2 className="w-4 h-4 text-[#FFEB01] animate-spin" />
        ) : allGood ? (
          <CheckCircle className="w-4 h-4 text-green-500" />
        ) : (
          <XCircle className="w-4 h-4 text-red-500" />
        )}
        <span className="text-white font-medium">Firebase</span>
        <ChevronDown className={`w-3 h-3 text-[#737373] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-[#1C1C1C] border border-[#2a2a2a] rounded-xl p-4 shadow-2xl z-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Firebase Status</h3>
            <button
              onClick={checkFirebase}
              disabled={status.testing}
              className="px-2 py-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded text-xs transition-colors disabled:opacity-50 text-white"
            >
              {status.testing ? 'Testing...' : 'Recheck'}
            </button>
          </div>

          <div className="space-y-2">
            {/* Initialization Status */}
            <div className="flex items-center gap-2">
              {status.testing ? (
                <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
              ) : status.initialized ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
              <span className="text-sm text-white/60">Firebase Initialized</span>
            </div>

            {/* Connection Status */}
            <div className="flex items-center gap-2">
              {status.testing ? (
                <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
              ) : status.connected ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
              <span className="text-sm text-white/60">Firestore Connected</span>
            </div>

            {/* Success Message */}
            {allGood && (
              <div className="mt-3 p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-xs text-green-500 font-medium">✓ All systems operational</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}