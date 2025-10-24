import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎯 Piece</h1>
      <p style={styles.subtitle}>퍼즐 조각처럼 만나는 소셜 앱</p>
      <p style={styles.success}>✅ 웹 앱이 정상 작동합니다!</p>
      
      <Link to="/login" style={styles.button}>
        로그인하기
      </Link>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#fff',
    padding: '20px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '20px',
  },
  success: {
    fontSize: '20px',
    color: '#0f0',
    marginBottom: '40px',
  },
  button: {
    backgroundColor: '#007AFF',
    color: '#fff',
    padding: '15px 40px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
  },
}
