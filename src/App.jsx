import React, { useState, useEffect, useMemo } from 'react';
import IntroPage from './components/IntroPage';
import Navbar from './components/Navbar';
import CategoryFilter from './components/CategoryFilter';
import PromptGrid from './components/PromptGrid';
import PromptDetailModal from './components/PromptDetailModal';
import AddPromptModal from './components/AddPromptModal';
import FirebaseConfigModal from './components/FirebaseConfigModal';
import Toast from './components/Toast';

import { getStoredPrompts, addNewPrompt, deleteStoredPrompt } from './services/storage';

export default function App() {
  const [viewState, setViewState] = useState('intro'); // 'intro' or 'main'
  const [prompts, setPrompts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadPrompts();
    try {
      const savedBm = localStorage.getItem('gpt_image2_bookmarks');
      if (savedBm) setBookmarks(JSON.parse(savedBm));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const loadPrompts = async () => {
    const data = await getStoredPrompts();
    setPrompts(data);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleBookmark = (id) => {
    setBookmarks(prev => {
      const next = prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id];
      try {
        localStorage.setItem('gpt_image2_bookmarks', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const handleDeletePrompt = (id) => {
    deleteStoredPrompt(id);
    setPrompts(prev => prev.filter(p => p.id !== id));
    showToast('프롬프트가 삭제되었습니다.');
  };

  const categoriesWithCounts = useMemo(() => {
    const map = new Map();
    prompts.forEach(p => {
      const cat = p.category || 'Uncategorized';
      map.set(cat, (map.get(cat) || 0) + 1);
    });

    const result = [{ name: 'All', label: '전체 (All)', count: prompts.length }];
    if (bookmarks.length > 0) {
      result.push({ name: 'Bookmarks', label: '⭐ 즐겨찾기', count: bookmarks.length });
    }

    Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .forEach(([catName, count]) => {
        result.push({ name: catName, label: catName, count });
      });

    return result;
  }, [prompts, bookmarks]);

  const filteredPrompts = useMemo(() => {
    return prompts.filter(p => {
      if (activeCategory === 'Bookmarks') {
        if (!bookmarks.includes(p.id)) return false;
      } else if (activeCategory !== 'All' && p.category !== activeCategory) {
        return false;
      }

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      const inTitle = p.title ? p.title.toLowerCase().includes(q) : false;
      const inCategory = p.category ? p.category.toLowerCase().includes(q) : false;
      const inPrompt = p.prompt ? p.prompt.toLowerCase().includes(q) : false;
      const inTags = p.tags ? p.tags.some(t => t.toLowerCase().includes(q)) : false;

      return inTitle || inCategory || inPrompt || inTags;
    });
  }, [prompts, searchQuery, activeCategory, bookmarks]);

  const handleAddPrompt = async (newPromptData) => {
    const created = await addNewPrompt(newPromptData);
    setPrompts(prev => [created, ...prev]);
    showToast('새 프롬프트가 갤러리에 추가되었습니다!');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {viewState === 'intro' ? (
        <IntroPage onEnter={() => setViewState('main')} />
      ) : (
        <>
          <Navbar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onOpenFirebaseModal={() => setIsFirebaseModalOpen(true)}
            onGoHome={() => setViewState('intro')}
            totalCount={prompts.length}
            filteredCount={filteredPrompts.length}
          />

          <CategoryFilter 
            categories={categoriesWithCounts}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <div style={{
            maxWidth: '1300px',
            margin: '0.75rem auto 0',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'var(--text-muted)',
            fontSize: '0.88rem'
          }}>
            <div>
              <span>총 </span>
              <strong style={{ color: 'var(--accent-cyan)' }}>{filteredPrompts.length}개</strong>
              <span>의 프롬프트</span>
              {searchQuery && <span> ('{searchQuery}' 검색 결과)</span>}
            </div>
          </div>

          <PromptGrid 
            prompts={filteredPrompts}
            onSelectPrompt={(item) => setSelectedPrompt(item)}
            onCopyPrompt={() => showToast('클립보드에 프롬프트가 복사되었습니다!')}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onDeletePrompt={handleDeletePrompt}
            onResetSearch={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
          />

          <footer style={{
            marginTop: 'auto',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            borderTop: '1px solid var(--glass-border)',
            color: 'var(--text-subtle)',
            fontSize: '0.85rem'
          }}>
            <p>GPT-Image2 Skill Gallery & Prompt Hub • Powered by OpenAI & Vercel</p>
          </footer>
        </>
      )}

      {selectedPrompt && (
        <PromptDetailModal
          promptItem={selectedPrompt}
          onClose={() => setSelectedPrompt(null)}
          onCopy={() => showToast('클립보드에 프롬프트가 복사되었습니다!')}
        />
      )}

      {isAddModalOpen && (
        <AddPromptModal 
          onClose={() => setIsAddModalOpen(false)}
          onAddPrompt={handleAddPrompt}
        />
      )}

      {isFirebaseModalOpen && (
        <FirebaseConfigModal 
          onClose={() => setIsFirebaseModalOpen(false)}
          onSaved={() => {
            loadPrompts();
            showToast('Firebase 설정이 저장되었습니다.');
          }}
        />
      )}

      <Toast message={toastMessage} />
    </div>
  );
}
