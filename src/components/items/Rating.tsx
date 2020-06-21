import { Radio, Rate, Input, Checkbox, Cascader, Divider } from 'antd';
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
    filling: number,
    updateFillState: any,
    formOrder: number,
    options: any,
};
type State = {
};
class Rating extends React.Component<Props, State> {
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
    changeAllowHalf(e:CheckboxChangeEvent){
        const newItemInfo = this.deepCopy(this.props.itemInfo);
        newItemInfo.allowHalf = !newItemInfo.allowHalf;
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
    handleClick(){
        this.props.changeCurId(this.props.order);
    }
    handleValueChange(e:number){
        const mustfill = (!this.props.itemInfo.mustfill || e > 0);
        if(mustfill){
            this.props.updateAnswer(this.props.order,e);
            this.props.updateFillState(this.props.order, 0);
        }
        else{
            this.props.updateFillState(this.props.order, 1);
        }
    }
    render() {
        return (
            <div className = 'rating'>
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
                    <Rate disabled = {!this.props.fillState} allowHalf={this.props.itemInfo.allowHalf} onChange={(e)=>this.handleValueChange(e)}></Rate>
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
                    <Checkbox onChange={(e)=>this.changeAllowHalf(e)}>允许半颗星</Checkbox>
                </div>
                :<div/>}
            </div>
        );  
    }
}
export default Rating;
