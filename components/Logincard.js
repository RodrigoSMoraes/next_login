import styles from "../styles/Logincard.module.css";

export default function Logincard({ title, children }) {
    return (
        <div  className={styles.card}>
            <h2 className={styles.title}>{ title }</h2>
            { children }
        </div>
    )
}