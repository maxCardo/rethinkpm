import ChatBubble from "./ChatBubble";
import DateHeader from "./DateHeader";

const ConversationView = () => {
  return (
    <div className="flex flex-col">
      <DateHeader date={new Date()} />
      <ChatBubble message="Hello, how are you?" isSent isDelivered timestamp={new Date()} />
      <ChatBubble message="I'm good, thank you!" isReceived timestamp={new Date()} />
    </div>
  );
};

export default ConversationView;