'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ROOM_TYPES, STYLES } from '@/lib/constants';
import CompareSlider from './CompareSlider';
import Reveal from './Reveal';
import { useLanguage } from './LanguageContext';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';

export default function Studio() {
  const { lang, t } = useLanguage();

  const LOADING_STATUSES = [
    t('공간 구조 분석 중...', 'Analyzing space structure...'),
    t('스타일 요소 배치 중...', 'Placing style elements...'),
    t('조명 및 색상 튜닝 중...', 'Tuning lighting and colors...'),
    t('최종 고화질 렌더링 중...', 'Finalizing high-res render...'),
  ];

  // 입력 상태
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState(ROOM_TYPES[0].id);
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0].id);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 생성 상태
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generationTime, setGenerationTime] = useState<number | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // 스타일 갤러리 카드에서 스타일을 미리 선택했을 때
    const onPickStyle = (e: Event) => {
      const styleId = (e as CustomEvent<string>).detail;
      if (STYLES.some((s) => s.id === styleId)) {
        setSelectedStyle(styleId);
        setResultImage(null);
      }
    };
    window.addEventListener('reroom:style', onPickStyle);
    return () => window.removeEventListener('reroom:style', onPickStyle);
  }, []);

  // 업로드 이미지 전처리 — Canvas로 긴 쪽 1024px 다운스케일
  const handleImageFile = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg(t('이미지 파일(JPG, PNG, WebP)만 업로드할 수 있습니다.', 'Only image files (JPG, PNG, WebP) can be uploaded.'));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg(t('파일 크기는 10MB를 초과할 수 없습니다.', 'File size cannot exceed 10MB.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const maxDim = 1024;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          setUploadedImage(canvas.toDataURL('image/jpeg', 0.85));
          setResultImage(null);
          setErrorMsg(null);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const { user, credits, refreshCredits } = useAuth();

  const handleGenerate = async () => {
    if (!user) {
      setErrorMsg(t('로그인이 필요합니다. 상단 로그인 버튼을 눌러주세요.', 'Please log in to generate.'));
      return;
    }
    if (credits <= 0) {
      window.location.href = '/pricing';
      return;
    }

    if (!uploadedImage) {
      setErrorMsg(t('공간 인테리어를 위해 먼저 사진을 업로드해 주세요.', 'Please upload a photo first to redesign the space.'));
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setResultImage(null);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % LOADING_STATUSES.length);
    }, 2500);
    const startTime = Date.now();

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          image: uploadedImage,
          roomTypeId: selectedRoom,
          styleId: selectedStyle,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.redirect) {
          window.location.href = data.redirect;
          return;
        }
        throw new Error(data.error || t('이미지 생성에 실패했습니다.', 'Failed to generate image.'));
      }

      setResultImage(`data:image/png;base64,${data.image}`);
      setGenerationTime(Number(((Date.now() - startTime) / 1000).toFixed(1)));
      await refreshCredits();

    } catch (err) {
      console.error(err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : t('인테리어 생성 중 오류가 발생했습니다. 다시 시도해 주세요.', 'An error occurred during generation. Please try again.')
      );
    } finally {
      clearInterval(interval);
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `pnk_reroom_${selectedRoom}_${selectedStyle}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetResult = () => {
    setResultImage(null);
    setGenerationTime(null);
  };

  const resetAll = () => {
    setUploadedImage(null);
    setResultImage(null);
    setGenerationTime(null);
    setErrorMsg(null);
  };

  return (
    <section id="studio" className="w-full scroll-mt-16 border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <div className="flex flex-col">
            <span className="inline-block w-fit rounded-full bg-blue-500 px-4 py-1.5 text-[13px] font-bold uppercase tracking-widest text-white shadow-sm">
              STUDIO
            </span>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-[-0.02em] text-ink md:text-[2.5rem]">
              {t('나의 리디자인 스튜디오', 'My Redesign Studio')}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <div className="rounded-3xl border border-line bg-paper-raised p-6 shadow-lift md:p-10">
            {resultImage && uploadedImage ? (
              /* ── 생성 완료 결과 ── */
              <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 animate-fade-in">
                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-paper">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Redesign Complete
                  </span>
                  <h3 className="font-display mt-5 text-2xl font-bold tracking-tight text-ink">
                    {t('새로운 공간이 완성되었습니다', 'Your New Space is Ready')}
                  </h3>
                  <p className="mt-2 text-[13px] text-ink-faint">
                    {STYLES.find((s) => s.id === selectedStyle)?.emoji}{' '}
                    {lang === 'ko' ? STYLES.find((s) => s.id === selectedStyle)?.label : STYLES.find((s) => s.id === selectedStyle)?.labelEn}{' '}
                    {lang === 'ko' ? `스타일 · 생성 소요 ${generationTime}초` : `Style · Generated in ${generationTime}s`}
                  </p>
                </div>

                <CompareSlider
                  beforeSrc={uploadedImage}
                  afterSrc={resultImage}
                  beforeAlt={t("업로드한 원본 공간", "Original Space")}
                  afterAlt={t("리디자인된 공간", "Redesigned Space")}
                />

                <div className="flex w-full flex-wrap justify-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="btn-premium cursor-pointer rounded-full bg-ink px-8 py-3.5 text-sm font-semibold text-paper shadow-lift hover:shadow-deep"
                  >
                    {t('고화질 PNG 다운로드', 'Download High-Res PNG')}
                  </button>
                  <button
                    onClick={resetResult}
                    className="btn-premium cursor-pointer rounded-full border border-line-strong bg-paper px-8 py-3.5 text-sm font-semibold text-ink hover:border-ink hover:shadow-xs"
                  >
                    {t('다른 스타일로 다시', 'Try Another Style')}
                  </button>
                  <button
                    onClick={resetAll}
                    className="cursor-pointer rounded-full px-6 py-3.5 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:text-ink"
                  >
                    {t('다른 사진 업로드', 'Upload Another Photo')}
                  </button>
                </div>
              </div>
            ) : (
              /* ── 입력 단계 ── */
              <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
                {/* 01. 업로드 */}
                <div className="flex flex-col gap-4">
                  <label className="flex items-baseline gap-2.5 text-[15px] font-bold text-ink">
                    <span className="font-display text-[13px] text-ink-faint">01</span>
                    {t('원본 공간 사진 업로드', 'Upload Original Photo')}
                  </label>

                  {!uploadedImage ? (
                    <div
                      role="button"
                      tabIndex={0}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragOver(true);
                      }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragOver(false);
                        if (e.dataTransfer.files?.[0]) handleImageFile(e.dataTransfer.files[0]);
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          fileInputRef.current?.click();
                        }
                      }}
                      className={`flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
                        isDragOver
                          ? 'scale-[0.98] border-ink bg-accent-soft'
                          : 'border-line-strong bg-paper hover:border-ink-faint hover:bg-sand/50'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleImageFile(e.target.files[0]);
                          e.target.value = '';
                        }}
                      />
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="text-ink-faint"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.4" />
                        <circle cx="9" cy="9" r="1.8" fill="currentColor" />
                        <path d="M4 17l5-5 4 4 3-3 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {t('파일을 드래그하거나 클릭해서 업로드', 'Drag & Drop or Click to Upload')}
                        </p>
                        <p className="mt-2 text-[11px] leading-relaxed text-ink-faint">
                          {t('JPG · PNG · WebP, 최대 10MB', 'JPG · PNG · WebP, Max 10MB')}
                          <br />
                          {t('업로드 시 1024px로 자동 최적화됩니다', 'Automatically optimized to 1024px upon upload')}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line shadow-lift">
                      <Image src={uploadedImage} alt={t('업로드한 공간 미리보기', 'Preview of uploaded space')} fill className="object-cover" />
                      <button
                        onClick={resetAll}
                        title={t('사진 삭제', 'Delete Photo')}
                        className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-ink/70 text-paper backdrop-blur-md transition-all duration-200 hover:bg-ink hover:scale-110 active:scale-95"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {/* 02+03. 옵션 */}
                <div className="flex flex-col gap-9">
                  <div className="flex flex-col gap-4">
                    <label className="flex items-baseline gap-2.5 text-[15px] font-bold text-ink">
                      <span className="font-display text-[13px] text-ink-faint">02</span>
                      {t('공간 유형', 'Room Type')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ROOM_TYPES.map((room) => (
                        <button
                          key={room.id}
                          onClick={() => {
                            setSelectedRoom(room.id);
                            setErrorMsg(null);
                          }}
                          className={`cursor-pointer rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
                            selectedRoom === room.id
                              ? 'bg-ink text-paper shadow-xs'
                              : 'border border-line bg-paper text-ink-soft hover:border-ink-faint hover:text-ink'
                          }`}
                        >
                          {lang === 'ko' ? room.label : room.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="flex items-baseline gap-2.5 text-[15px] font-bold text-ink">
                      <span className="font-display text-[13px] text-ink-faint">03</span>
                      {t('디자인 스타일', 'Design Style')}
                    </label>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                      {STYLES.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => {
                            setSelectedStyle(style.id);
                            setErrorMsg(null);
                          }}
                          data-selected={selectedStyle === style.id ? 'true' : undefined}
                          className="card-tactile flex cursor-pointer flex-col items-start gap-2.5 rounded-xl border border-line bg-paper p-4 text-left"
                        >
                          <span className="text-2xl">{style.emoji}</span>
                          <span className="text-[12px] font-bold text-ink sm:text-[13px]">
                            {lang === 'ko' ? style.label : style.labelEn}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BYOK + 에러 + 생성 버튼 (전체 폭) */}
                <div className="flex flex-col gap-5 lg:col-span-2">

                  {errorMsg && (
                    <div
                      role="alert"
                      className="rounded-xl border border-ink/10 bg-sand p-4 text-[12px] leading-relaxed text-ink animate-fade-in"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <button
                    onClick={handleGenerate}
                    disabled={isLoading || !uploadedImage}
                    className={`btn-premium w-full rounded-2xl py-4 text-[15px] font-bold ${
                      isLoading || !uploadedImage
                        ? 'cursor-not-allowed bg-sand text-ink-faint'
                        : 'cursor-pointer bg-ink text-paper shadow-lift hover:shadow-deep'
                    }`}
                  >
                    {isLoading ? t('새로운 인테리어 생성 중...', 'Generating new interior...') : t('인테리어 디자인 생성하기', 'Generate Interior Design')}
                  </button>

                  {isLoading && (
                    <div className="flex flex-col items-center gap-5 rounded-2xl border border-line bg-paper py-10 animate-fade-in">
                      <div className="flex items-center gap-2.5">
                        {[0, 150, 300].map((delay) => (
                          <span
                            key={delay}
                            className="h-2 w-2 animate-bounce rounded-full bg-ink"
                            style={{ animationDelay: `${delay}ms` }}
                          />
                        ))}
                      </div>
                      <p className="text-sm font-semibold text-ink" aria-live="polite">
                        {LOADING_STATUSES[loadingStep]}
                      </p>
                      <p className="text-[11px] text-ink-faint">
                        {t('첫 생성에는 약 10초가 소요됩니다. 잠시만 기다려 주세요.', 'The first generation takes about 10 seconds. Please wait a moment.')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
