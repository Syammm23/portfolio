import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // --- AUTOMATIC EXPERIENCE CALCULATION LOGIC ---
  const [telusExp, setTelusExp] = useState(0);
  const [totalExpString, setTotalExpString] = useState("");

  useEffect(() => {
    // 1. Set Telus Start Date (YYYY-MM-DD)
    // October 1, 2025 set kiya hai taaki abhi (Jan 2026) me 3 Months dikhe.
    const telusStartDate = new Date("2025-10-01"); 
    const currentDate = new Date();

    // Calculate months difference
    let months = (currentDate.getFullYear() - telusStartDate.getFullYear()) * 12;
    months -= telusStartDate.getMonth();
    months += currentDate.getMonth();
    
    // Ensure minimum 1 month if just started
    const calculatedTelusMonths = months <= 0 ? 1 : months;
    setTelusExp(calculatedTelusMonths);

    // 2. Calculate Total Experience (Reliance 9 Months + Telus Dynamic)
    const relianceMonths = 9; 
    const totalMonths = relianceMonths + calculatedTelusMonths;

    if (totalMonths >= 12) {
      // Agar 12 mahine se zyada hai to Years me dikhao
      const years = (totalMonths / 12).toFixed(1); 
      setTotalExpString("1+ Year"); 
    } else {
      setTotalExpString(`${totalMonths} Months`);
    }

  }, []);

  return (
    <div className="layout-container">
      
      {/* --- LEFT SIDEBAR --- */}
      <aside className="sidebar">
        <div className="profile-section">
          <div className="img-container">
            {/* Make sure photo is in public folder */}
            <img src="/Syam01.jpg" alt="Syam Kumar Prasad" className="profile-img" />
          </div>
          <h1>Syam Kumar Prasad</h1>
          <p className="tagline">BCA Student | Analyst</p>
          <div className="divider"></div>
        </div>

        {/* Sidebar Contact Links */}
        <div className="sidebar-contact">
          <h3>Connect Me</h3>
          
          <a href="tel:+917990853947" className="side-link">
            <div className="icon-box phone-icon"><i className="fas fa-phone-volume"></i></div>
            <span>+91 79908 53947</span>
          </a>

          <a href="mailto:shyamkumarprasad3322@gmail.com" className="side-link">
            <div className="icon-box email-icon"><i className="fas fa-envelope"></i></div>
            <span>Email Me</span>
          </a>

          <a href="https://github.com/Syamm23" target="_blank" rel="noreferrer" className="side-link">
            <div className="icon-box github-icon"><i className="fab fa-github"></i></div>
            <span>GitHub</span>
          </a>

          <a href="https://instagram.com/mr.syamm" target="_blank" rel="noreferrer" className="side-link">
  <div className="icon-box insta-icon"><i className="fab fa-instagram"></i></div>
  <span>Instagram</span>
</a>

<a href="https://www.linkedin.com/in/syammprasad" target="_blank" rel="noreferrer" className="side-link">
  <div className="icon-box linkedin-icon"><i className="fab fa-linkedin-in"></i></div>
  <span>LinkedIn</span>
</a>
          <a href="https://facebook.com/Mr.syamm" target="_blank" rel="noreferrer" className="side-link">
            <div className="icon-box fb-icon"><i className="fab fa-facebook-f"></i></div>
            <span>Facebook</span>
          </a>
          
        </div>
      </aside>


      {/* --- RIGHT MAIN CONTENT --- */}
      <main className="main-content">
        
        {/* ABOUT ME SECTION */}
<section id="about" className="fade-in">
  <h2 className="section-title">
    About <span className="gradient-text">Me</span>
  </h2>

  <div className="glass-card about-card">
    <p>
      Hi! I am a <strong>BCA Student (4th Sem)</strong> with experience in 
      <strong> data evaluation</strong> and strong interest in 
      <strong> web development</strong>. I enjoy working on computer-based tasks 
      and continuously improving my technical skills.
    </p>

    <br />

    <p>
      I have worked as a <strong>Search Quality Rater</strong> with 
      <strong> Telus Digital & Welocalize</strong>, where I evaluated search results 
      and improved data quality for AI systems. I also have practical experience as a 
      <strong> Billing Associate at Reliance Smart Bazaar</strong>, handling customer 
      transactions and daily operations efficiently.
    </p>

    <br />

    <p>
      I am a disciplined and quick learner, currently focusing on building my skills in 
      web development while gaining real-world work experience.
    </p>

    {/* DYNAMIC STATS */}
    <div className="about-stats">
      <div className="stat">
        <span className="stat-num">4th</span>
        <span className="stat-label">Sem BCA</span>
      </div>

      <div className="stat">
        <span className="stat-num">7+</span>
        <span className="stat-label">Current CGPA</span>
      </div>

      <div className="stat">
        <span className="stat-num">{totalExpString}</span>
        <span className="stat-label">Total Work Exp</span>
      </div>
    </div>
  </div>
</section>

        {/* SKILLS SECTION */}
        <section id="skills">
          <h2 className="section-title">Technical <span className="gradient-text">Skills</span></h2>
          <div className="skills-container">
            <div className="skill-pill"><i className="fas fa-chart-line" style={{color:'#2ecc71'}}></i> Data Analysis</div>
            <div className="skill-pill"><i className="fab fa-html5"></i> HTML5</div>
            <div className="skill-pill"><i className="fab fa-css3-alt"></i> CSS3</div>
            <div className="skill-pill"><i className="fab fa-js"></i> JavaScript</div>
            <div className="skill-pill"><i className="fab fa-python"></i> Python</div>
            <div className="skill-pill"><i className="fab fa-react"></i> React Basics</div>
            <div className="skill-pill"><i className="fas fa-database"></i>DBMS</div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
<section id="experience">
  <h2 className="section-title">Work Experience</h2>
  <div className="grid-container">

    {/* TELUS DIGITAL */}
    <div className="glass-card">
      <h3>Search Quality Rater</h3>
      <span className="subtitle">
        Telus Digital | {telusExp} Months (Present)
      </span>
      <p>
        Worked on evaluating search engine results and improving data quality for AI systems. 
        Analyzed user intent, reviewed datasets for accuracy and relevance, and followed strict 
        guidelines to maintain consistency.
      </p>
    </div>

    {/* WELOCALIZE */}
    <div className="glass-card">
      <h3>Ads Quality Rater</h3>
      <span className="subtitle">
        Welocalize | {weloExp} Months (Present)
      </span>
      <p>
        Evaluated online advertisements for relevance and quality across different markets. 
        Performed data-driven analysis to support search engine optimization and improve user experience.
      </p>
    </div>

    {/* RELIANCE */}
    <div className="glass-card">
      <h3>Retail Associate (Billing)</h3>
      <span className="subtitle">
        Reliance Smart Bazaar | 10 Months
      </span>
      <p>
        Handled billing operations using POS systems, managed customer transactions including 
        cash, card, and digital payments, and ensured smooth and efficient customer service.
      </p>
    </div>

  </div>
</section>

        {/* EDUCATION SECTION (Added Percentage Here) */}
        <section id="education">
          <h2 className="section-title">Education</h2>
          <div className="grid-container">
            <div className="glass-card">
              <h3>Bachelor of Computer Applications</h3>
              <span className="subtitle">Rajju Shroff ROFEL Institute | 4th Semester</span>
              <p>Specializing in Programming, Database Management (DBMS), and Web Technologies.</p>
              <p style={{marginTop: '10px', color: '#fff'}}><strong>CGPA: 7+</strong></p>
            </div>
            <div className="glass-card">
              <h3>Higher Secondary (12th)</h3>
              <span className="subtitle">Shree Machhi Mahajan School, Daman</span>
              <p>Completed higher secondary education in Science stream.</p>
              {/* Added Percentage Here */}
              <p style={{marginTop: '10px', color: '#fff'}}><strong>Percentage: 72%</strong></p>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects">
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <div className="grid-container">
            <div className="glass-card project-card">
              <div className="card-icon"><i className="fas fa-robot"></i></div>
              <h3>Annie AI Assistant</h3>
              <p>A Python-based desktop voice assistant created to automate daily PC tasks and retrieve information.</p>
            </div>
            
            <div className="glass-card project-card">
               <div className="card-icon"><i className="fas fa-code"></i></div>
              <h3>React Portfolio</h3>
              <p>Built this modern, responsive portfolio website using React.js and advanced CSS.</p>
            </div>
            
             <div className="glass-card project-card">
               <div className="card-icon"><i className="fas fa-chart-bar"></i></div>
              <h3>Data Quality Analysis</h3>
              <p>Worked on evaluating large datasets to identify patterns and improve data integrity for AI models.</p>
            </div>

          </div>
        </section>

        <footer>
          <p>© 2026 Syam Kumar Prasad. All Rights Reserved.</p>
        </footer>

      </main>
    </div>
  );
}

export default App;