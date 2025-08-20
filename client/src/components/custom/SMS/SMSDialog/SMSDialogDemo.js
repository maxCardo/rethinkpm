import React, { useState } from 'react';
import SMSDialog from './SMSDialog';
import { conversations } from '../SMSManager/mockData';

const SMSDialogDemo = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  const handleOpenDialog = (conversationId) => {
    setSelectedConversationId(conversationId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedConversationId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">SMS Dialog Demo</h2>
      
      {/* Conversation Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => handleOpenDialog(conversation.id)}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-darkBlue rounded-full flex items-center justify-center text-white font-medium">
                {conversation.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{conversation.name}</h3>
                <p className="text-sm text-gray-500">{conversation.lastMessage}</p>
                {conversation.unreadCount > 0 && (
                  <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">How to use SMSDialog:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Click on any conversation above to open the SMS dialog</li>
          <li>• The dialog shows the conversation view without the conversation list</li>
          <li>• You can send new messages and see the conversation history</li>
          <li>• Click the X button or outside the dialog to close it</li>
        </ul>
      </div>

      {/* SMS Dialog */}
      <SMSDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        conversationId={selectedConversationId}
      />
    </div>
  );
};

export default SMSDialogDemo;
