import {
  AppWindow,
  Boxes,
  Server,
  Smartphone,
  Bot,
  PenTool,
  Target,
  TrendingUp,
  ShieldCheck,
  MessagesSquare,
  type LucideIcon,
} from 'lucide-react';

export const EMAIL = 'hello@vision.studio';

export const nav = [
  { id: 'studio', label: 'Studio' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'stack', label: 'Stack' },
  { id: 'team', label: 'Team' },
];

export const principles = [
  {
    title: 'Architecture',
    body: 'Scalable software systems built on TypeScript, Go, modern databases and backend technologies.',
    tags: ['TypeScript', 'Go', 'Databases', 'Backend'],
  },
  {
    title: 'Aesthetics',
    body: 'Unique digital experiences shaped by custom UI/UX design, typography and interactive interfaces.',
    tags: ['UI/UX', 'Typography', 'Interaction'],
  },
  {
    title: 'Autonomy',
    body: 'AI, autonomous agents, enterprise search and intelligent business automation, wired into how you work.',
    tags: ['AI agents', 'Enterprise search', 'Automation'],
  },
];

export const stats = [
  { value: 100, suffix: '%', label: 'Senior talent squads' },
  { value: 12, suffix: '+', label: 'Shipped projects & solutions' },
  { value: 100, suffix: '%', label: 'Client IP code ownership' },
  { value: 6, suffix: '', label: 'Core engineering disciplines' },
];

export const enquiryTypes = [
  'New software product development',
  'Website and mobile application development',
  'SaaS product development',
  'Backend architecture and scaling',
  'AI and automation solutions',
  'IoT and industrial automation',
  'UI/UX and product design',
];

export type Service = {
  title: string;
  summary: string;
  icon: LucideIcon;
  enquiry: string;
  items: string[];
};

export const services: Service[] = [
  {
    title: 'Web Development',
    summary: 'Fast, responsive websites and custom web applications.',
    icon: AppWindow,
    enquiry: enquiryTypes[1],
    items: [
      'Website development',
      'Custom web applications',
      'Responsive frontend development',
      'Interactive user experiences',
      'High-performance websites',
    ],
  },
  {
    title: 'SaaS Development',
    summary: 'Multi-tenant platforms built to carry subscriptions and scale.',
    icon: Boxes,
    enquiry: enquiryTypes[2],
    items: [
      'Custom SaaS platforms',
      'Multi-tenant architecture',
      'Subscription management systems',
      'Admin dashboards',
      'Scalable software products',
    ],
  },
  {
    title: 'Backend & API Development',
    summary: 'The systems, services and data layers behind the interface.',
    icon: Server,
    enquiry: enquiryTypes[3],
    items: [
      'Backend system architecture',
      'REST and GraphQL APIs',
      'Microservices',
      'Database architecture',
      'Secure and scalable infrastructure',
    ],
  },
  {
    title: 'Mobile App Development',
    summary: 'Android, iOS and cross-platform apps that work offline too.',
    icon: Smartphone,
    enquiry: enquiryTypes[1],
    items: [
      'Android applications',
      'iOS applications',
      'Cross-platform mobile applications',
      'Offline synchronization',
      'Mobile application interfaces',
    ],
  },
  {
    title: 'AI & Automation',
    summary: 'LLM integrations and agents that take work off your team.',
    icon: Bot,
    enquiry: enquiryTypes[4],
    items: [
      'AI-powered workflows',
      'LLM integrations',
      'Autonomous AI agents',
      'Business process automation',
      'Intelligent automation systems',
    ],
  },
  {
    title: 'UI/UX Design',
    summary: 'Research, design systems and prototypes people can click.',
    icon: PenTool,
    enquiry: enquiryTypes[6],
    items: [
      'User interface design',
      'User experience design',
      'Design systems',
      'Figma prototypes',
      'Product design and user research',
    ],
  },
];

