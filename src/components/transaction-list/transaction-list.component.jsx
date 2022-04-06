import styles from "./transaction-list.module.css";

export default function TransactionList({ transactions }) {
  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => {
        return (
          <li key={transaction.createdAt}>
            <p className={styles.name}>{transaction.name}</p>
            <p className={styles.amount}>$ {transaction.amount}</p>
          </li>
        );
      })}
    </ul>
  );
}
