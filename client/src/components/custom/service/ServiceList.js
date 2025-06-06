import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate instead of withRouter
import Table from "../../core/Table";
import { ButtonGroup } from "react-bootstrap";
import { connect } from "react-redux";
import "./style.css";

const ServiceList = ({ services }) => {
  const [filterString, setFilterString] = useState("");
  const [activeData, setActiveData] = useState("all");
  const [data, setData] = useState(services);
  const navigate = useNavigate();

  const headers = [
    {
      accessor: "parent",
      label: "Type",
      mapper: (data) => (data ? "Task" : "Service"),
    },
    {
      accessor: "opened",
      label: "Created Date",
      mapper: (data) => new Intl.DateTimeFormat().format(new Date(data)),
    },
    {
      accessor: "madeBy",
      label: "Request Made By",
    },
    {
      accessor: "serviceType",
      label: "Service Type",
    },
    {
      accessor: "status",
      label: "Status",
    },
    {
      accessor: "statusDate",
      label: "Status Date",
      mapper: (data) => new Intl.DateTimeFormat().format(new Date(data)),
    },
    {
      accessor: "closed",
      label: "Closed",
      mapper: (data) =>
        data
          ? new Intl.DateTimeFormat().format(new Date(data))
          : "Not Closed yet",
    },
    {
      reactComponent: true,
      label: "Actions",
      sortable: false,
      render: (row) => (
        <div>
          <div>
            <Link
              className="service__action-button"
              to={`/services/${row._id}`}
            >
              <i className="fas fa-ellipsis-h"></i>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const changeActiveData = (activeType) => {
    let updatedData = services;
    if (activeType === "jobs") {
      updatedData = services.filter((service) => !service.parent);
    } else if (activeType === "tasks") {
      updatedData = services.filter((service) => service.parent);
    }
    setActiveData(activeType);
    setData(updatedData);
  };

  return (
    <div style={{ padding: "2rem 1rem" }}>
      <div className="service-list__button-group">
        <ButtonGroup>
          <button
            className={`btn btn-success ${
              activeData !== "all" ? "inactive" : ""
            }`}
            onClick={() => changeActiveData("all")}
          >
            All
          </button>
          <button
            className={`btn btn-warning ${
              activeData !== "jobs" ? "inactive" : ""
            }`}
            onClick={() => changeActiveData("jobs")}
          >
            Jobs
          </button>
          <button
            className={`btn btn-danger ${
              activeData !== "tasks" ? "inactive" : ""
            }`}
            onClick={() => changeActiveData("tasks")}
          >
            Tasks
          </button>
        </ButtonGroup>
      </div>
      <div className="searchContainer">
        <input
          className="form-control searchInput"
          tabIndex={0}
          value={filterString}
          onChange={(e) => setFilterString(e.target.value)}
          placeholder="Search"
        />
      </div>
      <Table
        data={data}
        headers={headers}
        sorting={true}
        fontSize={12}
        pageSize={20}
        filter={filterString}
        onClickRow={(row) => navigate(`/services/${row._id}`)} // ✅ useNavigate
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  services: Object.values(state.services.services),
});

export default connect(mapStateToProps)(ServiceList);
