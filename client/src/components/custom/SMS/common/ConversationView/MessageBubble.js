import { IoCheckmark, IoCheckmarkDone } from 'react-icons/io5';
import ImageWithLoader from './ImageWithLoader';
import VideoWithLoader from './VideoWithLoader';
import { MESSAGE_DIRECTION, MESSAGE_STATUS } from '../../helpers';

const MessageBubble = ({ message, createdAt, mediaUrl, mediaType }) => {
  const isOutbound = message.direction === MESSAGE_DIRECTION.OUTBOUND;
  const isInbound = message.direction === MESSAGE_DIRECTION.INBOUND;
  const isDelivered = message.status === MESSAGE_STATUS.DELIVERED;

  const formatTime = (value) => {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getStatusIcon = () => {
    if (!isOutbound) return null;
    
    if (isDelivered) {
      return <IoCheckmarkDone className="w-3 h-3 text-blue-400" />;
    } else {
      return <IoCheckmark className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-3 px-4 py-2">
      {isOutbound && (
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
              {message.text && (
                <p className="text-sm leading-relaxed break-words mb-0">{message.text}</p>
              )}
            </div>
            <div className="flex justify-end mt-1 mr-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 min-w-[70px]">
                  {getStatusIcon()}
                  <span className="text-xs text-gray-400">
                    {isDelivered ? 'Delivered' : 'Sent'}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{formatTime(createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {isInbound && (
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
              {message.text && (
                <p className="text-sm leading-relaxed break-words mb-0">{message.text}</p>
              )}
            </div>
            <div className="flex justify-start mt-1 ml-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Received</span>
                <span className="text-xs text-gray-400">{formatTime(createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
