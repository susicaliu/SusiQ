import React from 'react';
import { Button } from 'antd';
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
import SuccessPage from './SuccessPage';
type Props = {
} & RouteComponentProps;

type State = {
  loginState: boolean,
  pageNumber: number,
  formId: number,
  formTitle: string,
  formInfoList: any[],
  fillPriv: number,
  answersList: any[],
  fillState: number[],
};
class FillPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.changeLoginState = this.changeLoginState.bind(this);
    this.changePageNumber = this.changePageNumber.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
    this.updateFillState = this.updateFillState.bind(this);
    this.state = {
      loginState: false,
      pageNumber: 1,
      formId: 0,
      formTitle: '',
      formInfoList: [],
      fillPriv: 1,
      answersList: [],
      fillState: [],
    };
  }

  async componentDidMount() {
    const url = this.props.location.search;
    let id = 0;
    for(let i = 4;i < url.length;i ++){
      id = id * 10 + Number(url[i]);
    }
    // const result = await axios.post();
    const result = {'data':{'formId':10000,'formTitle':'测试问卷标题','formInfoList':[{"type":0,"order":0,"itemInfo":{"title":"单选","description":"","mustfill":true,"choices":["选项1","选项2","选项3"],"itemNum":3,"limitState":true,"limitNum":[0,20,20],"cancelVisible":false,"validState":[true,true,true],"validNum":3}},{"type":1,"order":1,"itemInfo":{"title":"多选","description":"","mustfill":true,"choices":["选项1","选项2","选项3"],"itemNum":3,"limitState":true,"limitNum":[20,20,20],"maxOptionState":true,"minnOp":1,"maxxOp":2,"cancelVisible":false,"validState":[true,true,true],"validNum":3}},{"type":3,"order":2,"itemInfo":{"title":"文本框","description":"","mustfill":true,"defaultCont":"","content":"","cancelVisible":false}},{"type":2,"order":3,"itemInfo":{"title":"文本框","description":"","mustfill":true,"defaultCont":"","content":"","cancelVisible":false}},{"type":4,"order":4,"itemInfo":{"title":"数字","description":"","mustfill":true,"unit":"","limitState":false,"minnOp":1,"maxxOp":10,"allowFloat":false,"roundFloat":false,"step":0,"cancelVisible":false}},{"type":5,"order":5,"itemInfo":{"title":"评分","description":"","mustfill":true,"allowHalf":false,"cancelVisible":false}}],'fillPriv':3}};
    if(result.data.fillPriv === 1){
      if(this.state.loginState === false){
        this.changePageNumber(2)
      }
    }
    const formInfoList = result.data.formInfoList;
    const newFillState = [];
    for(let i = 0;i < formInfoList.length;i ++){
      if(formInfoList[i].type >= 0){
        if(formInfoList[i].itemInfo.mustfill === true)
          newFillState[formInfoList[i].order] = 1;
        else
          newFillState[formInfoList[i].order] = 0;
      }
    }
    this.setState({
      formId:result.data.formId,
      formTitle:result.data.formTitle,
      formInfoList:result.data.formInfoList,
      fillPriv:result.data.fillPriv,
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
    ret[id] = answer;
    this.setState({
      answersList: ret
    });
  }
  emptyOp(){

  }
  updateFillState(id:number,value:number){
    const newFillState = this.deepCopy(this.state.fillState);
    newFillState[id] = value;
    this.setState({
      fillState: newFillState
    });
  }
  async handleSubmit(){
    // console.log(JSON.stringify(this.state.answersList));
    // const result = await axios.post('',JSON.stringify(this.state.answersList));
    const result = {
      'data':{
        'statecode':0,
      }
    };
    this.setState({
      pageNumber: result.data.statecode + 3
    });
  }
  render() {
    const formList = [];
    for (let i = 0; i < this.state.formInfoList.length; i++) {
      if (this.state.formInfoList[i].type === 0) {
        formList.push(<SingleChoice key={'FormItemSingleChoice'+String(i)} updateFillState = {this.updateFillState} filling = {this.state.fillState[this.state.formInfoList[i].order]} updateAnswer={this.updateAnswer} updateItemInfo={this.emptyOp} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.emptyOp} changeCurId={this.emptyOp} curId={1} order={this.state.formInfoList[i].order} fillState={true}></SingleChoice>)
      }
      else if (this.state.formInfoList[i].type === 1) {
        formList.push(<MultipleChoice key={'FormItemMultipleChoice'+String(i)} updateFillState = {this.updateFillState} filling = {this.state.fillState[this.state.formInfoList[i].order]} updateAnswer={this.updateAnswer} updateItemInfo={this.emptyOp} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.emptyOp} changeCurId={this.emptyOp} curId={1} order={this.state.formInfoList[i].order} fillState={true}></MultipleChoice>)
      }
      else if (this.state.formInfoList[i].type === 2) {
        formList.push(<TextInput key={'FormItemTextInput'+String(i)} updateFillState = {this.updateFillState} filling = {this.state.fillState[this.state.formInfoList[i].order]} updateAnswer={this.updateAnswer} updateItemInfo={this.emptyOp} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.emptyOp} changeCurId={this.emptyOp} curId={1} order={this.state.formInfoList[i].order} fillState={true}></TextInput>)
      }
      else if (this.state.formInfoList[i].type === 3) {
        formList.push(<TextField key={'FormItemTextField'+String(i)} updateFillState = {this.updateFillState} filling = {this.state.fillState[this.state.formInfoList[i].order]} updateAnswer={this.updateAnswer} updateItemInfo={this.emptyOp} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.emptyOp} changeCurId={this.emptyOp} curId={1} order={this.state.formInfoList[i].order} fillState={true}></TextField>)
      }
      else if (this.state.formInfoList[i].type === 4) {
        formList.push(<NumberArea key={'FormItemNumberArea'+String(i)} updateFillState = {this.updateFillState} filling = {this.state.fillState[this.state.formInfoList[i].order]} updateAnswer={this.updateAnswer} updateItemInfo={this.emptyOp} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.emptyOp} changeCurId={this.emptyOp} curId={1} order={this.state.formInfoList[i].order} fillState={true}></NumberArea>)
      }
      else if (this.state.formInfoList[i].type === 5) {
        formList.push(<Rating key={'FormItemRating'+String(i)} updateAnswer={this.updateAnswer} updateItemInfo={this.emptyOp} updateFillState = {this.updateFillState} filling = {this.state.fillState[this.state.formInfoList[i].order]} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.emptyOp} changeCurId={this.emptyOp} curId={1} order={this.state.formInfoList[i].order} fillState={true}></Rating>)
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
            <div className = "FormTitle">
              {this.state.formTitle}
            </div>
            <div className = 'fillingform'>
              {formList}
            </div>
            <Button disabled = {!submitS} onClick = {()=>this.handleSubmit()}>提交</Button>
          </div>)
          :(this.state.pageNumber === 2) ?
          (<SignPage loginState = {this.state.loginState} changeLoginState={this.changeLoginState} pageNumber = {this.state.pageNumber} changePageNumber = {this.changePageNumber}></SignPage>)
          :(this.state.pageNumber === 3) ?
          (<SuccessPage/>)
          :(<div/>)
    );
  }
}
export default FillPage;
