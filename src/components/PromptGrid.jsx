import React, { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
import { SearchX, RotateCcw, ChevronDown } from 'lucide-react';

const PAGE_SIZE = 36;

export default function PromptGrid({ 
  prompts, 
  onSelectPrompt, 
  onCopyPrompt, 
  bookmarks, 
  onToggleBookmark,
  onResetSearch,
  isAdminMode,
  onDeletePrompt,
  resetKey
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [resetKey]);

  useEffect(() => {
    let isThrottled = false;

    const handleScroll = () => {
      if (isThrottled) return;

      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 800 &&
        visibleCount < prompts.length
      ) {
        isThrottled = true;
        setVisibleCount(prev => Math.min(prev + PAGE_SIZE, prompts.length));
        
        // Increase throttle time to prevent runaway loading while images render
        setTimeout(() => {
          isThrottled = false;
        }, 1200);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount, prompts.length]);

  if (prompts.length === 0) {
    return (
      <div style={{
        maxWidth: '1300px',
        margin: '4rem auto',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)'
        }}>
          <SearchX size={32} />
        </div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '600' }}>검색 결과가 없습니다</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '400px' }}>
          입력하신 검색어 또는 선택한 카테고리에 해당하는 프롬프트를 찾을 수 없습니다.
        </p>
        <button 
          onClick={onResetSearch}
          className="btn-secondary"
          style={{ marginTop: '0.5rem' }}
        >
          <RotateCcw size={16} />
          <span>검색 필터 초기화</span>
        </button>
      </div>
    );
  }

  const visiblePrompts = prompts.slice(0, visibleCount);
  const hasMore = visibleCount < prompts.length;

  // React-based Masonry calculation
  const [colCount, setColCount] = useState(4);

  useEffect(() => {
    const mql768 = window.matchMedia('(max-width: 768px)');
    const mql1024 = window.matchMedia('(max-width: 1024px)');
    const mql1280 = window.matchMedia('(max-width: 1280px)');

    const updateColCount = () => {
      if (mql768.matches) setColCount(1);
      else if (mql1024.matches) setColCount(2);
      else if (mql1280.matches) setColCount(3);
      else setColCount(4);
    };

    updateColCount();

    mql768.addEventListener('change', updateColCount);
    mql1024.addEventListener('change', updateColCount);
    mql1280.addEventListener('change', updateColCount);

    return () => {
      mql768.removeEventListener('change', updateColCount);
      mql1024.removeEventListener('change', updateColCount);
      mql1280.removeEventListener('change', updateColCount);
    };
  }, []);

  // Distribute prompts into columns
  const columns = Array.from({ length: colCount }, () => []);
  visiblePrompts.forEach((item, index) => {
    columns[index % colCount].push(item);
  });

  return (
    <div style={{
      maxWidth: '1300px',
      margin: '1.5rem auto 4rem',
      padding: '0 1.5rem'
    }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', width: '100%' }}>
        {columns.map((col, colIndex) => (
          <div key={colIndex} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, minWidth: 0 }}>
            {col.map((item) => (
              <PromptCard
                key={item.id}
                promptItem={item}
                onSelectPrompt={onSelectPrompt}
                onCopyPrompt={onCopyPrompt}
                isBookmarked={bookmarks.includes(item.id)}
                onToggleBookmark={onToggleBookmark}
                isAdminMode={isAdminMode}
                onDeletePrompt={onDeletePrompt}
              />
            ))}
          </div>
        ))}
      </div>

      {hasMore && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '3rem',
          gap: '0.75rem'
        }}>
          <button
            onClick={() => setVisibleCount(prev => Math.min(prev + PAGE_SIZE, prompts.length))}
            className="btn-secondary"
            style={{
              padding: '0.75rem 2rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.95rem',
              fontWeight: '600',
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#c084fc'
            }}
          >
            <span>더 많은 프롬프트 불러오기 ({prompts.length - visibleCount}개 남음)</span>
            <ChevronDown size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
