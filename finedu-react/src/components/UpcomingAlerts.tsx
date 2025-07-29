import React, { useState, useEffect } from 'react';

interface Alert {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'irs' | 'social-security';
  details: string;
  dismissed: boolean;
}

const UpcomingAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'IRS',
      description: 'Submissão começa a 1 de abril',
      date: '1 de abril',
      type: 'irs',
      details: 'A entrega do IRS começa a 1 de abril. Certifique-se de ter todos os documentos necessários: recibos de vencimento, despesas dedutíveis, e informações bancárias.',
      dismissed: false
    },
    {
      id: '2',
      title: 'Segurança Social',
      description: 'Prazo para pagamento: 20 de março',
      date: '20 de março',
      type: 'social-security',
      details: 'Prazo para pagamento das contribuições para a Segurança Social. Se trabalha por conta própria, deve pagar até dia 20. Se for trabalhador por conta de outrem, a empresa trata do pagamento.',
      dismissed: false
    }
  ]);

  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  // Load dismissed state from localStorage
  useEffect(() => {
    const dismissedAlerts = localStorage.getItem('dismissedAlerts');
    if (dismissedAlerts) {
      const dismissedIds = JSON.parse(dismissedAlerts);
      setAlerts(prev => prev.map(alert => ({
        ...alert,
        dismissed: dismissedIds.includes(alert.id)
      })));
    }
  }, []);

  const toggleExpanded = (alertId: string) => {
    setExpandedAlert(expandedAlert === alertId ? null : alertId);
  };

  const dismissAlert = (alertId: string) => {
    const updatedAlerts = alerts.map(alert => 
      alert.id === alertId ? { ...alert, dismissed: true } : alert
    );
    setAlerts(updatedAlerts);
    
    // Save to localStorage
    const dismissedIds = updatedAlerts
      .filter(alert => alert.dismissed)
      .map(alert => alert.id);
    localStorage.setItem('dismissedAlerts', JSON.stringify(dismissedIds));
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);

  return (
    <div className="card bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
          <i className="fas fa-bell text-primary-600"></i>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Próximos Alertas</h2>
      </div>
      <div className="mt-4 space-y-3">
        {activeAlerts.map((alert) => (
          <div 
            key={alert.id}
            className={`rounded-lg border cursor-pointer transition-all duration-200 ${
              alert.type === 'irs' 
                ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30' 
                : 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30'
            }`}
            onClick={() => toggleExpanded(alert.id)}
          >
            <div className="flex items-start p-3">
              <i className={`fas ${
                alert.type === 'irs' ? 'fa-calendar-alt text-amber-500' : 'fa-file-invoice-dollar text-blue-500'
              } mt-1 mr-3`}></i>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{alert.title}</p>
                <p className="text-gray-700 dark:text-gray-300">
                  {alert.description.replace(alert.date, '')}
                  <span className="font-semibold">{alert.date}</span>
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismissAlert(alert.id);
                }}
                className="text-gray-400 hover:text-gray-600 ml-2"
                title="Dismiss alert"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            {/* Expanded Details */}
            {expandedAlert === alert.id && (
                              <div className="px-3 pb-3 border-t border-gray-200 dark:border-gray-600 mt-2 pt-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{alert.details}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    <i className="fas fa-info-circle mr-1"></i>
                    Clique para recolher
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissAlert(alert.id);
                    }}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Marcar como lido
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {activeAlerts.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <i className="fas fa-check-circle text-green-500 mb-2"></i>
            <p>Nenhum alerta pendente</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingAlerts; 