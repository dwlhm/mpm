import * as React from 'react'

export interface AuthContext {
    isAuthenticated: boolean
    login: (username: string) => Promise<void>
    logout: () => Promise<void>
    token: string | null
}

const AuthContext = React.createContext<AuthContext | null>(null)

const key = 'auth.token'

function getStoredToken() {
    return localStorage.getItem(key)
}

function setStoredToken(token: string | null) {
    if (token) {
        localStorage.setItem(key, token)
    } else {
        localStorage.removeItem(key)
    }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = React.useState<string | null>(getStoredToken())
    const isAuthenticated = !!token

    const logout = React.useCallback(async () => {
        setStoredToken(null)
        setToken(null)
    }, [])

    const login = React.useCallback(async (token: string) => {
        setStoredToken(token)
        setToken(token)
    }, [])

    React.useEffect(() => {
        setToken(getStoredToken())
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}