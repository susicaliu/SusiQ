import { Input, Checkbox, Divider, Button } from 'antd';
import React, { ChangeEvent } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import {
    CloseCircleOutlined
} from '@ant-design/icons';
import { DraggableProvided } from 'react-beautiful-dnd';
import SingleChoice from './SingleChoice';
import MultipleChoice from './MultipleChoice';
import TextInput from './TextInput';
import TextField from './TextField';
import NumberArea from './NumberArea';
import Rating from './Rating';
import Location from './Location';
type Props = {
    curId: number,
    changeCurId: any,
    removeFormItem: any,
    updateItemInfo: any,
    p: DraggableProvided,
    formInfo: any,
    formOrder: number,
    options: any,
};
type State = {
};
class Question extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }
    emptyOp() {

    }
    getFormItem(formInfo:any) {
        if (formInfo.type === 0) {
            return <SingleChoice options={this.props.options} formOrder={this.props.formOrder} filling={0} updateFillState={this.emptyOp} updateAnswer={this.emptyOp} key={'FormItemSingleChoice'+String(formInfo.order)} updateItemInfo={this.props.updateItemInfo} itemInfo={formInfo.itemInfo} removeFormItem={this.props.removeFormItem} changeCurId={this.props.changeCurId} curId={this.props.curId} order={formInfo.order} fillState={false}></SingleChoice>
          }
          else if (formInfo.type === 1) {
            return <MultipleChoice options={this.props.options} formOrder={this.props.formOrder} filling={0} updateFillState={this.emptyOp} updateAnswer={this.emptyOp} key={'FormItemMultipleChoice'+String(formInfo.order)} updateItemInfo={this.props.updateItemInfo} itemInfo={formInfo.itemInfo} removeFormItem={this.props.removeFormItem} changeCurId={this.props.changeCurId} curId={this.props.curId} order={formInfo.order} fillState={false}></MultipleChoice>
          }
          else if (formInfo.type === 2) {
            return <TextInput options={this.props.options} formOrder={this.props.formOrder} filling={0} updateFillState={this.emptyOp} key={'FormItemTextInput'+String(formInfo.order)} updateAnswer={this.emptyOp} updateItemInfo={this.props.updateItemInfo} itemInfo={formInfo.itemInfo} removeFormItem={this.props.removeFormItem} changeCurId={this.props.changeCurId} curId={this.props.curId} order={formInfo.order} fillState={false}></TextInput>
          }
          else if (formInfo.type === 3) {
            return <TextField options={this.props.options} formOrder={this.props.formOrder} filling={0} updateFillState={this.emptyOp} key={'FormItemTextField'+String(formInfo.order)} updateAnswer={this.emptyOp} updateItemInfo={this.props.updateItemInfo} itemInfo={formInfo.itemInfo} removeFormItem={this.props.removeFormItem} changeCurId={this.props.changeCurId} curId={this.props.curId} order={formInfo.order} fillState={false}></TextField>
          }
          else if (formInfo.type === 4) {
            return <NumberArea options={this.props.options} formOrder={this.props.formOrder} filling={0} updateFillState={this.emptyOp} key={'FormItemNumberArea'+String(formInfo.order)} updateAnswer={this.emptyOp} updateItemInfo={this.props.updateItemInfo} itemInfo={formInfo.itemInfo} removeFormItem={this.props.removeFormItem} changeCurId={this.props.changeCurId} curId={this.props.curId} order={formInfo.order} fillState={false}></NumberArea>
          }
          else if (formInfo.type === 5) {
            return <Rating options={this.props.options} formOrder={this.props.formOrder} filling={0} updateFillState={this.emptyOp} key={'FormItemRating'+String(formInfo.order)} updateAnswer={this.emptyOp} updateItemInfo={this.props.updateItemInfo} itemInfo={formInfo.itemInfo} removeFormItem={this.props.removeFormItem} changeCurId={this.props.changeCurId} curId={this.props.curId} order={formInfo.order} fillState={false}></Rating>
          }
          else if (formInfo.type === 6) {
            return <Location options={this.props.options} formOrder={this.props.formOrder} filling={0} updateFillState={this.emptyOp} key={'FormItemLocation'+String(formInfo.order)} updateAnswer={this.emptyOp} updateItemInfo={this.props.updateItemInfo} itemInfo={formInfo.itemInfo} removeFormItem={this.props.removeFormItem} changeCurId={this.props.changeCurId} curId={this.props.curId} order={formInfo.order} fillState={false}></Location>
          }
          else{
            return <div></div>
          }
    }
    render() {
        return (
            <div className="myquestion" ref={this.props.p.innerRef} {...this.props.p.draggableProps} {...this.props.p.dragHandleProps} key = {String(this.props.formInfo.order + 1)}>
                {this.getFormItem(this.props.formInfo)}
            </div>
        );  
    }
}
export default Question;
