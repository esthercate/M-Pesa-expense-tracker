import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// NEW FILE: served at /sitemap.xml. Submit this URL in Google Search Console.
export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
	];
}
