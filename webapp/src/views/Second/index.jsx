import React, { Component } from 'react';
import  Button from '@app/components/Button';
import reduxTypes from '@app/redux/types';

console.log(reduxTypes)
class Second extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    // console.log('state--------', this.props.location.state)
  }
  componentDidMount() {
    
  }
  changeRouter = () => {
    this.props.history.push({
      pathname: '/third',
      state: {
        text: 'from second'
      }
    });
  }
  handleAddClick() {
    this.props.dispatch({
        type: reduxTypes.ADD_COUNTER
    });
  }
  handleDelClick() {
    console.log(this.props)
      this.props.dispatch({
          type: reduxTypes.DEL_COUNTER
      });
  }
  render() {
    const { count } = this.props;
    return (
      <div>
      <div onClick={this.changeRouter}>
        Second
      </div>
      <Button  onClick={() => this.handleAddClick()}>
                    增加
                </Button>
                <span>{count}</span>
                <Button onClick={() => this.handleDelClick()}>
                    减少
                </Button>
      </div>
      
    );
  }
}

export default Second;