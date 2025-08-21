import { useState } from 'react';

const VideoWithLoader = ({ src, className, style }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg z-10">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-sm text-gray-500">Loading video...</span>
          </div>
        </div>
      )}
      {hasError ? (
        <div className="flex items-center justify-center bg-gray-200 rounded-lg" style={style}>
          <div className="text-center p-4">
            <div className="text-gray-400 text-4xl mb-2">🎥</div>
            <p className="text-sm text-gray-500">Failed to load video</p>
          </div>
        </div>
      ) : (
        <video 
          src={src} 
          controls 
          className={className}
          style={style}
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default VideoWithLoader;
