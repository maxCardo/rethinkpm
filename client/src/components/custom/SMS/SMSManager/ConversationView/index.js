import { useState, useEffect, useRef } from 'react';
import ChatBubble from "./ChatBubble";
import DateHeader from "./DateHeader";
import MessageInput from "./MessageInput";

const ConversationView = () => {
  const messagesEndRef = useRef(null);
  // TODO: Add messages from the database
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, how are feeling today?", isSent: true, isDelivered: true, timestamp: new Date(Date.now() - 60000) },
    { id: 2, text: "I'm feeling better, thank you!", isReceived: true, timestamp: new Date(Date.now() - 30000) },
    
    // Yesterday's messages
    { id: 3, text: "Did you see the new project updates?", isSent: true, isDelivered: true, timestamp: new Date(Date.now() - 86400000 - 3600000) }, // Yesterday at 11 AM
    { id: 4, text: "Yes, I reviewed them this morning", isReceived: true, timestamp: new Date(Date.now() - 86400000 - 1800000) }, // Yesterday at 11:30 AM
    { id: 5, text: "Great! Let's discuss them tomorrow", isSent: true, isDelivered: true, timestamp: new Date(Date.now() - 86400000 - 900000) }, // Yesterday at 11:45 AM
    
    // Day before yesterday
    { id: 6, text: "Happy New Year! 🎉", isReceived: true, timestamp: new Date(Date.now() - 172800000 - 7200000) }, // 2 days ago at 10 AM
    { id: 7, text: "Happy New Year to you too! 🎊", isSent: true, isDelivered: true, timestamp: new Date(Date.now() - 172800000 - 3600000) }, // 2 days ago at 12 PM
    { id: 8, text: "What are your plans for this year?", isReceived: true, timestamp: new Date(Date.now() - 172800000 - 1800000) }, // 2 days ago at 1 PM
    
    // Last week
    { id: 9, text: "Don't forget about the team meeting", isSent: true, isDelivered: true, timestamp: new Date(Date.now() - 604800000 - 3600000) }, // 7 days ago at 2 PM
    { id: 10, text: "Thanks for the reminder!", isReceived: true, timestamp: new Date(Date.now() - 604800000 - 1800000) }, // 7 days ago at 2:30 PM
  ]);
  

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

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto pb-4">
        {sortedDateKeys.map((dateKey) => (
          <div key={dateKey}>
            <DateHeader date={new Date(dateKey)} />
            {messageGroups[dateKey].map((message) => (
              <div key={message.id} className="animate-fadeIn">
                <ChatBubble 
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