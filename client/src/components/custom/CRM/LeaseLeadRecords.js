import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { connect } from "react-redux";
import Table from "../../core/newTable/_Table";
import Loading from "../../core/LoadingScreen/Loading";
import TailwindTabs from "../Tabs/TailwindTabs";
import { getLeaseLeadData, getAllUsers, getLeaseSMS } from "../../../actions/crm/leaseLeads";
import { Chip, Button, ToggleButton, ToggleButtonGroup, Box, CircularProgress, IconButton } from "@mui/material";
import { FaFire, FaSnowflake, FaCloudSun, FaRegCircle, FaPlus, FaEye, FaCommentDots, FaTrashAlt } from "react-icons/fa";
import LeadsTableFilters from "./comps/LeadsTableFilters";
import axios from "axios";
import MaterialModal from "../../ui/MaterialModal";
import { capitalizeFirstLetter } from "../../../util/commonFunctions";
import dayjs from "dayjs";
import LeadDetails from "./comps/LeadDetails";
import SMSDialog from "../SMS/SMSDialog/SMSDialog";
import SMSManager from "../SMS/SMSManager/SMSManager";
import DeleteLeadDialog from "./comps/DeleteLeadDialog";

const getLeaseLeadIdFromRecord = (record) => {
  if (!record) {
    return null;
  }

  const leaseLead = record.leaseLead ?? record;

  if (typeof leaseLead === "string") {
    return leaseLead;
  }

  if (typeof leaseLead === "object" && leaseLead !== null) {
    return leaseLead._id || leaseLead.id || leaseLead.leaseLeadId || null;
  }

  return null;
};

const inferMessageDirection = (message = {}) => {
  if (message.direction) {
    return message.direction;
  }

  const sentBy = (message.sentBy || "").toLowerCase();
  if (sentBy.includes("lead") || sentBy.includes("tenant")) {
    return "inbound";
  }

  return "outbound";
};

const normalizeDate = (value) => {
  if (!value) {
    return new Date();
  }
  return value instanceof Date ? value : new Date(value);
};

const TAB_KEYS = {
  Table: "table",
  SmsChat: "smsChat",
};

 /* Tabs option */
 const DYNAMIC_TABS = [
  { key: TAB_KEYS.Table, title: "Table View" },
  { key: TAB_KEYS.SmsChat, title: "SMS Chat" },
];

const CELL_WIDTH_SIZES = {
  XSmall: "5%",
  Small: "10%",
  Medium: "15%",
  Large: "20%",
};

