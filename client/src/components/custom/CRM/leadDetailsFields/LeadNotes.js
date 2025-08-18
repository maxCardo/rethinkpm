import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../../../util/commonFunctions";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@mui/material";
import MaterialModal from "../../../ui/MaterialModal";
import UpdateAlert from "../../../core/Alert";
import { useDispatch } from "react-redux";
import {
  createSuccessAlert,
  createErrorAlert,
} from "../../../../actions/alert";
import axios from "axios";

const LeadNotes = ({ selectedLeadItem, onNoteAdded }) => {
  const dispatch = useDispatch();
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [leadNotesList, setLeadNotesList] = useState([]);
  const [newNote, setNewNote] = useState({ type: "note", content: "" });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setLeadNotesList(selectedLeadItem.notes || []);
  }, [selectedLeadItem.notes]);

  const handleAddNote = () => {
    setIsAddNoteModalOpen(true);
  };

  const handleSaveNote = async () => {
    try {
      setIsSaving(true);
      const response = await axios.patch(
        `/api/crm/leaselead/${selectedLeadItem._id}/notes`,
        {
          content: newNote.content,
          type: "note",
        }
      );

      if (response.status === 200) {
        const updatedLead = response.data;

        console.log("Note added successfully:", updatedLead);
        setLeadNotesList(updatedLead.notes);
        setNewNote({ type: "note", content: "" });
        setIsAddNoteModalOpen(false);
        dispatch(createSuccessAlert("Note added successfully!", "LeadNotes"));
        
        // Notify parent component that a note was added
        if (onNoteAdded) {
          onNoteAdded();
        }

        // Scroll to bottom of notes box
        setTimeout(() => {
          const notesBox = document.querySelector(".lead-notes__box");
          if (notesBox) {
            notesBox.scrollTop = notesBox.scrollHeight - 600;
          }
        }, 100);
      } else {
        console.error("Failed to add note:", response.statusText);
        dispatch(
          createErrorAlert("Failed to add note. Please try again.", "LeadNotes")
        );
      }
    } catch (error) {
      console.error("Error adding note:", error);
      dispatch(
        createErrorAlert("Failed to add note. Please try again.", "LeadNotes")
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelNote = () => {
    setNewNote({ type: "", content: "" });
    setIsAddNoteModalOpen(false);
  };
  return (
    <div
      className="lead-notes__wrapper flex flex-col h-full"
      style={{ maxHeight: "50vh" }}
    >
      {/* Title */}
      <div className="lead-notes__title text-2xl mb-3">Lead Notes</div>
      <div
        className="lead-notes__box h-full w-full border border-gray-600 bg-gray-50 rounded-md p-3 space-y-3 shadow-sm relative "
        style={{ maxHeight: "100%", overflowY: "auto" }}
      >
        {/* List Of Notes */}
        {Array.isArray(leadNotesList) && leadNotesList.length > 0 ? (
          leadNotesList.map((note, idx) => (
            <div
              key={note._id || idx}
              className="p-3 bg-white rounded shadow border border-gray-200 max-w-full overflow-hidden"
            >
              <div className="text-xs text-gray-500 mb-1 flex justify-between">
                <span>
                  {note.type ? capitalizeFirstLetter(note.type) : "Note"}
                </span>
                <span>
                  {note.date ? new Date(note.date).toLocaleString() : ""}
                </span>
              </div>
              <div 
                className="text-gray-800 whitespace-pre-line break-all word-break-all overflow-hidden"
                style={{ 
                  wordBreak: 'break-all', 
                  overflowWrap: 'anywhere', 
                  hyphens: 'auto',
                  maxWidth: '100%'
                }}
              >
                {note.content}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 italic">No notes available.</div>
        )}
        {/* Add Note Button */}
        <button
          className="sticky bottom-0 left-150 bg-green-500 text-white rounded-full p-3 shadow flex items-center justify-center w-12 h-12 z-10"
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
              disabled={!newNote.content.trim() || isSaving}
            >
              {isSaving ? "Saving..." : "Save Note"}
            </Button>
          </div>
        }
      >
        <textarea
          rows={4}
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          placeholder="Enter your note here..."
          className="form-control w-full"
          style={{ resize: "vertical", minHeight: "100px" }}
        />
      </MaterialModal>

      {/* Alert System */}
      <UpdateAlert />
    </div>
  );
};

export default LeadNotes;
