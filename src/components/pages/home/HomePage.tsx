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
          <p>HomePage</p>
        </div>
    );
  }
}
export default HomePage;
