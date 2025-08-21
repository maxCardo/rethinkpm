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
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleNewConversation = () => {
    setIsNewConversationDialogOpen(true);
  };

  const handleCreateConversation = (conversationData) => {
    try {
      const newConversation = addNewConversation(conversationData);
      setSelectedConversation(newConversation);
      setIsNewConversationDialogOpen(false);
      // Trigger a refresh of the conversation list
      setRefreshTrigger(prev => prev + 1);
      dispatch(createSuccessAlert("Conversation created successfully!", "SMSManager"));
    } catch (error) {
      console.error("Error creating conversation:", error);
      dispatch(createErrorAlert("Failed to create conversation. Please try again.", "SMSManager"));
    }
  };

  const handleCloseNewConversationDialog = () => {
    setIsNewConversationDialogOpen(false);
  };

  const handleMessageSent = () => {
    // Trigger a refresh of the conversation list when a message is sent
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="h-screen">
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <ConversationList 
            onConversationSelect={setSelectedConversation} 
            selectedConversationId={selectedConversation?.id || null}
            onNewConversation={handleNewConversation}
            refreshTrigger={refreshTrigger}
          />
        </div>
        <div className="col-span-8 h-screen">
          <ConversationView 
            selectedConversation={selectedConversation} 
            onMessageSent={handleMessageSent}
          />
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
