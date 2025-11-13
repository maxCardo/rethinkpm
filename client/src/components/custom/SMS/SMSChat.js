import { useCallback, useEffect, useMemo, useState } from "react";
import ConversationList from "./common/ConversationList";
import ConversationView from "./common/ConversationView";
import NewConversationDialog from "./common/NewConversationDialog/NewConversationDialog";
import ConversationActionsModal from "./common/ConversationList/ConversationActionsModal";
import {
  buildNewContactObject,
  addNewMessage,
  deleteContactConversation,
  getContactById,
  getContactsForUI,
  getMessagesForContact,
  markContactMessagesAsRead,
  updateMessageDeliveryStatus,
} from "./helpers";

const cloneContacts = (items = []) => items.map((item) => ({ ...item }));

const cloneMessages = (items = []) =>
  items.map((item) => ({ ...item }));

const SMSChat = ({
  contacts = [],
  messages = [],
  selectedContact: selectedContactProp = null,
  isMinimalView,
  onInit,
  onCreateContact,
  onContactSelect,
  onContactInfo,
  onDeleteContact,
  onMessageSent,
}) => {
  const [contactsData, setContactsData] = useState(() => cloneContacts(contacts));
  const [messagesData, setMessagesData] = useState(() => cloneMessages(messages));
  const [selectedContact, setSelectedContact] = useState(selectedContactProp);
  const [isNewContactDialogOpen, setIsNewContactDialogOpen] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    contact: null,
  });

  useEffect(() => {
    if (typeof onInit === "function") {
      onInit();
    }
  }, [onInit]);

  useEffect(() => {
    if (Array.isArray(contacts) && contacts.length) {
      setContactsData(cloneContacts(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    if (Array.isArray(messages) && messages.length) {
      setMessagesData(cloneMessages(messages));
    }
  }, [messages]);



  const selectContactById = useCallback(
    (contactId, updatedContacts = contactsData, updatedMessages = messagesData) => {
      setSelectedContact(contactId || null);
      // Update the parent component with the selected contact
      onContactSelect?.(
        contactId ? getContactById(contactId, updatedContacts, updatedMessages) || null : null
      );
    },
    [contactsData, messagesData, onContactSelect]
  );

  const handleNewContact = () => {
    setIsNewContactDialogOpen(true);
  };

  const handleCreateContact = (contactData) => {
    const { contacts: updatedContacts, contact: newContact } = buildNewContactObject(contactsData, contactData);
    setContactsData(updatedContacts);
    setIsNewContactDialogOpen(false);
    selectContactById(newContact.id, updatedContacts, messagesData);
    onCreateContact?.(getContactById(newContact.id, updatedContacts, messagesData));
  };

  const handleCloseNewContactDialog = () => {
    setIsNewContactDialogOpen(false);
  };

  const handleContactInfo = (contact) => {
    const detailedContact =
      (contact?.id && getContactById(contact.id, contactsData, messagesData)) || contact;
    onContactInfo?.(detailedContact);
    setModalState({ isOpen: true, type: "contact", contact: detailedContact });
  };

  const handleDeleteContact = (contact) => {
    setModalState({ isOpen: true, type: "delete", contact });
  };

  const handleConfirmDelete = (contact) => {
    if (!contact) return;
    const { contacts: updatedContacts, messages: updatedMessages, removed } =
      deleteContactConversation(contact.id, contactsData, messagesData);

    if (removed) {
      setContactsData(updatedContacts);
      setMessagesData(updatedMessages);

      const nextContactId = selectedContactId === contact.id ? null : selectedContactId;
      selectContactById(nextContactId, updatedContacts, updatedMessages);

      onDeleteContact?.(contact);
    }

    setModalState({ isOpen: false, type: null, contact: null });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: null, contact: null });
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
    [contactsData, messagesData, selectContactById, isMinimalView]
  );

  const handleSelectContact = useCallback(
    (contact) => {
      if (!contact?.id) {
        selectContactById(null);
        return;
      }
      selectContactById(contact.id);

    },
    [selectContactById, isMinimalView]
  );

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

  const handleMessageSent = useCallback(() => {
    if (!selectedContact._id) return;
    const contactUI = getContactById(selectedContact._id, contactsData, messagesData);
    onMessageSent?.(contactUI || null);
  }, [contactsData, messagesData, onMessageSent, selectedContact._id]);


  const renderFullView = () => (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-4 h-full">
        <ConversationList
          contacts={contactsData}
          onContactSelect={handleSelectContact}
          onContactOpen={handleContactOpen}
          selectedContactId={selectedContact._id}
          onNewContact={handleNewContact}
          onContactInfo={handleContactInfo}
          onDeleteContact={handleDeleteContact}
        />
      </div>
      <div className="col-span-8 h-full">
        <ConversationView
          selectedContact={selectedContact}
          messages={messagesData}
          onSendMessage={handleSendMessage}
          onUpdateMessageStatus={handleUpdateMessageStatus}
          onMessageSent={handleMessageSent}
        />
      </div>
    </div>
  );


  return (
    <div className="h-full">
      {!isMinimalView ? (
        renderFullView()
      ) : (
        <div className="h-full">
          <ConversationView
            selectedContact={selectedContact}
            messages={messagesData}
            onSendMessage={handleSendMessage}
            onUpdateMessageStatus={handleUpdateMessageStatus}
            onMessageSent={handleMessageSent}
          />
        </div>
      )}
      <NewConversationDialog
        isOpen={isNewContactDialogOpen}
        onClose={handleCloseNewContactDialog}
        onCreateContact={handleCreateContact}
      />
      <ConversationActionsModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        type={modalState.type}
        contact={modalState.contact}
        onConfirmDelete={() => handleConfirmDelete(modalState.contact)}
      />
    </div>
  );
};

export default SMSChat;