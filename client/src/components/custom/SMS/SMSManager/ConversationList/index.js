import { useState, useMemo } from 'react';
import SearchMsgInput from './SearchMsgInput';
import ConversationItem from './ConversationItem';
import { conversations } from '../dummyData';

const ConversationList = ({ onConversationSelect, selectedConversationId }) => {
  const [searchTerm, setSearchTerm] = useState('');

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