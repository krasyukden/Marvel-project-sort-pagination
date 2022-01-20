import React from 'react';
import styles from './notFoundPage.module.css';
import queryString from 'query-string';
import logo from './common/openGraph.jpg';

function NotFoundPage(props: any) {

  const error = props.location.pathname;

  return (
    <div className={styles.wrapper}>
      <div className={styles.error}>Error 404. Page `{error}` not found</div>
      <img src={logo} alt='logo' className={styles.logo} />
    </div>
  )
}

export default NotFoundPage;


