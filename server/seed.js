const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

const sampleProjects = [
  {
    title: 'Handwritten Digit Recognition using CNN',
    description: 'Build a Convolutional Neural Network to recognize handwritten digits from the MNIST dataset. This project will help you understand the basics of deep learning and image classification.',
    domain: 'AI/ML',
    difficulty: 'Beginner',
    semester: 5,
    technologies: ['Python', 'TensorFlow', 'Keras', 'NumPy'],
    prerequisites: ['Python Basics', 'Linear Algebra', 'Neural Networks Fundamentals'],
    estimatedHours: 15,
    learningOutcomes: [
      'Understand CNN architecture',
      'Learn data preprocessing techniques',
      'Build and train neural networks',
      'Evaluate model performance'
    ],
    features: [
      'Load and preprocess MNIST dataset',
      'Build CNN model with Keras',
      'Train and validate the model',
      'Test with custom handwritten digits',
      'Visualize predictions'
    ],
    resources: [
      {
        title: 'TensorFlow Documentation',
        url: 'https://www.tensorflow.org/',
        type: 'Documentation'
      },
      {
        title: 'Deep Learning Fundamentals',
        url: 'https://www.coursera.org/courses',
        type: 'Tutorial'
      }
    ]
  },
  {
    title: 'Sentiment Analysis using NLP',
    description: 'Create a sentiment analysis tool that can classify text as positive, negative, or neutral. Learn natural language processing techniques and text preprocessing.',
    domain: 'AI/ML',
    difficulty: 'Intermediate',
    semester: 6,
    technologies: ['Python', 'NLTK', 'TextBlob', 'Scikit-learn'],
    prerequisites: ['Python Programming', 'Machine Learning Basics', 'NLP Fundamentals'],
    estimatedHours: 20,
    learningOutcomes: [
      'Understand NLP concepts',
      'Learn text preprocessing',
      'Implement sentiment classification',
      'Deploy ML models'
    ],
    features: [
      'Text preprocessing pipeline',
      'Feature extraction using TF-IDF',
      'Implement multiple classifiers',
      'Evaluate using confusion matrix',
      'Build web interface'
    ],
    resources: [
      {
        title: 'NLTK Tutorial',
        url: 'https://www.nltk.org/howto/',
        type: 'Tutorial'
      }
    ]
  },
  {
    title: 'E-Commerce Web Application',
    description: 'Build a complete e-commerce platform with user authentication, product management, shopping cart, and payment integration. Learn full-stack development.',
    domain: 'CSE',
    difficulty: 'Advanced',
    semester: 7,
    technologies: ['Node.js', 'Express', 'React', 'MongoDB', 'Stripe API'],
    prerequisites: ['Web Development', 'Database Design', 'REST APIs'],
    estimatedHours: 60,
    learningOutcomes: [
      'Design scalable web applications',
      'Implement authentication and authorization',
      'Integrate payment gateways',
      'Deploy applications to cloud'
    ],
    features: [
      'User registration and login',
      'Product catalog with filtering',
      'Shopping cart functionality',
      'Order management',
      'Payment processing',
      'Admin dashboard'
    ],
    resources: [
      {
        title: 'MERN Stack Guide',
        url: 'https://www.mongodb.com/mern-stack',
        type: 'Tutorial'
      }
    ]
  },
  {
    title: 'Task Management System',
    description: 'Create a collaborative task management application with real-time updates. Build a responsive web app with team collaboration features.',
    domain: 'IT',
    difficulty: 'Intermediate',
    semester: 5,
    technologies: ['React', 'Firebase', 'Material-UI', 'JavaScript'],
    prerequisites: ['JavaScript', 'React Basics', 'Firebase'],
    estimatedHours: 25,
    learningOutcomes: [
      'Build real-time applications',
      'Learn state management',
      'Implement user collaboration',
      'Design responsive UI'
    ],
    features: [
      'User authentication',
      'Create and manage tasks',
      'Assign tasks to team members',
      'Real-time notifications',
      'Task filtering and sorting',
      'Mobile responsive design'
    ],
    resources: [
      {
        title: 'React Documentation',
        url: 'https://react.dev',
        type: 'Documentation'
      }
    ]
  },
  {
    title: 'Hospital Management System',
    description: 'Develop a comprehensive hospital management system for managing patients, appointments, doctors, and medical records with secure database design.',
    domain: 'CSE',
    difficulty: 'Intermediate',
    semester: 6,
    technologies: ['Python', 'Django', 'PostgreSQL', 'HTML/CSS'],
    prerequisites: ['Database Management', 'Web Development', 'Python'],
    estimatedHours: 40,
    learningOutcomes: [
      'Design complex databases',
      'Implement secure systems',
      'Learn CRUD operations',
      'Build data-driven applications'
    ],
    features: [
      'Patient record management',
      'Appointment scheduling',
      'Doctor profiles and specializations',
      'Medical history tracking',
      'Bill generation',
      'Admin and staff roles'
    ]
  },
  {
    title: 'Image Super Resolution using GANs',
    description: 'Implement a Generative Adversarial Network to enhance low-resolution images to high-resolution. Learn about GANs and advanced deep learning techniques.',
    domain: 'AI/ML',
    difficulty: 'Advanced',
    semester: 7,
    technologies: ['Python', 'PyTorch', 'OpenCV', 'Pillow'],
    prerequisites: ['Deep Learning', 'CNNs', 'GANs Fundamentals'],
    estimatedHours: 50,
    learningOutcomes: [
      'Understand GAN architecture',
      'Implement generator and discriminator',
      'Learn advanced training techniques',
      'Evaluate image quality metrics'
    ],
    features: [
      'Generator and discriminator networks',
      'Perceptual loss functions',
      'Batch normalization and regularization',
      'Image preprocessing pipeline',
      'Performance benchmarking'
    ]
  },
  {
    title: 'Social Media Dashboard',
    description: 'Create a dashboard that aggregates data from multiple social media platforms with analytics and visualizations. Learn API integration and data visualization.',
    domain: 'IT',
    difficulty: 'Intermediate',
    semester: 6,
    technologies: ['React', 'Node.js', 'Chart.js', 'Social APIs'],
    prerequisites: ['REST APIs', 'React', 'JavaScript'],
    estimatedHours: 30,
    learningOutcomes: [
      'Integrate third-party APIs',
      'Visualize data effectively',
      'Learn asynchronous programming',
      'Build responsive dashboards'
    ],
    features: [
      'Multi-platform integration',
      'Real-time data fetching',
      'Analytics and metrics',
      'Data visualization charts',
      'User authentication',
      'Export functionality'
    ]
  },
  {
    title: 'Recommendation System for Movies',
    description: 'Build a movie recommendation engine using collaborative filtering and content-based filtering. Learn about recommendation algorithms.',
    domain: 'AI/ML',
    difficulty: 'Intermediate',
    semester: 6,
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    prerequisites: ['Machine Learning', 'Linear Algebra', 'Python'],
    estimatedHours: 25,
    learningOutcomes: [
      'Understand recommendation algorithms',
      'Implement collaborative filtering',
      'Learn matrix factorization',
      'Evaluate recommendation quality'
    ],
    features: [
      'Data loading and preprocessing',
      'Collaborative filtering implementation',
      'Content-based filtering',
      'Hybrid approach',
      'Evaluation metrics'
    ]
  },
  {
    title: 'Chatbot with NLP and ML',
    description: 'Develop an intelligent chatbot that can understand and respond to user queries using natural language processing and machine learning.',
    domain: 'AI/ML',
    difficulty: 'Intermediate',
    semester: 6,
    technologies: ['Python', 'TensorFlow', 'NLTK', 'Flask'],
    prerequisites: ['NLP', 'Machine Learning', 'Python'],
    estimatedHours: 35,
    learningOutcomes: [
      'Build conversational AI',
      'Implement intent classification',
      'Learn entity recognition',
      'Deploy ML models'
    ],
    features: [
      'Intent recognition',
      'Entity extraction',
      'Response generation',
      'Learning from conversations',
      'API integration',
      'Web interface'
    ]
  },
  {
    title: 'Weather Application with IoT',
    description: 'Create a comprehensive weather application that fetches real-time data and provides forecasts. Integrate with IoT sensors and APIs.',
    domain: 'IT',
    difficulty: 'Beginner',
    semester: 4,
    technologies: ['JavaScript', 'Weather API', 'HTML/CSS', 'React'],
    prerequisites: ['JavaScript', 'Web APIs', 'HTML/CSS'],
    estimatedHours: 12,
    learningOutcomes: [
      'Use REST APIs',
      'Handle asynchronous operations',
      'Build responsive interfaces',
      'Learn geolocation services'
    ],
    features: [
      'Real-time weather data',
      'Weather forecasting',
      'Geolocation support',
      'Search by city',
      'Weather alerts',
      'Responsive design'
    ]
  }
];

async function seedDatabase() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/academic-projects';

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('📦 Clearing existing projects...');
    await Project.deleteMany({});

    console.log('🌱 Seeding database with sample projects...');
    const savedProjects = await Project.insertMany(sampleProjects);

    console.log(`✅ Successfully seeded ${savedProjects.length} projects!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
