import Button from './Button';

function ThemeSwitcher({ currentTheme, onThemeChange, themes }) {
  return (
    <div className="theme-switcher" style={{ position: 'fixed', top: '20px', right: '20px' }}>
      {Object.keys(themes).map(theme => (
        <Button
          key={theme}
          onClick={() => onThemeChange(theme)}
          style={{
            backgroundColor: themes[theme].primary,
            color: '#fff',
            margin: '0 5px',
            opacity: currentTheme === theme ? 1 : 0.7,
          }}
        >
          {theme}
        </Button>
      ))}
    </div>
  );
}

export default ThemeSwitcher;
