import React from 'react';
import { 
  User, Tv, Film, 
  ShoppingBag, Dog, Car, Building2, Trees, 
  Box, Grid, Star, Layers, AlertTriangle, FileText, Sparkles
} from 'lucide-react';

const iconMap = {
  AlertTriangle: <AlertTriangle size={16} />,
  User: <User size={16} />,
  Tv: <Tv size={16} />,
  Film: <Film size={16} />,
  ShoppingBag: <ShoppingBag size={16} />,
  Dog: <Dog size={16} />,
  Car: <Car size={16} />,
  Building2: <Building2 size={16} />,
  Trees: <Trees size={16} />,
  Box: <Box size={16} />,
  FileText: <FileText size={16} />,
  Sparkles: <Sparkles size={16} />,
  Grid: <Grid size={16} />
};

export default function Sidebar({ categories, activeCategory, setActiveCategory, totalCount }) {
  const noImgCategory = categories.find(c => c.name === '⚠️ 이미지 없음 (작업용)');
  const mainCategories = categories.filter(c => c.name !== '⚠️ 이미지 없음 (작업용)' && c.name !== 'Bookmarks');
  const bookmarksCategory = categories.find(c => c.name === 'Bookmarks');

  return (
    <aside className="glass-panel" style={{
      width: '285px',
      flexShrink: 0,
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.4rem',
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
        paddingBottom: '0.75rem',
        borderBottom: '1px solid var(--glass-border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '1rem', color: '#fff' }}>
          <Layers size={18} style={{ color: 'var(--accent-purple)' }} />
          <span>카테고리 탐색</span>
        </div>
        <span style={{
          fontSize: '0.75rem',
          background: 'rgba(139, 92, 246, 0.2)',
          color: '#c084fc',
          padding: '0.15rem 0.6rem',
          borderRadius: 'var(--radius-full)',
          fontWeight: '600'
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
            padding: '0.7rem 0.9rem',
            borderRadius: 'var(--radius-md)',
            background: activeCategory === '⚠️ 이미지 없음 (작업용)'
              ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
              : 'rgba(245, 158, 11, 0.15)',
            border: activeCategory === '⚠️ 이미지 없음 (작업용)' ? 'none' : '1px solid rgba(245, 158, 11, 0.4)',
            color: activeCategory === '⚠️ 이미지 없음 (작업용)' ? '#fff' : '#fbbf24',
            fontWeight: '700',
            fontSize: '0.88rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: activeCategory === '⚠️ 이미지 없음 (작업용)' ? '0 4px 15px rgba(245, 158, 11, 0.4)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertTriangle size={17} />
            <span>⚠️ 이미지 없음 (작업용)</span>
          </div>
          <span style={{
            fontSize: '0.75rem',
            background: activeCategory === '⚠️ 이미지 없음 (작업용)' ? 'rgba(0,0,0,0.3)' : 'rgba(245, 158, 11, 0.25)',
            padding: '0.15rem 0.5rem',
            borderRadius: 'var(--radius-full)'
          }}>
            {noImgCategory.count}
          </span>
        </button>
      )}

      {/* All & Bookmarks Quick Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <button
          onClick={() => setActiveCategory('All')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.6rem 0.9rem',
            borderRadius: 'var(--radius-md)',
            background: activeCategory === 'All' 
              ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))' 
              : 'rgba(255, 255, 255, 0.04)',
            border: activeCategory === 'All' ? 'none' : '1px solid var(--glass-border)',
            color: activeCategory === 'All' ? '#fff' : 'var(--text-main)',
            fontWeight: activeCategory === 'All' ? '600' : '500',
            fontSize: '0.88rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: activeCategory === 'All' ? '0 4px 14px rgba(139, 92, 246, 0.35)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Grid size={16} />
            <span>전체 프롬프트</span>
          </div>
          <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{totalCount}</span>
        </button>

        {bookmarksCategory && (
          <button
            onClick={() => setActiveCategory('Bookmarks')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.6rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              background: activeCategory === 'Bookmarks' 
                ? 'rgba(234, 179, 8, 0.25)' 
                : 'rgba(255, 255, 255, 0.04)',
              border: activeCategory === 'Bookmarks' ? '1px solid rgba(234, 179, 8, 0.5)' : '1px solid var(--glass-border)',
              color: activeCategory === 'Bookmarks' ? '#facc15' : 'var(--text-main)',
              fontWeight: activeCategory === 'Bookmarks' ? '600' : '500',
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Star size={16} fill={activeCategory === 'Bookmarks' ? '#facc15' : 'none'} style={{ color: '#facc15' }} />
              <span>즐겨찾기 목록</span>
            </div>
            <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{bookmarksCategory.count}</span>
          </button>
        )}
      </div>

      {/* RE-ORGANIZED CATEGORIES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{
          fontSize: '0.78rem',
          fontWeight: '700',
          color: 'var(--accent-pink)',
          letterSpacing: '0.02em',
          paddingLeft: '0.2rem',
          textTransform: 'uppercase'
        }}>
          🎨 프롬프트 테마 카테고리
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {mainCategories.map(cat => {
            const isActive = activeCategory === cat.name;
            const isPerson = cat.name.includes('인물');
            const icon = iconMap[cat.icon] || <Grid size={16} />;

            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.55rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: isActive 
                    ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))' 
                    : isPerson ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                  border: isActive 
                    ? 'none' 
                    : isPerson ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
                  color: isActive ? '#fff' : isPerson ? '#e9d5ff' : 'var(--text-muted)',
                  fontWeight: isActive ? '600' : '400',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(139, 92, 246, 0.35)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflow: 'hidden' }}>
                  <span style={{ color: isActive ? '#fff' : isPerson ? '#c084fc' : 'var(--text-subtle)', flexShrink: 0 }}>
                    {icon}
                  </span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {cat.name}
                  </span>
                </div>
                <span style={{
                  fontSize: '0.72rem',
                  background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.3)',
                  padding: '0.1rem 0.45rem',
                  borderRadius: 'var(--radius-full)',
                  flexShrink: 0
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
