import React, { useState, useEffect } from 'react';
import SectionHeading from './UI/SectionHeading';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { fetchProjects } from '../services/api';
import { fallbackProjects } from '../data/fallbackProjects';
import { FiSearch, FiLayers, FiAlertCircle } from 'react-icons/fi';

const categories = ['All', 'Full Stack', 'AI & ML', 'Frontend', 'Backend'];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isFallbackUsed, setIsFallbackUsed] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const res = await fetchProjects();
        if (res.success && res.data && res.data.length > 0) {
          setProjects(res.data);
          setIsFallbackUsed(!!res.isFallback);
        } else {
          setProjects(fallbackProjects);
          setIsFallbackUsed(true);
        }
      } catch (err) {
        console.warn('[Projects Component] API fetch failed, loading local fallback');
        setProjects(fallbackProjects);
        setIsFallbackUsed(true);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filter projects by category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (project.category && project.category.toLowerCase() === selectedCategory.toLowerCase());

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.technologies?.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Featured Work" title="Portfolio Projects" />

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 mb-10">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'glass text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search title, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs font-medium glass border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Fallback Warning Notice if API offline */}
        {isFallbackUsed && !loading && (
          <div className="mb-6 px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs flex items-center space-x-2">
            <FiAlertCircle className="w-4 h-4 shrink-0" />
            <span>Displayed projects are synced from local backup data (Backend API is running or reconnecting).</span>
          </div>
        )}

        {/* Project Grid / Skeleton / Empty state */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="glass rounded-2xl p-6 h-96 animate-pulse space-y-4 border border-gray-200 dark:border-gray-800"
              >
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-xl" />
                <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-800 rounded-md" />
                <div className="w-full h-12 bg-gray-200 dark:bg-gray-800 rounded-md" />
                <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-800 rounded-md" />
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 glass rounded-2xl border border-gray-200 dark:border-gray-800">
            <FiLayers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              No matching projects found
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Try adjusting your search filter or category selection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id || project.title}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
