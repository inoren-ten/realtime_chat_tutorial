import React, { useEffect } from 'react'
import styled from 'styled-components'
import { AllBox, AllContainer } from '../styles/Container'
import ChatUnderbar from '../components/ChatUnderbar';
import { useSelector } from 'react-redux';
import { RootState, store } from '../redux/store';
import { getRoomChats, selectAllChats } from '../redux/chatsSlice';
import { useParams } from 'react-router-dom';
import MyChatBox from '../components/MyChatBox';
import OtherChatBox from '../components/OtherChatBox';

const ChatContainer = styled.div`
    width: 100%;
    height: calc(100% - 4rem);
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: flex-start;
`;

function Room() {
  const {id} = useParams();
  const rid: any = id;
  const roomId: number = parseInt(rid, 10);
  const status = useSelector((state: RootState) => state.chats.status);
  const chats = useSelector((state: RootState) => {
    const allChats = selectAllChats(state)
    return allChats.filter((chat) => {
      return chat.room_id === roomId;
    })
  });
  const currentUser: any = useSelector((state: RootState) => state.currentUser);

  useEffect(() => {
    store.dispatch(getRoomChats(roomId))
  }, []);

  return (
    <AllContainer>
        <AllBox>
            <ChatContainer>
            {status === 'successed' && (
              <>
              {chats.map((chat) => {
                if (chat.user_id === currentUser.id) {
                  return (
                    <React.Fragment key={chat.id}>
                      <MyChatBox body={chat.body} />
                    </React.Fragment>
                  )
                } else {
                  return (
                    <React.Fragment key={chat.id}>
                      <OtherChatBox body={chat.body} />
                    </React.Fragment>
                  )
                }
              })}
              </>
            )}
            </ChatContainer>
            <ChatUnderbar roomId={roomId} />
        </AllBox>
    </AllContainer>
  )
}

export default Room
