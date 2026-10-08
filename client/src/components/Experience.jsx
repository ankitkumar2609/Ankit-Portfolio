import React from 'react';
import { CANDIDATE_INFO } from '../data/config';
import SectionHeading from './UI/SectionHeading';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiCheckCircle } from 'react-icons/fi';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gray-100/60 dark:bg-gray-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Industry Exposure" title="Work Experience" />

        <div className="max-w-4xl mx-auto mt-12 relative">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-indigo-500/30 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {CANDIDATE_INFO.experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Badge Dot */}
                  <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 w-9 h-9 rounded-full bg-indigo-600 border-4 border-white dark:border-darkBg shadow-lg flex items-center justify-center text-white z-10">
                    <FiBriefcase className="w-4 h-4" />
                  </div>

                  {/* Experience Card */}
                  <div className="w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0">
                    <div className="glass p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 space-y-4">
                      
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                          <FiCalendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-300">
                          {exp.type}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                          {exp.organization}
                        </p>
                      </div>

                      <ul className="space-y-2 pt-2">
                        {exp.points.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start space-x-2.5 text-sm text-gray-600 dark:text-gray-300">
                            <FiCheckCircle className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs font-medium px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
