import { useState, useRef } from 'react';
import { IoSend, IoAttach } from 'react-icons/io5';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSend = async () => {
    if ((message.trim() || selectedFile) && !isSending) {
      setIsSending(true);
      setIsTyping(false);
      
      // Simulate sending delay for animation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Call parent function to add message to conversation
      if (onSendMessage) {
        onSendMessage(message.trim(), selectedFile);
      }
      
      setMessage('');
      setSelectedFile(null);
      setIsSending(false);
    }
  };
  
  // Send message when enter key is pressed
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const maxLength = 160; // Standard SMS character limit
  const characterCount = message.length;
  const isOverLimit = characterCount > maxLength;

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      {/* File Input (hidden) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        className="hidden"
      />
      
      {/* Selected File Preview */}
      {selectedFile && (
        <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">📎 {selectedFile.name}</span>
              <span className="text-xs text-gray-400">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
            </div>
            <button
              onClick={removeSelectedFile}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-3">
        {/* Attach Button */}
        <button
          onClick={handleAttachClick}
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        >
          <IoAttach className="w-5 h-5" />
        </button>
        
        {/* Text Input Area */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className={`w-full resize-none border border-gray-300 rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              isOverLimit ? 'border-red-300 focus:ring-red-500' : ''
            }`}
            rows="1"
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          
          {/* Character Counter */}
          <div className="absolute bottom-2 right-3">
            <span className={`text-xs ${
              isOverLimit ? 'text-red-500' : 
              characterCount > maxLength * 0.8 ? 'text-yellow-500' : 'text-gray-400'
            }`}>
              {characterCount}/{maxLength}
            </span>
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={(!message.trim() && !selectedFile) || isOverLimit || isSending}
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform ${
            (message.trim() || selectedFile) && !isOverLimit && !isSending
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          } ${isSending ? 'animate-pulse bg-blue-500' : ''}`}
        >
          <IoSend className={`w-5 h-5 transition-transform duration-300 ${isSending ? 'animate-bounce' : ''}`} />
        </button>
      </div>

      {/* Typing Indicator */}
      {isTyping && (
        <div className="mt-2 text-xs text-gray-500 animate-pulse">
          Typing...
        </div>
      )}

      {/* Sending Indicator */}
      {isSending && (
        <div className="mt-2 text-xs text-blue-500 animate-pulse">
          Sending...
        </div>
      )}

      {/* Error Message */}
      {isOverLimit && (
        <div className="mt-2 text-xs text-red-500">
          Message exceeds {maxLength} character limit
        </div>
      )}
    </div>
  );
};

export default MessageInput;