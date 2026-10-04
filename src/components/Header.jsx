import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Header({ toggleTheme, darkMode }) {
  return (
    <header className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">Product Recommendation AI</h1>
      <button onClick={toggleTheme} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
        <span className="text-sm font-medium">{darkMode ? 'Dark' : 'Light'}</span>
        {darkMode ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </header>
  );
}
