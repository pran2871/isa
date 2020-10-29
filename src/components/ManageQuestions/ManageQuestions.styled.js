import styled from 'styled-components';
import SelectDropDownComponent from '../SelectDropDownComponent';
import { Input } from 'antd';

export const QuestionHeaderContainer = styled.div`
    margin-bottom: 35px;
    display: flex;
    justify-content: space-between;
`;

export const TableHeaderContainer = styled.div`
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
`;

export const InputField = styled(Input)`
    max-width: 350px;
`;

export const SkillSelectionContainer = styled.div`
    display: flex;
    width: 500px;
`;

export const SelectDropDownComponentWrapper = styled(SelectDropDownComponent)`
    margin-right: 15px;
`;

export const FieldContainer = styled.div`
    margin: 15px 0;
`;

export const IconContainer = styled.div`
    padding: 5px 10px;
`;

export const ActionContainer = styled.div`
    display: flex;
`;