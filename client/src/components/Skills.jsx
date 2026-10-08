import React from 'react';
import { CANDIDATE_INFO } from '../data/config';
import SectionHeading from './UI/SectionHeading';
import { motion } from 'framer-motion';
import {
  FaReact,
  FaHtml5,
  FaBootstrap,
  FaNodeJs,
  FaJava,
  FaPython,
  FaDatabase,
  FaDocker,
  FaAws,
  FaLinux,
  FaGitAlt,
  FaBrain,
  FaCogs,
  FaDesktop,
  FaNetworkWired,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiGithubactions,
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import { TbApi } from 'react-icons/tb';


const iconMap = {
  FaReact,
  SiJavascript,
  SiTailwindcss,
  FaHtml5,
  FaBootstrap,
  FaNodeJs,
  SiExpress,
  TbApi,
  SiMongodb,
  SiMysql,
  FaJava,
  FaPython,
  FaDatabase,
  FaDocker,
  FaAws,
  SiGithubactions,
  FaLinux,
  FaGitAlt,
  SiVisualstudiocode: VscCode,
  FaBrain,
  FaCogs,
  FaDesktop,
  FaNetworkWired,
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Technical Expertise" title="Skills & Competencies" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {CANDIDATE_INFO.skillsCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white pb-3 border-b border-gray-200 dark:border-gray-800 mb-6 flex items-center justify-between">
                  <span>{category.title}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    {category.skills.length} Techs
                  </span>
                </h3>

                <div className="space-y-4">
                  {category.skills.map((skill) => {
                    const IconComponent = iconMap[skill.icon] || FaCode;
                    return (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2.5">
                            <IconComponent className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Animated Proficiency Bar */}
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
