// /**
//  *
//  * AssessmentStudentSelectionPage
//  *
//  */

// import React from 'react';

// class AssessmentStudentSelectionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
//     constructor(props) {
//         super(props);
//         this.state = {
//         }
//     }


//     render() {

//         console.log('props : ', this.props.match.params);

//         return (
//             <div>
//                 assessment listing page
//             </div>
//         )
//     }
// }


// export default AssessmentStudentSelectionPage;

/**
 *
 * ManageStudents
 *
 */

import React from 'react';
import { Table, Button, Icon, Popconfirm, message } from 'antd';
import axios from 'axios';
import {
    manageStudentsApiResponse,
} from './ManageStudents.constants';

import ManageStudentsAddEditModal from './ManageStudentsAddEditModal';

import {
    filterArray,
} from '../../utils/utilityFunctions';

import {
    InputFilterContainer,
    InputField,
    IconContainer,
    ActionContainer,
} from './ManageStudents.styled';

class ManageStudents extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            filterValue: '',
            dataSource: [],
            addEditModalStatus: '',
            addEditingStudentData: null,
            
        }
    }

    componentDidMount() {
        this.getStudentListApiCAllFunction();
    }

    getStudentListApiCAllFunction = () => {
       

       // http://localhost:8080/manageStudents/getAll
        const apiCallPromise = axios.get("/manageStudents/getAll")
        .then(function (response) {
            console.log(response)
            console.log(response.status)
            console.log(response.data.data)
            //console.log(this.state.dataSource)
            console.log("akash")
        if(response.status === 200){
            //this.setState({ dataSource: response.data.data });
            //this.state.dataSource = response.data.data;
            return response.data.data;
        } else{
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


      const parsedData  = response.map((rowData) => {
        return Object.values(rowData).map((value) => `${value}`);
      });
      console.log('setting data : ', parsedData);
      this.setState({ dataSource: response });
    })

    }

    //deleteStudent = (studentId) => {
    startNewAssessment = (data) =>{
        this.setState({
            addEditingStudentData: data
        });
        console.log("start new assess"+this.state.addEditingStudentData);
       // this.props.history.push(`/assessment/:${data}`); 
       this.props.history.push(`/assessment/`+data); 
    }

    pastAssessment = (studentReferenceNumber) =>{
        console.log("past assess");
        this.props.history.push('/pastAssessment'); 
    }

    changeFilter = (event) => {
        this.setState({ filterValue: event.target.value });
    }

    editStudentData = (data) => {
        this.setState({
            addEditModalStatus: 'edit',
            addEditingStudentData: data
        });
    }

    createNewStudent = () => {
        this.setState({ addEditModalStatus: 'add' });
    }

    cancelAddEdit = () => {
        this.setState({
            addEditModalStatus: '',
            addEditingStudentData: null
        });
    }

    deleteStudent = (studentId) => {
       
        console.log("delete")
        const apiCallPromise = axios.get("manageOrganization/delete/")
        .then(function (response) {
            console.log(response)
            console.log(response.status)
            console.log(response.data.data)
            //console.log(this.state.dataSource)
            console.log("akash")
        if(response.status === 200){
            //this.setState({ dataSource: response.data.data });
            //this.state.dataSource = response.data.data;
            return response.data.data;
        } else{
            console.log('error');
        }
    })
    .catch(function (error) {
        console.log(error);
    });
        message.success('Student successfully deleted');
        this.getStudentListApiCAllFunction();
    }

    updateListingData = () => {
        this.getStudentListApiCAllFunction();
        this.cancelAddEdit();
    }

    render() {

        const manageStudentsColumns = [
            {
                title: 'Name',
                dataIndex: 'studentName',
                key: 'studentName',
            },
            {
                title: 'Reference ID',
                dataIndex: 'studentReferenceNumber',
                key: 'studentReferenceNumber',
            },
            // {
            //     title: 'Address',
            //     dataIndex: 'studentContactNo',
            //     key: 'studentContactNo',
            // },
            {
                title: 'Organization Name',
                dataIndex: 'orgID',
                key: 'organization',
            },
            {
                title: 'Coach Name',
                dataIndex: 'userID',
                key: 'userID',
            },
            {
                title: 'Actions',
                dataIndex: 'studentID',
                key: 'studentID',
                render: (studentID) => <button onClick={() => this.startNewAssessment(studentID)} >Start New Assessment</button>,
            },
            {
                title: '',
                dataIndex: '',
                key: '',
                render: () => <button onClick={() => this.pastAssessment()}>Past Assessment</button>,
            },
        ];

        const { filterValue, dataSource, addEditModalStatus = '', addEditingStudentData } = this.state;

        let filteredDataSource = dataSource;

        if (filterValue && filterValue.length) {
            filteredDataSource = filterArray(dataSource, filterValue, ['studentName', 'studentReferenceNumber', 'studentContactNo', 'organization.orgName', 'userID']);
        }

        return (
            <div>
                <InputFilterContainer>
                    <InputField
                        onChange={this.changeFilter}
                        value={filterValue}
                        placeholder="Enter Filter"
                    />
                    
                </InputFilterContainer>
                <Table
                    dataSource={filteredDataSource}
                    columns={manageStudentsColumns}
                />
                {addEditModalStatus && addEditModalStatus.length ? (
                    <ManageStudentsAddEditModal
                        addEditModalStatus={addEditModalStatus}
                        addEditingStudentData={addEditingStudentData}
                        cancelAddEdit={this.cancelAddEdit}
                        updateListingData={this.updateListingData}
                    />
                ) : null}
            </div>
        )
    }
}


export default ManageStudents;

