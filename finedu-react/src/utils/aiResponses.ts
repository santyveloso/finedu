export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface AIResponse {
  message: string;
  suggestions?: string[];
  calculations?: {
    grossSalary?: number;
    netSalary?: number;
    taxAmount?: number;
    socialSecurity?: number;
  };
}

// Smart keyword detection for Portuguese financial terms
const detectQuestionType = (question: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('líquido') || lowerQuestion.includes('bruto') || lowerQuestion.includes('salário')) {
    return 'salary_calculation';
  }
  if (lowerQuestion.includes('irs') || lowerQuestion.includes('imposto')) {
    return 'tax_info';
  }
  if (lowerQuestion.includes('segurança social') || lowerQuestion.includes('descontos')) {
    return 'social_security';
  }
  if (lowerQuestion.includes('recibos verdes') || lowerQuestion.includes('efetivo') || lowerQuestion.includes('contrato')) {
    return 'contract_comparison';
  }
  if (lowerQuestion.includes('férias') || lowerQuestion.includes('subsídio')) {
    return 'benefits';
  }
  if (lowerQuestion.includes('prazo') || lowerQuestion.includes('data') || lowerQuestion.includes('quando')) {
    return 'deadlines';
  }
  
  return 'general';
};

// Extract salary amount from question
const extractSalary = (question: string): number | null => {
  const match = question.match(/(\d+)[€\s]*/);
  return match ? parseInt(match[1]) : null;
};

// Calculate salary based on Portuguese tax rates
export const calculatePortugueseSalary = (grossSalary: number) => {
  let taxRate = 0;
  let socialSecurityRate = 0.11;
  
  if (grossSalary <= 1000) {
    taxRate = 0.10;
  } else if (grossSalary <= 1500) {
    taxRate = 0.15;
  } else if (grossSalary <= 2000) {
    taxRate = 0.20;
  } else {
    taxRate = 0.25;
  }
  
  const taxAmount = grossSalary * taxRate;
  const socialSecurity = grossSalary * socialSecurityRate;
  const netSalary = grossSalary - taxAmount - socialSecurity;
  
  return {
    grossSalary,
    netSalary: Math.round(netSalary),
    taxAmount: Math.round(taxAmount),
    socialSecurity: Math.round(socialSecurity)
  };
};

