import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, FileText, BarChart2, Download } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ScriptEditor from './components/ScriptEditor';
import TemplatesView from './components/TemplatesView';
import ReferencesView from './components/ReferencesView';
import HelpView from './components/HelpView';
import NewProjectModal from './components/NewProjectModal';
import StatsPanel from './components/StatsPanel';
import { ScriptProject } from './types/script';
import { exportToPDF, loadProjectFromJSON, saveProjectAsJSON } from './utils/pdfExport';

const STORAGE_KEY = 'harf-e-akhir-projects';
const CURRENT_PROJECT_KEY = 'harf-e-akhir-current';

function generateId() {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

type ViewType = 'editor' | 'templates' | 'references' | 'help';

export default function App() {
  const [projects, setProjects] = useState<ScriptProject[]>([]);
  const [currentProject, setCurrentProject] = useState<ScriptProject | null>(null);
  const [activeView, setActiveView] = useState<ViewType>('editor');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: ScriptProject[] = JSON.parse(stored);
        setProjects(parsed);
        
        const currentId = localStorage.getItem(CURRENT_PROJECT_KEY);
        if (currentId) {
          const found = parsed.find(p => p.id === currentId);
          if (found) {
            setCurrentProject(found);
            setActiveView('editor');
          }
        }
      }
    } catch (e) {
      console.error('Failed to load projects:', e);
    }
  }, []);

  // Auto-save to localStorage when projects change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }
  }, [projects]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentProject]);

  const handleSave = useCallback(() => {
    if (!currentProject) return;
    setIsSaving(true);
    
    // Save to state/localStorage
    setProjects(prev => {
      const exists = prev.find(p => p.id === currentProject.id);
      if (exists) {
        return prev.map(p => p.id === currentProject.id ? currentProject : p);
      }
      return [...prev, currentProject];
    });
    localStorage.setItem(CURRENT_PROJECT_KEY, currentProject.id);
    
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('محفوظ ہو گیا ✓');
      setTimeout(() => setSaveMessage(''), 2000);
    }, 500);
  }, [currentProject]);

  const handleNewProject = () => {
    setShowNewProjectModal(true);
  };

  const handleCreateProject = (projectData: Omit<ScriptProject, 'id' | 'createdAt' | 'updatedAt' | 'elements' | 'wordCount' | 'pageCount'>) => {
    const newProject: ScriptProject = {
      ...projectData,
      id: generateId(),
      elements: [],
      wordCount: 0,
      pageCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects(prev => [...prev, newProject]);
    setCurrentProject(newProject);
    setShowNewProjectModal(false);
    setActiveView('editor');
    localStorage.setItem(CURRENT_PROJECT_KEY, newProject.id);
  };

  const handleOpenProject = (project: ScriptProject) => {
    setCurrentProject(project);
    setActiveView('editor');
    localStorage.setItem(CURRENT_PROJECT_KEY, project.id);
    setSidebarOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    if (!confirm('کیا آپ یہ اسکرپٹ حذف کرنا چاہتے ہیں؟')) return;
    setProjects(prev => prev.filter(p => p.id !== id));
    if (currentProject?.id === id) {
      setCurrentProject(null);
    }
  };

  const handleUpdateProject = useCallback((updated: ScriptProject) => {
    setCurrentProject(updated);
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  }, []);

  const handleOpenTemplate = (content: string, templateId: string) => {
    // Create new project with template content parsed as elements
    const lines = content.split('\n').filter(l => l.trim());
    const elements = lines.map(line => ({
      id: generateId(),
      type: 'action' as const,
      content: line,
      urduContent: line,
    }));

    const newProject: ScriptProject = {
      id: generateId(),
      title: `Template - ${templateId}`,
      urduTitle: `ٹیمپلیٹ`,
      author: 'مصنف',
      type: templateId,
      genre: 'ڈرامہ',
      language: 'urdu',
      elements,
      scriptText: content,
      wordCount: content.split(/\s+/).length,
      pageCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProjects(prev => [...prev, newProject]);
    setCurrentProject(newProject);
    setActiveView('editor');
    localStorage.setItem(CURRENT_PROJECT_KEY, newProject.id);
  };

  const handleUseExcerpt = (excerpt: string) => {
    if (!currentProject) {
      // Create new project with excerpt
      const newProject: ScriptProject = {
        id: generateId(),
        title: 'Reference Script',
        urduTitle: 'حوالہ اسکرپٹ',
        author: 'مصنف',
        type: 'feature-film',
        genre: 'ڈرامہ',
        language: 'urdu',
        elements: [{
          id: generateId(),
          type: 'action',
          content: excerpt,
          urduContent: excerpt,
        }],
        scriptText: excerpt,
        wordCount: excerpt.split(/\s+/).length,
        pageCount: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProjects(prev => [...prev, newProject]);
      setCurrentProject(newProject);
    } else {
      handleUpdateProject({
        ...currentProject,
        elements: [...currentProject.elements, {
          id: generateId(),
          type: 'action',
          content: excerpt,
          urduContent: excerpt,
        }],
      });
    }
    setActiveView('editor');
  };

  const handleExportPDF = async () => {
    if (!currentProject) {
      alert('پہلے کوئی اسکرپٹ کھولیں');
      return;
    }
    setIsExporting(true);
    try {
      await exportToPDF(currentProject);
    } catch (e) {
      console.error('PDF export failed:', e);
      alert('PDF بنانے میں مسئلہ ہوا');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadJSON = () => {
    if (!currentProject) {
      alert('پہلے کوئی اسکرپٹ کھولیں');
      return;
    }
    saveProjectAsJSON(currentProject);
  };

  const handleImportProject = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const project = await loadProjectFromJSON(file);
      // Give it a new ID to avoid conflicts
      const imported = { ...project, id: generateId(), updatedAt: new Date().toISOString() };
      setProjects(prev => [...prev, imported]);
      setCurrentProject(imported);
      setActiveView('editor');
      localStorage.setItem(CURRENT_PROJECT_KEY, imported.id);
    } catch (e) {
      alert('فائل پڑھنے میں مسئلہ ہوا');
    }
    
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getViewTitle = (): { en: string; ur: string } => {
    switch (activeView) {
      case 'editor': return { en: currentProject?.title || 'Script Editor', ur: currentProject?.urduTitle || 'اسکرپٹ ایڈیٹر' };
      case 'templates': return { en: 'Templates', ur: 'ٹیمپلیٹس' };
      case 'references': return { en: 'References', ur: 'مثالیں' };
      case 'help': return { en: 'Help', ur: 'مدد' };
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden" dir="ltr">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileImport}
      />

      {/* Sidebar */}
      <Sidebar
        projects={projects}
        currentProject={currentProject}
        onNewProject={handleNewProject}
        onOpenProject={handleOpenProject}
        onDeleteProject={handleDeleteProject}
        onOpenTemplate={handleOpenTemplate}
        onSaveProject={handleSave}
        onExportPDF={handleExportPDF}
        onImportProject={handleImportProject}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onViewChange={setActiveView}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-2 sm:px-4 py-2 shrink-0 gap-2">
          {/* Left - Menu & Logo */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800 transition-colors flex-shrink-0"
            >
              <Menu size={20} />
            </button>

            {/* Logo in header */}
            <img
              src="/logo.png"
              alt="Logo"
              className="w-7 h-7 hidden sm:block flex-shrink-0 rounded"
            />

            {/* View Tabs */}
            <div className="hidden sm:flex items-center gap-1 bg-zinc-800 rounded-lg p-1">
              {(['editor', 'templates', 'references', 'help'] as ViewType[]).map(view => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-2 sm:px-3 py-1.5 rounded text-xs font-medium transition-colors font-urdu ${
                    activeView === view
                      ? 'bg-zinc-700 text-white'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {view === 'editor' ? 'ایڈیٹر' :
                   view === 'templates' ? 'ٹیمپلیٹس' :
                   view === 'references' ? 'مثالیں' : 'مدد'}
                </button>
              ))}
            </div>
          </div>

          {/* Center - Title */}
          <div className="flex items-center gap-2 min-w-0 flex-1 justify-center">
            <div className="text-center min-w-0">
              <h2 className="text-white font-bold text-xs sm:text-sm font-urdu truncate max-w-40 sm:max-w-64">
                {getViewTitle().ur}
              </h2>
              {activeView === 'editor' && currentProject && (
                <p className="text-zinc-600 text-xs truncate hidden sm:block">{currentProject.type}</p>
              )}
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {saveMessage && (
              <span className="text-green-400 text-xs font-urdu hidden sm:block">{saveMessage}</span>
            )}
            {isSaving && (
              <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            )}
            {isExporting && (
              <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
            )}
            
            {/* Mobile view tabs */}
            <div className="flex sm:hidden items-center gap-1">
              <button
                onClick={() => setActiveView('editor')}
                className={`p-2 rounded ${activeView === 'editor' ? 'text-yellow-400' : 'text-zinc-500'}`}
              >
                <FileText size={16} />
              </button>
            </div>

            {activeView === 'editor' && currentProject && (
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={handleDownloadJSON}
                  title="Download as JSON"
                  className="flex items-center gap-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold px-2 sm:px-3 py-1.5 rounded-lg text-xs transition-colors"
                >
                  <Download size={13} />
                  <span className="hidden sm:inline">JSON</span>
                </button>
                <button
                  onClick={handleSave}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-2 sm:px-3 py-1.5 rounded-lg text-xs transition-colors font-urdu"
                >
                  محفوظ
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Mobile Nav */}
        <div className="sm:hidden flex border-b border-zinc-800 bg-zinc-900">
          {(['editor', 'templates', 'references', 'help'] as ViewType[]).map(view => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`flex-1 py-2 text-xs font-urdu transition-colors ${
                activeView === view
                  ? 'text-yellow-400 border-b-2 border-yellow-400'
                  : 'text-zinc-600'
              }`}
            >
              {view === 'editor' ? 'ایڈیٹر' :
               view === 'templates' ? 'ٹیمپلیٹس' :
               view === 'references' ? 'مثالیں' : 'مدد'}
            </button>
          ))}
        </div>

        {/* Main View */}
        <main className="flex-1 overflow-hidden">
          {activeView === 'editor' ? (
            currentProject ? (
              <ScriptEditor
                project={currentProject}
                onUpdate={handleUpdateProject}
              />
            ) : (
              <WelcomeScreen
                onNewProject={handleNewProject}
                onViewTemplates={() => setActiveView('templates')}
                projectCount={projects.length}
                onOpenRecent={() => {
                  if (projects.length > 0) {
                    setCurrentProject(projects[projects.length - 1]);
                  }
                }}
              />
            )
          ) : activeView === 'templates' ? (
            <TemplatesView onUseTemplate={handleOpenTemplate} />
          ) : activeView === 'references' ? (
            <ReferencesView onUseExcerpt={handleUseExcerpt} />
          ) : (
            <HelpView />
          )}
        </main>
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <NewProjectModal
          onClose={() => setShowNewProjectModal(false)}
          onCreate={handleCreateProject}
        />
      )}
    </div>
  );
}

// Welcome Screen Component
function WelcomeScreen({
  onNewProject,
  onViewTemplates,
  projectCount,
  onOpenRecent,
}: {
  onNewProject: () => void;
  onViewTemplates: () => void;
  projectCount: number;
  onOpenRecent: () => void;
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center overflow-y-auto">
      {/* Logo */}
      <div className="mb-6 sm:mb-8">
        <img
          src="/logo.png"
          alt="Harf-e-Akhir"
          className="w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4 drop-shadow-lg"
        />
        <h1 className="text-white text-2xl sm:text-4xl font-bold font-urdu mb-2">حرفِ آخر</h1>
        <p className="text-zinc-500 text-base sm:text-lg">Harf-e-Akhir</p>
        <p className="text-zinc-600 text-xs sm:text-sm font-urdu mt-1">اردو اسکرپٹ رائٹنگ پلیٹ فارم</p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div className="text-center">
          <p className="text-yellow-400 text-xl sm:text-2xl font-bold">{projectCount}</p>
          <p className="text-zinc-600 text-xs font-urdu">اسکرپٹس</p>
        </div>
        <div className="w-px h-6 sm:h-8 bg-zinc-800" />
        <div className="text-center">
          <p className="text-yellow-400 text-xl sm:text-2xl font-bold">8</p>
          <p className="text-zinc-600 text-xs font-urdu">ٹیمپلیٹس</p>
        </div>
        <div className="w-px h-6 sm:h-8 bg-zinc-800" />
        <div className="text-center">
          <p className="text-yellow-400 text-xl sm:text-2xl font-bold">6</p>
          <p className="text-zinc-600 text-xs font-urdu">مثالیں</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-sm">
        <button
          onClick={onNewProject}
          className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-urdu transition-all hover:scale-[1.02] shadow-lg shadow-yellow-400/20"
        >
          ✍️ نئی اسکرپٹ
        </button>
        <button
          onClick={onViewTemplates}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-urdu transition-all hover:scale-[1.02]"
        >
          📋 ٹیمپلیٹ
        </button>
      </div>

      {projectCount > 0 && (
        <button
          onClick={onOpenRecent}
          className="mt-4 text-zinc-500 hover:text-yellow-400 text-xs sm:text-sm font-urdu transition-colors"
        >
          آخری اسکرپٹ کھولیں ←
        </button>
      )}

      {/* Features */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mt-8 sm:mt-10 max-w-lg w-full">
        {[
          { icon: '🔤', title: 'رومن سے اردو', desc: 'خودکار تبدیلی' },
          { icon: '📄', title: 'PDF برآمد', desc: 'پیشہ ورانہ فارمیٹ' },
          { icon: '💾', title: 'محفوظ کریں', desc: 'JSON فائل' },
          { icon: '📺', title: '8 ٹیمپلیٹس', desc: 'مختلف اقسام' },
          { icon: '🎬', title: 'مثالیں', desc: 'مشہور اسکرپٹس' },
          { icon: '✏️', title: 'مکمل ترمیم', desc: 'تمام عناصر' },
        ].map((feature, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
            <span className="text-xl sm:text-2xl mb-1 block">{feature.icon}</span>
            <p className="text-white text-xs font-bold font-urdu">{feature.title}</p>
            <p className="text-zinc-600 text-xs font-urdu">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
