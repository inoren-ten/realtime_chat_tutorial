import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0.5rem;
`;

const ChatBox = styled.div`
    box-sizing: border-box;
    max-width: 60%;
    padding: 0.3rem 0.6rem;
    font-size: 1.3rem;
    font-weight: 500;
    word-break: break-all;
    color: #fff;
    background-color: rgb(0, 133, 171);
    border-radius: 0.5rem 1px 0.5rem 0.5rem;
`;

function MyChatBox(props: any) {
    const {body} = props;

    return (
        <Container>
            <ChatBox>{body}</ChatBox>
        </Container>
    )
}

export default MyChatBox
