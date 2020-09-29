import React, { useEffect,useRef, Fragment } from 'react'
import { connect } from 'react-redux';
import Loading from '../../../core/LoadingScreen/Loading'
import ChatUI from '../../Chat/common/ChatUI'
import {getActiveChat, sendChat} from '../../../../actions/profile'



const Chat = ({activeChat:{chat, loading}, activeProfile, getActiveChat, sendChat, profileType}) => {
    const chatRef = useRef()

    useEffect(() => {
        getActiveChat(activeProfile._id)    
    }, [activeProfile])

    const onSend = (data) => {
      activeProfile.profileType = profileType
        const message = {
            sender:'Admin', 
            content: data,
            userMessage:true
        }
        sendChat(activeProfile._id, {message, activeProfile})
    }

    const scrollToBottom = () => {
      
    }
    
    return loading ? <Loading/> : 
        <Fragment>   
            <ChatUI
                messages={chat.messages ? chat.messages: []}
                onSendMessage={onSend}
                botOn={chat.botOn}
                chatRef = {chatRef}
                scrollToBottom = {scrollToBottom}
            />
        </Fragment>
    }


const mapStateToProps = state => ({
    activeChat: state.profile.activeChat,
    activeProfile: state.profile.activeProfile 
})

export default connect(mapStateToProps, {getActiveChat, sendChat})(Chat)





