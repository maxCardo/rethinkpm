import React, { useEffect, useRef, useState } from "react";

import IconButton from "../../../core/IconButton/IconButton";
import Loading from "../../../core/LoadingScreen/Loading";
import AddEmailModal from "./AddEmailModal";
import AddPhoneModal from "./AddPhoneModal";
import InfoField from "./infoFields/InfoFields";

const ProfileInfo = ({
  settings: { profileInfo, profileNamePlural },
  profile,
  tglChat,
  tglList,
  tglEdit,
  tglAdd,
}) => {
  const [{ columns, loading }, setColumns] = useState({
    data: null,
    loading: true,
  });

  let profileId = useRef("");
  let profileName = profileNamePlural.slice(0, -1);

  const getPrimaryPhone =
    profile.phoneNumbers && profile.phoneNumbers.find((item) => item.isPrimary);
  const getPrimaryEmail =
    profile.email && profile.email.find((item) => item.isPrimary);
  const primaryPhone = getPrimaryPhone && getPrimaryPhone.number;
  const primaryEmail = getPrimaryEmail && getPrimaryEmail.address;

  useEffect(() => {
    if (profile._id && profileId.current !== profile._id) {
      const columns = { 1: [], 2: [], 3: [] };
      profileInfo.map((attr) => columns[attr.col].push(attr));
      setColumns({ columns: columns, loading: false });
      profileId.current = profile._id;
    }
  }, [profile, profileInfo]);

  const colHeader = [
    "",
    `${profileName} Info`,
    "Profile Info",
    "Communication Info",
  ];

  return loading ? (
    <Loading />
  ) : (
    <div className="w-full px-4 flex flex-col  items-center justify-center  overflow-hidden">
      <div className="flex justify-center">
        {/* <ProfileIcon name={profile.firstName} size={80} /> */}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto mb-2">
        {Object.keys(columns).map((col, index) => (
          <div
            key={index}
            className="flex-1 bg-white rounded-md border border-black shadow-2xs shadow-white"
          >
            <h2 className="text-lg font-semibold p-2 text-gray-800 border-b">
              {colHeader[col]}
            </h2>
            <div className="flex flex-col  pl-4 p-2 w-[350px]">
              {columns[col].map((field, index) => (
                <InfoField
                  key={index}
                  passIndex={index}
                  field={field}
                  data={profile}
                  settings={profileInfo}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center ">
        <IconButton
          placement="top"
          tooltipContent="Open list sidebar"
          id="list-sidebar-tooltip"
          iconClass="fas fa-user-tag"
          variant="action-button"
          fontSize={16}
          onClickFunc={tglList}
        />
        <IconButton
          placement="top"
          tooltipContent="Open chat sidebar"
          id="chat-sidebar-tooltip"
          iconClass="fas fa-comments"
          variant="action-button"
          fontSize={16}
          onClickFunc={tglChat}
        />
        <IconButton
          placement="top"
          tooltipContent={`Call ${profileName}`}
          id="phone-tooltip"
          iconClass="fas fa-phone"
          variant="link"
          fontSize={16}
          href={`tel:${primaryPhone}`}
        />
        <IconButton
          placement="top"
          tooltipContent={`Email ${profileName}`}
          id="email-tooltip"
          iconClass="fas fa-envelope"
          variant="link"
          fontSize={16}
          href={`mailto:${primaryEmail}`}
        />
        <IconButton
          placement="top"
          tooltipContent={`Edit ${profileName}`}
          id="edit-profile-tooltip"
          iconClass="fas fa-cogs"
          btnClass="edit-profile__button"
          variant="action-button"
          fontSize={16}
          onClickFunc={tglEdit}
        />
      </div>

      <AddPhoneModal />
      <AddEmailModal />
    </div>
  );
};

export default ProfileInfo;
