import React from 'react'
import styles from './result.module.scss'
interface Props {
 data:string
}

let Result:React.FC<Props>=({data})=> {
  return (
    <div className={styles.search}>
    <div className={styles.childDiv}>
      <h1>{ data}</h1>
      </div>
      </div>
  )
}

export default Result
