import React from 'react';
import { 
  User, Tv, Film, 
  ShoppingBag, Dog, Car, Building2, Trees, 
  Box, Grid, Star, Layers, AlertTriangle, FileText, Sparkles
} from 'lucide-react';

const iconMap = {
  AlertTriangle: <AlertTriangle size={20} />,
  User: <User size={20} />,
  Tv: <Tv size={20} />,
  Film: <Film size={20} />,
  ShoppingBag: <ShoppingBag size={20} />,
  Dog: <Dog size={20} />,
  Car: <Car size={20} />,
  Building2: <Building2 size={20} />,
  Trees: <Trees size={20} />,
  Box: <Box size={20} />,
  FileText: <FileText size={20} />,
  Sparkles: <Sparkles size={20} />,
  Grid: <Grid size={20} />
};

export default function Sidebar({ categories, activeCategory, setActiveCategory, totalCount }) {
  const noImgCategory = categories.find(c => c.name === '⚠️ 이미지 없음 (작업용)');
  const mainCategories = categories.filter(c => c.name !== '⚠️ 이미지 없음 (작업용)' && c.name !== 'Bookmarks');
  const bookmarksCategory = categories.find(c => c.name === 'Bookmarks');

  return (
    <aside className="glass-panel" style={{
      width: '310px',
      flexShrink: 0,
      borderRadius: 'var(--radius-lg)',
      padding: '1.4rem 1.1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      height: 'fit-content',
      position: 'sticky',
      top: '90px',
      maxHeight: 'calc(100vh - 110px)',
      overflowY: 'auto'
    }}>
      {/* Header Info */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '0.85rem',
        borderBottom: '1px solid var(--glass-border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '800', fontSize: '1.15rem', color: '#fff' }}>
          <Layers size={22} style={{ color: 'var(--accent-purple)' }} />
          <span>카테고리 탐색</span>
        </div>
        <span style={{
          fontSize: '0.85rem',
          background: 'rgba(139, 92, 246, 0.25)',
          color: '#d8b4fe',
          padding: '0.2rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          fontWeight: '700'
        }}>
          {totalCount}개
        </span>
      </div>

      {/* WORKSHOP CATEGORY: ⚠️ 이미지 없음 (작업용) High Priority Button */}
      {noImgCategory && (
        <button
          onClick={() => setActiveCategory('⚠️ 이미지 없음 (작업용)')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: activeCategory === '⚠️ 이미지 없음 (작업용)'
              ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
              : 'rgba(245, 158, 11, 0.18)',
            border: activeCategory === '⚠️ 이미지 없음 (작업용)' ? 'none' : '1.5px solid rgba(245, 158, 11, 0.5)',
            color: activeCategory === '⚠️ 이미지 없음 (작업용)' ? '#fff' : '#fef08a',
            fontWeight: '800',
            fontSize: '1.02rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: activeCategory === '⚠️ 이미지 없음 (작업용)' ? '0 4px 18px rgba(245, 158, 11, 0.45)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <AlertTriangle size={20} />
            <span style={{ lineHeight: '1.3' }}>⚠️ 이미지 없음<br/>(작업용)</span>
          </div>
          <span style={{
            fontSize: '0.85rem',
            background: activeCategory === '⚠️ 이미지 없음 (작업용)' ? 'rgba(0,0,0,0.35)' : 'rgba(245, 158, 11, 0.3)',
            padding: '0.2rem 0.65rem',
            borderRadius: 'var(--radius-full)',
            fontWeight: '800'
          }}>
            {noImgCategory.count}
          </span>
        </button>
      )}

      {/* All & Bookmarks Quick Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button
          onClick={() => setActiveCategory('All')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: activeCategory === 'All' 
              ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))' 
              : 'rgba(255, 255, 255, 0.05)',
            border: activeCategory === 'All' ? 'none' : '1px solid var(--glass-border)',
            color: activeCategory === 'All' ? '#fff' : 'var(--text-main)',
            fontWeight: activeCategory === 'All' ? '700' : '600',
            fontSize: '1.02rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: activeCategory === 'All' ? '0 4px 16px rgba(139, 92, 246, 0.4)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Grid size={20} />
            <span>전체 프롬프트</span>
          </div>
          <span style={{ fontSize: '0.85rem', opacity: 0.9, fontWeight: '700' }}>{totalCount}</span>
        </button>

        {bookmarksCategory && (
          <button
            onClick={() => setActiveCategory('Bookmarks')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: activeCategory === 'Bookmarks' 
                ? 'rgba(234, 179, 8, 0.3)' 
                : 'rgba(255, 255, 255, 0.05)',
              border: activeCategory === 'Bookmarks' ? '1.5px solid rgba(234, 179, 8, 0.6)' : '1px solid var(--glass-border)',
              color: activeCategory === 'Bookmarks' ? '#fde047' : 'var(--text-main)',
              fontWeight: activeCategory === 'Bookmarks' ? '700' : '600',
              fontSize: '1.02rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Star size={20} fill={activeCategory === 'Bookmarks' ? '#fde047' : 'none'} style={{ color: '#fde047' }} />
              <span>즐겨찾기 목록</span>
            </div>
            <span style={{ fontSize: '0.85rem', opacity: 0.9, fontWeight: '700' }}>{bookmarksCategory.count}</span>
          </button>
        )}
      </div>

      {/* RE-ORGANIZED CATEGORIES WITH 2-LINE WRAPPING & BIGGER FONTS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        <div style={{
          fontSize: '0.88rem',
          fontWeight: '800',
          color: 'var(--accent-pink)',
          letterSpacing: '0.03em',
          paddingLeft: '0.2rem',
          textTransform: 'uppercase'
        }}>
          🎨 테마별 프롬프트
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {mainCategories.map(cat => {
            const isActive = activeCategory === cat.name;
            const isPerson = cat.name.includes('인물');
            const icon = iconMap[cat.icon] || <Grid size={20} />;

            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.95rem',
                  borderRadius: 'var(--radius-md)',
                  background: isActive 
                    ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))' 
                    : isPerson ? 'rgba(139, 92, 246, 0.14)' : 'rgba(255, 255, 255, 0.05)',
                  border: isActive 
                    ? 'none' 
                    : isPerson ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid transparent',
                  color: isActive ? '#fff' : isPerson ? '#f3e8ff' : '#f8fafc',
                  fontWeight: isActive ? '800' : '700',
                  fontSize: '1.02rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 16px rgba(139, 92, 246, 0.4)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                  <span style={{ color: isActive ? '#fff' : isPerson ? '#d8b4fe' : '#94a3b8', flexShrink: 0 }}>
                    {icon}
                  </span>
                  <span style={{ 
                    whiteSpace: 'normal',
                    wordBreak: 'keep-all',
                    lineHeight: '1.38',
                    fontSize: '1.02rem',
                    textAlign: 'left',
                    letterSpacing: '-0.02em'
                  }}>
                    {cat.name}
                  </span>
                </div>
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: '800',
                  background: isActive ? 'rgba(255, 255, 255, 0.28)' : 'rgba(0, 0, 0, 0.5)',
                  color: isActive ? '#fff' : '#e2e8f0',
                  padding: '0.18rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  flexShrink: 0,
                  marginLeft: '0.5rem'
                }}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