export const generateAIResponse = (question: string): AIResponse => {
  const questionType = detectQuestionType(question);
  const salary = extractSalary(question);
  
  switch (questionType) {
    case 'salary_calculation':
      if (salary) {
        const calc = calculatePortugueseSalary(salary);
        return {
          message: `Com base no seu salário bruto de ${salary}€, aqui está o cálculo detalhado:

💰 **Salário Líquido:** ${calc.netSalary}€
📊 **Descontos:**
   • Impostos: ${calc.taxAmount}€
   • Segurança Social: ${calc.socialSecurity}€

💡 **Nota:** Este cálculo é uma estimativa baseada em taxas médias. O valor real pode variar dependendo da sua situação específica.`,
          suggestions: [
            "Como funcionam os recibos verdes?",
            "Qual a diferença entre contrato efetivo e recibos verdes?",
            "Quando devo entregar o IRS?"
          ],
          calculations: calc
        };
      }
      return {
        message: `Para calcular o seu salário líquido, preciso saber o valor bruto. 

💡 **Exemplo:** Se ganhar 1500€ brutos, receberá aproximadamente 1110€ líquidos.

**Como calcular:**
• Descontos para IRS: 10-25% (depende do valor)
• Segurança Social: 11% (trabalhador)
• Segurança Social: 21% (recibos verdes)

Quer que eu calcule para um valor específico?`,
        suggestions: [
          "Calcular para 2000€ brutos",
          "Calcular para 1200€ brutos",
          "Como funcionam os recibos verdes?"
        ]
      };

    case 'tax_info':
      return {
        message: `📋 **IRS em Portugal - Guia Completo:**

**🗓️ Prazos Importantes:**
• Entrega do IRS: 1 de abril a 30 de junho
• Pagamento: até 31 de agosto

**💰 Retenção na Fonte:**
• Até 1000€: 10%
• 1000€-1500€: 15%
• 1500€-2000€: 20%
• Acima de 2000€: 25%

**📄 Documentos Necessários:**
• Recibos de vencimento
• Despesas dedutíveis
• Informações bancárias

**💡 Dica:** Guarde todos os recibos de despesas (saúde, educação, habitação) para deduzir no IRS!`,
        suggestions: [
          "Quais despesas são dedutíveis?",
          "Como entregar o IRS online?",
          "Quando recebo o reembolso?"
        ]
      };

    case 'social_security':
      return {
        message: `🏛️ **Segurança Social - Contribuições:**

**👨‍💼 Trabalhador por Conta de Outrem:**
• Contribuição: 11% do salário bruto
• Empresa paga: 23.75%
• Total: 34.75%

**👨‍💻 Recibos Verdes (Autónomo):**
• Contribuição: 21.4% do rendimento
• Pagamento: até dia 20 do mês seguinte

**📅 Prazos de Pagamento:**
• Trabalhador: Empresa trata automaticamente
• Autónomo: Até dia 20 de cada mês

**💡 Benefícios:**
• Subsídio de doença
• Subsídio de desemprego
• Pensão de reforma

**⚠️ Importante:** Se trabalhar por conta própria, deve pagar até dia 20. Se for trabalhador, a empresa trata do pagamento.`,
        suggestions: [
          "Como calcular contribuições?",
          "Quais os benefícios da Segurança Social?",
          "Como pedir subsídio de desemprego?"
        ]
      };

    case 'contract_comparison':
      return {
        message: `📋 **Comparação de Contratos - Guia Completo:**

**✅ Contrato Efetivo (Mais Comum):**
• Salário líquido: ~75% do bruto
• Férias: 22 dias + subsídio
• Subsídio Natal: Sim
• Segurança Social: Empresa paga
• Estabilidade: Alta

**📄 Recibos Verdes (Autónomo):**
• Salário líquido: ~68% do bruto
• Férias: Não (tem de gerir)
• Subsídio Natal: Não
• Segurança Social: Autónomo paga
• Flexibilidade: Alta

**🎓 Estágio IEFP:**
• Salário líquido: ~83% do bruto
• Férias: Não
• Subsídio Natal: Não
• Segurança Social: IEFP paga
• Duração: 6-12 meses

**💡 Recomendação:** Para jovens, contrato efetivo oferece mais segurança e benefícios.`,
        suggestions: [
          "Calcular diferença salarial",
          "Quais os direitos do trabalhador?",
          "Como negociar contrato?"
        ]
      };

    case 'benefits':
      return {
        message: `🎁 **Benefícios do Trabalhador em Portugal:**

**🏖️ Férias:**
• 22 dias úteis por ano
• Subsídio de férias: 100% do salário
• Subsídio de Natal: 100% do salário

**🏥 Segurança Social:**
• Subsídio de doença: 55-75% do salário
• Subsídio de desemprego: 65% do salário
• Pensão de reforma: 55% do salário médio

**👶 Licenças:**
• Licença de maternidade: 120-150 dias
• Licença de paternidade: 25 dias
• Licença para cuidar de filhos: 30 dias

**💡 Dica:** Guarde sempre os recibos de despesas de saúde e educação - são dedutíveis no IRS!`,
        suggestions: [
          "Como pedir licença de maternidade?",
          "Quais despesas são dedutíveis?",
          "Como calcular subsídio de doença?"
        ]
      };

    case 'deadlines':
      return {
        message: `📅 **Prazos Financeiros Importantes:**

**🗓️ IRS:**
• Entrega: 1 de abril a 30 de junho
• Pagamento: até 31 de agosto
• Reembolso: até 31 de agosto

**🏛️ Segurança Social:**
• Trabalhador: Empresa trata automaticamente
• Autónomo: Até dia 20 de cada mês

**📊 Declarações Trimestrais (Autónomo):**
• 1º Trimestre: 15 de abril
• 2º Trimestre: 15 de julho
• 3º Trimestre: 15 de outubro
• 4º Trimestre: 15 de janeiro

**💡 Lembrete:** Configure lembretes no seu calendário para não perder prazos importantes!`,
        suggestions: [
          "Como configurar lembretes?",
          "O que acontece se perder o prazo?",
          "Como entregar IRS online?"
        ]
      };

    default:
      return {
        message: `Olá! Sou o seu assistente financeiro pessoal. Posso ajudá-lo com:

💰 **Cálculos salariais** e descontos
📋 **Informações sobre IRS** e prazos
🏛️ **Segurança Social** e contribuições
📄 **Comparação de contratos** de trabalho
🎁 **Benefícios** e direitos do trabalhador

Como posso ajudá-lo hoje?`,
        suggestions: [
          "Calcular salário líquido",
          "Como funciona o IRS?",
          "Qual a diferença entre contratos?",
          "Quais os prazos importantes?"
        ]
      };
  }
}; 