import React from 'react';
import { Button } from 'antd';
import SingleChoice from '../../../../items/SingleChoice';
import MultipleChoice from '../../../../items/MultipleChoice';
import TextInput from '../../../../items/TextInput';
import TextField from '../../../../items/TextField';
import NumberArea from '../../../../items/NumberArea';
import Rating from '../../../../items/Rating';

type Props = {
    pageNumber: number,
    changePageNumber: any
};

type State = {
  formTitle: string,
  formInfoList: any[],
  curId: number
};
class EditPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.changeCurId = this.changeCurId.bind(this);
    this.removeFormItem = this.removeFormItem.bind(this);
    this.state = {
      formTitle: '请输入表格标题',
      formInfoList: [],
      curId: -1
    };
  }

  componentDidMount() {
    
  }
  newFormList() {
    const ret: any[] = [];
    this.state.formInfoList.forEach(question=>{
      ret.push(question);
    });
    return ret;
  }
  changeCurId(id: number) {
    this.setState({
      curId: id
    });
  }
  removeFormItem(id: number) {
    const ret = this.newFormList()
    ret[id].type = -1;
    this.setState({formInfoList: ret});
  }
  addSingleChoice() {
    const ret = this.newFormList()
    const tot = ret.length
    ret.push({'type':0,'order':tot});
    this.setState({formInfoList: ret, curId: tot});
  }
  addMultipleChoice() {
    const ret = this.newFormList()
    const tot = ret.length
    ret.push({'type':1,'order':tot});
    this.setState({formInfoList: ret, curId: tot});
  }
  addText() {
    const ret = this.newFormList()
    const tot = ret.length
    ret.push({'type':2,'order':tot});
    this.setState({formInfoList: ret, curId: tot});
  }
  addTextField() {
    const ret = this.newFormList()
    const tot = ret.length
    ret.push({'type':3,'order':tot});
    this.setState({formInfoList: ret, curId: tot});
  }
  addNumberArea() {
    const ret = this.newFormList()
    const tot = ret.length
    ret.push({'type':4,'order':tot});
    this.setState({formInfoList: ret, curId: tot});
  }
  addRating() {
    const ret = this.newFormList()
    const tot = ret.length
    ret.push({'type':5,'order':tot});
    this.setState({formInfoList: ret, curId: tot});
  }
  render() {
    const formList = [];
    for(let i = 0;i < this.state.formInfoList.length;i ++){
      if(this.state.formInfoList[i].type === 0){
        formList.push(<SingleChoice removeFormItem = {this.removeFormItem} changeCurId={this.changeCurId} curId={this.state.curId} order={this.state.formInfoList[i].order} fillState={false}></SingleChoice>)
      }
      else if(this.state.formInfoList[i].type === 1){
        formList.push(<MultipleChoice removeFormItem = {this.removeFormItem} changeCurId={this.changeCurId} curId={this.state.curId} order={this.state.formInfoList[i].order} fillState={false}></MultipleChoice>)
      }
      else if(this.state.formInfoList[i].type === 2){
        formList.push(<TextInput removeFormItem = {this.removeFormItem} changeCurId={this.changeCurId} curId={this.state.curId} order={this.state.formInfoList[i].order} fillState={false}></TextInput>)
      }
      else if(this.state.formInfoList[i].type === 3){
        formList.push(<TextField removeFormItem = {this.removeFormItem} changeCurId={this.changeCurId} curId={this.state.curId} order={this.state.formInfoList[i].order} fillState={false}></TextField>)
      }
      else if(this.state.formInfoList[i].type === 4){
        formList.push(<NumberArea removeFormItem = {this.removeFormItem} changeCurId={this.changeCurId} curId={this.state.curId} order={this.state.formInfoList[i].order} fillState={false}></NumberArea>)
      }
      else if(this.state.formInfoList[i].type === 5){
        formList.push(<Rating removeFormItem = {this.removeFormItem} changeCurId={this.changeCurId} curId={this.state.curId} order={this.state.formInfoList[i].order} fillState={false}></Rating>)
      }
    }
    return (
      <div className = 'editpage'>
        <div className = 'toolbar'>
          <Button onClick = {()=>this.addSingleChoice()}>Single Choice</Button>
          <Button onClick = {()=>this.addMultipleChoice()}>Multiple Choice</Button>
          <Button onClick = {()=>this.addText()}>Text</Button>
          <Button onClick = {()=>this.addTextField()}>Text Field</Button>
          <Button onClick = {()=>this.addNumberArea()}>Number Area</Button>
          <Button onClick = {()=>this.addRating()}>Rating</Button>
        </div>
        <div className = 'editform'>
          {this.state.formTitle}
          {formList}
        </div>
      </div>
      
    );
  }
}
export default EditPage;
