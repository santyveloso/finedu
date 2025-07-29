import React, { useState, useEffect } from 'react';
import { calculateSalary, getContractTypeLabel, SalaryCalculation } from '../utils/salaryCalculator';

const IRSSimulator: React.FC = () => {
  const [grossSalary, setGrossSalary] = useState<number>(1500);
  const [contractType, setContractType] = useState<string>('efetivo');
  const [calculation, setCalculation] = useState<SalaryCalculation | null>(null);

  useEffect(() => {
    const result = calculateSalary(grossSalary, contractType);
    setCalculation(result);
  }, [grossSalary, contractType]);

  return (
    <div className="card bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
          <i className="fas fa-calculator text-primary-600"></i>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">IRS Simulator</h2>
      </div>
      <div className="mt-4 space-y-4">
        {/* Input Form */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Salário Bruto (€)
            </label>
            <input
              type="number"
              value={grossSalary}
              onChange={(e) => setGrossSalary(Number(e.target.value))}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="1500"
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tipo de Contrato
            </label>
            <select
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="efetivo">Efetivo</option>
              <option value="recibos-verdes">Recibos Verdes</option>
              <option value="iefp">IEFP</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {calculation && (
          <div className="bg-primary-50 rounded-lg p-4">
            <p className="text-center text-lg font-semibold text-primary-700 mb-2">
              Recebes ~{calculation.netSalary}€/mês líquidos
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Impostos:</span>
                <span>{calculation.taxAmount}€</span>
              </div>
              <div className="flex justify-between">
                <span>Segurança Social:</span>
                <span>{calculation.socialSecurity}€</span>
              </div>
              <div className="border-t border-gray-200 pt-1 mt-1">
                <div className="flex justify-between font-medium">
                  <span>Líquido:</span>
                  <span className="text-primary-600">{calculation.netSalary}€</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Simulação com base em {getContractTypeLabel(contractType).toLowerCase()} e retenção normal
        </p>
      </div>
    </div>
  );
};

export default IRSSimulator; 