import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import IconButton from "../../core/IconButton/IconButton";
import Table from "../../core/newTable/_Table";
import Loading from "../../core/LoadingScreen/Loading";
import TailwindTabs from "../Tabs/TailwindTabs";
import { getLeaseLeadData } from "../../../actions/crm/leaseLeads";
// import leaseLeads from "../../../reducers/leaseLeads";
import { Chip, Button } from "@mui/material";
import {
  FaFire,
  FaSnowflake,
  FaCloudSun,
  FaPlus,
  FaPencilAlt,
  FaTrashAlt,
} from "react-icons/fa";
import LeaseTableFilters from "./leaseComponents/LeaseTableFilters";
import LeaseModal from "./leaseComponents/LeaseModal";
import axios from "axios";
import MaterialAlert from "../../core/MaterialAlert";

const LeaseTest = ({
  getLeaseLeadData,
  leaseLeads: { list, loading },
  settings,
}) => {
  const TABS_KEY = {
    Table: "table",
    Details: "details",
    Tour: "tour",
  };

  const [tabKey, setTabKey] = useState(TABS_KEY.Table);
  const [initLeadsList, setInitLeadsList] = useState([]);
  const [updatedLeadsList, setUpdatedLeadsList] = useState(initLeadsList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLeadItem, setSelectedLeadItem] = useState({});

  /* Tabs option */
  const DYNAMIC_TABS = [
    { key: TABS_KEY.Table, title: "Table View" },
    { key: TABS_KEY.Details, title: "Lead Details" },
    { key: TABS_KEY.Tour, title: "Tour Tracking" },
  ];

  /* Headers */
  const TABLE_HEADERS = [
    {
      accessor: "fullName",
      label: "Name",
    },
    {
      reactComponent: true,
      accessor: "email",
      label: "Email",
      render: (item) => (
        <>
          {item.email?.length > 0
            ? item.email.map((item, idx) => <div key={idx}>{item.address}</div>)
            : ""}
        </>
      ),
    },
    {
      reactComponent: true,
      accessor: "phoneNumbers",
      label: "Phone",
      render: (item) => (
        <>
          {item.phoneNumbers?.length > 0
            ? item.phoneNumbers.map((phone, idx) => (
                <div key={idx}>{phone.number}</div>
              ))
            : ""}
        </>
      ),
    },
    {
      accessor: "listingAddress",
      label: "Address",
    },
    {
      reactComponent: true,
      accessor: "status",
      label: "Status",
      render: (item) => (
        <>
          <Chip
            variant="outlined"
            label={
              item.status
                ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                : ""
            }
            color={
              item.status === settings.statusOptions.new ? "success" : "error"
            }
          />
        </>
      ),
    },
    {
      accessor: "leadOwner",
      label: "Lead Owner",
    },
    {
      reactComponent: true,
      accessor: "leadTemperature",
      label: "Temp",
      render: (item) => (
        <>
          {/* Lead Temperatures: Hot, Warm, Cold */}
          {item.leadTemperature === settings.temperatureOptions.hot && (
            <FaFire color="orangered" size={"1.5rem"} title="hot-lead" />
          )}
          {item.leadTemperature === settings.temperatureOptions.warm && (
            <FaCloudSun color="orange" size={"1.5rem"} title="warm-lead" />
          )}
          {item.leadTemperature === settings.temperatureOptions.cold && (
            <FaSnowflake
              color="lightskyblue"
              size={"1.5rem"}
              title="cold-lead"
            />
          )}
        </>
      ),
    },
    // {
    //   accessor: "createDate",
    //   label: "Created",
    //   reactComponent: true,
    //   render: (item) => {
    //     if (!item.createDate) return "";
    //     const date = new Date(item.createDate);
    //     return isNaN(date)
    //       ? ""
    //       : `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
    //           .getDate()
    //           .toString()
    //           .padStart(2, "0")}/${date.getFullYear()}`;
    //   },
    // },
    {
      accessor: "nextAction",
      label: "Next Action",
      reactComponent: true,
      render: (item) => {
        if (!item.nextAction) return "";
        const date = new Date(item.nextAction);
        return isNaN(date)
          ? ""
          : `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
              .getDate()
              .toString()
              .padStart(2, "0")}/${date.getFullYear()}`;
      },
    },
    {
      accessor: "tourDate",
      label: "Tour Date",
      reactComponent: true,
      render: (item) => {
        if (!item.tourDate) return "";
        const date = new Date(item.tourDate);
        return isNaN(date)
          ? ""
          : `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
              .getDate()
              .toString()
              .padStart(2, "0")}/${date.getFullYear()}`;
      },
    },
    {
      reactComponent: true,
      accessor: "actions",
      label: "Actions",
      align: "center",
      render: (item) => (
        <div className="flex flex-row w-100 ml-3">
          <FaPencilAlt
            onClick={() => handleEditLead(item)}
            style={{ cursor: "pointer" }}
          />
          <FaTrashAlt
            className="mx-2"
            onClick={() => handleDeleteLead(item)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getLeaseLeadData();
  }, []);

  useEffect(() => {
    // set the default/init list before any filters
    if (list.length > 0) {
      setInitLeadsList(list);
    }
  }, [list]);

  useEffect(() => {
    // start with the init list
    setUpdatedLeadsList(initLeadsList);
  }, [initLeadsList]);

  const filterListByField = (field, fieldVal) => {
    /* Filter from the inital array */
    const fillteredList = initLeadsList.filter((item) => {
      return item[field] === fieldVal;
    });
    setUpdatedLeadsList(fillteredList);
  };

  const filterListBySearch = (expression) => {
    const searchRegexp = new RegExp(expression, "i");
    /* Filter from the inital array */
    const fillteredList = initLeadsList.filter((item) => {
      return (
        searchRegexp.test(item.fullName) ||
        searchRegexp.test(item.email) ||
        searchRegexp.test(item.listingAddress)
      );
    });

    setUpdatedLeadsList(fillteredList);
  };

  const handleEditLead = async (leadItem) => {
    setIsEditMode(true);
    setSelectedLeadItem(leadItem);
    setIsModalOpen(true);
  };

  const handleDeleteLead = async (leadItem) => {
    if (!leadItem || !leadItem._id) return;
    try {
      await axios.delete(`/api/crm/leaselead/${leadItem._id}`);
      getLeaseLeadData(); // Refresh the list after deletion
      setDeleteAlert(true); // Show success alert
    } catch (err) {
      // Optionally show an error alert here
      console.error("Failed to delete lead", err);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <TailwindTabs
        className={"py-2"}
        tabs={DYNAMIC_TABS}
        activeTab={tabKey}
        setActiveTab={setTabKey}
      />

      <div className="table-view">
        {/* Lease Leads List (table) */}
        {tabKey === TABS_KEY.Table && (
          <>
            <div className="table-top flex flex-row my-4 justify-between items-center">
              <LeaseTableFilters
                filterListByField={filterListByField}
                filterListBySearch={filterListBySearch}
                settings={settings}
              />
              <div className="add-lead-btn px-2">
                <Button
                  color="primary"
                  className="self-end"
                  startIcon={<FaPlus size={"0.8rem"} />}
                  style={{ textTransform: "none" }}
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  // variant="outlined"
                >
                  Add Lead
                </Button>
              </div>
            </div>
            <Table
              headers={TABLE_HEADERS}
              list={updatedLeadsList}
              withCheckboxSelection={false}
              sticky={true}
            />
            <LeaseModal
              isModalOpen={isModalOpen}
              closeModal={() => {
                setIsModalOpen(false);
                setIsEditMode(false);
                setSelectedLeadItem({});
              }}
              settings={settings}
              getLeaseLeadData={getLeaseLeadData}
              isEditMode={isEditMode}
              selectedLeadItem={selectedLeadItem}
            />
            <MaterialAlert
              open={deleteAlert}
              onClose={() => setDeleteAlert(false)}
              message="Lead deleted successfully!"
              severity="success"
              duration={3000}
            />
          </>
        )}

        {/* Lease details */}
        {tabKey === TABS_KEY.Details && <div>I am details!</div>}

        {/* Lease Tour Tracking (info) */}
        {tabKey === TABS_KEY.Tour && <div>I am Tour tracking!</div>}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  leaseLeads: state.leaseLeads,
});

export default connect(mapStateToProps, { getLeaseLeadData })(LeaseTest);
