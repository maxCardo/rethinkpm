const DEFAULT_USER_ID = "user_1";

const toDate = (value) => {
  if (!value) return null;
  return value instanceof Date ? value : new Date(value);
};

const isActive = (entity) => entity?.isActive !== false;

const normalizeMessage = (message = {}) => {
  const { statusHistory, currentStatus, status = null, ...rest } = message || {};
  return {
    ...rest,
    status,
  };
};

const getContactMessages = (contactId, messages = []) =>
  (messages || []).filter(
    (message) => message?.contactId === contactId && isActive(message)
  ).map((message) => normalizeMessage(message));

export const isMessageDelivered = (message = {}) => {
  const normalized = normalizeMessage(message);
  const status = normalized?.status ?? null;
  return ["delivered", "read"].includes(status);
};

const buildContactRecord = (contact, messages = []) => {
  const fullName = [contact.firstName, contact.lastName].filter(Boolean).join(" ").trim();
  const name = fullName || contact.firstName || contact.lastName || "Unknown Contact";

  const contactMessages = getContactMessages(contact.id, messages);
  const sortedMessages = [...contactMessages].sort(
    (a, b) => toDate(b.createdAt) - toDate(a.createdAt)
  );
  const lastMessage = sortedMessages[0] || null;
  const lastOutboundMessage = sortedMessages.find(
    (message) => message.senderId === DEFAULT_USER_ID
  );

  const unreadMessages = sortedMessages.filter(
    (message) =>
      message.senderId !== DEFAULT_USER_ID &&
      ["delivered", "queued", "sent"].includes(message.status)
  );

  const lastMessageTime = lastMessage
    ? toDate(lastMessage.createdAt)
    : toDate(contact.lastMsgDate);

  return {
    id: contact.id,
    firstName: contact.firstName,
    lastName: contact.lastName,
    name,
    phone: contact.primaryNumber,
    primaryNumber: contact.primaryNumber,
    email: contact.email,
    notes: contact.notes,
    avatar: contact.avatarUrl || null,
    lastMessage: lastMessage?.body || "",
    lastMessageTime,
    unread: unreadMessages.length > 0 || !!contact.unread,
    unreadCount: unreadMessages.length,
    isDelivered: lastOutboundMessage ? isMessageDelivered(lastOutboundMessage) : false,
    isLastMessageFromUser: lastMessage ? lastMessage.senderId === DEFAULT_USER_ID : false,
    contactId: contact.id,
    createDate: toDate(contact.createdAt),
    createdAt: toDate(contact.createdAt),
    lastMsgDate: toDate(contact.lastMsgDate),
    isActive: isActive(contact),
  };
};

export const getContactsForUI = (contacts = [], messages = []) =>
  (contacts || [])
    .filter((contact) => isActive(contact))
    .map((contact) => buildContactRecord(contact, messages))
    .sort((a, b) => {
      const aTime = a.lastMessageTime || a.lastMsgDate || 0;
      const bTime = b.lastMessageTime || b.lastMsgDate || 0;
      return new Date(bTime) - new Date(aTime);
    });

export const getContactById = (contactId, contacts = [], messages = []) => {
  if (!contactId) return null;
  return (
    getContactsForUI(contacts, messages).find((contact) => contact.id === contactId) || null
  );
};

export const getMessagesForContact = (contactId, messages = []) => {
  if (!contactId) return [];

  const orderedMessages = getContactMessages(contactId, messages).sort(
    (a, b) => toDate(a.createdAt) - toDate(b.createdAt)
  );

  return orderedMessages.map((message) => {
    const isSentByUser = message.senderId === DEFAULT_USER_ID;

    return {
      id: message.id,
      text: message.body,
      isSent: isSentByUser,
      isReceived: !isSentByUser,
      isDelivered: isMessageDelivered(message),
      timestamp: toDate(message.createdAt),
      senderId: message.senderId,
      mediaUrl: message.mediaUrl,
      mediaType: message.mediaType,
      status: message.status,
      direction: message.direction,
    };
  });
};

export const markContactMessagesAsRead = (contactId, contacts = [], messages = []) => {
  let messagesChanged = false;
  const updatedMessages = (messages || []).map((message) => {
    if (
      message.contactId === contactId &&
      isActive(message) &&
      message.senderId !== DEFAULT_USER_ID &&
      message.status === "delivered"
    ) {
      messagesChanged = true;
      return { ...message, status: "read" };
    }
    return message;
  });

  let contactsChanged = false;
  const updatedContacts = (contacts || []).map((contact) => {
    if (contact.id === contactId && contact.unread) {
      contactsChanged = true;
      return { ...contact, unread: false };
    }
    return contact;
  });

  return {
    contacts: contactsChanged ? updatedContacts : contacts,
    messages: messagesChanged ? updatedMessages : messages,
  };
};

