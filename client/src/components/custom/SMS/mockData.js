// For testing purposes only! 
// remove this file when real data is added

// Mock data structure matching the updated schema
export let contacts = [
  {
    id: "contact_1",
    name: "John Smith",
    relatedEntity: {
      type: "lease_leads",
      id: "lease_lead_1"
    },
    phoneNumber: "1234567890",
    email: "john.smith@example.com",
    notes: "Notes about John Smith",
    conversations: [
      {
        id: "conv_1",
        userId: "user_1", // reference to user from users table
        lastMessage: "Thanks for the update!",
        lastMessageTime: new Date(Date.now() - 300000), // 5 minutes ago
        lastMessageId: "msg_1_3", // reference to last message
        unreadCount: 0, // will be computed
        isActive: true,
        createDate: new Date(Date.now() - 86400000), // 1 day ago
        updateDate: new Date(Date.now() - 300000),
      }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 86400000),
    updateDate: new Date(Date.now() - 300000),
  },
  {
    id: "contact_2",
    name: "Sarah Johnson",
    relatedEntity: {
      type: "service",
      id: "service_1"
    },
    phoneNumber: "1234567891",
    email: "sarah.johnson@example.com",
    notes: "Notes about Sarah Johnson",
    conversations: [
      {
        id: "conv_2",
        userId: "user_1",
        lastMessage: "Can we schedule a meeting for tomorrow?",
        lastMessageTime: new Date(Date.now() - 1800000), // 30 minutes ago
        lastMessageId: "msg_2_4", // reference to last message
        unreadCount: 0, // will be computed
        isActive: true,
        createDate: new Date(Date.now() - 172800000), // 2 days ago
        updateDate: new Date(Date.now() - 1800000),
      }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 172800000),
    updateDate: new Date(Date.now() - 1800000),
  },
  {
    id: "contact_3",
    name: "Mike Wilson",
    relatedEntity: {
      type: "marketplace",
      id: "marketplace_1"
    },
    phoneNumber: "1234567892",
    email: "mike.wilson@example.com",
    notes: "Notes about Mike Wilson",
    conversations: [
      {
        id: "conv_3",
        userId: "user_1",
        lastMessage: "The project is looking great so far!",
        lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
        lastMessageId: "msg_3_3", // reference to last message
        unreadCount: 2, // will be computed
        isActive: true,
        createDate: new Date(Date.now() - 259200000), // 3 days ago
        updateDate: new Date(Date.now() - 3600000),
      }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 259200000),
    updateDate: new Date(Date.now() - 3600000),
  },
  {
    id: "contact_4",
    name: "Emily Davis",
    relatedEntity: {
      type: "off_market",
      id: "off_market_1"
    },
    phoneNumber: "1234567893",
    email: "emily.davis@example.com",
    notes: "Notes about Emily Davis",
    conversations: [
      {
        id: "conv_4",
        userId: "user_1",
        lastMessage: "I'll send you the files by end of day",
        lastMessageTime: new Date(Date.now() - 86400000), // Yesterday
        lastMessageId: "msg_4_1", // reference to last message
        unreadCount: 0, // will be computed
        isActive: true,
        createDate: new Date(Date.now() - 345600000), // 4 days ago
        updateDate: new Date(Date.now() - 86400000),
      }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 345600000),
    updateDate: new Date(Date.now() - 86400000),
  },
  {
    id: "contact_5",
    name: "David Brown",
    relatedEntity: {
      type: "lease_leads",
      id: "lease_lead_2"
    },
    phoneNumber: "1234567894",
    email: "david.brown@example.com",
    notes: "Notes about David Brown",
    conversations: [
      {
        id: "conv_5",
        userId: "user_1",
        lastMessage: "Let's catch up next week",
        lastMessageTime: new Date(Date.now() - 172800000), // 2 days ago
        lastMessageId: "msg_5_1", // reference to last message
        unreadCount: 0, // will be computed
        isActive: true,
        createDate: new Date(Date.now() - 432000000), // 5 days ago
        updateDate: new Date(Date.now() - 172800000),
      }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 432000000),
    updateDate: new Date(Date.now() - 172800000),
  },
  {
    id: "contact_6",
    name: "Lisa Anderson",
    relatedEntity: {
      type: "service",
      id: "service_2"
    },
    phoneNumber: "1234567895",
    email: "lisa.anderson@example.com",
    notes: "Notes about Lisa Anderson",
    conversations: [
      {
        id: "conv_6",
        userId: "user_1",
        lastMessage: "The presentation went really well!",
        lastMessageTime: new Date(Date.now() - 259200000), // 3 days ago
        lastMessageId: "msg_6_1", // reference to last message
        unreadCount: 0, // will be computed
        isActive: true,
        createDate: new Date(Date.now() - 518400000), // 6 days ago
        updateDate: new Date(Date.now() - 259200000),
      }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 518400000),
    updateDate: new Date(Date.now() - 259200000),
  }
];

