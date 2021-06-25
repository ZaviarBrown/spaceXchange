import React from 'react';
import styles from './Article.module.css';

export default function Article({ article }) {

  console.log(article)

  return (
    <>
      <div className={styles.articleContainer}>
        <a href={article.link}>
          <div className={styles.articleWrapper}>
              <div className={styles.newsImg}>
                <img src={article.img} />
              </div>
              <h6>{article.source}</h6>
              <h6>{article.date}</h6>
              <div className={styles.articleTitle}>
                <h3>{article.title}</h3>
              </div>
              <h5>{article.article}</h5>
          </div>
        </a>
      </div>
    </>
  );
}
