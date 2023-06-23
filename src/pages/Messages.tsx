import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AllBox, AllContainer, Text } from '../styles/Container'
import CreateRoomModal from '../components/CreateRoomModal';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms, selectAllRooms } from '../redux/roomsSlice';
import { RootState } from '../redux/store';
import RoomBox from '../components/RoomBox';

const RoomIndex = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 3.5rem;
`;

const CreateBar = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem 1rem;
    border-bottom: 1px solid #b0b2ab;
`;

const CreateButton = styled.div`
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.3rem;
    border-radius: 100vh;
    font-size: 1rem;
    font-weight: 600;
    background-color: #b0b2ab;
    color: #000;
    cursor: pointer;
`;

function Messages() {
    const [createModal, setCreateModal] = useState(false);
    const dispatch = useDispatch();
    const rooms = useSelector(selectAllRooms);
    const status = useSelector((state: RootState) => state.rooms.status);

    type ModalProps = {
        onClose: () => void
    };

    function handleCreateModal(): void {
        setCreateModal(!createModal)
    };

    useEffect(() => {
        dispatch<any>(getRooms())
    }, [dispatch]);

    return (
        <>
        <AllContainer>
            <AllBox>
                <RoomIndex>
                    <CreateBar>
                        <Text>ルームを作成</Text>
                        <CreateButton onClick={handleCreateModal}>＋</CreateButton>
                    </CreateBar>
                {status === 'successed' && (
                    <>
                    {rooms.map((room) => {
                        return (
                            <React.Fragment key={room.id}>
                            <RoomBox
                                    id={room.id}
                                    name={room.name}
                                    created_at={''}
                                    updated_at={''}                            />
                            </React.Fragment>
                        )
                    })}
                    </>
                )}
                </RoomIndex>
            </AllBox>
        </AllContainer>
        {createModal && <CreateRoomModal onClose={handleCreateModal} />}
        </>
    )
}

export default Messages
