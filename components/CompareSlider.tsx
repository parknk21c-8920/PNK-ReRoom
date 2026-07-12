'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';

type CompareSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  /** LCP 대상(히어로 쇼케이스)일 때만 true */
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * 비포/애프터 비교 슬라이더.
 * After 레이어를 clip-path로 잘라내는 방식이라 리사이즈에도 이미지가 어긋나지 않고,
 * 포인터 캡처 + 키보드(방향키) 조작을 모두 지원한다.
 */
export default function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 896px',
  className = '',
}: CompareSliderProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, ratio)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === 'ArrowLeft') {
      setPos((p) => Math.max(0, p - step));
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      setPos((p) => Math.min(100, p + step));
      e.preventDefault();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`group relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-sand select-none touch-none cursor-ew-resize shadow-deep ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={(e) => draggingRef.current && moveTo(e.clientX)}
      onPointerUp={() => (draggingRef.current = false)}
      onPointerCancel={() => (draggingRef.current = false)}
    >
      {/* Before */}
      <Image
        src={beforeSrc}
        alt={beforeAlt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        draggable={false}
      />
      <span className="absolute bottom-4 right-4 rounded-lg bg-ink/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-paper backdrop-blur-md">
        Before
      </span>

      {/* After — clip-path로 좌측 pos%만 노출 */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          draggable={false}
        />
        <span className="absolute bottom-4 left-4 rounded-lg bg-ink px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-paper">
          After
        </span>
      </div>

      {/* 핸들 라인 */}
      <div
        className="absolute inset-y-0 w-px bg-paper/90"
        style={{ left: `${pos}%` }}
      >
        {/* 핸들 버튼 — 펄스 링 애니메이션 */}
        <button
          type="button"
          role="slider"
          aria-label="비포/애프터 비교 슬라이더"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
          className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-paper bg-paper text-ink shadow-deep transition-transform duration-300 group-hover:scale-110 focus:outline-none animate-pulse-ring"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M5 3L2 8l3 5M11 3l3 5-3 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
