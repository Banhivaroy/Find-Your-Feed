import React from 'react'
import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const sentences = [
  "Need to Find your feed?",
  "हर निवाला मायने रखता है...",
  "Every empty tummy matters..."
];
function LandingPage() {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const words = sentences[sentenceIndex].split(" ");

    if (wordIndex < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) =>
          prev ? prev + " " + words[wordIndex] : words[wordIndex]
        );
        setWordIndex((prev) => prev + 1);
      }, 350); // speed between words

      return () => clearTimeout(timeout);
    } else {
      // Pause before next sentence
      const pause = setTimeout(() => {
        setDisplayedText("");
        setWordIndex(0);
        setSentenceIndex((prev) => (prev + 1) % sentences.length);
      }, 1800);

      return () => clearTimeout(pause);
    }
  }, [wordIndex, sentenceIndex]);
  return (
    <>
      <div className='landing-page'>
        <div className="hero-heading">
            <h1 className="main-title">Find Your Feed</h1>
        <div className="sub-title">अपना निवाला</div>
       </div>
      <div className='glass-box'>
       <h1 className='animated-text'>{displayedText}</h1>
      </div>
      <div className='auth-buttons'>
       
        <button className="auth-btn" onClick={() => navigate('/signup')}>Sign Up</button>
        <button className="auth-btn" onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
    </>
  )
}

export default LandingPage
