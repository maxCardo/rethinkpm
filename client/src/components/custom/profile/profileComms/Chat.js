import React, { useEffect,useRef, Fragment } from 'react'
import { connect } from 'react-redux';
import Loading from '../../../core/LoadingScreen/Loading'
import ChatUI from '../../Chat/common/ChatUI'
import {getActiveChat, sendChat} from '../../../../actions/profile'



const Chat = ({activeChat:{chat, loading}, activeProfile, getActiveChat, sendChat}) => {
    const chatRef = useRef()
    useEffect(() => {
        getActiveChat(activeProfile._id)
    }, [activeProfile])

    const onSend = (data) => {
        console.log('running on send');
        const message = {
            sender:'Admin', 
            content: data,
            userMessage:true
        }
        sendChat(chat.owner,message)
    }

    const scrollToBottom = () => {
        console.log('scroll to bottom')
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





