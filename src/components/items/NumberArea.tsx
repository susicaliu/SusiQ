import { InputNumber, Input, Checkbox, Divider, Button } from 'antd';
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
    unit: string,
    limitState: boolean,
    minn: number,
    maxx: number,
    allowFloat: boolean,
    roundFloat: boolean,
    step: number,
    cancelVisible: boolean
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
    changeUnit(e:ChangeEvent){
        const valueNode = e.target.getAttributeNode('value')
        if(valueNode != null){
            this.setState({
                unit: valueNode.value
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
    changeAllowFloat(e:CheckboxChangeEvent){
        this.setState({
            allowFloat: !this.state.allowFloat
        });
    }
    changeRoundFloat(e:CheckboxChangeEvent){
        this.setState({
            roundFloat: !this.state.roundFloat
        });
    }
    changeMinn(e:number|string|undefined){
        if(e !== undefined){
            this.setState({
                minn: Number(e),
            });
        }
    }
    changeMaxx(e:number|string|undefined){
        if(e !== undefined){
            this.setState({
                maxx: Number(e),
            });
        }
    }
    changeStep(e:number|string|undefined){
        if(e !== undefined){
            this.setState({
                step: Number(e),
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
    render() {
        return (
            <div className = 'numberarea'>
                <div className = 'formitem' style={{width:'60%'}} onClick = {()=>this.handleClick()} onMouseEnter = {()=>this.setCancelVisible(true)} onMouseLeave = {()=>this.setCancelVisible(false)}>
                    {this.state.cancelVisible ? 
                    <div className = 'mycancel'>
                        <CloseCircleOutlined onClick={()=>this.props.removeFormItem(this.props.order)}/>
                    </div> 
                    :<div/>
                    }
                    <p>{this.state.title}</p>
                    <p>{this.state.description}</p>
                    <InputNumber disabled = {!this.props.fillState}></InputNumber>
                </div>
                {(this.props.curId === this.props.order) ?
                <div className = 'mypanel' style={{position:'fixed',right:'20px',top:'100px', width:'300px'}}>
                    <p>标题</p>
                    <Input defaultValue={this.state.title} onChange={(e)=>this.changeTitle(e)}></Input>
                    <p>描述</p>
                    <Input defaultValue={this.state.description} onChange={(e)=>this.changeDescription(e)}></Input>
                    <Checkbox onChange={(e)=>this.changeMustFill(e)}>这是个必填项</Checkbox>
                    <Divider></Divider>
                    <p>单位</p>
                    <Input onChange={(e)=>this.changeUnit(e)}></Input>
                    <Divider></Divider>
                    <Checkbox onChange={(e)=>this.changeLimitState(e)}>设置填写范围</Checkbox>
                    {this.state.limitState 
                    ? <div className="site-input-number-wrapper">
                        <InputNumber defaultValue={this.state.minn} onChange={(e)=>this.changeMinn(e)}></InputNumber>
                        <InputNumber defaultValue={this.state.maxx} onChange={(e)=>this.changeMaxx(e)}></InputNumber>
                      </div>
                    : <div/>}
                    <Checkbox onChange={(e)=>this.changeAllowFloat(e)}>允许小数</Checkbox>

                    {this.state.allowFloat
                    ?<Checkbox onChange={(e)=>this.changeRoundFloat(e)}>保留N位小数</Checkbox>
                    :<div/>}

                    {this.state.roundFloat
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
