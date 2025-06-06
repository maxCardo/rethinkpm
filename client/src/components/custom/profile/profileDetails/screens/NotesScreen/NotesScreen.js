import React, { useState } from "react";
import { connect } from "react-redux";
import TableWithSearch from "./TableWithSearch";
import TailwindTabs from "../../../../Tabs/TailwindTabs";

const NotesScreen = ({ profileType, activeProfile }) => {
  const [activeTab, setActiveTab] = useState("all");

  const allNotes = activeProfile.notes || [];

  const all = allNotes;
  const notes = allNotes.filter((note) => note.type === "note");
  const logs = allNotes.filter((note) => note.type === "log");

  const headers = [
    { accessor: "content", label: "Record" },
    { accessor: "date", label: "Date", mapper: "date" },
    { accessor: "user.name", label: "User" },
  ];

  const logHeaders = [
    {
      accessor: "type",
      label: "Type",
      mapper: (data) =>
        data ? data.charAt(0).toUpperCase() + data.slice(1) : "",
    },
    ...headers,
  ];

  const tabs = [
    { key: "all", title: "All" },
    { key: "notes", title: "Notes" },
    { key: "logs", title: "Logs" },
  ];

  const onSubmit = (data) => {
    console.log("onSubmit fired: ", data);
  };

  const renderTable = () => {
    switch (activeTab) {
      case "notes":
        return (
          <div>
            <TableWithSearch
              data={notes}
              headers={headers}
              profileType={profileType}
              handleSubmit={onSubmit}
            />
          </div>
        );
      case "logs":
        return (
          <TableWithSearch
            data={logs}
            headers={headers}
            profileType={profileType}
            handleSubmit={onSubmit}
          />
        );
      default:
        return (
          <TableWithSearch
            data={all}
            headers={logHeaders}
            profileType={profileType}
            handleSubmit={onSubmit}
            sortBy="date"
            sortDirection="desc"
            sorting={true}
          />
        );
    }
  };

  return (
    <div className="">
      <TailwindTabs
        className={"py-0"}
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        <div className="">{renderTable()}</div>
      </TailwindTabs>
    </div>
  );
};
const mapStateToProps = (state) => ({
  activeProfile: state.profile.activeProfile,
});

export default connect(mapStateToProps)(NotesScreen);
