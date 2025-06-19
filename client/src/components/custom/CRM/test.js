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
import LeasingTableFilters from "./leasingComponents/LeasingTableFilters";

const LeaseTest = ({ getLeaseLeadData, leaseLeads: { list, loading } }) => {
  const TABS_KEY = {
    Table: "table",
    Details: "details",
    Tour: "tour",
  };

  let dummy_list = [
    {
      fullName: "Max Doe",
      email: "max@gmail.com",
      phoneNumbers: ["516-889-0988"],
      listingAddress: "St Loren lef, Abc, Arizona 334234",
      status: "New",
      leadOwner: "Jimmy",
      leadTemperature: "Hot",
      nextAction: "05/12/2025",
      tourDate: "05/13/2025",
    },
    {
      fullName: "Ben Carson",
      email: "carson123@yahoo.com",
      phoneNumbers: ["516-889-1111"],
      listingAddress: "St Timlead, Abc, Florida",
      status: "New",
      leadOwner: "Jimmy",
      leadTemperature: "Warm",
      nextAction: "06/25/2025",
      tourDate: "06/28/2025",
    },
    {
      fullName: "Danny",
      email: "danny-office@gmail.com",
      phoneNumbers: ["516-889-0988"],
      listingAddress: "Blv street name, New York 432234",
      status: "Lost",
      leadOwner: "Marina",
      leadTemperature: "Cold",
      nextAction: "",
      tourDate: "",
    },
  ];

  const [tabKey, setTabKey] = useState(TABS_KEY.Table);
  const [initLeadsList, setInitLeadsList] = useState(dummy_list);
  const [updatedLeadsList, setUpdatedLeadsList] = useState(initLeadsList);
  // const [leadsList, setLeadsList] = useState(dummy_list);

  /* Tabs option */
  const DYNAMIC_TABS = [
    { key: TABS_KEY.Table, title: "Table View" },
    { key: TABS_KEY.Details, title: "Lead Details" },
    { key: TABS_KEY.Tour, title: "Tour Tracking" },
  ];

  /* Lead fileds value types store in one place. Prevents typos and errors */
  const LEAD_FIELDS_VALUE_TYPES = {
    Status: {
      New: "New",
      Lost: "Lost",
    },
    Temp: {
      Hot: "Hot",
      Warm: "Warm",
      Cold: "Cold",
    },
  };

  /* Headers */
  const TABLE_HEADERS = [
    {
      accessor: "fullName",
      label: "Name",
    },
    {
      accessor: "email",
      label: "Email",
    },
    {
      accessor: "phoneNumbers",
      label: "Phone",
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
            label={item.status}
            color={
              item.status === LEAD_FIELDS_VALUE_TYPES.Status.New
                ? "success"
                : "error"
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
          {item.leadTemperature === LEAD_FIELDS_VALUE_TYPES.Temp.Hot && (
            <FaFire color="orangered" size={"1.5rem"} title="hot-lead" />
          )}
          {item.leadTemperature === LEAD_FIELDS_VALUE_TYPES.Temp.Warm && (
            <FaCloudSun color="orange" size={"1.5rem"} title="warm-lead" />
          )}
          {item.leadTemperature === LEAD_FIELDS_VALUE_TYPES.Temp.Cold && (
            <FaSnowflake
              color="lightskyblue"
              size={"1.5rem"}
              title="cold-lead"
            />
          )}
        </>
      ),
    },
    {
      accessor: "nextAction",
      label: "Next Action",
    },
    {
      accessor: "tourDate",
      label: "Tour Date",
    },
    {
      reactComponent: true,
      accessor: "actions",
      label: "Actions",
      align: "center",
      render: () => (
        <div className="flex flex-row w-100 ml-3">
          <FaPencilAlt />
          <FaTrashAlt className="mx-2" />
        </div>
      ),
    },
  ];

  /* List for test */

  useEffect(() => {
    getLeaseLeadData();
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      // setInitLeadsList(list);
    }
  }, [list]);

  const filterListByField = (field, fieldVal) => {
    /* Filter from the inital array */
    const fillteredList = initLeadsList.filter((item) => {
      return item[field] === fieldVal;
    });
    setUpdatedLeadsList(fillteredList);
  };

  const filterListBySearch = (expression) => {
    const searchRegexp = new RegExp(expression);
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
              <LeasingTableFilters
                filterListByField={filterListByField}
                filterListBySearch={filterListBySearch}
              />
              <div className="add-lead-btn px-2">
                <Button
                  color="primary"
                  className="self-end"
                  startIcon={<FaPlus size={"0.8rem"} />}
                  style={{ textTransform: "none" }}
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