export type Project = {
  title: string;
  kind: string;
  description: string;
  tech: string[];
  image: string;
  alt: string;
};

export const projects: Project[] = [
  {
    title: 'RoadSync',
    kind: 'Truck booking platform',
    description:
      'A logistics marketplace connecting freight truck owners and customers through a coordinated truck booking workflow.',
    tech: ['React Native', 'TypeScript', 'Expo', 'Node.js'],
    image: '/work/roadsync.webp',
    alt: 'Freight truck driving along a highway',
  },
  {
    title: 'Ayurvedic Skincare',
    kind: 'E-commerce',
    description:
      'An online store for Ayurvedic skincare products, combining traditional wellness with an online shopping experience.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    image: '/work/ayurveda.webp',
    alt: 'Herbal skincare jar arranged with flowers and brass vessels',
  },
  {
    title: 'Tripsy Goli Soda',
    kind: 'Business website',
    description:
      'A business website showcasing the Tripsy Goli Soda brand, its products and company story.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Figma'],
    image: '/work/goli-soda.webp',
    alt: 'Glass soda bottles in a wooden crate',
  },
  {
    title: 'Backend Engineering & Scaling',
    kind: 'Backend',
    description:
      'Backend engineering solutions focused on performance, reliability, scalability and maintainability.',
    tech: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    image: '/work/backend.webp',
    alt: 'Row of server towers',
  },
  {
    title: 'Startup Product Engineering',
    kind: 'Concept to production',
    description:
      'End-to-end product engineering for startups, covering concept development, MVP creation and production-ready applications.',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    image: '/work/startup.webp',
    alt: 'Team planning with sticky notes on a glass wall',
  },
  {
    title: 'University Workflow Automation',
    kind: 'Automation',
    description:
      'Automation for universities that handles repetitive administrative activities such as form filling, data processing and workflow management.',
    tech: ['Python', 'Playwright', 'Node.js', 'TypeScript'],
    image: '/work/university.webp',
    alt: 'Brick university buildings above a line of trees',
  },
  {
    title: 'AI-Powered Trading & Arbitrage Systems',
    kind: 'AI · Markets',
    description:
      'An AI-assisted trading platform that analyzes market data, identifies potential arbitrage opportunities and provides actionable insights.',
    tech: ['Python', 'FastAPI', 'PyTorch', 'TensorFlow'],
    image: '/work/trading.webp',
    alt: 'Market data and price charts on trading screens',
  },
  {
    title: 'IoT & Industrial Automation',
    kind: 'Packaged drinking water factory',
    description:
      'An IoT-based monitoring and control system that automates and optimizes packaged drinking water factory operations.',
    tech: ['ESP32', 'Arduino', 'MQTT', 'Node.js'],
    image: '/work/iot-water.webp',
    alt: 'Water bottles moving along a factory conveyor line',
  },
  {
    title: 'Custom SaaS Product Development',
    kind: 'SaaS',
    description:
      'Customized SaaS platforms that digitize business operations, automate workflows and improve operational efficiency.',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    image: '/work/saas.webp',
    alt: 'Laptop showing an analytics dashboard',
  },
  {
    title: 'Transport Business Website',
    kind: 'Website',
    description:
      'A professional website for a transport company, presenting its services, business information and customer enquiry functionality.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Lucide Icons'],
    image: '/work/transport.webp',
    alt: 'Rows of parked trucks seen from above',
  },
  {
    title: 'AI-Powered Codebase Debugging SaaS',
    kind: 'AI · Developer tools',
    description:
      'A developer-focused SaaS platform that analyzes codebases, identifies potential issues, explains errors and assists with debugging using AI.',
    tech: ['React 19', 'TypeScript', 'Monaco Editor', 'Python FastAPI'],
    image: '/work/debugging.webp',
    alt: 'Source code on a dark monitor',
  },
  {
    title: 'Personal AI Assistant',
    kind: 'AI',
    description:
      'An AI-powered personal assistant that handles tasks, organizes information and supports everyday workflows.',
    tech: ['React 19', 'TypeScript', 'Python LangGraph', 'Tailwind CSS'],
    image: '/work/assistant.webp',
    alt: 'Person using a smartphone at a desk',
  },
];

