import React from 'react'
import styles from "../styles/Home.module.css"
function Home() {
  return (
    <div>
     <div className={styles.body}>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems: 'center'}}>
        <h2 style={{marginTop:'300px',fontWeight:'1000'}}>Swayam</h2>
        <h3 style={{fontWeight:'1000'}}>Technical Symposium</h3>
      </div>
     </div>
    </div>
  )
}

export default Home