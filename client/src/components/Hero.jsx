import React, { useState, useEffect } from 'react';
import { CANDIDATE_INFO } from '../data/config';
import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiArrowDown } from 'react-icons/fi';
import {
  FaLinkedin,
  FaGithub,
  FaCode,
} from 'react-icons/fa';
import {
  SiLeetcode,
  SiHackerrank,
  SiGeeksforgeeks,
  SiCodechef,
} from 'react-icons/si';

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = CANDIDATE_INFO.typingRoles;

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex, roles]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinksMap = [
    { name: 'GitHub', url: CANDIDATE_INFO.socialLinks.github, icon: FaGithub, color: 'hover:text-gray-900 dark:hover:text-white' },
    { name: 'LinkedIn', url: CANDIDATE_INFO.socialLinks.linkedin, icon: FaLinkedin, color: 'hover:text-blue-600' },
    { name: 'LeetCode', url: CANDIDATE_INFO.socialLinks.leetcode, icon: SiLeetcode, color: 'hover:text-amber-500' },
    { name: 'CodeChef', url: CANDIDATE_INFO.socialLinks.codechef, icon: SiCodechef, color: 'hover:text-amber-700' },
    { name: 'HackerRank', url: CANDIDATE_INFO.socialLinks.hackerrank, icon: SiHackerrank, color: 'hover:text-emerald-500' },
    { name: 'GeeksforGeeks', url: CANDIDATE_INFO.socialLinks.geeksforgeeks, icon: SiGeeksforgeeks, color: 'hover:text-green-600' },
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Decorative Glow Spheres */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-glow pointer-events-none" style={{ animationDelay: '3s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Text Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Open for Software Developer Roles</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              Hi, I'm <span className="gradient-text">{CANDIDATE_INFO.name}</span>
            </h1>

            {/* Animated Typing Subtitle */}
            <div className="h-12 flex items-center justify-center lg:justify-start">
              <span className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-gray-300">
                I am a{' '}
                <span className="text-indigo-600 dark:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-400 pr-1 animate-pulse">
                  {displayedText}
                </span>
              </span>
            </div>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {CANDIDATE_INFO.summary}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="/Ankit_Resume.pdf"
                download="Ankit_Resume.pdf"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                <FiDownload className="w-5 h-5" />
                <span>Download Resume</span>
              </a>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl glass text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-200 border border-gray-300 dark:border-gray-700 shadow-md"
              >
                <FiMail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Hire Me</span>
              </button>
            </div>

            {/* Social Links Row */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800/80">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-3">
                Connect with me on
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                {socialLinksMap.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      className={`p-3 rounded-xl bg-white dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200 hover:scale-110 ${social.color}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Visual Avatar & Card Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* Outer Gradient Ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-2xl animate-glow">
                <div className="w-full h-full bg-white dark:bg-darkCard rounded-[22px] flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="w-24 h-24 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-3xl font-black shadow-lg">
                    AK
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                      Ankit Kumar
                    </h3>
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                      B.Tech CSE Student (2027)
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      AKTU, Lucknow
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                    <FaCode className="w-4 h-4" />
                    <span>MERN Stack Specialist</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -bottom-4 -left-4 glass px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                  DSA
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white">250+ Solved</div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400">LeetCode / GFG / HR</div>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -top-4 -right-4 glass px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  AI
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white">AI Web Apps</div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400">AICTE & IBM Intern</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 text-center">
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Scroll to About Section"
            className="inline-flex items-center justify-center p-3 rounded-full glass text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors animate-bounce shadow-md"
          >
            <FiArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
