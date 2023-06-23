import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem;
`;

const ChatBox = styled.div`
    box-sizing: border-box;
    max-width: 60%;
    padding: 0.3rem 0.6rem;
    font-size: 1.3rem;
    font-weight: 500;
    word-break: break-all;
    color: #2b2d30;
    background-color: rgb(183, 183, 182);
    border-radius: 1px 0.5rem 0.5rem 0.5rem;
`;

function OtherChatBox(props: any) {
    const {body} = props;

    return (
        <Container>
            <ChatBox>{body}</ChatBox>
        </Container>
    )
}

export default OtherChatBox
