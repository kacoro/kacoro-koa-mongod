import React, { Component } from 'react';
import getData from '../../common/getData';
class First extends Component {
  constructor(props) {
    super(props);
    console.log("props",props)
    this.state = {
        user: props.staticContext
    };
}

  async componentDidMount() {
     
  }

  async UNSAFE_componentWillMount () {
    // this.setState({ user: await getData('/') });
  }
  
  changeRouter = () => {
    
    this.props.history.push({
      pathname: '/second',
      state: {
        text: 'from first'
      }
    });
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <p  onClick={this.changeRouter}>First</p>
        <p>{user && user.userId}</p>
                <p>{user && user.name}</p>
                <p>{user && user.gender}</p>
                <p>{user && user.age}</p>
      </div>
    );
  }
}

export default First;