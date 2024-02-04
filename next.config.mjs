/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**/**'
            },
            {
                protocol: "https",
                hostname: process.env.API_MEDIA_HOST_URL,
                port: '',
                pathname: '/**/**'
            },
        ]
    }
};

export default nextConfig;
