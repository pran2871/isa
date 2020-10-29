export const assessmentFormTemplateResponse = {
    status: 200,
    data: {
        templateId: 1, //  optional
        studentDetails: {
            studentID: 1,
            studentReferenceNumber: 123,
            studentName: "akash",
            studentContactNo: "7865435689",
            organization: {
                orgID: 1,
                orgName: "Accessible academics",
                orgContactNo: "5678998765",
                orgAddress: "122 Merrimac",
                createdAt: "2020-10-23T03:22:29.159+00:00",
                updatedAt: null
            },
            userID: 1,
            createdAt: "2020-10-23T03:22:29.159+00:00",
            updatedAt: "2020-10-23T03:22:29.159+00:00"
        },
        assessmentDetails: {
            comment: 'sample comment',
            questions: [
                {
                    questionId: 1,
                    questionLabel: 'Question - 1',
                    questionAnswer: 1,
                },
                {
                    questionId: 2,
                    questionLabel: 'Question - 2',
                    questionAnswer: 2,
                },
                {
                    questionId: 3,
                    questionLabel: 'Question - 3',
                    questionAnswer: 3,
                },
                {
                    questionId: 4,
                    questionLabel: 'Question - 4',
                    questionAnswer: 2,
                },
            ],
        }
    }
};

export const draftOrSubmitAssessment = {
    comment: '',
    temp: {
        1: 1,
        2: 1,
        3: 2
    },
};

//  save api: a/s/saveAssessment/{studentId}/{templateId}
//  draft api: a/s/draftAssessment/{studentId}/{templateId}