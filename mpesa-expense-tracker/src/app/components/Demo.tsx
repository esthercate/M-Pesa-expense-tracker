import React from 'react'
import Image from 'next/image';

type Props = {};

const Demo = (props: Props) => {
	return (
		<div
			id="demo"
			className="w-full max-w-7xl mx-auto mt-2 md:mt-10 px-0 md:px-4"
		>
			<div className="text-center mb-12">
				<h1 className="text-3xl md:text-4xl font-bold mb-4">How it Works!</h1>
				<p className="text-gray-600 max-w-xl mx-auto">
					Download M-Pesa app on your phone and create an account. Then follow
					these steps to get started with our Mpesa to excel converter.
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full items-center">
				<div className="space-y-4">
					<div className="flex flex-col gap-2 bg-white p-6 rounded-lg justify-center items-start md:items-end shadow-md hover:shadow-lg transition-shadow duration-300 text-left md:text-right">
						<h2 className="text-xl w-10 h-10 bg-blue-300 font-bold mb-2 text-blue-600 flex items-center justify-center rounded-md">
							1
						</h2>
						<p className="font-semibold">Log in to your M-Pesa App</p>
						<p className="text-sm text-gray-600">
							Open the M-Pesa app. Sign in using your password or biometric
							authentication.
						</p>
					</div>
					<div className="flex flex-col gap-2 bg-white p-6 rounded-lg justify-center items-start md:items-end shadow-md hover:shadow-lg transition-shadow duration-300 text-left md:text-right">
						<h2 className="text-xl w-10 h-10 bg-blue-300 font-bold mb-2 text-blue-600 flex items-center justify-center rounded-md">
							2
						</h2>
						<p className="font-semibold">Download the M-Pesa PDF statement</p>
						<p className="text-sm text-gray-600">
							From the M-Pesa app, go to
							<span className="font-semibold text-blue-600">
								M-Pesa Statement
							</span>
							and tap{' '}
							<span className="font-semibold text-blue-600">See All</span>.
							Click{' '}
							<span className="font-semibold text-blue-600">
								Export Statement
							</span>{' '}
							button. Select the month and tap{' '}
							<span className="font-semibold text-blue-600">
								Generate Statement
							</span>{' '}
							to download it to your device.
						</p>
					</div>
				</div>
				<div className="w-full flex justify-center items-center">
					<Image
						src="/demo1.png"
						alt="Demo preview"
						width={800}
						height={300}
						className="w-full h-auto max-w-[640px]"
						priority
					/>
				</div>
				<div className="space-y-4">
					<div className="flex flex-col gap-2 bg-white p-6 rounded-lg justify-center items-start shadow-md hover:shadow-lg transition-shadow duration-300 text-left">
						<h2 className="text-xl w-10 h-10 bg-blue-300 font-bold mb-2 text-blue-600 flex items-center justify-center rounded-md">
							3
						</h2>
						<p className="font-semibold">Upload the Statement</p>
						<p className="text-sm text-gray-600">
							Locate the PDF statement file you downloaded. Select the file and
							upload it to this website and tap the button to convert it to
							Excel.
						</p>
					</div>
					<div className="flex flex-col gap-2 bg-white p-6 rounded-lg justify-center items-start shadow-md hover:shadow-lg transition-shadow duration-300 text-left">
						<h2 className="text-xl w-10 h-10 bg-blue-600 font-bold mb-2 text-white flex items-center justify-center rounded-md">
							4
						</h2>
						<p className="font-semibold">View the statement in Excel</p>
						<p className="text-sm text-gray-600">
							Once the conversion is complete, your excel statement is
							automatically downloaded to your device. Open the exported file in
							Excel or Google Sheets to review your spending.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Demo