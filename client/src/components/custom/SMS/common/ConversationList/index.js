import { useMemo, useState } from 'react';
import ConversationListHeader from './ConversationListHeader';
import ConversationItem from './ConversationItem';

const resolveContactId = (contact) => contact?.id ?? null;

const resolveContactName = (contact) => {
  if (!contact) {
    return "";
  }
  if (contact.name?.trim()) {
    return contact.name.trim();
  }
  const nameFromParts = [contact.firstName, contact.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  return nameFromParts || "";
};

const ConversationList = ({
  contacts = [],
  onContactSelect,
  onContactOpen,
  selectedContact,
  onNewContact,
  onContactInfo,
  onDeleteContact,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const activeContactId = useMemo(
    () => resolveContactId(selectedContact),
    [selectedContact]
  );

// Filter the contacts based on the search term
// Sort the contacts by last message time
// Return the filtered and sorted contacts
  const filteredContacts = useMemo(() => {
    const list = Array.isArray(contacts) ? contacts : [];
    const normalizedTerm = searchTerm.trim().toLowerCase();

    const sortByLastActivity = (a, b) => {
      const aTime = a?.lastMessageTime || 0;
      const bTime = b?.lastMessageTime  || 0;
      return new Date(bTime) - new Date(aTime);
    };

    if (!normalizedTerm) {
      return [...list].sort(sortByLastActivity);
    }

    return list
      .filter((contact) => {
        const name = resolveContactName(contact).toLowerCase();
        const lastMessage = (contact?.lastMessage || '').toLowerCase();
        return name.includes(normalizedTerm) || lastMessage.includes(normalizedTerm);
      })
      .sort(sortByLastActivity);
  }, [contacts, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleContactClick = (contact) => {
    // Pass to parent component to handle the contact open action
    if (onContactOpen) {
      onContactOpen(contact);
    }
    // Pass to parent component to handle the selected contact click action
    if (onContactSelect) {
      onContactSelect(contact);
    }
  };

  // Pass to parent component to handle the new contact action
  const handleNewContact = () => {
    if (onNewContact) {
      onNewContact();
    }
  };

// Pass to parent component to handle the contact info action
  const handleContactInfo = (contact) => {
    if (onContactInfo) {
      onContactInfo(contact);
    }
  };

  // Pass to parent component to handle the delete contact action
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
              key={resolveContactId(contact) || resolveContactName(contact)}
              contact={contact}
              isActive={resolveContactId(contact) === activeContactId}
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
