export interface SalaryCalculation {
  grossSalary: number;
  netSalary: number;
  taxAmount: number;
  socialSecurity: number;
  contractType: string;
  assumptions: string[];
  breakdown: {
    taxRateApplied: number;
    socialSecurityRateApplied: number;
  };
}

export type MaritalStatus = 'single' | 'married';

// Simplified tax brackets by marital status and dependents adjustment
// Rates are intentionally simple placeholders for MVP and NOT official tables
const TAX_BRACKETS: Record<MaritalStatus, Array<{ upTo: number; rate: number }>> = {
  single: [
    { upTo: 1000, rate: 0.08 },
    { upTo: 1500, rate: 0.13 },
    { upTo: 2000, rate: 0.18 },
    { upTo: Infinity, rate: 0.23 },
  ],
  married: [
    { upTo: 1000, rate: 0.06 },
    { upTo: 1500, rate: 0.11 },
    { upTo: 2000, rate: 0.16 },
    { upTo: Infinity, rate: 0.21 },
  ],
};

function getTaxRate(grossSalary: number, maritalStatus: MaritalStatus, dependents: number): number {
  const brackets = TAX_BRACKETS[maritalStatus];
  const baseRate = brackets.find(b => grossSalary <= b.upTo)!.rate;
  // Simple dependent relief: -1pp por dependente até -3pp
  const dependentsRelief = Math.min(dependents, 3) * 0.01;
  return Math.max(baseRate - dependentsRelief, 0);
}

function getSocialSecurityRate(contractType: string): number {
  switch (contractType) {
    case 'efetivo':
      return 0.11; // trabalhador por conta de outrem
    case 'recibos-verdes':
      return 0.21; // trabalhador independente (pode variar; MVP)
    case 'iefp':
      return 0; // suportado pelo programa
    default:
      return 0.11;
  }
}

export const calculateSalary = (
  grossSalary: number,
  contractType: string,
  maritalStatus: MaritalStatus = 'single',
  dependents: number = 0
): SalaryCalculation => {
  const taxRate = getTaxRate(grossSalary, maritalStatus, dependents);
  const socialSecurityRate = getSocialSecurityRate(contractType);

  const taxAmount = grossSalary * taxRate;
  const socialSecurity = grossSalary * socialSecurityRate;
  const netSalary = grossSalary - taxAmount - socialSecurity;

  const assumptions: string[] = [
    `Tabelas simplificadas (${maritalStatus === 'single' ? 'solteiro(a)' : 'casado(a)'})`,
    `${dependents} dependente(s) considerado(s) (-${Math.min(dependents, 3)}pp na taxa)`,
    `Contribuição SS de ${Math.round(socialSecurityRate * 100)}% para ${getContractTypeLabel(contractType)}`,
  ];

  return {
    grossSalary,
    netSalary: Math.round(netSalary),
    taxAmount: Math.round(taxAmount),
    socialSecurity: Math.round(socialSecurity),
    contractType,
    assumptions,
    breakdown: {
      taxRateApplied: taxRate,
      socialSecurityRateApplied: socialSecurityRate,
    },
  };
};

export const getContractTypeLabel = (contractType: string): string => {
  switch (contractType) {
    case 'efetivo':
      return 'Efetivo';
    case 'recibos-verdes':
      return 'Recibos Verdes';
    case 'iefp':
      return 'IEFP';
    default:
      return 'Efetivo';
  }
}; 