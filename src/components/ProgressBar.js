function ProgressBar({ progress, theme }) {
  return (
    <div className="progress-bar" style={{ 
      width: "100%", 
      height: "4px", 
      backgroundColor: "#e7e7e7", 
      borderRadius: "2px",
      marginBottom: "20px"
    }}>
      <div style={{ 
        width: `${progress}%`, 
        height: "100%", 
        backgroundColor: theme.primary,
        borderRadius: "2px",
        transition: "width 0.3s ease"
      }} />
    </div>
  );
}

export default ProgressBar;
