import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  fetchProjects,
  createProjectApi,
  updateProjectApi,
  deleteProjectApi,
  fetchContactMessages,
  deleteContactMessage,
} from '../services/api';
import toast from 'react-hot-toast';
import {
  FiFolder,
  FiMail,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiLogOut,
  FiArrowLeft,
  FiX,
  FiExternalLink,
  FiCheck,
} from 'react-icons/fi';

const AdminDashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');

  // Projects state
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    category: 'Full Stack',
  });

  // Contact messages state
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  // Load Projects
  const loadProjectsData = async () => {
    setLoadingProjects(true);
    try {
      const res = await fetchProjects();
      if (res.success && res.data) {
        setProjects(res.data);
      }
    } catch (err) {
      toast.error('Failed to load projects');
    } finally {
      setLoadingProjects(false);
    }
  };

  // Load Messages
  const loadMessagesData = async () => {
    setLoadingMessages(true);
    try {
      const res = await fetchContactMessages(token);
      if (res.success && res.data) {
        setMessages(res.data);
      }
    } catch (err) {
      console.warn('[Admin] Messages endpoint warning:', err.message);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    loadProjectsData();
    loadMessagesData();
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const handleOpenProjectModal = (proj = null) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        title: proj.title || '',
        description: proj.description || '',
        technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies || '',
        githubUrl: proj.githubUrl || '',
        liveUrl: proj.liveUrl || '',
        imageUrl: proj.imageUrl || '',
        category: proj.category || 'Full Stack',
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        description: '',
        technologies: '',
        githubUrl: '',
        liveUrl: '',
        imageUrl: '',
        category: 'Full Stack',
      });
    }
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map((t) => t.trim()),
      };

      if (editingProject) {
        const res = await updateProjectApi(editingProject._id, payload, token);
        if (res.success) {
          toast.success('Project updated successfully!');
          loadProjectsData();
          setProjectModalOpen(false);
        }
      } else {
        const res = await createProjectApi(payload, token);
        if (res.success) {
          toast.success('Project created successfully!');
          loadProjectsData();
          setProjectModalOpen(false);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await deleteProjectApi(id, token);
      if (res.success) {
        toast.success('Project deleted!');
        loadProjectsData();
      }
    } catch (err) {
      toast.error('Failed to delete project');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) return;
    try {
      const res = await deleteContactMessage(id, token);
      if (res.success) {
        toast.success('Message deleted');
        loadMessagesData();
      }
    } catch (err) {
      toast.error('Failed to delete message');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-darkBg text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="glass border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 px-4 py-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              to="/"
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              title="Return to Public Site"
            >
              <FiArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Admin Control Dashboard
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Logged in as <span className="font-semibold text-indigo-600 dark:text-indigo-400">{user?.email || 'Admin'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 text-xs font-semibold hover:bg-red-600 hover:text-white transition-colors"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-800 pb-4">
          <button
            onClick={() => setActiveTab('projects')}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'projects'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'glass text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            <FiFolder className="w-4 h-4" />
            <span>Manage Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'messages'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'glass text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            <FiMail className="w-4 h-4" />
            <span>Contact Messages ({messages.length})</span>
          </button>
        </div>

        {/* Tab 1: Projects Management */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
                Projects List
              </h2>
              <button
                onClick={() => handleOpenProjectModal()}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md hover:bg-indigo-700 transition-colors"
              >
                <FiPlus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            {loadingProjects ? (
              <div className="py-12 text-center text-sm text-gray-500">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="glass p-8 rounded-2xl text-center text-sm text-gray-500">
                No projects found in database.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj._id || proj.title}
                    className="glass p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                          {proj.category || 'Full Stack'}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleOpenProjectModal(proj)}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors"
                            title="Edit"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj._id)}
                            className="p-2 rounded-lg bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                        {proj.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-2">
                      {proj.technologies?.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Contact Messages */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
              Submitted Contact Form Messages
            </h2>

            {loadingMessages ? (
              <div className="py-12 text-center text-sm text-gray-500">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="glass p-8 rounded-2xl text-center text-sm text-gray-500">
                No contact form submissions recorded yet.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className="glass p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
                      <div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {msg.name}
                        </span>
                        <span className="text-xs text-indigo-600 dark:text-indigo-400 ml-2 font-medium">
                          &lt;{msg.email}&gt;
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-gray-400">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleDeleteMessage(msg._id)}
                          className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                          title="Delete Message"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Subject: <span className="font-normal">{msg.subject || 'N/A'}</span>
                    </div>

                    <p className="text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/60 p-4 rounded-xl border border-gray-200 dark:border-gray-800 leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Add / Edit Project Modal */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl glass p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                onClick={() => setProjectModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Description *</label>
                <textarea
                  rows="4"
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Technologies (comma separated) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="React.js, Node.js, Express.js, MongoDB"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={projectForm.imageUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold shadow-md hover:bg-indigo-700"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
