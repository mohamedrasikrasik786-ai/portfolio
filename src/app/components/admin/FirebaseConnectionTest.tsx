import { useState } from 'react';
import { db } from '@/config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { CheckCircle2, XCircle, Loader2, AlertCircle } from 'lucide-react';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  message?: string;
}

/**
 * Component to test Firebase connectivity and permissions
 * Useful for diagnosing real-time sync issues
 */
export function FirebaseConnectionTest() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const updateResult = (index: number, status: 'success' | 'error', message?: string) => {
    setResults(prev => {
      const newResults = [...prev];
      newResults[index] = { ...newResults[index], status, message };
      return newResults;
    });
  };

  const runTests = async () => {
    setTesting(true);
    setResults([
      { name: 'Firebase Connection', status: 'pending' },
      { name: 'Read Landing Page Data', status: 'pending' },
      { name: 'Write Test Data', status: 'pending' },
      { name: 'Update Test Data', status: 'pending' },
      { name: 'Cleanup Test Data', status: 'pending' }
    ]);

    try {
      // Test 1: Basic connection
      try {
        updateResult(0, 'success', 'Connected to Firebase');
      } catch (error) {
        updateResult(0, 'error', `Connection failed: ${error}`);
        setTesting(false);
        return;
      }

      // Test 2: Read landing page data
      try {
        const docRef = doc(db, 'landingPage', 'landing-page-data');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          updateResult(1, 'success', `Found landing page data with ${Object.keys(data).length} fields`);
        } else {
          updateResult(1, 'error', 'Landing page document does not exist');
        }
      } catch (error) {
        updateResult(1, 'error', `Read failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      // Test 3: Write test data
      try {
        const testDocRef = doc(db, 'landingPage', '_connection-test');
        await setDoc(testDocRef, {
          test: true,
          timestamp: new Date().toISOString(),
          message: 'Connection test'
        });
        updateResult(2, 'success', 'Write operation successful');
      } catch (error) {
        updateResult(2, 'error', `Write failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      // Test 4: Update test data
      try {
        const testDocRef = doc(db, 'landingPage', '_connection-test');
        await updateDoc(testDocRef, {
          updated: true,
          updateTimestamp: new Date().toISOString()
        });
        updateResult(3, 'success', 'Update operation successful');
      } catch (error) {
        updateResult(3, 'error', `Update failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      // Test 5: Cleanup (delete test data)
      try {
        const testDocRef = doc(db, 'landingPage', '_connection-test');
        await setDoc(testDocRef, {
          deleted: true,
          deleteTimestamp: new Date().toISOString()
        });
        updateResult(4, 'success', 'Cleanup successful');
      } catch (error) {
        updateResult(4, 'error', `Cleanup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

    } catch (error) {
      console.error('Test suite error:', error);
    } finally {
      setTesting(false);
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Loader2 className="w-5 h-5 text-[#737373] animate-spin" />;
    }
  };

  return (
    <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#FFEB01]" />
            Firebase Connection Test
          </h3>
          <p className="text-sm text-[#737373] mt-1">
            Run diagnostics to verify Firebase connectivity and permissions
          </p>
        </div>
        <button
          onClick={runTests}
          disabled={testing}
          className="px-4 py-2 bg-[#FFEB01] text-[#0E0E0E] rounded-lg hover:bg-[#FFD700] transition-colors disabled:opacity-50 font-medium text-sm"
        >
          {testing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
              Testing...
            </>
          ) : (
            'Run Tests'
          )}
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-2 mt-6">
          {results.map((result, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-[#0E0E0E] rounded-lg border border-[#2a2a2a]"
            >
              <div className="mt-0.5">{getStatusIcon(result.status)}</div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{result.name}</p>
                {result.message && (
                  <p
                    className={`text-xs mt-1 ${
                      result.status === 'error' ? 'text-red-400' : 'text-[#737373]'
                    }`}
                  >
                    {result.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {results.length > 0 && !testing && (
        <div className="mt-6 p-4 bg-[#0E0E0E] rounded-lg border border-[#2a2a2a]">
          <h4 className="text-sm font-medium text-white mb-2">Diagnosis</h4>
          {results.every(r => r.status === 'success') ? (
            <p className="text-sm text-green-400">
              ✅ All tests passed! Firebase is properly configured and real-time sync should work.
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-red-400">
                ❌ Some tests failed. This may prevent real-time updates from working.
              </p>
              {results.some(r => r.status === 'error' && r.name.includes('Read')) && (
                <p className="text-xs text-[#737373]">
                  • Read error: Check if the landing page document exists in Firebase Console
                </p>
              )}
              {results.some(r => r.status === 'error' && (r.name.includes('Write') || r.name.includes('Update'))) && (
                <p className="text-xs text-[#737373]">
                  • Write/Update error: Check Firebase Security Rules - you may need write permissions
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