export let smsMessages = [
  // Messages for conversation 1
  {
    id: "msg_1_1",
    conversationId: "conv_1",
    senderType: "user",
    senderId: "user_1",
    body: "Hello, how are you?",
    mediaUrl: null,
    mediaType: null,
    direction: "outbound",
    currentStatus: "delivered",
    statusHistory: [
      { status: "queued", at: new Date(Date.now() - 300000), reason: null },
      { status: "sent", at: new Date(Date.now() - 299500), reason: null },
      { status: "delivered", at: new Date(Date.now() - 299000), reason: null }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 300000),
    updateDate: new Date(Date.now() - 299000),
  },
  {
    id: "msg_1_2",
    conversationId: "conv_1",
    senderType: "contact",
    senderId: "contact_1",
    body: "I'm good, thank you!",
    mediaUrl: null,
    mediaType: null,
    direction: "inbound",
    currentStatus: "delivered",
    statusHistory: [
      { status: "delivered", at: new Date(Date.now() - 300000), reason: null }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 300000),
    updateDate: new Date(Date.now() - 300000),
  },
  {
    id: "msg_1_3",
    conversationId: "conv_1",
    senderType: "user",
    senderId: "user_1",
    body: "Thanks for the update!",
    mediaUrl: null,
    mediaType: null,
    direction: "outbound",
    currentStatus: "delivered",
    statusHistory: [
      { status: "queued", at: new Date(Date.now() - 300000), reason: null },
      { status: "sent", at: new Date(Date.now() - 299500), reason: null },
      { status: "delivered", at: new Date(Date.now() - 299000), reason: null }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 300000),
    updateDate: new Date(Date.now() - 299000),
  },

  // Messages for conversation 2
  {
    id: "msg_2_1",
    conversationId: "conv_2",
    senderType: "user",
    senderId: "user_1",
    body: "Remember to buy the groceries",
    mediaUrl: null,
    mediaType: null,
    direction: "outbound",
    currentStatus: "delivered",
    statusHistory: [
      { status: "queued", at: new Date(Date.now() - 1800000), reason: null },
      { status: "sent", at: new Date(Date.now() - 1799500), reason: null },
      { status: "delivered", at: new Date(Date.now() - 1799000), reason: null }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 1800000),
    updateDate: new Date(Date.now() - 1799000),
  },
  {
    id: "msg_2_2",
    conversationId: "conv_2",
    senderType: "contact",
    senderId: "contact_2",
    body: "I'll do it later",
    mediaUrl: null,
    mediaType: null,
    direction: "inbound",
    currentStatus: "delivered",
    statusHistory: [
      { status: "delivered", at: new Date(Date.now() - 1800000), reason: null }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 1800000),
    updateDate: new Date(Date.now() - 1800000),
  },
  {
    id: "msg_2_3",
    conversationId: "conv_2",
    senderType: "user",
    senderId: "user_1",
    body: "add milk to the list!",
    mediaUrl: null,
    mediaType: null,
    direction: "outbound",
    currentStatus: "delivered",
    statusHistory: [
      { status: "queued", at: new Date(Date.now() - 1800000), reason: null },
      { status: "sent", at: new Date(Date.now() - 1799500), reason: null },
      { status: "delivered", at: new Date(Date.now() - 1799000), reason: null }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 1800000),
    updateDate: new Date(Date.now() - 1799000),
  },
  {
    id: "msg_2_4",
    conversationId: "conv_2",
    senderType: "contact",
    senderId: "contact_2",
    body: "Can we schedule a meeting for tomorrow?",
    mediaUrl: null,
    mediaType: null,
    direction: "inbound",
    currentStatus: "delivered",
    statusHistory: [
      { status: "delivered", at: new Date(Date.now() - 1800000), reason: null }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 1800000),
    updateDate: new Date(Date.now() - 1800000),
  },

  // Messages for conversation 3 (more messages to show unread)
  {
    id: "msg_3_1",
    conversationId: "conv_3",
    senderType: "user",
    senderId: "user_1",
    body: "Hi, how are feeling today?",
    mediaUrl: null,
    mediaType: null,
    direction: "outbound",
    currentStatus: "delivered",
    statusHistory: [
      { status: "queued", at: new Date(Date.now() - 3600000), reason: null },
      { status: "sent", at: new Date(Date.now() - 3599500), reason: null },
      { status: "delivered", at: new Date(Date.now() - 3599000), reason: null }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 3600000),
    updateDate: new Date(Date.now() - 3599000),
  },
  {
    id: "msg_3_2",
    conversationId: "conv_3",
    senderType: "contact",
    senderId: "contact_3",
    body: "I'm feeling better, thank you!",
    mediaUrl: null,
    mediaType: null,
    direction: "inbound",
    currentStatus: "delivered",
    statusHistory: [
      { status: "delivered", at: new Date(Date.now() - 3600000), reason: null }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 3600000),
    updateDate: new Date(Date.now() - 3600000),
  },
  {
    id: "msg_3_3",
    conversationId: "conv_3",
    senderType: "contact",
    senderId: "contact_3",
    body: "The project is looking great so far!",
    mediaUrl: null,
    mediaType: null,
    direction: "inbound",
    currentStatus: "delivered",
    statusHistory: [
      { status: "delivered", at: new Date(Date.now() - 3600000), reason: null }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 3600000),
    updateDate: new Date(Date.now() - 3600000),
  },

  // Messages for other conversations
  {
    id: "msg_4_1",
    conversationId: "conv_4",
    senderType: "contact",
    senderId: "contact_4",
    body: "I'll send you the files by end of day",
    mediaUrl: null,
    mediaType: null,
    direction: "inbound",
    currentStatus: "delivered",
    statusHistory: [
      { status: "delivered", at: new Date(Date.now() - 86400000), reason: null }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 86400000),
    updateDate: new Date(Date.now() - 86400000),
  },
  {
    id: "msg_5_1",
    conversationId: "conv_5",
    senderType: "contact",
    senderId: "contact_5",
    body: "Let's catch up next week",
    mediaUrl: null,
    mediaType: null,
    direction: "inbound",
    currentStatus: "delivered",
    statusHistory: [
      { status: "delivered", at: new Date(Date.now() - 172800000), reason: null }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 172800000),
    updateDate: new Date(Date.now() - 172800000),
  },
  {
    id: "msg_6_1",
    conversationId: "conv_6",
    senderType: "contact",
    senderId: "contact_6",
    body: "The presentation went really well!",
    mediaUrl: null,
    mediaType: null,
    direction: "inbound",
    currentStatus: "delivered",
    statusHistory: [
      { status: "delivered", at: new Date(Date.now() - 259200000), reason: null }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 259200000),
    updateDate: new Date(Date.now() - 259200000),
  },
  
  // Sample media messages for testing
  {
    id: "msg_3_4",
    conversationId: "conv_3",
    senderType: "contact",
    senderId: "contact_3",
    body: "Here's the image you requested",
    mediaUrl: "https://picsum.photos/400/300",
    mediaType: "image",
    direction: "inbound",
    currentStatus: "delivered",
    statusHistory: [
      { status: "delivered", at: new Date(Date.now() - 1800000), reason: null }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 1800000),
    updateDate: new Date(Date.now() - 1800000),
  },
  {
    id: "msg_2_5",
    conversationId: "conv_2",
    senderType: "user",
    senderId: "user_1",
    body: "Check out this document",
    mediaUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    mediaType: "document",
    direction: "outbound",
    currentStatus: "delivered",
    statusHistory: [
      { status: "queued", at: new Date(Date.now() - 900000), reason: null },
      { status: "sent", at: new Date(Date.now() - 899500), reason: null },
      { status: "delivered", at: new Date(Date.now() - 899000), reason: null }
    ],
    isActive: true,
    createDate: new Date(Date.now() - 900000),
    updateDate: new Date(Date.now() - 899000),
  }
];

