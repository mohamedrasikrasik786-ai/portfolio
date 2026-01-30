import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set page title
    document.title = '404 - Page Not Found | Digital Flux';
  }, []);

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="mb-8">
          <h1 
            className="text-[12rem] md:text-[16rem] font-bold leading-none bg-gradient-to-br from-white/10 to-white/5 bg-clip-text text-transparent select-none"
            style={{ 
              fontFamily: 'var(--font-family-heading)',
              textShadow: '0 0 80px rgba(255,255,255,0.1)'
            }}
          >
            404
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-white/90">
            Page Not Found
          </h2>
          <p className="text-lg text-white/60 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            <span className="text-white/90">Go Back</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 px-6 py-3 bg-white hover:bg-white/90 text-[#0E0E0E] rounded-lg transition-all duration-300 font-medium"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white/20"
              style={{
                animation: `pulse 2s ease-in-out ${i * 0.2}s infinite`
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
