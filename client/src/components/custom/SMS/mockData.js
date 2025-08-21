// For testing purposes only! 
// remove this file when real data is added

export let conversations = [
  {
    id: 1,
    name: "John Smith",
    phone: "1234567890",
    email: "john.smith@example.com",
    notes: "Notes about John Smith",
    lastMessage: "Thanks for the update!",
    lastMessageTime: new Date(Date.now() - 300000), // 5 minutes ago
    unreadCount: 2,
    isDelivered: true,
    avatar: null,
    messages: [
      {
        id: 1,
        text: "Hello, how are you?",
        isSent: true,
        isDelivered: true,
        timestamp: new Date(Date.now() - 300000)
      },
      {
        id: 2,
        text: "I'm good, thank you!",
        isReceived: true,
        timestamp: new Date(Date.now() - 300000)
      }
    ]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    phone: "1234567890",
    email: "sarah.johnson@example.com",
    notes: "Notes about Sarah Johnson",
    lastMessage: "Can we schedule a meeting for tomorrow?",
    lastMessageTime: new Date(Date.now() - 1800000), // 30 minutes ago
    unreadCount: 0,
    isDelivered: true,
    avatar: null,
    messages: [
      {
        id: 1,
        text: "Remember to buy the groceries",
        isSent: true,
        isDelivered: true,
        timestamp: new Date(Date.now() - 300000)
      },
      {
        id: 2,
        text: "I'll do it later",
        isReceived: true,
        isDelivered: true,
        timestamp: new Date(Date.now() - 300000)
      },
      {
        id: 3,
        text: "add milk to the list!",
        isSent: true,
        isDelivered: true,
        timestamp: new Date(Date.now() - 300000)
      }
    ]
  },
  {
    id: 3,
    name: "Mike Wilson",
    phone: "1234567890",
    email: "mike.wilson@example.com",
    notes: "Notes about Mike Wilson",
    lastMessage: "The project is looking great so far!",
    lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
    unreadCount: 1,
    isDelivered: false,
    avatar: null,
    messages: [
      {
        id: 1,
        text: "Hi, how are feeling today?",
        isSent: true,
        isDelivered: true,
        timestamp: new Date(Date.now() - 60000)
      },
      {
        id: 2,
        text: "I'm feeling better, thank you!",
        isReceived: true,
        timestamp: new Date(Date.now() - 30000)
      },
      {
        id: 3,
        text: "Did you see the new project updates?",
        isSent: true,
        isDelivered: true,
        timestamp: new Date(Date.now() - 86400000 - 3600000)
      },
      {
        id: 4,
        text: "Yes, I reviewed them this morning",
        isReceived: true,
        timestamp: new Date(Date.now() - 86400000 - 1800000)
      },
      {
        id: 5,
        text: "Great! Let's discuss them tomorrow",
        isSent: true,
        isDelivered: true,
        timestamp: new Date(Date.now() - 86400000 - 900000)
      },
      {
        id: 6,
        text: "Happy New Year! 🎉",
        isReceived: true,
        timestamp: new Date(Date.now() - 172800000 - 7200000)
      },
      {
        id: 7,
        text: "Happy New Year to you too! 🎊",
        isSent: true,
        isDelivered: true,
        timestamp: new Date(Date.now() - 172800000 - 3600000)
      },
      {
        id: 8,
        text: "What are your plans for this year?",
        isReceived: true,
        timestamp: new Date(Date.now() - 172800000 - 1800000)
      },
      {
        id: 9,
        text: "Don't forget about the team meeting",
        isSent: true,
        isDelivered: true,
        timestamp: new Date(Date.now() - 604800000 - 3600000)
      },
      {
        id: 10,
        text: "Thanks for the reminder!",
        isReceived: true,
        timestamp: new Date(Date.now() - 604800000 - 1800000)
      }
    ]
  },
  {
    id: 4,
    name: "Emily Davis",
    phone: "1234567890",
    email: "emily.davis@example.com",
    notes: "Notes about Emily Davis",
    lastMessage: "I'll send you the files by end of day",
    lastMessageTime: new Date(Date.now() - 86400000), // Yesterday
    unreadCount: 0,
    isDelivered: true,
    avatar: null,
    messages: []
  },
  {
    id: 5,
    name: "David Brown",
    phone: "1234567890",
    email: "david.brown@example.com",
    notes: "Notes about David Brown",
    lastMessage: "Let's catch up next week",
    lastMessageTime: new Date(Date.now() - 172800000), // 2 days ago
    unreadCount: 0,
    isDelivered: true,
    avatar: null,
    messages: []
  },
  {
    id: 6,
    name: "Lisa Anderson",
    phone: "1234567890",
    email: "lisa.anderson@example.com",
    notes: "Notes about Lisa Anderson",
    lastMessage: "The presentation went really well!",
    lastMessageTime: new Date(Date.now() - 259200000), // 3 days ago
    unreadCount: 0,
    isDelivered: true,
    avatar: null,
    messages: []
  }
];



// Helper function to get messages for a specific conversation
export const getMessagesForConversation = (conversationId) => {
  const conversation = conversations.find(conv => conv.id === conversationId);
  return conversation ? conversation.messages : [];
};

// Helper function to get a specific conversation
export const getConversationById = (conversationId) => {
  return conversations.find(conv => conv.id === conversationId);
};

// Helper function to mark conversation as read (reset unread count)
export const markConversationAsRead = (conversationId) => {
  console.log("Read:", conversationId);
  const conversation = conversations.find(conv => conv.id === conversationId);
  if (conversation && conversation.unreadCount > 0) {
    conversation.unreadCount = 0;
    // Trigger a re-render by creating a new array reference
    conversations = [...conversations];
    console.log("Conversations after marking as read:", conversation);
  }
};
// Helper function to add a new conversation
export const addNewConversation = (conversationData) => {
  const newConversation = {
    id: Date.now(),
    name: conversationData.name,
    phone: conversationData.phone || "",
    email: conversationData.email || "",
    notes: conversationData.notes || "",
    lastMessage: "",
    lastMessageTime: new Date(),
    unreadCount: 0,
    isDelivered: false,
    avatar: null,
    messages: []
  };
  
  conversations.unshift(newConversation); // Add to beginning of array
  // Trigger a re-render by creating a new array reference
  conversations = [...conversations];
  
  return newConversation;
};

// Helper function to add a new message to a conversation
export const addNewMessage = (conversationId, messageData) => {
  console.log("Adding new message:", messageData);
  const conversation = conversations.find(conv => conv.id === conversationId);
  if (conversation) {
    conversation.messages.push(messageData);
    // Trigger a re-render by creating a new array reference
    conversations = [...conversations];
  }
};

export const updateMessageDeliveryStatus = (conversationId, messageId, isDelivered) => {
  const conversation = conversations.find(conv => conv.id === conversationId);
  if (conversation) {
    const message = conversation.messages.find(msg => msg.id === messageId);
    if (message) {
      message.isDelivered = isDelivered;
      // Trigger a re-render by creating a new array reference
      conversations = [...conversations];
    }
  }
};

export const updateConversation = (conversationId, conversationData) => {
  const conversation = conversations.find(conv => conv.id === conversationId);
  if (conversation) {
    Object.assign(conversation, conversationData);
    // Trigger a re-render by creating a new array reference
    conversations = [...conversations];
  }
};


