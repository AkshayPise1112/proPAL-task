'use client';
import Link from 'next/link';
import { useTheme } from './layout';

export default function HomePage() {
	const { darkMode, toggleTheme } = useTheme();

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
			<nav className="p-6">
				<div className="max-w-7xl mx-auto flex justify-between items-center">
					<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
						PropAI Dashboard
					</h1>
					<button
						onClick={toggleTheme}
						className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
					>
						{darkMode ? '☀️' : '🌙'}
					</button>
				</div>
			</nav>

			<main className="max-w-5xl mx-auto px-6 py-20">
				<div className="text-center">
					<h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
						Welcome to Your Dashboard
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
						Manage your profile, configure AI agents, and control your settings
						all in one place.
					</p>

					<div className="flex gap-4 justify-center">
						<Link href="/signup" className="btn-primary text-lg px-8 py-3">
							Get Started
						</Link>
						<Link href="/login" className="btn-secondary text-lg px-8 py-3">
							Sign In
						</Link>
					</div>
				</div>

				<div className="mt-20 grid md:grid-cols-2 gap-4">
					<div className="card p-8">
						<div className="text-3xl mb-4">🎯</div>
						<h3 className="text-2xl font-semibold mb-3">
							Enterprise-ready Voice AI platform
						</h3>
						<p className="text-gray-600 dark:text-gray-300">
							Our platform helps businesses create custom AI voice agents that
							deliver 10x productivity across all customer interactions.
						</p>
					</div>

					<div className="card p-8">
						<div className="text-3xl mb-4">🤖</div>
						<h3 className="text-2xl font-semibold mb-3">
							Human-like Conversations
						</h3>
						<p className="text-gray-600 dark:text-gray-300">
							Our AI-powered voice agents create human-like, emotionally
							expressive conversations that transform customer interactions
							across your business.
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
