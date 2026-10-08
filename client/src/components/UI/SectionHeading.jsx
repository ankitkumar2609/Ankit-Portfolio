import React from 'react';

const SectionHeading = ({ subtitle, title, alignment = 'center' }) => {
  const alignClass = alignment === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`mb-12 ${alignClass}`}>
      {subtitle && (
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-50 dark:bg-indigo-950/60 rounded-full border border-indigo-200 dark:border-indigo-800/50 mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        {title}
      </h2>
      <div className={`mt-3 h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full ${alignment === 'center' ? 'mx-auto' : ''}`} />
    </div>
  );
};

export default SectionHeading;
