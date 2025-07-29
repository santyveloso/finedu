import React from 'react';

const GamifiedJourney: React.FC = () => {
  return (
    <div className="card bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 lg:col-span-3">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
          <i className="fas fa-puzzle-piece text-primary-600"></i>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Jornada Gamificada</h2>
      </div>
      <div className="mt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 dark:text-gray-300 font-medium">Progresso</span>
          <span className="text-primary-600 dark:text-primary-400 font-semibold">3/10 módulos completos</span>
        </div>
        <div className="progress-bar mb-4">
          <div className="progress-fill" style={{ width: '30%' }}></div>
        </div>
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 border border-primary-100 dark:border-primary-800">
          <div className="flex items-start">
            <i className="fas fa-lightbulb text-primary-500 mt-1 mr-3"></i>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Módulo atual: Descontos para a Segurança Social</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">Entenda como são calculadas as contribuições para a segurança social e quais os benefícios associados.</p>
              <button className="mt-3 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Continuar aprendizado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamifiedJourney; 