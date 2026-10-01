import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import './Auth.css';
 
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Google OAuth strictly prohibits IP addresses like 127.0.0.1.
    // If the user accessed via 127.0.0.1, auto-redirect to localhost.
    if (window.location.hostname === '127.0.0.1') {
      window.location.hostname = 'localhost';
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (res.ok) {
        login(data.user, data.token);
        // Navigate back to where they came from, or home
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Service unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setError(null);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential })
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user, data.token);
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        setError(data.error || 'Google Login failed on server');
      }
    } catch (err) {
      setError('Service unavailable. Please try again later.');
    }
  };

  const handleGoogleError = () => {
    if (window.location.hostname === '127.0.0.1') {
      setError('Google Sign-In does not support IP addresses (127.0.0.1). Redirecting to localhost...');
      window.location.hostname = 'localhost';
    } else {
      setError('Google Sign-In failed: The current origin (' + window.location.origin + ') may not be listed in Authorized JavaScript Origins in Google Cloud Console.');
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button variant="primary" size="lg" fullWidth disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }}></div>
          <span style={{ padding: '0 10px', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>

        <div className="auth-switch">
          Don't have an account? <Link to="/signup" state={location.state}>Sign up</Link>
        </div>
      </div>
    </main>
  );
}
