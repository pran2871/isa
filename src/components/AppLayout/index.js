/**
 *
 * AppLayout
 *
 */

import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon , Dropdown, Button} from 'antd';

import {
    AppLayoutContainer,
} from './AppLayout.styled';

import Landing from '../Landing/Landing';
import Account from '../Account/Account';
import ManageOrg from '../ManageOrg';
import ManageUser from '../ManageUser/ListUsers';
import ManageStudents from '../ManageStudents';
import Assessment from '../Assessment';
import ManageQuestions from '../ManageQuestions';
import ManageTemplates from '../ManageTemplates';

import {
    AppLayoutSider,
    PageContainer,
} from './AppLayout.styled';

import { DownOutlined } from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;
class AppLayout extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            isSliderCollapsed: false,
        }
    }


    handleSignoutClick = () => {
        console.log("sign out click");
        this.props.history.push(`/login`);
    }

    handleAccountClick = () => {
        console.log("account click");
        this.props.history.push(`/account`);
    }

    handleCollapse = () => {
        this.setState({ isSliderCollapsed: !this.state.isSliderCollapsed });
    }

    render() {

        
        const userType = localStorage.getItem('roleName');
        //const userType = 'superAdmin';
        const routes = [
            {
                path: '/dashboard',
                name: 'Dashboard',
                icon: 'dashboard',
                component: Landing,
                validUsers: ['superadmin', 'admin', 'coach']
            },
            // {
            //     path: '/account',
            //     name: 'Profile',
            //     icon: 'user',
            //     component: Account,
            //     validUsers: ['superAdmin', 'admin', 'coach']
            // },
            {
                path: '/manageUser',
                name: 'Manage Users',
                icon: 'team',
                component: ManageUser,
                validUsers: ['superadmin', 'admin']
            },
            {
                path: '/manageOrganizations',
                name: 'Manage Organizations',
                icon: 'global',
                component: ManageOrg,
                validUsers: ['superadmin']
            },
            {
                path: '/manageTemplates',
                name: 'Manage Templates',
                icon: 'book',
                component: ManageTemplates,
                validUsers: ['superadmin', 'admin','coach']
            }, {
                path: '/manageStudents',
                name: 'Manage Students',
                icon: 'user',
                component: ManageStudents,
                validUsers: ['superadmin', 'admin', 'coach']
            }, {
                path: '/assessment',
                name: 'Manage Assessment',
                icon: 'book',
                component: Assessment,
                validUsers: ['superadmin', 'admin', 'coach'],
                hasChildren: true,
            }, {
                path: '/manageQuestions',
                name: 'Manage Questions',
                icon: 'question-circle',
                component: ManageQuestions,
                validUsers: ['superadmin', 'admin', 'coach'],
            }
        ];

        const filteredRoutes = routes.filter((routeData) => routeData.validUsers.indexOf(userType) >= 0);

        const splitArray = this.props.location.pathname.split('/');

        let displayUrl = splitArray[splitArray.length - 1];

        displayUrl = displayUrl.replace(/([A-Z])/g, (x, y) => " " + y.toUpperCase()).replace(/\s/, " ").trim();
        displayUrl = displayUrl.charAt(0).toUpperCase() + displayUrl.slice(1);

        const NotFoundPage = props => {

            return (
                <div>
                    page nor found
                </div>
            );
        };

        const menu = (
            <Menu>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" onClick={this.handleAccountClick} >
                  Profile
                </a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" onClick={this.handleSignoutClick} >
                  Sign out
                </a>
              </Menu.Item>

            </Menu>
          );

        return (
            <AppLayoutContainer>
                <AppLayoutSider
                    breakpoint="sm"
                    collapsible
                    collapsed={this.state.isSliderCollapsed}
                    onCollapse={this.handleCollapse}
                    width='230px'
                >
                    <Header style={{ padding: '0', height: '55px', color: 'white' }}>
                        {/* we can have img here */}
                        <div>
                            ISA
                        </div>
                    </Header>
                    <Menu
                        theme="dark"
                        mode="inline"
                        // selectedKeys={currentPath.match(/\//g).length === 1 ? [getRoute('dashboard').url] : [this.getKey(currentPath, '/', 3)]}
                        // defaultOpenKeys={['/app']}
                    >
                        {filteredRoutes.map((route) => (
                            <Menu.Item key={route.path}>
                                <Link to={route.path} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Icon type={route.icon} />
                                    <span>{route.name}</span>

                                </Link>

                            </Menu.Item>
                        ))}

                    </Menu>

                </AppLayoutSider>
                <Layout>
                    <Header style={{ color: 'white' }}>
                        {displayUrl}

                        <Dropdown overlay={menu} placement="topRight" style={{marginLeft:200}}  >
                            <Button style={{marginRight:-400, marginLeft:400}}>Account</Button>
                        </Dropdown>

                    </Header>

                    <Content style={{ margin: '16px', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
                        <Switch>
                            <PageContainer>
                                {filteredRoutes.map((route) => (
                                    <Route
                                        exact={!route.hasChildren}
                                        key={route.path}
                                        path={route.path}
                                        component={route.component}
                                    />
                                ))}
                                <Route
                                    exact
                                    path="/account"
                                    component={Account}
                                />
                            </PageContainer>
                        </Switch>
                    </Content>
                </Layout>
            </AppLayoutContainer>
        )
    }
}


export default AppLayout;
