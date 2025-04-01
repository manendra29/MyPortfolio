import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaDatabase, FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiPostgresql, SiMysql, SiNextdotjs, SiTypescript } from 'react-icons/si';
import axios from 'axios';
import toast from 'react-hot-toast';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [typingText, setTypingText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = [
    "Hello, I'm a Full Stack Developer     ",
    "I Build Modern Web Applications       ",
    "MERN Stack Expert         ",
    "Let's Work Together       "
  ];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };
  const refs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  // Typing animation effect
  useEffect(() => {
    let isMounted = true;
    let isDeleting = false;
    let currentIndex = currentTextIndex;
    let text = '';
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseTime = 1500;

    const type = () => {
      if (!isMounted) return;

      const currentText = texts[currentIndex];
      
      if (isDeleting) {
        text = currentText.substring(0, text.length - 1);
      } else {
        text = currentText.substring(0, text.length + 1);
      }

      setTypingText(text);

      if (!isDeleting && text === currentText) {
        isDeleting = true;
        typingSpeed = pauseTime;
      } else if (isDeleting && text === '') {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % texts.length;
        setCurrentTextIndex(currentIndex);
        typingSpeed = 100;
      }

      const speed = isDeleting ? deletingSpeed : typingSpeed;
      setTimeout(type, speed);
    };

    setTimeout(type, 1000);

    return () => {
      isMounted = false;
    };
  }, []);

  // Intersection Observer for sections
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3
    };

    const observerCallback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(refs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(refs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    refs[sectionId].current.scrollIntoView({ behavior: 'smooth' });
  };

//   const projects = [
//     {
//       id: 1,
//       title: "E-Commerce Platform",
//       description: "A full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.",
//       tech: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
//       image: "/api/placeholder/600/300",
//       link: "#"
//     },
//     {
//       id: 2,
//       title: "Task Management App",
//       description: "Collaborative task management application with real-time updates and team workspace.",
//       tech: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
//       image: "/api/placeholder/600/300",
//       link: "#"
//     },
//     {
//       id: 3,
//       title: "Social Media Dashboard",
//       description: "Analytics dashboard for social media metrics with data visualization and reporting tools.",
//       tech: ["React", "Redux", "Node.js", "Chart.js", "MySQL"],
//       image: "/api/placeholder/600/300",
//       link: "#"
//     }
//   ];


const projects = [
    {
      id: 1,
      title: "Pr-Crafts- A E-Commerce Website",
      description: "Custom e-commerce platform for PR-Crafts, a handmade crafts startup with 70K Instagram followers. Features include product showcasing, secure checkout, and social media integration.",
      tech: ["MongoDB", "Express.js", "React", "Node.js", "Stripe API", "Cloudinary"],
      image: "/images/pr-crafts.png",
      link: "https://pr-crafts-front-end-manendras-projects.vercel.app/"
    },
    {
      id: 2,
      title: "CollegeFusion",
      description: "Professional networking platform for college students with LinkedIn-inspired features, including clubs, contests, leaderboards, and institution-specific networking opportunities.",
      tech: ["MongoDB", "Express.js", "React", "Node.js", "TypeScript", "Socket.io"],
      image: "/images/collegefusion.png",
      link: "https://github.com/manendra29/CollegeFusion"
    },
    {
      id: 3,
      title: "EstateVision",
      description: "Comprehensive real estate platform offering property listings, virtual tours, mortgage calculators, and agent connections for seamless property transactions.",
      tech: ["MongoDB", "Express.js", "React", "Node.js", "Google Maps API", "Firebase"],
      image: "/images/estate.png",
      link: "#"
    },
    {
      id: 4,
      title: "MyPortfolio",
      description: "Personal portfolio website showcasing professional achievements, technical skills, project history, and contact information with a modern, responsive design.",
      tech: ["MongoDB", "Express.js", "React", "Node.js", "Tailwind CSS", "Three.js", "Framer Motion"],
      image: "/images/portfolio.png",
      link: "#"
    },
    {
      id: 5,
      title: "LuxStay",
      description: "Hotel booking platform with advanced filtering, room comparison, integrated reviews, and secure payment processing for a seamless reservation experience.",
      tech: ["MongoDB", "Express.js", "React", "Node.js", "Stripe API", "Cloudinary"],
      image: "/images/hotel.png",
      link: "#"
    }
];

const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        axios.post("http://my-portfolio-backend-pied.vercel.app/contact",{email:formData.email,
            message:formData.message,
            subject:formData.subject,
            name:formData.name
        },{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        })
        toast.success("Query Sent");
        formData.email='';
        formData.name='';
        formData.message='';
        formData.subject='';
    } catch (error) {
        toast.success("Query not Sent");
        console.log(error);
    }
}







  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white min-h-screen font-sans overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <div className="absolute top-0 right-0 bg-blue-500 rounded-full w-96 h-96 filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 bg-purple-500 rounded-full w-96 h-96 filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 bg-pink-500 rounded-full w-96 h-96 filter blur-3xl animate-pulse"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 px-4 py-4 border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent"
          >
            My Portfolio
          </motion.div>
          <ul className="hidden md:flex space-x-8">
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <motion.li 
                key={section}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  onClick={() => scrollToSection(section)}
                  className={`capitalize ${activeSection === section ? 'text-pink-400 font-semibold' : 'text-gray-300 hover:text-white'}`}
                >
                  {section}
                </button>
              </motion.li>
            ))}
          </ul>
          <motion.button 
            className="md:hidden text-white"
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section 
        id="home" 
        ref={refs.home}
        className="min-h-screen flex items-center justify-center pt-16 px-4"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="block">Hi there! I'm</span>
              <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">Manendra Kushwaha</span>
            </h1>
            <div className="h-16 flex items-center justify-center md:justify-start">
              <h2 className="text-xl md:text-3xl font-light">
                <span className="inline-block">{typingText}</span>
                <span className="inline-block animate-blink">|</span>
              </h2>
            </div>
            <motion.div 
              className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#f472b6" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-pink-600 rounded-full font-medium shadow-lg hover:shadow-pink-500/30 transition-all"
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, borderColor: "#f472b6" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-pink-600 rounded-full font-medium hover:shadow-lg hover:shadow-pink-500/20 transition-all"
                onClick={() => scrollToSection('projects')}
              >
                View Projects
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 mt-12 md:mt-0 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 animate-pulse opacity-75 blur-lg"></div>
              <img 
                src="/images/myimage.jpg" 
                alt="Your Profile" 
                className="rounded-full w-full h-full object-cover relative z-10 border-4 border-white/10"
              />
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center shadow-lg animate-bounce">
                <FaReact className="text-white text-2xl" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center shadow-lg animate-bounce delay-200">
                <FaNodeJs className="text-white text-2xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        ref={refs.about}
        className="min-h-screen py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto"></div>
          </motion.div>
          
          <div className="flex flex-col md:flex-row gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">My Journey</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm a passionate Full Stack Developer with experience in building modern web applications. 
                My journey in software development started with a curiosity about how websites work, which led me to 
                dive deep into the world of programming. I enjoy solving complex problems and creating intuitive user experiences.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or enhancing my skills through continuous learning. I believe in writing clean, maintainable code and 
                collaborating effectively with teams to deliver exceptional results.
              </p>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">Education & Experience</h3>
              <div className="space-y-6">
                <motion.div 
                  className="border border-white/10 rounded-lg p-6 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all"
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(255, 0, 255, 0.3)" }}
                >
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500 mr-3"></div>
                    <h4 className="font-semibold">Accenture</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">2025 - Present</p>
                  <p className="text-gray-300">Associate Software Engineer (ASE)</p>
                </motion.div>
                
                <motion.div 
                  className="border border-white/10 rounded-lg p-6 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all"
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(255, 0, 255, 0.3)" }}
                >
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-violet-500 mr-3"></div>
                    <h4 className="font-semibold">RNS Institue Of Technology</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">2021 - 2025</p>
                  <p className="text-gray-300">Bachelor of Engineering, Information Science And Engineering</p>
                </motion.div>
                
                <motion.div 
                  className="border border-white/10 rounded-lg p-6 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all"
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(255, 0, 255, 0.3)" }}
                >
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                    <h4 className="font-semibold">Agarwal Vidya Vihar</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">2018 - 2020</p>
                  <p className="text-gray-300">10th to 12th, Science & Mathematics</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        ref={refs.skills}
        className="min-h-screen py-20 px-4 bg-black/20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Tech Stack</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaReact className="text-4xl text-blue-400" />, name: "React.js", level: 90 },
              { icon: <FaNodeJs className="text-4xl text-green-400" />, name: "Node.js", level: 85 },
              { icon: <SiExpress className="text-4xl text-gray-400" />, name: "Express.js", level: 85 },
              { icon: <SiMongodb className="text-4xl text-green-500" />, name: "MongoDB", level: 80 },
              { icon: <SiPostgresql className="text-4xl text-blue-500" />, name: "PostgreSQL", level: 75 },
              { icon: <SiMysql className="text-4xl text-blue-600" />, name: "MySQL", level: 80 },
              { icon: <FaHtml5 className="text-4xl text-orange-500" />, name: "HTML5", level: 95 },
              { icon: <FaCss3Alt className="text-4xl text-blue-500" />, name: "CSS", level: 90 },
              { icon: <FaJs className="text-4xl text-yellow-400" />, name: "JavaScript", level: 90 },
              { icon: <SiNextdotjs className="text-4xl text-white" />, name: "Next.js", level: 75 },
              { icon: <SiTypescript className="text-4xl text-blue-500" />, name: "TypeScript", level: 80 },
              { icon: <FaDatabase className="text-4xl text-purple-500" />, name: "SQL", level: 85 },
            ].map((skill, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 10px 30px -15px rgba(255, 0, 255, 0.3)",
                  scale: 1.05
                }}
              >
                <div className="mb-4">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{skill.name}</h3>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <motion.div 
                    className="h-2.5 rounded-full bg-gradient-to-r from-pink-500 to-violet-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.05 }}
                  ></motion.div>
                </div>
                <span className="text-xs text-gray-400 mt-1">{skill.level}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        ref={refs.projects}
        className="min-h-screen py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">My Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                className="group rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 10px 30px -15px rgba(255, 0, 255, 0.3)",
                }}
              >
                <div className="overflow-hidden">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-all duration-500 ease-in-out"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded-full bg-white/10 text-pink-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <motion.a 
                    href={project.link}
                    className="inline-block mt-2 text-sm font-medium text-pink-400 hover:text-pink-300"
                    whileHover={{ x: 5 }}
                  >
                    View Project →
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
           
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={refs.contact}
        className="min-h-screen py-20 px-4 bg-black/20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto"></div>
          </motion.div>
          
          <div className="flex flex-col md:flex-row gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                Let's Connect
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm currently available for freelance work and full-time positions. 
                If you have a project that you want to get started, think you need my help with something, 
                or just want to say hello, then get in touch.
              </p>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-violet-600 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400">Email</h4>
                    <p className="text-white">manendrakushwaha2901@gmail.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-violet-600 flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400">Phone</h4>
                    <p className="text-white">+91 7405678171</p>
                  </div>
                </motion.div>
                
                <div className="flex gap-4 mt-8">
                  <motion.a 
                    href="https://github.com/manendra29"
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGithub className="text-white text-xl" />
                  </motion.a>
                  <motion.a 
                    href="https://www.linkedin.com/in/manendra-kushwaha-470a42268/"
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaLinkedin className="text-white text-xl" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm text-gray-400 mb-1">Name</label>
        <input 
          type="text" 
          id="name" 
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:border-pink-500 transition-all"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email</label>
        <input 
          type="email" 
          id="email" 
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:border-pink-500 transition-all"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm text-gray-400 mb-1">Subject</label>
        <input 
          type="text" 
          id="subject" 
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:border-pink-500 transition-all" 
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-gray-400 mb-1">Message</label>
        <textarea 
          id="message" 
          rows="4" 
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:border-pink-500 transition-all"
        ></textarea>
      </div>
      <button 
        type="submit" 
        className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-violet-600 text-white font-medium shadow-xl hover:shadow-pink-500/30 transition-all"
      >
        Send Message
      </button>
    </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 bg-black/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent mb-4">
            My Portfolio
          </div>
          <p className="text-gray-400 mb-6">Building amazing web experiences</p>
          <div className="flex justify-center gap-6 mb-8">
            <motion.a 
              href="https://github.com/manendra29"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub className="text-xl" />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/manendra-kushwaha-470a42268/"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin className="text-xl" />
            </motion.a>
            {/* <motion.a 
              href="manendrakushwaha2901@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaEnvelope className="text-xl" />
            </motion.a> */}
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Manendra Kushwaha. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Button */}
      <motion.button 
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-violet-600 flex items-center justify-center shadow-lg hover:shadow-pink-500/30 z-50"
        onClick={() => scrollToSection('home')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>

      {/* Custom Cursor Effect - Uncomment for a fancy cursor effect */}
      
      <div className="fixed top-0 left-0 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 mix-blend-screen pointer-events-none z-50 opacity-75" 
      style={{ transform: 'translate(-50%, -50%)' }}></div> 
     
    </div>
  );
};

export default Portfolio;