import styled from 'styled-components';
import { Layout } from 'antd';

const { Sider } = Layout;

export const AppLayoutContainer = styled(Layout)`
    height: 100vh;
    width: 100vw;
    overflow: auto;
`;

export const AppLayoutSider = styled(Sider)`
    height: 100%;
`;

export const PageContainer = styled.div`
    padding: 15px;
    box-shadow: 10px 5px 10px #d8d8d8;
    border-radius: 3px;
    background: white;
`;