// Helper function to get the latest status from a message's statusHistory array
export const getLatestMessageStatus = (message) => {
  if (!message.statusHistory || message.statusHistory.length === 0) {
    return null;
  }
  return message.statusHistory[message.statusHistory.length - 1];
};

// Helper function to check if a message is delivered
export const isMessageDelivered = (message) => {
  return message.currentStatus && ['delivered', 'read'].includes(message.currentStatus);
};

// Helper function to get all conversations with computed properties for UI
export const getConversationsForUI = () => {
  return contacts.filter(contact => contact.isActive).map(contact => {
    const conversation = contact.conversations.find(conv => conv.isActive); // Get active conversation
    
    if (!conversation) return null;
    
    // Get messages for this conversation
    const conversationMessages = smsMessages.filter(msg => 
      msg.conversationId === conversation.id && msg.isActive
    );
    
    // Get the last message (for potential future use)
    // const lastMessage = conversationMessages.length > 0 
    //   ? conversationMessages[conversationMessages.length - 1] 
    //   : null;
    
    // Calculate unread count (messages from contact that are delivered but not read)
    const unreadCount = conversationMessages.filter(msg => 
      msg.senderType === 'contact' && 
      msg.direction === 'inbound' &&
      msg.currentStatus === 'delivered'
    ).length;
    
    // Update the conversation's unreadCount field
    conversation.unreadCount = unreadCount;
    
    // Check if last outbound message is delivered
    const lastOutboundMessage = conversationMessages
      .filter(msg => msg.direction === 'outbound')
      .sort((a, b) => new Date(b.createDate) - new Date(a.createDate))[0];
    
    const isDelivered = lastOutboundMessage ? isMessageDelivered(lastOutboundMessage) : false;
    
    return {
      id: conversation.id,
      name: contact.name,
      phone: contact.phoneNumber,
      email: contact.email,
      notes: contact.notes,
      relatedEntity: contact.relatedEntity,
      lastMessage: conversation.lastMessage,
      lastMessageTime: conversation.lastMessageTime,
      lastMessageId: conversation.lastMessageId,
      unreadCount,
      isDelivered,
      avatar: null,
      contactId: contact.id,
      conversationId: conversation.id,
    };
  }).filter(Boolean); // Remove null entries
};

