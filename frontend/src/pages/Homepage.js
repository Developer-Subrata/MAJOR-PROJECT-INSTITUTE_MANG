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

// Import images
import HeroImage from "../assets/institution-background.jpg";
import SlideImage1 from "../assets/institution-background1.jpg";
import SlideImage2 from "../assets/institution-background.jpg";
import SlideImage3 from "../assets/institution-background1.jpg";
// import Pattern from "../assets/p";

const Homepage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const slides = [
        { 
            image: SlideImage1, 
            alt: "Students learning in classroom",
            title: "Empowering Education",
            subtitle: "Comprehensive solutions for modern educational institutions"
        },
        { 
            image: SlideImage2, 
            alt: "School building exterior",
            title: "Streamlined Administration",
            subtitle: "Simplify your institution's management processes"
        },
        { 
            image: SlideImage3, 
            alt: "Teacher helping students",
            title: "Enhanced Learning Experience",
            subtitle: "Tools to support both educators and learners"
        }
    ];

    // Auto-advance carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 1000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
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

    return (
        <MainWrapper>
            {/* Hero Carousel Section */}
            <HeroSection>
                <div className="carousel">
                    {slides.map((slide, index) => (
                        <div 
                            key={index}
                            className={`slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            <img src={slide.image} alt={slide.alt} />
                            <div className="overlay"></div>
                            <div className="slide-content">
                                <h1>{slide.title}</h1>
                                <p>{slide.subtitle}</p>
                                <div className="cta-buttons">
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        component={Link} 
                                        to="/choose"
                                        sx={{ mr: 2 }}
                                    >
                                        Get Started
                                    </Button>
                                    <Button 
                                        variant="outlined" 
                                        color="inherit"
                                        component={Link} 
                                        to="/chooseasguest"
                                    >
                                        Explore Demo
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
                                <Typography variant="h2" className="section-title">
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
                                        sx={{ mr: 2 }}
                                    >
                                        Login
                                    </LightPurpleButton>
                                    <Button 
                                        variant="outlined" 
                                        color="primary"
                                        component={Link} 
                                        to="/chooseasguest"
                                    >
                                        Login as Guest
                                    </Button>
                                </div>
                                <Typography variant="body2" className="register-text">
                                    Don't have an account?{' '}
                                    <Link to="/Adminregister"><u>Sign up now</u></Link>
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} order={isMobile ? 1 : 2}>
                            <div className="image-container">
                                <img src={HeroImage} alt="Students collaborating" />
                            </div>
                        </Grid>
                    </Grid>
                </WelcomeSection>

                {/* Features Section */}
                <FeaturesSection>
                    <Typography variant="h2" className="section-title">
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
                        <Typography variant="h2" className="cta-title">
                            Ready to transform your institution's management?
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="large"
                            component={Link} 
                            to="/Adminregister"
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
                                Connect With Us
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
  .carousel {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .slide {
    width: 100%;
    height: 100%;
    transition: transform 0.6s ease-in-out;
    position: relative;
  }

  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  }

  .slide-content h1 {
    font-size: 3rem;
    font-weight: 700;
  }

  .slide-content p {
    font-size: 1.2rem;
    margin-top: 10px;
  }

  .cta-buttons {
    margin-top: 25px;
  }

  .indicators {
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
  }

  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
    border: none;
    transition: background 0.3s;
    cursor: pointer;

    &.active {
      background-color: #fff;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const StyledContainer = styled(Container)`
  padding: 80px 16px;
`;

const WelcomeSection = styled.div`
  .content-box {
    padding: 30px;
    background: #fefefe;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  }

  .section-title {
    font-size: 2.75rem;
    font-weight: 700;
    color: #111;
  }

  .section-title span {
    color: #7f56da;
  }

  .section-text {
    font-size: 1.15rem;
    line-height: 1.6;
    margin-top: 20px;
    color: #555;
  }

  .action-buttons {
    margin-top: 30px;
  }

  .register-text {
    margin-top: 16px;
    font-size: 0.95rem;
  }

  .image-container img {
    width: 100%;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const FeaturesSection = styled.div`
  text-align: center;
  margin-top: 100px;

  .section-title {
    font-size: 2.5rem;
    font-weight: 600;
  }

  .section-subtitle {
    font-size: 1.1rem;
    color: #777;
    margin-top: 10px;
    margin-bottom: 50px;
  }

  .features-grid {
    margin-top: 30px;
  }

  .feature-card {
    background: white;
    border-radius: 16px;
    padding: 30px 20px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-8px);
    }
  }

  .feature-title {
    margin-top: 20px;
    font-size: 1.3rem;
    font-weight: 600;
  }

  .feature-description {
    color: #666;
    font-size: 1rem;
    margin-top: 10px;
  }
`;

const CtaSection = styled.div`
  background: linear-gradient(to right, #7f56da, #9e68ec);
  padding: 70px 20px;
  text-align: center;
  color: white;

  .cta-title {
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: 30px;
  }

  .cta-content {
    max-width: 700px;
    margin: 0 auto;
  }

  button {
    background-color: white !important;
    color: #7f56da !important;
    font-weight: bold;
  }
`;

const Footer = styled.footer`
  background-color: #1a1a1a;
  color: #ccc;
  padding: 60px 20px;

  .footer-heading {
    font-size: 1.3rem;
    margin-bottom: 20px;
    font-weight: 600;
    color: white;
  }

  .footer-links {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 12px;
    }

    a {
      color: #ccc;
      text-decoration: none;

      &:hover {
        color: #fff;
      }
    }
  }

  .footer-brand .brand-name {
    color: white;
    font-size: 1.8rem;
    font-weight: bold;
  }

  .brand-tagline {
    margin-top: 10px;
    font-size: 0.95rem;
    color: #aaa;
  }

  .social-links {
    display: flex;
    gap: 16px;
    margin-top: 20px;

    a {
      color: #aaa;
      transition: color 0.3s;

      &:hover {
        color: white;
      }
    }
  }
`;

