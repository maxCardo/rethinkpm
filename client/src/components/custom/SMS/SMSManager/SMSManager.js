import { useState } from "react";
import { useDispatch } from "react-redux";
import ConversationView from "../common/ConversationView";
import ConversationList from "./ConversationList";
import NewConversationDialog from "./NewConversationDialog/NewConversationDialog";
import { addNewConversation } from "../mockData";
import { createSuccessAlert, createErrorAlert } from "../../../../actions/alert";

const SMSManager = () => {
  const dispatch = useDispatch();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isNewConversationDialogOpen, setIsNewConversationDialogOpen] = useState(false);

  const handleNewConversation = () => {
    setIsNewConversationDialogOpen(true);
  };

  const handleCreateConversation = (conversationData) => {
    try {
      const newConversation = addNewConversation(conversationData);
      setSelectedConversation(newConversation);
      setIsNewConversationDialogOpen(false);
      dispatch(createSuccessAlert("Conversation created successfully!", "SMSManager"));
    } catch (error) {
      console.error("Error creating conversation:", error);
      dispatch(createErrorAlert("Failed to create conversation. Please try again.", "SMSManager"));
    }
  };

  const handleCloseNewConversationDialog = () => {
    setIsNewConversationDialogOpen(false);
  };

  return (
    <div className="h-screen">
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <ConversationList 
            onConversationSelect={setSelectedConversation} 
            selectedConversationId={selectedConversation?.id || null}
            onNewConversation={handleNewConversation}
          />
        </div>
        <div className="col-span-8 h-screen">
          <ConversationView selectedConversation={selectedConversation} />
        </div>
      </div>

      {/* New Conversation Dialog */}
      <NewConversationDialog
        isOpen={isNewConversationDialogOpen}
        onClose={handleCloseNewConversationDialog}
        onCreateConversation={handleCreateConversation}
      />
    </div>
  );
};

export default SMSManager;
