'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BlogData from './blogData'; // Import static data for fallback

const RelatedPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          'https://gracespringhospitals.com/wp-json/wp/v2/posts?_embed&per_page=3'
        );
        let dynamicPosts = [];
        if (res.ok) {
          dynamicPosts = await res.json();
        }

        // Normalize dynamic posts
        const wpFormatted = dynamicPosts.map(p => ({
          id: p.id,
          slug: p.slug,
          title: p.title.rendered,
          image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/fallback-image.jpg'
        }));

        // Normalize static posts (taking just the first 3 for sidebar)
        const staticFormatted = BlogData.slice(0, 3).map(p => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          image: p.mainImage || '/fallback-image.jpg'
        }));

        // Combine and limit to 5 related posts total
        setPosts([...wpFormatted, ...staticFormatted].slice(0, 5));
      } catch (error) {
        console.error('Error fetching related posts:', error);
        // Fallback exclusively to static on error
        setPosts(BlogData.slice(0, 5).map(p => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          image: p.mainImage || '/fallback-image.jpg'
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="border border-gray-100 bg-white shadow-sm mt-8">
      <h3 className="mb-6 text-2xl font-bold text-gray-900">
        Related Medical Insights
      </h3>

      {loading ? (
        <p className="text-gray-500">Loading recent posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-600 mt-4">
          No new posts available right now.
        </p>
      ) : (
        <div className="space-y-6 ">
          {posts.map((post) => (
            <div className="flex gap-4 items-center" key={`related-${post.id}`}>
              <div className="relative h-20 w-24 lg:h-[20vh] lg:w-[10rem] flex-shrink-0">
                <Image
                  src={post.image}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-gray-900 hover:text-[#407CE2] font-semibold text-sm transition-colors duration-300 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[#407CE2] text-xs font-medium mt-1 block hover:underline"
                >
                  Read Post →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedPost;



// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// const RelatedPost = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await fetch(
//           'https://blog.timobhealthinternational.org/wp-json/wp/v2/posts?_embed&per_page=5'
//         );
//         const data = await res.json();
//         setPosts(data);
//       } catch (error) {
//         console.error('Error fetching related posts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm mt-8">
//       <h3 className="mb-6 text-2xl font-bold text-gray-900">
//         Latest Medical Insights
//       </h3>

//       {loading ? (
//         <p className="text-gray-500">Loading recent posts...</p>
//       ) : posts.length === 0 ? (
//         <p className="text-gray-600 mt-4">
//           No new posts available right now.
//         </p>
//       ) : (
//         <div className="space-y-6">
//           {posts.map((post) => {
//             const imageSrc = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/fallback-image.jpg';

//             return (
//               <div className="flex gap-4 items-center" key={post.id}>
//                 <div className="relative h-20 w-24 flex-shrink-0">
//                   <Image
//                     src={imageSrc}
//                     alt={post.title.rendered}
//                     fill
//                     className="object-cover rounded-md"
//                   />
//                 </div>

//                 <div className="flex-1">
//                   <Link
//                     href={`/blog/${post.slug}`}
//                     className="text-gray-900 hover:text-[#407CE2] font-semibold text-sm transition-colors duration-300 line-clamp-2"
//                     dangerouslySetInnerHTML={{ __html: post.title.rendered }}
//                   />
//                   <Link
//                     href={`/blog/${post.slug}`}
//                     className="text-[#407CE2] text-xs font-medium mt-1 block hover:underline"
//                   >
//                     Read Post →
//                   </Link>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RelatedPost;




// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Blog } from '../../../../types/blog';
// // import Loading from '../../../../app/loading';
// // import Loading from '@/components/Constants/Loading';
// // import Loading from "../../../app/loading";
// import Loading from '@/app/[locale]/loading';

// const RelatedPost = () => {
//   const [posts, setPosts] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await fetch(
//           'https://blog.timobhealthinternational.org/wp-json/wp/v2/posts?_embed&per_page=5'
//         );
//         const data = await res.json();
//         setPosts(data);
//       } catch (error) {
//         console.error('Error fetching related posts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div className="animate_top rounded-md lg:border lg:border-stroke lg:bg-white lg:p-9 lg:shadow-solid-13 dark:border-strokedark dark:bg-blacksection relatedPost">
//       <h1 className="mb-7.5 text-2xl font-semibold text-black dark:text-white the-mobile-subtitle">
//         {/* Related Health Tips & Blog */}
//         New Disease Outbreak
//       </h1>

//       {loading ? (
//         <Loading />
//       ) : posts.length === 0 ? (
//         <p className="text-gray-600 dark:text-white mt-4 text-center">
//           No New Disease Outbreak posts available right now, check back later.
//         </p>
//       ) : (
//         posts.map((post) => {
//           // const imageSrc =
//           //   post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/fallback-image.jpg';

//           return (
//             <div className="mb-7.5 flex gap-4 xl:flex-nowrap 2xl:gap-6" key={post.id}>
//               <div className="relative lg:h-25 w-45">
//                 <Image
//                   width={500}
//                   height={500}
//                   src={"/"}
//                   alt={post.slug}
//                   className="h-full w-full object-cover rounded"
//                 />
//               </div>

//               <div className="p-2">
//                 <Link
//                   href={`/blog/${post.slug}`}
//                   className="text-black hover:text-primary font-medium transition-all duration-300 dark:text-white dark:hover:text-primary"
//                 >
//                   {post.title.length > 50
//                     ? `${post.title.slice(0, 50)}...`
//                     : post.title}
//                 </Link>
//                 <Link
//                   href={`/blog/${post.slug}`}
//                   className="line-clamp-3 text-primary hover:text-underline dark:hover:text-underline"
//                 >
//                   Read Post
//                 </Link>
//               </div>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default RelatedPost;





