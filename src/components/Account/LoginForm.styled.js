import styled from 'styled-components';

export const LoginContainer = styled.div`
    height: calc(100vh - 64px);
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LoginFormContainer = styled.div`
    width: 350px;
    border: 1px solid lightgray;
    padding: 20px;
    transform: translate(0, -50%);
`;

export const FieldContainer = styled.div`
    margin: 15px 0;
`;

export const ButtonFieldContainer = styled.div`
    margin: 35px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;