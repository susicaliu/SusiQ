import React from 'react';

type Props = {
    pageNumber: number,
    changePageNumber: any
};

type State = {
};
class PubPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>PubPage</div>
    );
  }
}
export default PubPage;
