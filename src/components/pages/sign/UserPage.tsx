import React from 'react';
import { Card, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import EditPage from './edit/EditPage';
import AnalyzePage from './analyze/AnalyzePage';
type Props = {
    pageNumber: number,
    changePageNumber: any
};

type State = {
};
class UserPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    
  }
  clickEdit() {
    this.props.changePageNumber(5);
  }
  clickAnalyze() {
    this.props.changePageNumber(8);
  }

  render() {
    const uPage = [];
    uPage.push((<Card
        style={{ width: 300 }}
        cover={
        <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
        }
        key={
          'form1'
        }
    >
        <Meta
        title="Card title"
        description="This is the description"
        />
        <Button onClick = {()=>this.clickEdit()}>
            Edit
        </Button>
        <Button onClick = {()=>this.clickAnalyze()}>
            Analyze
        </Button>
      </Card>));
    const ePage = (
        <EditPage pageNumber = {this.props.pageNumber} changePageNumber = {this.props.changePageNumber}></EditPage>
    );
    const aPage =(
        <AnalyzePage pageNumber = {this.props.pageNumber} changePageNumber = {this.props.changePageNumber}></AnalyzePage>
    );
    return (
      <div className = 'userpage'>
        {(this.props.pageNumber === 4) ? uPage : (this.props.pageNumber <= 7) ? ePage : (this.props.pageNumber <= 8) ? aPage : (<div/>)}
      </div>
    );
  }
}
export default UserPage;
