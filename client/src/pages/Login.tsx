import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [_, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, backendUrl } = useAppContext();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(backendUrl+'/api/user/login', {email, password});
      if (response.data.success && response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setLocation('/');
      }
      else {  
        toast.error(response.data.message || 'Login failed');
      }

    } catch (error) {
      toast.error('Login failed. Please check your credentials or try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login to your account</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">Login</Button>
        </form>
        <p className="text-sm text-center mt-4">
          Not a user? <Link href="/signup" className="text-primary hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
