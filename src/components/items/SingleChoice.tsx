import { Radio, Input, Checkbox, Divider, Button, InputNumber, Cascader } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import React, { ChangeEvent } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import {
    CloseCircleOutlined
} from '@ant-design/icons';
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
    updateFillState: any,
    filling: number,
    formOrder: number,
    options: any,
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
        const tmp = [e.target.value];
        const value:any[] = [];
        tmp.forEach(i=>{
            value.push({'value':Number(i),'choice':this.props.itemInfo.choices[Number(i)-1]});
        });
        const mustfill = (!this.props.itemInfo.mustfill || value.length > 0);
        let upState = true;
        value.forEach(option=>{
            if(this.props.itemInfo.limitState && option.choice.limitNum <= 0){
                upState = false;
            }
        });
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
    handleClick(){
        this.props.changeCurId(this.props.order);
    }
    render() {
        const radioList = [];
        for(let i = 0;i < this.props.itemInfo.choices.length;i ++){
            radioList.push({label: this.props.itemInfo.choices[i].text, value: i + 1, disabled: !this.props.fillState});
        }
        const itemList = [];
        for(let i = 0;i < this.props.itemInfo.choices.length;i ++){
            if(this.props.itemInfo.limitState){
                itemList.push(
                <div key={'MC'+String(this.props.order)+'_I'+String(i)}>
                    <pre><Input className="mypanel-input" style={{width:'60%'}} defaultValue = {this.props.itemInfo.choices[i].text} onBlur={(e)=>this.changeChoice(i,e)} onChange = {(e)=>this.changeChoice(i,e)} ></Input>
                    <InputNumber style={{width:'20%'}} defaultValue = {this.props.itemInfo.choices[i].limitNum} onChange = {(e)=>this.changeLimitNum(i,e)}></InputNumber>
                    <CloseCircleOutlined onClick = {()=>this.removeOption(i)}></CloseCircleOutlined></pre>
                </div>);
            }
            else{
                itemList.push(
                    <div key={'MC'+String(this.props.order)+'_I'+String(i)}>
                        <pre><Input className="mypanel-input" style={{width:'80%'}} defaultValue = {this.props.itemInfo.choices[i].text} onBlur={(e)=>this.changeChoice(i,e)} onChange = {(e)=>this.changeChoice(i,e)} ></Input>
                        <CloseCircleOutlined onClick = {()=>this.removeOption(i)}></CloseCircleOutlined></pre>
                    </div>);
            }
        }
        return (
            <div className = 'singlechoice'>
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
                    :<div/>
                    }
                    <Radio.Group onChange = {(e)=>this.handleValueChange(e)} defaultValue = {0} options = {radioList}></Radio.Group>
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
                    <Checkbox onChange={(e)=>this.changeMustFill(e)}>这是个必填项</Checkbox>
                    <Divider></Divider>
                    <p className="mypanel-p">选项内容</p>
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
