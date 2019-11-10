
import React, { Component } from 'react';
import classnames from 'classnames';
import Button from '@app/UI/Buttons';
import RootStyles from '@app/UI/Styles'
import getData from '@app/common/getData';
import Icon from '@app/UI/Icons';
import {
    Link
} from "react-router-dom";
import { Input, Textarea } from '@app/UI/Form';
import { Flex, FlexItem } from '@app/UI/Layout';

import logo from '@app/assets/images/logo.png'
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            count: 0
        };
    }
    render(){
        const {children,website,className} = this.props
      
        if(website){
            var regex = /(https?:\/\/)?(\w+\.?)+(\/[a-zA-Z0-9\?%=_\-\+\/]+)?/gi;
              var html = website
              html = html.replace(regex, function (match, capture) {
                  if (capture) {
                      return match
                  }
                  else {
                      return 'http://' + match;
                  }
              });
            return (
            <a href={html} target="_blank" className={className} >{children} </a>
            )
          } else{
              return <a className={className}>{children}</a>
          }
      
    }
}
export default Index;