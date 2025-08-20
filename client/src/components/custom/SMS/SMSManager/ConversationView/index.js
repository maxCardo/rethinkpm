import { useState, useEffect, useRef } from 'react';
import MessageBubble from "./MessageBubble";
import DateHeader from "./DateHeader";
import MessageInput from "./MessageInput";
import { getMessagesForConversation } from '../dummyData';

const ConversationView = ({ selectedConversation }) => {
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now(),
      text: messageText,
      isSent: true,
      isDelivered: false,
      timestamp: new Date()
    };
    // TODO: Add message to the database
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate delivery after 1 second
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, isDelivered: true }
            : msg
        )
      );
    }, 1000);
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