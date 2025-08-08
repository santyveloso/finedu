import React from 'react';

type ResourceLink = {
  title: string;
  href: string;
};

const AIResources: React.FC = () => {
  const resources: ResourceLink[] = [
    { title: 'O que é a retenção na fonte?', href: '/recursos/retencao-na-fonte.html' },
    { title: 'Como funcionam os recibos verdes', href: '/recursos/recibos-verdes.html' },
    { title: 'Passo a passo: entrega do IRS', href: '/recursos/irs-passo-a-passo.html' },
    { title: 'Direitos do trabalhador', href: '/recursos/direitos-trabalhador.html' },
  ];

  return (
    <div className="card bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
          <i className="fas fa-book-open text-primary-600"></i>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recursos Simplificados</h2>
      </div>
      <div className="mt-4 space-y-2">
        {resources.map((resource) => (
          <a
            key={resource.href}
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors w-full text-left group"
          >
            <i className="fas fa-file-lines text-primary-500 mr-3"></i>
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary-700 dark:group-hover:text-primary-400">
              {resource.title}
            </span>
            <i className="fas fa-arrow-up-right-from-square ml-auto text-gray-400 group-hover:text-primary-500"></i>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AIResources; 