import React from 'react';
type Props = {
    loginState: boolean,
    pageNumber: number,
    changeLoginState: any,
    changePageNumber: any
};

type State = {
};
class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
        <div className = 'homepage'>
          <img id="homeback" src="./png/homebanner.png"></img>
          <img id="hometitle" src="./png/hometitle.png"></img>
        </div>
    );
  }
}
export default HomePage;
