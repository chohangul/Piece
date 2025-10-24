import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 테스트용 계정
    if (email === 'test@piece.app' && password === 'test1234') {
      alert('✅ 로그인 성공! (테스트 모드)')
      localStorage.setItem('isLoggedIn', 'true')
      navigate('/')
    } else {
      alert('❌ 로그인 실패\n\n테스트 계정:\nEmail: test@piece.app\nPassword: test1234')
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>로그인</h1>
      
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        
        <button type="submit" style={styles.button}>
          로그인
        </button>
      </form>

      <button onClick={() => navigate('/')} style={styles.backButton}>
        뒤로 가기
      </button>

      <div style={styles.testInfo}>
        <p style={styles.testTitle}>🧪 테스트 계정</p>
        <p style={styles.testText}>Email: test@piece.app</p>
        <p style={styles.testText}>Password: test1234</p>
      </div>
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
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '40px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    maxWidth: '400px',
    gap: '15px',
  },
  input: {
    padding: '15px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    color: '#fff',
    padding: '15px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
  backButton: {
    backgroundColor: 'transparent',
    color: '#007AFF',
    padding: '10px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  testInfo: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    textAlign: 'center' as const,
  },
  testTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  testText: {
    fontSize: '14px',
    color: '#666',
    margin: '5px 0',
  },
}
