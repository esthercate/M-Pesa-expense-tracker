import React from 'react'
import Image, { StaticImageData } from 'next/image'
import avatar1 from './assets/Ellipse 2.png'
import avatar2 from './assets/Ellipse 3.png'
import avatar3 from './assets/Ellipse 4.png'
import avatar4 from './assets/Ellipse 5.png'
import avatar5 from './assets/Ellipse 6.png'

const Avatars = () => {
	return (
		<div className="flex -space-x-3">
			<Image
				src={avatar1 as StaticImageData}
				width={25}
				height={25}
				alt="User 1"
				className="w-8 h-8 rounded-full border-2 border-[var(--background)]"
			/>
			<Image
				src={avatar2 as StaticImageData}
				width={25}
				height={25}
				alt="User 1"
				className="w-8 h-8 rounded-full border-2 border-[var(--background)]"
			/>
			<Image
				src={avatar3 as StaticImageData}
				width={25}
				height={25}
				alt="User 1"
				className="w-8 h-8 rounded-full border-2 border-[var(--background)]"
			/>
			<Image
				src={avatar5 as StaticImageData}
				width={25}
				height={25}
				alt="User 1"
				className="w-8 h-8 rounded-full border-2 border-[var(--background)]"
			/>
			<Image
				src={avatar4 as StaticImageData}
				width={25}
				height={25}
				alt="User 1"
				className="w-8 h-8 rounded-full border-2 border-[var(--background)]"
			/>
		</div>
	);
};

export default Avatars
