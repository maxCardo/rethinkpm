import { useMemo, useState } from "react";
import SMSChat from "./SMSChat";

const INITIAL_CONTACTS = [
  {
    id: "contact_demo_1",
    firstName: "Alex",
    lastName: "Johnson",
    primaryNumber: "+1 (555) 123-4567",
    unread: true,
    lastMsgDate: new Date(Date.now() - 5 * 60 * 1000),
    email: "alex.johnson@example.com",
    avatarUrl: "",
    notes: "Interested in leasing a new property.",
    isActive: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "contact_demo_2",
    firstName: "Brianna",
    lastName: "Lee",
    primaryNumber: "+1 (555) 987-6543",
    unread: false,
    lastMsgDate: new Date(Date.now() - 60 * 60 * 1000),
    email: "brianna.lee@example.com",
    avatarUrl: "",
    notes: "Follows up weekly on project progress.",
    isActive: true,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
  },
  {
    id: "contact_demo_3",
    firstName: "Carlos",
    lastName: "Williams",
    primaryNumber: "+1 (555) 555-1212",
    unread: false,
    lastMsgDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
    email: "carlos.williams@example.com",
    avatarUrl: "",
    notes: "Requested information about premium plans.",
    isActive: true,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
  },
];

const INITIAL_MESSAGES = [
  {
    id: "msg_demo_1",
    contactId: "contact_demo_1",
    body: "Hi Alex, just checking in about the lease agreement.",
    mediaUrl: "",
    mediaType: "",
    isActive: true,
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
    senderId: "user_1",
    direction: "outbound",
    status: "delivered",
  },
  {
    id: "msg_demo_2",
    contactId: "contact_demo_1",
    body: "Thanks! I'll review it today.",
    mediaUrl: "",
    mediaType: "",
    isActive: true,
    createdAt: new Date(Date.now() - 7 * 60 * 1000),
    senderId: "contact_demo_1",
    direction: "inbound",
    status: "delivered",
  },
  {
    id: "msg_demo_3",
    contactId: "contact_demo_2",
    body: "Morning Brianna! The latest report is attached.",
    mediaUrl: "",
    mediaType: "",
    isActive: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    senderId: "user_1",
    direction: "outbound",
    status: "delivered",
  },
  {
    id: "msg_demo_4",
    contactId: "contact_demo_2",
    body: "Perfect, reviewing now.",
    mediaUrl: "",
    mediaType: "",
    isActive: true,
    createdAt: new Date(Date.now() - 90 * 60 * 1000),
    senderId: "contact_demo_2",
    direction: "inbound",
    status: "read",
  },
  {
    id: "msg_demo_5",
    contactId: "contact_demo_3",
    body: "Hello Carlos, here are the premium plan details you asked for.",
    mediaUrl: "",
    mediaType: "",
    isActive: true,
    createdAt: new Date(Date.now() - 13 * 60 * 60 * 1000),
    senderId: "user_1",
    direction: "outbound",
    status: "delivered",
  },
  {
    id: "msg_demo_6",
    contactId: "contact_demo_3",
    body: "Great, I'll get back to you soon.",
    mediaUrl: "",
    mediaType: "",
    isActive: true,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    senderId: "contact_demo_3",
    direction: "inbound",
    status: "delivered",
  },
];

const SMSChatDemo = () => {
  const [contacts] = useState(INITIAL_CONTACTS);
  const [messages] = useState(INITIAL_MESSAGES);
  const [isMinimalView, setIsMinimalView] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(
    INITIAL_CONTACTS.length ? INITIAL_CONTACTS[0].id : null
  );

  const minimalDescription = useMemo(
    () =>
      "Minimal view renders the conversation list and opens a dialog overlay when you click a contact, " +
      "mirroring the behavior of the standalone SMSDialog component.",
    []
  );

  const fullDescription = useMemo(
    () =>
      "Full view renders the conversation list and conversation panel side-by-side, providing an experience similar to the legacy manager layout.",
    []
  );

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">SMS Chat Demo</h1>
          <p className="text-sm text-gray-600">
            Toggle the layout to preview both the full chat interface and the minimal dialog experience.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sms-chat-minimal-toggle" className="text-sm font-medium text-gray-700">
            Minimal view
          </label>
          <input
            id="sms-chat-minimal-toggle"
            type="checkbox"
            checked={isMinimalView}
            onChange={(event) => setIsMinimalView(event.target.checked)}
            className="h-4 w-4"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-600">
          {isMinimalView ? minimalDescription : fullDescription}
        </p>
      </div>

      <div className="h-[80vh] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <SMSChat
          contacts={contacts}
          messages={messages}
          selectedContactId={selectedContactId}
          isDialogOpen={false}
          isMinimalView={isMinimalView}
          onInit={() => {}}
          onCreateContact={(contact) => console.info("Created contact", contact)}
          onContactSelect={(contact) => setSelectedContactId(contact?.id || null)}
          onContactInfo={(contact) => console.info("Contact info", contact)}
          onDeleteContact={(contact) => console.info("Deleted contact", contact)}
          onMessageSent={(contact) => console.info("Message sent for contact", contact)}
          onCloseDialog={() => {}}
        />
      </div>
    </div>
  );
};

export default SMSChatDemo;

