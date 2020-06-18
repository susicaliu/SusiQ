import React from 'react';
import { Divider, Input, Button } from 'antd';

type Props = {
    pageNumber: number,
    changePageNumber: any
};

type State = {
};
class PubPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    
  }
  lastPage() {
    this.props.changePageNumber(6);
  }
  nextPage() {
    this.props.changePageNumber(4);
  }
  render() {
    return (
      <div className="pubpage">
        <div className="">
          <p>访问链接</p>
          <pre><Input placeholder="一个访问链接"></Input></pre>
          <Divider></Divider>
          <p>访问二维码</p>
          <Divider></Divider>
        </div>
        <div className="fixbutton" style={{position:'fixed', right:'20px', bottom:'200px'}}>
          <Button onClick = {()=>this.lastPage()}>Last</Button>
          <Button onClick = {()=>this.nextPage()}>Finish</Button>
        </div>
      </div>
    );
  }
}
export default PubPage;
