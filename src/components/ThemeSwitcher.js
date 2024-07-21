import React from 'react';

const ThemeSwitcher = ({ setTheme }) => {
  const themes = ['default', 'light', 'dark'];

  return (
    <div className="theme-switcher">
      {themes.map(theme => (
        <button key={theme} onClick={() => setTheme(theme)}>
          {theme}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;