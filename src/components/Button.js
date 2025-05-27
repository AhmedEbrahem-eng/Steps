function Button({ children, style, ...props }) {
  return (
    <button
      style={{
        padding: '5px 10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
