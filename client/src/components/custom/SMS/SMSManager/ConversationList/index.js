import { useState, useMemo } from 'react';
import SearchMsgInput from './SearchMsgInput';
import ConversationItem from './ConversationItem';

const ConversationList = ({ onConversationSelect, selectedConversationId }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample conversation data
  const conversations = [
    {
      id: 1,
      name: "John Smith",
      lastMessage: "Thanks for the update!",
      lastMessageTime: new Date(Date.now() - 300000), // 5 minutes ago
      unreadCount: 2,
      isDelivered: true,
      avatar: null
    },
    {
      id: 2,
      name: "Sarah Johnson",
      lastMessage: "Can we schedule a meeting for tomorrow?",
      lastMessageTime: new Date(Date.now() - 1800000), // 30 minutes ago
      unreadCount: 0,
      isDelivered: true,
      avatar: null
    },
    {
      id: 3,
      name: "Mike Wilson",
      lastMessage: "The project is looking great so far!",
      lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
      unreadCount: 1,
      isDelivered: false,
      avatar: null
    },
    {
      id: 4,
      name: "Emily Davis",
      lastMessage: "I'll send you the files by end of day",
      lastMessageTime: new Date(Date.now() - 86400000), // Yesterday
      unreadCount: 0,
      isDelivered: true,
      avatar: null
    },
    {
      id: 5,
      name: "David Brown",
      lastMessage: "Let's catch up next week",
      lastMessageTime: new Date(Date.now() - 172800000), // 2 days ago
      unreadCount: 0,
      isDelivered: true,
      avatar: null
    },
    {
      id: 6,
      name: "Lisa Anderson",
      lastMessage: "The presentation went really well!",
      lastMessageTime: new Date(Date.now() - 259200000), // 3 days ago
      unreadCount: 0,
      isDelivered: true,
      avatar: null
    }
  ];

  // Filter conversations based on search term
  const filteredConversations = useMemo(() => {
    if (!searchTerm.trim()) {
      return conversations;
    }
    
    return conversations.filter(conversation =>
      conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [conversations, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleConversationClick = (conversation) => {
    if (onConversationSelect) {
      onConversationSelect(conversation);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Search Input */}
      <SearchMsgInput onSearch={handleSearch} />
      
      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={selectedConversationId === conversation.id}
              onClick={handleConversationClick}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <p className="text-lg font-medium mb-2">No conversations found</p>
              <p className="text-sm">
                {searchTerm ? `No results for "${searchTerm}"` : 'Start a new conversation'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;