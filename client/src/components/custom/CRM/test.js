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
  FaEye,
} from "react-icons/fa";
import LeaseTableFilters from "./leaseComponents/LeaseTableFilters";
import LeaseModal from "./leaseComponents/LeaseModal";
import LeaseConfirmModal from "./leaseComponents/LeaseConfirmModal";
import axios from "axios";
import MaterialAlert from "../../core/MaterialAlert";
import LeadDetails from "./leaseComponents/LeadDetails";
import LeadTourTracking from "./leaseComponents/LeadTourTracking";

const LeaseTest = ({
  getLeaseLeadData,
  leaseLeads: { list, loading },
  settings,
  isNavbarShown,
}) => {
  const TAB_KEYS = {
    Table: "table",
    Details: "details",
    Tour: "tour",
  };

  const [tabKey, setTabKey] = useState(TAB_KEYS.Table);
  const [initLeadsList, setInitLeadsList] = useState([]);
  const [updatedLeadsList, setUpdatedLeadsList] = useState(initLeadsList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    lead: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLeadItem, setSelectedLeadItem] = useState({});
  const NAVBAR_HEIGHT = 80;

  /* Tabs option */
  const DYNAMIC_TABS = [
    { key: TAB_KEYS.Table, title: "Table View" },
    { key: TAB_KEYS.Details, title: "Lead Details" },
    { key: TAB_KEYS.Tour, title: "Tour Tracking" },
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
      accessor: "lastContact",
      label: "Last Contact",
      reactComponent: true,
      render: (item) => {
        if (!item.lastContact) return "";
        const date = new Date(item.lastContact);
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
        <div className="flex flex-row w-100">
          <FaPencilAlt
            onClick={() => handleEditLead(item)}
            style={{ cursor: "pointer" }}
            title="Edit"
          />
          <FaTrashAlt
            className="mx-2"
            onClick={() => handleDeleteLead(item)}
            style={{ cursor: "pointer" }}
            title="Delete"
          />
          <FaEye
            title="Details"
            style={{ cursor: "pointer" }}
            onClick={() => handleWatchLeadDetails(item)}
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

  const filterListByQuery = React.useCallback(
    async (filters) => {
      const { search, field, value } = filters;
      try {
        let queryParams = new URLSearchParams();
        // Add search parameter if provided
        if (search && search.trim().length > 2) {
          queryParams.append("search", search.trim());
        }

        // Add field and value parameters if both provided
        if (field && field !== settings.filterFields.all && value) {
          queryParams.append("field", field);
          queryParams.append("value", value);
        }

        const queryString = queryParams.toString();
        const url = `/api/crm/leaselead${queryString ? `?${queryString}` : ""}`;

        console.log("Making filter request to:", url);

        const response = await axios.get(url);

        setUpdatedLeadsList(response.data);
      } catch (err) {
        console.error("Failed to filter leads:", err);
        // Fallback to showing all leads if query fails
        setUpdatedLeadsList(initLeadsList);
      }
    },
    [initLeadsList]
  );

  const handleEditLead = async (leadItem) => {
    setIsEditMode(true);
    setSelectedLeadItem(leadItem);
    setIsModalOpen(true);
  };

  const handleDeleteLead = async (leadItem) => {
    if (!leadItem || !leadItem._id) return;
    setDeleteConfirm({ open: true, lead: leadItem });
  };

  const confirmDelete = async () => {
    const leadItem = deleteConfirm.lead;
    if (!leadItem || !leadItem._id) return;
    try {
      await axios.patch(`/api/crm/leaselead/${leadItem._id}`);
      getLeaseLeadData(); // Refresh the list after deletion
      setDeleteAlert(true); // Show success alert
    } catch (err) {
      // Optionally show an error alert here
      console.error("Failed to delete lead", err);
    }
    setDeleteConfirm({ open: false, lead: null });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ open: false, lead: null });
  };

  const handleWatchLeadDetails = (leadItem) => {
    console.log("SELECTED ITEM => ", leadItem);

    setTabKey(TAB_KEYS.Details);
    setSelectedLeadItem(leadItem);
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
        {tabKey === TAB_KEYS.Table && (
          <>
            <div className="table-top flex flex-row my-4 justify-between items-center">
              <LeaseTableFilters
                filterListByQuery={filterListByQuery}
                settings={settings}
              />
              <div className="add-lead-btn px-2">
                <Button
                  color="primary"
                  className="self-end"
                  startIcon={<FaPlus size={"0.8rem"} />}
                  style={{ textTransform: "none" }}
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  variant="contained"
                >
                  Add Lead
                </Button>
              </div>
            </div>
            {updatedLeadsList.length === 0 ? (
              <div
                style={{ textAlign: "center", padding: "2rem", color: "#888" }}
              >
                No data available.
              </div>
            ) : (
              <Table
                headers={TABLE_HEADERS}
                list={updatedLeadsList}
                withCheckboxSelection={false}
                sticky={true}
                tableWrapperStyle={{
                  height: `calc(75vh - ${isNavbarShown ? NAVBAR_HEIGHT : 0}px)`,
                  overflowY: "auto",
                }}
                _orderBy={"nextAction"}
                _order={"desc"}
              />
            )}
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
            <LeaseConfirmModal
              open={deleteConfirm.open}
              title="Confirm Delete"
              message="Are you sure you want to delete this lead?"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          </>
        )}

        {/* Lease details */}
        {tabKey === TAB_KEYS.Details && (
          <LeadDetails
            selectedLeadItem={selectedLeadItem}
            onGoToTourTab={() => setTabKey(TAB_KEYS.Tour)}
          />
        )}

        {/* Lease Tour Tracking (info) */}
        {tabKey === TAB_KEYS.Tour && (
          <LeadTourTracking selectedLeadItem={selectedLeadItem} />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  leaseLeads: state.leaseLeads,
});

export default connect(mapStateToProps, { getLeaseLeadData })(LeaseTest);
