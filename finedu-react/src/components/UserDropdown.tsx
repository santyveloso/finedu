import React, { useState, useRef, useEffect } from 'react';

interface UserDropdownProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ isDarkMode, onToggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Picture Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-primary-100 hover:bg-primary-200 flex items-center justify-center transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-300"
      >
        <span className="font-semibold text-primary-700">M</span>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transform transition-all duration-200 ease-out z-50 ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        {/* User Info */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="font-semibold text-primary-700 text-lg">M</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Maria Silva</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">maria@email.com</p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="p-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150"
          >
            <div className="flex items-center space-x-3">
              <i className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'} text-primary-500`}></i>
              <span>Modo Escuro</span>
            </div>
            <div className={`w-10 h-6 rounded-full transition-colors duration-200 flex items-center ${
              isDarkMode ? 'bg-primary-500' : 'bg-gray-300'
            }`}>
              <div className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ${
                isDarkMode ? 'translate-x-5' : 'translate-x-1'
              }`}></div>
            </div>
          </button>

          {/* Profile Settings */}
          <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150">
            <i className="fas fa-user text-primary-500 mr-3"></i>
            <span>Editar Perfil</span>
          </button>

          {/* Notifications */}
          <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150">
            <i className="fas fa-bell text-primary-500 mr-3"></i>
            <span>Notificações</span>
          </button>

          {/* Help */}
          <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150">
            <i className="fas fa-question-circle text-primary-500 mr-3"></i>
            <span>Ajuda</span>
          </button>
        </div>

        {/* Logout */}
        <div className="p-2 border-t border-gray-200 dark:border-gray-700">
          <button className="w-full flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-150">
            <i className="fas fa-sign-out-alt mr-3"></i>
            <span>Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown; 