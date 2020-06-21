import React from 'react';
import { Button, Checkbox, Divider, Radio, DatePicker } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import moment from 'moment';

type Props = {
    pageNumber: number,
    changePageNumber: any,
    changeFillPriv: any,
    saveForm: any,
    changeTimeState: any,
    changeDate: any,
};

type State = {
};
class SettingPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    
  }
  changeFillPriv(e:RadioChangeEvent) {
    this.props.changeFillPriv(e.target.value);
  }
  changeDate(e:any){
    if(e instanceof Array){
      if(e.length > 1){
        this.props.changeDate(moment(e[0]).valueOf(),moment(e[1]).valueOf());
      }
    }
  }
  lastPage(){
    this.props.changePageNumber(5);
  }
  nextPage(){
    this.props.changePageNumber(7);
  }
  changeTimeState() {
    this.props.changeTimeState();
  }
  render() {
    return (
      <div className="settingpage" style={{position:'fixed',top:'7vh',width:'100vw',height:'93vh',backgroundColor:'#F0F0F0'}}>
        <div className="settingform">
          <p>访问设置</p>
          <Checkbox onChange={()=>this.changeTimeState()}>定时启用/停止表单</Checkbox>
          <DatePicker.RangePicker showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm" onOk={(e)=>this.changeDate(e)}/>
          <Divider></Divider>
          <p>填写设置</p>
          <Radio.Group style={{textAlign:"left"}} defaultValue={1} onChange={(e)=>this.changeFillPriv(e)} >
            <Radio style={{display: 'block',height: '30px',lineHeight: '30px',}} value={1}>仅限注册用户</Radio>
            <Radio style={{display: 'block',height: '30px',lineHeight: '30px',}} value={2}>无需注册，每人可填写N次</Radio>
            <Radio style={{display: 'block',height: '30px',lineHeight: '30px',}} value={3}>无需注册，每人每天可填写N次</Radio>
          </Radio.Group>
        </div>
        <div className="fixbutton" style={{ position: 'fixed', left: '83vw', bottom: '5vh' }}>
            <Button onClick={() => this.lastPage()} type="link"><img src="./png/last.png"></img></Button>
            <Button onClick={() => this.nextPage()} type="link"><img src="./png/next.png"></img></Button>
            <Button onClick={() => this.props.saveForm()} type="link"><img src="./png/save.png"></img></Button>
        </div>
      </div>
    );
  }
}
export default SettingPage;
