import styles from "./home.module.css"

import TransactionForm from "../../components/transaction-form/transaction-form"

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        transaction list 
      </div>
      <div className={styles.sidebar}>
         <TransactionForm/>
      </div>
    </div>
  )
}
