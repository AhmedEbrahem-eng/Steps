import Button from './Button';

function StepButtons({ step, isFinished, theme, total, onPrevious, onNext, onReset, onFinish }) {
  return (
    <div className="buttons">
      <Button
        style={{ 
          backgroundColor: theme.primary, 
          color: "#fff",
        }}
        onClick={onPrevious}
        disabled={step === 1 || isFinished}
      >
        Previous
      </Button>
      <Button
        style={{ 
          backgroundColor: theme.primary, 
          color: "#fff",
        }}
        onClick={onReset}
        disabled={step === 1}
      >
        Reset
      </Button>
      {step === total && !isFinished ? (
        <Button
          style={{ 
            backgroundColor: theme.secondary, 
            color: "#fff",
          }}
          onClick={onFinish}
        >
          Finish Journey
        </Button>
      ) : (
        <Button
          style={{ 
            backgroundColor: theme.primary, 
            color: "#fff",
          }}
          onClick={onNext}
          disabled={step === total || isFinished}
        >
          Next
        </Button>
      )}
    </div>
  );
}

export default StepButtons;
