'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            className="bg-gradient-to-r from-amber-400 to-orange-400 p-2 rounded-lg shadow-lg"
            animate={{
              rotate: theme === 'dark' ? 360 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-white" />
                ) : (
                  <Sun className="w-5 h-5 text-white" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <span className="font-semibold text-white">
            {theme === 'dark' ? 'Mode Sombre' : 'Mode Clair'}
          </span>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default ThemeToggle;
