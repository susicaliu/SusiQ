import React from 'react';
import { Button, BackTop } from 'antd';
import { RouteComponentProps } from "react-router-dom"
import ButtonGroup from 'antd/lib/button/button-group';
import Axios from 'axios';
import './FillPage.css'
import SignPage from '../sign/SignPage';
import SingleChoice from '../../items/SingleChoice';
import MultipleChoice from '../../items/MultipleChoice';
import TextInput from '../../items/TextInput';
import TextField from '../../items/TextField';
import NumberArea from '../../items/NumberArea';
import Rating from '../../items/Rating';
import Location from '../../items/Location';
import SuccessPage from './SuccessPage';
type Props = {
} & RouteComponentProps;

type State = {
  loginState: boolean,
  pageNumber: number,
  formId: string,
  formTitle: string,
  formInfoList: any[],
  fillPriv: number,
  answersList: any[],
  fillState: number[],
  username: string
};
class FillPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.changeLoginState = this.changeLoginState.bind(this);
    this.changePageNumber = this.changePageNumber.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
    this.updateFillState = this.updateFillState.bind(this);
    this.updateUName = this.updateUName.bind(this);
    this.state = {
      loginState: false,
      pageNumber: 1,
      formId: '',
      formTitle: '',
      formInfoList: [],
      fillPriv: 1,
      answersList: [],
      fillState: [],
      username: ''
    };
  }

  async componentDidMount() {
    const url = this.props.location.search;
    let id = 0;
    for(let i = 4;i < url.length;i ++){
      id = id * 10 + Number(url[i]);
    }
    const postReq = {'formId':String(url),'opcode':0,'username':this.state.username};
    const result = await Axios.post('/data/fill',postReq);

    if(result.data.formData.fillPriv === 1){
      if(this.state.loginState === false){
        this.changePageNumber(2)
      }
    }
    const formInfoList = result.data.formData.formInfoList;
    const newFillState = [];
    for(let i = 0;i < formInfoList.length;i ++){
      if(formInfoList[i].type >= 0){
        if(formInfoList[i].itemInfo.mustfill === true)
          newFillState[i] = 1;
        else
          newFillState[i] = 0;
      }
    }
    this.setState({
      formId:result.data.formData.formId,
      formTitle:result.data.formData.formTitle,
      formInfoList:result.data.formData.formInfoList,
      fillPriv:result.data.formData.fillPriv,
      fillState: newFillState,
    });
  }
  changeLoginState() {
    this.setState({
        loginState: !this.state.loginState,
        pageNumber: 1
    });
  }
  changePageNumber(pageNumber: number){
    this.setState({
      pageNumber: pageNumber
    });
  }
  deepCopy(x: any) {
    return JSON.parse(JSON.stringify(x));
  }
  updateAnswer(id:number, answer:any){
    const ret = this.deepCopy(this.state.answersList)
    let tmp = -1;
    for(let i = 0;i < this.state.formInfoList.length;i ++){
      if(this.state.formInfoList[i].order === id){
        tmp = i;
        break;
      }
    }
    ret[tmp] = {'order':id,'answer':answer};
    this.setState({
      answersList: ret
    });
  }
  emptyOp(){

  }
  updateFillState(id:number,value:number){
    const newFillState = this.deepCopy(this.state.fillState);
    let tmp = -1;
    for(let i = 0;i < this.state.formInfoList.length;i ++){
      if(this.state.formInfoList[i].order === id){
        tmp = i;
        break;
      }
    }
    newFillState[tmp] = value;
    this.setState({
      fillState: newFillState
    });
  }
  async handleSubmit(){
    const postReq = JSON.stringify({'opcode':1,'username':this.state.username,'formId':this.state.formId,'answersList':this.state.answersList});
    const result = await Axios.post('data/fill',postReq);
    this.setState({
      pageNumber: result.data.statecode + 3
    });
  }
  checkVisible(ii:number){
    if(!this.state.formInfoList[ii].itemInfo.isCascade){
      return true;
    }
    else{
      for(let i = 0;i < ii;i ++){
        if(this.state.formInfoList[i].order === this.state.formInfoList[ii].itemInfo.questionId){
          const tmp = this.state.answersList[i];
          if(tmp === null || tmp === undefined) return false;
          const values = tmp.answer;
          if(values instanceof Array){
            for(let j = 0;j < values.length;j ++){
              const value = values[j].value;
              if(this.state.formInfoList[i].itemInfo.choices[value-1].id === this.state.formInfoList[ii].itemInfo.optionId) return true;
            }
          }
        }
      }
    }
    return false;
  }
  updateUName(uname:string){
    this.setState({
      username:uname
    });
  }
  render() {
    const formList = [];
    let cnt = 0;
    for (let i = 0; i < this.state.formInfoList.length; i++) {
      if (this.checkVisible(i)){
        cnt ++;
        if (this.state.formInfoList[i].type === 0) {
          formList.push(<SingleChoice options={[]} formOrder={cnt} key={'FormItemSingleChoice'+String(i)} updateFillState = {this.updateFillState} filling = {this.state.fillState[this.state.formInfoList[i].order]} updateAnswer={this.updateAnswer} updateItemInfo={this.emptyOp} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.emptyOp} changeCurId={this.emptyOp} curId={1} order={this.state.formInfoList[i].order} fillState={true}></SingleChoice>)
        }
        else if (this.state.formInfoList[i].type === 1) {
          formList.push(<MultipleChoice options={[]} formOrder={cnt} key={'FormItemMultipleChoice'+String(i)} updateFillState = {this.updateFillState} filling = {this.state.fillState[this.state.formInfoList[i].order]} updateAnswer={this.updateAnswer} updateItemInfo={this.emptyOp} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.emptyOp} changeCurId={this.emptyOp} curId={1} order={this.state.formInfoList[i].order} fillState={true}></MultipleChoice>)
        }
        else if (this.state.formInfoList[i].type === 2) {
          formList.push(<TextInput options={[]} formOrder={cnt} key={'FormItemTextInput'+String(i)} updateFillState = {this.updateFillState} filling = {this.state.fillState[this.state.formInfoList[i].order]} updateAnswer={this.updateAnswer} updateItemInfo={this.emptyOp} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.emptyOp} changeCurId={this.emptyOp} curId={1} order={this.state.formInfoList[i].order} fillState={true}></TextInput>)
        }
        else if (this.state.formInfoList[i].type === 3) {
          formList.push(<TextField options={[]} formOrder={cnt} key={'FormItemTextField'+String(i)} updateFillState = {this.updateFillState} filling = {this.state.fillState[this.state.formInfoList[i].order]} updateAnswer={this.updateAnswer} updateItemInfo={this.emptyOp} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.emptyOp} changeCurId={this.emptyOp} curId={1} order={this.state.formInfoList[i].order} fillState={true}></TextField>)
        }
        else if (this.state.formInfoList[i].type === 4) {
          formList.push(<NumberArea options={[]} formOrder={cnt} key={'FormItemNumberArea'+String(i)} updateFillState = {this.updateFillState} filling = {this.state.fillState[this.state.formInfoList[i].order]} updateAnswer={this.updateAnswer} updateItemInfo={this.emptyOp} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.emptyOp} changeCurId={this.emptyOp} curId={1} order={this.state.formInfoList[i].order} fillState={true}></NumberArea>)
        }
        else if (this.state.formInfoList[i].type === 5) {
          formList.push(<Rating options={[]} formOrder={cnt} key={'FormItemRating'+String(i)} updateAnswer={this.updateAnswer} updateItemInfo={this.emptyOp} updateFillState = {this.updateFillState} filling = {this.state.fillState[this.state.formInfoList[i].order]} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.emptyOp} changeCurId={this.emptyOp} curId={1} order={this.state.formInfoList[i].order} fillState={true}></Rating>)
        }
        else if (this.state.formInfoList[i].type === 6) {
          formList.push(<Location options={[]} formOrder={cnt} key={'FormItemRating'+String(i)} updateAnswer={this.updateAnswer} updateItemInfo={this.emptyOp} updateFillState = {this.updateFillState} filling = {this.state.fillState[this.state.formInfoList[i].order]} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.emptyOp} changeCurId={this.emptyOp} curId={1} order={this.state.formInfoList[i].order} fillState={true}></Location>)
        }
      }
    }
    let submitS = true;
    for(let i = 0;i < this.state.formInfoList.length;i ++){
      if(this.state.formInfoList[i].type >= 0){
        if(this.state.fillState[this.state.formInfoList[i].order] > 0){
          submitS = false;
        }
      }
    }
    return (
          (this.state.pageNumber === 1) ? 
          (<div className = 'FillPage'>
            <div className = 'fillingform'>
              <div className = "FormTitle">
                {this.state.formTitle}
              </div>
              {formList}
              <Button disabled = {!submitS} onClick = {()=>this.handleSubmit()} type='link'><img className='mysmallbutton' src="./png/submit.png"></img></Button>
            </div>
          </div>)
          :(this.state.pageNumber === 2) ?
          (<SignPage uName={this.state.username} updateUName={this.updateUName} loginState = {this.state.loginState} changeLoginState={this.changeLoginState} pageNumber = {this.state.pageNumber} changePageNumber = {this.changePageNumber}></SignPage>)
          :(this.state.pageNumber === 3) ?
          (<SuccessPage/>)
          :(<div/>)
    );
  }
}
export default FillPage;
