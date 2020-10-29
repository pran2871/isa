/**
 *
 * AssessmentTemplateSelectionPage
 *
 */

import React from 'react';
//  import { Tabs, TabList, TabPanel, Tab } from 'react-re-super-tabs'
import { Tabs } from 'antd';
import CustomTab from './CustomTab'
import PickTemplate from './PickTemplate'
import Contact from './Contact'



class AssessmentTemplateSelectionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
          studentId:props.match.params.studentId
        }
    }


    render() {

        console.log('history : ', this.props.history);
        console.log('studentId : ', this.state.studentId);
        const { studentId } = this.state;

        return (
              <div>

                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Pick you template" key="1">
                      <PickTemplate {...this.props} studentId={studentId} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="create you own question list" key="2">
                      <Contact />
                    </Tabs.TabPane>
                  </Tabs>
            
            {/* <Tabs activeTab='picktemplate'>
              <TabList>
                <Tab component={CustomTab } label='Pick Your Template' id='picktemplate' />
                
                <Tab component={CustomTab} label='Create Your Own Question List' id='contact' />
              </TabList>
              <TabList>
                 <TabPanel component={PickTemplate}  id='picktemplate' />
                
                <TabPanel exact render={(props) => <Picktemplate {...props} />} id='picktemplate' />
                <TabPanel component={Contact} id='contact' />
              </TabList>
            </Tabs> */}
          </div>
        )
    }
}


export default AssessmentTemplateSelectionPage;
