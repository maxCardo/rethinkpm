// Table.jsx - Rewritten for simplicity and modern clarity using functional components and hooks
import React, { useMemo, useState } from "react";
import { filterData, getData } from "../../../util/commonFunctions";
import Header from "./Header";
import Pagination from "./Pagination";
import commonMappers from "./commonMappers";
import "./style.css";

const Table = ({
  data = [],
  headers = [],
  pageSize = Infinity,
  filter = "",
  sortBy = null,
  sortDirection = "asc",
  onClickRow = null,
  loading = false,
  className = "",
  fontSize = 12,
}) => {
  const processedHeaders = useMemo(() => {
    return headers.map((header) => ({
      ...header,
      label: header.label || header.accessor,
      sortable: header.reactComponent ? false : true,
    }));
  }, [headers]);

  const [sortState, setSortState] = useState({
    directions: processedHeaders.map((h) =>
      h.accessor === sortBy ? sortDirection : "notSorted"
    ),
    index: sortBy
      ? processedHeaders.findIndex((h) => h.accessor === sortBy)
      : -1,
  });

  const sortedData = useMemo(() => {
    const copied = [...data];
    if (sortState.index === -1) return copied;
    const accessor = processedHeaders[sortState.index].accessor;
    const direction = sortState.directions[sortState.index];
    return copied.sort((a, b) => {
      const aVal = a[accessor];
      const bVal = b[accessor];
      if (aVal === bVal) return 0;
      return direction === "asc"
        ? aVal > bVal
          ? 1
          : -1
        : aVal < bVal
        ? 1
        : -1;
    });
  }, [data, sortState, processedHeaders]);

  const filtered = useMemo(() => {
    return filterData(sortedData, filter, processedHeaders);
  }, [sortedData, filter, processedHeaders]);

  const [pageIndex, setPageIndex] = useState(0);
  const paginated = useMemo(() => {
    return pageSize === Infinity
      ? filtered
      : filtered.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  }, [filtered, pageIndex, pageSize]);

  const handleSort = (index) => {
    const current = sortState.directions[index];
    const next = current === "asc" ? "desc" : "asc";
    const directions = processedHeaders.map(() => "notSorted");
    directions[index] = next;
    setSortState({ index, directions });
    setPageIndex(0);
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div
        className={`w-full h-full overflow-auto rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}
        style={{ fontSize }}
      >
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-800 font-medium sticky top-0 z-10">
            <tr>
              {processedHeaders.map((header, i) => (
                <Header
                  key={`header-${i}`}
                  {...header}
                  handleSort={() => handleSort(i)}
                  sortDirection={sortState.directions[i]}
                  fontSize={fontSize}
                />
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading || paginated.length > 0 ? (
              paginated.map((row, rowIndex) => (
                <tr
                  key={`row-${rowIndex}`}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={onClickRow ? () => onClickRow(row) : undefined}
                >
                  {processedHeaders.map((header, colIndex) => (
                    <td
                      key={`cell-${colIndex}`}
                      className={`px-4 py-2 text-gray-900 whitespace-nowrap ${
                        header.className || ""
                      }`}
                    >
                      {header.mapper
                        ? typeof header.mapper === "string"
                          ? commonMappers(header.mapper)(getData(row, header))
                          : header.mapper(getData(row, header))
                        : getData(row, header)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={processedHeaders.length}
                  className="text-center px-4 py-6 text-gray-500"
                >
                  No results!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data.length > pageSize && (
        <div className="mt-2">
          <Pagination
            actualIndex={pageIndex}
            totalPages={Math.ceil(filtered.length / pageSize)}
            changePage={setPageIndex}
            fontSize={fontSize}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
