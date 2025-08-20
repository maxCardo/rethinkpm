import { useState } from "react";
import ConversationView from "./ConversationView";
import ConversationList from "./ConversationList";

const SMSManager = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
      <div className="h-screen">
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <ConversationList onConversationSelect={setSelectedConversation} selectedConversationId={selectedConversation?.id || null} />
          </div>
          <div className="col-span-6 h-screen">
            <ConversationView selectedConversation={selectedConversation} />
          </div>
        </div>
    </div>
  );
};

export default SMSManager;