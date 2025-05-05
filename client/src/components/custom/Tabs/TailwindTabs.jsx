import React from 'react';

const TailwindTabs = ({ tabs, activeTab, setActiveTab, children }) => {
  return (
    <div className="w-full border-b border-gray-200 ">
      <div className="flex">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`px-5 py-2 text-sm font-semibold transition-all duration-300 rounded-t-xl border ${
              activeTab === tab.key
                ? 'bg-darkBlue text-white shadow-sm'
                : 'bg-[#ffffff] text-[#061331] hover:bg-darkBlue hover:text-white'
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
