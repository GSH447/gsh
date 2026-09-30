/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheMaxMemorySize: 50 * 1024 * 1024,
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'discovertemplate.com' },
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' }
    ],
  },
  // Add this block:
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'https://20-26-8-222.gracespringhospitals.com/:path*',
      },
    ]
  }
};

module.exports = nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Add this to limit cache to 50MB (adjust as needed)
//   cacheMaxMemorySize: 50 * 1024 * 1024,
  
//   output: 'standalone',
  
//     images: {
//         remotePatterns: [
//             {
//               protocol: 'https',
//               hostname: 'discovertemplate.com'
//             },
            
//             {
//               protocol: 'https',
//               hostname: 'flagcdn.com'
//             },

//             {
//               protocol: 'https',
//               hostname: 'upload.wikimedia.org'
//             }
//           ],
//     }
// };

// // export default nextConfig;

// // /** @type {import('next').NextConfig} */
// // const nextConfig = {

// //   output: 'standalone',
  
// //     images: {
// //         remotePatterns: [
// //             {
// //               protocol: 'https',
// //               hostname: 'discovertemplate.com'
// //             },
            
// //             {
// //               protocol: 'https',
// //               hostname: 'flagcdn.com'
// //             },

// //             {
// //               protocol: 'https',
// //               hostname: 'upload.wikimedia.org'
// //             }
// //           ],
// //     }
// // };



// module.exports = nextConfig;

// // module.exports = {
// //     output: 'export',
// // };
  




