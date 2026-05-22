import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  
  const [error, setError] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { createUser, verifyEmail } = UserAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createUser(email, password, username);
      setShowOtpForm(true); 
      showNotification('OTP sent to your email!', 'success');
    } catch (e) {
      const errorMsg = e.response?.data?.message || e.response?.data || 'Failed to create account';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await verifyEmail(email, otp);
      showNotification('Account verified successfully! You can now log in.', 'success');
      navigate('/login');
    } catch (e) {
      const errorMsg = e.response?.data?.message || e.response?.data || 'Invalid OTP';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <img
        className="hidden sm:block absolute inset-0 w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop"
        alt="Background"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs"></div>

      <div className="relative w-full h-full flex items-center justify-center px-4 z-50">
        <div className="max-w-[450px] w-full bg-black/75 text-white rounded-lg shadow-2xl border border-gray-800 p-8 transition-all duration-300">
          <div className="max-w-[320px] mx-auto">
            
            <h1 className="text-3xl font-bold mb-8">
              {showOtpForm ? 'Verify Email' : 'Sign Up'}
            </h1>

            {error && <p className="p-3 bg-red-500/50 my-2 rounded text-sm">{error}</p>}

            {!showOtpForm ? (
              
              /* --- SIGN UP FORM --- */
              <form onSubmit={handleSignupSubmit} className="flex flex-col">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  type="text"
                  placeholder="Username"
                  required
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  required
                />
                <button 
                  disabled={loading}
                  className="bg-blue-600 py-3 my-6 rounded font-bold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                >
                  {loading ? 'Sending Code...' : 'Sign Up'}
                </button>

                <p className="mt-4 text-center">
                  <span className="text-gray-400">Already subscribed to BookHunt?</span>{' '}
                  <Link to='/login' className="text-blue-500 hover:underline">
                    Sign In
                  </Link>
                </p>
              </form>
              
            ) : (

              /* --- OTP VERIFICATION FORM --- */
              <form onSubmit={handleOtpSubmit} className="flex flex-col animate-fade-in">
                <p className="text-gray-300 text-sm mb-4">
                  We sent a 6-digit code to <span className="font-bold text-white">{email}</span>.
                </p>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-white text-center tracking-widest text-xl"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength="6"
                  placeholder="------"
                  required
                />
                <button 
                  disabled={loading}
                  className="bg-green-600 py-3 my-6 rounded font-bold hover:bg-green-700 transition duration-300 disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify Account'}
                </button>
              </form>

            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;