'use client';
import { useState } from 'react';
import { useAuth } from '../../layout';

export default function ProfilePage() {
	const { user, login } = useAuth();
	const [formData, setFormData] = useState({
		email: user?.email || '',
		password: '',
	});
	const [message, setMessage] = useState({ type: '', text: '' });
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage({ type: '', text: '' });

		try {
			// Get all users
			const users = JSON.parse(localStorage.getItem('users') || '[]');

			// Find and update current user
			const updatedUsers = users.map((u) => {
				if (u.id === user.id) {
					const updatedUser = {
						...u,
						email: formData.email,
						...(formData.password && { password: formData.password }),
					};
					// Update current user context
					login(updatedUser);
					return updatedUser;
				}
				return u;
			});

			localStorage.setItem('users', JSON.stringify(updatedUsers));
			setMessage({ type: 'success', text: 'Profile updated successfully!' });
			setFormData({ ...formData, password: '' });
		} catch (error) {
			setMessage({
				type: 'error',
				text: 'Error updating profile. Please try again.',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-2xl">
			<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
				Profile
			</h2>

			<div className="card p-6 mb-6">
				<h3 className="text-xl font-semibold mb-4">User Information</h3>
				<div className="grid grid-cols-2 gap-4 text-sm">
					<div>
						<span className="text-gray-600 dark:text-gray-400">Username:</span>
						<p className="font-medium">{user?.username}</p>
					</div>
					<div>
						<span className="text-gray-600 dark:text-gray-400">Phone:</span>
						<p className="font-medium">{user?.phone || 'Not provided'}</p>
					</div>
				</div>
			</div>

			<div className="card p-6">
				<h3 className="text-xl font-semibold mb-4">Update Profile</h3>

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
						<label className="block text-sm font-medium mb-2">
							New Password (leave blank to keep current)
						</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="input-field"
							minLength="6"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="btn-primary disabled:opacity-50"
					>
						{loading ? 'Updating...' : 'Update Profile'}
					</button>
				</form>
			</div>
		</div>
	);
}
