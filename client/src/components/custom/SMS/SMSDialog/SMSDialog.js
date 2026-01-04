import React, { useMemo, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { IoClose } from 'react-icons/io5';
import ConversationView from '../common/ConversationView';
import Loading from '../../../core/LoadingScreen/circularProgress'

const SMSDialog = ({isOpen, onClose, onSendMessage, contact, sms,}) => {

  const [messages, setMessages] = useState([])
  const [chat , setChat] = useState([])


  useEffect(() => {
    const recPrimeNum = contact.phoneNumbers.find(num => num.isPrimary === true).number
    console.log('rec prime num: ', recPrimeNum)
    console.log('this is the smsList: ', sms.list)
    sms.list.forEach(chat => {
      console.log('parsing all chat ')
      console.log(chat.primeNum, recPrimeNum)
      //console.log(chat.primeNum === recPrimeNum)
    });
    const chat = sms.list.find(x => x.primeNum === recPrimeNum)
    console.log('this is the chat: ', chat) 
    setMessages(chat?.msg ? chat.msg : [])
    setChat(chat)
  },[sms])

  //ToDO: Add action function to mark chat as read
  //console.log('smsD params: ', {isOpen, onClose, onSendMessage, contact, messages})
  //seems to be funciton that would obscure a bug (12/3/25ap)
  const resolvedMessages = useMemo(
    () => (Array.isArray(messages) ? messages : []),
    [messages]
  );

  //redundent with default value in props in additon also seems like a funciton that would obscure bug (12/3/25ap)
  const resolvedContact = contact || null;

  const messageCount = resolvedMessages.length;

  // Don't render if not open
  if (!isOpen) return null;

  return sms.loading ? (
    <Loading/>
  ) : (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      {console.log('data: ', messages, chat)}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            <div className="w-10 h-10 bg-darkBlue rounded-full flex items-center justify-center text-white font-medium">
              {contact ? contact.fullName.charAt(0).toUpperCase() : '?'}
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {contact ? contact.fullName : 'Contact'}
              </h3>
              <p className="text-sm text-gray-500">
                {contact ? `${messageCount} message${messageCount === 1 ? '' : 's'}` : 'No messages'}
              </p>
            </div>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        {/* Conversation View */}
        <div className="flex-1 overflow-hidden">
          <ConversationView
            chat = {chat}
            selectedContact={contact}
            messages={messages}
            onSendMessage={onSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sms: state.leaseLeads.sms,
});

export default connect(mapStateToProps)(SMSDialog)
