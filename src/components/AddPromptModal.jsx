import React, { useState } from 'react';
import { X, Plus, Image as ImageIcon, Upload, Link, Check } from 'lucide-react';

export default function AddPromptModal({ onClose, onAddPrompt }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('인물 사진 / 셀카');
  const [imageMode, setImageMode] = useState('url'); // 'url' or 'file'
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [fileName, setFileName] = useState('');

  const categories = [
    "인물 사진 / 셀카",
    "인플루언서 / 모델",
    "캐릭터 / 커플 / 그룹",
    "애니메이션 & 만화",
    "영화 & 시네마틱",
    "게이밍 & 판타지",
    "패션 & 라이프스타일",
    "제품 / 음식 / 아이템",
    "동물 / 생명체",
    "차량 / 수송기기",
    "건축 / 인테리어",
    "풍경 / 자연",
    "도시 풍경 / 스트리트",
    "3D & UI / UX",
    "텍스트 / 포스터",
    "유화 / 수채화 / 미술",
    "다이어그램 / 차트",
    "기타 갤러리"
  ];

  // Handle local image file upload using FileReader (Base64 Data URL)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 파일 크기는 5MB 이하이어야 합니다.');
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Base64 data URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !prompt.trim()) {
      alert('제목과 프롬프트 내용은 필수 입력 항목입니다.');
      return;
    }

    const tags = tagsInput
      ? tagsInput.split(',').map(t => t.trim()).filter(Boolean)
      : [category];

    const categorySlug = category.toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-');

    onAddPrompt({
      title: title.trim(),
      category,
      categorySlug,
      imageUrl: imageUrl.trim(),
      prompt: prompt.trim(),
      tags,
      metadata: `${category} · 사용자 직접 추가 등록`
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '620px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(9, 10, 15, 0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Plus size={20} style={{ color: 'var(--accent-purple)' }} />
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>새 프롬프트 추가하기</h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form 
          onSubmit={handleSubmit} 
          style={{ 
            padding: '1.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.25rem',
            overflowY: 'auto'
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              프롬프트 제목 *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 초고화질 시네마틱 여성 포트레이트"
              style={{
                width: '100%',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              카테고리 분류 *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: '#121621',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Image Mode Selector (URL or Local File Upload) */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              이미지 첨부 방식 (선택)
            </label>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <button
                type="button"
                onClick={() => { setImageMode('url'); setImageUrl(''); setFileName(''); }}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: imageMode === 'url' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                  border: imageMode === 'url' ? '1px solid var(--accent-purple)' : '1px solid var(--glass-border)',
                  color: imageMode === 'url' ? '#c084fc' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <Link size={15} />
                <span>웹 URL 링크</span>
              </button>

              <button
                type="button"
                onClick={() => { setImageMode('file'); setImageUrl(''); setFileName(''); }}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: imageMode === 'file' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                  border: imageMode === 'file' ? '1px solid var(--accent-purple)' : '1px solid var(--glass-border)',
                  color: imageMode === 'file' ? '#c084fc' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <Upload size={15} />
                <span>내 컴퓨터 파일 업로드</span>
              </button>
            </div>

            {imageMode === 'url' ? (
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.png"
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            ) : (
              <div>
                <label style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '2px dashed rgba(139, 92, 246, 0.4)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}>
                  <Upload size={28} style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '500' }}>
                    {fileName ? `선택된 파일: ${fileName}` : '컴퓨터에서 이미지 파일 클릭/업로드'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>
                    (JPG, PNG, WEBP 지원, 최대 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            )}

            {/* Image Preview Thumbnail */}
            {imageUrl && (
              <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src={imageUrl}
                  alt="미리보기"
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--accent-purple)'
                  }}
                />
                <span style={{ fontSize: '0.8rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Check size={14} /> 이미지 준비 완료
                </span>
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              프롬프트 내용 *
            </label>
            <textarea
              required
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="GPT-Image2 생성에 사용할 상세 프롬프트 문구를 입력하세요..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'JetBrains Mono, monospace'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              태그 (쉼표로 구분)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Landscape, Cyberpunk, 8K"
              style={{
                width: '100%',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Footer Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              취소
            </button>
            <button type="submit" className="btn-primary">
              프롬프트 갤러리에 저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
