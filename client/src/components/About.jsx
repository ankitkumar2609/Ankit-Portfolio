import React from 'react';
import { CANDIDATE_INFO } from '../data/config';
import SectionHeading from './UI/SectionHeading';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiPhone, FiBookOpen, FiAward } from 'react-icons/fi';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-100/60 dark:bg-gray-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Get To Know Me" title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* Summary & Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="glass p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Passionate Software Developer & MERN Specialist
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {CANDIDATE_INFO.summary}
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">Location</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{CANDIDATE_INFO.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">Email</span>
                    <a href={`mailto:${CANDIDATE_INFO.email}`} className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline truncate block">
                      {CANDIDATE_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">Phone</span>
                    <a href={`tel:${CANDIDATE_INFO.phone}`} className="font-semibold text-gray-900 dark:text-white hover:underline">
                      {CANDIDATE_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    <FiAward className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">Current Status</span>
                    <span className="font-semibold text-gray-900 dark:text-white">B.Tech CSE (AKTU, 2027)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education Timeline Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md">
                <FiBookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Education Background
              </h3>
            </div>

            <div className="relative pl-6 border-l-2 border-indigo-500/30 dark:border-indigo-500/20 space-y-8">
              {CANDIDATE_INFO.education.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white dark:border-darkBg group-hover:scale-125 transition-transform" />

                  <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-shadow space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
                        {edu.period}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {edu.grade}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-gray-900 dark:text-white pt-1">
                      {edu.degree}
                    </h4>
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
                      {edu.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
