import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,

    async headers() {
        return [
            {
                // Cache self-hosted fonts forever — critical for instant reality switching
                source: '/fonts/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ]
    },
}

export default nextConfig
