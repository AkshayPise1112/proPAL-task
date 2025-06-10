'use client';
import { useState, useEffect } from 'react';

export default function AgentPage() {
	const [config, setConfig] = useState({
		provider: '',
		model: '',
		language: '',
	});
	const [sttData, setSttData] = useState(null);
	const [message, setMessage] = useState({ type: '', text: '' });

	// Sample STT configuration data
	const defaultSttData = {
		providers: {
			deepgram: {
				name: 'Deepgram',
				models: {
					'nova-2': {
						name: 'Nova-2',
						languages: {
							'en-US': 'English-US',
							'en-GB': 'English-UK',
							'es-ES': 'Spanish-Spain',
							'fr-FR': 'French-France',
						},
					},
					base: {
						name: 'Base',
						languages: {
							'en-US': 'English-US',
							'es-ES': 'Spanish-Spain',
						},
					},
				},
			},
			openai: {
				name: 'OpenAI',
				models: {
					'whisper-1': {
						name: 'Whisper-1',
						languages: {
							en: 'English',
							es: 'Spanish',
							fr: 'French',
							de: 'German',
						},
					},
				},
			},
			google: {
				name: 'Google Cloud',
				models: {
					latest_long: {
						name: 'Latest Long',
						languages: {
							'en-US': 'English-US',
							'zh-CN': 'Chinese-Simplified',
							'ja-JP': 'Japanese',
						},
					},
					latest_short: {
						name: 'Latest Short',
						languages: {
							'en-US': 'English-US',
							'es-ES': 'Spanish-Spain',
						},
					},
				},
			},
		},
	};

	useEffect(() => {
		// Load STT configuration
		setSttData(defaultSttData);

		// Load saved configuration
		const savedConfig = localStorage.getItem('agentConfig');
		if (savedConfig) {
			setConfig(JSON.parse(savedConfig));
		}
	}, []);

	const handleProviderChange = (provider) => {
		setConfig({
			provider,
			model: '',
			language: '',
		});
	};

	const handleModelChange = (model) => {
		setConfig({
			...config,
			model,
			language: '',
		});
	};

	const handleLanguageChange = (language) => {
		setConfig({
			...config,
			language,
		});
	};

	const saveConfiguration = () => {
		localStorage.setItem('agentConfig', JSON.stringify(config));
		setMessage({ type: 'success', text: 'Configuration saved successfully!' });
		setTimeout(() => setMessage({ type: '', text: '' }), 3000);
	};

	if (!sttData) {
		return <div>Loading...</div>;
	}

	const availableModels = config.provider
		? Object.keys(sttData.providers[config.provider].models)
		: [];
	const availableLanguages =
		config.provider && config.model
			? Object.keys(
					sttData.providers[config.provider].models[config.model].languages
			  )
			: [];

	const getDisplayName = (type, key) => {
		if (type === 'provider' && sttData.providers[key]) {
			return sttData.providers[key].name;
		}
		if (
			type === 'model' &&
			config.provider &&
			sttData.providers[config.provider].models[key]
		) {
			return sttData.providers[config.provider].models[key].name;
		}
		if (type === 'language' && config.provider && config.model) {
			return sttData.providers[config.provider].models[config.model].languages[
				key
			];
		}
		return key;
	};

	return (
		<div className="max-w-4xl">
			<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
				Agent Configuration
			</h2>

			{message.text && (
				<div
					className={`p-3 rounded-lg mb-6 ${
						message.type === 'error'
							? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
							: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
					}`}
				>
					{message.text}
				</div>
			)}

			<div className="grid lg:grid-cols-2 gap-8">
				<div className="space-y-6">
					<div className="card p-6">
						<h3 className="text-xl font-semibold mb-4">
							Speech-to-Text Configuration
						</h3>

						<div className="space-y-4">
							{/* Provider Dropdown */}
							<div>
								<label className="block text-sm font-medium mb-2">
									Provider
								</label>
								<select
									value={config.provider}
									onChange={(e) => handleProviderChange(e.target.value)}
									className="input-field"
								>
									<option value="">Select Provider</option>
									{Object.keys(sttData.providers).map((provider) => (
										<option key={provider} value={provider}>
											{sttData.providers[provider].name}
										</option>
									))}
								</select>
							</div>

							{/* Model Dropdown */}
							<div>
								<label className="block text-sm font-medium mb-2">Model</label>
								<select
									value={config.model}
									onChange={(e) => handleModelChange(e.target.value)}
									className="input-field"
									disabled={!config.provider}
								>
									<option value="">Select Model</option>
									{availableModels.map((model) => (
										<option key={model} value={model}>
											{sttData.providers[config.provider].models[model].name}
										</option>
									))}
								</select>
							</div>

							{/* Language Dropdown */}
							<div>
								<label className="block text-sm font-medium mb-2">
									Language
								</label>
								<select
									value={config.language}
									onChange={(e) => handleLanguageChange(e.target.value)}
									className="input-field"
									disabled={!config.model}
								>
									<option value="">Select Language</option>
									{availableLanguages.map((language) => (
										<option key={language} value={language}>
											{
												sttData.providers[config.provider].models[config.model]
													.languages[language]
											}
										</option>
									))}
								</select>
							</div>

							<button
								onClick={saveConfiguration}
								disabled={!config.provider || !config.model || !config.language}
								className="btn-primary w-full disabled:opacity-50"
							>
								Save Configuration
							</button>
						</div>
					</div>
				</div>

				<div>
					{/* Summary Card */}
					{config.provider && config.model && config.language && (
						<div className="card p-6">
							<h3 className="text-xl font-semibold mb-4">
								Configuration Summary
							</h3>
							<div className="space-y-3">
								<div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
									<span className="font-medium">Provider:</span>
									<span className="text-gray-600 dark:text-gray-400">
										{getDisplayName('provider', config.provider)} (
										{config.provider})
									</span>
								</div>
								<div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
									<span className="font-medium">Model:</span>
									<span className="text-gray-600 dark:text-gray-400">
										{getDisplayName('model', config.model)} ({config.model})
									</span>
								</div>
								<div className="flex justify-between items-center py-2">
									<span className="font-medium">Language:</span>
									<span className="text-gray-600 dark:text-gray-400">
										{getDisplayName('language', config.language)} (
										{config.language})
									</span>
								</div>
							</div>
						</div>
					)}

					{/* Available Providers Overview */}
					<div className="card p-6 mt-6">
						<h3 className="text-xl font-semibold mb-4">Available Providers</h3>
						<div className="space-y-3">
							{Object.entries(sttData.providers).map(([key, provider]) => (
								<div
									key={key}
									className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
								>
									<div className="font-medium">{provider.name}</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">
										{Object.keys(provider.models).length} models available
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
