import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Brain, 
  Database, 
  Terminal, 
  Cpu, 
  Mail, 
  MapPin, 
  Calendar,
  Award,
  Zap,
  Layers,
  ChevronDown,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Link2 as Linkedin,
  Terminal as Github
} from 'lucide-react';
import * as THREE from 'three';

// ============ 3D Components ============

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={2.5}>
        <icosahedronGeometry args={[1, 15]} />
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  const particles = new THREE.BufferGeometry();
  const particleCount = 500;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15;
  }
  
  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  return (
    <points ref={particlesRef} geometry={particles}>
      <pointsMaterial size={0.02} color="#8b5cf6" transparent opacity={0.6} />
    </points>
  );
}

function AIOrb() {
  const orbRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.z = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group>
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <mesh ref={orbRef} position={[0, 0, 0]} scale={0.5}>
          <torusGeometry args={[1, 0.1, 16, 100]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={2} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={-2} floatIntensity={1}>
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={0.5}>
          <torusGeometry args={[1.3, 0.05, 16, 100]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.5} />
        </mesh>
      </Float>
    </group>
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <AnimatedSphere />
      <FloatingParticles />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}

// ============ UI Components ============

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'AI Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.a
            href="#home"
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            AS<span className="text-cyan-400">.dev</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Scene3D />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Image */}
          <motion.div
            className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full animate-spin-slow" />
            <div className="absolute inset-1 bg-black rounded-full" />
            <div className="absolute inset-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center overflow-hidden">
              {/* Placeholder for user photo - replace src with actual photo */}
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
                alt="Alfiza Shaikh"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Alfiza Shaikh
            </span>
          </motion.h1>

          {/* Title */}
          <motion.div
            className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <span className="text-indigo-400">Software Engineer</span>
            <span className="mx-3 text-gray-600">|</span>
            <span className="text-cyan-400">AI Developer</span>
            <span className="mx-3 text-gray-600">|</span>
            <span className="text-purple-400">Oracle OFSS</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            Building intelligent solutions with 4+ years of expertise in Java, Python, SQL, 
            and cutting-edge AI technologies. Transforming complex problems into elegant code.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <motion.a
              href="#contact"
              className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-semibold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Get In Touch
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
            <motion.a
              href="#projects"
              className="px-8 py-4 border border-white/20 rounded-full font-semibold text-white hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View AI Projects
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-6 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            {[
              { icon: Linkedin, href: 'https://linkedin.com/in/alfizashaikh', label: 'LinkedIn' },
              { icon: Github, href: 'https://github.com/alfizashaikh', label: 'GitHub' },
              { icon: Mail, href: 'mailto:alfiza.shaikh@email.com', label: 'Email' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="p-3 bg-white/5 backdrop-blur-sm rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon size={22} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-500"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  const stats = [
    { value: '4+', label: 'Years Experience', icon: Calendar },
    { value: '3', label: 'AI Projects', icon: Brain },
    { value: '50+', label: 'Projects Delivered', icon: Code2 },
    { value: '100%', label: 'Client Satisfaction', icon: Award },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-black via-gray-900/50 to-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            About Me
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Engineering the{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Future
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Passionate about creating innovative solutions that bridge technology and business needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Hello! I'm{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Alfiza Shaikh
              </span>
            </h3>
            
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                I'm a dedicated Software Engineer at <span className="text-indigo-400 font-semibold">Oracle OFSS</span>, 
                currently working as a Consultant Engineer deployed at <span className="text-cyan-400 font-semibold">HDFC Bank</span>. 
                With over 4 years of hands-on experience, I specialize in building robust enterprise solutions.
              </p>
              <p>
                I hold a degree in <span className="text-purple-400 font-semibold">Computer Science Engineering</span> from 
                <span className="text-cyan-400 font-semibold"> K.J. Somaiya College</span>, where I developed a strong 
                foundation in software development principles.
              </p>
              <p>
                Recently, I've spearheaded <span className="text-indigo-400 font-semibold">3 AI-powered projects</span> at 
                Oracle OFSS, leveraging cutting-edge technologies to solve complex business challenges. My expertise spans 
                across Java, Python, SQL, Oracle SQL, PL/SQL, and modern frameworks.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: MapPin, label: 'Location', value: 'Mumbai, India' },
                { icon: Calendar, label: 'Experience', value: '4+ Years' },
                { icon: Award, label: 'Education', value: 'B.E. Computer Science' },
                { icon: Zap, label: 'Availability', value: 'Open to Opportunities' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className="w-5 h-5 text-indigo-400 mb-2" />
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-sm font-semibold text-white">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-all"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon className="w-8 h-8 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Terminal,
      skills: [
        { name: 'Java', level: 95 },
        { name: 'Python', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'TypeScript', level: 80 },
      ],
    },
    {
      title: 'Database & SQL',
      icon: Database,
      skills: [
        { name: 'Oracle SQL', level: 95 },
        { name: 'PL/SQL', level: 92 },
        { name: 'MySQL', level: 88 },
        { name: 'PostgreSQL', level: 85 },
      ],
    },
    {
      title: 'AI & Technologies',
      icon: Brain,
      skills: [
        { name: 'Machine Learning', level: 88 },
        { name: 'AI Integration', level: 90 },
        { name: 'Data Analysis', level: 85 },
        { name: 'Automation', level: 92 },
      ],
    },
    {
      title: 'Tools & Platforms',
      icon: Cpu,
      skills: [
        { name: 'FlexTube', level: 90 },
        { name: 'GL Systems', level: 88 },
        { name: 'JIRA', level: 95 },
        { name: 'Git/GitHub', level: 92 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Technical Expertise
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Skills &{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A comprehensive toolkit for building scalable, intelligent enterprise solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="group p-6 md:p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-cyan-500/10 rounded-xl">
                  <category.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-cyan-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">Additional Technologies & Frameworks</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Spring Boot', 'Hibernate', 'REST APIs', 'Microservices',
              'Docker', 'Kubernetes', 'AWS', 'Azure',
              'React', 'Node.js', 'Agile/Scrum', 'CI/CD',
              'Unit Testing', 'Integration Testing', 'Code Review', 'Mentoring'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-gray-300 text-sm border border-white/10 hover:border-indigo-500/50 hover:text-white transition-all cursor-default"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const experiences = [
    {
      title: 'Consultant Engineer',
      company: 'Oracle OFSS (at HDFC Bank)',
      period: '2022 - Present',
      description: 'Leading enterprise software development and AI integration projects for one of India\'s largest banking institutions.',
      achievements: [
        'Developed 3 AI-powered projects improving operational efficiency by 40%',
        'Managed FlexTube and GL systems for critical banking operations',
        'Led JIRA-based agile project management for cross-functional teams',
        'Optimized Oracle SQL queries reducing response time by 60%',
      ],
      technologies: ['Java', 'Python', 'Oracle SQL', 'PL/SQL', 'AI/ML', 'FlexTube', 'GL'],
    },
    {
      title: 'Software Engineer',
      company: 'Oracle OFSS',
      period: '2020 - 2022',
      description: 'Contributed to large-scale enterprise software solutions and database management systems.',
      achievements: [
        'Built scalable backend systems handling millions of transactions daily',
        'Implemented automated testing frameworks improving code quality',
        'Collaborated with international teams on global projects',
        'Mentored junior developers and conducted code reviews',
      ],
      technologies: ['Java', 'SQL', 'Oracle', 'Spring', 'Microservices'],
    },
  ];

  return (
    <section id="experience" className="py-20 md:py-32 bg-gradient-to-b from-black via-gray-900/50 to-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Career Journey
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Professional{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Building impactful solutions at India's leading technology companies
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 bg-indigo-500 rounded-full border-4 border-black z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    className="p-6 md:p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium">
                        {exp.period}
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-400 text-sm font-medium">
                        {exp.company}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{exp.title}</h3>
                    <p className="text-gray-400 mb-6">{exp.description}</p>

                    <div className="space-y-3 mb-6">
                      {exp.achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/5 rounded-full text-gray-400 text-xs border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl border border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-white/10 rounded-2xl">
              <Award className="w-12 h-12 text-indigo-400" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Education</h3>
              <p className="text-lg text-gray-300">
                <span className="text-cyan-400 font-semibold">B.E. Computer Science Engineering</span>
              </p>
              <p className="text-gray-400">K.J. Somaiya College of Engineering, Mumbai</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {['Data Structures', 'Algorithms', 'DBMS', 'OS', 'Computer Networks', 'Software Engineering'].map((subject) => (
                <span
                  key={subject}
                  className="px-3 py-1 bg-white/5 rounded-full text-gray-400 text-sm border border-white/10"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const projects = [
    {
      title: 'AI-Powered Document Processing System',
      description: 'Intelligent document classification and data extraction system using machine learning, reducing manual processing time by 70%.',
      technologies: ['Python', 'TensorFlow', 'NLP', 'Oracle DB'],
      impact: '70% reduction in processing time',
      icon: Brain,
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Predictive Analytics Dashboard',
      description: 'Real-time analytics dashboard with ML-based predictions for banking operations, enabling data-driven decision making.',
      technologies: ['Java', 'Python', 'React', 'Oracle SQL'],
      impact: '40% improvement in decision accuracy',
      icon: Layers,
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Automated Testing Framework',
      description: 'Comprehensive AI-driven testing automation framework for enterprise applications, improving code quality and reducing bugs.',
      technologies: ['Java', 'Selenium', 'AI/ML', 'JIRA'],
      impact: '60% reduction in bug reports',
      icon: Code2,
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Featured Work
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            AI{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Innovative solutions leveraging artificial intelligence to solve real-world business challenges
          </p>
        </motion.div>

        {/* 3D AI Orb Decoration */}
        <div className="absolute top-1/4 right-0 w-64 h-64 opacity-20 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <AIOrb />
          </Canvas>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              
              <div className="relative p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all h-full">
                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${project.gradient} flex items-center justify-center mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <project.icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Impact Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full text-green-400 text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  {project.impact}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/5 rounded-full text-gray-400 text-xs border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                  whileHover={{ x: 5 }}
                >
                  View Details
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-6">
            Want to see more projects and case studies?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-semibold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Discuss Your Project
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-black via-gray-900/50 to-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Get In Touch
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Let's{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ready to bring innovative solutions to your team? Let's discuss how I can contribute to your success.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
              <p className="text-gray-400 mb-8">
                I'm currently open to new opportunities and would love to hear from you. 
                Feel free to reach out through any of the channels below.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'alfiza.shaikh@email.com', href: 'mailto:alfiza.shaikh@email.com' },
                { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/alfizashaikh', href: 'https://linkedin.com/in/alfizashaikh' },
                { icon: Github, label: 'GitHub', value: 'github.com/alfizashaikh', href: 'https://github.com/alfizashaikh' },
                { icon: MapPin, label: 'Location', value: 'Mumbai, Maharashtra, India', href: '#' },
              ].map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all group"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                    <item.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability Badge */}
            <motion.div
              className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div>
                  <p className="text-green-400 font-semibold">Available for Opportunities</p>
                  <p className="text-gray-400 text-sm">Open to full-time roles and consulting projects</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                  placeholder="Tell me about your project or opportunity..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AS<span className="text-cyan-400">.dev</span>
            </a>
            <p className="text-gray-500 text-sm mt-2">
              Building the future, one line of code at a time.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Linkedin, href: 'https://linkedin.com/in/alfizashaikh', label: 'LinkedIn' },
              { icon: Github, href: 'https://github.com/alfizashaikh', label: 'GitHub' },
              { icon: Mail, href: 'mailto:alfiza.shaikh@email.com', label: 'Email' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="p-3 bg-white/5 backdrop-blur-sm rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm text-center md:text-right">
            © 2026 Alfiza Shaikh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============ Main App ============

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
