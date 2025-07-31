import React, { useState } from 'react';
import { aiService } from '../utils/aiService';

interface AISettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const AISettings: React.FC<AISettingsProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSaveAPIKey = async () => {
    if (!apiKey.trim()) return;

    setIsLoading(true);
    setStatus('idle');

    try {
      // Test the API key
      aiService.setAPIKey(apiKey);
      
      // Test with a simple question
      const testResponse = await aiService.generateResponse('Test connection');
      
      if (testResponse.message) {
        setStatus('success');
        // Save to localStorage
        localStorage.setItem('gemini_api_key', apiKey);
        setTimeout(() => onClose(), 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('API key test failed:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAPIKey = () => {
    aiService.setAPIKey('');
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setStatus('success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Configurações AI
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Google AI Studio API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Cole aqui a sua API key do Google AI Studio"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Obtenha a sua API key em{' '}
              <a 
                href="https://aistudio.google.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Google AI Studio
              </a>
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleSaveAPIKey}
              disabled={isLoading || !apiKey.trim()}
              className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  A testar...
                </span>
              ) : (
                'Guardar e Testar'
              )}
            </button>
            
            {aiService.isAPIAvailable() && (
              <button
                onClick={handleRemoveAPIKey}
                className="px-4 py-2 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Remover
              </button>
            )}
          </div>

          {status === 'success' && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                <span className="text-green-700 dark:text-green-400 text-sm">
                  API key configurada com sucesso!
                </span>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <div className="flex items-center">
                <i className="fas fa-exclamation-circle text-red-500 mr-2"></i>
                <span className="text-red-700 dark:text-red-400 text-sm">
                  Erro ao testar API key. Verifique se está correta.
                </span>
              </div>
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex items-start">
              <i className="fas fa-info-circle text-blue-500 mr-2 mt-0.5"></i>
              <div className="text-sm text-blue-700 dark:text-blue-400">
                <p className="font-medium mb-1">Como obter a API key:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Aceda ao Google AI Studio</li>
                  <li>Crie um novo projeto</li>
                  <li>Copie a API key gerada</li>
                  <li>Cole aqui para ativar o AI avançado</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISettings; 