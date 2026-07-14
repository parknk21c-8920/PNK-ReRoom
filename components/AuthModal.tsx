"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage('로그인 실패: ' + error.message);
      } else {
        setMessage('로그인 성공!');
        setTimeout(onClose, 500);
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setMessage('회원가입 실패: ' + error.message);
      } else {
        setMessage('가입 성공!');
        setTimeout(onClose, 500);
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-black">
          ✕
        </button>
        <h2 className="mb-2 text-xl font-bold text-ink">
          {isLogin ? '로그인' : '회원가입'}
        </h2>
        <p className="mb-6 text-xs text-ink-soft">
          {isLogin ? '가입하신 이메일과 비밀번호를 입력해주세요.' : '새로운 계정을 만들어 3장의 무료 크레딧을 받으세요!'}
        </p>
        
        <form onSubmit={handleAuth} className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소"
            required
            className="rounded-lg border border-line-strong px-4 py-2.5 text-sm focus:border-ink focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 (6자리 이상)"
            required
            minLength={6}
            className="rounded-lg border border-line-strong px-4 py-2.5 text-sm focus:border-ink focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg bg-ink py-2.5 font-bold text-white transition-colors hover:bg-ink-soft disabled:bg-gray-400"
          >
            {loading ? '처리 중...' : (isLogin ? '로그인하기' : '회원가입 완료')}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            {isLogin ? '계정이 없으신가요? 회원가입하기' : '이미 계정이 있으신가요? 로그인하기'}
          </button>
        </div>

        {message && (
          <p className={`mt-4 text-center text-xs font-semibold ${message.includes('실패') ? 'text-red-500' : 'text-emerald-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
