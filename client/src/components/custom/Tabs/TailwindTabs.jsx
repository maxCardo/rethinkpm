import React from 'react';

const TailwindTabs = ({ tabs, activeTab, setActiveTab, children }) => {
  return (
    <div className="w-full">
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`px-5 py-2 text-sm font-semibold transition-all duration-300 rounded-t-xl border ${
              activeTab === tab.key
                ? 'bg-white text-[#061331] shadow-sm'
                : 'bg-[#e4e4e7] text-[#061331] hover:bg-white'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.title}
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default TailwindTabs;
