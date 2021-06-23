import React from 'react';
import styles from './Article.module.css'


export default function Article({ articles }) {
  const baseSite = 'https://www.reuters.com/';

  return (
    <>
      <div className={styles.articleWrapper}>
      {Object.keys(articles).map(key=>(
        <div className={styles.article} key={key}>
          <a href={baseSite + articles[key]}>
            <h3>{key}</h3>
          </a>
        </div>
      ))}
      </div>
    </>
  )
}

