"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  UserRound,
  ArrowRight
} from "lucide-react";

export default function BlogStories() {

  const blogs = [
    {
      id:1,
      image:"/assets/images/blog/blog1.jpg",
      category:"Medical Insights",
      title:"Understanding Preventive Healthcare",
      summary:"Learn how early detection and routine medical checkups improve long-term health outcomes.",
      author:"Dr. Augustine Olugbemi",
      date:"May 18, 2026",
      time:"5 min read"
    },
    {
      id:2,
      image:"/assets/images/blog/blog2.jpg",
      category:"Patient Story",
      title:"A Journey of Recovery & Hope",
      summary:"Compassionate care and clinical excellence supporting a patient’s healing journey.",
      author:"Gracespring Editorial",
      date:"May 16, 2026",
      time:"4 min read"
    },
    {
      id:3,
      image:"/assets/images/blog/blog3.jpg",
      category:"Wellness Tips",
      title:"Healthy Living Habits That Work",
      summary:"Simple lifestyle habits that support healthier living and overall wellbeing.",
      author:"Health Education Team",
      date:"May 12, 2026",
      time:"6 min read"
    }
  ];

  return (
    <section className="bg-[#f9fbff] py-16 px-5 lg:px-20">

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">

        <span className="text-[#407CE2] uppercase tracking-wider font-medium">
          Blogs & Stories
        </span>

        <h2 className="text-3xl lg:text-5xl font-bold mt-3 text-gray-900">
          Health Stories & Insights
        </h2>

        <p className="mt-4 text-lg text-gray-600 leading-8">
          Stay informed with medical insights, wellness guidance,
          patient stories and healthcare updates from Gracespring Hospitals.
        </p>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300"
          >

            {/* Image */}
            <div className="relative h-60">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">

              <span className="bg-[#407CE2]/10 text-[#407CE2] text-xs px-3 py-1 rounded-full font-medium">
                {blog.category}
              </span>

              <h3 className="text-xl font-semibold text-gray-900 leading-snug">
                {blog.title}
              </h3>

              <p className="text-gray-600 text-sm leading-7">
                {blog.summary}
              </p>

              {/* Metadata */}
              <div className="space-y-2 text-sm text-gray-500">

                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {blog.date}
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 size={16} />
                  {blog.time}
                </div>

                <div className="flex items-center gap-2">
                  <UserRound size={16} />
                  {blog.author}
                </div>

              </div>

              <Link
                href={`/blog/${blog.id}`}
                className="inline-flex items-center gap-2 text-[#407CE2] font-medium hover:gap-3 transition"
              >
                Read Story
                <ArrowRight size={18} />
              </Link>

            </div>
          </div>
        ))}

      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <Link
          href="/blog"
          className="inline-block bg-[#407CE2] text-white px-7 py-3 rounded-xl hover:opacity-90 transition"
        >
          View All Stories
        </Link>
      </div>

    </section>
  );
}


// "use client";

// import Image from "next/image";
// import Link from "next/link";

// export default function BlogStories() {
//   return (
//     <section className="w-full bg-white py-16 px-5 lg:px-20">

//       {/* Header */}
//       <div className="max-w-3xl mx-auto text-center mb-12">

//         <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
//           Health Stories & Insights
//         </h2>

//         <p className="mt-4 text-gray-600 text-lg leading-8">
//           Stay informed with expert medical insights, patient stories, wellness guidance,
//           and healthcare updates from Gracespring Hospitals.
//         </p>

//       </div>

//       {/* Blog Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

//         {/* Blog Card 1 */}
//         <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition">

//           <div className="relative h-56">
//             <Image
//               src="/assets/images/blog/blog1.jpg"
//               alt="Blog 1"
//               fill
//               className="object-cover"
//             />
//           </div>

//           <div className="p-6 space-y-3">

//             <p className="text-sm text-[#407CE2] font-medium">
//               Medical Insights
//             </p>

//             <h3 className="text-xl font-semibold text-gray-900">
//               Understanding Preventive Healthcare
//             </h3>

//             <p className="text-gray-600 text-sm leading-6">
//               Learn how early detection and routine checkups can significantly
//               improve long-term health outcomes.
//             </p>

//             <Link
//               href="/blog/1"
//               className="inline-block text-[#407CE2] font-medium hover:underline"
//             >
//               Read More →
//             </Link>

//           </div>

//         </div>

//         {/* Blog Card 2 */}
//         <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition">

//           <div className="relative h-56">
//             <Image
//               src="/assets/images/blog/blog2.jpg"
//               alt="Blog 2"
//               fill
//               className="object-cover"
//             />
//           </div>

//           <div className="p-6 space-y-3">

//             <p className="text-sm text-[#407CE2] font-medium">
//               Patient Story
//             </p>

//             <h3 className="text-xl font-semibold text-gray-900">
//               A Journey of Recovery & Hope
//             </h3>

//             <p className="text-gray-600 text-sm leading-6">
//               A real-life recovery story showcasing compassionate care and
//               medical excellence at Gracespring Hospitals.
//             </p>

//             <Link
//               href="/blog/2"
//               className="inline-block text-[#407CE2] font-medium hover:underline"
//             >
//               Read More →
//             </Link>

//           </div>

//         </div>

//         {/* Blog Card 3 */}
//         <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition">

//           <div className="relative h-56">
//             <Image
//               src="/assets/images/blog/blog3.jpg"
//               alt="Blog 3"
//               fill
//               className="object-cover"
//             />
//           </div>

//           <div className="p-6 space-y-3">

//             <p className="text-sm text-[#407CE2] font-medium">
//               Wellness Tips
//             </p>

//             <h3 className="text-xl font-semibold text-gray-900">
//               Healthy Living Habits That Work
//             </h3>

//             <p className="text-gray-600 text-sm leading-6">
//               Discover simple lifestyle changes that can greatly improve your
//               overall wellbeing and daily energy.
//             </p>

//             <Link
//               href="/blog/3"
//               className="inline-block text-[#407CE2] font-medium hover:underline"
//             >
//               Read More →
//             </Link>

//           </div>

//         </div>

//       </div>

//       {/* CTA */}
//       <div className="text-center mt-12">
//         <Link
//           href="/blog"
//           className="bg-[#407CE2] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
//         >
//           View All Stories
//         </Link>
//       </div>


//     </section>
    
//   );
// }