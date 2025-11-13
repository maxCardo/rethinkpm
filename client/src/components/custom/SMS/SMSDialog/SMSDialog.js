import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import ConversationView from '../common/ConversationView';
import {
  addNewMessage,
  getContactById,
  getContactsForUI,
  getMessagesForContact,
  updateMessageDeliveryStatus,
} from '../helpers';

const cloneContacts = (items = []) => items.map((item) => ({ ...item }));

const cloneMessages = (items = []) =>
  items.map(({ statusHistory, currentStatus, ...item }) => ({ ...item }));

const SMSDialog = ({
  isOpen,
  onClose,
  contactId,
  contacts = [],
  messages = [],
  onMessageSent,
}) => {
  const [contactsData, setContactsData] = useState(() => cloneContacts(contacts));
  const [messagesData, setMessagesData] = useState(() => cloneMessages(messages));

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

  const contact = useMemo(
    () => (contactId ? getContactById(contactId, contactsData, messagesData) : null),
    [contactId, contactsData, messagesData]
  );

  const conversationMessages = useMemo(
    () => (contactId ? getMessagesForContact(contactId, messagesData) : []),
    [contactId, messagesData]
  );

  const handleSendMessage = useCallback(
    (contactIdParam, messagePayload) => {
      const { contacts: updatedContacts, messages: updatedMessages, messageId } = addNewMessage(
        contactIdParam,
        messagePayload,
        contactsData,
        messagesData
      );

      if (!messageId) {
        return null;
      }

      setContactsData(updatedContacts);
      setMessagesData(updatedMessages);

      const updatedContactUI = getContactById(contactIdParam, updatedContacts, updatedMessages);
      onMessageSent?.(updatedContactUI || null);

      return messageId;
    },
    [contactsData, messagesData, onMessageSent]
  );

  const handleUpdateMessageStatus = useCallback(
    (contactIdParam, messageId, newStatus) => {
      const { messages: updatedMessages } = updateMessageDeliveryStatus(
        contactIdParam,
        messageId,
        newStatus,
        messagesData
      );
      setMessagesData(updatedMessages);

      const updatedContactUI = getContactById(contactIdParam, contactsData, updatedMessages);
      onMessageSent?.(updatedContactUI || null);
    },
    [contactsData, messagesData, onMessageSent]
  );

  const resolvedMessages = useMemo(() => conversationMessages, [conversationMessages]);
  const resolvedContact = useMemo(() => {
    if (contact) {
      return contact;
    }
    if (!contactId) {
      return null;
    }
    return getContactsForUI(contactsData, messagesData).find((c) => c.id === contactId) || null;
  }, [contact, contactId, contactsData, messagesData]);

  const messageCount = resolvedMessages.length;

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            <div className="w-10 h-10 bg-darkBlue rounded-full flex items-center justify-center text-white font-medium">
              {contact ? contact.name.charAt(0).toUpperCase() : '?'}
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {contact ? contact.name : 'Contact'}
              </h3>
              <p className="text-sm text-gray-500">
                {contact ? `${messageCount} message${messageCount === 1 ? '' : 's'}` : 'No messages'}
              </p>
            </div>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        {/* Conversation View */}
        <div className="flex-1 overflow-hidden">
          <ConversationView
            selectedContact={resolvedContact}
            messages={resolvedMessages}
            onSendMessage={handleSendMessage}
            onUpdateMessageStatus={handleUpdateMessageStatus}
            onMessageSent={onMessageSent}
          />
        </div>
      </div>
    </div>
  );
};

export default SMSDialog;
