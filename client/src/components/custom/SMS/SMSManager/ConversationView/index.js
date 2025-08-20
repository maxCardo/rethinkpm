import { useState, useEffect, useRef } from 'react';
import ChatBubble from "./ChatBubble";
import DateHeader from "./DateHeader";
import MessageInput from "./MessageInput";

const ConversationView = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, how are you?", isSent: true, isDelivered: true, timestamp: new Date(Date.now() - 60000) },
    { id: 2, text: "I'm good, thank you!", isReceived: true, timestamp: new Date(Date.now() - 30000) }
  ]);
  
  const messagesEndRef = useRef(null);

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

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto pb-4">
        <DateHeader date={new Date()} />
        {messages.map((message) => (
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