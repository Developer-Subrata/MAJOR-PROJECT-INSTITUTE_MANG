import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Button,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import styled from 'styled-components';
import { LightPurpleButton } from '../components/buttonStyles';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MdSchool, MdGroups, MdAssessment, MdChat } from 'react-icons/md';


// Import diverse professional images
import logo from '../assets/img2.png';
import HeroImage from "../assets/classroom.png";
import CampusImage from "../assets/institution-background1.png";
import ClassroomImage from "../assets/backg.jpg";
import TechImage from "../assets/classroom.png";
import GraduationImage from "../assets/backg.jpg";

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const slides = [
    {
      image: CampusImage,
      alt: "Aerial view of university campus",
      title: "Empowering Education",
      subtitle: "Comprehensive solutions for modern educational institutions",
      cta: "Get Started"
    },
    {
      image: ClassroomImage,
      alt: "Teacher engaging with students in classroom",
      title: "Streamlined Administration",
      subtitle: "Simplify your institution's management processes",
      cta: "View Features"
    },
    {
      image: TechImage,
      alt: "Students using technology for learning",
      title: "Enhanced Learning Experience",
      subtitle: "Innovative tools to support both educators and learners",
      cta: "Learn More"
    },
    {
      image: GraduationImage,
      alt: "Graduating students throwing caps",
      title: "Proven Success",
      subtitle: "Join thousands of institutions achieving better outcomes",
      cta: "See Case Studies"
    }
  ];

  // Improved carousel auto-advance with pause on hover
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000); // More reasonable 5-second interval
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const features = [
    {
      icon: <MdSchool size={40} color="#7f56da" />,
      title: "Institution Management",
      description: "Comprehensive tools to manage all aspects of your educational institution"
    },
    {
      icon: <MdGroups size={40} color="#7f56da" />,
      title: "Student & Faculty",
      description: "Efficiently manage student and faculty records and interactions"
    },
    {
      icon: <MdAssessment size={40} color="#7f56da" />,
      title: "Performance Tracking",
      description: "Monitor and analyze academic performance with detailed reports"
    },
    {
      icon: <MdChat size={40} color="#7f56da" />,
      title: "Communication Hub",
      description: "Seamless communication between all stakeholders"
    }
  ];

  // Add swipe support for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      goToNextSlide();
    }

    if (touchStart - touchEnd < -50) {
      goToPrevSlide();
    }
  };

  return (
    <MainWrapper>
      {/* Hero Carousel Section */}
      <HeroSection
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div
          className="navbar"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '0.7rem 5%',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.3s ease', // For smooth transition of background, padding, etc.
            backgroundColor: 'white', // You can change it if you want to add a background color
            opacity: 1,
            animation: 'fadeIn 0.5s ease-out' // Custom animation for fade-in effect
          }}
        >
          <a href="/"
            className="logo"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none'
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                height: '40px',
                width: 'auto',
                marginRight: '10px'
              }}
            />
            <span
              style={{
                color: 'black',
                fontSize: '1.5rem',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              CampusCore
            </span>
          </a>
        </div>


        <div className="carousel">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                loading={index === 0 ? 'eager' : 'lazy'} // Optimize loading
              />
              <div className="overlay"></div>
              <div className="slide-content">
                <Typography variant={isMobile ? 'h3' : 'h2'} component="h1">
                  {slide.title}
                </Typography>
                <Typography variant={isMobile ? 'h6' : 'h5'} component="p">
                  {slide.subtitle}
                </Typography>
                <div className="cta-buttons">
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/choose"
                    size={isMobile ? 'medium' : 'large'}
                    sx={{ mr: 2 }}
                  >
                    {slide.cta}
                  </Button>
                  {/* <Button
                    variant="outlined"
                    color="inherit"
                    component={Link}
                    to="/chooseasguest"
                    size={isMobile ? 'medium' : 'large'}
                  >
                    Explore Demo
                  </Button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {!isMobile && (
          <>
            <button className="carousel-arrow prev" onClick={goToPrevSlide}>
              &lt;
            </button>
            <button className="carousel-arrow next" onClick={goToNextSlide}>
              &gt;
            </button>
          </>
        )}

        <div className="indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </HeroSection>

      {/* Main Content */}
      <StyledContainer maxWidth="xl">
        {/* Welcome Section */}
        <WelcomeSection>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6} order={isMobile ? 2 : 1}>
              <div className="content-box">
                <Typography variant={isMobile ? 'h3' : 'h2'} className="section-title">
                  Welcome to <span>InstitutePro</span>
                </Typography>
                <Typography variant="body1" className="section-text">
                  Our comprehensive Institute Management System provides all the tools you need to
                  efficiently manage your educational institution. From student enrollment to
                  faculty management, attendance tracking to performance analysis - we've got you covered.
                </Typography>
                <div className="action-buttons">
                  <LightPurpleButton
                    variant="contained"
                    component={Link}
                    to="/choose"
                    size={isMobile ? 'medium' : 'large'}
                    sx={{ mr: 2 }}
                  >
                    Login
                  </LightPurpleButton>
                  {/* <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to="/chooseasguest"
                    size={isMobile ? 'medium' : 'large'}
                  >
                    Login as Guest
                  </Button> */}
                </div>
                <Typography variant="body2" className="register-text">
                  Don't have an account?{' '}
                  <Link to="/Adminregister"><u>Sign up now</u></Link>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6} order={isMobile ? 1 : 2}>
              <div className="image-container">
                <img
                  src={HeroImage}
                  alt="Students collaborating on project"
                  loading="lazy"
                />
              </div>
            </Grid>
          </Grid>
        </WelcomeSection>

        {/* Features Section */}
        <FeaturesSection>
          <Typography variant={isMobile ? 'h3' : 'h2'} className="section-title">
            Key Features
          </Typography>
          <Typography variant="body1" className="section-subtitle">
            Everything you need to manage your institution effectively
          </Typography>
          <Grid container spacing={4} className="features-grid">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <div className="feature-card">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <Typography variant="h5" className="feature-title">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" className="feature-description">
                    {feature.description}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </FeaturesSection>

        {/* CTA Section */}
        <CtaSection>
          <div className="cta-content">
            <Typography variant={isMobile ? 'h3' : 'h2'} className="cta-title">
              Ready to transform your institution's management?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size={isMobile ? 'medium' : 'large'}
              component={Link}
              to="/Adminregister"
              sx={{ px: 4, py: 1.5 }}
            >
              Get Started Today
            </Button>
          </div>
        </CtaSection>
      </StyledContainer>

      {/* Footer */}
      <Footer>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <div className="footer-brand">
                <Typography variant="h4" className="brand-name">
                  InstitutePro
                </Typography>
                <Typography variant="body2" className="brand-tagline">
                  Comprehensive solutions for modern educational institutions
                </Typography>
                <div className="social-links">
                  <IconButton aria-label="Facebook" component="a" href="#">
                    <FaFacebookF />
                  </IconButton>
                  <IconButton aria-label="Twitter" component="a" href="#">
                    <FaTwitter />
                  </IconButton>
                  <IconButton aria-label="Instagram" component="a" href="#">
                    <FaInstagram />
                  </IconButton>
                  <IconButton aria-label="LinkedIn" component="a" href="#">
                    <FaLinkedinIn />
                  </IconButton>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="h6" className="footer-heading">
                Quick Links
              </Typography>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="h6" className="footer-heading">
                Resources
              </Typography>
              <ul className="footer-links">
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/docs">Documentation</Link></li>
                <li><Link to="/support">Support</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" className="footer-heading">
                Newsletter
              </Typography>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" />
                <Button variant="contained" color="primary">
                  Subscribe
                </Button>
              </div>
              <Typography variant="body2" className="copyright">
                © {new Date().getFullYear()} InstitutePro. All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Footer>
    </MainWrapper>
  );
};

