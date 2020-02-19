import { UPDATE_CHATS, OPEN_CHAT, CLOSE_CHAT, OPEN_INQUIRY_CHAT, TOGGLE_OPEN_CHAT, ADD_AND_OPEN_CHAT, RECEIVE_MESSAGE } from '../actions/type';

const initialState = {chats: [], openChats: []};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_CHATS:
            return{
                ...state,
                chats: payload,
            }
        case OPEN_CHAT: 
            const openChats = state.openChats.slice()
            const chatsWithOpen = state.chats.slice().map((chatElement) => {
              if(chatElement.id == payload) {
                chatElement.open = true
              }
              return chatElement
            })
            openChats.push(payload)
            return {
              ...state,
              openChats,
              chats: chatsWithOpen
            }
        case CLOSE_CHAT:
            const chatsOpen = state.openChats.slice()
            const index = chatsOpen.findIndex((chatId) => chatId === payload)
            chatsOpen.splice(index, 1)
            return {
              ...state,
              openChats: chatsOpen
            }
        case OPEN_INQUIRY_CHAT:
            const {inquiryId, dispatch} = payload
            const openedChatsRightNow = state.openChats.slice()
            let chat;
            const chats = state.chats.slice().map((chatElement) => {
              if(chatElement.inquiryId == inquiryId) {
                chat = chatElement
                chatElement.open = true

              }
              return chatElement
            })
            if(chat) {
              const isAlreadyOpen = openedChatsRightNow.find((openChatId) => openChatId === chat.id)
              if(isAlreadyOpen) {
                return {
                  ...state,
                  chats,
                  openChats: openedChatsRightNow
                }
              } else {
                openedChatsRightNow.push(chat.id)
                return {
                  ...state,
                  chats,
                  openChats: openedChatsRightNow
                }
              }
            }else {
              fetch(`/api/rent_lead/chat/${inquiryId}`, {
                METHOD: 'GET',
              }).then((response) => response.json())
                .then((json) => dispatch({type: ADD_AND_OPEN_CHAT, payload: json }))
              return state
            }
        case ADD_AND_OPEN_CHAT: 
            let oldchats = state.chats.slice()
            const newChat = {
              id: payload._id,
              inquiryId: payload.inq ? payload.inq._id : '',
              name: payload.inq ? payload.inq.prospect.name : '' ,
              listing: payload.inq ? payload.inq.listing : '',
              unread: payload.unread,
              messages: payload.messages.map((message) => ({
                date: new Date(message.date),
                sender: message.from == 'User-SMS' ? payload.inq.prospect.name : message.from,
                content: message.message,
                userMessage: message.from !== 'User-SMS'
              })),
              notes: [],
              open: true
            }
            oldchats.push(newChat)
            const chatsOpened = state.openChats.slice()
            chatsOpened.push(newChat.id)
            return {
              ...state,
              chats: oldchats,
              openChats: chatsOpened
            }
        case TOGGLE_OPEN_CHAT:
            const chatId = payload
            const newChats = state.chats.map(chat => {
              if(chat.id == chatId) {
                chat.open = !chat.open
              }
              return chat
            })
            return {
              ...state,
              chats: newChats
            }
        case RECEIVE_MESSAGE:
          const {chat_id, message, uuid} = payload
          const chatsWithNewMessage = state.chats.map(chat => {
            if(chat.id == chat_id && chat.lastMessageProccessed !== uuid) {
              chat.messages.push({
                userMessage: false,
                sender: chat.name,
                content: message,
                date: new Date()
              })
              chat.lastMessageProccessed = uuid
              chat.unread = true
            }
            return chat
          })
          
          return {
            ...state,
            chats: chatsWithNewMessage
          }
        default:
            return state;
    }
}