import ConversationView from "./ConversationView";

const SMSManager = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">SMS Manager</h1>
      <div className="h-screen">
        <ConversationView />
      </div>
    </div>
  );
};

export default SMSManager;