export default Homepage;

const MainWrapper = styled.div`
  font-family: 'Inter', sans-serif;
  color: #333;
`;

const HeroSection = styled.div`
  position: relative;
  height: 100vh;
  max-height: 800px;
  overflow: hidden;

  .carousel {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    transition: transform 0.6s ease-in-out;
  }

  .slide {
    min-width: 100%;
    height: 100%;
    position: relative;
  }

  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
  }

  .slide-content {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    color: #fff;
    max-width: 600px;
    z-index: 2;
    animation: fadeIn 1s ease-in;
    
    @media (max-width: 768px) {
      left: 5%;
      width: 90%;
    }
    @keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

  }

  .slide-content h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .slide-content p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }

    &.prev {
      left: 2rem;
    }

    &.next {
      right: 2rem;
    }
  }

  .indicators {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.75rem;
    z-index: 10;
  }

  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
    border: none;
    transition: all 0.3s;
    cursor: pointer;
    padding: 0;

    &.active {
      background-color: #fff;
      transform: scale(1.2);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px) translateY(-50%); }
    to { opacity: 1; transform: translateY(0) translateY(-50%); }
  }
`;

const StyledContainer = styled(Container)`
  padding: 5rem 1rem;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const WelcomeSection = styled.div`
  margin-bottom: 5rem;

  .content-box {
    padding: 2rem;
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
    
    @media (max-width: 768px) {
      padding: 1.5rem;
    }
  }

  .section-title {
    font-weight: 700;
    color: #111;
    margin-bottom: 1.5rem;
    line-height: 1.2;

    span {
      color: #7f56da;
    }
  }

  .section-text {
    font-size: 1.15rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 2rem;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .register-text {
    font-size: 0.95rem;
    color: #666;

    a {
      color: #7f56da;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }

   .image-container {
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
        img {
            width: 100%;
            height: auto;
            display: block;
        }
    }
`;
const FeaturesSection = styled.section`
  margin-bottom: 6rem;
  text-align: center;

  .section-title {
    font-weight: 700;
    margin-bottom: 1rem;
    color: #111;
  }

  .section-subtitle {
    color: #666;
    margin-bottom: 3rem;
  }

  .features-grid {
    margin-top: 2rem;
  }

  .feature-card {
    background: #fff;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
    text-align: center;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-5px);
    }

    .feature-icon {
      margin-bottom: 1rem;
    }

    .feature-title {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .feature-description {
      color: #666;
    }
  }
`;

const CtaSection = styled.section`
  background: linear-gradient(135deg, #7f56da, #9f6eed);
  padding: 4rem 2rem;
  border-radius: 1.5rem;
  text-align: center;
  color: #fff;
  margin-top: 4rem;

  .cta-title {
    font-weight: 700;
    margin-bottom: 2rem;
  }
`;

const Footer = styled.footer`
  background-color: #f8f8f8;
  padding: 4rem 2rem;
  margin-top: 6rem;

  .footer-brand {
    .brand-name {
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #111;
    }

    .brand-tagline {
      color: #666;
      margin-bottom: 1.5rem;
    }

    .social-links {
      display: flex;
      gap: 0.75rem;
      margin-top: 1rem;

      a {
        color: #7f56da;
        transition: color 0.3s;

        &:hover {
          color: #5533aa;
        }
      }
    }
  }

  .footer-heading {
    font-weight: 600;
    margin-bottom: 1rem;
    color: #111;
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.5rem;

      a {
        text-decoration: none;
        color: #555;
        transition: color 0.3s;

        &:hover {
          color: #7f56da;
        }
      }
    }
  }

  .newsletter-form {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;

    input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      font-size: 1rem;
    }

    button {
      padding: 0.75rem 2rem;
      font-size: 1rem;
    }
  }

  .copyright {
    margin-top: 2rem;
    color: #999;
    font-size: 0.85rem;
  }
`;
