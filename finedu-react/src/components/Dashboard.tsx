import React from 'react';
import IRSSimulator from './IRSSimulator';
import AIAssistant from './AIAssistant';
import UpcomingAlerts from './UpcomingAlerts';
import ContractComparison from './ContractComparison';
import AIResources from './AIResources';
import GamifiedJourney from './GamifiedJourney';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <IRSSimulator />
      <AIAssistant />
      <UpcomingAlerts />
      <ContractComparison />
      <AIResources />
      <GamifiedJourney />
    </div>
  );
};

export default Dashboard; 