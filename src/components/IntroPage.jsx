import React from 'react';
import { Sparkles, Image as ImageIcon, Search, Copy, PlusCircle, Database, ArrowRight } from 'lucide-react';

export default function IntroPage({ onEnter }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Ambient Glows */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(6,182,212,0.05) 50%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      {/* Hero Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.4rem 1rem',
        borderRadius: 'var(--radius-full)',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(10px)',
        marginBottom: '1.5rem',
        fontSize: '0.85rem',
        color: '#c084fc'
      }}>
        <Sparkles size={16} />
        <span>GPT-Image2 Official Prompt Skill Hub</span>
      </div>

      {/* Main Title */}
      <h1 style={{
        fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
        fontWeight: '800',
        textAlign: 'center',
        lineHeight: 1.15,
        marginBottom: '1.25rem',
        maxWidth: '850px'
      }}>
        완벽한 AI 이미지를 완성하는 <br />
        <span className="text-gradient">GPT-Image2 프롬프트 갤러리</span>
      </h1>

      {/* Subtitle */}
      <p style={{
        color: 'var(--text-muted)',
        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
        textAlign: 'center',
        maxWidth: '640px',
        lineHeight: 1.6,
        marginBottom: '2.5rem'
      }}>
        30여 가지 고품질 예술 스타일, 160개 이상의 세심하게 정제된 프롬프트를 탐색하고 1초 만에 복사하여 최고의 이미지를 생성해보세요.
      </p>

      {/* Enter Button */}
      <button 
        onClick={onEnter}
        className="btn-primary"
        style={{
          fontSize: '1.15rem',
          padding: '1rem 2.5rem',
          borderRadius: 'var(--radius-lg)',
          cursor: 'pointer',
          marginBottom: '4rem'
        }}
      >
        <span>프롬프트 갤러리 입장하기</span>
        <ArrowRight size={22} />
      </button>

      {/* Feature Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '1000px',
        marginTop: '1rem'
      }}>
        <FeatureCard 
          icon={<Search style={{ color: '#38bdf8' }} size={24} />}
          title="스타일 & 키워드 검색"
          desc="Anime, Cinematic, Gaming, Photography 등 카테고리별 정밀 검색"
        />
        <FeatureCard 
          icon={<Copy style={{ color: '#c084fc' }} size={24} />}
          title="원클릭 프롬프트 복사"
          desc="버튼 클릭 한 번으로 프롬프트를 즉시 클립보드에 복사해 사용"
        />
        <FeatureCard 
          icon={<PlusCircle style={{ color: '#4ade80' }} size={24} />}
          title="나만의 프롬프트 추가"
          desc="원하는 이미지와 나만의 비밀 프롬프트를 갤러리에 자유롭게 등록"
        />
        <FeatureCard 
          icon={<Database style={{ color: '#f472b6' }} size={24} />}
          title="Firebase 무료 DB 동기화"
          desc="Google Firebase 연동으로 어디서나 내 프롬프트 데이터 클라우드 저장"
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="glass-panel glass-panel-hover" style={{
      padding: '1.5rem',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }}>
      <div style={{
        width: '46px',
        height: '46px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(255, 255, 255, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{title}</h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}
