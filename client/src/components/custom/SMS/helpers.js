const DEFAULT_USER_ID = "user_1";
export const MESSAGE_STATUS = {
  READ: "read", // Message has been read by the user (inbound message)
  DELIVERED: "delivered", // Message has been delivered to the recipient (outbound message)
  SENT: "sent", // Message has been sent to the recipient (outbound message)
  FAILED: "failed", // Message has failed to be sent (outbound message)
  QUEUED: "queued", // Message is waiting in the queue to be sent (outbound message)
  // SENDING: "sending",
}

export const MESSAGE_DIRECTION = {
  INBOUND: "inbound",
  OUTBOUND: "outbound",
}

const toDate = (value) => {
  if (!value) return null;
  return value instanceof Date ? value : new Date(value);
};

const isActive = (entity) => entity?.isActive !== false;

const normalizeMessage = (message = {}) => {
  const { status = null, ...rest } = message || {};
  return {
    ...rest,
    status,
  };
};

// Get the messages for the contact
const getContactMessages = (contactId, messages = []) =>
  (messages || []).filter(
    (message) => message?.contactId === contactId 
  ).map((message) => normalizeMessage(message));

  // Check if the message has been delivered to the recipient or read by the user
export const isMessageDelivered = (message = {}) => {
  const normalized = normalizeMessage(message);
  const status = normalized?.status ?? null;
  return [MESSAGE_STATUS.DELIVERED, MESSAGE_STATUS.READ].includes(status);
};

// Build a contact record for the SMS component UI
const buildContactRecord = (contact, messages = []) => {
  // 1. Define the full name of the contact
  const fullName = [contact.firstName, contact.lastName].filter(Boolean).join(" ").trim();
  const name = fullName || contact.firstName || contact.lastName || "Unknown Contact";

  // 2. Get the messages for the contact
  const contactMessages = getContactMessages(contact.id, messages);
  // 3. Sort the messages by createdAt (most recent first)
  const sortedMessages = [...contactMessages].sort(
    (a, b) => toDate(b.createdAt) - toDate(a.createdAt)
  );
  
  // 4. Get the last message
  const lastMessage = sortedMessages[0] || null;

  // 5. Get the last outbound message
  const lastOutboundMessage = sortedMessages.find(
    (message) => message.direction === MESSAGE_DIRECTION.OUTBOUND
  );

// 6. Get the unread messages
  const unreadMessages = sortedMessages.filter(
    (message) =>
      message.direction === MESSAGE_DIRECTION.INBOUND && message.status !== MESSAGE_STATUS.READ 
  );

  // 7. Get the last message time
  const lastMessageTime = lastMessage
    ? toDate(lastMessage.createdAt)
    : null;

  // 8. Get the last message text
  const lastMessageText =
    lastMessage?.body || lastMessage?.text || contact.lastMessage || "";

  // 9. Get the avatar
  const avatar = contact.avatar ?? contact.avatarUrl ?? null;

// 10. Return the contact record
  return {
    id: contact.id,
    firstName: contact.firstName ?? "",
    lastName: contact.lastName ?? "",
    name,
    avatar,
    lastMessage: lastMessageText,
    lastMessageTime: lastMessageTime ?? toDate(contact.lastMsgDate),
    unreadCount: unreadMessages.length,
    isDelivered: lastOutboundMessage ? isMessageDelivered(lastOutboundMessage) : false,
    isLastMessageFromUser: lastMessage ? lastMessage.direction === MESSAGE_DIRECTION.OUTBOUND : false,
    phone: contact.primaryNumber ?? contact.phone ?? "",
    email: contact.email ?? "",
    notes: contact.notes ?? "",
    createdAt: toDate(contact.createdAt),
  };
};

// Build the contacts for the UI
export const getContactsForUI = (contacts = [], messages = []) =>
  (contacts || [])
    .filter((contact) => isActive(contact)) // Filter out inactive contacts
    .map((contact) => buildContactRecord(contact, messages)) // Build the contact record for the UI
    .sort((a, b) => { // Sort the contacts by last message time (most recent first)
      const aTime = a.lastMessageTime || 0;
      const bTime = b.lastMessageTime || 0;
      return new Date(bTime) - new Date(aTime);
    });

  // Get the contact by ID
export const getContactById = (contactId, contacts = [], messages = []) => {
  if (!contactId) return null;
  return (
    getContactsForUI(contacts, messages).find((contact) => contact.id === contactId) || null
  );
};

// Get the messages for the contact
export const getMessagesForContact = (contactId, messages = []) => {
  if (!contactId) return [];

  // 1. Get the messages for the contact
  const orderedMessages = getContactMessages(contactId, messages).sort(
    (a, b) => toDate(a.createdAt) - toDate(b.createdAt)
  );

  return orderedMessages.map((message) => {
    const isSentByUser = message.direction === MESSAGE_DIRECTION.OUTBOUND;

    const messageCreatedAt = toDate(message.createdAt);
  // 2. Return the message record for the UI
    return {
      id: message.id,
      text: message.body,
      createdAt: messageCreatedAt,
      senderId: message.senderId,
      mediaUrl: message.mediaUrl,
      mediaType: message.mediaType,
      status: message.status,
      direction: message.direction,
    };
  });
};
// remove?
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

