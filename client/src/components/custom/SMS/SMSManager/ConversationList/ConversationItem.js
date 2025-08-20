import { IoCheckmarkDone } from 'react-icons/io5';

const ConversationItem = ({ conversation, isActive, onClick }) => {
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

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div 
      className={`flex items-center p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
        isActive ? 'bg-blue-50 border-r-2 border-blue-500' : ''
      }`}
      onClick={() => onClick && onClick(conversation)}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mr-3">
        <div className="w-12 h-12 rounded-full bg-darkBlue flex items-center justify-center text-white font-semibold text-sm">
          {conversation.avatar ? (
            <img 
              src={conversation.avatar} 
              alt={conversation.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            getInitials(conversation.name)
          )}
        </div>
      </div>

      {/* Conversation Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h5 className={`text-sm font-medium truncate ${
            conversation.unreadCount > 0 ? 'font-semibold' : ''
          }`}>
            {conversation.name}
          </h5>
          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
            {formatTime(conversation.lastMessageTime)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <p className={`text-sm truncate ${
            conversation.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
          }`}>
            {conversation.lastMessage}
          </p>
          
          {/* Message Status */}
          <div className="flex items-center ml-2">
            {conversation.unreadCount > 0 ? (
              <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
              </div>
            ) : (
              conversation.isDelivered && (
                <IoCheckmarkDone className="w-4 h-4 text-blue-500" />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
