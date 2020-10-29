import React, {useState, Component, useEffect, useCallback} from 'react';
//  import { withRouter } from "react-router-dom";
//sidebar
import Home from "../../Home";

import { Input, Button ,message} from 'antd';

import {
    FormContainer,
    FormInnerContainer,
    FieldContainer,
} from './Account.styled';

import axios from 'axios';



function Account(props){
    const { userId } = props;

    const [response, setApiResponse] = useState();
    
    const [fieldValues , setFieldValues] = useState({
        name : '',
        // lastName: '',
        contact: '',
        email: '',
        organization: '',
        role: '',
        id: '',
    });


    const [isEditState, setIsEditState] = useState(false);

//     createdAt: null
// emailID: "akashmalla307@gmail.com"
// updatedAt: null
// userContactNo: "123"
// userID: 1
// userName: "akash"
    const setResponseToFormValues = (userData) => {
        console.log(userData)
        //setting api response to the form values
        setFieldValues({
            name : userData.userName || '',
        
            contact: userData.userContactNo || '',
            email: userData.emailID || '',
            organization: userData.orgName || '',
            role: userData.roleName || '',
            // id: response.id,
        });

    }

    
    const getUserDetails = useCallback(async () => {
        //console.log('Entered getUserDetails')
        //  await api call
        //console.log('Executing this function')
        
        const apiCallPromise = axios.get("/manageUser/?email_id=akashmalla307@gmail.com")
            .then(function (response1) {
                //console.log(response)
                if(response1.status === 200){
                    console.log(response1.data.data)
                return response1.data.data;
                } else{
                    console.log('error');
                }
            })
            .catch(function (error) {
                console.log(error);
            }); 
            
        apiCallPromise.then((apiResponse) => {

            console.log('apiResponse : ', apiResponse);
            
            //if (apiResponse && apiResponse.user) {
                setApiResponse(apiResponse);
                console.log('apiResponse : ', apiResponse);
                setResponseToFormValues(apiResponse);
           // }
        })
        //  setApiResponse(response);
            
    }, [userId]);
    
    useEffect(() => {
        getUserDetails();
    }, [getUserDetails]);

    
    const changeField = (value, fieldId) => {
        setFieldValues(
            {
                ...fieldValues,
                [fieldId]: value,
            }
        );
    }

    const saveEdit = () => {
        
        console.log('field values : ', fieldValues);
        console.log("hi im in save")
        const payload={
            "userName":fieldValues.name,
            "emailID":fieldValues.email,
            
            
            
        }
        console.log(payload);
        const reply = axios.patch("/manageUser/updateAccount",payload)
            .then(function (response) 
            {
            console.log(response)
            console.log(response.data)
            //console.log(response.data.data.name)
            //name1 = response.data.data.name
            console.log(response.data.status)
            //console.log(response.data.data.roleName)
            if(response.status === 200){
                
                if(response.data.status ==='error')
                {
                    console.log("qqqqqqqqqqqqq")
                    props.showError("User does not exists");
                }
                console.log("hiiiiiiiiiiii")
                props.showError(null)
            }
            
            })
            .catch(function (error) {
                console.log(error);
            });
            reply.then((response) => {
                message.success("Organisation successfully added");
                //this.props.updateListingData();
            })
    }

    const toggleEdit = () => {
        setIsEditState(!isEditState);
    }


    const cancelEdit = () => {
        setResponseToFormValues(response);
        
        toggleEdit();
    }

    return (
        <FormContainer>
            <FormInnerContainer>
            <FieldContainer>
            <p>{!isEditState? '' : 'Enter Name'}</p>
                    <Input
                        onChange={(event) => changeField(event.target.value, 'name')}
                        value={fieldValues.name}
                        disabled={!isEditState}
                        placeholder="Name"
                    />
                </FieldContainer>
                <FieldContainer>
                <p>{!isEditState  ? '' : 'Enter Email'}</p>
                    <Input
                        onChange={(event) => changeField(event.target.value, 'email')}
                        value={fieldValues.email}
                        disabled={!isEditState}
                        placeholder="Email"
                    />
                </FieldContainer>
                <FieldContainer>
                <p>{!isEditState ? '' : 'Enter Role'}</p>
                    <Input
                        onChange={(event) => changeField(event.target.value, 'role')}
                        value={localStorage.getItem('roleName')}
                        disabled={true}
                        placeholder="Role"
                    />
                </FieldContainer>
                <FieldContainer>
                <p>{!isEditState ? '' : 'Enter Organisation'}</p>
                    <Input
                        onChange={(event) => changeField(event.target.value, 'organisation')}
                        value={localStorage.getItem('orgName')}
                        disabled={true}
                        placeholder="Organisation"
                    />
                </FieldContainer>
                
                {isEditState ? (
                            <div>
                                <Button onClick={cancelEdit}>
                                    cancel
                                </Button>
                                <Button onClick={saveEdit}>
                                    Save
                                </Button>
                            </div>
                        ) : (
                            <Button onClick={toggleEdit}>
                                Edit
                            </Button>
                        )}
            </FormInnerContainer>
        </FormContainer>
    );

    // return(
        
    //     <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
    //         <form>
    //             <div className="form-group text-left">
                
    //             <input type="text" 
    //                    className="form-control" 
    //                    id="name" 
    //                    aria-describedby="emailHelp" 
    //                    //placeholder="Name" 
    //                    //value={state.password}
    //                    onChange={(event) => changeField(event.target.value, 'name')}
    //                    value={fieldValues.name}
    //                    disabled={!isEditState}
                       
    //             />
    //             <Input
    //                 onChange={(event) => changeField(event.target.value, 'name')}
    //                 value={fieldValues.name}
    //                 disabled={!isEditState}
    //                 placeholder="Name"
    //             />
    //             </div>

                

    //             <div className="form-group text-left">
                
    //             <input type="text" 
    //                    className="form-control" 
    //                    id="contact" 
    //                    aria-describedby="emailHelp" 
    //                    //placeholder="Last Name" 
    //                    //value={state.password}
                       
    //                    disabled={!isEditState}
    //                    onChange={(event) => changeField(event.target.value, 'contact')}
    //                    value={fieldValues.contact}
    //             />
    //             </div>

    //             <div className="form-group text-left">
                
    //             <input type="text" 
    //                    className="form-control" 
    //                    id="email" 
    //                 //    placeholder="email"
    //                     disabled={!isEditState}
    //                     onChange={(event) => changeField(event.target.value, 'email')}
    //                     value={fieldValues.email}
    //             />
    //             </div>

    //             <div className="form-group text-left">
                
    //             <input type="text" 
    //                    className="form-control" 
    //                    id="orgname" 
    //                 //    placeholder="Org Name"
    //                 //    value={state.confirmpassword}
                       
    //                    disabled={true}
    //                    onChange={(event) => changeField(event.target.value, 'organization')}
    //                    value={fieldValues.organization}
    //             />
    //             </div>

    //             <div className="form-group text-left">
                
    //             <input type="text" 
    //                    className="form-control" 
    //                    id="role" 
    //                 //    placeholder="Role"
    //                 //    value={state.confirmpassword}
                        
    //                    disabled={true}
    //                    onChange={(event) => changeField(event.target.value, 'role')} 
    //                    value={fieldValues.role}
    //             />
    //             </div>

                

    //             <div className="form-check">
    //             </div>
    //             {/* <button 
    //                 type="submit" 
    //                 className="btn btn-primary"
    //                 onClick={handleSubmitClick}
    //             >Edit</button> */}
    //             {/* edit */}
    //             <div>
    //                 {isEditState ? (
    //                     <div>
    //                         <Button onClick={cancelEdit}>
    //                             cancel
    //                         </Button>
    //                         <Button onClick={saveEdit}>
    //                             Save
    //                         </Button>
    //                     </div>
    //                 ) : (
    //                     <Button onClick={toggleEdit}>
    //                         Edit
    //                     </Button>
    //                 )}
    //             </div>
    //         </form>
            
    //         {/* <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
    //             {state.successMessage}
    //         </div> */}
            
    //     </div>
        
    // )
}
export default Account;