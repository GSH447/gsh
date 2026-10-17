import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, UserRound, ArrowRight } from "lucide-react";
import BlogData from "./Blog/blogData";

export default async function BlogStories() {
  let dynamicBlogs = [];
  
  // 1. Fetch latest posts from Gracespring WP API
  try {
    const res = await fetch("https://gracespringhospitals.com/wp-json/wp/v2/posts?_embed&per_page=6", {
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
    excerpt: blog.excerpt.rendered,
    image: blog._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/assets/images/blog/medical-outreach-3.jpg",
    date: new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    author: blog._embedded?.author?.[0]?.name || "Admin",
  }));

  // 3. Normalize Static Posts from blogData.jsx
  const staticPosts = BlogData.map((blog) => ({
    id: `static-${blog.id}`,
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.metadata ? blog.metadata.substring(0, 150) + "..." : "Read more...",
    image: blog.mainImage || "/assets/images/blog/medical-outreach-3.jpg",
    date: blog.publishedAt || "No Date",
    author: "Admin",
  }));

  // 4. Combine both and slice to a maximum number if needed (e.g., 6 posts total)
  const allBlogs = [...wpPosts, ...staticPosts].slice(0, 6);

  return (
    <section className="bg-[#f9fbff] py-16 px-5 lg:px-20">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="text-[#407CE2] font-bold uppercase tracking-wider font-medium">
          Stay informed with medical insights, wellness guidance, and healthcare updates.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allBlogs.map((blog) => (
          <div key={blog.id} className="bg-white overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300">
            <div className="relative h-60">
              <Image src={blog.image} alt={blog.title} fill className="object-cover" />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 leading-snug" dangerouslySetInnerHTML={{ __html: blog.title }} />
              <div className="text-gray-600 text-sm leading-7 line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.excerpt }} />
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2"><CalendarDays size={16} /> {blog.date}</div>
                <div className="flex items-center gap-2"><UserRound size={16} /> {blog.author}</div>
              </div>

              <Link href={`/blog/${blog.slug}`} className="inline-flex items-center gap-2 text-[#407CE2] font-medium hover:gap-3 transition">
                Read Story <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


// import React from "react";
// import LandingPageHero from "../../Constants/SectionLandingPage";
// import BlogItem from "./BlogItem";
// import BlogData from "./blogData";

// const Blog = async () => {
//   return (
//     <section className="py-20 lg:py-25 xl:py-30">
//       <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
//         {/* <!-- Section Title Start --> */}
//         <div className="animate_top mx-auto text-center">
//         <LandingPageHero headerInfo={{
//             title: "Our News and Blog",
//             subtitle: "This is the Blog page for Timob Health, focused on enhancing accessibility to healthcare for the relatives of infected individuals. We prioritize seamless connections to health centers and consultant coverage, ensuring timely medical support and expert guidance for those in need.",
//             link: "#",
//           image: "/images/x/privacy_policy_tos.svg"
//           }}/>
//         </div>
//         {/* <!-- Section Title End --> */}
//       </div>

//       <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
//         <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
//           {BlogData.slice(0, 3).map((blog, key) => (
//             <BlogItem blog={blog} key={key} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Blog;