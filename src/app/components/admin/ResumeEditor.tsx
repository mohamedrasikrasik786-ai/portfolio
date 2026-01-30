import { useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';
import { getResumeData, updateResumeData, initializeResumeData } from '@/config/resumeService';
import { Loader2, Save, RefreshCw, ArrowLeft, ExternalLink, FileText } from 'lucide-react';

interface ResumeEditorProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function ResumeEditor({ onComplete, onCancel }: ResumeEditorProps) {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadResumeData();
  }, []);

  const loadResumeData = async () => {
    setLoading(true);
    try {
      const data = await getResumeData();
      setResumeData(data);
    } catch (error) {
      showMessage('error', 'Failed to load Resume data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!resumeData) return;

    setSaving(true);
    setMessage(null);

    try {
      await updateResumeData(resumeData);
      showMessage('success', 'Resume URL saved successfully!');
      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch (error) {
      showMessage('error', error instanceof Error ? error.message : 'Failed to save data. Please try again.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleInitialize = async () => {
    if (!confirm('This will initialize the Resume data. Continue?')) return;

    setSaving(true);
    try {
      await initializeResumeData();
      await loadResumeData();
      showMessage('success', 'Resume data initialized!');
    } catch (error) {
      showMessage('error', 'Failed to initialize data');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const updateField = (field: keyof ResumeData, value: any) => {
    if (!resumeData) return;
    setResumeData({ ...resumeData, [field]: value });
  };

  const testResumeUrl = () => {
    if (resumeData?.resumeUrl) {
      window.open(resumeData.resumeUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#FFEB01]" />
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="text-center py-20">
        <p className="text-white mb-4">No Resume data found</p>
        <button
          onClick={handleInitialize}
          className="px-6 py-3 bg-[#FFEB01] text-[#0E0E0E] rounded-lg hover:bg-[#FFD700] transition-colors"
        >
          Initialize Resume Section
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0E0E0E] z-[9999] overflow-auto">
      <div className="max-w-[800px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0E0E0E] pb-6 mb-8 border-b border-[#2a2a2a]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onCancel}
                className="flex items-center justify-center w-10 h-10 bg-[#1c1c1c] border border-[#2a2a2a] text-white rounded-lg hover:bg-[#2a2a2a] transition-colors"
                title="Back to Admin"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-3xl font-bold text-white">Manage Resume</h2>
                <p className="text-sm text-[#737373] mt-1">One URL controls all 4 resume buttons</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadResumeData}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1c1c1c] border border-[#2a2a2a] text-white rounded-lg hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Reload
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#FFEB01] text-[#0E0E0E] rounded-lg hover:bg-[#ffe500] transition-colors disabled:opacity-50 font-semibold shadow-lg shadow-[#FFEB01]/20"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Info Card */}
        <div className="mb-6 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-blue-400 font-semibold mb-2">Resume URL Controls 4 Locations:</h3>
              <ul className="text-sm text-blue-300/80 space-y-1">
                <li>• Navbar - Resume link (top navigation)</li>
                <li>• Landing Page - Quick CTA button</li>
                <li>• About Me - Download button</li>
                <li>• Footer - Resume button</li>
              </ul>
              <p className="text-xs text-blue-300/60 mt-3">
                Update here once → all buttons work everywhere!
              </p>
            </div>
          </div>
        </div>

        {/* Resume URL Section */}
        <section className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Resume URL</h3>
          <p className="text-sm text-[#737373] mb-6">
            Paste your resume link (Google Drive, Dropbox, or direct PDF link)
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#737373] mb-2">Resume Link</label>
              <input
                type="text"
                value={resumeData.resumeUrl}
                onChange={(e) => updateField('resumeUrl', e.target.value)}
                className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#FFEB01]"
                placeholder="https://drive.google.com/file/d/..."
              />
            </div>

            {/* Test Button */}
            {resumeData.resumeUrl && (
              <button
                onClick={testResumeUrl}
                className="flex items-center gap-2 px-4 py-2 bg-[#0E0E0E] border border-[#2a2a2a] text-white rounded-lg hover:border-[#FFEB01] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Test Resume Link
              </button>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-[#0E0E0E] rounded-lg border border-[#2a2a2a]">
            <h4 className="text-sm font-semibold text-white mb-2">📋 How to Get Resume URL:</h4>
            <div className="text-xs text-[#737373] space-y-2">
              <p><strong className="text-white">Google Drive (Recommended):</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Upload PDF to Google Drive</li>
                <li>Right-click → Share → "Anyone with the link"</li>
                <li>Copy link and paste above</li>
              </ol>
              <p className="mt-3"><strong className="text-white">Example URL:</strong></p>
              <code className="text-[10px] text-[#FFEB01] break-all">
                https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view
              </code>
            </div>
          </div>
        </section>

        {/* Save Button (Bottom) */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-[#FFEB01] text-[#0E0E0E] rounded-lg hover:bg-[#FFD700] transition-colors disabled:opacity-50 text-lg font-semibold"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Resume URL
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
