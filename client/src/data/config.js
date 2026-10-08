// Single Configuration File for Ankit Kumar's Portfolio
export const CANDIDATE_INFO = {
  name: 'Ankit Kumar',
  title: 'MERN Stack Developer | B.Tech CSE (AKTU, 2027)',
  location: 'Lucknow, UP, India',
  email: 'ankitkumar952390@gmail.com',
  phone: '+91-7250562238',
  resumeUrl: '/Ankit_Resume.pdf',
  typingRoles: [
    'MERN Stack Developer',
    'Full-Stack Web Developer',
    'Problem Solver & DSA Enthusiast',
    'AI & Tech Explorer',
  ],
  summary: `MERN stack developer with hands-on experience building responsive, scalable, user-focused web apps using MongoDB, Express.js, React.js and Node.js. Proficient in JavaScript, RESTful APIs, database management and modern frontend development with Tailwind CSS. Solid understanding of DSA, OOP and software fundamentals. Passionate about solving real-world problems and learning emerging technologies.`,
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/ankit-kumar-90180b2b9/',
    github: 'https://github.com/ankitkumar2609',
    leetcode: 'https://leetcode.com/u/Ankit_Yadav_7250/',
    codechef: 'https://www.codechef.com/users/ankit_kumar_26',
    hackerrank: 'https://www.hackerrank.com/profile/ankitkumar952390',
    geeksforgeeks: 'https://www.geeksforgeeks.org/profile/ankitkuma3x0x',
  },
  achievements: [
    { platform: 'LeetCode', count: 100, label: '100+ Problems Solved', link: 'https://leetcode.com/u/Ankit_Yadav_7250/', icon: 'SiLeetcode', color: 'from-amber-500 to-orange-500' },
    { platform: 'HackerRank', count: 100, label: '100+ Problems Solved', link: 'https://www.hackerrank.com/profile/ankitkumar952390', icon: 'SiHackerrank', color: 'from-emerald-500 to-green-600' },
    { platform: 'GeeksforGeeks', count: 50, label: '50+ Coding Solutions', link: 'https://www.geeksforgeeks.org/profile/ankitkuma3x0x', icon: 'SiGeeksforgeeks', color: 'from-green-600 to-teal-600' },
  ],
  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
      period: '2023 – 2027',
      grade: 'CGPA 7.8 / 10 (Current)',
      details: 'Specializing in Core CS, Web Engineering, Database Systems, and Algorithms.',
    },
    {
      degree: 'Intermediate (12th Grade)',
      institution: 'Bihar School Examination Board (BSEB)',
      period: '2021 – 2023',
      grade: '62%',
      details: 'Physics, Chemistry, Mathematics (PCM).',
    },
    {
      degree: 'Matriculation (10th Grade)',
      institution: 'Bihar School Examination Board (BSEB)',
      period: '2020 – 2021',
      grade: '73%',
      details: 'General Science, Mathematics, English.',
    },
  ],
  experiences: [
    {
      id: 1,
      role: 'AI Driven Web App and Product Development Intern',
      organization: 'Lenovo LEAP NextGen Scholar Program, AICTE, BharatCares',
      period: 'Jun 2026 – Jul 2026',
      type: 'Virtual Internship',
      points: [
        '6-week AICTE intensive internship focused on AI-driven web application and product development.',
        'Gained hands-on exposure to AI integration, modern web app architectures, and product lifecycle development.',
        'Strengthened real-world problem-solving and software development skills through AI-powered web solutions.',
      ],
      skills: ['AI Integration', 'Web App Development', 'Product Design', 'React.js', 'Python'],
    },
    {
      id: 2,
      role: 'AI for Sustainability Virtual Intern',
      organization: '1M1B, AICTE, IBM SkillsBuild',
      period: 'May 2026 – Jun 2026',
      type: 'Virtual Internship',
      points: [
        'In-depth exposure to AI, Responsible AI frameworks, and Sustainability aligned with UN SDGs.',
        'Explored cutting-edge Agentic AI workflows and Retrieval-Augmented Generation (RAG) architectures.',
        'Built impact-driven, responsible-AI problem-solving skills for sustainable technology projects.',
      ],
      skills: ['Agentic AI', 'RAG', 'Responsible AI', 'UN SDGs', 'IBM SkillsBuild'],
    },
  ],
  skillsCategories: [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React.js', level: 90, icon: 'FaReact' },
        { name: 'JavaScript (ES6+)', level: 90, icon: 'SiJavascript' },
        { name: 'Tailwind CSS', level: 92, icon: 'SiTailwindcss' },
        { name: 'HTML5 & CSS3', level: 95, icon: 'FaHtml5' },
        { name: 'Bootstrap', level: 85, icon: 'FaBootstrap' },
      ],
    },
    {
      title: 'Backend & APIs',
      skills: [
        { name: 'Node.js', level: 85, icon: 'FaNodeJs' },
        { name: 'Express.js', level: 88, icon: 'SiExpress' },
        { name: 'RESTful APIs', level: 90, icon: 'TbApi' },
      ],
    },
    {
      title: 'Databases & Management',
      skills: [
        { name: 'MongoDB', level: 85, icon: 'SiMongodb' },
        { name: 'MySQL / SQL', level: 80, icon: 'SiMysql' },
      ],
    },
    {
      title: 'Programming Languages',
      skills: [
        { name: 'Core Java', level: 70, icon: 'FaJava' },
        { name: 'Python', level: 60, icon: 'FaPython' },
        { name: 'JavaScript', level: 90, icon: 'SiJavascript' },
        { name: 'SQL', level: 82, icon: 'FaDatabase' },
      ],
    },
    {
      title: 'DevOps, Cloud & Tools',
      skills: [
        { name: 'AWS EC2', level: 70, icon: 'FaAws' },
        { name: 'CI/CD Basics', level: 72, icon: 'SiGithubactions' },
        { name: 'Linux', level: 78, icon: 'FaLinux' },
        { name: 'Git & GitHub', level: 88, icon: 'FaGitAlt' },
        { name: 'VS Code & IntelliJ', level: 90, icon: 'SiVisualstudiocode' },
      ],
    },
    {
      title: 'Core Computer Science',
      skills: [
        { name: 'Data Structures & Algorithms', level: 55, icon: 'FaBrain' },
        { name: 'Object-Oriented Programming (OOP)', level: 88, icon: 'FaCogs' },
        { name: 'DBMS', level: 82, icon: 'FaDatabase' },
        { name: 'Operating Systems', level: 80, icon: 'FaDesktop' },
        { name: 'Computer Networks', level: 78, icon: 'FaNetworkWired' },
      ],
    },
  ],
};
