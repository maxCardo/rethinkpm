import React from "react";
import NotesScreen from "./NotesScreen/NotesScreen";
import SalesScreen from "./SalesScreen";

const Screens = (props) => {
  const { screen } = props;
  switch (screen) {
    case "notes":
      return (
        <div className="h-screen">
          <NotesScreen {...props} />
        </div>
      );
    case "sales":
      return <SalesScreen {...props} />;
    default:
      return <div>No Screens Selected</div>;
  }
};

export default Screens;
