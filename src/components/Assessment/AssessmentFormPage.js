/**
 *
 * AssessmentFormPage
 *
 */

import React from 'react';

import { Table, Radio, Input } from 'antd';

import {
    assessmentFormTemplateResponse,
} from './Assessment.constant';

import {
    StudentNameContainer,
    FieldContainer,
    CommentFieldContainer,
    ButtonFieldContainer,
    ButtonComponent,
} from './Assessment.style';

class AssessmentFormPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            templateData: null,
            answersData: {},
            comment: '',
            
        }
    }

    componentDidMount() {
        //get all api 
        const tempAnswersData = {};
        assessmentFormTemplateResponse.data.assessmentDetails.questions.forEach((questionData) => {
            if (questionData.questionAnswer) {
                tempAnswersData[questionData.questionId] = questionData.questionAnswer;
            }
        });
        this.setState({ templateData: assessmentFormTemplateResponse.data, answersData: tempAnswersData, comment: assessmentFormTemplateResponse.data.assessmentDetails.comment || '' })
    }

    changeAnswer = (event, questionData) => {
        this.setState({ answersData: { ...this.state.answersData, [questionData.questionId]: event.target.value } })
    }

    commentChange = (event) => {
        this.setState({ comment: event.target.value })
    }

    submitForm = (mode) => {
        console.log('mode : ', mode); // submit or saveDraft
        console.log('state : ', this.state);
        if (mode === 'submit') {
            this.props.history.push('/assessment')
        }
    }


    render() {

        const { templateData, comment } = this.state;
        if (!templateData) {
            return null;
        }

        const filteredDataSource = [
            {
                title: 'Question',
                dataIndex: 'questionLabel',
                key: 'questionLabel',
            },
            {
                title: 'Answer',
                dataIndex: 'questionId',
                key: 'questionId',
                render: (questionId, questionData) => {
                    const { answersData } = this.state;
                    return (
                        <Radio.Group name="radiogroup" value={(answersData && answersData[questionId]) || ''} onChange={(event) => this.changeAnswer(event, questionData)}>
                            <Radio value={1}>1</Radio>
                            <Radio value={2}>2</Radio>
                            <Radio value={3}>3</Radio>
                        </Radio.Group>
                    );
                }
            },
        ];

        return (
            <div>
                <StudentNameContainer>
                    {templateData.studentDetails.studentName || ''}
                </StudentNameContainer>
                <FieldContainer>
                    <Table
                        dataSource={templateData.assessmentDetails.questions}
                        columns={filteredDataSource}
                        pagination={false}
                    />
                </FieldContainer>
                <CommentFieldContainer>
                    <Input.TextArea
                        rows={4}
                        value={comment}
                        placeholder="Enter your comment"
                        onChange={this.commentChange}
                    />
                </CommentFieldContainer>
                <ButtonFieldContainer>
                    <ButtonComponent
                        type="default"
                        onClick={() => this.submitForm('saveDraft')}
                    >
                        Save Draft
                    </ButtonComponent>
                    <ButtonComponent
                        type="primary"
                        onClick={() => this.submitForm('submit')}
                    >
                        Submit
                    </ButtonComponent>
                </ButtonFieldContainer>
            </div>
        )
    }
}


export default AssessmentFormPage;
