import React from 'react';
import { Sparkles, Search, Copy, PlusCircle, Database, ArrowRight } from 'lucide-react';
import Lightfall from './Lightfall';

export default function IntroPage({ onEnter }) {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      background: '#090a0f'
    }}>
      {/* Perfectly Balanced React Bits Lightfall Shader Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity: 0.85
      }}>
        <Lightfall
          colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
          backgroundColor="#05081E"
          speed={0.8}
          streakCount={2}
          streakWidth={1}
          streakLength={1}
          glow={1}
          density={0.35}
          twinkle={0.8}
          zoom={2.0}
          backgroundGlow={0.8}
          opacity={0.85}
          mouseInteraction={true}
          mouseStrength={0.8}
          mouseRadius={0.6}
        />
      </div>

      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '1100px',
        width: '100%'
      }}>
        {/* Hero Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(18, 22, 33, 0.75)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          backdropFilter: 'blur(16px)',
          marginBottom: '1.5rem',
          fontSize: '0.88rem',
          color: '#c084fc',
          boxShadow: '0 4px 20px rgba(139, 92, 246, 0.25)'
        }}>
          <Sparkles size={16} />
          <span>GPT-Image2 Interactive Prompt Hub</span>
        </div>

        {/* Main Title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.4rem)',
          fontWeight: '800',
          textAlign: 'center',
          lineHeight: 1.15,
          marginBottom: '1.25rem',
          color: '#ffffff',
          textShadow: '0 4px 25px rgba(0,0,0,0.8)'
        }}>
          빛나는 아이디어를 완성하는 <br />
          <span className="text-gradient">GPT-Image2 프롬프트 갤러리</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          color: '#e2e8f0',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          textAlign: 'center',
          maxWidth: '660px',
          lineHeight: 1.6,
          marginBottom: '2.5rem',
          textShadow: '0 2px 10px rgba(0,0,0,0.9)'
        }}>
          30여 가지 고품질 예술 스타일과 162개 프롬프트를 탐색하고 1초 만에 복사하여 최고의 AI 이미지를 생성해보세요. 마우스로 빛의 물결을 반응시켜 보세요!
        </p>

        {/* Enter Button */}
        <button 
          onClick={onEnter}
          className="btn-primary"
          style={{
            fontSize: '1.15rem',
            padding: '1.1rem 2.8rem',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            marginBottom: '3.5rem',
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)'
          }}
        >
          <span>프롬프트 갤러리 입장하기</span>
          <ArrowRight size={22} />
        </button>

        {/* Feature Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          width: '100%',
          marginTop: '1rem'
        }}>
          <FeatureCard 
            icon={<Search style={{ color: '#38bdf8' }} size={24} />}
            title="스타일 & 키워드 검색"
            desc="Anime, Cinematic, Gaming, Photography 등 30+ 카테고리 실시간 정밀 검색"
          />
          <FeatureCard 
            icon={<Copy style={{ color: '#c084fc' }} size={24} />}
            title="원클릭 프롬프트 복사"
            desc="버튼 클릭 한 번으로 프롬프트를 즉시 클립보드에 복사해 사용"
          />
          <FeatureCard 
            icon={<PlusCircle style={{ color: '#4ade80' }} size={24} />}
            title="프롬프트 추가 & 삭제"
            desc="나만의 프롬프트를 갤러리에 자유롭게 등록하고 필요시 손쉽게 삭제"
          />
          <FeatureCard 
            icon={<Database style={{ color: '#f472b6' }} size={24} />}
            title="Firebase 무료 DB 동기화"
            desc="Google Firebase 연동으로 어디서나 내 프롬프트 데이터 클라우드 저장"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="glass-panel glass-panel-hover" style={{
      padding: '1.35rem',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      background: 'rgba(18, 22, 33, 0.75)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#fff' }}>{title}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}
