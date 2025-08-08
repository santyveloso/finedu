import React, { useEffect, useState } from 'react';
import UserDropdown from './UserDropdown';
import IRSSimulator from './IRSSimulator';
import AIAssistant from './AIAssistant';
import UpcomingAlerts from './UpcomingAlerts';
import ContractComparison from './ContractComparison';
import AIResources from './AIResources';
import GamifiedJourney from './GamifiedJourney';

const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const persisted = localStorage.getItem('theme');
    setIsDarkMode(persisted === 'dark');
  }, []);

  const toggleDark = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen relative bg-radial-primary-left dark:bg-radial-primary-left-dark">
      {/* secondary radial glow on the right */}
      <div className="absolute inset-0 bg-radial-primary dark:bg-radial-primary-dark pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight gradient-text">
              O seu painel financeiro
            </h1>
            <p className="text-gray-600">
              IRS, Segurança Social, recibos verdes e mais — tudo numa vista simples.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-white/70 glass border border-primary-100 text-gray-700">
              <span className="w-2 h-2 rounded-full bg-primary-500"></span>
              Sessão segura
            </span>
            <UserDropdown isDarkMode={isDarkMode} onToggleDarkMode={toggleDark} />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <IRSSimulator />
          <AIAssistant />
          <UpcomingAlerts />
          <ContractComparison />
          <AIResources />
          <GamifiedJourney />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 