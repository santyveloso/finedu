import React from 'react';

const AIResources: React.FC = () => {
  const resources = [
    'O que é a retenção na fonte?',
    'Como funcionam os recibos verdes',
    'Passo a passo: entrega do IRS',
    'Direitos do trabalhador'
  ];

  return (
    <div className="card bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
          <i className="fas fa-book-open text-primary-600"></i>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recursos Simplificados</h2>
      </div>
      <div className="mt-4 space-y-3">
        {resources.map((resource, index) => (
          <button 
            key={index}
            className="flex items-center p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors w-full text-left"
          >
            <i className="fas fa-chevron-right text-primary-500 mr-3"></i>
            <span className="text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400">{resource}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIResources; 