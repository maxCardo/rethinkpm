import React, { useState } from "react";
import Screen from "./screens/Screen";

const ProfileDetails = ({
  settings: { screens, profileType },
  activeProfile,
}) => {
  const [activeScreen, selectScreen] = useState("notes");

  return (
    <div className="flex flex-col h-full relative bg-gray-100">
      {/* Navigation Tabs */}
      <div className="w-full border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex">
          {screens.map((screen) => (
            <div
              key={screen}
              onClick={() => selectScreen(screen)}
              className={`px-5 py-2 text-sm font-semibold transition-all duration-300 rounded-t-xl border cursor-pointer
                ${
                  activeScreen === screen
                    ? "bg-darkBlue text-white shadow-sm"
                    : "bg-white text-[#061331] hover:bg-darkBlue hover:text-darkblue"
                }`}
            >
              {screen}
            </div>
          ))}
        </div>
      </div>

      {/* Screen Component */}
      <div className="flex-1 overflow-auto">
        <Screen
          screen={activeScreen}
          profileType={profileType}
          activeProfile={activeProfile}
        />
      </div>
    </div>
  );
};

export default ProfileDetails;
