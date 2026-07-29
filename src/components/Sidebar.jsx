import React from 'react';
import { 
  User, Sparkles, Users, Tv, Film, Gamepad2, 
  Shirt, ShoppingBag, Dog, Car, Building2, Trees, 
  MapPin, BarChart3, Type, Palette, Box, Grid, Star, Layers
} from 'lucide-react';

const iconMap = {
  User: <User size={16} />,
  Sparkles: <Sparkles size={16} />,
  Users: <Users size={16} />,
  Tv: <Tv size={16} />,
  Film: <Film size={16} />,
  Gamepad2: <Gamepad2 size={16} />,
  Shirt: <Shirt size={16} />,
  ShoppingBag: <ShoppingBag size={16} />,
  Dog: <Dog size={16} />,
  Car: <Car size={16} />,
  Building2: <Building2 size={16} />,
  Trees: <Trees size={16} />,
  MapPin: <MapPin size={16} />,
  BarChart3: <BarChart3 size={16} />,
  Type: <Type size={16} />,
  Palette: <Palette size={16} />,
  Box: <Box size={16} />,
  Grid: <Grid size={16} />
};

export default function Sidebar({ categories, activeCategory, setActiveCategory, totalCount }) {
  // Group categories into organized sections with '인물 생성' strictly prioritized at top
  const personGroup = categories.filter(c => ['인물 사진 / 셀카', '인플루언서 / 모델', '캐릭터 / 커플 / 그룹'].includes(c.name));
  const styleGroup = categories.filter(c => ['애니메이션 & 만화', '영화 & 시네마틱', '게이밍 & 판타지', '유화 / 수채화 / 미술'].includes(c.name));
  const topicGroup = categories.filter(c => ['패션 & 라이프스타일', '제품 / 음식 / 아이템', '동물 / 생명체', '차량 / 수송기기', '건축 / 인테리어', '풍경 / 자연', '도시 풍경 / 스트리트'].includes(c.name));
  const designGroup = categories.filter(c => ['3D & UI / UX', '텍스트 / 포스터', '다이어그램 / 차트', '기타 갤러리'].includes(c.name));
  const bookmarksCategory = categories.find(c => c.name === 'Bookmarks');

  return (
    <aside className="glass-panel" style={{
      width: '280px',
      flexShrink: 0,
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem 1rem',
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

      {/* All & Bookmarks Quick Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <button
          onClick={() => setActiveCategory('All')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.65rem 0.9rem',
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
              padding: '0.65rem 0.9rem',
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

      {/* SECTION 1: 🔥 인물 생성 (Prioritized Top Group) */}
      <SidebarGroup 
        title="🔥 인물 생성 (상위 추천)" 
        items={personGroup} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory}
        isHighlight={true}
      />

      {/* SECTION 2: 🎨 예술 & 스타일 */}
      <SidebarGroup 
        title="🎨 예술 & 스타일" 
        items={styleGroup} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />

      {/* SECTION 3: 🛍️ 주제 & 피사체 */}
      <SidebarGroup 
        title="🛍️ 주제 & 피사체" 
        items={topicGroup} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />

      {/* SECTION 4: 📐 그래픽 & 디자인 */}
      <SidebarGroup 
        title="📐 그래픽 & 디자인" 
        items={designGroup} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
    </aside>
  );
}

function SidebarGroup({ title, items, activeCategory, setActiveCategory, isHighlight }) {
  if (!items || items.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{
        fontSize: '0.78rem',
        fontWeight: '700',
        color: isHighlight ? 'var(--accent-pink)' : 'var(--text-subtle)',
        letterSpacing: '0.02em',
        paddingLeft: '0.2rem',
        textTransform: 'uppercase'
      }}>
        {title}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {items.map(cat => {
          const isActive = activeCategory === cat.name;
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
                  : isHighlight ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                border: isActive 
                  ? 'none' 
                  : isHighlight ? '1px solid rgba(139, 92, 246, 0.25)' : '1px solid transparent',
                color: isActive ? '#fff' : isHighlight ? '#e9d5ff' : 'var(--text-muted)',
                fontWeight: isActive ? '600' : '400',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 14px rgba(139, 92, 246, 0.35)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflow: 'hidden' }}>
                <span style={{ color: isActive ? '#fff' : isHighlight ? '#c084fc' : 'var(--text-subtle)', flexShrink: 0 }}>
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
  );
}
