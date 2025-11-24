## SMS Components

This folder contains the reusable SMS conversation experience used across the app. The main entry points are:

- `SMSChat`: controlled chat UI that expects pre-normalized contact and message lists.
- `SMSManager`: opinionated manager experience with internal state (new contact modal, message actions, etc.).
- `SMSDialog`: minimal dialog-style conversation (see `SMSDialog/`).
- `SMSChatDemo`: interactive playground showing the chat with mock data.
- `helpers.js`: utility functions for normalizing raw contact/message data (`getContactsForUI`, `getMessagesForContact`, etc.).

Use `index.js` to re-export the primary components.

---

### Embedding in Feature Modules

Recent work wired `SMSManager` into the CRM `LeaseLeadRecords` view. A few lessons from that integration that may help when you embed the SMS experience elsewhere:

- **Provide stable data**: `SMSManager` accepts raw `contacts` and `messages`. When you derive them on the fly (like `smsContactsForChat` / `smsMessagesForChat`), make sure each message has a stable `id`. Falling back to something like ``${contactId}_${timestamp}`` prevents React key collisions.
- **Handle optimistic messages**: If you want the UI to show a message before it’s persisted, mirror what `LeaseLeadRecords` does—generate a temporary `id`, stamp both `createdAt` (Date) and `date` (ISO string), set `direction` to `"outbound"`, and merge it into the local `smsState`. When the real send succeeds, replace or reconcile as needed.
- **Manage height flexibly**: Wrap `SMSManager` in a container that gives it a flex column with a calculated height. In the CRM view we do:

  ```jsx
  <div
    className="flex min-h-[600px]"
    style={{ height: `calc(100vh - ${isNavbarShown ? NAVBAR_HEIGHT : 0}px - 40px)` }}
  >
    <SMSManager ... />
  </div>
  ```

  This keeps the conversation input from being clipped when global chrome (like the navbar) is visible.
- **Sync external loading state**: Pass along your own loading indicator. The CRM page shows `<Loading />` whenever the Redux slice reports `sms.loading`, so the manager never renders stale content mid-fetch.

Feel free to copy the patterns from `client/src/components/custom/CRM/LeaseLeadRecords.js` if you need a concrete reference implementation.

---

### Quick Start

```jsx
import SMSChat from "./SMSChat";
import { getContactsForUI } from "./helpers";

const contacts = [/* raw contacts from your API */];
const messages = [/* raw messages from your API */];

const contactsForUI = getContactsForUI(contacts, messages);

const Example = () => (
  <SMSChat
    contacts={contactsForUI}
    messages={messages}
    selectedContact={contactsForUI[0]}
    isMinimalView={false}
    onInit={() => {}}
    onContactSelect={(contact) => console.log("Selected", contact)}
    onSendMessage={(contactId, payload) => console.log(contactId, payload)}
  />
);
```

If you already have UI-shaped data, pass it directly to `SMSChat` and skip `getContactsForUI`.

---

### Data Requirements

The helpers accept raw API payloads and derive the fields the UI needs. Below are the minimum shapes you should supply **before** calling helpers, plus the additional fields the UI consumes **after** normalization.

#### Raw contact (`smsContactsForChat` before helpers)

```jsonc
{
  "id": "contact_123",               // required
  "firstName": "Alex",               // optional but recommended
  "lastName": "Johnson",             // optional
  "name": "Alex Johnson",            // optional (overrides name built from parts)
  "phone": "+1 (555) 123-4567",      // optional
  "email": "alex@example.com",       // optional
  "notes": "Interested in leasing",  // optional
  "avatar": "",                      // optional (or avatarUrl)
  "lastMsgDate": "2025-11-10T15:00:00Z", // optional fallback for last message time
  "isActive": true,                  // defaults to true when omitted
  "createdAt": "2025-11-01T12:00:00Z"    // shown in contact info modal
}
```

#### Raw message (`smsMessagesForChat` before helpers)

```jsonc
{
  "id": "msg_001",                   // required
  "contactId": "contact_123",        // required (used to group messages)
  "body": "Hi Alex, checking in.",   // required (or use `text`)
  "createdAt": "2025-11-12T09:30:00Z", // required for ordering/rendering
  "senderId": "user_1",              // strongly recommended
  "direction": "outbound",           // "inbound" | "outbound"; required for UI logic
  "status": "delivered",             // "queued" | "sent" | "delivered" | "read" | "failed"
  "mediaUrl": "",                    // optional
  "mediaType": "",                   // optional ("image" | "video" | "audio" | "document")
  "isActive": true                   // optional; defaults to true
}
```

#### Contact after `getContactsForUI`

The helper enriches each contact with UI-ready fields such as `lastMessage`, `lastMessageTime`, `unreadCount`, `isDelivered`, `isLastMessageFromUser`, and ensures a fallback avatar/name. See `helpers.js` for the full object.

#### Message after `getMessagesForContact`

Messages are normalized to:

```jsonc
{
  "id": "msg_001",
  "text": "Hi Alex, checking in.",
  "createdAt": "2025-11-12T09:30:00.000Z",
  "senderId": "user_1",
  "mediaUrl": "",
  "mediaType": "",
  "status": "delivered",
  "direction": "outbound"
}
```

---

### Helper Utilities

- `getContactsForUI(contacts, messages)` – filter/format contacts for list rendering.
- `getMessagesForContact(contactId, messages)` – chronological messages for a single contact.
- `addNewMessage(contactId, message, contacts, messages)` – append a new message and update contact metadata.
- `updateMessageDeliveryStatus(contactId, messageId, status, messages)` – update delivery state.

Use these helpers to keep the UI in sync with your data source.

---

### Additional Resources

- See `SMSChatDemo.js` for a complete example with toggles and mock data.
- `mockData.js` provides sample payloads (raw + normalized).
- Conversation list and message bubble UI live under `common/`.

Feel free to extend the shapes with additional metadata; the helpers will pass through unknown fields so you can access them from your own callbacks.

