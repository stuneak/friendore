import React from 'react';

export function Footer() {
	return (
		<section className="border-t">
			<div className="flex flex-col items-center justify-center w-full p-10 mx-auto px-2 sm:px-6 lg:max-w-6xl lg:px-28 md:px-6">
				<p className="text-md tracking-wide text-slate-500">
					Want to share feedback?{' '}
					<a
						href="https://forms.gle/TCz7B6hZiW8x8gaq5"
						className="cursor-pointer font-medium text-blue-600 underline hover:no-underline"
					>
						{' '}
						We&rsquo;d love to hear it!
					</a>
				</p>
				<p className="text-md tracking-wide text-slate-500">
					Want to support us?{' '}
					<a
						href="https://buymeacoffee.com/friendore"
						className="cursor-pointer font-medium text-blue-600 underline hover:no-underline"
					>
						Your donation helps!
					</a>
				</p>
				<p className="text-md tracking-wide text-slate-500">
					Thank you for using our service! ❤️
				</p>

				<a
					href="/privacy"
					className="mt-5 font-serif cursor-pointer font-medium text-blue-600 underline hover:no-underline"
				>
					Privacy Policy
				</a>
				<a
					href="/terms"
					className="font-serif cursor-pointer font-medium text-blue-600 underline hover:no-underline"
				>
					Terms of Service
				</a>
				<p className="font-serif">
					© {new Date().getFullYear()} Friendore
				</p>
			</div>
		</section>
	);
}
