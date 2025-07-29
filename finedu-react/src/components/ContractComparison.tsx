import React from 'react';

const ContractComparison: React.FC = () => {
  return (
    <div className="card bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 lg:col-span-2">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
          <i className="fas fa-file-contract text-primary-600"></i>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Comparação de Contratos</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Efetivo */}
        <div className="contract-card border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-700">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900 dark:text-white">Efetivo</h3>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Mais comum</span>
          </div>
          <ul className="mt-3 space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Líquido (1.500€ bruto)</span>
              <span className="font-medium dark:text-white">1.120€</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Férias</span>
              <span className="font-medium dark:text-white">2x</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subsídio Natal</span>
              <span className="font-medium dark:text-white">Sim</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 text-sm">Segurança Social</span>
              <span className="font-medium text-right dark:text-white">Empresa paga</span>
            </li>
          </ul>
        </div>
        
        {/* Recibos Verdes */}
        <div className="contract-card border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-700">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900 dark:text-white">Recibos Verdes</h3>
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Autónomo</span>
          </div>
          <ul className="mt-3 space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Líquido (1.500€ bruto)</span>
              <span className="font-medium dark:text-white">1.020€</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Férias</span>
              <span className="font-medium dark:text-white">Não</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subsídio Natal</span>
              <span className="font-medium dark:text-white">Não</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 text-sm">Segurança Social</span>
              <span className="font-medium text-right dark:text-white">Autónomo paga</span>
            </li>
          </ul>
        </div>
        
        {/* IEFP */}
        <div className="contract-card border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-700">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900 dark:text-white">IEFP</h3>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Estágio</span>
          </div>
          <ul className="mt-3 space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Líquido (750€ bruto)</span>
              <span className="font-medium dark:text-white">620€</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Férias</span>
              <span className="font-medium dark:text-white">Não</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subsídio Natal</span>
              <span className="font-medium dark:text-white">Não</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 text-sm">Segurança Social</span>
              <span className="font-medium text-right dark:text-white">IEFP paga</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContractComparison; 