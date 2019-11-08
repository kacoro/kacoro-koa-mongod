/**
 * @param < Button />
 * @time 2019/1/20
 */

import React from 'react';
import classnames from 'classnames';
import styles from './index.scss';
import dayjs from 'dayjs'
class Index extends React.Component {
    render() {
        const { start, end=new Date() } = this.props;
        const date1 = dayjs(start)
        const date2 = dayjs(end)
        var diff = date2.diff(date1, 'second')
        var unit = "秒钟"
        if(diff>60){
            diff = date2.diff(date1, 'minute')
            unit = "分钟"
            if(diff>60){
                diff = date2.diff(date1, 'hours')
                unit = "小时"
                if(diff>24){
                    diff = date2.diff(date1, 'day')
                    unit = "天"
                    if(diff>30){
                        diff = date2.diff(date1, 'month')
                        unit = "月"
                        if(diff>12){
                            diff = date2.diff(date1, 'year')
                            unit = "年"
                        }
                    }
                }
            }
        }
        return (
            <time className={styles.Time}>
             {diff}{unit}前
            </time>
        );
    }
}

export default Index;
