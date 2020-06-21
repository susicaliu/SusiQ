import React, { ChangeEvent, FormEvent } from 'react';
import { Button, Input } from 'antd';
import axios from 'axios';
import UserPage from './UserPage';
import Axios from 'axios';
import { CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
type Props = {
  loginState: boolean,
  pageNumber: number,
  changeLoginState: any,
  changePageNumber: any,
  uName: string,
  updateUName: any,
};

type State = {
  inupstate: boolean,
  email: string,
  emailValid: boolean,
  username: string,
  usernameValid: boolean,
  password: string,
  passwordValid: boolean,
};
class SignPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inupstate:false,
      email:'',
      emailValid: false,
      username:'',
      usernameValid: false,
      password:'',
      passwordValid: false,
    };
  }

  componentDidMount() {
    
  }
  
  changeInup(){
    this.setState({
      inupstate: !this.state.inupstate
    });
  }
  checkChar(a:string){
    if(a[0] >= 'a' && a[0] <= 'z') return true;
    if(a[0] >= 'A' && a[0] <= 'Z') return true;
    return false;
  }
  checkLine(a:string){
    if(a[0] === '_') return true;
    return false;
  }
  checkStart(a:string){
    if(this.checkChar(a)) return true;
    if(this.checkLine(a)) return true;
    return false;
  }
  checkNumber(a:string){
    if(a[0] >= '0' && a[0] <= '9') return true;
    return false;
  }
  async checkUsername(username:string){
    if(username.length < 6){
      return false;
    }
    else if(!this.checkStart(username[0])){
      return false;
    }
    else{
      let state = true;
      for(let i = 0;i < username.length;i ++){
        if(!this.checkStart(username[i]) && !this.checkNumber(username[i])){
          state = false;
          break;
        }
      }
      if(!state){
        return false;
      }
      else{
        const postReq = JSON.stringify({'opcode':0,'content':username});
        const result = await Axios.post('user/check',postReq);
        if(!result.data.statecode){
          return true;
        }
        else{
          return false;
        }
      }
    }
  }
  async updateUsername(e: ChangeEvent){
    const valueNode = e.target.getAttributeNode('value')
    if(valueNode != null){
      const ans = await this.checkUsername(valueNode.value);
      if(ans){
        this.setState({
          username: valueNode.value,
          usernameValid: true,
        })
      }
    }
  }
  async checkEmail(email:string){
    let id = -1;
    for(let i = 0;i < email.length;i ++){
      if(email[i] === '@'){
        id = i;
        break;
      }
    }
    if(id === -1){
      return false;
    }
    else{
      for(let i = 0;i < id;i ++){
        if(!this.checkStart(email[i]) && !this.checkNumber(email[i])){
          return false;
        }
      }
      let state = true;
      if(id + 1 === email.length) return false;
      for(let i = id + 1;i < email.length;i ++){
        if(!this.checkNumber(email[i]) && !this.checkChar(email[i]) && email[i] !== '.'){
          state = false;
          break;
        }
      }
      if(email[email.length - 1] === '.') state = false;
      if(state){
        const postReq = JSON.stringify({'opcode':1,'content':email});
        const result = await Axios.post('user/check',postReq);
        if(result.data.statecode !== 0){
          state = false;
        }
      }
      return state;
    }
  }
  async updateEmail(e: ChangeEvent){
    const valueNode = e.target.getAttributeNode('value')
    if(valueNode != null){
      const ans = await this.checkEmail(valueNode.value);
      if(ans){
        this.setState({
          email: valueNode.value,
          emailValid: true,
        });
      }
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
      if(valueNode.value.length >= 6){
        this.setState({
          password: valueNode.value,
          passwordValid: true,
        });
      }
    }
  }
  async login() {
    const postReq = JSON.stringify({'username':this.state.username,'email':this.state.email,'password':this.state.password});
    const result = await axios.post('user/login',postReq);
    if(result.data.statecode === 0){
      this.props.changeLoginState();
      this.props.updateUName(result.data.username);
      this.setState({
        username:result.data.username,
        email:result.data.email
      });
    }
    else{
      
    }
  }
  async register() {
    const postReq = JSON.stringify({'username':this.state.username,'email':this.state.email,'password':this.state.password});
    const result = await Axios.post('user/register',postReq);
  }
  render() {
    const signInBox = (
      <div className = 'signinbox'>
        <pre><Input className='logput' placeholder = 'Username or Email' onBlur = {(value)=>this.updateUoE(value)}></Input></pre>
        <pre><Input type='password' className='logput' placeholder = 'Password' onBlur = {(e)=>this.updatePassword(e)}></Input></pre>
        <Button onClick = {()=>this.login()} type="link" ghost style={{bottom:'36vh',right:'31.5vw',position:'fixed'}}><img className='mybutton' style={{width:'15vw'}} src="./png/loginbutton.png"></img></Button>
        {!this.props.loginState ? <p id='sign-error-tip'>Username or Password error!</p> : <div/>}
      </div>);
    const signUpBox = (
      <div className = 'signupbox'>
        <pre><Input className='logput' placeholder = 'Username' onBlur = {(e)=>this.updateUsername(e)}></Input>{this.state.usernameValid ? <CheckCircleTwoTone style={{fontSize:'22px'}} twoToneColor="#52c41a" />: <CloseCircleTwoTone style={{fontSize:'22px'}} twoToneColor="#eb2f96"/>}</pre>
        <pre><Input className='logput' placeholder = 'Password' onBlur = {(e)=>this.updatePassword(e)}></Input>{this.state.passwordValid ? <CheckCircleTwoTone style={{fontSize:'22px'}} twoToneColor="#52c41a" />: <CloseCircleTwoTone style={{fontSize:'22px'}} twoToneColor="#eb2f96"/>}</pre>
        <pre><Input className='logput' placeholder = 'Email' onBlur = {(e)=>this.updateEmail(e)}></Input>{this.state.emailValid ? <CheckCircleTwoTone style={{fontSize:'22px'}} twoToneColor="#52c41a" />: <CloseCircleTwoTone style={{fontSize:'22px'}} twoToneColor="#eb2f96"/>}</pre>
        <Button onClick = {()=>this.register()} type="link" ghost style={{bottom:'36vh',right:'31.5vw',position:'fixed'}}><img className='mybutton' style={{width:'15vw'}} src="./png/regibutton.png"></img></Button>
      </div>);
    return (
      (this.props.loginState)
      ?(<div className = 'signpage'>
          <img id="homeback" src="./png/homeback.png"></img>
          <UserPage username = {this.state.username} pageNumber = {this.props.pageNumber} changePageNumber = {this.props.changePageNumber} loginState={this.props.loginState}/>
        </div>)
      :(<div className = 'signpage'>
          <img id="homeback" src="./png/homeback.png"></img>
          <div className='signcard'>
            <img id='signback' src='./png/signboxback.png'/>
            <div id='signinupshift'>
              {this.state.inupstate ? <img className='signinboxback'src="./png/signupback.png"/> : <img className='signinboxback'src="./png/signinback.png"/>}
              <Button disabled = {!this.state.inupstate} onClick ={()=>this.changeInup()} type="link" ><img className='mylogo' style={{position:'fixed', right:'41.5vw',bottom:'66vh'}} src="./png/signin.png"/></Button>
              <Button disabled = {this.state.inupstate} onClick ={()=>this.changeInup()} type="link" ><img className='mylogo' style={{position:'fixed', right:'33vw',bottom:'66vh'}} src="./png/signup.png"/></Button>
            </div>
            {this.state.inupstate ? signUpBox : signInBox}
          </div>
        </div>)
    );
  }
}
export default SignPage;
