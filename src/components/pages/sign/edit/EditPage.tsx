import React, { ChangeEvent } from 'react';
import { Button, Divider, Input  } from 'antd';
import SettingPage from './SettingPage';
import PubPage from './PubPage';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided } from "react-beautiful-dnd";
import Question from '../../../items/Question';
import Axios from 'axios';
import src from '*.bmp';
import { url } from 'inspector';
import { stringify } from 'querystring';

type Props = {
  pageNumber: number,
  changePageNumber: any,
  fId: string,
};

type State = {
  formId: string,
  formTitle: string,
  formInfoList: any[],
  curId: number,
  timeState: boolean,
  startTime: number,
  endTime: number,
  fillPriv: number,
  formSize: number,
};
class EditPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.changeCurId = this.changeCurId.bind(this);
    this.removeFormItem = this.removeFormItem.bind(this);
    this.updateItemInfo = this.updateItemInfo.bind(this);
    this.changeFillPriv = this.changeFillPriv.bind(this);
    this.changeTimeState = this.changeTimeState.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.state = {
      formId: "",
      formTitle: '',
      formInfoList: [],
      curId: -1,
      timeState: false,
      startTime: -1,
      endTime: -1,
      fillPriv: 1,
      formSize: 0,
    };
  }

  async componentDidMount() {
    const formData = this.state;
    for (let i = 0; i < formData.formInfoList.length; i++) {
      formData.formInfoList[i].itemInfo.formOrder = i;
    }
    const postReq = JSON.stringify({'opcode':0,'formId':this.props.fId,'formData':formData});
    const result = await Axios.post('form/update',postReq);
    
    if(result.data.statecode === 0){
      console.log('Fetch Success');
      this.setState({
        ...result.data.formData
      });
    }
    else{
      console.log('Fetch Failed');
    }
  }
  changeCurId(id: number) {
    this.setState({
      curId: id
    });
  }
  removeFormItem(id: number) {
    const ret = this.deepCopy(this.state.formInfoList)
    let tmp = -1;
    for (let i = 0; i < ret.length; i++) {
      if (ret[i].order === id) {
        tmp = i;
        break;
      }
    }
    ret.splice(tmp, 1);
    this.setState({ formInfoList: ret });
  }
  updateItemInfo(id: number, itemInfo: any) {
    const ret = this.deepCopy(this.state.formInfoList)
    let tmp = -1;
    for (let i = 0; i < ret.length; i++) {
      if (ret[i].order === id) {
        tmp = i;
        break;
      }
    }
    ret[tmp].itemInfo = itemInfo;
    this.setState({
      formInfoList: ret
    });
  }
  changeFillPriv(a: number) {
    this.setState({
      fillPriv: a
    });
  }
  changeTimeState(){
    this.setState({
      timeState:!this.state.timeState
    });
  }
  changeDate(s:number, e:number){
    this.setState({
      startTime: s,
      endTime: e,
    })
  }
  newFormList() {
    const ret: any[] = [];
    this.state.formInfoList.forEach(question => {
      ret.push(question);
    });
    return ret;
  }
  deepCopy(x: any) {
    return JSON.parse(JSON.stringify(x));
  }
  addSingleChoice() {
    const ret = this.deepCopy(this.state.formInfoList);
    const tot = this.state.formSize;
    const itemInfo = {
      title: '单选',
      description: '',
      mustfill: false,
      choices: [{ 'text': '选项1', 'limitNum': 20, 'id': 0 }, { 'text': '选项2', 'limitNum': 20, 'id': 1 }, { 'text': '选项3', 'limitNum': 20, 'id': 2 }],
      itemNum: 3,
      limitState: false,
      cancelVisible: false,
      validNum: 3,
      formOrder: 0,

    };
    ret.push({ 'type': 0, 'order': tot, 'itemInfo': itemInfo });
    this.setState({ formInfoList: ret, formSize: tot + 1 });
  }
  addMultipleChoice() {
    const ret = this.deepCopy(this.state.formInfoList)
    const tot = this.state.formSize;
    const itemInfo = {
      title: '多选',
      description: '',
      mustfill: false,
      choices: [{ 'text': '选项1', 'limitNum': 20, 'id': 0 }, { 'text': '选项2', 'limitNum': 20, 'id': 1 }, { 'text': '选项3', 'limitNum': 20, 'id': 2 }],
      itemNum: 3,
      limitState: false,
      maxOptionState: false,
      minnOp: 1,
      maxxOp: 2,
      cancelVisible: false,
      validNum: 3,
      formOrder: 0,
      isCascade: false,
      questionId: 0,
      optionId: 0,
    };
    ret.push({ 'type': 1, 'order': tot, 'itemInfo': itemInfo });
    this.setState({ formInfoList: ret, formSize: tot + 1 });
  }
  addText() {
    const ret = this.deepCopy(this.state.formInfoList)
    const tot = this.state.formSize;
    const itemInfo = {
      title: '文本框',
      description: '',
      mustfill: false,
      defaultCont: '',
      content: '',
      cancelVisible: false,
      formOrder: 0,
      isCascade: false,
      questionId: 0,
      optionId: 0,
    };
    ret.push({ 'type': 2, 'order': tot, 'itemInfo': itemInfo });
    this.setState({ formInfoList: ret, formSize: tot + 1 });
  }
  addTextField() {
    const ret = this.deepCopy(this.state.formInfoList)
    const tot = this.state.formSize;
    const itemInfo = {
      title: '文本框',
      description: '',
      mustfill: false,
      defaultCont: '',
      content: '',
      cancelVisible: false,
      formOrder: 0,
      isCascade: false,
      questionId: 0,
      optionId: 0,
    };
    ret.push({ 'type': 3, 'order': tot, 'itemInfo': itemInfo });
    this.setState({ formInfoList: ret, formSize: tot + 1 });
  }
  addNumberArea() {
    const ret = this.deepCopy(this.state.formInfoList)
    const tot = this.state.formSize;
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
      cancelVisible: false,
      formOrder: 0,
      isCascade: false,
      questionId: 0,
      optionId: 0,
    };
    ret.push({ 'type': 4, 'order': tot, 'itemInfo': itemInfo });
    this.setState({ formInfoList: ret, formSize: tot + 1 });
  }
  addRating() {
    const ret = this.deepCopy(this.state.formInfoList)
    const tot = this.state.formSize;
    const itemInfo = {
      title: '评分',
      description: '',
      mustfill: false,
      allowHalf: false,
      cancelVisible: false,
      formOrder: 0,
      isCascade: false,
      questionId: 0,
      optionId: 0,
    };
    ret.push({ 'type': 5, 'order': tot, 'itemInfo': itemInfo });
    this.setState({ formInfoList: ret, formSize: tot + 1 });
  }
  addLocation() {
    const ret = this.deepCopy(this.state.formInfoList)
    const tot = this.state.formSize;
    const itemInfo = {
      title: '地理位置',
      description: '',
      mustfill: false,
      cancelVisible: false,
      formOrder: 0,
      isCascade: false,
      questionId: 0,
      optionId: 0,
    };
    ret.push({ 'type': 6, 'order': tot, 'itemInfo': itemInfo });
    this.setState({ formInfoList: ret, formSize: tot + 1 });
  }
  async saveForm() {
    const formData = this.state;
    for (let i = 0; i < formData.formInfoList.length; i++) {
      formData.formInfoList[i].itemInfo.formOrder = i;
    }
    const postReq = JSON.stringify({'opcode':1,'formId':this.props.fId,'formData':formData});
    const result = await Axios.post('form/update',postReq);
    if(result.data.statecode === 0){
      console.log('Save Success');
      this.setState({
        ...result.data.formData
      });
    }
    else{
      console.log('Save Failed');
    }
  }
  lastPage() {
    this.props.changePageNumber(4);
  }
  nextPage() {
    this.props.changePageNumber(6);
  }
  emptyOp() {

  }
  handleDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    let tmpFormInfoList = this.deepCopy(this.state.formInfoList);
    const [remove] = tmpFormInfoList.splice(source.index, 1);
    tmpFormInfoList.splice(destination.index, 0, remove);
    for(let i = source.index;i <= destination.index;i ++){
      if(tmpFormInfoList[i].itemInfo.isCascade && tmpFormInfoList[i].itemInfo.questionId === remove.order){
        tmpFormInfoList[i].itemInfo.isCascade = false;
        tmpFormInfoList[i].itemInfo.questionId = -1;
        tmpFormInfoList[i].itemInfo.optionId = -1;
      }
    }
    for(let i = destination.index + 1;i <= source.index;i ++){
      if(remove.itemInfo.isCascade && remove.itemInfo.questionId === tmpFormInfoList[i].order){
        tmpFormInfoList[destination.index].itemInfo.isCascade = false;
        tmpFormInfoList[destination.index].itemInfo.questionId = -1;
        tmpFormInfoList[destination.index].itemInfo.optionId = -1;
      }
    }
    this.setState({
      formInfoList: tmpFormInfoList
    });
  }
  getOptions(ii:number){
    const formInfoList = this.state.formInfoList;
    const options = [];
    for(let i = 0;i < formInfoList.length;i ++){
      if(i >= ii) continue;
      if(formInfoList[i].type === 0 || formInfoList[i].type === 1){
        const children = [];
        for(let j = 0;j < formInfoList[i].itemInfo.choices.length;j ++){
          const child = {'label':formInfoList[i].itemInfo.choices[j].text,'value':formInfoList[i].itemInfo.choices[j].id};
          children.push(child);
        }
        const option = {'label':'问题'+String(i+1),'value':formInfoList[i].order,'children':children};
        options.push(option);
      }
    }
    return options;
  }
  getFormItem(p: DraggableProvided, t: any, i: number) {
    const options = this.getOptions(i);
    return (<Question options={options} p={p} formOrder={i + 1} formInfo={t} curId={this.state.curId} changeCurId={this.changeCurId} removeFormItem={this.removeFormItem} updateItemInfo={this.updateItemInfo}></Question>);
  }
  updateFormTitle(e: ChangeEvent){
    const valueNode = e.target.getAttributeNode('value')
    if(valueNode != null){
      this.setState({
        formTitle:valueNode.value
      })
    }
  }
  render() {
    return (
      (this.props.pageNumber === 5) ?
        (<div className='editpage' style={{position:'fixed',top:'7vh',width:'100vw',height:'93vh',backgroundColor:'#F0F0F0'}}>
          <div className='toolbar' style={{position:'fixed',top:'7vh',width:'15vw',height:'93vh',backgroundColor:'#FFFFFF'}}>
            <button className="basiccomp" onClick={() => this.addSingleChoice()}><img className="compicon" src="./png/singlechoice.png"/>Single Choice</button>
            <button className="basiccomp" onClick={() => this.addMultipleChoice()}><img className="compicon" src="./png/multiplechoice.png"/>Multiple Choice</button>
            <button className="basiccomp" onClick={() => this.addText()} ><img className="compicon" src="./png/textinput.png"/>Text</button>
            <button className="basiccomp" onClick={() => this.addTextField()}><img className="compicon" src="./png/textfield.png"/>Text Field</button>
            <button className="basiccomp" onClick={() => this.addNumberArea()}><img className="compicon" src="./png/numberarea.png"/>Number Area</button>
            <button className="basiccomp" onClick={() => this.addRating()} ><img className="compicon" src="./png/rating.png"/>Rating</button>
            <Divider/>
            <button className="extencomp" onClick={() => this.addLocation()} ><img className="compicon" src="./png/location.png"/>Location</button>
            <button className="extencomp" ><img className="compicon" src="./png/divider.png"/>Divider</button>
          </div>
          
            <div className='editform'>
              <div className='editformtitle'>
                <input id='edit-form-title' onBlur={(e)=>this.updateFormTitle(e)} defaultValue={this.state.formTitle}>
                </input>
              </div>
              <DragDropContext onDragEnd={(result) => this.handleDragEnd(result)}>
                <Droppable droppableId="mydrop">
                  {provided => (
                    <div className='editformitem' ref={provided.innerRef} {...provided.droppableProps}>
                      {this.state.formInfoList.map((t, i) => (
                        <Draggable draggableId={String(t.order + 1)} index={i} key={String(t.order + 1)}>
                          {p => (this.getFormItem(p, t, i))}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <Button type='link'><img className='mysmallbutton' src="./png/submit.png"></img></Button>
            </div>
          
          
          <div className="fixbutton" style={{ position: 'fixed', left: '83vw', bottom: '5vh' }}>
            <Button onClick={() => this.lastPage()} type="link"><img src="./png/last.png"></img></Button>
            <Button onClick={() => this.nextPage()} type="link"><img src="./png/next.png"></img></Button>
            <Button onClick={() => this.saveForm()} type="link"><img src="./png/save.png"></img></Button>
          </div>
        </div>)
        : (this.props.pageNumber === 6) ?
          (
            <SettingPage changeDate={this.changeDate} changeTimeState={this.changeTimeState} saveForm={this.saveForm} changeFillPriv={this.changeFillPriv} pageNumber={this.props.pageNumber} changePageNumber={this.props.changePageNumber}>SettingPage</SettingPage>
          )
          : (this.props.pageNumber === 7) ?
            (
              <PubPage fId={this.props.fId} pageNumber={this.props.pageNumber} changePageNumber={this.props.changePageNumber}></PubPage>
            )
            : (<div />)
    );
  }
}
export default EditPage;
