import { InputNumber, Input, Checkbox, Divider, Button, Cascader } from 'antd';
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
    filling: number,
    updateFillState: any,
    formOrder: number,
    options: any,
};

type State = {
};
class NumberArea extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: '数字',
            description: '',
            mustfill: false,
            unit: '',
            limitState: false,
            minn: 1,
            maxx: 10,
            allowFloat: false,
            roundFloat: false,
            step: 0,
            cancelVisible: false
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
    changeLimitState(e:CheckboxChangeEvent){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        newItemInfo.limitState = !newItemInfo.limitState;
        this.props.updateItemInfo(this.props.order,newItemInfo); 
    }
    changeAllowFloat(e:CheckboxChangeEvent){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        newItemInfo.allowFloat = !newItemInfo.allowFloat;
        this.props.updateItemInfo(this.props.order,newItemInfo); 
    }
    changeRoundFloat(e:CheckboxChangeEvent){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        newItemInfo.roundFloat = !newItemInfo.roundFloat;
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
    changeUnit(e:ChangeEvent){
        const valueNode = e.target.getAttributeNode('value')
        if(valueNode != null){
            const newItemInfo = this.deepCopy(this.props.itemInfo);
            newItemInfo.unit = valueNode.value;
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
    changeStep(e:number|string|undefined){
        if(e !== undefined){
            const newItemInfo = this.deepCopy(this.props.itemInfo);
            newItemInfo.step = Number(e);
            this.props.updateItemInfo(this.props.order,newItemInfo);
        }
    }
    handleClick(){
        this.props.changeCurId(this.props.order);
    }
    setCancelVisible(s:boolean){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        newItemInfo.cancelVisible = s;
        this.props.updateItemInfo(this.props.order,newItemInfo);
    }
    handleValueChange(e:number|string|undefined){
        const mustfill = (!this.props.itemInfo.mustfill || e !== undefined);
        if(e !== undefined){
            let value = Number(e);
            if(mustfill){
                if(this.props.itemInfo.limitState){
                    value = Math.min(value,this.props.itemInfo.maxxOp);
                    value = Math.max(value,this.props.itemInfo.minnOp);
                }
                if(this.props.itemInfo.allowFloat){
                    if(this.props.itemInfo.roundFloat){
                        let base = 1;
                        for(let i = 0;i < this.props.itemInfo.step;i ++)
                            base *= 10;
                        value *= base;
                        value = Math.round(value);
                        value /= base;
                    }
                }
                else{
                    value = Math.round(value);
                }
                this.props.updateFillState(this.props.order, 0);
                this.props.updateAnswer(this.props.order, value);
            }
        }
        if(!mustfill){
            this.props.updateFillState(this.props.order, 1);
        }
    }
    render() {
        return (
            <div className = 'numberarea'>
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
                    :<div/>
                    }
                    <InputNumber disabled = {!this.props.fillState} onChange={(e)=>this.handleValueChange(e)}></InputNumber>
                </div>
                {(!this.props.fillState && this.props.curId === this.props.order) ?
                <div className = 'mypanel'>
                    <Checkbox onChange={()=>this.changeCascade()} checked={this.props.itemInfo.isCascade}>是否是级联问题</Checkbox>
                    {this.props.itemInfo.isCascade
                    ? <Cascader options={this.props.options} onChange={(e)=>this.changeCascader(e)} value={[this.props.itemInfo.questionId,this.props.itemInfo.optionId]}/>
                    : <div/>}
                    <Divider></Divider>
                    <p className="mypanel-p">标题</p>
                    <pre><Input className="mypanel-input" defaultValue={this.props.itemInfo.title} onBlur={(e)=>this.changeTitle(e)} onChange={(e)=>this.changeTitle(e)}></Input></pre>
                    <p className="mypanel-p">描述</p>
                    <pre><Input className="mypanel-input" defaultValue={this.props.itemInfo.description} onBlur={(e)=>this.changeDescription(e)} onChange={(e)=>this.changeDescription(e)}></Input></pre>
                    <Checkbox onChange={(e)=>this.changeMustFill(e)}>这是个必填项</Checkbox>
                    <Divider></Divider>
                    <p className="mypanel-p">单位</p>
                    <pre><Input className="mypanel-input" onBlur={(e)=>this.changeUnit(e)} onChange={(e)=>this.changeUnit(e)}></Input></pre>
                    <Divider></Divider>
                    <Checkbox onChange={(e)=>this.changeLimitState(e)}>设置填写范围</Checkbox>
                    {this.props.itemInfo.limitState 
                    ? <div className="site-input-number-wrapper">
                        <InputNumber defaultValue={this.props.itemInfo.minn} onChange={(e)=>this.changeMinnOp(e)}></InputNumber>
                        <InputNumber defaultValue={this.props.itemInfo.maxx} onChange={(e)=>this.changeMaxxOp(e)}></InputNumber>
                      </div>
                    : <div/>}
                    <Checkbox onChange={(e)=>this.changeAllowFloat(e)}>允许小数</Checkbox>

                    {this.props.itemInfo.allowFloat
                    ?<Checkbox onChange={(e)=>this.changeRoundFloat(e)}>保留N位小数</Checkbox>
                    :<div/>}

                    {this.props.itemInfo.roundFloat
                    ?<div><p>N=</p><InputNumber onChange={(e)=>this.changeStep(e)}></InputNumber></div>
                    :<div/>
                    }
                </div>
                :<div/>
                }
            </div>
        );  
    }
}
export default NumberArea;
