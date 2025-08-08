import React, { useState, useEffect } from 'react';
import { calculateSalary, getContractTypeLabel, SalaryCalculation, MaritalStatus } from '../utils/salaryCalculator';

const IRSSimulator: React.FC = () => {
  const [grossSalary, setGrossSalary] = useState<number>(1500);
  const [contractType, setContractType] = useState<string>('efetivo');
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>('single');
  const [dependents, setDependents] = useState<number>(0);
  const [calculation, setCalculation] = useState<SalaryCalculation | null>(null);

  useEffect(() => {
    const result = calculateSalary(grossSalary, contractType, maritalStatus, dependents);
    setCalculation(result);
  }, [grossSalary, contractType, maritalStatus, dependents]);

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Estado Civil
              </label>
              <select
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value as MaritalStatus)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="single">Solteiro(a)</option>
                <option value="married">Casado(a)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Dependentes
              </label>
              <input
                type="number"
                min={0}
                max={8}
                value={dependents}
                onChange={(e) => setDependents(Math.max(0, Math.min(8, Number(e.target.value))))}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {calculation && (
          <div className="bg-primary-50 dark:bg-gray-700/40 rounded-lg p-4">
            <p className="text-center text-lg font-semibold text-primary-700 mb-2">
              Recebes ~{calculation.netSalary}€/mês líquidos
            </p>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <div className="flex justify-between">
                <span>Impostos:</span>
                <span>{calculation.taxAmount}€ <span className="text-xs text-gray-500">({Math.round(calculation.breakdown.taxRateApplied*100)}%)</span></span>
              </div>
              <div className="flex justify-between">
                <span>Segurança Social:</span>
                <span>{calculation.socialSecurity}€ <span className="text-xs text-gray-500">({Math.round(calculation.breakdown.socialSecurityRateApplied*100)}%)</span></span>
              </div>
              <div className="border-t border-gray-200 pt-1 mt-1">
                <div className="flex justify-between font-medium">
                  <span>Líquido:</span>
                  <span className="text-primary-600">{calculation.netSalary}€</span>
                </div>
              </div>
            </div>
            {calculation.assumptions?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {calculation.assumptions.map((a, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 rounded-full bg-white/70 dark:bg-gray-800/60 border border-primary-100 text-gray-700 dark:text-gray-300">
                    {a}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Simulação com base em {getContractTypeLabel(contractType).toLowerCase()} e tabelas simplificadas (MVP)
        </p>
      </div>
    </div>
  );
};

export default IRSSimulator; 