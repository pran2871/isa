/**
 *
 * Assessment
 *
 */

import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";

import AssessmentStudentSelectionPage from './AssessmentStudentSelectionPage';
import AssessmentTemplateSelectionPage from './AssessmentTemplateSelectionPage';
import AssessmentFormPage from './AssessmentFormPage';

class Assessment extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {

        
        return (
            <Switch>
                <Route exact path="/assessment/:studentId/:templateId" component={AssessmentFormPage} />
                <Route exact path="/assessment/:studentId" component={AssessmentTemplateSelectionPage} />
                <Route exact path="/assessment" component={AssessmentStudentSelectionPage} />
            </Switch>
        )
    }
}


export default Assessment;
