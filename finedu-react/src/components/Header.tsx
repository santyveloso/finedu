import React from 'react';
import UserDropdown from './UserDropdown';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="mb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Financeira</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Bem-vindo(a), Maria! Vamos aprender sobre finanças pessoais.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Último acesso</p>
            <p className="font-medium dark:text-white">Hoje, 10:30</p>
          </div>
          <UserDropdown isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />
        </div>
      </div>
    </header>
  );
};

export default Header; 