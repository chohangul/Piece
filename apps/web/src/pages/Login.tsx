import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`로그인 시도: ${email}`)
    // 실제 로그인 로직은 나중에 추가
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
}
