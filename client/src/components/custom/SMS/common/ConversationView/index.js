import { useEffect, useMemo, useRef } from 'react';
import MessageBubble from "./MessageBubble";
import DateHeader from "./DateHeader";
import MessageInput from "./MessageInput";
// TODO: SHOULD BE 'SYSTEM' ID
const USER_ID = 'user_1';

const ConversationView = ({
  selectedContact,
  messages = [],
  onSendMessage,
  onUpdateMessageStatus,
  onMessageSent,
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
    console.log('[handleSendMessage]: content + file', messageText, file);
    if (!selectedContact?.id || !onSendMessage) {
      return;
    }

    const messagePayload = {
      text: messageText,
      senderId: USER_ID,
      mediaUrl: file ? URL.createObjectURL(file) : "",
      mediaType: file ? getMediaType(file.type) : "",
      initialStatus: 'queued',
    };
console.log('[handleSendMessage]: messagePayload', messagePayload);
    // Await the async sender so we only continue once we have the real message ID (or failure).
    const messageId = await onSendMessage(selectedContact.id, messagePayload);
console.log('[handleSendMessage]: messageId', messageId);

    if (!messageId) {
      return;
    }

    onMessageSent?.(selectedContact);
    scrollToBottom();

    setTimeout(() => {
      onUpdateMessageStatus?.(selectedContact.id, messageId, 'delivered');
      onMessageSent?.(selectedContact);
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

  const messageGroups = useMemo(() => groupMessagesByDate(messages), [messages]);
  // Get sorted date keys (oldest first) - date order
  const sortedDateKeys = useMemo(
    () => Object.keys(messageGroups).sort((a, b) => new Date(a) - new Date(b)),
    [messageGroups]
  );

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