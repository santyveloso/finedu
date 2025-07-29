import React, { useState } from 'react';

const AIAssistant: React.FC = () => {
  const [question, setQuestion] = useState('Se ganhar 1.800€, quanto recebo líquido?');
  const [response] = useState('Líquido: 1.312€ (retenção de 488€)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to your AI service
    console.log('AI Question submitted:', question);
  };

  return (
    <div className="card bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
          <i className="fas fa-robot text-primary-600"></i>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">AI Assistant</h2>
      </div>
      <div className="mt-4">
        <form onSubmit={handleSubmit} className="flex mb-3">
          <input 
            type="text" 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Pergunta sobre finanças..."
          />
          <button 
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 rounded-r-lg"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-3">
          <p className="font-medium text-gray-700 dark:text-gray-300">
            {response}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant; 