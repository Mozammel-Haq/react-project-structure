import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext =createContext()
export function ThemeProvider({children}){

    const [theme, setTheme] = useState(()=>localStorage.getItem('ss-theme') || 'light')

    useEffect(()=>{
        document.documentElement.classList.remove('light','dark')
        document.documentElement.classList.add(theme)

        localStorage.setItem("ss-theme",theme)
    },[theme])

    function toggleTheme(){
        setTheme((prev)=> (prev === 'light'? 'dark' : 'light'))
    }

    const value = {theme,toggleTheme}

  return (
    <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(){
    return useContext(ThemeContext)
}
