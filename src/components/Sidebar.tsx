import React, { useState } from 'react';
import { 
  FileText, Plus, BookOpen, HelpCircle,
  ChevronRight, Film, Tv, Radio, X,
  FolderOpen, Save, Download, Upload, Trash2, Star
} from 'lucide-react';
import { ScriptProject } from '../types/script';
import { scriptTemplates } from '../data/templates';

interface SidebarProps {
  projects: ScriptProject[];
  currentProject: ScriptProject | null;
  onNewProject: () => void;
  onOpenProject: (project: ScriptProject) => void;
  onDeleteProject: (id: string) => void;
  onOpenTemplate: (templateContent: string, templateId: string) => void;
  onSaveProject: () => void;
  onExportPDF: () => void;
  onImportProject: () => void;
  isOpen: boolean;
  onClose: () => void;
  onViewChange: (view: 'editor' | 'templates' | 'references' | 'help') => void;
}

export default function Sidebar({
  projects, currentProject, onNewProject, onOpenProject, onDeleteProject,
  onOpenTemplate, onSaveProject, onExportPDF, onImportProject,
  isOpen, onClose, onViewChange
}: SidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string>('projects');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    'Film': <Film size={14} />,
    'Drama': <Tv size={14} />,
    'Digital': <FileText size={14} />,
    'Radio': <Radio size={14} />,
    'Theatre': <Star size={14} />,
    'Documentary': <BookOpen size={14} />,
  };

  const templateCategories = [...new Set(scriptTemplates.map(t => t.category))];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-zinc-950 border-r border-zinc-800 z-50
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:flex
      `}>
        {/* Logo Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-sm">ح</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-sm font-urdu leading-none">حرفِ آخر</h1>
              <p className="text-zinc-500 text-xs mt-0.5">Harf-e-Akhir</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white lg:hidden p-1">
            <X size={18} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="p-3 border-b border-zinc-800 grid grid-cols-2 gap-2">
          <button
            onClick={onNewProject}
            className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-3 rounded-lg text-xs transition-colors"
          >
            <Plus size={14} />
            نئی اسکرپٹ
          </button>
          <button
            onClick={onSaveProject}
            className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-2 px-3 rounded-lg text-xs transition-colors"
          >
            <Save size={14} />
            محفوظ کریں
          </button>
          <button
            onClick={onExportPDF}
            className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-green-400 font-semibold py-2 px-3 rounded-lg text-xs transition-colors"
          >
            <Download size={14} />
            PDF
          </button>
          <button
            onClick={onImportProject}
            className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-blue-400 font-semibold py-2 px-3 rounded-lg text-xs transition-colors"
          >
            <Upload size={14} />
            کھولیں
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          
          {/* My Projects */}
          <div className="border-b border-zinc-800">
            <button
              onClick={() => toggleSection('projects')}
              className="w-full flex items-center justify-between p-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FolderOpen size={15} />
                <span className="text-xs font-semibold uppercase tracking-wider">میری اسکرپٹس</span>
              </div>
              <ChevronRight size={14} className={`transform transition-transform ${expandedSection === 'projects' ? 'rotate-90' : ''}`} />
            </button>
            {expandedSection === 'projects' && (
              <div className="pb-2">
                {projects.length === 0 ? (
                  <p className="text-zinc-600 text-xs px-4 py-2 font-urdu text-right">کوئی اسکرپٹ نہیں</p>
                ) : (
                  projects.map(project => (
                    <div
                      key={project.id}
                      className={`group flex items-center justify-between px-4 py-2 cursor-pointer rounded mx-2 my-0.5 transition-colors ${
                        currentProject?.id === project.id 
                          ? 'bg-yellow-400/10 border-l-2 border-yellow-400' 
                          : 'hover:bg-zinc-800/50'
                      }`}
                      onClick={() => onOpenProject(project)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-urdu text-right truncate ${
                          currentProject?.id === project.id ? 'text-yellow-400' : 'text-zinc-300'
                        }`}>
                          {project.urduTitle || project.title}
                        </p>
                        <p className="text-zinc-600 text-xs text-right">{project.type}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); onDeleteProject(project.id); }}
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 ml-2 p-1 transition-opacity"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Templates */}
          <div className="border-b border-zinc-800">
            <button
              onClick={() => { toggleSection('templates'); onViewChange('templates'); }}
              className="w-full flex items-center justify-between p-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileText size={15} />
                <span className="text-xs font-semibold uppercase tracking-wider">ٹیمپلیٹس</span>
              </div>
              <ChevronRight size={14} className={`transform transition-transform ${expandedSection === 'templates' ? 'rotate-90' : ''}`} />
            </button>
            {expandedSection === 'templates' && (
              <div className="pb-2">
                {templateCategories.map(category => (
                  <div key={category} className="mb-1">
                    <div className="flex items-center gap-1 px-4 py-1">
                      {categoryIcons[category]}
                      <span className="text-zinc-500 text-xs uppercase tracking-wider">{category}</span>
                    </div>
                    {scriptTemplates.filter(t => t.category === category).map(template => (
                      <button
                        key={template.id}
                        onClick={() => { onOpenTemplate(template.content, template.id); onClose(); }}
                        className="w-full text-right px-5 py-2 hover:bg-zinc-800/50 transition-colors"
                      >
                        <span className="text-xs mr-1">{template.icon}</span>
                        <span className="text-zinc-300 text-xs font-urdu">{template.urduTitle}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* References */}
          <div className="border-b border-zinc-800">
            <button
              onClick={() => { toggleSection('references'); onViewChange('references'); }}
              className="w-full flex items-center justify-between p-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen size={15} />
                <span className="text-xs font-semibold uppercase tracking-wider">مثالیں</span>
              </div>
              <ChevronRight size={14} className={`transform transition-transform ${expandedSection === 'references' ? 'rotate-90' : ''}`} />
            </button>
          </div>

          {/* Help */}
          <div>
            <button
              onClick={() => { onViewChange('help'); onClose(); }}
              className="w-full flex items-center justify-between p-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <HelpCircle size={15} />
                <span className="text-xs font-semibold uppercase tracking-wider">مدد</span>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-zinc-800 bg-zinc-900/30">
          <p className="text-zinc-600 text-xs text-center font-urdu">حرفِ آخر - اردو اسکرپٹ رائٹر</p>
          <p className="text-zinc-700 text-xs text-center">v1.0.0</p>
        </div>
      </div>
    </>
  );
}
