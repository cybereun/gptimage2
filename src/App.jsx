import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PromptGrid from './components/PromptGrid';
import PromptDetailModal from './components/PromptDetailModal';
import AddPromptModal from './components/AddPromptModal';
import FirebaseConfigModal from './components/FirebaseConfigModal';
import AdminPinModal from './components/AdminPinModal';
import IntroPage from './components/IntroPage';
import { getStoredPrompts, addNewPrompt, updateStoredPrompt, deleteStoredPrompt } from './services/storage';

export default function App() {
  const [prompts, setPrompts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFirebaseModal, setShowFirebaseModal] = useState(false);
  const [showAdminPinModal, setShowAdminPinModal] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('gpt_image2_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(true);

  // Load initial prompts
  const loadPrompts = async () => {
    setLoading(true);
    const data = await getStoredPrompts();
    setPrompts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPrompts();
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gpt_image2_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }, [bookmarks]);

  const handleToggleBookmark = (id) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const handleAddPrompt = async (newPromptData) => {
    const created = await addNewPrompt(newPromptData);
    setPrompts(prev => [created, ...prev]);
  };

  const handleUpdatePrompt = (id, updatedFields) => {
    updateStoredPrompt(id, updatedFields);
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    if (selectedPrompt && selectedPrompt.id === id) {
      setSelectedPrompt(prev => ({ ...prev, ...updatedFields }));
    }
  };

  const handleDeletePrompt = (id) => {
    deleteStoredPrompt(id);
    setPrompts(prev => prev.filter(p => p.id !== id));
    if (selectedPrompt && selectedPrompt.id === id) {
      setSelectedPrompt(null);
    }
  };

  const handleMoveBookmarksToVisualPerson = () => {
    if (bookmarks.length === 0) return;
    
    if (!window.confirm(`총 ${bookmarks.length}개의 즐겨찾기 사진을 '📸 비주얼 인물' 테마로 일괄 이동하시겠습니까?\n\n이동 후 즐겨찾기는 모두 해제됩니다.`)) {
      return;
    }

    const targetCategory = "📸 비주얼 인물";

    bookmarks.forEach(id => {
      updateStoredPrompt(id, { category: targetCategory });
    });

    setPrompts(prev => prev.map(p => 
      bookmarks.includes(p.id) ? { ...p, category: targetCategory } : p
    ));

    setBookmarks([]);
    alert('성공적으로 이동되었습니다!');
  };

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = {};
    prompts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    const categoryList = [
      { name: "⚠️ 이미지 없음 (작업용)", icon: "AlertTriangle" },
      { name: "👩‍🦰 인물 사진 & 포트레이트", icon: "User" },
      { name: "📸 비주얼 인물", icon: "Camera" },
      { name: "🎨 애니메이션 & 만화 일러스트", icon: "Tv" },
      { name: "📋 브랜딩 & 디자인 가이드보드", icon: "FileText" },
      { name: "🐱 동물 & 캐릭터 생명체", icon: "Dog" },
      { name: "🛍️ 제품 & 음식 & 상업 화보", icon: "ShoppingBag" },
      { name: "📐 3D 아트 & UI/UX & 디자인", icon: "Box" },
      { name: "🏎️ 차량 & 수송기기", icon: "Car" },
      { name: "🏞️ 자연 & 풍경 & 스트리트", icon: "Trees" },
      { name: "🎬 시네마틱 & 영화 비주얼", icon: "Film" },
      { name: "🏛️ 건축 & 인테리어 공간", icon: "Building2" },
      { name: "✨ 아트 & 스페셜 갤러리", icon: "Sparkles" }
    ];

    return categoryList.map(cat => ({
      ...cat,
      count: counts[cat.name] || 0
    }));
  }, [prompts]);

  // Filter prompts by category and search query
  const filteredPrompts = useMemo(() => {
    return prompts.filter(item => {
      // Category filter
      if (activeCategory === 'Bookmarks') {
        if (!bookmarks.includes(item.id)) return false;
      } else if (activeCategory !== 'All') {
        if (item.category !== activeCategory) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (item.title || '').toLowerCase().includes(q);
        const matchPrompt = (item.prompt || '').toLowerCase().includes(q);
        const matchCategory = (item.category || '').toLowerCase().includes(q);
        const matchTags = (item.tags || []).some(t => t.toLowerCase().includes(q));

        return matchTitle || matchPrompt || matchCategory || matchTags;
      }

      return true;
    });
  }, [prompts, activeCategory, searchQuery, bookmarks]);

  // Render Intro Screen if active
  if (showIntro) {
    return (
      <IntroPage
        totalPrompts={prompts.length}
        onEnterGallery={() => setShowIntro(false)}
      />
    );
  }

  // Clean Gallery Screen
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-main)' }}>
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Navigation Bar */}
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenAddModal={() => setShowAddModal(true)}
          onOpenFirebaseModal={() => setShowFirebaseModal(true)}
          isAdminMode={isAdminMode}
          onOpenAdminModal={() => setShowAdminPinModal(true)}
          onExitAdminMode={() => setIsAdminMode(false)}
          onShowIntro={() => setShowIntro(true)}
        />

        {/* Main Content Layout (Sidebar + Grid) */}
        <main className="main-layout">
          <Sidebar
            categories={[
              ...categoryCounts,
              { name: 'Bookmarks', count: bookmarks.length, icon: 'Star' }
            ]}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            totalCount={prompts.length}
          />

          <div style={{ flex: 1 }}>
            {activeCategory === 'Bookmarks' && bookmarks.length > 0 && (
              <div style={{ padding: '1.5rem 1.5rem 0', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  onClick={handleMoveBookmarksToVisualPerson}
                  style={{ 
                    background: 'var(--primary)', 
                    color: 'white', 
                    padding: '0.75rem 1.5rem', 
                    borderRadius: 'var(--radius-full)',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                >
                  ✨ 즐겨찾기 항목을 '비주얼 인물' 테마로 모두 이동하기
                </button>
              </div>
            )}
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                프롬프트 라이브러리를 불러오는 중...
              </div>
            ) : (
              <PromptGrid
                prompts={filteredPrompts}
                resetKey={`${activeCategory}-${searchQuery}`}
                onSelectPrompt={setSelectedPrompt}
                onCopyPrompt={(text) => {}}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onResetSearch={() => { setSearchQuery(''); setActiveCategory('All'); }}
                isAdminMode={isAdminMode}
                onDeletePrompt={handleDeletePrompt}
              />
            )}
          </div>
        </main>
      </div>

      {/* Admin PIN Auth Modal */}
      {showAdminPinModal && (
        <AdminPinModal
          onClose={() => setShowAdminPinModal(false)}
          onSuccess={() => setIsAdminMode(true)}
        />
      )}

      {/* Detail Modal */}
      {selectedPrompt && (
        <PromptDetailModal
          promptItem={selectedPrompt}
          onClose={() => setSelectedPrompt(null)}
          onCopy={() => {}}
          isBookmarked={bookmarks.includes(selectedPrompt.id)}
          onToggleBookmark={handleToggleBookmark}
          isAdminMode={isAdminMode}
          onOpenAdminModal={() => setShowAdminPinModal(true)}
          onExitAdminMode={() => setIsAdminMode(false)}
          onUpdatePrompt={handleUpdatePrompt}
          onDeletePrompt={handleDeletePrompt}
        />
      )}

      {/* Add Prompt Modal */}
      {showAddModal && (
        <AddPromptModal
          onClose={() => setShowAddModal(false)}
          onAddPrompt={handleAddPrompt}
        />
      )}

      {/* Firebase Config Modal */}
      {showFirebaseModal && (
        <FirebaseConfigModal
          onClose={() => setShowFirebaseModal(false)}
          onConfigSaved={() => loadPrompts()}
        />
      )}
    </div>
  );
}
