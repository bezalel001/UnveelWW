import React from 'react';
import styled from 'styled-components';

const AlertContainer = styled.div`
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`;
const AlertMessage = styled.div`
    color: #e05113;
`;

const AlertButton = styled.button`
    color: #ff170a;
    font-size: 120%;
    cursor: pointer;
    border: none;
    background-color: white;
`;

interface AlertProps {
    message: string;
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
    return (
        <>
            {message && (
                <AlertContainer>
                    <AlertMessage onClick={onClose}>{message}</AlertMessage>
                    <AlertButton onClick={onClose}>X</AlertButton>
                </AlertContainer>
            )}
        </>
    );
};

export default Alert;
