import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

export default function LoginPage() {
  const navigate = useNavigate()
  const signIn = useAuthStore((state) => state.signIn)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      setLoading(true)
      await signIn(email, password)
      alert('✅ 로그인 성공!')
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || '로그인에 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>로그인</h1>
      
      {error && (
        <div style={styles.error}>{error}</div>
      )}

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
        
        <button 
          type="submit" 
          style={{...styles.button, ...(loading ? styles.buttonDisabled : {})}}
          disabled={loading}
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <button onClick={() => navigate('/signup')} style={styles.linkButton}>
        계정이 없으신가요? 회원가입
      </button>

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
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  linkButton: {
    backgroundColor: 'transparent',
    color: '#007AFF',
    padding: '10px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '15px',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: 'transparent',
    color: '#999',
    padding: '10px',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  error: {
    backgroundColor: '#FFE5E5',
    color: '#D00',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '400px',
  },
}
