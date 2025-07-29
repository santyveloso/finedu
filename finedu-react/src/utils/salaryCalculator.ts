export interface SalaryCalculation {
  grossSalary: number;
  netSalary: number;
  taxAmount: number;
  socialSecurity: number;
  contractType: string;
}

export const calculateSalary = (grossSalary: number, contractType: string): SalaryCalculation => {
  let taxRate = 0;
  let socialSecurityRate = 0;
  
  switch (contractType) {
    case 'efetivo':
      // Simplified Portuguese tax calculation for employees
      if (grossSalary <= 1000) {
        taxRate = 0.10;
      } else if (grossSalary <= 1500) {
        taxRate = 0.15;
      } else if (grossSalary <= 2000) {
        taxRate = 0.20;
      } else {
        taxRate = 0.25;
      }
      socialSecurityRate = 0.11; // Employee contribution
      break;
      
    case 'recibos-verdes':
      // Simplified calculation for freelancers
      taxRate = 0.25; // Higher tax rate for freelancers
      socialSecurityRate = 0.21; // Self-employed contribution
      break;
      
    case 'iefp':
      // IEFP internship - lower salary, no tax
      taxRate = 0;
      socialSecurityRate = 0;
      break;
      
    default:
      taxRate = 0.15;
      socialSecurityRate = 0.11;
  }
  
  const taxAmount = grossSalary * taxRate;
  const socialSecurity = grossSalary * socialSecurityRate;
  const netSalary = grossSalary - taxAmount - socialSecurity;
  
  return {
    grossSalary,
    netSalary: Math.round(netSalary),
    taxAmount: Math.round(taxAmount),
    socialSecurity: Math.round(socialSecurity),
    contractType
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