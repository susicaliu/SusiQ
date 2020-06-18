import { Input, Checkbox } from 'antd';
import React, { ChangeEvent } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import {
    CloseCircleOutlined
} from '@ant-design/icons';
const { TextArea } = Input;
type Props = {
    order: number,
    fillState: boolean,
    curId: number,
    changeCurId: any,
    removeFormItem: any,
    itemInfo: any,
    updateItemInfo: any,
    updateAnswer: any,
    filling: number,
    updateFillState: any,
};

type State = {
};
class TextField extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }
    deepCopy(x: any) {
        return JSON.parse(JSON.stringify(x));
    }
    changeTitle(e:ChangeEvent){
        const valueNode = e.target.getAttributeNode('value')
        if(valueNode != null){
            const newItemInfo = this.deepCopy(this.props.itemInfo);
            newItemInfo.title = valueNode.value;
            this.props.updateItemInfo(this.props.order,newItemInfo);
        }
    }
    changeDescription(e:ChangeEvent){
        const valueNode = e.target.getAttributeNode('value')
        if(valueNode != null){
            const newItemInfo = this.deepCopy(this.props.itemInfo);
            newItemInfo.description = valueNode.value;
            this.props.updateItemInfo(this.props.order,newItemInfo);
        }
    }
    changeMustFill(e:CheckboxChangeEvent){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        newItemInfo.mustfill = !newItemInfo.mustfill;
        this.props.updateItemInfo(this.props.order,newItemInfo);
    }
    setCancelVisible(s:boolean){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        newItemInfo.cancelVisible = s;
        this.props.updateItemInfo(this.props.order,newItemInfo);
    }
    changeDefaultCont(e:ChangeEvent){
        const valueNode = e.target.getAttributeNode('value')
        if(valueNode != null){
            const newItemInfo = this.deepCopy(this.props.itemInfo);
            newItemInfo.defaultCont = valueNode.value;
            this.props.updateItemInfo(this.props.order,newItemInfo);
        }
    }
    handleClick(){
        this.props.changeCurId(this.props.order);
    }
    handleValueChange(e:ChangeEvent){
        const valueNode = document.getElementById('TextArea_'+String(this.props.order));
        if(valueNode != null){            
            const ori = valueNode.outerHTML;
            let lflag = 0;
            let rflag = 0;
            let value = '';
            for(let i = 0;i < ori.length;i ++){
                if(ori[i] === '>'){
                    lflag = i + 1;
                    break;
                }
            }
            for(let i = ori.length - 1;i >= 0;i --){
                if(ori[i] === '<'){
                    rflag = i;
                    break;
                }
            }
            for(let i = lflag;i < rflag;i ++){
                value += ori[i];
            }
            const mustfill = (!this.props.itemInfo.mustfill || value.length > 0);
            if(mustfill){
                this.props.updateAnswer(this.props.order, value);
                this.props.updateFillState(this.props.order, 0);
            }
            else{
                this.props.updateFillState(this.props.order, 1);
            }
        }
    }
    render() {
        return (
            <div className = 'textinput'>
                <div className = 'formitem' style={{width:'60%'}} onClick = {()=>this.handleClick()} onMouseEnter = {()=>this.setCancelVisible(true)} onMouseLeave = {()=>this.setCancelVisible(false)}>
                    {this.props.itemInfo.cancelVisible ? 
                    <div className = 'mycancel'>
                        <CloseCircleOutlined onClick={()=>this.props.removeFormItem(this.props.order)}/>
                    </div> 
                    :<div/>
                    }
                    <p>{this.props.itemInfo.title}</p>
                    <p>{this.props.itemInfo.description}</p>
                    <pre>
                        <TextArea id={'TextArea_'+String(this.props.order)} placeholder = {this.props.itemInfo.content} disabled = {!this.props.fillState} onChange={(e)=>this.handleValueChange(e)}></TextArea>
                    </pre>
                </div>
                {(!this.props.fillState && this.props.curId === this.props.order) ?
                <div className = 'mypanel' style={{position:'fixed',right:'20px',top:'100px', width:'300px'}}>
                    <p>标题</p>
                    <pre><Input defaultValue={this.props.itemInfo.title} onChange={(e)=>this.changeTitle(e)}></Input></pre>
                    <p>描述</p>
                    <pre><Input defaultValue={this.props.itemInfo.description} onChange={(e)=>this.changeDescription(e)}></Input></pre>
                    <p>默认提示文字</p>
                    <pre><Input onChange={(e)=>this.changeDefaultCont(e)}></Input></pre>
                    <Checkbox onChange={(e)=>this.changeMustFill(e)}>这是个必填项</Checkbox>
                </div>
                :<div/>} 
            </div>
        );  
    }
}
export default TextField;
