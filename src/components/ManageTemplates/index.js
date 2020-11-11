/**
 *
 * ManageTemplates
 *
 */

import { Button, Icon, message, Popconfirm, Table, Tooltip } from 'antd';
import axios from 'axios';
import React from 'react';
import {
    filterArray
} from '../../utils/utilityFunctions';
import './manageTemplate.css';
import {
    ActionContainer, IconContainer, InputField, InputFilterContainer
} from './ManageTemplates.styled';
import ManageTemplatesCreateEditModal from './ManageTemplatesCreateEditModal';



const MAX_CHAR_TO_ELIPSE = 10;

class ManageTemplates extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            filterValue: '',
            dataSource: [],
            addEditModalStatus: '',
            addEditingTemplateData: null,
            deleteData: null,

        }
    }

    componentDidMount() {
        this.getTemplateListApiCAllFunction();
    }

    getTemplateListApiCAllFunction = () => {
        //  ToDo: api call for the list of templates data and save the data in this.state.dataSource

        console.log("inside getTemplateApi Call function 2")
        // http://localhost:8080/manageTemplate
        const apiCallPromise = axios.get("/manageTemplate", { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') } })
            .then(function (response) {
                console.log(response)
                console.log(response.status)
                console.log("response", response.data)
                //console.log(this.state.dataSource)
                console.log("pran")
                if (response.status === 200) {
                    //this.setState({ dataSource: response.data.data });
                    //this.state.dataSource = response.data.data;
                    return response.data;
                } else {
                    console.log('error');
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        // using .then, create a new apiCallPromise which extracts the data
        apiCallPromise.then((response) => {

            console.log('response.data.data : ', response);
            // [{name: 'a', b: 'b'}, {name: 'c', d: 'd'}]

            this.setState({ dataSource: response });
        })

    }

    changeFilter = (event) => {
        this.setState({ filterValue: event.target.value });
    }

    editTemplatetData = (data) => {
        alert(data.templateName)
        this.setState({
            addEditModalStatus: 'edit',
            addEditingTemplateData: data,

        });
    }

    createNewTemplate = () => {
        this.setState({ addEditModalStatus: 'add' });
    }
    cancelAddEdit = () => {
        this.setState({
            addEditModalStatus: '',
            addEditingTemplateData: null
        });
    }


    deleteTemplate = (data) => {
        //  ToDo: delete api call
        console.log("delete" + data)
        this.setState({
            addEditModalStatus: '',
            deleteData: data
        });
        console.log(this.state.deleteData)
        console.log(data)
        //?email_id="+payload.email
        const apiCallPromise = axios.delete("manageTemplate/" + data, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') } })
            .then(function (response) {
                console.log("inside delete function")
                console.log(response)
                console.log(response.status)
                console.log(response.data.data)
                //console.log(this.state.dataSource)
                console.log("akash")
                if (response.status === 200) {
                    //this.setState({ dataSource: response.data.data });
                    //this.state.dataSource = response.data.data;
                    return response.data.data;
                } else {
                    console.log('error');
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        apiCallPromise.then((response) => {
            message.success("Template successfully deleted");
            this.getTemplateListApiCAllFunction();
        })


    }

    updateListingData = () => {
        console.log("inside the index page");
        this.getTemplateListApiCAllFunction();
        this.cancelAddEdit();
    }

    render() {

        const manageTemplatesColumns = [
            {
                title: 'Template Name',
                dataIndex: 'templateName',
                key: 'templateName',
            },
            {
                title: 'Created By',
                dataIndex: 'createdBY.userName',
                key: 'createdBY',
            },
            {
                title: 'Assigned To',
                dataIndex: 'assignedTo',
                key: 'assignedTo',
                render: (assignedTo) => {
                    const fullText = assignedTo.map(ob => ob.userName).toString();
                    return <Tooltip placement='bottomLeft' title={<div>{assignedTo.map(ob => {
                        return <React.Fragment>{ob.userName} <br /></React.Fragment>
                    })}</div>}>
                        <span style={{ cursor: 'default' }}>{fullText.substr(0, MAX_CHAR_TO_ELIPSE) + '...'}</span>
                    </Tooltip>
                }
            },
            {
                title: 'Total Questions',
                dataIndex: 'questionsList.length',
                key: 'questionsList.length',
            },

            {
                title: 'Actions',
                dataIndex: 'templateID',
                key: 'templateID',
                render: (templateID, templateData) => {
                    return (
                        <ActionContainer>
                            <IconContainer>
                                <Popconfirm
                                    title={'Are you sure you want to delete template ?'}
                                    onConfirm={() => this.deleteTemplate(templateID)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Icon type={'delete'} />
                                </Popconfirm>
                            </IconContainer>
                            <IconContainer>
                                <Icon type={'edit'} onClick={() => this.editTemplatetData(templateData)} />
                            </IconContainer>
                        </ActionContainer>
                    );
                }
            },
        ];

        const { filterValue, dataSource, addEditModalStatus = '', addEditingTemplateData } = this.state;

        let filteredDataSource = dataSource;

        if (filterValue && filterValue.length) {
            filteredDataSource = filterArray(dataSource, filterValue, ['templateName', 'createdBY.userName']);
        }

        return (
            <div>
                <InputFilterContainer>
                    <InputField
                        onChange={this.changeFilter}
                        value={filterValue}
                        placeholder="Enter Filter"
                    />
                    <Button
                        type="primary"
                        onClick={this.createNewTemplate}
                    >
                        Create Template
                    </Button>
                </InputFilterContainer>
                <Table
                    dataSource={filteredDataSource}
                    columns={manageTemplatesColumns}
                />
                {addEditModalStatus && addEditModalStatus.length ? (
                    <ManageTemplatesCreateEditModal
                        addEditModalStatus={addEditModalStatus}
                        addEditingTemplateData={addEditingTemplateData}
                        cancelAddEdit={this.cancelAddEdit}
                        updateListingData={this.updateListingData}
                    />
                ) : null}




            </div>
        )
    }
}


export default ManageTemplates;