import React, { useEffect } from "react";
import { useState } from "react";
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';

import ThemeSwitcher from './components/ThemeSwitcher';
import ProgressBar from './components/ProgressBar';
import StepNumbers from './components/StepNumbers';
import StepContent from './components/StepContent';
import StepButtons from './components/StepButtons';

const THEMES = {
  light: {
    primary: "#7950f2",
    secondary: "#4CAF50",
    background: "#ffffff",
    text: "#333333"
  },
  dark: {
    primary: "#9f7aea",
    secondary: "#68d391",
    background: "#1a202c",
    text: "#ffffff"
  },
  ocean: {
    primary: "#4299e1",
    secondary: "#48bb78",
    background: "#ebf8ff",
    text: "#2d3748"
  }
};

const STEPS = {
  messages: [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
  ],
  descriptions: [
    "Start your journey with React fundamentals",
    "Find your dream job in tech",
    "Make your money work for you",
  ],
  icons: ["📚", "💼", "💰"],
  total: 3
};

function App() {
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrevious = React.useCallback(() => {
    if (step > 1 && !isAnimating) {
      setIsAnimating(true);
      setStep(prev => {
        setCompletedSteps(current => current.filter(s => s !== prev - 1));
        return prev - 1;
      });
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [step, isAnimating]);

  const handleNext = React.useCallback(() => {
    if (step < STEPS.total && !isAnimating) {
      setIsAnimating(true);
      setStep(prev => {
        setCompletedSteps(current => [...current, prev]);
        return prev + 1;
      });
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [step, isAnimating]);

  const handleReset = React.useCallback(() => {
    Swal.fire({
      title: 'Reset Progress?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: THEMES[currentTheme].primary,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset it!',
      background: THEMES[currentTheme].background,
      color: THEMES[currentTheme].text
    }).then((result) => {
      if (result.isConfirmed) {
        setStep(1);
        setCompletedSteps([]);
        setIsFinished(false);
        Swal.fire({
          title: 'Reset!',
          text: 'Your progress has been reset.',
          icon: 'success',
          background: THEMES[currentTheme].background,
          color: THEMES[currentTheme].text
        });
      }
    });
  }, [currentTheme]);

  const handleFinish = React.useCallback(() => {
    setCompletedSteps(current => [...current, STEPS.total]);
    setIsFinished(true);
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    Swal.fire({
      title: '🎉 Congratulations!',
      text: 'You have successfully completed all steps!',
      icon: 'success',
      confirmButtonColor: THEMES[currentTheme].primary,
      confirmButtonText: 'Start Again',
      background: THEMES[currentTheme].background,
      color: THEMES[currentTheme].text,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        handleReset();
      }
    });
  }, [currentTheme, handleReset]);

  const handleThemeChange = React.useCallback((theme) => {
    setCurrentTheme(theme);
    document.body.style.backgroundColor = THEMES[theme].background;
    document.body.style.color = THEMES[theme].text;
  }, []);

  const handleKeyDown = React.useCallback((e) => {
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrevious();
  }, [handleNext, handlePrevious]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const progress = (step / STEPS.total) * 100;

  return (
    <>
      <ThemeSwitcher 
        currentTheme={currentTheme} 
        onThemeChange={handleThemeChange} 
        themes={THEMES}
      />
      
      <div className="steps" style={{
        backgroundColor: THEMES[currentTheme].background,
        color: THEMES[currentTheme].text,
        transition: 'all 0.3s ease',
        transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
        opacity: isAnimating ? 0.8 : 1,
        padding: '32px',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.10)',
        maxWidth: '900px',
        margin: '48px auto'
      }}>
        <ProgressBar 
          progress={progress} 
          theme={THEMES[currentTheme]} 
        />

        <StepNumbers 
          total={STEPS.total}
          currentStep={step}
          completedSteps={completedSteps}
          theme={THEMES[currentTheme]}
        />

        <StepContent 
          step={step}
          isFinished={isFinished}
          theme={THEMES[currentTheme]}
          messages={STEPS.messages}
          descriptions={STEPS.descriptions}
          icons={STEPS.icons}
        />

        <StepButtons 
          step={step}
          isFinished={isFinished}
          theme={THEMES[currentTheme]}
          total={STEPS.total}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onReset={handleReset}
          onFinish={handleFinish}
        />
      </div>
    </>
  );
}

export default App;
