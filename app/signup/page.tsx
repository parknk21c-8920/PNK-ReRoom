'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || '해당 이메일로 이미 가입된 사용자가 존재합니다');
      } else {
        const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
        if (loginError) {
          setErrorMsg(loginError.message);
        } else {
          router.push('/');
        }
      }
    } catch (err: any) {
      setErrorMsg('가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleKakaoLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/`,
        scopes: 'profile_nickname profile_image',
      }
    });
    if (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Error message at the top */}
        <p className="text-center text-sm text-red-600 mb-2 font-medium h-5">
          {errorMsg}
        </p>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="group flex items-center justify-start gap-3">
            <img src="/qr_with_logo.png" alt="QR Logo" className="h-8 w-auto object-contain rounded-lg shadow-sm md:h-14" />
            <span className="font-display text-xl font-bold tracking-tight text-[#0095ff] md:text-[28px]">
              PNK Re-Room
            </span>
          </Link>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
          회원가입
        </h2>

        <div className="bg-paper-raised py-8 px-4 sm:px-10 border border-line rounded-lg">
          
          <div>
            <button
              type="button"
              onClick={handleKakaoLogin}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded shadow-sm bg-[#FEE500] text-base font-bold text-[#191919] hover:bg-[#e6cf00] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#191919">
                <path d="M12 3C6.477 3 2 6.574 2 10.985c0 2.849 1.83 5.342 4.606 6.786-.15.498-.539 1.859-.62 2.182-.102.404.148.404.316.291.13-.087 2.05-1.385 2.898-1.968a11.134 11.134 11.134 0 002.8.365c5.523 0 10-3.574 10-7.985C22 6.574 17.523 3 12 3z" />
              </svg>
              카카오 계정으로 간편 가입
            </button>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-paper-raised text-ink-soft font-medium">또는 이메일로 가입</span>
              </div>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일"
                  className="appearance-none block w-full px-3 py-3 border border-[#3b82f6] rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0095ff] focus:border-[#0095ff] sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                  className="appearance-none block w-full px-3 py-3 border border-[#3b82f6] rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0095ff] focus:border-[#0095ff] sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded shadow-sm text-base font-bold text-white bg-[#0095ff] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0095ff] disabled:bg-blue-300"
              >
                {loading ? '가입 중...' : '회원가입'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>'회원가입' 버튼을 클릭하면, 귀하는 이용 약관을</p>
            <p>수락하는 것입니다</p>
            <Link href="#" className="text-[#0095ff] underline mt-1 inline-block">
              사용자 약관
            </Link>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            이미 회원이신가요?{' '}
            <Link href="/login" className="text-[#0095ff] hover:underline">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
