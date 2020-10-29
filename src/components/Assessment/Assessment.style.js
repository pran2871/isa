import styled from 'styled-components';
import { Button } from 'antd';

export const StudentNameContainer = styled.div`
    font-size: 24px;
    display: flex;
    font-weight: bold;
`;

export const FieldContainer = styled.div`
    margin: 15px 0;
`;

export const CommentFieldContainer = styled.div`
    margin: 15px 0;
    max-width: 350px;
`;

export const ButtonFieldContainer = styled.div`
    margin: 15px 0;
    display: flex;
    justify-content: flex-end;
`;

export const ButtonComponent = styled(Button)`
    margin-left: 10px;
`;