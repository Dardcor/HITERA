import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Hitera Productivity Suite',
        short_name: 'Hitera',
        description: 'Platform manajemen finansial, kesehatan, dan keseharian dalam satu ekosistem.',
        start_url: '/dashboard',
        display: 'standalone',
        background_color: '#0a0a0f',
        theme_color: '#6d28d9',
        orientation: 'portrait-primary',
        icons: [
            {
                src: 'https://cdn-icons-png.flaticon.com/512/8201/8201205.png', /* Temporary high-quality placeholder logic */
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: 'https://cdn-icons-png.flaticon.com/512/8201/8201205.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
