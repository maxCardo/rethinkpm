import { useState } from "react";
import { capitalizeFirstLetter } from "../../../../../util/commonFunctions";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@mui/material";
import MaterialModal from "../../../../ui/MaterialModal";

const LeadNotes = ({ selectedLeadItem }) => {
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    setIsAddNoteModalOpen(true);
  };

  const handleSaveNote = () => {
    // Add logic to save the note here
    console.log("New note:", newNote);
    setNewNote("");
    setIsAddNoteModalOpen(false);
  };

  const handleCancelNote = () => {
    setNewNote("");
    setIsAddNoteModalOpen(false);
  };
  return (
    <div className="lead-notes__wrapper flex flex-col h-full">
      {/* Title */}
      <div className="lead-notes__title text-2xl mb-3">Lead Notes</div>
      <div
        className="lead-notes__box h-full w-full border border-gray-600 bg-gray-50 rounded-md p-3 space-y-3 shadow-sm relative "
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
          onClick={handleAddNote}
        >
          <AiOutlinePlus size={500} />
        </button>
      </div>

      {/* Add Note Modal */}
      <MaterialModal
        isOpen={isAddNoteModalOpen}
        onClose={handleCancelNote}
        title="Add New Note"
        width="400px"
        height="auto"
        actions={
          <div className="flex justify-end  gap-2">
            <Button onClick={handleCancelNote} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleSaveNote}
              variant="contained"
              disabled={!newNote.trim()}
            >
              Save Note
            </Button>
          </div>
        }
      >
        <textarea
          rows={4}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter your note here..."
          className="form-control w-full"
          style={{ resize: "vertical", minHeight: "100px" }}
        />
      </MaterialModal>
    </div>
  );
};

export default LeadNotes;