// Helper function to get messages for a specific conversation
export const getMessagesForConversation = (conversationId) => {
  const messages = smsMessages.filter(msg => 
    msg.conversationId === conversationId && msg.isActive
  );
  
  // Convert to UI format
  return messages.map(msg => ({
    id: msg.id,
    text: msg.body,
    isSent: msg.direction === 'outbound',
    isReceived: msg.direction === 'inbound',
    isDelivered: isMessageDelivered(msg),
    timestamp: msg.createDate,
    senderType: msg.senderType,
    senderId: msg.senderId,
    mediaUrl: msg.mediaUrl,
    mediaType: msg.mediaType,
    currentStatus: msg.currentStatus,
  }));
};

// Helper function to get a specific conversation
export const getConversationById = (conversationId) => {
  const conversations = getConversationsForUI();
  return conversations.find(conv => conv.id === conversationId);
};

// Helper function to mark conversation as read (reset unread count)
export const markConversationAsRead = (conversationId) => {
  console.log("Marking conversation as read:", conversationId);
  
  // Find all inbound messages for this conversation that are delivered but not read
  const messagesToMarkAsRead = smsMessages.filter(msg => 
    msg.conversationId === conversationId &&
    msg.senderType === 'contact' && 
    msg.direction === 'inbound' &&
    msg.currentStatus === 'delivered'
  );
  
  // Mark each message as read
  messagesToMarkAsRead.forEach(msg => {
    msg.currentStatus = 'read';
    msg.statusHistory.push({
      status: 'read',
      at: new Date(),
      reason: null
    });
    msg.updateDate = new Date();
  });
  
  // Trigger a re-render by creating a new array reference
  smsMessages = [...smsMessages];
};

