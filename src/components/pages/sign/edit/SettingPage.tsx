import React from 'react';
import { Button, Checkbox, Divider, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

type Props = {
    pageNumber: number,
    changePageNumber: any,
    changeFillPriv: any,
    saveForm: any,
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
  lastPage(){
    this.props.changePageNumber(5);
  }
  nextPage(){
    this.props.changePageNumber(7);
  }
  render() {
    return (
      <div className="settingpage">
        <div className="settingform">
          <p>访问设置</p>
          <Checkbox>定时启用/停止表单</Checkbox>
          <Divider></Divider>
          <p>填写设置</p>
          <Radio.Group defaultValue={1} onChange={(e)=>this.changeFillPriv(e)}>
            <Radio value={1}>仅限注册用户</Radio>
            <Radio value={2}>无需注册，每人可填写N次</Radio>
            <Radio value={3}>无需注册，每人每天可填写N次</Radio>
          </Radio.Group>
        </div>
        <div className="fixbutton" style={{position:'fixed', right:'20px', bottom:'200px'}}>
          <Button onClick = {()=>this.lastPage()}>Last</Button>
          <Button onClick = {()=>this.nextPage()}>Next</Button>
          <Button onClick = {()=>this.props.saveForm()}>Save</Button>
        </div>
      </div>
    );
  }
}
export default SettingPage;
