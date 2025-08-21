import { useState } from "react";
import { useDispatch } from "react-redux";
import ConversationView from "../common/ConversationView";
import ConversationList from "../common/ConversationList";
import NewConversationDialog from "../common/NewConversationDialog/NewConversationDialog";
import ConversationActionsModal from "../common/ConversationList/ConversationActionsModal";
import { addNewConversation, deleteConversation } from "../mockData";
import { createSuccessAlert, createErrorAlert } from "../../../../actions/alert";

const SMSManager = () => {
  const dispatch = useDispatch();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isNewConversationDialogOpen, setIsNewConversationDialogOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [modalState, setModalState] = useState({ 
    isOpen: false, 
    type: null, 
    contact: null, 
    conversation: null 
  });

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

  const handleContactInfo = (conversation) => {
    setModalState({ isOpen: true, type: 'contact', contact: conversation, conversation: null });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: null, contact: null, conversation: null });
  };

  const handleDeleteConversation = (conversation) => {
    setModalState({ isOpen: true, type: 'delete', contact: null, conversation: conversation });
  };

  const handleConfirmDelete = (conversation) => {
    try {
      deleteConversation(conversation.id);
      
      // If the deleted conversation was selected, clear the selection
      if (selectedConversation?.id === conversation.id) {
        setSelectedConversation(null);
      }
      
      // Trigger a refresh of the conversation list
      setRefreshTrigger(prev => prev + 1);
      dispatch(createSuccessAlert("Conversation deleted successfully!", "SMSManager"));
    } catch (error) {
      console.error("Error deleting conversation:", error);
      dispatch(createErrorAlert("Failed to delete conversation. Please try again.", "SMSManager"));
    }
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
            onContactInfo={handleContactInfo}
            onDeleteConversation={handleDeleteConversation}
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

      {/* Conversation Actions Modal */}
      <ConversationActionsModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        type={modalState.type}
        contact={modalState.contact}
        conversation={modalState.conversation}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default SMSManager;
