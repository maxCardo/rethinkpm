import { IoCheckmark, IoCheckmarkDone } from 'react-icons/io5';
import ImageWithLoader from './ImageWithLoader';
import VideoWithLoader from './VideoWithLoader';
import { MESSAGE_DIRECTION, MESSAGE_STATUS } from '../../helpers';

const MessageBubble = ({message, msgType}) => {
  
  //to be refactored out, create to avoid crash
  const mediaType = null
  const mediaUrl = null

  message.direction = message.from === '+14122147909' ? 'isOutbound' : 'isInbound'
  

  //hard coded here. Need to get into schema so it is part of message moving forward (12/8/25asp)
  message.isDelivered = false

  //const isOutbound = message.direction === MESSAGE_DIRECTION.OUTBOUND;
  //const isInbound = message.direction === MESSAGE_DIRECTION.INBOUND;
  //const isDelivered = message.status === MESSAGE_STATUS.DELIVERED;

  const formatTime = (value) => {
    if (!value) return '';
    const date = new Date(value);
    // Note: Just time to use if messages are devided by date
    // return date.toLocaleTimeString('en-US', { 
    //   hour: 'numeric', 
    //   minute: '2-digit',
    //   hour12: true 
    // });
    //Note: This version includs data and time
    return date.toLocaleString('en-US', { 
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
  };

  const getStatusIcon = () => {
    if (message.direction != 'isOutbound') return null;
    
    if (message.isDelivered) {
      return <IoCheckmarkDone className="w-3 h-3 text-blue-400" />;
    } else {
      return <IoCheckmark className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-3 px-4 py-2">
      {message.direction === 'isOutbound' && (
        <div className="flex justify-end mb-2">
          <div className="relative flex-shrink-0" style={{ maxWidth: '75%' }}>
            <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-md shadow-md">
              {/* Media content */}
              {mediaUrl && mediaType && (
                <div className="mb-2">
                  {mediaType === 'image' && (
                    <ImageWithLoader 
                      src={mediaUrl} 
                      alt="Message attachment" 
                      className="max-w-full h-auto rounded-lg"
                      style={{ maxHeight: '200px' }}
                    />
                  )}
                  {mediaType === 'video' && (
                    <VideoWithLoader 
                      src={mediaUrl} 
                      className="max-w-full h-auto rounded-lg"
                      style={{ maxHeight: '200px' }}
                    />
                  )}
                  {mediaType === 'audio' && (
                    <audio 
                      src={mediaUrl} 
                      controls 
                      className="w-full"
                    />
                  )}
                  {mediaType === 'document' && (
                    <div className="bg-blue-500 p-2 rounded-lg">
                      <a 
                        href={mediaUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white text-sm flex items-center"
                      >
                        📄 Document
                      </a>
                    </div>
                  )}
                </div>
              )}
              {/* Text content */}
              {console.log('this is the msgType: ', msgType)}
              {msgType === 'text' && (
                <p className="text-sm leading-relaxed break-words mb-0">{message.body}</p>
              )}
            </div>
            <div className="flex justify-end mt-1 mr-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 min-w-[70px]">
                  {getStatusIcon()}
                  <span className="text-xs text-gray-400">
                    {message.isDelivered ? 'Delivered' : 'Sent'}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{formatTime(message.date)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {message.direction === 'isInbound' && (
        <div className="flex justify-start mb-2">
          <div className="relative flex-shrink-0" style={{ maxWidth: '75%' }}>
            <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-200">
              {/* Media content */}
              {mediaUrl && mediaType && (
                <div className="mb-2">
                  {mediaType === 'image' && (
                    <ImageWithLoader 
                      src={mediaUrl} 
                      alt="Message attachment" 
                      className="max-w-full h-auto rounded-lg"
                      style={{ maxHeight: '200px' }}
                    />
                  )}
                  {mediaType === 'video' && (
                    <VideoWithLoader 
                      src={mediaUrl} 
                      className="max-w-full h-auto rounded-lg"
                      style={{ maxHeight: '200px' }}
                    />
                  )}
                  {mediaType === 'audio' && (
                    <audio 
                      src={mediaUrl} 
                      controls 
                      className="w-full"
                    />
                  )}
                  {mediaType === 'document' && (
                    <div className="bg-gray-200 p-2 rounded-lg">
                      <a 
                        href={mediaUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-800 text-sm flex items-center"
                      >
                        📄 Document
                      </a>
                    </div>
                  )}
                </div>
              )}
              {/* Text content */}
              {msgType === 'text' && (
                <p className="text-sm leading-relaxed break-words mb-0">{message.body}</p>
              )}
            </div>
            <div className="flex justify-start mt-1 ml-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Received</span>
                <span className="text-xs text-gray-400">{formatTime(message.date)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
