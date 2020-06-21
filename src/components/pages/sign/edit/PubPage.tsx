import React from 'react';
import { Divider, Input, Button } from 'antd';
const QRCode = require('qrcode.react');

type Props = {
    pageNumber: number,
    changePageNumber: any,
    fId: string,
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
      <div className="pubpage" style={{position:'fixed',top:'7vh',width:'100vw',height:'93vh',backgroundColor:'#F0F0F0'}}>
        <div className="pubform">
          <p className="pub-title">访问链接</p>
          <pre><Input style={{marginLeft:'10%',width:'80%',height:'4vh',fontSize:22}} placeholder={"http://localhost:3000/#/form?id="+String(this.props.fId)} value={"http://localhost:3000/#/form?id="+String(this.props.fId)}></Input></pre>
          <Divider></Divider>
          <p className="pub-title">访问二维码</p>
          <QRCode
            style={{marginLeft:'10%'}}
            size={150}
            value={"http://localhost:3000/#/form?id="+String(this.props.fId)}/>
          <Divider></Divider>
        </div>
        <div className="fixbutton" style={{ position: 'fixed', left: '83vw', bottom: '5vh' }}>
            <Button onClick={() => this.lastPage()} type="link"><img src="./png/last.png"></img></Button>
            <Button onClick={() => this.nextPage()} type="link"><img src="./png/save.png"></img></Button>
        </div>
      </div>
    );
  }
}
export default PubPage;
