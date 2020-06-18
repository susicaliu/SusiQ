import React from 'react';
import { Button } from 'antd';
import SingleChoice from '../../../items/SingleChoice';
import MultipleChoice from '../../../items/MultipleChoice';
import TextInput from '../../../items/TextInput';
import TextField from '../../../items/TextField';
import NumberArea from '../../../items/NumberArea';
import Rating from '../../../items/Rating';
import SettingPage from './SettingPage';
import PubPage from './PubPage';

type Props = {
  pageNumber: number,
  changePageNumber: any
};

type State = {
  formTitle: string,
  formInfoList: any[],
  curId: number,
  startTime: Date | null,
  endTime: Date | null,
  fillPriv: number
};
class EditPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.changeCurId = this.changeCurId.bind(this);
    this.removeFormItem = this.removeFormItem.bind(this);
    this.updateItemInfo = this.updateItemInfo.bind(this);
    this.changeFillPriv = this.changeFillPriv.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.state = {
      formTitle: '请输入表格标题',
      formInfoList: [],
      curId: -1,
      startTime: null,
      endTime: null,
      fillPriv: 1,
    };
  }

  componentDidMount() {

  }
  changeFillPriv(a: number) {
    this.setState({
      fillPriv: a
    });
  }
  newFormList() {
    const ret : any[] = [];
    this.state.formInfoList.forEach(question => {
      ret.push(question);
    });
    return ret;
  }
  deepCopy(x: any) {
    return JSON.parse(JSON.stringify(x));
  }
  changeCurId(id: number) {
    this.setState({
      curId: id
    });
  }
  removeFormItem(id: number) {
    const ret = this.deepCopy(this.state.formInfoList)
    ret[id].type = -1;
    this.setState({ formInfoList: ret });
  }
  addSingleChoice() {
    const ret = this.deepCopy(this.state.formInfoList)
    const tot = ret.length
    const itemInfo = {
      title: '单选',
      description: '',
      mustfill: false,
      choices: ['选项1', '选项2', '选项3'],
      itemNum: 3,
      limitState: false,
      limitNum: [20, 20, 20],
      cancelVisible: false,
      validNum: 3,
    };
    ret.push({ 'type': 0, 'order': tot, 'itemInfo': itemInfo });
    this.setState({ formInfoList: ret, curId: tot });
  }
  addMultipleChoice() {
    const ret = this.deepCopy(this.state.formInfoList)
    const tot = ret.length
    const itemInfo = {
      title: '多选',
      description: '',
      mustfill: false,
      choices: ['选项1', '选项2', '选项3'],
      itemNum: 3,
      limitState: false,
      limitNum: [20, 20, 20],
      maxOptionState: false,
      minnOp: 1,
      maxxOp: 2,
      cancelVisible: false,
      validNum: 3,
    };
    ret.push({ 'type': 1, 'order': tot, 'itemInfo': itemInfo });
    this.setState({ formInfoList: ret, curId: tot });
  }
  addText() {
    const ret = this.deepCopy(this.state.formInfoList)
    const tot = ret.length
    const itemInfo = {
      title: '文本框',
      description: '',
      mustfill: false,
      defaultCont: '',
      content: '',
      cancelVisible: false,
    };
    ret.push({ 'type': 2, 'order': tot, 'itemInfo': itemInfo });
    this.setState({ formInfoList: ret, curId: tot });
  }
  addTextField() {
    const ret = this.deepCopy(this.state.formInfoList)
    const tot = ret.length
    const itemInfo = {
      title: '文本框',
      description: '',
      mustfill: false,
      defaultCont: '',
      content: '',
      cancelVisible: false,
    };
    ret.push({ 'type': 3, 'order': tot, 'itemInfo': itemInfo });
    this.setState({ formInfoList: ret, curId: tot });
  }
  addNumberArea() {
    const ret = this.deepCopy(this.state.formInfoList)
    const tot = ret.length
    const itemInfo = {
      title: '数字',
      description: '',
      mustfill: false,
      unit: '',
      limitState: false,
      minnOp: 1,
      maxxOp: 10,
      allowFloat: false,
      roundFloat: false,
      step: 0,
      cancelVisible: false
    };
    ret.push({ 'type': 4, 'order': tot, 'itemInfo': itemInfo });
    this.setState({ formInfoList: ret, curId: tot });
  }
  addRating() {
    const ret = this.deepCopy(this.state.formInfoList)
    const tot = ret.length
    const itemInfo = {
      title: '评分',
      description: '',
      mustfill: false,
      allowHalf: false,
      cancelVisible: false,
    };
    ret.push({ 'type': 5, 'order': tot, 'itemInfo': itemInfo });
    this.setState({ formInfoList: ret, curId: tot });
  }
  updateItemInfo(id:number, itemInfo:any){
    const ret = this.deepCopy(this.state.formInfoList)
    ret[id].itemInfo = itemInfo;
    this.setState({
      formInfoList: ret
    });
  }
  saveForm() {

  }
  lastPage(){
    this.props.changePageNumber(4);
  }
  nextPage(){
    this.props.changePageNumber(6);
  }
  emptyOp(){

  }
  render() {
    const formList = [];
    for (let i = 0; i < this.state.formInfoList.length; i++) {
      if (this.state.formInfoList[i].type === 0) {
        formList.push(<SingleChoice filling={0} updateFillState={this.emptyOp} updateAnswer={this.emptyOp} key={'FormItemSingleChoice'+String(i)} updateItemInfo={this.updateItemInfo} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.removeFormItem} changeCurId={this.changeCurId} curId={this.state.curId} order={this.state.formInfoList[i].order} fillState={false}></SingleChoice>)
      }
      else if (this.state.formInfoList[i].type === 1) {
        formList.push(<MultipleChoice filling={0} updateFillState={this.emptyOp} updateAnswer={this.emptyOp} key={'FormItemMultipleChoice'+String(i)} updateItemInfo={this.updateItemInfo} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.removeFormItem} changeCurId={this.changeCurId} curId={this.state.curId} order={this.state.formInfoList[i].order} fillState={false}></MultipleChoice>)
      }
      else if (this.state.formInfoList[i].type === 2) {
        formList.push(<TextInput filling={0} updateFillState={this.emptyOp} key={'FormItemTextInput'+String(i)} updateAnswer={this.emptyOp} updateItemInfo={this.updateItemInfo} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.removeFormItem} changeCurId={this.changeCurId} curId={this.state.curId} order={this.state.formInfoList[i].order} fillState={false}></TextInput>)
      }
      else if (this.state.formInfoList[i].type === 3) {
        formList.push(<TextField filling={0} updateFillState={this.emptyOp} key={'FormItemTextField'+String(i)} updateAnswer={this.emptyOp} updateItemInfo={this.updateItemInfo} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.removeFormItem} changeCurId={this.changeCurId} curId={this.state.curId} order={this.state.formInfoList[i].order} fillState={false}></TextField>)
      }
      else if (this.state.formInfoList[i].type === 4) {
        formList.push(<NumberArea filling={0} updateFillState={this.emptyOp} key={'FormItemNumberArea'+String(i)} updateAnswer={this.emptyOp} updateItemInfo={this.updateItemInfo} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.removeFormItem} changeCurId={this.changeCurId} curId={this.state.curId} order={this.state.formInfoList[i].order} fillState={false}></NumberArea>)
      }
      else if (this.state.formInfoList[i].type === 5) {
        formList.push(<Rating filling={0} updateFillState={this.emptyOp} key={'FormItemRating'+String(i)} updateAnswer={this.emptyOp} updateItemInfo={this.updateItemInfo} itemInfo={this.state.formInfoList[i].itemInfo} removeFormItem={this.removeFormItem} changeCurId={this.changeCurId} curId={this.state.curId} order={this.state.formInfoList[i].order} fillState={false}></Rating>)
      }
    }
    // console.log(this.props.pageNumber);
    console.log(JSON.stringify(this.state.formInfoList));
    return (
      (this.props.pageNumber === 5) ?
      (<div className='editpage'>
          <div className='toolbar'>
            <Button onClick={() => this.addSingleChoice()}>Single Choice</Button>
            <Button onClick={() => this.addMultipleChoice()}>Multiple Choice</Button>
            <Button onClick={() => this.addText()}>Text</Button>
            <Button onClick={() => this.addTextField()}>Text Field</Button>
            <Button onClick={() => this.addNumberArea()}>Number Area</Button>
            <Button onClick={() => this.addRating()}>Rating</Button>
          </div>
          <div className='editform'>
            {this.state.formTitle}
            {formList}
          </div>
          <div className="fixbutton" style={{position:'fixed', right:'20px', bottom:'200px'}}>
            <Button onClick = {()=>this.lastPage()}>Last</Button>
            <Button onClick = {()=>this.nextPage()}>Next</Button>
            <Button onClick = {()=>this.saveForm()}>Save</Button>
          </div>
        </div>)
      : (this.props.pageNumber === 6) ? 
      (
        <SettingPage saveForm={this.saveForm} changeFillPriv = {this.changeFillPriv} pageNumber = {this.props.pageNumber} changePageNumber = {this.props.changePageNumber}>SettingPage</SettingPage>
      )
      : (this.props.pageNumber === 7) ?
      (
        <PubPage pageNumber = {this.props.pageNumber} changePageNumber = {this.props.changePageNumber}></PubPage>
      )
      : (<div/>)
    );
  }
}
export default EditPage;
