import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { rails } from '../App';
import { useDispatch } from 'react-redux';
import { createRoom } from '../redux/roomsSlice';

const Background = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    background-color: rgba(0, 133, 171, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Form = styled.div`
    box-sizing: border-box;
    width: 40rem;
    min-height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.2rem 0.8rem;
    border-radius: 1rem;
    background-color: #fff;
    position: relative;
`;

const CloseButton = styled.div`
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.3rem;
    border-radius: 100vh;
    background-color: #b0b2ab;
    font-size: 2rem;
    font-weight: 600;
    color: #2b2d30;
    cursor: pointer;
`;

const Title = styled.p`
    margin: 0.5rem 0;
    padding: 0;
    font-size: 1.6rem;
    font-weight: 600;
    color: #2b2d30;
    span {
        color: #d90a27;
    }
`;

const UserBox = styled.div`
    box-sizing: border-box;
    width: 98%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.1rem;
    padding: 0.4rem 1rem;
    border-radius: 1rem;
    cursor: pointer;
    &:hover {
        background-color: rgb(183, 183, 182);
    }
`;

const Name = styled.p`
    margin: 0;
    padding: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #2b2d30;
`;

const MembersContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.3rem;
    padding-left: 0.4rem;
    margin-bottom: 0.3rem;
    overflow-x: auto;
`;

const MemberBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem 0.5rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: #2b2d30;
    border: 1px solid #b0b2ab;
    border-radius: 100vh;
`;

const Input = styled.input`
    width: 98%;
    border: 1px solid #b0b2ab;
    font-size: 1.1rem;
    color: #2b2d30;
    padding: 0.2rem 0.5rem;
`;

const SubmitButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    padding: 0.2rem 1rem;
    margin: 2rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: #fff;
    background-color: #d90a27;
    border-radius: 100vh;
    cursor: pointer;
`;

const UnSubmitButton = styled(SubmitButton)`
    opacity: 0.4;
`;

function CreateRoomModal(props: any) {
  const {onClose} = props;
  const dispatch = useDispatch();
  type Users = {
    id: number,
    name: string,
    uid: string
  };
  const [name, setName] = useState('');
  const [users, setUsers] = useState<Users[]>([]);
  const [members, setMembers] = useState<Users[]>([]);

  const handleSelect = (id: number, name: string, uid: string) => {
    const newData = {id: id, name: name, uid: uid}
    setMembers([...members, newData])
    setUsers(users.filter(user => user.id !== id))
  };

  const handleSend = () => {
    const users = members.map((member) => {
        return member.id
    })
    const newData = {name: name, users: users}
    console.log(users)
    rails.post('rooms/create', newData)
    .then(resp => {
        dispatch(createRoom(resp.data))
        onClose()
    })
    .catch(e => {
        console.log(e)
    })
  };

  useEffect(() => {
    rails.get('users/index')
    .then(resp => {
        setUsers(resp.data)
    })
    .catch(e => {
        console.log(e)
    })
  }, []);

  return (
    <Background>
        <Form>
            <CloseButton onClick={onClose}>×</CloseButton>
            <Title>ルームを<span>作成</span></Title>
            <Input
                type='text'
                placeholder='ルーム名を入力'
                value={name}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)}
            />
            {members.length !== 0 && (
                <MembersContainer>
                {members.map(member => {
                    return (
                        <MemberBox key={member.id}>{member.name}</MemberBox>
                    )
                })}
                </MembersContainer>
            )}
            {users.map((user) => {
                return (
                    <UserBox key={user.id} onClick={() => handleSelect(user.id, user.name, user.uid)}>
                        <Name>・{user.name}</Name>
                    </UserBox>
                )
            })}
            {(name === '' || members.length === 0) ? (
                <UnSubmitButton>作成</UnSubmitButton>
            ) : (
                <SubmitButton onClick={handleSend}>作成</SubmitButton>
            )}
        </Form>
    </Background>
  )
}

export default CreateRoomModal
