import React from 'react';
import {Button} from 'antd'
import AboutPage from './pages/about/AboutPage';
import HomePage from './pages/home//HomePage';
import FillPage from './pages/fill/FillPage';
import SignPage from './pages/sign/SignPage';
type Props = {};

type State = {
  pageNumber: number,
  loginState: boolean
};
class SusiQ extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.changeLoginState = this.changeLoginState.bind(this)
    this.changePageNumber = this.changePageNumber.bind(this)
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

  render() {
    const currentPage = (this.state.pageNumber === 1) 
    ? (<HomePage loginState = {this.state.loginState} pageNumber = {this.state.pageNumber} changeLoginState = {this.changeLoginState} changePageNumber = {this.changePageNumber}/>)
    : (this.state.pageNumber === 2)
    ? (<AboutPage loginState = {this.state.loginState} pageNumber = {this.state.pageNumber} changeLoginState = {this.changeLoginState} changePageNumber = {this.changePageNumber}/>)
    : (this.state.pageNumber === 3)
    ? (<FillPage loginState = {this.state.loginState} pageNumber = {this.state.pageNumber} changeLoginState = {this.changeLoginState} changePageNumber = {this.changePageNumber}/>)
    : (this.state.pageNumber === 4 || this.state.pageNumber === 5 || this.state.pageNumber === 6)
    ? (<SignPage loginState = {this.state.loginState} pageNumber = {this.state.pageNumber} changeLoginState = {this.changeLoginState} changePageNumber = {this.changePageNumber}/>)
    : (<div/>);
    const buttonGroup = (this.state.loginState === false) 
    ?(<div>
        <Button onClick = {()=>this.changePageNumber(1)}>
          Homegage
        </Button>
        <Button onClick = {()=>this.changePageNumber(4)}>
          SignIn/Up
        </Button>
        <Button onClick = {()=>this.changePageNumber(2)}>
          About
        </Button>
      </div>)
    :(<div>
      <Button onClick = {()=>this.changePageNumber(1)}>
        HomePage
      </Button>
      <Button onClick = {()=>this.changePageNumber(4)}>
        UserPage
      </Button>
      <Button onClick = {()=>this.changeLoginState()}>
        Logout
      </Button>
      <Button onClick = {()=>this.changePageNumber(2)}>
        About
      </Button>
    </div>);
    return (
        <div className = 'susiq'>
            {buttonGroup}
            {currentPage}
        </div>
    );
  }
}
export default SusiQ;
