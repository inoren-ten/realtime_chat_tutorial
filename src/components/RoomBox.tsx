import React from 'react'
import styled from 'styled-components'
import { Room } from '../redux/roomsSlice';
import { Link } from 'react-router-dom';

const Box = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding: 0.3rem 1rem;
`;

const NameBox = styled.p`
    margin: 0;
    padding: 0;
    font-size: 1.4rem;
    font-weight: 600;
`;

function RoomBox(props: Room) {
    const {id, name} = props;

    return (
        <Link to={`/room/${id}`} style={{width: '100%', textDecoration: 'none', color: '#fff'}}>
            <Box>
                <NameBox>{name}</NameBox>
            </Box>
        </Link>
    )
}

export default RoomBox
