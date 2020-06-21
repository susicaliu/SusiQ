import React from 'react';
import { Card, Button, Col, Row, Divider } from 'antd';
import Meta from 'antd/lib/card/Meta';
import EditPage from './edit/EditPage';
import AnalyzePage from './analyze/AnalyzePage';
import Axios from 'axios';
type Props = {
    pageNumber: number,
    changePageNumber: any,
    loginState: boolean,
    username: string,
};

type State = {
    forms: any[]
    formId: string,
    formTitle: string,
};
class UserPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
        forms:[],
        formId: "",
        formTitle: 'default',
    };
  }

  async componentDidMount() {
    if(this.props.loginState){
      const postReq = JSON.stringify({'username':this.props.username,'opcode':0});
      const result = await Axios.post('form/fetch',postReq);
      this.setState({
        forms:result.data.forms,
      })
    }
  }

  clickEdit(form:any) {
    this.setState({
      formId:form.formId,
      formTitle:form.formTitle,
    });
    this.props.changePageNumber(5);
  }
  clickAnalyze(form:any) {
    this.setState({
      formId:form.formId,
      formTitle:form.formTitle,
    });
    this.props.changePageNumber(8);
  }
  async clickCreate(){
    const postReq = JSON.stringify({'username':this.props.username,'opcode':1});
    const result = await Axios.post('form/fetch',postReq);
      this.setState({
        forms:result.data.forms,
      })
  }
  render() {
    const uPageForm:any[] = [];
    this.state.forms.forEach(form=>{
      uPageForm.push((<Col span={3.5}>
        <Card
          hoverable={true}
          style={{ width: 300, height: 300 }}
          cover={<img src="https://a.icons8.com/lbkWildl/yDQQxV/my.png"/>}
          key={'form'+form.formId}
        >
          <Meta title={form.formTitle}/>
          <Button size='small' onClick = {()=>this.clickEdit(form)}type='link'><img className='mysmallbutton' src="./png/editbutton.png"></img></Button>
          <Button size='small' onClick = {()=>this.clickAnalyze(form)}type='link'><img className='mysmallbutton' src="./png/analyzebutton.png"></img></Button>
        </Card>
      </Col>));
    });
    const ePage = (
        <EditPage fId={this.state.formId} pageNumber = {this.props.pageNumber} changePageNumber = {this.props.changePageNumber}></EditPage>
    );
    const aPage =(
        <AnalyzePage username={this.props.username} fId={this.state.formId} pageNumber = {this.props.pageNumber} changePageNumber = {this.props.changePageNumber}></AnalyzePage>
    );
    const uPage = (
      <div style={{position:'fixed',top:'7vh',width:'100vw',height:'93vh',backgroundColor:'#FFFFFF'}}>
        <Button onClick = {()=>this.clickCreate()} type='link' style={{float:'left',paddingLeft:'20px'}}><img className='mysmallbutton' src="./png/createbutton.png"></img></Button>
        <Divider style={{marginTop:'70px'}}></Divider>
        <div style={{paddingLeft:'20px',paddingTop:'5px'}}>
          <Row gutter={[32, { xs: 8, sm: 16, md: 24, lg: 32 }]}>{uPageForm}</Row>
        </div>
        
      </div>
    );
    return (
      <div className = 'userpage'>
        {(this.props.pageNumber === 4) ? uPage : (this.props.pageNumber <= 7) ? ePage : (this.props.pageNumber <= 8) ? aPage : (<div/>)}
      </div>
    );
  }
}
export default UserPage;
