import React from "react";
import { connect } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import { setActiveProfile } from "../../../../../actions/profile";

const InfiniteList = ({
  data = [],
  hasMore,
  loadingMore,
  loadNextPage,
  settings,
  setActiveProfile,
}) => {
  const moneyFormat = (sum) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(sum);
  };

  return (
    <div className="space-y-4">
      <div
        className="inf-scroll overflow-y-auto max-h-[calc(100vh-18rem)]
 pr-2"
      >
        {data.map((val) => (
          <div
            onClick={() => setActiveProfile(val)}
            key={val._id}
            className="list__picker cursor-pointer border rounded-lg p-4 transition"
          >
            <div className="list__picker-header flex justify-between mb-2">
              <span className="font-medium text-darkBlue">
                {val.firstName} {val.lastName}
              </span>
              <span className="label__gray bg-gray-200 text-darkBlue text-xs px-2 py-1 rounded">
                {val.status}
              </span>
            </div>
            <div className="list__picker-body flex justify-between text-sm text-darkBlue">
              <span>skills status</span>
              <span>{moneyFormat(val.sales)}</span>
            </div>
          </div>
        ))}

        {hasMore && (
          <div className="flex justify-center mt-4">
            <button
              className="infinite-list__load-more bg-blue-500 text-white text-sm px-4 py-2 rounded disabled:opacity-50"
              disabled={loadingMore}
              onClick={loadNextPage}
            >
              {loadingMore ? (
                <ClipLoader size={14} color="#ffffff" loading={true} />
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}
      </div>

      <div className="infinite-list__length-info text-center text-sm text-darkBlue mt-2">
        <p>
          Total of {settings.profileNamePlural}: {data.length}
        </p>
      </div>
    </div>
  );
};

export default connect(null, { setActiveProfile })(InfiniteList);
