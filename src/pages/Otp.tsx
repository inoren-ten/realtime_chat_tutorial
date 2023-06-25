import React, { useState } from 'react'
import styled from 'styled-components'
import { AllBox, AllContainer } from '../styles/Container';
import { rails } from '../App';

const Title = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1rem;
    span {
        color: #d90a27;
    }
`;

const InputBox = styled.div`
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.4rem;
    margin-top: 1.5rem;
`;

const Text = styled.p`
    margin: 0;
    padding: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #b0b2ab;
`;

const Input = styled.input`
    width: 100%;
    background-color: #000;
    font-size: 1.1rem;
    color: #b0b2ab;
    border: 1px solid #b0b2ab;
    padding: 0.2rem;
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
`;

const UnSubmitButton = styled(SubmitButton)`
    opacity: 0.5;
`;


function Otp() {
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        const newData = {email: email}
        rails.post('users/otp', newData)
        .then(resp => {
            console.log(resp.data)
        })
        .catch(e => {
            console.log(e)
        })
    };

    return (
        <AllContainer>
            <AllBox>
                <Title>メールアドレス</Title>
                <InputBox>
                    <Text>・メールアドレス</Text>
                    <Input
                        type='email'
                        value={email}
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                    />
                </InputBox>
                {email === '' ? (
                    <UnSubmitButton>登録</UnSubmitButton>
                ) : (
                    <SubmitButton onClick={handleSubmit}>登録</SubmitButton>
                )}
            </AllBox>
        </AllContainer>
    )
}

export default Otp
