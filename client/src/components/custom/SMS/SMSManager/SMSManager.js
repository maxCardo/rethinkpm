import ConversationView from "./ConversationView";
import ConversationList from "./ConversationList";

const SMSManager = () => {
  return (
      <div className="h-screen">
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <ConversationList />
          </div>
          <div className="col-span-6 h-screen">
            <ConversationView />
          </div>
        </div>
    </div>
  );
};

export default SMSManager;