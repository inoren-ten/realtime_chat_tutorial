import React from 'react'
import styled from 'styled-components'
import { currentuserKey, key } from '../key';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/currentUserSlice';
import { RootState } from '../redux/store';

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 3.5rem;
    position: fixed;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Box = styled.div`
    box-sizing: border-box;
    width: 40rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 0.5rem;
    border-bottom: 1px solid #b0b2ab;
    background-color: #000;
`;

const LogoutButton = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem 0.7rem;
    font-size: 1.3rem;
    font-weight: 600;
    background-color: #d90a27;
    border-radius: 100vh;
    cursor: pointer;
`;

function Header() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.currentUser);
    console.log(currentUser);

    const handleLogout = () => {
        localStorage.removeItem(key)
        localStorage.removeItem(currentuserKey)
        dispatch(logout())
    };

  return (
    <Container>
        <Box>
        {currentUser && (
            <LogoutButton onClick={handleLogout}>LogOut</LogoutButton>
        )}
        </Box>
    </Container>
  )
}

export default Header
