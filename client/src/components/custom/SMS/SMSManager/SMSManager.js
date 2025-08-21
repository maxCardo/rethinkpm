import { useState } from "react";
import { useDispatch } from "react-redux";
import ConversationView from "../common/ConversationView";
import ConversationList from "./ConversationList";
import NewConversationDialog from "./NewConversationDialog/NewConversationDialog";
import { addNewConversation, deleteConversation } from "../mockData";
import { createSuccessAlert, createErrorAlert } from "../../../../actions/alert";

const SMSManager = () => {
  const dispatch = useDispatch();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isNewConversationDialogOpen, setIsNewConversationDialogOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [contactInfoModal, setContactInfoModal] = useState({ isOpen: false, contact: null });

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
    setContactInfoModal({ isOpen: true, contact: conversation });
  };

  const handleCloseContactInfo = () => {
    setContactInfoModal({ isOpen: false, contact: null });
  };

  const handleDeleteConversation = (conversation) => {
    // TODO: Add a confirmation dialog
    if (window.confirm(`Are you sure you want to delete the conversation with ${conversation.name}? This action cannot be undone.`)) {
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

      {/* Contact Info Modal */}
      {contactInfoModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
              <button
                onClick={handleCloseContactInfo}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-900">{contactInfoModal.contact.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <p className="text-gray-900">{contactInfoModal.contact.phone || 'N/A'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{contactInfoModal.contact.email || 'N/A'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <p className="text-gray-900">{contactInfoModal.contact.notes || 'No notes available'}</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseContactInfo}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SMSManager;
