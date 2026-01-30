import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
        isDark 
          ? 'bg-[#1c1c1c] hover:bg-[#2a2a2a] border border-[#2a2a2a]' 
          : 'bg-white hover:bg-gray-100 border border-gray-200'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? 90 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun 
          size={20} 
          className="text-yellow-500"
        />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon 
          size={20} 
          className="text-[#FFEB01]"
        />
      </motion.div>
    </motion.button>
  );
}

// Compact version for mobile/navbar
export function ThemeToggleCompact() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
        isDark
          ? 'bg-[#1c1c1c] hover:bg-[#2a2a2a] text-white'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <>
          <Moon size={16} className="text-[#FFEB01]" />
          <span className="text-sm font-['DM_Sans:Medium',sans-serif] hidden sm:inline">Dark</span>
        </>
      ) : (
        <>
          <Sun size={16} className="text-yellow-500" />
          <span className="text-sm font-['DM_Sans:Medium',sans-serif] hidden sm:inline">Light</span>
        </>
      )}
    </button>
  );
}
