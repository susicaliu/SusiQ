import { Radio, Rate, Input, Checkbox } from 'antd';
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
    allowHalf: boolean,
    cancelVisible: boolean,
};
class Rating extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: '评分',
            description: '',
            mustfill: false,
            allowHalf: false,
            cancelVisible: false,
            
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
    changeAllowHalf(e:CheckboxChangeEvent){
        this.setState({
            allowHalf: !this.state.allowHalf
        });
    }
    changeMustFill(e:CheckboxChangeEvent){
        this.setState({
            mustfill: !this.state.mustfill
        });
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
            <div className = 'rating'>
                <div className = 'formitem' style={{width:'60%'}} onClick = {()=>this.handleClick()} onMouseEnter = {()=>this.setCancelVisible(true)} onMouseLeave = {()=>this.setCancelVisible(false)}>
                    {this.state.cancelVisible ? 
                    <div className = 'mycancel'>
                        <CloseCircleOutlined onClick={()=>this.props.removeFormItem(this.props.order)}/>
                    </div> 
                    :<div/>
                    }
                    <p>{this.state.title}</p>
                    <p>{this.state.description}</p>
                    <Rate disabled = {!this.props.fillState}></Rate>
                </div>
                {(this.props.curId === this.props.order) ?
                <div className = 'mypanel' style={{position:'fixed',right:'20px',top:'100px', width:'300px'}}>
                    <p>标题</p>
                    <Input defaultValue={this.state.title} onChange={(e)=>this.changeTitle(e)}></Input>
                    <p>描述</p>
                    <Input defaultValue={this.state.description} onChange={(e)=>this.changeDescription(e)}></Input>
                    <Checkbox onChange={(e)=>this.changeMustFill(e)}>这是个必填项</Checkbox>
                    <Checkbox onChange={(e)=>this.changeAllowHalf(e)}>允许半颗星</Checkbox>
                </div>
                :<div/>}
            </div>
        );  
    }
}
export default Rating;
