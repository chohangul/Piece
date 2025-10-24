import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

const INTERESTS_OPTIONS = [
  '🎮 게임', '📚 독서', '🎵 음악', '🎬 영화', '🏃 운동',
  '🍳 요리', '✈️ 여행', '🎨 미술', '📸 사진', '💻 코딩',
  '🐕 반려동물', '🌱 식물', '☕ 카페', '🍺 술', '🎤 노래방'
]

export default function SignupPage() {
  const navigate = useNavigate()
  const signUp = useAuthStore((state) => state.signUp)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest))
    } else if (interests.length < 5) {
      setInterests([...interests, interest])
    } else {
      alert('최대 5개까지 선택 가능합니다')
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다')
      return
    }

    if (interests.length < 3) {
      setError('최소 3개의 관심사를 선택해주세요')
      return
    }

    try {
      setLoading(true)
      await signUp(email, password, nickname, interests)
      alert('✅ 회원가입 성공!')
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || '회원가입에 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>회원가입</h1>
      
      {error && (
        <div style={styles.error}>{error}</div>
      )}

      <form onSubmit={handleSignup} style={styles.form}>
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
          minLength={6}
        />
        
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
          required
        />
        
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={styles.input}
          required
          maxLength={20}
        />

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            관심사 선택 ({interests.length}/5) - 최소 3개
          </h3>
          <div style={styles.interestsGrid}>
            {INTERESTS_OPTIONS.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                style={{
                  ...styles.interestButton,
                  ...(interests.includes(interest) ? styles.interestButtonActive : {})
                }}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
        
        <button 
          type="submit" 
          style={{...styles.button, ...(loading ? styles.buttonDisabled : {})}}
          disabled={loading}
        >
          {loading ? '가입 중...' : '가입하기'}
        </button>
      </form>

      <button onClick={() => navigate('/login')} style={styles.backButton}>
        이미 계정이 있나요? 로그인
      </button>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#fff',
    padding: '40px 20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    maxWidth: '500px',
    gap: '15px',
  },
  input: {
    padding: '15px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  section: {
    marginTop: '20px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  interestsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
  },
  interestButton: {
    padding: '12px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '2px solid #ddd',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  interestButtonActive: {
    borderColor: '#007AFF',
    backgroundColor: '#E5F0FF',
    fontWeight: 'bold',
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
    marginTop: '20px',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
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
  error: {
    backgroundColor: '#FFE5E5',
    color: '#D00',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '500px',
  },
}
