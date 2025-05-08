import React from 'react';

const TailwindTabs = ({ tabs, activeTab, setActiveTab, children,className }) => {
  return (
    <div className="w-full border-b border-gray-200">
      <div className="flex">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5  text-sm font-semibold ${className} transition-all duration-300 rounded-t-xl border cursor-pointer
              ${
                activeTab === tab.key
                  ? 'bg-darkBlue text-white shadow-sm'
                  : 'bg-[#ffffff] text-[#061331] hover:bg-darkBlue hover:text-white'
              }`}
          >
            {tab.title}
          </div>
        ))}
      </div>

      {children}
    </div>
  );
};

export default TailwindTabs;
