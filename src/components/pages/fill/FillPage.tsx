import React from 'react';
type Props = {
  loginState: boolean,
  pageNumber: number,
  changeLoginState: any,
  changePageNumber: any
};

type State = {
};
class FillPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
        <div className = 'fillpage'>
          <p>FillPage</p>
        </div>
    );
  }
}
export default FillPage;
