import React from "react";
import Select from "react-select";

const FilterdToolbar = ({
  checkbox = true,
  dataModel,
  selectedData = [],
  filterActive = () => {},
  showFilterModal = () => {},
  filter = [],
  saveFilter = () => {},
  selected,
  savedFilters = [],
  onChange = () => {},
  clearFilter = () => {},
  bulkActions = [],
}) => {
  const handleFilterChange = (e) => {
    if (!e || !e.value) return;
    const { label, value } = e;
    onChange(dataModel, value, { label, _id: value._id });
  };

  const selectedFilterBar = () => {
    filterActive();
  };

  const numSelected = selectedData.length;

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-white rounded shadow">
      <div className="flex-grow flex items-center gap-4">
        <Select
          className="w-full md:w-64 text-sm"
          onChange={handleFilterChange}
          onFocus={selectedFilterBar}
          onBlur={selectedFilterBar}
          options={savedFilters}
          placeholder="Select Filter"
          value={selected || null}
        />
      </div>

      <div className="flex items-center gap-2 text-sm flex-wrap justify-end">
        {Array.isArray(filter) && filter.length > 0 && (
          <>
            {!selected && (
              <button
                onClick={saveFilter}
                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition"
              >
                Save filter
              </button>
            )}
            <button
              onClick={clearFilter}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-black rounded transition"
            >
              Clear filter
            </button>
          </>
        )}

        {numSelected > 0 ? (
          bulkActions.map((elem, i) => (
            <button
              key={i}
              title={elem.action}
              onClick={() => elem.function(selectedData)}
              className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
            >
              <i className={elem.icon}></i>
            </button>
          ))
        ) : (
          <button
            onClick={() => showFilterModal(true)}
            className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
          >
            <i className="fas fa-filter"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterdToolbar;
