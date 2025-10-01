import React from 'react'

type Props = {}

const Demo = (props: Props) => {
  return (
		<div
			id="demo"
			className="w-full max-w-7xl mx-auto mt-2 md:mt-10 px-0 md:px-4"
		>
			<div className="text-center mb-8">
				<h1 className="text-lg md:text-3xl font-bold mb-2">How it Works!</h1>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
				<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
					<img
						src="/images/step1.png"
						alt="Step 1"
						className="mx-auto mb-4 w-24 h-24 object-contain"
					/>
					<h2 className="text-xl font-semibold mb-2 text-blue-600">Step 1</h2>
					<p>Log in to your M-Pesa App</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
					<img
						src="/images/step2.png"
						alt="Step 2"
						className="mx-auto mb-4 w-24 h-24 object-contain"
					/>
					<h2 className="text-xl font-semibold mb-2 text-blue-600">Step 2</h2>
					<p>Download the statement</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
					<img
						src="/images/step3.png"
						alt="Step 3"
						className="mx-auto mb-4 w-24 h-24 object-contain"
					/>
					<h2 className="text-xl font-semibold mb-2 text-blue-600">Step 3</h2>
					<p>Upload the statement</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
					<img
						src="/images/step4.png"
						alt="Step 4"
						className="mx-auto mb-4 w-24 h-24 object-contain"
					/>
					<h2 className="text-xl font-semibold mb-2 text-blue-600">Step 4</h2>
					<p>View the statement in Excel</p>
				</div>
			</div>
		</div>
	);
}

export default Demo