import { useState, useEffect, useRef } from 'react';
import MessageBubble from "./MessageBubble";
import DateHeader from "./DateHeader";
import MessageInput from "./MessageInput";
import { getMessagesForConversation, addNewMessage, updateMessageDeliveryStatus } from '../../mockData';

const ConversationView = ({ selectedConversation, onMessageSent }) => {
  const messagesEndRef = useRef(null);
  
  // Get messages for the selected conversation
  const [messages, setMessages] = useState(() => {
    return selectedConversation?.id ? getMessagesForConversation(selectedConversation.id) : [];
  });

  // Update messages when conversation changes
  useEffect(() => {
    if (selectedConversation?.id) {
      setMessages(getMessagesForConversation(selectedConversation.id));
    } else {
      setMessages([]);
    }
  }, [selectedConversation]);

  const scrollToBottom = () => {
    // scroll to the bottom of the messages container if there are messages
    if (messagesEndRef.current && messages.length > 0) {
      const messagesContainer = messagesEndRef.current.parentElement;
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    // Only scroll to bottom if there are messages
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = (messageText, file = null) => {
    const newMessage = {
      text: messageText,
      senderType: 'user',
      senderId: 'user_1',
      direction: 'outbound',
      initialStatus: 'queued',
      mediaUrl: file ? URL.createObjectURL(file) : null,
      mediaType: file ? getMediaType(file.type) : null
    };
    
    // Add message to the database and get the message ID
    const messageId = addNewMessage(selectedConversation.id, newMessage);
    
    // Update local state
    setMessages(getMessagesForConversation(selectedConversation.id));
    
    // Notify parent component to refresh conversation list
    if (onMessageSent) {
      onMessageSent();
    }
    
    // Simulate delivery after 1 second
    setTimeout(() => {
      updateMessageDeliveryStatus(selectedConversation.id, messageId, 'delivered');
      setMessages(getMessagesForConversation(selectedConversation.id));
      
      // Notify parent component again after delivery status update
      if (onMessageSent) {
        onMessageSent();
      }
    }, 1000);
  };

  const getMediaType = (mimeType) => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    return 'document';
  };

  // Group messages by date and sort everything
  const groupMessagesByDate = (messages) => {
    const groups = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp);
      const dateKey = date.toDateString(); // e.g., "Mon Jan 15 2024"

      // Create a new group if it doesn't exist
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      // Add the message to the group
      groups[dateKey].push(message);
    });
    
    // Sort messages within each group by timestamp (oldest first) - time order
    Object.keys(groups).forEach(dateKey => {
      groups[dateKey].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    });
    
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);
  // Get sorted date keys (oldest first) - date order
  const sortedDateKeys = Object.keys(messageGroups).sort((a, b) => new Date(a) - new Date(b));

  // Show placeholder when no conversation is selected
  if (!selectedConversation) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
            <p className="text-sm">Choose a conversation from the list to start messaging</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto pb-4">
        {sortedDateKeys.map((dateKey) => (
          <div key={dateKey}>
            <DateHeader date={new Date(dateKey)} />
            {messageGroups[dateKey].map((message) => (
              <div key={message.id} className="animate-fadeIn">
                <MessageBubble 
                  message={message.text}
                  isSent={message.isSent}
                  isReceived={message.isReceived}
                  isDelivered={message.isDelivered}
                  timestamp={message.timestamp}
                  mediaUrl={message.mediaUrl}
                  mediaType={message.mediaType}
                />
              </div>
            ))}
          </div>
        ))}
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input - Fixed at bottom */}
      <div className="flex-shrink-0">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ConversationView;