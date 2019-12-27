import { UPDATE_CHATS, OPEN_CHAT, CLOSE_CHAT, OPEN_INQUIRY_CHAT, TOGGLE_OPEN_CHAT } from '../actions/type';

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
            openChats.push(payload)
            return {
              ...state,
              openChats
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
            const inquiryId = payload
            const openedChatsRightNow = state.openChats.slice()
            let chat;
            const chats = state.chats.slice().map((chatElement) => {
              if(chatElement.inquiryId == inquiryId) {
                chat = chatElement
                chatElement.open = true

              }
              return chatElement
            })
            console.log(inquiryId)
            console.log(chat)
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

            }
        case TOGGLE_OPEN_CHAT:
            const chatId = payload
            const newChats = state.chats.map(chat => {
              if(chat.id == chatId) {
                chat.open = !chat.open
              }
              return chat
            })
            console.log(newChats)
            return {
              ...state,
              chats: newChats
            }
        default:
            return state;
    }
}