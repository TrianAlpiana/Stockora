import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.errorCode}>404</h1>
        <h2 style={styles.title}>Halaman Tidak Ditemukan</h2>
        <p style={styles.message}>
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Link to="/" style={styles.button}>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    textAlign: 'center',
    padding: '40px',
  },
  errorCode: {
    fontSize: '120px',
    fontWeight: 'bold',
    color: '#e74c3c',
    margin: '0',
    lineHeight: '1',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    margin: '20px 0',
  },
  message: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px',
  },
  button: {
    display: 'inline-block',
    padding: '12px 30px',
    backgroundColor: '#3498db',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
};

export default NotFound;