export const reasons: { title: string; icon: LucideIcon; items: string[] }[] = [
  {
    title: 'Built around your goals',
    icon: Target,
    items: ['Custom roadmap planning', 'Clear milestone deliverables', 'Direct technical accountability'],
  },
  {
    title: 'Engineered for growth',
    icon: TrendingUp,
    items: ['High-throughput performance', 'Multi-tenant cloud architecture', 'Modular and scalable systems'],
  },
  {
    title: 'Quality without compromise',
    icon: ShieldCheck,
    items: ['Senior engineering team', 'Automated testing and CI/CD', 'Accessibility-focused development'],
  },
  {
    title: 'Collaboration that matters',
    icon: MessagesSquare,
    items: [
      'Regular development updates',
      'Live staging deployments',
      'GitHub repository access',
      'Direct communication with architects',
    ],
  },
];

export const phases = [
  {
    title: 'Discover & Blueprint',
    body: 'We learn your business goals, requirements, workflows and technical constraints before a line of code is written.',
    deliverables: [
      'Technical architecture blueprint',
      'Product Requirements Document (PRD)',
      'Entity-relationship diagrams',
      'Data flow diagrams',
    ],
  },
  {
    title: 'Design & Prototype',
    body: 'Business requirements become product experiences people find easy to use.',
    deliverables: ['Figma design files', 'Design token system', 'Interactive mobile and desktop prototypes'],
  },
  {
    title: 'Develop & Engineer',
    body: 'We build the product with modern technologies and engineering practices.',
    deliverables: ['Production-grade codebase', 'Live staging environment', 'Automated test suite'],
  },
  {
    title: 'Deliver & Deploy',
    body: 'The product is prepared for production and handed over in full.',
    deliverables: [
      'Production deployment',
      'Security and performance audit reports',
      'Git repository ownership',
      'Technical documentation',
    ],
  },
  {
    title: 'Support & Scale',
    body: 'After launch we keep improving and maintaining what we built.',
    deliverables: [
      'Maintenance and monitoring',
      'Security updates',
      'Performance reports',
      'Feature development',
      'Ongoing technical support',
    ],
  },
];

export const stack = [
  { category: 'Frontend', tech: ['React', 'Next.js'] },
  { category: 'Backend', tech: ['Node.js', 'Go', 'Rust', 'Python', 'GraphQL', 'REST', 'gRPC'] },
  { category: 'Databases', tech: ['PostgreSQL', 'Redis', 'TimescaleDB', 'ClickHouse', 'Qdrant'] },
  { category: 'AI & ML', tech: ['LangGraph', 'LlamaIndex', 'GPT-4o', 'Claude', 'RAG'] },
  { category: 'Mobile', tech: ['React Native', 'Expo'] },
  { category: 'IoT', tech: ['MQTT', 'IoT Microcontrollers'] },
  { category: 'DevOps', tech: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'Vercel'] },
  { category: 'Testing', tech: ['Jest', 'Playwright'] },
];

export const team = [
  { name: 'Elena Rostova', role: 'Founder & Creative Technologist', initials: 'ER' },
  { name: 'Marcus Vance', role: 'Chief Technology Officer & Architect', initials: 'MV' },
  { name: 'David Chen', role: 'Head of AI & Automation', initials: 'DC' },
  { name: 'Sofia Al-Mansoor', role: 'Director of Product Design', initials: 'SA' },
];

export const presence = ['Bengaluru', 'Mumbai', 'Delhi NCR'];

export const socials = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'Twitter / X', href: 'https://x.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Dribbble', href: 'https://dribbble.com/' },
];
