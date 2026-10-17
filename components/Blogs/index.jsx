import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import BlogData from "./Blog/blogData";

export default async function BlogStories({ featuredOnly = false }) {
  let dynamicBlogs = [];
  // Match the 4-column grid UI perfectly
  const wpLimit = featuredOnly ? 4 : 12; 
  
  // 1. Fetch posts from Gracespring WP API
  try {
    const res = await fetch(`https://gracespringhospitals.com/wp-json/wp/v2/posts?_embed&per_page=${wpLimit}`, {
      next: { revalidate: 60 }
    });
    if (res.ok) {
      dynamicBlogs = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch dynamic blogs", error);
  }

  // 2. Normalize Dynamic WP Posts
  const wpPosts = dynamicBlogs.map((blog) => ({
    id: `wp-${blog.id}`,
    slug: blog.slug,
    title: blog.title.rendered,
    image: blog._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/fallback-image.jpg",
    date: new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }),
    isFeatured: true, 
  }));

  // 3. Normalize Static Posts from blogData.jsx
  let staticPosts = BlogData.map((blog) => ({
    id: `static-${blog.id}`,
    slug: blog.slug,
    title: blog.title,
    image: blog.mainImage || "/fallback-image.jpg",
    date: blog.publishedAt || "No Date",
    isFeatured: blog.isFeatured || false, 
  }));

  // 4. Filter and Combine
  if (featuredOnly) {
    staticPosts = staticPosts.filter(post => post.isFeatured);
  }

  const combinedBlogs = [...wpPosts, ...staticPosts];
  const displayBlogs = featuredOnly ? combinedBlogs.slice(0, 4) : combinedBlogs;

  return (
    <section className={`bg-white pb-16 ${featuredOnly ? 'pt-16' : 'pt-0'}`}>
      
      {/* ================================================== */}
      {/* COLORFUL ARROW HEADER (Only on Dedicated Blog Page) */}
      {/* ================================================== */}
      {!featuredOnly ? (
        <>
          {/* Desktop Full-Width Ribbon */}
          <div className="hidden md:flex w-full h-[120px] mb-8 overflow-hidden font-bold">
            {/* Purple Section */}
            <div 
              className="w-[50%] bg-[#6D0C9E] relative z-30 flex flex-col justify-center px-10 lg:pl-[10%] xl:pl-[15%]"
              style={{ clipPath: 'polygon(0 0, calc(100% - 50px) 0, 100% 50%, calc(100% - 50px) 100%, 0 100%)' }}
            >
              <h1 className="text-3xl lg:text-4xl text-white font-bold leading-tight tracking-wide">
                Newsletters, Blogs and <br /> Articles
              </h1>
            </div>
            
            {/* Blue Section (Slides under purple using -ml-[50px]) */}
            <div 
              className="w-[25%] bg-[#36C2F4] relative z-20 -ml-[50px] pl-[70px] flex flex-col justify-center items-center"
              style={{ clipPath: 'polygon(0 0, calc(100% - 50px) 0, 100% 50%, calc(100% - 50px) 100%, 0 100%)' }}
            >
              <span className="text-[#0d3446] text-lg lg:text-xl font-bold text-center">Publications</span>
            </div>

            {/* Green Section (Slides under blue) */}
            <div 
              className="w-[25%] bg-[#A5D251] relative z-10 -ml-[50px] pl-[70px] pr-5 flex flex-col justify-center items-center"
            >
              <span className="text-[#1e3b08] text-lg lg:text-xl font-bold text-center leading-tight">Patient <br /> Testimonials</span>
            </div>
          </div>

          {/* Mobile Fallback Header */}
          <div className="md:hidden flex flex-col mb-8 w-full">
            <div className="bg-[#6D0C9E] p-6">
              <h1 className="text-2xl text-white font-bold">Newsletters, Blogs and Articles</h1>
            </div>
            <div className="flex">
              <div className="flex-1 bg-[#36C2F4] p-4 text-[#0d3446] font-bold text-center text-sm">Publications</div>
              <div className="flex-1 bg-[#A5D251] p-4 text-[#1e3b08] font-bold text-center text-sm">Patient Testimonials</div>
            </div>
          </div>

          {/* Contact Us Button */}
          <div className="max-w-7xl mx-auto flex justify-end px-5 lg:px-20 mb-10">
            <Link href="/contact" className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition font-medium text-sm shadow-sm">
              <Mail size={16} /> Contact us
            </Link>
          </div>
        </>
      ) : (
        /* ================================================== */
        /* STANDARD HEADER (Only on Landing Page) */
        /* ================================================== */
        <div className="max-w-7xl mx-auto px-5 lg:px-20 mb-10 flex flex-col justify-center items-center text-center">
          <span className="text-[#407CE2] font-bold uppercase tracking-wider font-medium text-sm">
            Featured Publications
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-gray-900">
            Medical Insights & News
          </h2>
        </div>
      )}

      {/* ================================================== */}
      {/* 4-COLUMN CARD GRID */}
      {/* ================================================== */}
      <div className="max-w-7xl mx-auto px-5 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayBlogs.map((blog) => (
          <Link 
            href={`/blog/${blog.slug}`} 
            key={blog.id} 
            className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
              <Image 
                src={blog.image} 
                alt={blog.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            
            {/* Content Container - Pastel Background */}
            <div className="p-5 flex flex-col flex-grow bg-[#faf0f9] border border-t-0 border-[#f2e1f0]">
              <h3 
                className="text-[15px] font-bold text-[#3582c4] leading-snug line-clamp-2 group-hover:text-blue-800 transition-colors" 
                dangerouslySetInnerHTML={{ __html: blog.title }} 
              />
              <div className="mt-auto pt-3">
                <span className="text-[#6b7280] text-[11px] font-medium tracking-wide">
                  {blog.date}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Button (Only on Landing Page) */}
      {featuredOnly && (
        <div className="text-center mt-12">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 bg-[#122b5e] text-white px-8 py-3 rounded-full hover:bg-blue-900 transition font-medium text-sm shadow-md"
          >
            View All Publications <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );
}
// import Image from "next/image";
// import Link from "next/link";
// import { CalendarDays, UserRound, ArrowRight } from "lucide-react";
// import BlogData from "./Blog/blogData";

// export default async function BlogStories({ featuredOnly = false }) {
//   let dynamicBlogs = [];
//   const wpLimit = featuredOnly ? 3 : 12; // Fetch less if only showing featured
  
//   // 1. Fetch posts from Gracespring WP API
//   try {
//     const res = await fetch(`https://gracespringhospitals.com/wp-json/wp/v2/posts?_embed&per_page=${wpLimit}`, {
//       next: { revalidate: 60 }
//     });
//     if (res.ok) {
//       dynamicBlogs = await res.json();
//     }
//   } catch (error) {
//     console.error("Failed to fetch dynamic blogs", error);
//   }

//   // 2. Normalize Dynamic WP Posts
//   const wpPosts = dynamicBlogs.map((blog) => ({
//     id: `wp-${blog.id}`,
//     slug: blog.slug,
//     title: blog.title.rendered,
//     excerpt: blog.excerpt.rendered,
//     image: blog._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/fallback-image.jpg",
//     date: new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
//     author: blog._embedded?.author?.[0]?.name || "Admin",
//     isFeatured: true, // We treat the latest WP posts as featured automatically
//   }));

//   // 3. Normalize Static Posts from blogData.jsx
//   let staticPosts = BlogData.map((blog) => ({
//     id: `static-${blog.id}`,
//     slug: blog.slug,
//     title: blog.title,
//     excerpt: blog.metadata ? blog.metadata.substring(0, 150) + "..." : "Read more...",
//     image: blog.mainImage || "/fallback-image.jpg",
//     date: blog.publishedAt || "No Date",
//     author: "Admin",
//     isFeatured: blog.isFeatured || false, // Reads the boolean from your data file
//   }));

//   // 4. Filter and Combine
//   if (featuredOnly) {
//     staticPosts = staticPosts.filter(post => post.isFeatured);
//   }

//   const combinedBlogs = [...wpPosts, ...staticPosts];
//   const displayBlogs = featuredOnly ? combinedBlogs.slice(0, 3) : combinedBlogs;

//   return (
//     <section className="bg-[#f9fbff] py-16 px-5 lg:px-20">
//       <div className="max-w-3xl mx-auto text-center mb-12">
//         <span className="text-[#407CE2] font-bold uppercase tracking-wider font-medium">
//           {featuredOnly ? "Featured Medical Insights" : "All Medical Insights & News"}
//         </span>
//         {!featuredOnly && (
//           <h1 className="text-3xl lg:text-5xl font-bold mt-4 text-gray-900">
//             Gracespring Blog
//           </h1>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {displayBlogs.map((blog) => (
//           <div key={blog.id} className="bg-white overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 flex flex-col">
//             <div className="relative h-60 w-full">
//               <Image src={blog.image} alt={blog.title} fill className="object-cover" />
//             </div>
//             <div className="p-6 space-y-4 flex flex-col flex-grow">
//               <h3 className="text-xl font-semibold text-gray-900 leading-snug line-clamp-2" dangerouslySetInnerHTML={{ __html: blog.title }} />
//               <div className="text-gray-600 text-sm leading-7 line-clamp-3 flex-grow" dangerouslySetInnerHTML={{ __html: blog.excerpt }} />
              
//               <div className="space-y-2 text-sm text-gray-500 pt-4 border-t border-gray-50 mt-auto">
//                 <div className="flex items-center gap-2"><CalendarDays size={16} /> {blog.date}</div>
//                 <div className="flex items-center gap-2"><UserRound size={16} /> {blog.author}</div>
//               </div>

//               <Link href={`/blog/${blog.slug}`} className="inline-flex items-center gap-2 text-[#407CE2] font-medium hover:gap-3 transition mt-2">
//                 Read Story <ArrowRight size={18} />
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>

//       {featuredOnly && (
//         <div className="text-center mt-12">
//           <Link href="/blog" className="inline-flex items-center gap-2 bg-[#407CE2] text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
//             View All Stories <ArrowRight size={18} />
//           </Link>
//         </div>
//       )}
//     </section>
//   );
// }



// import Image from "next/image";
// import Link from "next/link";
// import { CalendarDays, Clock3, UserRound, ArrowRight } from "lucide-react";
// import BlogData from "./Blog/blogData";

// export default async function BlogStories() {
//   let dynamicBlogs = [];
  
//   // 1. Fetch latest posts from Gracespring WP API
//   try {
//     const res = await fetch("https://gracespringhospitals.com/wp-json/wp/v2/posts?_embed&per_page=6", {
//       next: { revalidate: 60 }
//     });
//     if (res.ok) {
//       dynamicBlogs = await res.json();
//     }
//   } catch (error) {
//     console.error("Failed to fetch dynamic blogs", error);
//   }

//   // 2. Normalize Dynamic WP Posts
//   const wpPosts = dynamicBlogs.map((blog) => ({
//     id: `wp-${blog.id}`,
//     slug: blog.slug,
//     title: blog.title.rendered,
//     excerpt: blog.excerpt.rendered,
//     image: blog._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/assets/images/blog/medical-outreach-3.jpg",
//     date: new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
//     author: blog._embedded?.author?.[0]?.name || "Admin",
//   }));

//   // 3. Normalize Static Posts from blogData.jsx
//   const staticPosts = BlogData.map((blog) => ({
//     id: `static-${blog.id}`,
//     slug: blog.slug,
//     title: blog.title,
//     excerpt: blog.metadata ? blog.metadata.substring(0, 150) + "..." : "Read more...",
//     image: blog.mainImage || "/assets/images/blog/medical-outreach-3.jpg",
//     date: blog.publishedAt || "No Date",
//     author: "Admin",
//   }));

//   // 4. Combine both and slice to a maximum number if needed (e.g., 6 posts total)
//   const allBlogs = [...wpPosts, ...staticPosts].slice(0, 6);

//   return (
//     <section className="bg-[#f9fbff] py-16 px-5 lg:px-20">
//       <div className="max-w-3xl mx-auto text-center mb-12">
//         <span className="text-[#407CE2] font-bold uppercase tracking-wider font-medium">
//           Stay informed with medical insights, wellness guidance, and healthcare updates.
//         </span>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {allBlogs.map((blog) => (
//           <div key={blog.id} className="bg-white overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300">
//             <div className="relative h-60">
//               <Image src={blog.image} alt={blog.title} fill className="object-cover" />
//             </div>
//             <div className="p-6 space-y-4">
//               <h3 className="text-xl font-semibold text-gray-900 leading-snug" dangerouslySetInnerHTML={{ __html: blog.title }} />
//               <div className="text-gray-600 text-sm leading-7 line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.excerpt }} />
              
//               <div className="space-y-2 text-sm text-gray-500">
//                 <div className="flex items-center gap-2"><CalendarDays size={16} /> {blog.date}</div>
//                 <div className="flex items-center gap-2"><UserRound size={16} /> {blog.author}</div>
//               </div>

//               <Link href={`/blog/${blog.slug}`} className="inline-flex items-center gap-2 text-[#407CE2] font-medium hover:gap-3 transition">
//                 Read Story <ArrowRight size={18} />
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }




// import Image from "next/image";
// import Link from "next/link";
// import { CalendarDays, Clock3, UserRound, ArrowRight } from "lucide-react";

// export default async function BlogStories() {
//   // Fetch latest posts from WordPress
//   const res = await fetch("https://blog.timobhealthinternational.org/wp-json/wp/v2/posts?_embed&per_page=6", {
//     next: { revalidate: 60 }
//   });
//   const blogs = await res.json();

//   return (
//     <section className="bg-[#f9fbff] py-16 px-5 lg:px-20">
//       <div className="max-w-3xl mx-auto text-center mb-12">
//         <span className="text-[#407CE2] font-bold uppercase tracking-wider font-medium">
//           Stay informed with medical insights, wellness guidance, and healthcare updates.
//         </span>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {blogs.map((blog) => {
//           const featuredImage = blog._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/assets/images/blog/medical-outreach-3.jpg";
//           const authorName = blog._embedded?.author?.[0]?.name || "Admin";
//           const date = new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

//           return (
//             <div key={blog.id} className="bg-white overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300">
//               <div className="relative h-60">
//                 <Image src={featuredImage} alt="Blog Image" fill className="object-cover" />
//               </div>
//               <div className="p-6 space-y-4">
//                 <h3 className="text-xl font-semibold text-gray-900 leading-snug" dangerouslySetInnerHTML={{ __html: blog.title.rendered }} />
//                 <div className="text-gray-600 text-sm leading-7 line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered }} />
                
//                 <div className="space-y-2 text-sm text-gray-500">
//                   <div className="flex items-center gap-2"><CalendarDays size={16} /> {date}</div>
//                   <div className="flex items-center gap-2"><UserRound size={16} /> {authorName}</div>
//                 </div>

//                 <Link href={`/blog/${blog.slug}`} className="inline-flex items-center gap-2 text-[#407CE2] font-medium hover:gap-3 transition">
//                   Read Story <ArrowRight size={18} />
//                 </Link>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }










// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   CalendarDays,
//   Clock3,
//   UserRound,
//   ArrowRight
// } from "lucide-react";

// export default function BlogStories() {

//   const blogs = [
//     {
//       id:1,
//       image:"/assets/images/blog/medical-outreach-3.jpg",
//       category:"Medical Outreach",
//       title:"Preventive Healthcare Outreach Monastery Road",
//       slug:"Preventive_Healthcare_Outreach_Monastery_Road",
//       summary:"Learn how early detection and routine medical checkups improve long-term health outcomes.",
//       author:"Admin",
//       date:"May 16, 2026",
//       time:"5 min read"
//     },
//     {
//       id:2,
//       image:"/assets/images/blog/Journey of Recovery.jpg",
//       category:"Patient Story",
//       title:"A Journey of Recovery & Hope",
//       slug:"A_Journey_of_Recovery_&_Hope",
//       summary:"Compassionate care and clinical excellence supporting a patient’s healing journey.",
//       author:"Gracespring Admin",
//       date:"May 16, 2026",
//       time:"4 min read"
//     },
//     {
//       id:3,
//       image:"/assets/images/blog/blog3.jpg",
//       category:"Wellness Tips",
//       title:"Healthy Living Habits That Work",
//       slug:"Healthy_Living_Habits_That_Work",
//       summary:"Simple lifestyle habits that support healthier living and overall wellbeing.",
//       author:"Health Education Team",
//       date:"May 12, 2026",
//       time:"6 min read"
//     }

//   ];

//   return (
//     <section className="bg-[#f9fbff] py-16 px-5 lg:px-20">

//       {/* Header */}
//       <div className="max-w-3xl mx-auto text-center mb-12">

//         <span className="text-[#407CE2] font-bold uppercase tracking-wider font-medium">
//           Stay informed with medical insights, wellness guidance,
//           patient stories and healthcare updates from Gracespring Hospitals.
//         </span>

//         {/* <h2 className="text-3xl lg:text-5xl font-bold mt-3 text-gray-900">
//           Health Stories & Blogs
//         </h2> */}

//         {/* <p className="mt-4 text-lg text-gray-600 leading-8">
//           Stay informed with medical insights, wellness guidance,
//           patient stories and healthcare updates from Gracespring Hospitals.
//         </p> */}

//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

//         {blogs.map((blog) => (
//           <div
//             key={blog.id}
//             className="bg-white overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300"
//           >

//             {/* Image */}
//             <div className="relative h-60">
//               <Image
//                 src={blog.image}
//                 alt={blog.title}
//                 fill
//                 className="object-cover"
//               />
//             </div>

//             {/* Content */}
//             <div className="p-6 space-y-4">

//               <span className="bg-[#407CE2]/10 text-[#407CE2] text-xs px-3 py-1 rounded-full font-medium">
//                 {blog.category}
//               </span>

//               <h3 className="text-xl font-semibold text-gray-900 leading-snug">
//                 {blog.title}
//               </h3>

//               <p className="text-gray-600 text-sm leading-7">
//                 {blog.summary}
//               </p>

//               {/* Metadata */}
//               <div className="space-y-2 text-sm text-gray-500">

//                 <div className="flex items-center gap-2">
//                   <CalendarDays size={16} />
//                   {blog.date}
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Clock3 size={16} />
//                   {blog.time}
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <UserRound size={16} />
//                   {blog.author}
//                 </div>

//               </div>

//               <Link
//                 href={`/blog/${blog.slug}`}
//                 className="inline-flex items-center gap-2 text-[#407CE2] font-medium hover:gap-3 transition"
//               >
//                 Read Story
//                 <ArrowRight size={18} />
//               </Link>

//             </div>
//           </div>
//         ))}

//       </div>

//       {/* CTA */}
//         <motion.button
//           whileHover={{ y: -4, boxShadow: "0px 6px 0px #000" }}
//           whileTap={{ y: 2, boxShadow: "0px 1px 0px #000" }}
//           className="mt-4 px-8 py-3 bg-primary text-white font- uppercase tracking-wider rounded-xl border-2 border-white relative transition-all duration-150 shadow-[0px_4px_0px_#000]"
//         >
//           <Link
//             href="/blog"
//           >
//             All Medical Insights
//           </Link>
//         </motion.button>

//     </section>
//   );
// }


// // "use client";

// // import Image from "next/image";
// // import Link from "next/link";

// // export default function BlogStories() {
// //   return (
// //     <section className="w-full bg-white py-16 px-5 lg:px-20">

// //       {/* Header */}
// //       <div className="max-w-3xl mx-auto text-center mb-12">

// //         <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
// //           Health Stories & Insights
// //         </h2>

// //         <p className="mt-4 text-gray-600 text-lg leading-8">
// //           Stay informed with expert medical insights, patient stories, wellness guidance,
// //           and healthcare updates from Gracespring Hospitals.
// //         </p>

// //       </div>

// //       {/* Blog Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// //         {/* Blog Card 1 */}
// //         <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition">

// //           <div className="relative h-56">
// //             <Image
// //               src="/assets/images/blog/blog1.jpg"
// //               alt="Blog 1"
// //               fill
// //               className="object-cover"
// //             />
// //           </div>

// //           <div className="p-6 space-y-3">

// //             <p className="text-sm text-[#407CE2] font-medium">
// //               Medical Insights
// //             </p>

// //             <h3 className="text-xl font-semibold text-gray-900">
// //               Understanding Preventive Healthcare
// //             </h3>

// //             <p className="text-gray-600 text-sm leading-6">
// //               Learn how early detection and routine checkups can significantly
// //               improve long-term health outcomes.
// //             </p>

// //             <Link
// //               href="/blog/1"
// //               className="inline-block text-[#407CE2] font-medium hover:underline"
// //             >
// //               Read More →
// //             </Link>

// //           </div>

// //         </div>

// //         {/* Blog Card 2 */}
// //         <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition">

// //           <div className="relative h-56">
// //             <Image
// //               src="/assets/images/blog/blog2.jpg"
// //               alt="Blog 2"
// //               fill
// //               className="object-cover"
// //             />
// //           </div>

// //           <div className="p-6 space-y-3">

// //             <p className="text-sm text-[#407CE2] font-medium">
// //               Patient Story
// //             </p>

// //             <h3 className="text-xl font-semibold text-gray-900">
// //               A Journey of Recovery & Hope
// //             </h3>

// //             <p className="text-gray-600 text-sm leading-6">
// //               A real-life recovery story showcasing compassionate care and
// //               medical excellence at Gracespring Hospitals.
// //             </p>

// //             <Link
// //               href="/blog/2"
// //               className="inline-block text-[#407CE2] font-medium hover:underline"
// //             >
// //               Read More →
// //             </Link>

// //           </div>

// //         </div>

// //         {/* Blog Card 3 */}
// //         <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition">

// //           <div className="relative h-56">
// //             <Image
// //               src="/assets/images/blog/blog3.jpg"
// //               alt="Blog 3"
// //               fill
// //               className="object-cover"
// //             />
// //           </div>

// //           <div className="p-6 space-y-3">

// //             <p className="text-sm text-[#407CE2] font-medium">
// //               Wellness Tips
// //             </p>

// //             <h3 className="text-xl font-semibold text-gray-900">
// //               Healthy Living Habits That Work
// //             </h3>

// //             <p className="text-gray-600 text-sm leading-6">
// //               Discover simple lifestyle changes that can greatly improve your
// //               overall wellbeing and daily energy.
// //             </p>

// //             <Link
// //               href="/blog/3"
// //               className="inline-block text-[#407CE2] font-medium hover:underline"
// //             >
// //               Read More →
// //             </Link>

// //           </div>

// //         </div>

// //       </div>

// //       {/* CTA */}
// //       <div className="text-center mt-12">
// //         <Link
// //           href="/blog"
// //           className="bg-[#407CE2] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
// //         >
// //           View All Stories
// //         </Link>
// //       </div>


// //     </section>
    
// //   );
// // }