const LeaseLeadRecords = ({getLeaseLeadData,getLeaseSMS,leaseLeads: { list, loading, sms },settings,isNavbarShown,}) => {
  const [tabKey, setTabKey] = useState(TAB_KEYS.Table);
  const [initLeadsList, setInitLeadsList] = useState([]);
  const [updatedLeadsList, setUpdatedLeadsList] = useState(initLeadsList);
  const [selectedLeadItem, setSelectedLeadItem] = useState({});
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isModalBeforeClose, setIsModalBeforeClose] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isAddModalBeforeClose, setIsAddModalBeforeClose] = useState(false);
  const [isArchiveMode, setIsArchiveMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [isTableDataLoading, setIsTableDataLoading] = useState(true);
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [activeSmsLead, setActiveSmsLead] = useState(null);
  const [smsState, setSmsState] = useState(sms);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);

  // Ref to store the current request's abort controller
  const abortControllerRef = useRef(null);
  const NAVBAR_HEIGHT = 80;

  useEffect(() => {
    setSmsState(sms);
  }, [sms]);

  const smsData = smsState || sms || { list: [], loading: false };
  const smsLoading = sms?.loading ?? smsData.loading ?? false;

 

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
      width: CELL_WIDTH_SIZES.Small,
    },
    {
      reactComponent: true,
      accessor: "status",
      label: "Status",
      width: CELL_WIDTH_SIZES.Small,
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
      width: CELL_WIDTH_SIZES.Small,
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
    // {
    //   accessor: "updateDate",
    //   label: "Last Update",
    //   reactComponent: true,
    //   width: CELL_WIDTH_SIZES.Small,
    //   render: (item) => {
    //     if (!item.updateDate) return "";
    //     const date = dayjs(item.updateDate);
    //     return date.isValid() ? date.format("MM/DD/YYYY") : "";
    //   },
    // },
    {
      accessor: "createDate",
      label: "Create Date",
      reactComponent: true,
      width: CELL_WIDTH_SIZES.Small,
      render: item => dayjs(item.createDate).format('MM/DD/YYYY')
    },
    {
      accessor: "actions",
      label: "Actions",
      width: CELL_WIDTH_SIZES.XSmall,
      reactComponent: true,
      render: (item) => (
        <div className="flex items-center gap-2">
          <IconButton
            size="small"
            onClick={() => handleWatchLeadDetails(item)}
            aria-label="View lead details"
          >
            <FaEye size={16} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleOpenSmsModal(item)}
            aria-label="Open SMS conversation"
          >
            <FaCommentDots size={16} />
          </IconButton>
          {!isArchiveMode && (
            <IconButton
              size="small"
              onClick={() => handleDeleteLead(item)}
              aria-label="Delete lead"
            >
              <FaTrashAlt size={16} />
            </IconButton>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsTableDataLoading(true);
      await getLeaseLeadData();
      await getLeaseSMS();
      setIsTableDataLoading(false);
    };
    fetchInitialData();
  }, []);

  // Fetch users once when component mounts
  useEffect(() => {
    async function fetchUsers() {
      const data = await getAllUsers()();
      setUsers(data);
    }
    fetchUsers();
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

      // Set loading state
      setIsTableDataLoading(true);

      try {
        let queryParams = new URLSearchParams();
        // Add search parameter if provided
        if (search && search.trim().length > 0) {
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
        const baseUrl = isArchiveMode ? "/api/crm/leaselead/archived" : "/api/crm/leaselead";
        const url = `${baseUrl}${queryString ? `?${queryString}` : ""}`;

        console.log("Making filter request to:", url);
        console.log("Search term:", search);
        console.log("Field:", field);
        console.log("Value:", value);

        const response = await axios.get(url, {
          signal: abortController.signal,
        });

        console.log("Number of results:", response.data.length);

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
      } finally {
        // Clear loading state
        setIsTableDataLoading(false);
      }
    },
    [initLeadsList, settings.filterFields.all, isArchiveMode]
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
      case settings.statusOptions.tourPending:
        return "bg-amber-600";
      case settings.statusOptions.toured:
        return "bg-indigo-500";
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
        return <FaRegCircle size={16} />;
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

  const handleCloseDetailsModal = (checkChanges = true) => {
    if (checkChanges) {
      setIsModalBeforeClose(true);
    } else {
      setIsDetailsModalOpen(false);
      setSelectedLeadItem({});
    }
  };
  // Callback to reset isModalBeforeClose after child handles it
  const handleChildHandledBeforeClose = () => {
    setIsModalBeforeClose(false);
  };

  const handleDeleteLead = async (leadItem) => {
    if (!leadItem?._id) {
      console.warn("Cannot delete lead: no lead ID provided");
      return;
    }

    setLeadToDelete(leadItem);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setLeadToDelete(null);
  };

  const handleOpenSmsModal = (leadItem) => {
    let leadWithoutSms;
    let selectedSmsLead = smsData?.list?.find((item) => item.leaseLead._id === leadItem._id);

    if (!selectedSmsLead) {
      leadWithoutSms = {
        _id: leadItem._id,
        lastMsgDate: new Date().toISOString(),
        leaseLead: leadItem,
        msg: [],
        openDate: new Date().toISOString(),
        primeNum: leadItem.phoneNumbers[0]?.number || "",
        unread: true,
      }
      selectedSmsLead = leadWithoutSms;
    }
    setActiveSmsLead(selectedSmsLead);
    if (sms?.loading) {
      getLeaseSMS();
    }
    setIsSmsModalOpen(true);
  };

  const handleCloseSmsModal = () => {
    setIsSmsModalOpen(false);
    setActiveSmsLead(null);
  };
// Delete Contact from SMS Chat - DEMO ONLY!
  const handleDeleteContact = useCallback(
    async (contact) => {
      if (!contact?.id) {
        console.warn("Cannot delete contact: no contact ID provided");
        return;
      }

      // Update SMS state to remove the deleted contact
      setSmsState((prevSms = {}) => {
        const prevList = Array.isArray(prevSms.list) ? prevSms.list : [];
        const updatedList = prevList.filter(
          (thread) => getLeaseLeadIdFromRecord(thread) !== contact.id
        );

        // If the deleted contact was the active one, clear it
        if (activeSmsLead && getLeaseLeadIdFromRecord(activeSmsLead) === contact.id) {
          setActiveSmsLead(null);
        }

        return {
          ...prevSms,
          list: updatedList,
        };
      });

      console.log("Contact deleted (demo):", contact.id);
    },
    [activeSmsLead]
  );

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

  const handleAddLead = () => {
    // Create a new empty lead object for the form
    const newLead = {
      fullName: "",
      listingAddress: "",
      leadSource: "",
      status: "new",
      leadOwner: "",
      leadTemperature: "",
      nextActionDate: null,
      email: [{ address: "", type: "primary" }],
      phoneNumbers: [{ number: "", type: "primary" }],
      notes: [],
      createDate: new Date(),
      updateDate: new Date(),
      isEnabled: true
    };
    setSelectedLeadItem(newLead);
    setIsAddLeadModalOpen(true);
  };

  const handleCloseAddLeadModal = (checkChanges = true) => {
    if (checkChanges) {
      setIsAddModalBeforeClose(true);
    } else {
      setIsAddLeadModalOpen(false);
      setSelectedLeadItem({});
    }
  };

  // Callback to reset isAddModalBeforeClose after child handles it
  const handleChildHandledAddBeforeClose = () => {
    setIsAddModalBeforeClose(false);
  };

  const handleArchiveModeToggle = async (event, newMode) => {
    // Prevent deselecting all buttons
    if (newMode === null) return;
    
    const newArchiveMode = newMode === 'archive';
    setIsArchiveMode(newArchiveMode);
    
    // Set loading state
    setIsTableDataLoading(true);
    
    // Clear current data and fetch new data based on mode
    setInitLeadsList([]);
    setUpdatedLeadsList([]);
    
    // Fetch data based on the new mode
    if (newArchiveMode) {
      await fetchArchivedLeads();
    } else {
      await getLeaseLeadData();
    }
    
    // Clear loading state
    setIsTableDataLoading(false);
  };

  const fetchArchivedLeads = async () => {
    try {
      const res = await axios.get("/api/crm/leaselead/archived");
      if (res?.data) {
        console.log("Archived leads res: ", res);
        setInitLeadsList(res.data);
        setUpdatedLeadsList(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch archived leads:", err);
    }
  };

  const smsContactsForChat = useMemo(() => {
    return (smsData?.list || []).map((item) => {
      const contactId = getLeaseLeadIdFromRecord(item);
      const leaseLead = item?.leaseLead || {};

      const firstName = leaseLead?.firstName || "";
      const lastName = leaseLead?.lastName || "";
      const name = leaseLead?.fullName || `${firstName} ${lastName}`.trim();

      const phone = leaseLead.phoneNumbers[0]?.number || "";

      const email =
        leaseLead.email[0]?.address || "";

      return {
        id: contactId,
        firstName,
        lastName,
        name,
        phone,
        email,
        avatar: "",
        isActive: true,
        createdAt: normalizeDate(item?.openDate),
      };
    });
  }, [smsData]);

  const smsMessagesForChat = useMemo(() => {
    return (smsData?.list || []).flatMap((thread) => {
      const contactId = getLeaseLeadIdFromRecord(thread);
      if (!contactId) {
        return [];
      }

      return (thread?.msg || []).map((message) => {
        const messageTimestamp = normalizeDate(
          message?.date || message?.createdAt
        );
        const body = message?.body || message?.text || "";
        return {
          id:
            message?._id ||
            message?.id ||
            `${contactId}_${messageTimestamp.getTime()}`,
          contactId,
          body,
          text: body,
          createdAt: messageTimestamp,
          senderId: message?.sentBy || message?.from || message?.senderId || "",
          mediaUrl: message?.mediaUrl || "",
          mediaType: message?.mediaType || "",
          status: message?.status || "sent", // TODO: add status to sms model in the server - IS REQUIRED!
          direction: inferMessageDirection(message), // TODO: add direction to sms model in the server - IS REQUIRED!
        };
      });
    });
  }, [smsData]);

  const activeSmsContact = useMemo(() => {
    const contactId = getLeaseLeadIdFromRecord(activeSmsLead);
    if (!contactId) {
      return null;
    }
//check if the contact is in the smsContactsForChat array
    const existingContact =
      smsContactsForChat.find((contact) => contact.id === contactId) || null;
    if (existingContact) {
      return existingContact;
    }
//if the contact is not in the smsContactsForChat array, use the activeSmsLead to create a new contact
    const fallbackLead = activeSmsLead?.leaseLead || activeSmsLead;
    if (!fallbackLead) {
      return null;
    }

    const firstName = fallbackLead?.firstName || "";
    const lastName = fallbackLead?.lastName || "";
    const nameFromLead = fallbackLead?.fullName || `${firstName} ${lastName}`.trim();
    const fallbackName = nameFromLead || fallbackLead?.companyName || "Unknown Lead";
    const phone =
      fallbackLead?.phoneNumbers?.[0]?.number ||
      "";

    const rawEmail = fallbackLead?.email;
    const email =
      (Array.isArray(rawEmail) ? rawEmail[0]?.address : rawEmail) || "";

    return {
      id: contactId,
      firstName,
      lastName,
      name: fallbackName,
      phone,
      email,
      avatar: "",
      isActive: true,
      createdAt: normalizeDate(activeSmsLead?.openDate || new Date()),
    };
  }, [activeSmsLead, smsContactsForChat]);

  const activeSmsMessages = useMemo(() => {
    const contactId = getLeaseLeadIdFromRecord(activeSmsLead);
    if (!contactId) {
      return [];
    }

    return smsMessagesForChat
      .filter((message) => message.contactId === contactId)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }, [activeSmsLead, smsMessagesForChat]);

  const handleSendSmsMessage = useCallback(
    async (contactId, messagePayload) => {
      console.log("sending sms message", contactId, messagePayload);
      if (!contactId) {
        return null;
      }
// create a new message - DEMO ONLY!
// use server for real messages
      const now = new Date();
      const isoNow = now.toISOString();
      const tempMessageId = `temp_${Date.now()}`;
      const tempMessage = {
        id: tempMessageId,
        contactId,
        body: messagePayload?.text || messagePayload?.body || "",
        text: messagePayload?.text || messagePayload?.body || "",
        createdAt: now,
        date: isoNow,
        senderId: "currentUser",
        direction: "outbound",
        status: "queued",
        mediaUrl: messagePayload?.mediaUrl || "",
        mediaType: messagePayload?.mediaType || "",
      };

      setSmsState((prevSms = {}) => {
        const prevList = Array.isArray(prevSms.list) ? prevSms.list : [];
        const existingThreadIndex = prevList.findIndex(
          (thread) => getLeaseLeadIdFromRecord(thread) === contactId
        );

        let updatedList;
        if (existingThreadIndex >= 0) {
          const existingThread = prevList[existingThreadIndex];
          const updatedThread = {
            ...existingThread,
            msg: [...(existingThread.msg || []), tempMessage],
          };
          updatedList = [
            ...prevList.slice(0, existingThreadIndex),
            updatedThread,
            ...prevList.slice(existingThreadIndex + 1),
          ];
        } else {
          const fallbackLead = activeSmsLead?.leaseLead || activeSmsLead || {};
          const newThread = {
            _id: contactId,
            leaseLead: {
              ...fallbackLead,
              _id: contactId,
            },
            msg: [tempMessage],
            primeNum: fallbackLead?.phoneNumbers?.[0]?.number || "",
            openDate: new Date().toISOString(),
            unread: false,
          };

          updatedList = [...prevList, newThread];
        }

        return {
          ...prevSms,
          list: updatedList,
        };
      });

      return tempMessageId;
    },
    [activeSmsLead]
  );

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
              <div className="flex items-center gap-4">
                <LeadsTableFilters
                  filterListByQuery={filterListByQuery}
                  settings={settings}
                  isArchiveMode={isArchiveMode}
                />
                <Box className="flex items-center">
                  <ToggleButtonGroup
                  color="primary"
                    value={isArchiveMode ? 'archive' : 'active'}
                    exclusive
                    onChange={handleArchiveModeToggle}
                    aria-label="lead view mode"
                    size="small"
                  >
                    <ToggleButton value="active" aria-label="active mode">
                      Active
                    </ToggleButton>
                    <ToggleButton value="archive" aria-label="archive mode">
                      Archive
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </div>
              {!isArchiveMode && (
                <div className="add-lead-btn px-2">
                  <Button
                    color="primary"
                    className="self-end"
                    startIcon={<FaPlus size={"0.8rem"} />}
                    style={{ textTransform: "none" }}
                    onClick={handleAddLead}
                    variant="contained"
                  >
                    Add Lead
                  </Button>
                </div>
              )}
            </div>
            {isTableDataLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "4rem",
                  height: `calc(75vh - ${isNavbarShown ? NAVBAR_HEIGHT : 0}px)`,
                }}
              >
                <CircularProgress size={60} />
              </div>
            ) : updatedLeadsList.length === 0 ? (
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
              />
            )}
            {/* Lead Details Modal For View/Edit Lead */}
            <MaterialModal
              isOpen={isDetailsModalOpen}
              onClose={() => handleCloseDetailsModal(true)}
              title="Lead Details"
              width="100%"
              height="100%"
              
            >
              <LeadDetails
                selectedLeadItem={selectedLeadItem}
                onLeadUpdated={handleRefreshLeadData}
                isParentModalBeforeClose={isModalBeforeClose}
                onCloseConfirm={() => handleCloseDetailsModal(false)}
                onHandledBeforeClose={handleChildHandledBeforeClose}
                users={users}
              />
            </MaterialModal>

            {/* Add A New Lead Modal */}
            <MaterialModal
              isOpen={isAddLeadModalOpen}
              onClose={() => handleCloseAddLeadModal(true)}
              title="Add New Lead"
              width="100%"
              height="100%"
            >
              <LeadDetails
                selectedLeadItem={selectedLeadItem}
                onLeadUpdated={handleRefreshLeadData}
                isParentModalBeforeClose={isAddModalBeforeClose}
                onCloseConfirm={() => handleCloseAddLeadModal(false)}
                onHandledBeforeClose={handleChildHandledAddBeforeClose}
                users={users}
                isCreateMode={true}
              />
            </MaterialModal>
          </>
        )}
        {tabKey === TAB_KEYS.SmsChat && (
          <div
            className="flex min-h-[600px] w-full flex-1"
            style={{
              height: `calc(100vh - ${isNavbarShown ? NAVBAR_HEIGHT : 0}px - 40px)`,
              width: "100%",
            }}
          >
            <SMSManager
              contacts={smsContactsForChat}
              messages={smsMessagesForChat}
              selectedContact={activeSmsContact}
              onSendMessage={handleSendSmsMessage}
              onDeleteContact={handleDeleteContact}
            />
          </div>
        )}
      </div>
      {isSmsModalOpen && !smsLoading && (
        <SMSDialog
          isOpen={isSmsModalOpen}
          onClose={handleCloseSmsModal}
          contact={activeSmsContact}
          messages={activeSmsMessages}
          onSendMessage={handleSendSmsMessage}
        />
      )}
      {isSmsModalOpen && smsLoading && <Loading />}
      
      {/* Delete Lead Dialog */}
      <DeleteLeadDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        leadItem={leadToDelete}
        onDeleteSuccess={getLeaseLeadData}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  leaseLeads: state.leaseLeads,
});

export default connect(mapStateToProps, { getLeaseLeadData, getLeaseSMS })(LeaseLeadRecords);
