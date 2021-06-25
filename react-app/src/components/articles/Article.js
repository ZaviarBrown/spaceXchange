import React from 'react';
import styles from './Article.module.css';

export default function Article({ article }) {

  console.log(article)

  return (
    <>
      <div className={styles.articleContainer}>
        <div className={styles.articleWrapper}>
          <a href={article.link}>
            <img src={article.img} />
            <h4>{article.source}</h4>
            <h4>{article.date}</h4>
            <h2>{article.title}</h2>
            <h4>{article.article}</h4>
          </a>
        </div>
      </div>
    </>
  );
}
