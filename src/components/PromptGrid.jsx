import React from 'react';
import PromptCard from './PromptCard';
import { SearchX, RotateCcw } from 'lucide-react';

export default function PromptGrid({ 
  prompts, 
  onSelectPrompt, 
  onCopyPrompt, 
  bookmarks, 
  onToggleBookmark,
  onDeletePrompt,
  onResetSearch
}) {
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

  return (
    <div style={{
      maxWidth: '1300px',
      margin: '1.5rem auto 4rem',
      padding: '0 1.5rem'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: '1.5rem'
      }}>
        {prompts.map((item) => (
          <PromptCard
            key={item.id}
            promptItem={item}
            onSelect={onSelectPrompt}
            onCopy={onCopyPrompt}
            isBookmarked={bookmarks.includes(item.id)}
            onToggleBookmark={onToggleBookmark}
            onDeletePrompt={onDeletePrompt}
          />
        ))}
      </div>
    </div>
  );
}
