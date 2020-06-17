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
};

type State = {
    title: string,
    description: string,
    mustfill: boolean,
    choices: string[],
    itemNum: number,
    choiceValue: number[],
    limitState: boolean,
    limitNum: number[],
    cancelVisible: boolean,
    validState: boolean[],
    validNum: number,
};
class SingleChoice extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: '单选',
            description: '',
            mustfill:false,
            choices: ['选项1','选项2','选项3'],
            itemNum: 3,
            choiceValue: [],
            limitState: false,
            limitNum: [20,20,20],
            cancelVisible: false,
            validState: [true,true,true],
            validNum: 3,
        };
    }

    componentDidMount() {

    }
    onChange(e: RadioChangeEvent){
        this.setState({
            choiceValue: [e.target.value]
        });
    }
    changeTitle(e:ChangeEvent){
        const valueNode = e.target.getAttributeNode('value')
        if(valueNode != null){
            this.setState({
                title: valueNode.value
            });
        }
    }
    changeDescription(e:ChangeEvent){
        const valueNode = e.target.getAttributeNode('value')
        if(valueNode != null){
            this.setState({
                description: valueNode.value
            });
        }
    }
    changeMustFill(e:CheckboxChangeEvent){
        this.setState({
            mustfill: !this.state.mustfill
        });
    }
    changeLimitState(e:CheckboxChangeEvent){
        this.setState({
            limitState: !this.state.limitState
        });
    }
    newList(list:any[]){
        const ret: any[] = []
        list.forEach(item=>{
            ret.push(item)
        });
        return ret;
    }
    changeChoice(i:number, e:ChangeEvent){
        const valueNode = e.target.getAttributeNode('value')
        if(valueNode != null){
            const newChoices = this.newList(this.state.choices)
            newChoices[i] = valueNode.value
            this.setState({
                choices: newChoices
            });
        }
    }
    addChoice(){
        const newChoices = this.newList(this.state.choices);
        const newLimits = this.newList(this.state.limitNum);
        const newValid = this.newList(this.state.validState);
        newChoices.push('选项'+String(this.state.itemNum + 1));
        newLimits.push(20);
        newValid.push(true);
        this.setState({
            choices: newChoices,
            limitNum: newLimits,
            validState: newValid,
            itemNum: this.state.itemNum + 1,
            validNum: this.state.validNum + 1,
        });
    }
    changeLimitNum(i:number,e:number|string|undefined){
        if(e !== undefined){
            const newLimits = this.newList(this.state.limitNum);
            newLimits[i] = Number(e);
            this.setState({
                limitNum: newLimits,
            });
        }
    }
    handleClick(){
        this.props.changeCurId(this.props.order);
    }
    setCancelVisible(s:boolean){
        this.setState({
            cancelVisible: s
        });
    }
    removeOption(id:number){
        const newValid = this.newList(this.state.validState);
        newValid[id] = false;
        this.setState({
            validState: newValid,
            validNum: this.state.validNum - 1,
        });
    }
    render() {
        const radioList = [];
        for(let i = 0;i < this.state.choices.length;i ++){
            if(this.state.validState[i])
                radioList.push({label: this.state.choices[i], value: i + 1, disabled: !this.props.fillState});
        }
        const itemList = [];
        for(let i = 0;i < this.state.choices.length;i ++){
            if(this.state.validState[i]){
                if(this.state.limitState){
                    itemList.push(
                    <div>
                        <Input style={{width:'200px'}} defaultValue = {this.state.choices[i]} onChange = {(e)=>this.changeChoice(i,e)} key={'MC'+String(this.props.order)+'_I'+String(i)}></Input>
                        <InputNumber style={{width:'60px'}} defaultValue = {this.state.limitNum[i]} onChange = {(e)=>this.changeLimitNum(i,e)}></InputNumber>
                        <CloseCircleOutlined onClick = {()=>this.removeOption(i)}></CloseCircleOutlined>
                    </div>);
                }
                else{
                    itemList.push(
                        <div>
                            <Input style={{width:'260px'}} defaultValue = {this.state.choices[i]} onChange = {(e)=>this.changeChoice(i,e)} key={'MC'+String(this.props.order)+'_I'+String(i)}></Input>
                            <CloseCircleOutlined onClick = {()=>this.removeOption(i)}></CloseCircleOutlined>
                        </div>);
                }
            }
        }
        return (
            <div className = 'singlechoice'>
                <div className = 'formitem' style={{width:'60%'}} onClick = {()=>this.handleClick()} onMouseEnter = {()=>this.setCancelVisible(true)} onMouseLeave = {()=>this.setCancelVisible(false)}>
                    {this.state.cancelVisible ? 
                    <div className = 'mycancel'>
                        <CloseCircleOutlined onClick={()=>this.props.removeFormItem(this.props.order)}/>
                    </div> 
                    :<div/>
                    }
                    <p>{this.state.title}</p>
                    <p>{this.state.description}</p>
                    <Radio.Group onChange = {(e)=>this.onChange(e)} options = {radioList}></Radio.Group>
                </div>
                {(this.props.curId === this.props.order) ?
                <div className = 'mypanel' style={{position:'fixed',right:'20px',top:'100px', width:'300px'}}>
                    <p>标题</p>
                    <Input defaultValue={this.state.title} onChange={(e)=>this.changeTitle(e)}></Input>
                    <p>描述</p>
                    <Input defaultValue={this.state.description} onChange={(e)=>this.changeDescription(e)}></Input>
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
