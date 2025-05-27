function StepNumbers({ total, currentStep, completedSteps, theme }) {
  return (
    <div className="numbers">
      {Array.from({ length: total }, (_, i) => i + 1).map((stepNumber) => (
        <div
          key={stepNumber}
          className={`${currentStep >= stepNumber ? "active" : ""} ${
            completedSteps.includes(stepNumber) ? "completed" : ""
          }`}
          style={{
            backgroundColor: currentStep >= stepNumber ? theme.primary : '#e7e7e7',
            color: currentStep >= stepNumber ? '#fff' : '#666',
            transition: 'all 0.3s ease'
          }}
        >
          {stepNumber}
        </div>
      ))}
    </div>
  );
}

export default StepNumbers;
