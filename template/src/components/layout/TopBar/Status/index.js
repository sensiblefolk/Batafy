import React from 'react'
import styles from './style.module.scss'

class BataBalance extends React.Component {
  render() {
    return (
      <>
        <p className={styles.amountText}>
          Bata Balance
          <span className={styles.amountValue}>5000</span>
        </p>
        <div className={styles.amountGraph}>
          <i className={styles.amountGraphItem} style={{ height: '80%' }} />
          <i className={styles.amountGraphItem} style={{ height: '50%' }} />
          <i className={styles.amountGraphItem} style={{ height: '70%' }} />
          <i className={styles.amountGraphItem} style={{ height: '60%' }} />
          <i className={styles.amountGraphItem} style={{ height: '50%' }} />
          <i className={styles.amountGraphItem} style={{ height: '65%' }} />
        </div>
      </>
    )
  }
}

export default BataBalance
