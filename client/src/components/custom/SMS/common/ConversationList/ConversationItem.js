import { IoCheckmarkDone } from 'react-icons/io5';
import { IoEllipsisVertical } from 'react-icons/io5';
import { IoPerson, IoTrash } from 'react-icons/io5';
import { useState, useEffect, useRef } from 'react';

const getContactDisplayName = (contact) => {
  if (!contact) {
    return '';
  }
  if (contact.name?.trim()) {
    return contact.name.trim();
  }
  const nameFromParts = [contact.firstName, contact.lastName]
    .filter(Boolean)
    .join(' ')
    .trim();
  return nameFromParts || '';
};

const getInitials = (contact) => {
  const baseName = getContactDisplayName(contact);
  return baseName
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const ConversationItem = ({ contact, isActive, onClick, onContactInfo, onDeleteContact }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const displayName = getContactDisplayName(contact);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    // Calculate the difference in hours from now (timestamp)
    const diffInHours = (now - date) / (1000 * 60 * 60);

    // If the difference is less than 24 hours, return the time (in 12 hour format)
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 48) {
      // If the difference is less than 48 hours, return "Yesterday"
      return 'Yesterday';
    } else {
      // If the difference is more than 48 hours, return the date (in month and day format)
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  // Handle clicking outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleContactInfo = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    // Pass to parent component to handle the contact info action
    if (onContactInfo) {
      onContactInfo(contact);
    }
  };

  const handleDeleteContact = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    // Pass to parent component to handle the delete contact action
    if (onDeleteContact) {
      onDeleteContact(contact);
    }
  };

  const handleItemClick = () => {
    setShowMenu(false);
    // Pass to parent component to handle the item click action
    if (onClick) {
      onClick(contact);
    }
  };

  return (
    <div 
      ref={menuRef}
      className={`flex items-center p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 relative ${
        isActive ? 'bg-blue-50 border-r-2 border-blue-500' : ''
      }`}
      onClick={handleItemClick}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mr-3">
        <div className="w-12 h-12 rounded-full bg-darkBlue flex items-center justify-center text-white font-semibold text-sm">
          {contact.avatar ? (
            <img
              src={contact.avatar}
              alt={displayName || 'Contact avatar'}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            getInitials(contact)
          )}
        </div>
      </div>

      {/* Contact Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h5 className={`text-sm font-medium truncate ${
            contact.unreadCount > 0 ? 'font-semibold' : ''
          }`}>
            {displayName || 'Unknown Contact'}
          </h5>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 flex-shrink-0 mr-2">
              {formatTime(contact.lastMessageTime)}
            </span>
            {/* Menu Button */}
            <button
              onClick={handleMenuToggle}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <IoEllipsisVertical className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p
            className={`text-sm truncate ${
              contact.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
            }`}
          >
            {contact.lastMessage && contact.lastMessage.trim()
              ? contact.lastMessage
              : contact.lastMediaType === 'image'
              ? '📷 Image'
              : contact.lastMediaType === 'video'
              ? '🎬 Video'
              : contact.lastMediaType === 'audio'
              ? '🎧 Audio'
              : contact.lastMediaType === 'document'
              ? '📄 Document'
              : 'No messages yet'}
          </p>
          
          {/* Message Status */}
          <div className="flex items-center ml-2">
            {contact.unreadCount > 0 ? (
              <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {contact.unreadCount > 99 ? '99+' : contact.unreadCount}
              </div>
            ) : (
              contact.isDelivered && contact.isLastMessageFromUser && (
                <IoCheckmarkDone className="w-4 h-4 text-blue-500" />
              )
            )}
          </div>
        </div>
      </div>

      {/* Menu Dropdown */}
      {showMenu && (
        <div className="absolute right-2 top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
          <div className="py-1">
            <button
              onClick={handleContactInfo}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <IoPerson className="w-4 h-4 mr-3 text-gray-500" />
              Contact Info
            </button>
            <button
              onClick={handleDeleteContact}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <IoTrash className="w-4 h-4 mr-3 text-red-500" />
              Delete Contact
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationItem;
