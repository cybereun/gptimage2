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

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = {};
    prompts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    const categoryList = [
      { name: "⚠️ 이미지 없음 (작업용)", icon: "AlertTriangle" },
      { name: "인물 사진 / 셀카", icon: "User" },
      { name: "인플루언서 / 모델", icon: "Sparkles" },
      { name: "캐릭터 / 커플 / 그룹", icon: "Users" },
      { name: "애니메이션 & 만화", icon: "Tv" },
      { name: "영화 & 시네마틱", icon: "Film" },
      { name: "게이밍 & 판타지", icon: "Gamepad2" },
      { name: "패션 & 라이프스타일", icon: "Shirt" },
      { name: "제품 / 음식 / 아이템", icon: "ShoppingBag" },
      { name: "동물 / 생명체", icon: "Dog" },
      { name: "차량 / 수송기기", icon: "Car" },
      { name: "건축 / 인테리어", icon: "Building2" },
      { name: "풍경 / 자연", icon: "Trees" },
      { name: "도시 풍경 / 스트리트", icon: "MapPin" },
      { name: "3D & UI / UX", icon: "Box" },
      { name: "텍스트 / 포스터", icon: "Type" },
      { name: "유화 / 수채화 / 미술", icon: "Palette" },
      { name: "다이어그램 / 차트", icon: "BarChart3" },
      { name: "기타 갤러리", icon: "Grid" }
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

  // Render Intro Screen if active (Includes Lightfall starlight animation)
  if (showIntro) {
    return (
      <IntroPage
        totalPrompts={prompts.length}
        onEnterGallery={() => setShowIntro(false)}
      />
    );
  }

  // Clean Gallery Screen without background Lightfall starlight canvas
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
        <main style={{
          maxWidth: '1300px',
          margin: '2rem auto 0',
          padding: '0 1.5rem',
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'flex-start'
        }}>
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
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                프롬프트 라이브러리를 불러오는 중...
              </div>
            ) : (
              <PromptGrid
                prompts={filteredPrompts}
                onSelectPrompt={setSelectedPrompt}
                onCopyPrompt={(text) => {}}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onResetSearch={() => { setSearchQuery(''); setActiveCategory('All'); }}
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
