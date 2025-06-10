'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, useTheme } from '../layout';

export default function LoginPage() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [message, setMessage] = useState({ type: '', text: '' });
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { login } = useAuth();
	const { darkMode, toggleTheme } = useTheme();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage({ type: '', text: '' });

		try {
			// Get users from localStorage
			const users = JSON.parse(localStorage.getItem('users') || '[]');

			const user = users.find(
				(u) => u.email === formData.email && u.password === formData.password
			);

			if (user) {
				login(user);
				setMessage({ type: 'success', text: 'Login successful!' });
				setTimeout(() => {
					router.push('/dashboard');
				}, 1000);
			} else {
				setMessage({ type: 'error', text: 'Invalid email or password' });
			}
		} catch (error) {
			setMessage({ type: 'error', text: 'Login failed. Please try again.' });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
			<div className="max-w-md w-full">
				<div className="card p-8">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-3xl font-bold">Sign In</h2>
						<button
							onClick={toggleTheme}
							className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
						>
							{darkMode ? '☀️' : '🌙'}
						</button>
					</div>

					{message.text && (
						<div
							className={`p-3 rounded-lg mb-4 ${
								message.type === 'error'
									? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
									: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
							}`}
						>
							{message.text}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-sm font-medium mb-2">Email</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="input-field"
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-2">Password</label>
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								className="input-field"
								required
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full btn-primary py-3 disabled:opacity-50"
						>
							{loading ? 'Signing In...' : 'Sign In'}
						</button>
					</form>

					<p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
						Don't have an account?{' '}
						<Link
							href="/signup"
							className="text-primary-600 hover:text-primary-700 font-medium"
						>
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
