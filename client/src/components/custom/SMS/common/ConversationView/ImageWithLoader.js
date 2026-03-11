import { useState } from 'react';

const ImageWithLoader = ({ src, alt, className, style }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        </div>
      )}
      {hasError ? (
        <div className="flex items-center justify-center bg-gray-200 rounded-lg" style={style}>
          <div className="text-center p-4">
            <div className="text-gray-400 text-4xl mb-2">📷</div>
            <p className="text-sm text-gray-500">Failed to load image</p>
          </div>
        </div>
      ) : (
        <img 
          src={src} 
          alt={alt} 
          className={className}
          style={style}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default ImageWithLoader;
