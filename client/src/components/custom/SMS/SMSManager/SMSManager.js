import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import ConversationView from "../common/ConversationView";
import ConversationList from "../common/ConversationList";
import NewConversationDialog from "../common/NewConversationDialog/NewConversationDialog";
import ConversationActionsModal from "../common/ConversationList/ConversationActionsModal";
import { getContactsForUI, getContactById, getMessagesForContact } from "../helpers";
import { createSuccessAlert, createErrorAlert } from "../../../../actions/alert";

const SMSManager = ({
  contacts: contactsProp = [],
  messages: messagesProp = [],
  onCreateContact,
  onContactSelect,
  onContactOpen,
  onContactInfo,
  onDeleteContact,
  onSendMessage,
  onMessageSent,
}) => {
  const dispatch = useDispatch();
  const contacts = useMemo(
    () => (Array.isArray(contactsProp) ? contactsProp : []),
    [contactsProp]
  );
  const messages = useMemo(
    () => (Array.isArray(messagesProp) ? messagesProp : []),
    [messagesProp]
  );

  const [selectedContactId, setSelectedContactId] = useState(null);
  const [isNewContactDialogOpen, setIsNewContactDialogOpen] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    contact: null,
  });

  const contactsUI = useMemo(
    () => getContactsForUI(contacts, messages),
    [contacts, messages]
  );

  const selectContactById = useCallback(
    (contactId) => {
      setSelectedContactId(contactId || null);
      if (onContactSelect) {
        const contactUI = contactId ? getContactById(contactId, contacts, messages) : null;
        onContactSelect(contactUI || null);
      }
    },
    [contacts, messages, onContactSelect]
  );

  const selectedContact = useMemo(
    () => contactsUI.find((contact) => contact.id === selectedContactId) || null,
    [contactsUI, selectedContactId]
  );

  const selectedMessages = useMemo(
    () => (selectedContactId ? getMessagesForContact(selectedContactId, messages) : []),
    [selectedContactId, messages]
  );

  useEffect(() => {
    if (contactsUI.length === 0) {
      if (selectedContactId !== null) {
        selectContactById(null);
      }
      return;
    }

    const exists = contactsUI.some((contact) => contact.id === selectedContactId);
    if (!exists) {
      selectContactById(contactsUI[0].id);
    }
  }, [contactsUI, selectedContactId, selectContactById]);

  const handleNewContact = () => {
    setIsNewContactDialogOpen(true);
  };

  const handleCreateContact = async (contactData) => {
    if (!onCreateContact) {
      setIsNewContactDialogOpen(false);
      return;
    }

    try {
      const result = await onCreateContact(contactData);
      setIsNewContactDialogOpen(false);
      dispatch(createSuccessAlert("Contact created successfully!", "SMSManager"));

      const newContactId = result?.id ?? result?.contactId ?? result?.contact?.id ?? null;
      if (newContactId) {
        selectContactById(newContactId);
      }
    } catch (error) {
      console.error("Error creating contact:", error);
      dispatch(createErrorAlert("Failed to create contact. Please try again.", "SMSManager"));
    }
  };

  const handleCloseNewContactDialog = () => {
    setIsNewContactDialogOpen(false);
  };

  const handleSendMessage = useCallback(
    async (contactId, messagePayload) => {
      if (!contactId || !onSendMessage) {
        return null;
      }

      try {
        const result = await onSendMessage(contactId, messagePayload);
        const messageId = result?.messageId ?? result ?? null;

        if (messageId && onMessageSent) {
          onMessageSent(messageId, contactId, result);
        }

        return messageId;
      } catch (error) {
        console.error("Error sending message:", error);
        dispatch(createErrorAlert("Failed to send message. Please try again.", "SMSManager"));
        return null;
      }
    },
    [dispatch, onMessageSent, onSendMessage]
  );

  const handleContactInfo = (contact) => {
    const detailedContact =
      (contact?.id && getContactById(contact.id, contacts, messages)) || contact;
    onContactInfo?.(detailedContact);
    setModalState({ isOpen: true, type: "contact", contact: detailedContact });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: null, contact: null });
  };

  const handleDeleteContact = (contact) => {
    setModalState({ isOpen: true, type: "delete", contact });
  };

  const handleConfirmDelete = async (contact) => {
    try {
      await onDeleteContact?.(contact);
      dispatch(createSuccessAlert("Contact deleted successfully!", "SMSManager"));
    } catch (error) {
      console.error("Error deleting contact:", error);
      dispatch(createErrorAlert("Failed to delete contact. Please try again.", "SMSManager"));
    }
    setModalState({ isOpen: false, type: null, contact: null });
  };

  const handleContactOpen = useCallback(
    async (contact) => {
      if (!contact?.id) {
        selectContactById(null);
        return;
      }

      await onContactOpen?.(contact);
      selectContactById(contact.id);
    },
    [onContactOpen, selectContactById]
  );

  const handleSelectContact = useCallback(
    (contact) => {
      selectContactById(contact?.id ?? null);
    },
    [selectContactById]
  );

  return (
    <div className="flex flex-col h-full max-h-full w-full">
      <div className="grid grid-cols-12 flex-1 overflow-hidden w-full">
        <div className="col-span-4 h-full overflow-hidden">
          <ConversationList 
            contacts={contactsUI}
            onContactSelect={handleSelectContact}
            onContactOpen={handleContactOpen}
            selectedContact={selectedContact}
            onNewContact={handleNewContact}
            onContactInfo={handleContactInfo}
            onDeleteContact={handleDeleteContact}
          />
        </div>
        <div className="col-span-8 h-full overflow-hidden">
          <ConversationView 
            selectedContact={selectedContact} 
            messages={selectedMessages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>

      {/* New Contact Dialog */}
      <NewConversationDialog
        isOpen={isNewContactDialogOpen}
        onClose={handleCloseNewContactDialog}
        onCreateContact={handleCreateContact}
      />

      {/* Conversation Actions Modal */}
      <ConversationActionsModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        type={modalState.type}
        contact={modalState.contact}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default SMSManager;