// Helper function to add a new conversation
export const addNewConversation = (conversationData) => {
  const newContactId = `contact_${Date.now()}`;
  const newConversationId = `conv_${Date.now()}`;
  
  const newContact = {
    id: newContactId,
    name: conversationData.name,
    relatedEntity: {
      type: conversationData.relatedEntityType || "manual",
      id: conversationData.relatedEntityId || null
    },
    phoneNumber: conversationData.phone || "",
    email: conversationData.email || "",
    notes: conversationData.notes || "",
    conversations: [
      {
        id: newConversationId,
        userId: "user_1", // Default user ID
        lastMessage: "",
        lastMessageTime: new Date(),
        lastMessageId: null,
        unreadCount: 0,
        isActive: true,
        createDate: new Date(),
        updateDate: new Date(),
      }
    ],
    isActive: true,
    createDate: new Date(),
    updateDate: new Date(),
  };
  
  contacts.unshift(newContact); // Add to beginning of array
  // Trigger a re-render by creating a new array reference
  contacts = [...contacts];
  
  return getConversationById(newConversationId);
};

// Helper function to add a new message to a conversation
export const addNewMessage = (conversationId, messageData) => {
  console.log("Adding new message:", messageData);
  
  const messageId = `msg_${Date.now()}`;
  const newMessage = {
    id: messageId,
    conversationId: conversationId,
    senderType: messageData.senderType || 'user',
    senderId: messageData.senderId || 'user_1',
    body: messageData.text,
    mediaUrl: messageData.mediaUrl || null,
    mediaType: messageData.mediaType || null,
    direction: messageData.direction || 'outbound',
    currentStatus: messageData.initialStatus || 'queued',
    statusHistory: [
      { 
        status: messageData.initialStatus || 'queued', 
        at: new Date(),
        reason: null
      }
    ],
    isActive: true,
    createDate: new Date(),
    updateDate: new Date(),
  };
  
  smsMessages.push(newMessage);
  
  // Update the conversation's last message
  const contact = contacts.find(c => c.conversations.some(conv => conv.id === conversationId));
  if (contact) {
    const conversation = contact.conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      conversation.lastMessage = messageData.text;
      conversation.lastMessageTime = new Date();
      conversation.lastMessageId = messageId;
      conversation.updateDate = new Date();
    }
  }
  
  // Trigger a re-render by creating new array references
  smsMessages = [...smsMessages];
  contacts = [...contacts];
  
  return messageId;
};

export const updateMessageDeliveryStatus = (conversationId, messageId, newStatus, reason = null) => {
  const message = smsMessages.find(msg => msg.id === messageId && msg.conversationId === conversationId);
  if (message) {
    message.currentStatus = newStatus;
    message.statusHistory.push({
      status: newStatus,
      at: new Date(),
      reason: reason
    });
    message.updateDate = new Date();
    
    // Trigger a re-render by creating a new array reference
    smsMessages = [...smsMessages];
  }
};

export const updateConversation = (conversationId, conversationData) => {
  const contact = contacts.find(c => c.conversations.some(conv => conv.id === conversationId));
  if (contact) {
    const conversation = contact.conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      Object.assign(conversation, conversationData);
      conversation.updateDate = new Date();
      // Trigger a re-render by creating a new array reference
      contacts = [...contacts];
    }
  }
};

// Export the conversations array for backward compatibility (using the new structure)
export const conversations = getConversationsForUI();


