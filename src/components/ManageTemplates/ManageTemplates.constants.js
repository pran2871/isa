export const manageStudentsApiResponse = {
    "status": "success",
    "message": "Student list found",
    "debugMessage": null,
    "data": [
        {
            "studentID": 1,
            "studentReferenceNumber": 123,
            "studentName": "akash",
            "studentContactNo": "7865435689",
            "organization": {
                "orgID": 1,
                "orgName": "Accessible academics",
                "orgContactNo": "5678998765",
                "orgAddress": "122 Merrimac",
                "createdAt": "2020-10-23T03:22:29.159+00:00",
                "updatedAt": null
            },
            "userID": 1,
            "createdAt": "2020-10-23T03:22:29.159+00:00",
            "updatedAt": "2020-10-23T03:22:29.159+00:00"
        },
        {
            "studentID": 2,
            "studentReferenceNumber": 234,
            "studentName": "manasa",
            "studentContactNo": "7864678987",
            "organization": {
                "orgID": 1,
                "orgName": "Accessible academics",
                "orgContactNo": "5678998765",
                "orgAddress": "122 Merrimac",
                "createdAt": "2020-10-23T03:22:29.159+00:00",
                "updatedAt": null
            },
            "userID": 1,
            "createdAt": "2020-10-23T03:22:29.159+00:00",
            "updatedAt": "2020-10-23T03:22:29.159+00:00"
        }
    ]
}

export const manageStudentsOrganizationResponse = {
    "status": "success",
    "message": "Organizations found",
    "debugMessage": null,
    "data": [
        {
            "orgID": 1,
            "orgName": "Accessible academics",
            "orgContactNo": "5678998765",
            "orgAddress": "122 Merrimac",
            "createdAt": "2020-10-23T03:22:29.159+00:00",
            "updatedAt": null
        },
        {
            "orgID": 2,
            "orgName": "Not Accessible academics",
            "orgContactNo": "7876545789",
            "orgAddress": "123 Merrimac",
            "createdAt": "2020-10-23T03:22:29.159+00:00",
            "updatedAt": null
        }
    ]
};

export const manageStudentsCoachListResponse = {
    "status": "success",
    "message": "Coach list found!",
    "debugMessage": null,
    "data": [
        {
            "userID": 1,
            "userName": "sgaikwad",
            "emailID": "siddugaiks@gmail.com",
            "userContactNo": "9876544678",
            "password": "12345",
            "verificationCode": null,
            "createdAt": "2020-10-23T03:22:29.159+00:00",
            "updatedAt": "2020-10-23T03:22:29.159+00:00"
        },
        {
            "userID": 2,
            "userName": "pranalim",
            "emailID": "pranalim@gmail.com",
            "userContactNo": "7865456789",
            "password": "12345",
            "verificationCode": "234",
            "createdAt": "2020-10-23T03:22:29.159+00:00",
            "updatedAt": "2020-10-23T03:22:29.159+00:00"
        },
        {
            "userID": 3,
            "userName": "kamm",
            "emailID": "kam@gmail.com",
            "userContactNo": "7656789876",
            "password": "12345",
            "verificationCode": null,
            "createdAt": "2020-10-23T03:22:29.159+00:00",
            "updatedAt": "2020-10-23T03:22:29.159+00:00"
        }
    ]
}