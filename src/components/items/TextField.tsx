import { Input, Checkbox } from 'antd';
import React, { ChangeEvent } from 'react';
import TextArea from 'antd/lib/input/TextArea';
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
    defaultCont: string,
    content: string,
    cancelVisible: boolean,
};
class TextField extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: '文本框',
            description: '',
            mustfill: false,
            defaultCont: '',
            content: '',
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
    changeDefaultCont(e:ChangeEvent){
        const valueNode = e.target.getAttributeNode('value')
        if(valueNode != null){
            this.setState({
                defaultCont: valueNode.value
            });
        }
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
            <div className = 'textinput'>
                <div className = 'formitem' style={{width:'60%'}} onClick = {()=>this.handleClick()} onMouseEnter = {()=>this.setCancelVisible(true)} onMouseLeave = {()=>this.setCancelVisible(false)}>
                    {this.state.cancelVisible ? 
                    <div className = 'mycancel'>
                        <CloseCircleOutlined onClick={()=>this.props.removeFormItem(this.props.order)}/>
                    </div> 
                    :<div/>
                    }
                    <p>{this.state.title}</p>
                    <p>{this.state.description}</p>
                    <TextArea placeholder = {this.state.content} disabled = {!this.props.fillState}></TextArea>
                </div>
                {(this.props.curId === this.props.order) ?
                <div className = 'mypanel' style={{position:'fixed',right:'20px',top:'100px', width:'300px'}}>
                    <p>标题</p>
                    <Input defaultValue={this.state.title} onChange={(e)=>this.changeTitle(e)}></Input>
                    <p>描述</p>
                    <Input defaultValue={this.state.description} onChange={(e)=>this.changeDescription(e)}></Input>
                    <p>默认提示文字</p>
                    <Input onChange={(e)=>this.changeDefaultCont(e)}></Input>
                    <Checkbox onChange={(e)=>this.changeMustFill(e)}>这是个必填项</Checkbox>
                </div>
                :<div/>} 
            </div>
        );  
    }
}
export default TextField;
