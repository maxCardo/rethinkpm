const MessageBubble = ({ message, isSent, isReceived, isDelivered, timestamp }) => {
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="flex flex-col gap-3 px-4 py-2">
      {isSent && (
        <div className="flex justify-end mb-2">
          <div className="relative flex-shrink-0" style={{ maxWidth: '75%' }}>
            <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-md shadow-md">
              <p className="text-sm leading-relaxed break-words mb-0">{message}</p>
            </div>
            <div className="flex justify-end mt-1 mr-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 min-w-[70px]">
                  {isDelivered ? (
                    <>
                      <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-gray-400">Delivered</span>
                    </>
                  ) : (
                    <span className="text-xs text-gray-400 opacity-0">Delivered</span>
                  )}
                </div>
                <span className="text-xs text-gray-400">{formatTime(timestamp)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {isReceived && (
        <div className="flex justify-start mb-2">
          <div className="relative flex-shrink-0" style={{ maxWidth: '75%' }}>
            <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-200">
              <p className="text-sm leading-relaxed break-words mb-0">{message}</p>
            </div>
            <div className="flex justify-start mt-1 ml-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Received</span>
                <span className="text-xs text-gray-400">{formatTime(timestamp)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
