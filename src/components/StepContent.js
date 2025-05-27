function StepContent({ step, isFinished, theme, messages, descriptions, icons }) {
  return (
    <>
      <div style={{ 
        fontSize: '2em', 
        marginBottom: '10px',
        transition: 'all 0.3s ease'
      }}>
        {icons[step - 1]}
      </div>
      <p className="message" style={{
        fontSize: '1.2em',
        fontWeight: 'bold',
        transition: 'all 0.3s ease'
      }}>
        {isFinished 
          ? "🎉 Congratulations! You've completed the journey! 🎉" 
          : `Step ${step} : ${messages[step - 1]}`
        }
      </p>
      <p className="description" style={{ 
        textAlign: "center", 
        color: theme.text, 
        marginTop: "-20px",
        opacity: 0.8,
        transition: 'all 0.3s ease'
      }}>
        {isFinished 
          ? "You're now ready to start your React journey!" 
          : descriptions[step - 1]
        }
      </p>
    </>
  );
}

export default StepContent;
