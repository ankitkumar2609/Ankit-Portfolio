import React from 'react';
import { CANDIDATE_INFO } from '../data/config';
import { FiArrowUp } from 'react-icons/fi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiLeetcode, SiHackerrank, SiGeeksforgeeks, SiCodechef } from 'react-icons/si';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { name: 'GitHub', url: CANDIDATE_INFO.socialLinks.github, icon: FaGithub },
    { name: 'LinkedIn', url: CANDIDATE_INFO.socialLinks.linkedin, icon: FaLinkedin },
    { name: 'LeetCode', url: CANDIDATE_INFO.socialLinks.leetcode, icon: SiLeetcode },
    { name: 'CodeChef', url: CANDIDATE_INFO.socialLinks.codechef, icon: SiCodechef },
    { name: 'HackerRank', url: CANDIDATE_INFO.socialLinks.hackerrank, icon: SiHackerrank },
    { name: 'GeeksforGeeks', url: CANDIDATE_INFO.socialLinks.geeksforgeeks, icon: SiGeeksforgeeks },
  ];

  return (
    <footer className="bg-white dark:bg-darkCard border-t border-gray-200 dark:border-gray-800 py-12 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              AK
            </span>
            <span className="text-lg font-extrabold text-gray-900 dark:text-white">
              Ankit Kumar
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Ankit Kumar. Built with MongoDB, Express.js, React.js, Node.js & Tailwind CSS.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-3">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>

        {/* Back-to-Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="p-3 rounded-xl bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-all duration-200 hover:-translate-y-1 flex items-center space-x-1.5 text-xs font-bold"
        >
          <span>Top</span>
          <FiArrowUp className="w-4 h-4" />
        </button>

      </div>
    </footer>
  );
};

export default Footer;
