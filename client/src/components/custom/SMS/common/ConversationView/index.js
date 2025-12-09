import { useEffect, useMemo, useRef } from 'react';
import MessageBubble from "./MessageBubble";
import DateHeader from "./DateHeader";
import MessageInput from "./MessageInput";
import { clearPhoneFormatting } from '../../../../../util/commonFunctions';

const ConversationView = ({
  selectedContact,
  messages = [],
  onSendMessage,
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current && messages.length > 0) {
      const container = messagesEndRef.current.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  };

  const handleSendMessage = async (messageText, file = null) => {
    const contactId = selectedContact?.id ?? null;
    if (!contactId || !onSendMessage) {
      return;
    }
  // This payload is sent to the parent component - parent component will send it to the server (after adjusint the data for the server)
    const messagePayload = {
      text: messageText,
      senderId: "",
      mediaUrl: file ? URL.createObjectURL(file) : "",
      mediaType: file ? getMediaType(file.type) : "",
      initialStatus: 'queued',
    };
    // Await the async sender so we only continue once we have the real message ID (or failure).
    await onSendMessage(contactId, messagePayload);
    scrollToBottom();
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
      const date = new Date(message.createdAt);
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
      groups[dateKey].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    });
    
    return groups;
  };

  //Note: Draft Functionality to group messages by days sent as is common with messaging platform. 
    // I edited out (unintntionaly) in my refactor but would like to bring back in future roll outs 
  // const messageGroups = useMemo(() => groupMessagesByDate(messages), [messages]);
  // // Get sorted date keys (oldest first) - date order
  
  
  // const sortedDateKeys = useMemo(
  //   () => Object.keys(messageGroups).sort((a, b) => new Date(a) - new Date(b)),
  //   [messageGroups]
  // );

  // Show placeholder when no contact is selected
  if (!selectedContact) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <h3 className="text-lg font-medium mb-2">Select a contact</h3>
            <p className="text-sm">Choose a contact from the list to start messaging</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto pb-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No messages yet. Start the conversation below.
          </div>
        ) : (
            <div>
              {/* related to note above concerning date grouping above line 82 */}
              {/* <DateHeader date={new Date()} /> */}
              {messages.map((message, index) => (
                <div key={index} className="animate-fadeIn">
                  {console.log('this is the message from convo index: ' , message)}
                  <MessageBubble
                    msgType = 'text' 
                    message={message}
                  />
                </div>
              ))}
            </div>
        )}
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