export const buildNewContactObject = (contacts = [], contactData = {}) => {
  const newContactId = contactData.id || `contact_${Date.now()}`;
  const createdAt = contactData.createdAt ? toDate(contactData.createdAt) : new Date();
  const rawName = (contactData.name || "").trim();
  const nameParts = rawName.split(" ").filter(Boolean);
  const firstName = contactData.firstName || nameParts.shift() || rawName || "New";
  const lastName = contactData.lastName || nameParts.join(" ");

  const newContact = {
    id: newContactId,
    firstName,
    lastName,
    primaryNumber: contactData.phone || contactData.primaryNumber || "",
    unread: Boolean(contactData.unread),
    lastMsgDate: contactData.lastMsgDate ? toDate(contactData.lastMsgDate) : null,
    email: contactData.email || "",
    avatarUrl: contactData.avatarUrl || "",
    notes: contactData.notes || "",
    isActive: contactData.isActive !== false,
    createdAt,
  };

  return {
    contacts: [newContact, ...(contacts || [])],
    contact: newContact,
  };
};

export const addNewMessage = (
  contactId,
  messageData = {},
  contacts = [],
  messages = []
) => {
  if (!contactId) {
    return { contacts, messages, messageId: null, message: null };
  }

  const createdAt = messageData.createdAt ? toDate(messageData.createdAt) : new Date();
  const baseId = messageData.id || `msg_${Date.now()}`;
  const senderId = messageData.senderId || DEFAULT_USER_ID;
  const direction = senderId === DEFAULT_USER_ID ? "outbound" : "inbound";
  const initialStatus =
    messageData.status ||
    messageData.initialStatus ||
    (direction === "outbound" ? "queued" : "delivered");

  const newMessage = {
    id: baseId,
    contactId,
    body: messageData.text ?? messageData.body ?? "",
    mediaUrl: messageData.mediaUrl || "",
    mediaType: messageData.mediaType || "",
    isActive: true,
    createdAt,
    senderId,
    direction,
    status: initialStatus,
  };

  const updatedMessages = [...(messages || []), newMessage];
  const updatedContacts = (contacts || []).map((contact) =>
    contact.id === contactId
      ? {
          ...contact,
          lastMsgDate: createdAt,
          unread: direction === "inbound" ? true : contact.unread,
        }
      : contact
  );

  return {
    contacts: updatedContacts,
    messages: updatedMessages,
    messageId: baseId,
    message: newMessage,
  };
};

export const updateMessageDeliveryStatus = (
  contactId,
  messageId,
  newStatus,
  messages = [],
  reason = null
) => {
  if (!contactId || !messageId || !newStatus) {
    return { messages };
  }

  let changed = false;

  const updatedMessages = (messages || []).map((message) => {
    if (message.contactId === contactId && message.id === messageId && isActive(message)) {
      changed = true;
      return { ...message, status: newStatus };
    }
    return message;
  });

  return {
    messages: changed ? updatedMessages : messages,
  };
};

export const updateContactConversation = (contactId, updates = {}, contacts = []) => {
  if (!contactId || !updates) {
    return { contacts };
  }

  let changed = false;
  const updatedContacts = (contacts || []).map((contact) => {
    if (contact.id === contactId) {
      changed = true;
      return { ...contact, ...updates };
    }
    return contact;
  });

  return {
    contacts: changed ? updatedContacts : contacts,
  };
};

export const deleteContactConversation = (contactId, contacts = [], messages = []) => {
  if (!contactId) {
    return { contacts, messages, removed: false };
  }

  let contactChanged = false;
  const updatedContacts = (contacts || []).map((contact) => {
    if (contact.id === contactId && contact.isActive !== false) {
      contactChanged = true;
      return { ...contact, isActive: false, unread: false };
    }
    return contact;
  });

  let messagesChanged = false;
  const deletedAt = new Date();
  const updatedMessages = (messages || []).map((message) => {
    if (message.contactId === contactId && message.isActive !== false) {
      messagesChanged = true;
      return { ...message, isActive: false, deletedAt };
    }
    return message;
  });

  return {
    contacts: contactChanged ? updatedContacts : contacts,
    messages: messagesChanged ? updatedMessages : messages,
    removed: contactChanged,
  };
};

