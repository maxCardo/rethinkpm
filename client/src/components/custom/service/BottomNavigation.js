import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavigation = ({ screens }) => {
  const [active, setActive] = useState(0);
  const [lastLocation, setLastLocation] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    changeActive();
    // eslint-disable-next-line
  }, [location]);

  const changeActive = () => {
    const currentLocation = location.pathname;
    if (lastLocation === currentLocation) return;
    const last = currentLocation.split("/").pop();
    for (let i = 0; i < screens.length; i++) {
      const screenRoute = screens[i].route;
      if (last === screenRoute) {
        setActive(i);
        setLastLocation(currentLocation);
        return;
      }
    }
    setActive(0);
    setLastLocation(currentLocation);
    const newLocation = currentLocation + "/" + screens[0].route;
    navigate(newLocation, { replace: true });
  };

  const goToScreen = (index) => {
    setActive(index);
    const actualLocation = location.pathname;
    const newLocationParts = actualLocation.split("/");
    newLocationParts[newLocationParts.length - 1] = screens[index].route;
    navigate(newLocationParts.join("/"));
  };

  return (
    <div className="bottom-navigation__container">
      <div className="bottom-navigation__screen">
        {screens[active].component}
      </div>
      <div className="bottom-navigation__tabs">
        {screens.map((screen, index) => (
          <button
            key={index}
            className="bottom-navigation__tab"
            active={(index === active).toString()}
            onClick={() => goToScreen(index)}
          >
            {screen.display}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
