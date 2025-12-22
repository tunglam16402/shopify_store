import styles from './Loading.module.css'
interface LoadingProps {
  smallSize?: boolean
}

const Loading = ({ smallSize }: LoadingProps) => {
  return (
    <div className={styles.container}>
      <div
        className={
          smallSize
            ? `${styles.ldsEllipsmall} ${styles.ldsEllipsis}`
            : styles.ldsEllipsis
        }
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading
