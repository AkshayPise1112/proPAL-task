'use client';
import { useState, useEffect, createContext, useContext } from 'react';
import './globals.css';

// Ensure CSS is loaded
if (typeof window !== 'undefined') {
	require('./globals.css');
}

const AuthContext = createContext();
const ThemeContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function useTheme() {
	return useContext(ThemeContext);
}

export default function RootLayout({ children }) {
	const [user, setUser] = useState(null);
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		// Check for saved auth state
		const savedUser = localStorage.getItem('currentUser');
		if (savedUser) {
			setUser(JSON.parse(savedUser));
		}

		// Check for saved theme
		const savedTheme = localStorage.getItem('darkMode');
		if (savedTheme) {
			setDarkMode(JSON.parse(savedTheme));
		}
	}, []);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		localStorage.setItem('darkMode', JSON.stringify(darkMode));
	}, [darkMode]);

	const login = (userData) => {
		setUser(userData);
		localStorage.setItem('currentUser', JSON.stringify(userData));
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('currentUser');
	};

	const toggleTheme = () => {
		setDarkMode(!darkMode);
	};

	return (
		<html lang="en" className={darkMode ? 'dark' : ''}>
			<head>
				<title>Auth Dashboard</title>
				<meta name="description" content="Authentication Dashboard" />
			</head>
			<body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
				<AuthContext.Provider value={{ user, login, logout }}>
					<ThemeContext.Provider value={{ darkMode, toggleTheme }}>
						{children}
					</ThemeContext.Provider>
				</AuthContext.Provider>
			</body>
		</html>
	);
}
