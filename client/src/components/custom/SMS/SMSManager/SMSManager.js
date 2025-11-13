import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import ConversationView from "../common/ConversationView";
import ConversationList from "../common/ConversationList";
import NewConversationDialog from "../common/NewConversationDialog/NewConversationDialog";
import ConversationActionsModal from "../common/ConversationList/ConversationActionsModal";
import {
  buildNewContactObject,
  addNewMessage,
  deleteContactConversation,
  getContactsForUI,
  getContactById,
  getMessagesForContact,
  markContactMessagesAsRead,
  updateMessageDeliveryStatus,
} from "../helpers";
import { createSuccessAlert, createErrorAlert } from "../../../../actions/alert";

const cloneContacts = (items = []) =>
  items.map((item) => ({ ...item }));

const cloneMessages = (items = []) =>
  items.map(({ statusHistory, currentStatus, ...item }) => ({ ...item }));

const SMSManager = ({
  contacts: contactsProp = [],
  messages: messagesProp = [],
  onCreateContact,
  onContactSelect,
  onContactInfo,
  onDeleteContact,
  onMessageSent,
}) => {
  const dispatch = useDispatch();
  const [contactsData, setContactsData] = useState(() => cloneContacts(contactsProp));
  const [messagesData, setMessagesData] = useState(() => cloneMessages(messagesProp));
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [isNewContactDialogOpen, setIsNewContactDialogOpen] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    contact: null,
  });

  useEffect(() => {
    if (Array.isArray(contactsProp) && contactsProp.length) {
      setContactsData(cloneContacts(contactsProp));
    }
  }, [contactsProp]);

  useEffect(() => {
    if (Array.isArray(messagesProp) && messagesProp.length) {
      setMessagesData(cloneMessages(messagesProp));
    }
  }, [messagesProp]);

  const contactsUI = useMemo(
    () => getContactsForUI(contactsData, messagesData),
    [contactsData, messagesData]
  );

  const selectedContact = useMemo(
    () => contactsUI.find((contact) => contact.id === selectedContactId) || null,
    [contactsUI, selectedContactId]
  );

  const selectedMessages = useMemo(
    () => (selectedContactId ? getMessagesForContact(selectedContactId, messagesData) : []),
    [selectedContactId, messagesData]
  );

  useEffect(() => {
    if (!selectedContactId && contactsUI.length) {
      setSelectedContactId(contactsUI[0].id);
    }
  }, [contactsUI, selectedContactId]);

  const selectContactById = useCallback(
    (contactId, updatedContacts = contactsData, updatedMessages = messagesData) => {
      setSelectedContactId(contactId || null);
      if (onContactSelect) {
        const contactUI = contactId
          ? getContactById(contactId, updatedContacts, updatedMessages)
          : null;
        onContactSelect(contactUI || null);
      }
    },
    [contactsData, messagesData, onContactSelect]
  );

  const handleNewContact = () => {
    setIsNewContactDialogOpen(true);
  };

  const handleCreateContact = (contactData) => {
    try {
      const { contacts: updatedContacts, contact: newContact } = buildNewContactObject(
        contactsData,
        contactData
      );
      setContactsData(updatedContacts);
      selectContactById(newContact.id, updatedContacts, messagesData);
      setIsNewContactDialogOpen(false);
      dispatch(createSuccessAlert("Contact created successfully!", "SMSManager"));
      onCreateContact?.(getContactById(newContact.id, updatedContacts, messagesData));
    } catch (error) {
      console.error("Error creating contact:", error);
      dispatch(createErrorAlert("Failed to create contact. Please try again.", "SMSManager"));
    }
  };

  const handleCloseNewContactDialog = () => {
    setIsNewContactDialogOpen(false);
  };

  const handleSendMessage = useCallback(
    (contactId, messagePayload) => {
      const { contacts: updatedContacts, messages: updatedMessages, messageId } = addNewMessage(
        contactId,
        messagePayload,
        contactsData,
        messagesData
      );

      if (!messageId) {
        return null;
      }

      setContactsData(updatedContacts);
      setMessagesData(updatedMessages);

      const updatedContactUI = getContactById(contactId, updatedContacts, updatedMessages);
      onMessageSent?.(updatedContactUI || null);
      selectContactById(contactId, updatedContacts, updatedMessages);

      return messageId;
    },
    [contactsData, messagesData, onMessageSent, selectContactById]
  );

  const handleUpdateMessageStatus = useCallback(
    (contactId, messageId, newStatus, reason = null) => {
      const { messages: updatedMessages } = updateMessageDeliveryStatus(
        contactId,
        messageId,
        newStatus,
        messagesData,
        reason
      );
      setMessagesData(updatedMessages);
      const updatedContactUI = getContactById(contactId, contactsData, updatedMessages);
      onMessageSent?.(updatedContactUI || null);
    },
    [contactsData, messagesData, onMessageSent]
  );

  const handleContactInfo = (contact) => {
    const detailedContact =
      (contact?.id && getContactById(contact.id, contactsData, messagesData)) || contact;
    onContactInfo?.(detailedContact);
    setModalState({ isOpen: true, type: "contact", contact: detailedContact });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: null, contact: null });
  };

  const handleDeleteContact = (contact) => {
    setModalState({ isOpen: true, type: "delete", contact });
  };

  const handleConfirmDelete = (contact) => {
    try {
      const { contacts: updatedContacts, messages: updatedMessages, removed } =
        deleteContactConversation(contact.id, contactsData, messagesData);

      if (!removed) {
        dispatch(createErrorAlert("Failed to delete contact. Please try again.", "SMSManager"));
        return;
      }

      setContactsData(updatedContacts);
      setMessagesData(updatedMessages);

      if (selectedContactId === contact.id) {
        selectContactById(null, updatedContacts, updatedMessages);
      } else {
        selectContactById(selectedContactId, updatedContacts, updatedMessages);
      }

      dispatch(createSuccessAlert("Contact deleted successfully!", "SMSManager"));
      onDeleteContact?.(contact);
    } catch (error) {
      console.error("Error deleting contact:", error);
      dispatch(createErrorAlert("Failed to delete contact. Please try again.", "SMSManager"));
    }
  };

  const handleContactOpen = useCallback(
    (contact) => {
      if (!contact?.id) {
        selectContactById(null);
        return;
      }

      const { contacts: updatedContacts, messages: updatedMessages } = markContactMessagesAsRead(
        contact.id,
        contactsData,
        messagesData
      );

      setContactsData(updatedContacts);
      setMessagesData(updatedMessages);
      selectContactById(contact.id, updatedContacts, updatedMessages);
    },
    [contactsData, messagesData, selectContactById]
  );

  const handleSelectContact = useCallback(
    (contact) => {
      if (!contact?.id) {
        selectContactById(null);
        return;
      }
      selectContactById(contact.id);
    },
    [selectContactById]
  );

  const handleMessageSent = useCallback(() => {
    if (selectedContactId) {
      const contactUI = getContactById(selectedContactId, contactsData, messagesData);
      onMessageSent?.(contactUI || null);
    }
  }, [contactsData, messagesData, onMessageSent, selectedContactId]);

  return (
    <div className="h-screen">
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <ConversationList 
            contacts={contactsUI}
            onContactSelect={handleSelectContact}
            onContactOpen={handleContactOpen}
            selectedContactId={selectedContactId}
            onNewContact={handleNewContact}
            onContactInfo={handleContactInfo}
            onDeleteContact={handleDeleteContact}
          />
        </div>
        <div className="col-span-8 h-screen">
          <ConversationView 
            selectedContact={selectedContact} 
            messages={selectedMessages}
            onSendMessage={handleSendMessage}
            onUpdateMessageStatus={handleUpdateMessageStatus}
            onMessageSent={handleMessageSent}
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
