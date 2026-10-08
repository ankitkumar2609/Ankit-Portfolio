import React, { useState, useEffect } from 'react';
import { CANDIDATE_INFO } from '../data/config';
import SectionHeading from './UI/SectionHeading';
import { motion } from 'framer-motion';
import { FiExternalLink, FiAward, FiCheckCircle } from 'react-icons/fi';
import {
  SiLeetcode,
  SiHackerrank,
  SiGeeksforgeeks,
  SiCodechef,
} from 'react-icons/si';

const iconMap = {
  SiLeetcode,
  SiHackerrank,
  SiGeeksforgeeks,
  SiCodechef,
};

const AnimatedCounter = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}+</span>;
};

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 bg-gray-100/60 dark:bg-gray-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Problem Solving" title="Coding Profiles & Achievements" />

        {/* Counter Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {CANDIDATE_INFO.achievements.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || FiAward;
            return (
              <motion.a
                key={item.platform}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative glass p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-300 flex flex-col items-center text-center space-y-4"
              >
                <div className={`p-4 rounded-2xl bg-gradient-to-tr ${item.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8" />
                </div>

                <div>
                  <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                    <AnimatedCounter target={item.count} />
                  </div>
                  <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                    {item.platform}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {item.label}
                  </p>
                </div>

                <div className="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline pt-2">
                  <span>View Public Profile</span>
                  <FiExternalLink className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* DSA & Core Fundamentals Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 glass p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center md:justify-start space-x-2">
              <FiAward className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Core CS & Data Structures Mastery</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl">
              Consistently practicing Algorithmic Problem Solving, Object-Oriented Programming (OOP), Database Management Systems (DBMS), and Computer Networks.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Arrays & Strings', 'LinkedLists & Trees', 'Dynamic Programming', 'SQL Queries', 'MERN Architecture'].map((tag) => (
              <span key={tag} className="inline-flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
