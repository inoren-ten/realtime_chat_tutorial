import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { rails } from '../App';
import { useDispatch } from 'react-redux';
import { createChat } from '../redux/chatsSlice';

const Container = styled.div`
  width: 100%;
  height: 4rem;
  border-top: 1px solid #b0b2ab;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const InputBox = styled.div`
  box-sizing: border-box;
  width: 80%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #b0b2ab;
  border-radius: 100vh;
  padding: 0.1rem 0.7rem;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  color: #b0b2ab;
  background-color: #000;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100vh;
  font-size: 1.3rem;
  color: #fff;
  background-color: rgb(0, 133, 171);
  padding: 0.2rem 0.6rem;
  cursor: pointer;
`;

const UnSubmitButton = styled(SubmitButton)`
  opacity: 0.4;
  cursor: default;
`;

function ChatUnderbar(props: any) {
  const {roomId} = props;
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleSend = () => {
    const newData = {room_id: roomId, body: input}
    rails.post('chats/create', newData)
    .then(resp => {
      dispatch(createChat(resp.data))
      setInput('')
    })
    .catch(e => {
      console.log(e)
    })
  };

  return (
    <Container>
      <InputBox>
        <Input
          type='text'
          value={input}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setInput(e.target.value)}
        />
      </InputBox>
      {input === '' ? (
        <UnSubmitButton>Go</UnSubmitButton>
      ) : (
        <SubmitButton onClick={handleSend}>Go</SubmitButton>
      )}
    </Container>
  )
}

export default ChatUnderbar
