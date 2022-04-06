import styles from "./transaction-list.module.css";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionList({ transactions }) {
  const {deleteDocument}= useFirestore('transactions')

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => {
        return (
          <li key={transaction.id}>
            <p className={styles.name}>{transaction.name}</p>
            <p className={styles.amount}>$ {transaction.amount}</p>
            <button onClick={()=>deleteDocument(transaction.id)} >X</button>
          </li>
        );
      })}
    </ul>
  );
}
