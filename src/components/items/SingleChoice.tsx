import { Radio, Input, Checkbox, Divider, Button, InputNumber } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import React, { ChangeEvent } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import {
    CloseCircleOutlined
} from '@ant-design/icons';
type Props = {
    order: number,
    fillState: boolean,
    curId: number,
    changeCurId: any,
    removeFormItem: any,
    itemInfo: any,
    updateItemInfo: any,
    updateAnswer: any,
    updateFillState: any,
    filling: number,
};

type State = {
};
class SingleChoice extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }
    handleValueChange(e: RadioChangeEvent){
        const value = e.target.value;
        const mustfill = (!this.props.itemInfo.mustfill || value > 0);
        const upState = (!this.props.itemInfo.limitState || this.props.itemInfo.limitNum[value-1] > 0);
        if(mustfill && upState){
            this.props.updateAnswer(this.props.order, value);
            this.props.updateFillState(this.props.order, 0);
        }
        else if(!mustfill){
            this.props.updateFillState(this.props.order, 1);
        }
        else {
            this.props.updateFillState(this.props.order, 2);
        }
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
    changeLimitState(e:CheckboxChangeEvent){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        newItemInfo.limitState = !newItemInfo.limitState;
        this.props.updateItemInfo(this.props.order,newItemInfo); 
    }
    changeChoice(i:number, e:ChangeEvent){
        const valueNode = e.target.getAttributeNode('value')
        if(valueNode != null){
            const newItemInfo = this.deepCopy(this.props.itemInfo);
            newItemInfo.choices[i] = valueNode.value;
            this.props.updateItemInfo(this.props.order,newItemInfo);
        }
    }
    addChoice(){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        newItemInfo.choices.push('选项'+String(newItemInfo.itemNum + 1));
        newItemInfo.limitNum.push(20);
        newItemInfo.itemNum ++;
        newItemInfo.validNum ++;
        this.props.updateItemInfo(this.props.order,newItemInfo);
    }
    changeLimitNum(i:number,e:number|string|undefined){
        if(e !== undefined){
            const newItemInfo = this.deepCopy(this.props.itemInfo);
            newItemInfo.limitNum[i] = Number(e);
            this.props.updateItemInfo(this.props.order,newItemInfo);
        }
    }
    handleClick(){
        this.props.changeCurId(this.props.order);
    }
    removeOption(id:number){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        const newChoices = [];
        const newLimitNum = [];
        for(let i = 0;i < newItemInfo.choices.length - 1;i ++){
            if(i !== id){
                newChoices.push(newItemInfo.choices[i]);
                newLimitNum.push(newItemInfo.limitNum[i]);
            }
        }
        newItemInfo.validNum --;
        newItemInfo.choices = newChoices;
        newItemInfo.limitNum = newLimitNum;
        this.props.updateItemInfo(this.props.order,newItemInfo);
    }
    render() {
        const radioList = [];
        for(let i = 0;i < this.props.itemInfo.choices.length;i ++){
            radioList.push({label: this.props.itemInfo.choices[i], value: i + 1, disabled: !this.props.fillState});
        }
        const itemList = [];
        for(let i = 0;i < this.props.itemInfo.choices.length;i ++){
            if(this.props.itemInfo.limitState){
                itemList.push(
                <div key={'MC'+String(this.props.order)+'_I'+String(i)}>
                    <pre><Input style={{width:'200px'}} defaultValue = {this.props.itemInfo.choices[i]} onChange = {(e)=>this.changeChoice(i,e)} ></Input></pre>
                    <InputNumber style={{width:'60px'}} defaultValue = {this.props.itemInfo.limitNum[i]} onChange = {(e)=>this.changeLimitNum(i,e)}></InputNumber>
                    <CloseCircleOutlined onClick = {()=>this.removeOption(i)}></CloseCircleOutlined>
                </div>);
            }
            else{
                itemList.push(
                    <div key={'MC'+String(this.props.order)+'_I'+String(i)}>
                        <pre><Input style={{width:'260px'}} defaultValue = {this.props.itemInfo.choices[i]} onChange = {(e)=>this.changeChoice(i,e)} ></Input></pre>
                        <CloseCircleOutlined onClick = {()=>this.removeOption(i)}></CloseCircleOutlined>
                    </div>);
            }
        }
        return (
            <div className = 'singlechoice'>
                <div className = 'formitem' style={{width:'60%'}} onClick = {()=>this.handleClick()} onMouseEnter = {()=>this.setCancelVisible(true)} onMouseLeave = {()=>this.setCancelVisible(false)}>
                    {this.props.itemInfo.cancelVisible ? 
                    <div className = 'mycancel'>
                        <CloseCircleOutlined onClick={()=>this.props.removeFormItem(this.props.order)}/>
                    </div> 
                    :<div/>
                    }
                    <p>{this.props.itemInfo.title}</p>
                    <p>{this.props.itemInfo.description}</p>
                    {(this.props.filling === 1) ?
                    <div>这是个必填项</div>
                    :(this.props.filling === 2) ?
                    <div>所选选项部分超过选项数量配额</div>
                    :<div/>
                    }
                    <Radio.Group onChange = {(e)=>this.handleValueChange(e)} defaultValue = {0} options = {radioList}></Radio.Group>
                </div>
                {(!this.props.fillState && this.props.curId === this.props.order) ?
                <div className = 'mypanel' style={{position:'fixed',right:'20px',top:'100px', width:'300px'}}>
                    <p>标题</p>
                    <pre><Input defaultValue={this.props.itemInfo.title} onChange={(e)=>this.changeTitle(e)}></Input></pre>
                    <p>描述</p>
                    <pre><Input defaultValue={this.props.itemInfo.description} onChange={(e)=>this.changeDescription(e)}></Input></pre>
                    <Checkbox onChange={(e)=>this.changeMustFill(e)}>这是个必填项</Checkbox>
                    <Divider></Divider>
                    <p>选项内容</p>
                    {itemList}
                    <Button onClick={()=>this.addChoice()}>添加选项</Button>
                    <Divider></Divider>
                    <Checkbox onChange={(e)=>this.changeLimitState(e)}>设置选项配额</Checkbox>
                </div>
                :<div/>}
            </div>
        );  
    }
}
export default SingleChoice;
