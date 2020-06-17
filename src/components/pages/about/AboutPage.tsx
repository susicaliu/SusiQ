import React from 'react';

type Props = {
  loginState: boolean,
  pageNumber: number,
  changeLoginState: any,
  changePageNumber: any
};

type State = {
};
class AboutPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pageNumber: 1
    };
  }

  componentDidMount() {
   
  }

  render() {
    return (
        <div className = 'aboutpage'>
          <p>AboutPage</p>
        </div>
    );
  }
}
export default AboutPage;
