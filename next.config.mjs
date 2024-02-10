import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/i18n.ts');

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
    },
};

export default withNextIntl(nextConfig);
