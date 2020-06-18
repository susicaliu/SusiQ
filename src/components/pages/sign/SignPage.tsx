import React, { ChangeEvent } from 'react';
import { Button, Input } from 'antd';
import axios from 'axios';
import UserPage from './UserPage';

type Props = {
  loginState: boolean,
  pageNumber: number,
  changeLoginState: any,
  changePageNumber: any
};

type State = {
  inupstate: boolean,
  email: string,
  username: string,
  password: string
};
class SignPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inupstate:false,
      email:'',
      username:'',
      password:''
    };
  }

  componentDidMount() {
    
  }
  
  changeInup(){
    this.setState({
      inupstate: !this.state.inupstate
    });
  }
  updateUsername(e: ChangeEvent){
    const valueNode = e.target.getAttributeNode('value')
    if(valueNode != null){
      this.setState({
        username: valueNode.value
      })
    }
  }
  updateEmail(e: ChangeEvent){
    const valueNode = e.target.getAttributeNode('value')
    if(valueNode != null){
      this.setState({
        email: valueNode.value
      })
    }
  }
  updateUoE(e: ChangeEvent){
    const valueNode = e.target.getAttributeNode('value')
    if(valueNode != null){
      this.setState({
        email: valueNode.value,
        username: valueNode.value
      })
    }
  }
  updatePassword(e: ChangeEvent){
    const valueNode = e.target.getAttributeNode('value')
    if(valueNode != null){
      this.setState({
        password: valueNode.value
      })
    }
  }
  async login() {
    // const result = await axios.post('user/login');
    const result = {'data': {'statecode': 0}};
    if(result.data.statecode === 0){
      this.props.changeLoginState();
    }
    else{
      alert('Password or Username Error!');
    }
  }
  async register() {
    const result = await axios.post('user/register');
    console.log(result);
  }
  render() {
    const signInBox = (
      <div className = 'signinbox'>
        <pre><Input placeholder = 'Username or Email' onChange = {(value)=>this.updateUoE(value)}></Input></pre>
        <pre><Input placeholder = 'Password' onChange = {(e)=>this.updatePassword(e)}></Input></pre>
        <Button onClick = {()=>this.login()}>Login</Button>
      </div>);
    const signUpBox = (
      <div className = 'signinbox'>
        <pre><Input placeholder = 'Email' onChange = {(e)=>this.updateEmail(e)}></Input></pre>
        <pre><Input placeholder = 'Username' onChange = {(e)=>this.updateUsername(e)}></Input></pre>
        <pre><Input placeholder = 'Password' onChange = {(e)=>this.updatePassword(e)}></Input></pre>
        <Button onClick = {()=>this.register()}>Register</Button>
      </div>);
    return (
      (this.props.loginState)
      ?(<div className = 'signpage'>
          <UserPage pageNumber = {this.props.pageNumber} changePageNumber = {this.props.changePageNumber}/>
        </div>)
      :(<div className = 'signpage'>
          <p>signPage</p>
          <Button disabled = {!this.state.inupstate} onClick ={()=>this.changeInup()}>Signin</Button>
          <Button disabled = {this.state.inupstate} onClick ={()=>this.changeInup()}>Signup</Button>
          {this.state.inupstate ? signUpBox : signInBox}
        </div>)
    );
  }
}
export default SignPage;
