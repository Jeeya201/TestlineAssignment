import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="decorative-elements">
          <div className="leaf leaf-1"></div>
          <div className="leaf leaf-2"></div>
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="paper-plane"></div>
        </div>
        
        <div className="welcome-card">
          <h1>Welcome to Testline</h1>
          <p>Test your knowledge with our interactive quizzes</p>
          <Link to="/quiz" className="start-button">
            Start Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
