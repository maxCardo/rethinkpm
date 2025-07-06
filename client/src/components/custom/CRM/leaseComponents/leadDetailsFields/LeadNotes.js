import { capitalizeFirstLetter } from "../../../../../util/commonFunctions";
import { AiOutlinePlus } from "react-icons/ai";

const LeadNotes = ({ selectedLeadItem }) => {
  return (
    <>
      {/* Title */}
      <div className="lead-notes_title text-2xl mb-3">Lead Notes</div>
      <div
        className="lead-notes_box h-full w-full border border-gray-600 bg-gray-50 rounded-md p-3 space-y-3 shadow-sm relative"
        style={{ maxHeight: "100%", overflowY: "auto" }}
      >
        {/* List Of Notes */}
        {Array.isArray(selectedLeadItem.notes) &&
        selectedLeadItem.notes.length > 0 ? (
          selectedLeadItem.notes.map((note, idx) => (
            <div
              key={note._id || idx}
              className="p-3 bg-white rounded shadow border border-gray-200"
            >
              <div className="text-xs text-gray-500 mb-1 flex justify-between">
                <span>
                  {note.type ? capitalizeFirstLetter(note.type) : "Note"}
                </span>
                <span>
                  {note.date ? new Date(note.date).toLocaleString() : ""}
                </span>
              </div>
              <div className="text-gray-800 whitespace-pre-line">
                {note.content}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 italic">No notes available.</div>
        )}
        {/* Add Note Button */}
        <button
          className="absolute bottom-3 right-5 bg-green-500 text-white rounded-full p-3 shadow flex items-center justify-center w-12 h-12"
          style={{ borderRadius: "9999px" }}
          title="Add Note"
        >
          <AiOutlinePlus size={500} />
        </button>
      </div>
    </>
  );
};

export default LeadNotes;
