import React from 'react';
import './AboutPage.css';

// A custom hook to detect when an element is visible in the viewport
const useOnScreen = (options) => {
  const ref = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

// Reusable components for new sections
const TimelineItem = ({ year, title, children, image }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.5 });
  return (
    <div ref={ref} className={`timeline-item ${isVisible ? 'is-visible' : ''}`}>
      <div className="timeline-dot"></div>
      <div className="timeline-content">
        <div className="timeline-year">{year}</div>
        <h3 className="timeline-title">{title}</h3>
        <p className="timeline-description">{children}</p>
      </div>
      <div className="timeline-image-container">
        <img src={image} alt={title} className="timeline-image" />
      </div>
    </div>
  );
};

const ValueCard = ({ icon, title, children }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.5, triggerOnce: true });
    return (
        <div ref={ref} className={`value-card ${isVisible ? 'is-visible' : ''}`}>
            <div className="value-icon">{icon}</div>
            <h3 className="value-title">{title}</h3>
            <p className="value-description">{children}</p>
        </div>
    );
};


function AboutPage() {
  const [missionRef, missionVisible] = useOnScreen({ threshold: 0.5, triggerOnce: true });
  const [visionRef, visionVisible] = useOnScreen({ threshold: 0.5, triggerOnce: true });
  const [aimRef, aimVisible] = useOnScreen({ threshold: 0.5, triggerOnce: true });

  return (
    <main className="about-page">
      <header className="about-header">
        <h1 className="about-title">
          <span>
            <span>About</span>
          </span>
          <span>Co.Work</span>
        </h1>
        <p className="about-subtitle">We aren't just building workspaces. We're engineering the future of professional life.</p>
      </header>

      <section className="tenets-section">
        <div ref={missionRef} className={`tenet-card ${missionVisible ? 'is-visible' : ''}`}>
          <h2 className="tenet-title">Our Mission</h2>
          <p>To architect intelligent ecosystems where technology, design, and community converge. We empower Pune's brightest minds by eliminating friction and amplifying focus, transforming the very definition of a productive day.</p>
        </div>
        <div ref={visionRef} className={`tenet-card ${visionVisible ? 'is-visible' : ''}`}>
          <h2 className="tenet-title">Our Vision</h2>
          <p>To be the central node in Pune's innovation network—the catalyst for a new generation of entrepreneurs, creators, and global leaders. We build the environments where the future is realized, today.</p>
        </div>
      </section>
      
      <section className="values-section">
        <h2 className="section-title">Our Core Values</h2>
        <div className="values-grid">
          <ValueCard icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>} title="Innovation">
            We are relentlessly forward-thinking, integrating emerging technologies to create a workspace that is predictive, responsive, and seamlessly intelligent.
          </ValueCard>
          <ValueCard icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>} title="Community">
            We actively cultivate a curated network of professionals, fostering an environment where collaboration happens organically and valuable connections are made.
          </ValueCard>
          <ValueCard icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>} title="Excellence">
            From our enterprise-grade network to our concierge-level service, we are uncompromising in our pursuit of quality, ensuring a world-class experience in every detail.
          </ValueCard>
        </div>
      </section>

      <section className="timeline-section">
        <h2 className="section-title">The Co.Work Journey</h2>
        <div className="timeline">
          <TimelineItem 
            year="2023" 
            title="The Genesis"
            // --- THIS IS THE NEW, CORRECTED IMAGE URL ---
            image="https://images.unsplash.com/photo-1671722294182-ed01cbe66bd1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b2ZmaWNlJTIwZ2VuZXNpc3xlbnwwfHwwfHx8MA%3D%3D">
            Born from data-driven analysis of modern workflow inefficiencies, the Co.Work blueprint was engineered. The mission: to construct a workspace operating system, not just an office.
          </TimelineItem>
          <TimelineItem 
            year="2024" 
            title="Materialization"
            image="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=2070&auto=format=fit=crop">
            Our flagship Pune campus was constructed with a focus on sustainable, smart materials and modular design. The space was built as a platform, ready for integration with our proprietary management software.
          </TimelineItem>
          <TimelineItem 
            year="2025" 
            title="Activation"
            image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format=fit=crop">
            Co.Work activates, onboarding a curated community of innovators. The network goes live, and our integrated platform offers members seamless, predictive control over their environment and resources.
          </TimelineItem>
        </div>
      </section>
      
      <section ref={aimRef} className={`aim-section ${aimVisible ? 'is-visible' : ''}`}>
        <div className="aim-content">
          <h2 className="section-title">Our Aim</h2>
          <p>Our ultimate aim is not to simply provide real estate, but to offer a dynamic platform for growth. We are engineering an ecosystem where productivity is effortless, collaboration is inevitable, and every member is empowered to achieve their peak potential. We're building the launchpad for Pune's next great ventures.</p>
        </div>
        <div className="aim-image-container">
          <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format=fit=crop" alt="A team achieving a breakthrough moment" />
        </div>
      </section>
    </main>
  );
}

export default AboutPage;