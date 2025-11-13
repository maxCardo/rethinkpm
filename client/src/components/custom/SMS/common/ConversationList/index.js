import { useMemo, useState } from 'react';
import ConversationListHeader from './ConversationListHeader';
import ConversationItem from './ConversationItem';

const ConversationList = ({
  contacts = [],
  onContactSelect,
  onContactOpen,
  selectedContactId,
  onNewContact,
  onContactInfo,
  onDeleteContact,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = useMemo(() => {
    const list = Array.isArray(contacts) ? contacts : [];
    const normalizedTerm = searchTerm.trim().toLowerCase();

    const sortByLastActivity = (a, b) => {
      const aTime = a?.lastMessageTime || a?.lastMsgDate || 0;
      const bTime = b?.lastMessageTime || b?.lastMsgDate || 0;
      return new Date(bTime) - new Date(aTime);
    };

    if (!normalizedTerm) {
      return [...list].sort(sortByLastActivity);
    }

    return list
      .filter((contact) => {
        const name = (contact?.name || '').toLowerCase();
        const lastMessage = (contact?.lastMessage || '').toLowerCase();
        return name.includes(normalizedTerm) || lastMessage.includes(normalizedTerm);
      })
      .sort(sortByLastActivity);
  }, [contacts, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleContactClick = (contact) => {
    if (onContactOpen) {
      onContactOpen(contact);
    }
    if (onContactSelect) {
      onContactSelect(contact);
    }
  };

  const handleNewContact = () => {
    if (onNewContact) {
      onNewContact();
    }
  };

  const handleContactInfo = (contact) => {
    if (onContactInfo) {
      onContactInfo(contact);
    }
  };

  const handleDeleteContact = (contact) => {
    if (onDeleteContact) {
      onDeleteContact(contact);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <ConversationListHeader onSearch={handleSearch} onNewContact={handleNewContact} />

      <div
        className="flex-1 overflow-y-auto min-h-0"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#d1d5db #f3f4f6',
          maxHeight: 'calc(100vh - 80px)',
        }}
      >
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <ConversationItem
              key={contact.id}
              contact={contact}
              isActive={selectedContactId === contact.id}
              onClick={handleContactClick}
              onContactInfo={handleContactInfo}
              onDeleteContact={handleDeleteContact}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <p className="text-lg font-medium mb-2">No contacts found</p>
              <p className="text-sm">
                {searchTerm
                  ? `No results for "${searchTerm}"`
                  : 'Create a new contact to start messaging'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
