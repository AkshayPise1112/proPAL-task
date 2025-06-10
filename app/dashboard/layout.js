'use client';
import { useAuth, useTheme } from '../layout';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
	const { user, logout } = useAuth();
	const { darkMode, toggleTheme } = useTheme();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (!user) {
			router.push('/login');
		}
	}, [user, router]);

	if (!user) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
					<p className="text-gray-600 dark:text-gray-400">Loading...</p>
				</div>
			</div>
		);
	}

	const navigation = [
		{ name: 'Profile', href: '/dashboard/profile', icon: '👤' },
		{ name: 'Agent', href: '/dashboard/agent', icon: '🤖' },
	];

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Header */}
			<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
				<div className="px-6 py-4">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
							Dashboard
						</h1>
						<div className="flex items-center gap-4">
							<button
								onClick={toggleTheme}
								className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
							>
								{darkMode ? '☀️' : '🌙'}
							</button>
							<span className="text-sm text-gray-600 dark:text-gray-400">
								Welcome, {user.username}!
							</span>
							<button
								onClick={logout}
								className="text-sm text-red-600 hover:text-red-700 font-medium"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</header>

			<div className="flex">
				{/* Sidebar */}
				<nav className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
					<div className="p-6">
						<ul className="space-y-2">
							{navigation.map((item) => {
								const isActive = pathname === item.href;
								return (
									<li key={item.name}>
										<Link
											href={item.href}
											className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
												isActive
													? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
													: 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
											}`}
										>
											<span className="text-lg">{item.icon}</span>
											<span className="font-medium">{item.name}</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</nav>

				{/* Main Content */}
				<main className="flex-1 p-6">{children}</main>
			</div>
		</div>
	);
}
