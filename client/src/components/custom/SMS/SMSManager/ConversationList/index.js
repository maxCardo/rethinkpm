import { useState, useMemo } from 'react';
import ConversationListHeader from './ConversationListHeader';
import ConversationItem from './ConversationItem';
import { getConversationsForUI, markConversationAsRead } from '../../mockData';

const ConversationList = ({ onConversationSelect, selectedConversationId, onNewConversation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Filter conversations based on search term
  const filteredConversations = useMemo(() => {
    const conversations = getConversationsForUI();
    if (!searchTerm.trim()) {
      return conversations;
    }
    
    return conversations.filter(conversation =>
      conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, refreshTrigger]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleConversationClick = (conversation) => {
    // Mark conversation as read when clicked
    markConversationAsRead(conversation.id);
    
    // Trigger a re-render to update the unread count
    setRefreshTrigger(prev => prev + 1);
    
    if (onConversationSelect) {
      onConversationSelect(conversation);
    }
  };

  const handleNewConversation = () => {
    if (onNewConversation) {
      onNewConversation();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Search Input with New Conversation Button */}
      <ConversationListHeader onSearch={handleSearch} onNewConversation={handleNewConversation} />
      
      {/* Conversations List */}
      <div 
        className="flex-1 overflow-y-auto min-h-0"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#d1d5db #f3f4f6',
          maxHeight: 'calc(100vh - 80px)'
        }}
      >
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