import React, { useMemo, useState } from 'react';
import SMSDialog from './SMSDialog';
import { contacts as mockContacts, smsMessages as mockMessages } from '../mockData';
import { getContactsForUI, getMessagesForContact } from '../helpers';

const SMSDialogDemo = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const handleOpenDialog = (contactId) => {
    setSelectedContactId(contactId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedContactId(null);
  };

  const contacts = useMemo(() => getContactsForUI(mockContacts, mockMessages), []);
  const messages = selectedContactId ? getMessagesForContact(selectedContactId, mockMessages) : [];

  const handleMessageSent = (contact) => {
    console.log('[handleMessageSent in SMSDialogDemo]: contact', contact);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">SMS Dialog Demo</h2>
      
      {/* Contact Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => handleOpenDialog(contact.id)}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-darkBlue rounded-full flex items-center justify-center text-white font-medium">
                {contact.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.lastMessage}</p>
                {contact.unreadCount > 0 && (
                  <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                    {contact.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">How to use SMSDialog:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Click on any contact above to open the SMS dialog</li>
          <li>• The dialog shows the contact message view without the contact list</li>
          <li>• You can send new messages and see the message history</li>
          <li>• Click the X button or outside the dialog to close it</li>
        </ul>
      </div>

      {/* SMS Dialog */}
      <SMSDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        contactId={selectedContactId}
        contacts={mockContacts}
        messages={mockMessages}
        onMessageSent={handleMessageSent}
      />
    </div>
  );
};

export default SMSDialogDemo;
