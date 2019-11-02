import React from 'react'
import cx from 'classnames'
import styles from './Dialog.scss'
import  Button from '@app/components/Button';
const Dialog = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
    </div>
    <div className={styles.message}>{message}</div>
    <div className={styles.buttons}>
        <Button className={styles.button} onClick={onCancel}>
           取消
        </Button>
      <Button className={cx(styles.button, styles.active)} onClick={onConfirm}>
        确定
      </Button>
    </div>
  </div>
)

export default Dialog