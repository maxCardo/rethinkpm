import React, { useMemo } from 'react';
import { IoClose } from 'react-icons/io5';
import ConversationView from '../common/ConversationView';

const SMSDialog = ({
  isOpen,
  onClose,
  onSendMessage,
  contact = null,
  messages = [],
}) => {
  const resolvedMessages = useMemo(
    () => (Array.isArray(messages) ? messages : []),
    [messages]
  );
  const resolvedContact = contact || null;

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
            onSendMessage={onSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default SMSDialog;
