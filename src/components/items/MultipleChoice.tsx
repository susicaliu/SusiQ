import { Checkbox, Input, Button, InputNumber, Divider, Radio } from 'antd';
import React, { ChangeEvent } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import {
    CloseCircleOutlined
} from '@ant-design/icons';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
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
class MultipleChoice extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
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
    changeMaxOptionState(e:CheckboxChangeEvent){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        newItemInfo.maxOptionState = !newItemInfo.maxOptionState;
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
    changeMinnOp(e:number|string|undefined){
        if(e !== undefined){
            const newItemInfo = this.deepCopy(this.props.itemInfo);
            newItemInfo.minnOp = Number(e);
            this.props.updateItemInfo(this.props.order,newItemInfo);
        }
    }
    changeMaxxOp(e:number|string|undefined){
        if(e !== undefined){
            const newItemInfo = this.deepCopy(this.props.itemInfo);
            newItemInfo.maxxOp = Number(e);
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
    handleValueChange(e: CheckboxValueType[]){
        const value:any[] = [];
        e.forEach(i=>{
            value.push(Number(i))
        });
        const minmax = (!this.props.itemInfo.maxOptionState || (value.length >= this.props.itemInfo.minnOp && value.length <= this.props.itemInfo.maxxOp));
        const mustfill = (!this.props.itemInfo.mustfill || value.length > 0);
        let upState = true;
        value.forEach(i=>{
            if(this.props.itemInfo.limitState && this.props.itemInfo.limitNum[i-1] <= 0){
                upState = false;
            }
        });
        if(mustfill && minmax && upState){
            this.props.updateAnswer(this.props.order, value);
            this.props.updateFillState(this.props.order, 0);
        }
        else if(!mustfill){
            this.props.updateFillState(this.props.order, 1);
        }
        else if(!upState){
            this.props.updateFillState(this.props.order,2);
        }
        else{
            this.props.updateFillState(this.props.order,3);
        }
    }
    render() {
        const optionList = [];
        for(let i = 0;i < this.props.itemInfo.choices.length;i ++){
            optionList.push({label: this.props.itemInfo.choices[i], value: i + 1, disabled: !this.props.fillState});
        }
        const itemList = [];
        for(let i = 0;i < this.props.itemInfo.choices.length;i ++){
            if(this.props.itemInfo.limitState){
                itemList.push(
                <div key={'MC'+String(this.props.order)+'_I'+String(i)}>
                    <pre><Input style={{width:'200px'}} defaultValue = {this.props.itemInfo.choices[i]} onChange = {(e)=>this.changeChoice(i,e)}></Input></pre>
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
            <div className = 'multiplechoice'>
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
                    :(this.props.filling === 3) ?
                    <div>
                        请选择{this.props.itemInfo.minnOp}~{this.props.itemInfo.maxxOp}项
                    </div>
                    :<div/>
                    }
                    <Checkbox.Group options={optionList} onChange={(e)=>this.handleValueChange(e)}></Checkbox.Group>
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
                    <Checkbox onChange={(e)=>this.changeMaxOptionState(e)}>设置多选限制</Checkbox>
                    {this.props.itemInfo.maxOptionState 
                    ? <div className="site-input-number-wrapper">
                        <InputNumber min={1} max={this.props.itemInfo.validNum} defaultValue={this.props.itemInfo.minnOp} onChange={(e)=>this.changeMinnOp(e)}></InputNumber>
                        <InputNumber min={1} max={this.props.itemInfo.validNum} defaultValue={this.props.itemInfo.maxxOp} onChange={(e)=>this.changeMaxxOp(e)}></InputNumber>
                      </div>
                    : <div/>}
                    <Checkbox onChange={(e)=>this.changeLimitState(e)}>设置选项配额</Checkbox>
                </div>
                :<div/>}
            </div>
        );  
    }
}
export default MultipleChoice;
