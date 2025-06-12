import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";

import {
  loadMoreDataProfileList,
  loadProfileList,
  loadSavedFilter,
  setFilter,
} from "../../../../actions/profile";
import IconButton from "../../../core/IconButton/IconButton";
import Loading from "../../../core/LoadingScreen/Loading";
import FilteredList from "./filteredList/FilteredList";
import FilterModal from "./modals/filterModel/FilterModal";
import SaveFilterMod from "./modals/saveFilterMod";

const ProfileList = ({
  profileList,
  settings,
  activeFilter,
  isFiltered,
  loadProfileList,
  loadSavedFilter,
  loadMoreDataProfileList,
  setFilter,
}) => {
  const {
    profileType,
    statusSelect: { options, selected, selectedQuery },
  } = settings;

  const [selectStatus, setSelectStatus] = useState({ options, selected });
  const [showFilterModal, toggleFilterModal] = useState(false);
  const [showSaveFilterModal, toggleSaveFilterModal] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [listPage, setListPage] = useState(0);
  const [audiences, setAudiences] = useState([]);
  const [savedFilters, setSavedFilters] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/profile/${profileType}/audiences`)
      .then((res) => setAudiences(res.data));
    axios
      .get(`/api/profile/${profileType}/filters`)
      .then((res) => setSavedFilters(res.data));
  }, [profileType]);

  useEffect(() => {
    loadProfileList(profileType, selectedQuery);
  }, [profileType, selectedQuery, loadProfileList]);

  useEffect(() => {
    if (savedFilters.length || audiences.length) {
      const updatedOptions = [
        { label: "", options: options.slice() },
        {
          label: "Audience",
          options: audiences.map((a) => ({
            value: a._id,
            label: a.name,
            filter: true,
            filterType: "audience",
          })),
        },
        {
          label: "Filters",
          options: savedFilters.map((f) => ({
            value: f._id,
            label: f.name,
            filter: true,
            filterType: "filter",
          })),
        },
      ];
      setSelectStatus((prev) => ({ ...prev, options: updatedOptions }));
    }
  }, [audiences, savedFilters, options]);

  const handleStatusChange = (selectedOption) => {
    if (selectedOption.filter) {
      loadSavedFilter(
        selectedOption.value,
        profileType,
        selectedOption.filterType
      );
    } else {
      loadProfileList(profileType, selectedOption.value);
    }
    setSelectStatus({ ...selectStatus, selected: selectedOption });
  };

  const clearFilter = () => {
    const cleared = {
      status: {
        accessor: "status",
        dataType: "array",
        name: "status",
        type: { value: "in", operator: "$in" },
        value: selectedQuery,
      },
    };
    setFilter(cleared, false);
    loadProfileList(profileType, selectedQuery);
  };

  const loadNextPage = () => {
    loadMoreDataProfileList(
      profileType,
      selectStatus.selected.value,
      listPage + 1
    );
    setListPage((prev) => prev + 1);
  };

  if (profileList.loading) return <Loading />;

  return (
    <div className="space-y-4">
      <Select
        className="agentStatusFilter"
        onChange={handleStatusChange}
        options={selectStatus.options}
        placeholder="Select Status"
        value={selectStatus.selected}
      />

      <div className="profile-list__search-container">
        <input
          className="form-control profile-list__search-input"
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search"
        />
        <IconButton
          placement="bottom"
          tooltipContent="Create filter"
          iconClass="fas fa-filter"
          btnClass="profile-list__filter-icon"
          variant="clean"
          fontSize={22}
          onClickFunc={() => toggleFilterModal(true)}
        />
      </div>

      {isFiltered && (
        <div className="">
          <button onClick={clearFilter}>Clear filter</button>
          <button onClick={() => toggleSaveFilterModal(true)}>
            Save filter
          </button>
        </div>
      )}

      <FilteredList
        data={profileList.list}
        searchString={searchString}
        loadNextPage={loadNextPage}
        loadingMore={profileList.loadingMore}
        hasMore={profileList.hasMore}
        settings={settings}
      />

      <FilterModal
        show={showFilterModal}
        handleClose={() => toggleFilterModal(false)}
        settings={settings}
      />
      <SaveFilterMod
        show={showSaveFilterModal}
        handleClose={() => toggleSaveFilterModal(false)}
        activeFilter={activeFilter}
        profileList={profileList}
        profileType={profileType}
      />
    </div>
  );
};

ProfileList.propTypes = {
  profileList: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profileList: state.profile.profileList,
  activeFilter: state.profile.activeFilter,
  isFiltered: state.profile.isFiltered,
});

export default connect(mapStateToProps, {
  loadProfileList,
  loadSavedFilter,
  loadMoreDataProfileList,
  setFilter,
})(ProfileList);
