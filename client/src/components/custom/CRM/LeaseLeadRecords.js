import { useEffect, useState, useCallback, useRef } from "react";
import { connect } from "react-redux";
import Table from "../../core/newTable/_Table";
import Loading from "../../core/LoadingScreen/Loading";
import TailwindTabs from "../Tabs/TailwindTabs";
import { getLeaseLeadData } from "../../../actions/crm/leaseLeads";
import { Chip } from "@mui/material";
import { FaFire, FaSnowflake, FaCloudSun } from "react-icons/fa";
import { FcNeutralTrading } from "react-icons/fc";
import LeadsTableFilters from "./comps/LeadsTableFilters";
import axios from "axios";
import MaterialModal from "../../ui/MaterialModal";
import { capitalizeFirstLetter } from "../../../util/commonFunctions";
import dayjs from "dayjs";
import LeadDetails from "./comps/LeadDetails";

const LeaseLeadRecords = ({
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
  const [selectedLeadItem, setSelectedLeadItem] = useState({});
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Ref to store the current request's abort controller
  const abortControllerRef = useRef(null);
  const NAVBAR_HEIGHT = 80;

  /* Tabs option */
  const DYNAMIC_TABS = [
    { key: TAB_KEYS.Table, title: "Table View" },
    // { key: TAB_KEYS.Tour, title: "Tour Tracking" },
  ];

  const CELL_WIDTH_SIZES = {
    XSmall: "5%",
    Small: "10%",
    Medium: "15%",
    Large: "20%",
  };

  /* Headers */
  const TABLE_HEADERS = [
    {
      accessor: "fullName",
      label: "Name",
      width: CELL_WIDTH_SIZES.Medium,
    },
    {
      accessor: "listingAddress",
      label: "Address",
      width: CELL_WIDTH_SIZES.Medium,
    },
    {
      accessor: "leadSource",
      label: "Lead Source",
      width: CELL_WIDTH_SIZES.Medium,
    },
    {
      reactComponent: true,
      accessor: "status",
      label: "Status",
      render: (item) => (
        <>
          <div
            className={`text-white ${setLeadStatusBgColor(
              item.status
            )} max-w-fit px-2 text-center`}
          >
            {capitalizeFirstLetter(item.status.replace(/([A-Z])/g, " $1"))}
          </div>
        </>
      ),
    },
    {
      accessor: "leadOwner",
      label: "Lead Owner",
      width: CELL_WIDTH_SIZES.Small,
    },
    {
      reactComponent: true,
      accessor: "leadTemperature",
      label: "Temperature",
      render: (item) => (
        <div style={{ minHeight: 32, display: "flex", alignItems: "center" }}>
          {item.leadTemperature ? (
            <Chip
              avatar={setLeadTempIcon(item.leadTemperature)}
              label={capitalizeFirstLetter(item.leadTemperature)}
            />
          ) : (
            // Empty Chip for consistent height/space
            <div style={{ width: 80, height: 32 }} />
          )}
        </div>
      ),
    },
    {
      accessor: "nextActionDate",
      label: "Next Action",
      reactComponent: true,
      width: CELL_WIDTH_SIZES.Small,
      render: (item) => {
        if (!item.nextActionDate) return "";
        const date = dayjs(item.nextActionDate);
        return date.isValid() ? date.format("MM/DD/YYYY") : "";
      },
    },
    {
      accessor: "updateDate",
      label: "Last Update",
      reactComponent: true,
      width: CELL_WIDTH_SIZES.Small,
      render: (item) => {
        if (!item.updateDate) return "";
        const date = dayjs(item.updateDate);
        return date.isValid() ? date.format("MM/DD/YYYY") : "";
      },
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

  const filterListByQuery = useCallback(
    async (filters) => {
      const { search, field, value, startDate, endDate } = filters;

      // Cancel previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller for this request
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

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

        // Add date range parameters for nextActionDate filtering
        if (
          field &&
          field !== settings.filterFields.all &&
          (startDate || endDate)
        ) {
          queryParams.append("field", field);
          if (startDate) {
            queryParams.append("startDate", startDate);
          }
          if (endDate) {
            queryParams.append("endDate", endDate);
          }
        }

        const queryString = queryParams.toString();
        const url = `/api/crm/leaselead${queryString ? `?${queryString}` : ""}`;

        console.log("Making filter request to:", url);

        const response = await axios.get(url, {
          signal: abortController.signal,
        });

        // Only update state if the request wasn't aborted
        if (!abortController.signal.aborted) {
          setUpdatedLeadsList(response.data);
        }
      } catch (err) {
        // Don't show error if request was aborted
        if (err.name === "AbortError") {
          console.log("Request was aborted");
          return;
        } else if (err.name === "CanceledError") {
          // console.error("Request was canceled:", err);
        } else {
          console.error("Failed to filter leads:", err);
        }

        // Fallback to showing all leads if query fails
        setUpdatedLeadsList(initLeadsList);
      }
    },
    [initLeadsList, settings.filterFields.all]
  );

  // Cleanup function to abort pending requests on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const setLeadStatusBgColor = (status) => {
    switch (status) {
      case settings.statusOptions.new:
        return "bg-darkBlue";
      case settings.statusOptions.inProgress:
        return "bg-yellow-500";
      // case settings.statusOptions.tourPending:
      //   return "amber-600";
      // case settings.statusOptions.toured:
      //   return "amber-600";
      case settings.statusOptions.applied:
        return "bg-emerald-500";
      case settings.statusOptions.lost:
        return "bg-red-500";
      default:
        return "";
    }
  };

  const setLeadTempIcon = (leadTemperature) => {
    switch (leadTemperature) {
      case settings.temperatureOptions.neutral:
        return <FcNeutralTrading size={5} />;
      case settings.temperatureOptions.hot:
        return <FaFire size={5} />;
      case settings.temperatureOptions.warm:
        return <FaCloudSun size={5} />;
      case settings.temperatureOptions.cold:
        return <FaSnowflake size={5} />;
      default:
        return "";
    }
  };

  const handleWatchLeadDetails = (leadItem) => {
    setSelectedLeadItem(leadItem);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedLeadItem({});
  };

  const handleRefreshLeadData = async () => {
    // Refresh the main list
    await getLeaseLeadData();

    // If we have a selectedLeadItem, refresh it with the latest data (get a lead by id)
    if (selectedLeadItem && selectedLeadItem._id) {
      try {
        const response = await axios.get(
          `/api/crm/leaselead/${selectedLeadItem._id}`
        );
        if (response.status === 200) {
          setSelectedLeadItem(response.data);
        }
      } catch (err) {
        console.error("Failed to refresh selected lead item:", err);
      }
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
        {tabKey === TAB_KEYS.Table && (
          <>
            <div className="table-top flex flex-row my-4 justify-between items-center">
              <LeadsTableFilters
                filterListByQuery={filterListByQuery}
                settings={settings}
              />
              {/* <div className="add-lead-btn px-2">
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
              </div> */}
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
                focusedOnItem={selectedLeadItem}
                tableWrapperStyle={{
                  height: `calc(75vh - ${isNavbarShown ? NAVBAR_HEIGHT : 0}px)`,
                  overflowY: "auto",
                }}
                _orderBy={"nextActionDate"}
                _order={"desc"}
                handleClickRow={handleWatchLeadDetails}
                tableCellStyle={{ cursor: "pointer" }}
              />
            )}
            {/* Lead Details Modal */}
            <MaterialModal
              isOpen={isDetailsModalOpen}
              onClose={handleCloseDetailsModal}
              title="Lead Details"
              width="90%"
              height="90%"
            >
              <LeadDetails
                selectedLeadItem={selectedLeadItem}
                onLeadUpdated={handleRefreshLeadData}
              />
            </MaterialModal>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  leaseLeads: state.leaseLeads,
});

export default connect(mapStateToProps, { getLeaseLeadData })(LeaseLeadRecords);
