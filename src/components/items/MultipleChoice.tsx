import { Checkbox, Input, Button, InputNumber, Divider, Radio, Cascader } from 'antd';
import React, { ChangeEvent } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import {
    CloseCircleOutlined
} from '@ant-design/icons';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CascaderValueType } from 'antd/lib/cascader';
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
    formOrder: number,
    options: any,
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
    changeMustFill(){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        newItemInfo.mustfill = !newItemInfo.mustfill;
        this.props.updateItemInfo(this.props.order,newItemInfo);
    }
    setCancelVisible(s:boolean){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        newItemInfo.cancelVisible = s;
        this.props.updateItemInfo(this.props.order,newItemInfo);
    }
    changeMaxOptionState(){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        newItemInfo.maxOptionState = !newItemInfo.maxOptionState;
        this.props.updateItemInfo(this.props.order,newItemInfo);
    }
    changeLimitState(){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        newItemInfo.limitState = !newItemInfo.limitState;
        this.props.updateItemInfo(this.props.order,newItemInfo); 
    }
    changeCascade(){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        newItemInfo.isCascade = !newItemInfo.isCascade;
        this.props.updateItemInfo(this.props.order,newItemInfo); 
    }
    changeCascader(e:CascaderValueType){
        if(e && e.length > 1){
            const newItemInfo = this.deepCopy(this.props.itemInfo);
            newItemInfo.questionId = e[0];
            newItemInfo.optionId = e[1];
            this.props.updateItemInfo(this.props.order,newItemInfo);
        }
    }
    changeChoice(i:number, e:ChangeEvent){
        const valueNode = e.target.getAttributeNode('value')
        if(valueNode != null){
            const newItemInfo = this.deepCopy(this.props.itemInfo);
            newItemInfo.choices[i].text = valueNode.value;
            this.props.updateItemInfo(this.props.order,newItemInfo);
        }
    }
    addChoice(){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        newItemInfo.choices.push({'text':'选项'+String(newItemInfo.itemNum + 1),'id':newItemInfo.itemNum,'limitNum':20});
        newItemInfo.itemNum ++;
        newItemInfo.validNum ++;
        this.props.updateItemInfo(this.props.order,newItemInfo);
    }
    removeOption(id:number){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        const newChoices = [];
        for(let i = 0;i < newItemInfo.choices.length;i ++){
            if(id !== newItemInfo.choices[i].id){
                newChoices.push(newItemInfo.choices[i]);
            }
        }
        newItemInfo.validNum --;
        newItemInfo.choices = newChoices;
        this.props.updateItemInfo(this.props.order,newItemInfo);
    }
    changeLimitNum(i:number,e:number|string|undefined){
        if(e !== undefined){
            const newItemInfo = this.deepCopy(this.props.itemInfo);
            newItemInfo.choices[i].limitNum = Number(e);
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
    handleValueChange(e: CheckboxValueType[]){
        const value:any[] = [];
        e.forEach(i=>{
            value.push({'value':Number(i),'choice':this.props.itemInfo.choices[Number(i)-1]});
        });
        const minmax = (!this.props.itemInfo.maxOptionState || (value.length >= this.props.itemInfo.minnOp && value.length <= this.props.itemInfo.maxxOp));
        const mustfill = (!this.props.itemInfo.mustfill || value.length > 0);
        let upState = true;
        value.forEach(option=>{
            if(this.props.itemInfo.limitState && option.choice.limitNum <= 0){
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
            optionList.push({label: this.props.itemInfo.choices[i].text, value: i + 1, disabled: !this.props.fillState});
        }
        const itemList = [];
        for(let i = 0;i < this.props.itemInfo.choices.length;i ++){
            if(this.props.itemInfo.limitState){
                itemList.push(
                <div key={'MC'+String(this.props.order)+'_I'+String(i)}>
                    <pre><Input className="mypanel-input" style={{width:'60%'}} defaultValue = {this.props.itemInfo.choices[i].text} onChange = {(e)=>this.changeChoice(i,e)} onBlur={(e)=>this.changeChoice(i,e)}></Input>
                    <InputNumber style={{width:'20%'}} defaultValue = {this.props.itemInfo.choices[i].limitNum} onChange = {(e)=>this.changeLimitNum(i,e)}></InputNumber>
                    <CloseCircleOutlined onClick = {()=>this.removeOption(i)}></CloseCircleOutlined></pre>
                </div>);
            }
            else{
                itemList.push(
                    <div key={'MC'+String(this.props.order)+'_I'+String(i)} style={{width:'100%'}}>
                        <pre><Input className="mypanel-input" style={{width:'80%'}} defaultValue = {this.props.itemInfo.choices[i].text} onChange = {(e)=>this.changeChoice(i,e)} onBlur={(e)=>this.changeChoice(i,e)}></Input>
                        <CloseCircleOutlined onClick = {()=>this.removeOption(i)}></CloseCircleOutlined></pre>
                    </div>);
            }
        }
        return (
            <div className = 'multiplechoice'>
                <div className = 'formitem' onClick = {()=>this.handleClick()} onMouseEnter = {()=>this.setCancelVisible(true)} onMouseLeave = {()=>this.setCancelVisible(false)}>
                    {this.props.itemInfo.cancelVisible ? 
                    <div className = 'mycancel'>
                        <CloseCircleOutlined onClick={()=>this.props.removeFormItem(this.props.order)}/>
                    </div> 
                    :<div/>
                    }
                    <p>{String(this.props.formOrder)+'.'+this.props.itemInfo.title}</p>
                    <p>{this.props.itemInfo.description}</p>
                    {(this.props.filling === 1) ?
                    <div className='fill-error-tip'>这是个必填项</div>
                    :(this.props.filling === 2) ?
                    <div className='fill-error-tip'>所选选项部分超过选项数量配额</div>
                    :(this.props.filling === 3) ?
                    <div className='fill-error-tip'>
                        请选择{this.props.itemInfo.minnOp}~{this.props.itemInfo.maxxOp}项
                    </div>
                    :<div/>
                    }
                    <Checkbox.Group options={optionList} onChange={(e)=>this.handleValueChange(e)}></Checkbox.Group>
                </div>
                {(!this.props.fillState && this.props.curId === this.props.order) ?
                <div className = 'mypanel'>
                    <Checkbox onChange={()=>this.changeCascade()} checked={this.props.itemInfo.isCascade}>是否是级联问题</Checkbox>
                    {this.props.itemInfo.isCascade
                    ? <Cascader options={this.props.options} onChange={(e)=>this.changeCascader(e)} value={[this.props.itemInfo.questionId,this.props.itemInfo.optionId]}/>
                    : <div/>}
                    <Divider></Divider>
                    <p className="mypanel-p">标题</p>
                    <pre><Input className="mypanel-input" defaultValue={this.props.itemInfo.title} onChange={(e)=>this.changeTitle(e)} onBlur={(e)=>this.changeTitle(e)}></Input></pre>
                    <p className="mypanel-p">描述</p>
                    <pre><Input className="mypanel-input" defaultValue={this.props.itemInfo.description} onChange={(e)=>this.changeDescription(e)} onBlur={(e)=>this.changeDescription(e)}></Input></pre>
                    <Checkbox onChange={()=>this.changeMustFill()}>这是个必填项</Checkbox>
                    <Divider></Divider>
                    <p className="mypanel-p">选项内容</p>
                    {itemList}
                    <Button onClick={()=>this.addChoice()}>添加选项</Button>
                    <Divider></Divider>
                    <Checkbox onChange={()=>this.changeMaxOptionState()}>设置多选限制</Checkbox>
                    {this.props.itemInfo.maxOptionState 
                    ? <div className="site-input-number-wrapper">
                        <InputNumber min={1} max={this.props.itemInfo.validNum} defaultValue={this.props.itemInfo.minnOp} onChange={(e)=>this.changeMinnOp(e)}></InputNumber>
                        <InputNumber min={1} max={this.props.itemInfo.validNum} defaultValue={this.props.itemInfo.maxxOp} onChange={(e)=>this.changeMaxxOp(e)}></InputNumber>
                      </div>
                    : <div/>}
                    <Checkbox onChange={()=>this.changeLimitState()}>设置选项配额</Checkbox>
                </div>
                :<div/>}
            </div>
        );  
    }
}
export default MultipleChoice;
