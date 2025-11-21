import { useEffect, useState } from 'react'

export default function ToggleTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')


  useEffect(() => {
    const theme = dark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [dark]);


  return (
    <>
    <button className="btn" onClick={() => setDark((d) => !d)}>
      {dark ? 'Light' : 'Dark'}
    </button>
    </>
  )
}