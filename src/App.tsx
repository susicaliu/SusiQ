import React from 'react';
import './App.css';
import SusiQ from './components/SusiQ';

type Props = {};

type State = {
  pageNumber: number
};
class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pageNumber: 1
    };
  }

  componentDidMount() {
    document.onselectstart = () => {
      return false;
    };
  }

  render() {
    return (
      <div className="App">
        <SusiQ/>
      </div>
    );
  }
}
export default App;
