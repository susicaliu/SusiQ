import React from 'react';
import Axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Legend, Bar, PieChart, Pie, Tooltip, RadialBarChart, RadialBar } from 'recharts';
import { Radio, Statistic, Card, Row, Col } from 'antd';
import ReactAMAP, { Marker } from 'react-amap';
const {Map} = ReactAMAP;
type Props = {
  pageNumber: number,
  changePageNumber: any,
  fId: string,
  username: string,
};

type State = {
  answerList: any[],
  modeList: any[],
};
class AnalyzePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      answerList: [],
      modeList: [],
    };
  }

  async componentDidMount() {
    const postReq = { 'formId': this.props.fId, 'username': this.props.username };
    const result = await Axios.post('data/collect',postReq);
    const answerList = result.data.answerList;
    
    let modelList = [];
    for(let i = 0;i < answerList.length;i ++){
      modelList[i] = 0;
    }
    modelList[1] = 1;
    this.setState({
      answerList:answerList,
      modeList:modelList
    });
  }
  getBarChart(answer:any, i:number){
    return (<BarChart
    width={300}
    height={250}
    data={answer.answer}
    margin={{
      top: -10, right: 30, left: 20, bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip></Tooltip>
    <Legend />
    <Bar dataKey="num" name="选择人数" fill="#8884d8" />
  </BarChart>);
  }
  getPieChart(answer:any, i:number){
    return (<PieChart width={300} height={250}>
      <Pie dataKey="num" isAnimationActive={false} data={answer.answer} cx={200} cy={125} outerRadius={80} fill="#8884d8" label/>
      <Tooltip></Tooltip>
    </PieChart>);
  }
  getTextForm(answer:any, i:number){
    return (<div></div>);
  }
  getTextCloud(answer:any, i:number){
    return (<div></div>);
  }
  getNumberCard(answer:any, i:number){
    return (
      <div style={{height:250}}>
        <Statistic title="Average" value={62.2} />
        <Statistic title="Sum" value={6220} />
        <Statistic title="Count" value={100} />
      </div>
    );
  }
  getStarBar(answer:any, i:number){
    return (<RadialBarChart 
      width={400} 
      height={250} 
      innerRadius="10%" 
      outerRadius="80%" 
      data={answer.answer.detail} 
      startAngle={180} 
      endAngle={-180}
    >
      <RadialBar label={{ fill: '#666', position: 'insideStart' }} background dataKey='num' />
      <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
      <Tooltip />
    </RadialBarChart>);
  }
  getStarPie(answer:any, i:number){
    return (<RadialBarChart 
      width={400} 
      height={250} 
      innerRadius="10%" 
      outerRadius="80%" 
      data={answer.answer.detail} 
      startAngle={180} 
      endAngle={0}
    >
      <RadialBar label={{ fill: '#666', position: 'insideStart' }} background dataKey='num' />
      <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
      <Tooltip />
    </RadialBarChart>);
  }
  getMap(answer:any,i:number){
    return <div style={{width: '100%', height: '250px'}}>
      <Map center={{longitude: 121, latitude: 34}} zoom={6} amapkey={"394a1cbe13e1eae09dfc1fea5dbe5041"}>
      <Marker key={'my-marker'+String(i)} position={{longitude: 120, latitude: 35 }}><div style={{background: `url('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '30px',
      height: '40px',
      color: '#000',
      textAlign: 'center',
      lineHeight: '40px'}}></div></Marker>
      </Map>
    </div>
  }
  getStatiscard(answer:any, i:number){
    if(answer.type === 0){
      return ( 
        this.state.modeList[i] ? this.getBarChart(answer,i) : this.getPieChart(answer,i)
      );
    }
    else if(answer.type === 1){
      return ( 
        this.state.modeList[i] ? this.getBarChart(answer,i) : this.getPieChart(answer,i)
      );
    }
    else if(answer.type === 2){
      return (<div/>);
    }
    else if(answer.type === 3){
      return (<div/>);
    }
    else if(answer.type === 4){
      return this.state.modeList[i] ? this.getNumberCard(answer,i) : this.getNumberCard(answer,i)
    }
    else if(answer.type === 5){
      return (
        this.state.modeList[i] ? this.getStarPie(answer,i) :  this.getStarBar(answer,i)
      );
    }
    else if(answer.type === 6){
      return (
        this.getMap(answer,i)
      );
    }
  }
  render() {
    const answerList = this.state.answerList;
    const statistics:any[] = []; 
    answerList.map((answer,i)=>{
      statistics.push(
        <Col key={"statiscard-col-"+String(i)} span={6}>
          <Card hoverable={true} className = 'statiscard' title= {answer.title}>
            <div key={"statiscard-"+String(i)} className ='statisgraph'>
              {this.getStatiscard(answer,i)}
            </div>
          </Card>
        </Col>);
    });
    return (
      <div className="analyzepage" style={{position:'fixed'}}>
        <div className="analyzeform">
          <Row gutter={[16,24]}>
            {statistics}
          </Row>
        </div>
      </div>
      
    );
  }
}
export default AnalyzePage;
