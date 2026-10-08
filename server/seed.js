import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import Project from './models/Project.js';

dotenv.config();

const initialProjects = [
  {
    title: 'WorkoutAdvisor',
    description: 'Personalized Workout Advisory Platform built with React.js, Node.js, Express.js, and MongoDB. Features responsive React frontend, RESTful Express APIs, and client-server integration for customized workout recommendations.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'REST API'],
    githubUrl: 'https://github.com/ankitkumar952390',
    liveUrl: '#contact',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    category: 'Full Stack',
    featured: true,
    order: 1,
  },
  {
    title: 'Interview Coach',
    description: 'AI-Powered Interview Preparation Platform using React.js, Node.js, Express.js, MongoDB, and AI integration. Provides AI mock interviews, resume analysis, job-description matching, project-defense evaluation, and user session report storage.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'AI/LLM', 'Tailwind CSS'],
    githubUrl: 'https://github.com/ankitkumar952390',
    liveUrl: '#contact',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    category: 'AI & ML',
    featured: true,
    order: 2,
  },
];

const seedData = async () => {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      console.log('[Seed] Skipped database seeding as MongoDB connection could not be established.');
      process.exit(0);
    }

    console.log('[Seed] Seeding database...');

    // Create or Update Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'ankitkumar952390@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@Ankit2026#Secure';

    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = await User.create({
        name: 'Ankit Kumar',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log(`[Seed] Admin user created: ${adminEmail}`);
    } else {
      admin.password = adminPassword;
      await admin.save();
      console.log(`[Seed] Admin user updated: ${adminEmail}`);
    }

    // Seed Projects
    for (const proj of initialProjects) {
      await Project.findOneAndUpdate(
        { title: proj.title },
        proj,
        { upsert: true, new: true }
      );
    }
    console.log(`[Seed] Seeded ${initialProjects.length} initial projects successfully!`);

    await mongoose.connection.close();
    console.log('[Seed] Completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

seedData();
