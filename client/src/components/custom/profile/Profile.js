import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { Resizable } from "re-resizable";

import "./style.css";

import { SET_INQUIRIES } from "../../../actions/type";
import {
  loadBackUpProfile,
  loadProfileDefault,
  tglAddLeadMod,
} from "../../../actions/profile";
import ProfileInfo from "./profileInfo/ProfileInfo";
import ProfileList from "./profileList/ProfileList";
import ProfileDetails from "./profileDetails/ProfileDetails";
import ProfileTableView from "./ProfileTableView";
import Chat from "./profileComms/Chat";
import Loading from "../../core/LoadingScreen/Loading";
import BuyerPipeline from "../Marketplace/BuyerPipeline";
import SellerPipeline from "../OffMarket/sellerPipeline";
import AddLeadModal from "./addLead/AddLeadModal";
import TailwindTabs from "../../custom/Tabs/TailwindTabs";

const Profile = ({
  profile: { activeProfile, loading },
  settings,
  loadBackUpProfile,
  loadProfileDefault,
  tglAddLeadMod,
}) => {
  const location = useLocation();
  const { search } = location;

  const profileType = useRef("");
  const [chatWindow, tglChatWindow] = useState(false);
  const [listWindow, tglListWindow] = useState(true);
  const [editWindow, tglEditWindow] = useState(false);
  const [addWindow, tglAddWindow] = useState(false);
  const [tabKey, setTabKey] = useState("details");

  const tglList = () => tglListWindow(!listWindow);
  const tglChat = () => tglChatWindow(!chatWindow);
  const tglEdit = () => tglAddLeadMod(!editWindow);
  const tglAdd = () => tglAddLeadMod(!addWindow);

  useEffect(() => {
    if (
      !activeProfile ||
      !activeProfile._id ||
      (activeProfile.profileType &&
        activeProfile.profileType !== settings.profileType)
    ) {
      const backUpProfile = qs.parse(search).profile;
      backUpProfile
        ? loadBackUpProfile(settings.profileType, backUpProfile)
        : loadProfileDefault(settings.profileType);
    }

    if (settings.profileType && profileType.current !== settings.profileType) {
      profileType.current =
        settings.profileType === "agentPros"
          ? "Agent"
          : settings.profileType === "buyerPros"
          ? "Buyer"
          : settings.profileType === "sellerPros"
          ? "Seller"
          : "Renter";
      setTabKey("details");
    }
  }, [
    settings,
    settings.profileType,
    activeProfile,
    loadBackUpProfile,
    loadProfileDefault,
    search,
  ]);

  const dynamicTabs = [
    { key: "details", title: `${profileType.current} Details` },
    { key: "table", title: "Table View" },
    { key: "filters", title: "Filters" },
  ];

  if (profileType.current === "Buyer") {
    dynamicTabs.push({ key: "manageBuyers", title: "Manage Pipeline" });
  } else if (profileType.current === "Seller") {
    dynamicTabs.push({ key: "manageSeller", title: "Seller Pipeline" });
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="profile__tabs-container">
      <TailwindTabs
        tabs={dynamicTabs}
        activeTab={tabKey}
        setActiveTab={setTabKey}
      />

      <div className="">
        {tabKey === "details" && (
          <div
            className={`agentProfile profile__main-container ${
              listWindow ? "left__sidebar-open" : ""
            } ${chatWindow ? "chat__sidebar-open" : ""}`}
          >
            <div className="profile__left-container">
              <Resizable
                defaultSize={{ height: 400 }}
                style={{ height: 400, display: "flex" }}
                minWidth="100%"
                maxHeight={window.innerHeight * (4 / 6)}
                minHeight="100"
                enable={{
                  top: false,
                  topRight: false,
                  right: false,
                  bottomRight: false,
                  bottom: true,
                  bottomLeft: false,
                  left: false,
                  topLeft: false,
                }}
              >
                <div className="profile__info-container">
                  <ProfileInfo
                    profile={activeProfile}
                    settings={settings}
                    tglChat={tglChat}
                    tglList={tglList}
                    tglEdit={tglEdit}
                    tglAdd={tglAdd}
                  />
                </div>
              </Resizable>

              <div className="profile__logs-container">
                <ProfileDetails
                  settings={settings}
                  activeProfile={activeProfile}
                />
              </div>
            </div>

            <div className="profile__chat-container chat__sidebar">
              <Chat profileType={settings.profileType} />
            </div>

            <div className="sidebar__left profile__agent-leads">
              <ProfileList settings={settings} />
            </div>
          </div>
        )}

        {tabKey === "table" && (
          <ProfileTableView settings={settings} changeTab={setTabKey} />
        )}
        {tabKey === "filters" && <div>Manage Filters</div>}
        {tabKey === "manageBuyers" && profileType.current === "Buyer" && (
          <BuyerPipeline profile={activeProfile} />
        )}
        {tabKey === "manageSeller" && profileType.current === "Seller" && (
          <SellerPipeline profile={activeProfile} />
        )}
      </div>

      <button
        className="action-buttons__button add-profile__button"
        onClick={tglAdd}
      >
        <i className="fas fa-plus"></i> &nbsp;Add {profileType.current}
      </button>

      <AddLeadModal settings={settings} profileName={profileType.current} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  inquiries: state.dashboard.inquiriesRaw,
  agents: state.brokerDashboard,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  setInquiries: (inquiries) =>
    dispatch({ type: SET_INQUIRIES, payload: inquiries }),
});

export default connect(mapStateToProps, {
  ...mapDispatchToProps,
  loadProfileDefault,
  loadBackUpProfile,
  tglAddLeadMod,
})(Profile);
