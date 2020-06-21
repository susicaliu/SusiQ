import React from 'react';
import {Button} from 'antd'
import AboutPage from './pages/about/AboutPage';
import HomePage from './pages/home//HomePage';
import SignPage from './pages/sign/SignPage';

type Props = {};

type State = {
  pageNumber: number,
  loginState: boolean
};
class SusiQ extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.changeLoginState = this.changeLoginState.bind(this);
    this.changePageNumber = this.changePageNumber.bind(this);
    this.state = {
      pageNumber: 1,
      loginState: false
    };
  }

  componentDidMount() {
  }

  changeLoginState() {
      this.setState({
          loginState: !this.state.loginState,
          pageNumber: 1
      });
  }

  changePageNumber(pageNumber: number){
      this.setState({
        pageNumber: pageNumber
      });
  }
  emptyOp(uname:string){

  }
  render() {
    const currentPage = (this.state.pageNumber === 1) 
    ? (<HomePage loginState = {this.state.loginState} pageNumber = {this.state.pageNumber} changeLoginState = {this.changeLoginState} changePageNumber = {this.changePageNumber}/>)
    : (this.state.pageNumber === 2)
    ? (<AboutPage loginState = {this.state.loginState} pageNumber = {this.state.pageNumber} changeLoginState = {this.changeLoginState} changePageNumber = {this.changePageNumber}/>)
    : (this.state.pageNumber === 3)
    ? (<div/>)
    : (this.state.pageNumber <= 8)
    ? (<SignPage uName={''} updateUName={this.emptyOp} loginState = {this.state.loginState} pageNumber = {this.state.pageNumber} changeLoginState = {this.changeLoginState} changePageNumber = {this.changePageNumber}/>)
    : (<div/>);
    const buttonGroup = (this.state.loginState === false) 
    ?(<div className='buttonbox'>
        <Button onClick = {()=>this.changePageNumber(1)} type="link" ghost>
          <img className='mybutton' src="./png/homebutton.png"></img>
        </Button>  
        <Button onClick = {()=>this.changePageNumber(4)} type="link" ghost>
          <img className='mybutton' src="./png/signinupbutton.png"></img>
        </Button>
        <Button onClick = {()=>this.changePageNumber(2)} type="link" ghost>
          <img className='mybutton' src="./png/aboutbutton.png"></img>
        </Button>
      </div>)
    :(<div className='buttonbox'>
      <Button onClick = {()=>this.changePageNumber(1)} type="link" ghost>
        <img className='mybutton' src="./png/homebutton.png"></img>
      </Button>
      <Button onClick = {()=>this.changePageNumber(4)} type="link" ghost>
        <img className='mybutton' src="./png/userbutton.png"></img>
      </Button>
      <Button onClick = {()=>this.changeLoginState()} type="link" ghost>
        <img className='mybutton' src="./png/logoutbutton.png"></img>
      </Button>
      <Button onClick = {()=>this.changePageNumber(2)} type="link" ghost>
        <img className='mybutton' src="./png/aboutbutton.png"></img>
      </Button>
    </div>);
    return (
        <div className = 'susiq'>
            {currentPage}
            {buttonGroup}
            <Button style={{position:'fixed',left:'0px',top:'0px'}} onClick = {()=>this.changePageNumber(1)} type='link' ghost>
              <img className='mylogo' src="./png/logo.png"></img>
            </Button>
        </div>
    );
  }
}
export default SusiQ;
