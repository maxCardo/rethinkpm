import { IoClose } from 'react-icons/io5';

const ConversationActionsModal = ({ 
  isOpen, 
  onClose, 
  type, // 'contact' or 'delete'
  contact, // contact data for contact info modal
  conversation, // conversation data for delete confirmation
  onConfirmDelete 
}) => {
  if (!isOpen) return null;

  const renderContactInfo = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <p className="text-gray-900">{contact.name}</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <p className="text-gray-900">{contact.phone || 'N/A'}</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <p className="text-gray-900">{contact.email || 'N/A'}</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <p className="text-gray-900">{contact.notes || 'No notes available'}</p>
      </div>
    </div>
  );

  const renderDeleteConfirmation = () => (
    <div className="space-y-4">
      <div className="text-center">
        <p className="mt-1 text-sm text-gray-500">
          Are you sure you want to delete the conversation with <span className="font-medium">{conversation.name}</span>? 
          This action cannot be undone.
        </p>
      </div>
    </div>
  );

  const getModalContent = () => {
    switch (type) {
      case 'contact':
        return {
          title: 'Contact Information',
          content: renderContactInfo(),
          actions: (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
              style={{ borderRadius: '8px' }}
            >
              Close
            </button>
          )
        };
      case 'delete':
        return {
          title: 'Confirm Delete',
          content: renderDeleteConfirmation(),
          actions: (
            <div className="flex space-x-3 gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
                style={{ borderRadius: '8px' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirmDelete(conversation);
                  onClose();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                style={{ borderRadius: '8px' }}
              >
                Delete
              </button>
            </div>
          )
        };
      default:
        return { title: '', content: null, actions: null };
    }
  };

  const { title, content, actions } = getModalContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {content}
        <div className="mt-6 flex justify-end">
          {actions}
        </div>
      </div>
    </div>
  );
};

export default ConversationActionsModal;
