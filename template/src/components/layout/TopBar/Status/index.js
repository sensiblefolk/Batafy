import React from 'react'
import styles from './style.module.scss'

class BataBalance extends React.Component {
  render() {
    return (
      <>
        <p className={styles.amountText} style={{ textAlign: 'center' }}>
          Bata Balance
          <span className={styles.amountValue}>5000</span>
        </p>
      </>
    )
  }
}

export default BataBalance
