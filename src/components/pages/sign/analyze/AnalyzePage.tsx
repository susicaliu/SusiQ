import React from 'react';

type Props = {
    pageNumber: number,
    changePageNumber: any
};

type State = {
};
class AnalyzePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>AnalyzePage</div>
    );
  }
}
export default AnalyzePage;