/**
 * @param < Button />
 * @time 2019/1/20
 */

import React from 'react';
import classnames from 'classnames';
import styles from './index.scss';

class Index extends React.Component {
    // change= (e)=>{
    //     const { name= 'id',returntext = 'text'} = this.props;
    //     const target = e.target;
    //     const value =  target.value;
    //     const text = target.options[target.selectedIndex].text
    //     const data = {
    //         [returntext]:text,
    //         [name]:value
    //     }
    //     console.log(data)
    // }
    render() {
        const { data,children, itemText= 'name',itemValue = '_id',className, ...others } = this.props;
        return (
            <select className={classnames(styles.Select, className ? className : null)} {...others}  >
                {data.map((item,index) =>{
                   return <option key={index} value={item[itemValue]} >{item[itemText]}</option>
                })}
            </select>
        );
    }
}

export default Index;
