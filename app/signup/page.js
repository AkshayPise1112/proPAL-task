'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, useTheme } from '../layout';

export default function SignUpPage() {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		phone: '',
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
			// Get existing users
			let users = [];
			try {
				const existingUsers = localStorage.getItem('users');
				if (existingUsers) {
					users = JSON.parse(existingUsers);
				}
			} catch (error) {
				console.log('No existing users found');
			}

			// Check if user already exists
			const existingUser = users.find((user) => user.email === formData.email);
			if (existingUser) {
				setMessage({
					type: 'error',
					text: 'User with this email already exists',
				});
				setLoading(false);
				return;
			}

			// Create new user
			const newUser = {
				id: Date.now().toString(),
				...formData,
				createdAt: new Date().toISOString(),
			};

			users.push(newUser);
			localStorage.setItem('users', JSON.stringify(users));

			setMessage({ type: 'success', text: 'Account created successfully!' });

			// Auto-login the new user
			login(newUser);

			setTimeout(() => {
				router.push('/dashboard');
			}, 1500);
		} catch (error) {
			setMessage({
				type: 'error',
				text: 'Error creating account. Please try again.',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
			<div className="max-w-md w-full">
				<div className="card p-8">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-3xl font-bold text-center">Sign Up</h2>
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
							<label className="block text-sm font-medium mb-2">Username</label>
							<input
								type="text"
								name="username"
								value={formData.username}
								onChange={handleChange}
								className="input-field"
								required
							/>
						</div>

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
								minLength="6"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-2">
								Phone (Optional)
							</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								className="input-field"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full btn-primary py-3 disabled:opacity-50"
						>
							{loading ? 'Creating Account...' : 'Sign Up'}
						</button>
					</form>

					<p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
						Already have an account?{' '}
						<Link
							href="/login"
							className="text-primary-600 hover:text-primary-700 font-medium"
						>
							Sign In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
