import { useState } from "react";
import ConversationView from "../common/ConversationView";
import ConversationList from "./ConversationList";

const SMSManager = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleNewConversation = () => {
    // TODO: Implement new conversation logic
    console.log("Creating new conversation...");
    // For now, just show an alert
    alert("New conversation feature coming soon!");
  };

  return (
      <div className="h-screen">
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <ConversationList 
              onConversationSelect={setSelectedConversation} 
              selectedConversationId={selectedConversation?.id || null}
              onNewConversation={handleNewConversation}
            />
          </div>
          <div className="col-span-8 h-screen">
            <ConversationView selectedConversation={selectedConversation} />
          </div>
        </div>
    </div>
  );
};

export default SMSManager;