import Image from "next/image";
import SharePost from "../../../../components/Blogs/Blog/SharePost";
import RelatedPost from "../../../../components/Blogs/Blog/RelatedPost";
import BlogComment from "../../../../components/Blogs/Blog/BlogComment";
import GutenbergRenderer from "../../../../components/Blogs/Blog/GutenbergRenderer";
import BlogData from "../../../../components/Blogs/Blog/blogData";
import ContactForm from "../../../../components/Contact/ContactForm";
import { CheckCircle, ExternalLink } from "lucide-react";









// Parses [Label](https://example.com) into <a target="_blank">
function renderWithLinks(text) {
  if (!text || typeof text !== "string") return text;

  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = markdownLinkRegex.exec(text)) !== null) {
    // Add text preceding the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const label = match[1];
    let url = match[2].trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }

    // Render clickable anchor targeting a new tab/browser
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#407CE2] font-semibold underline underline-offset-2 hover:text-blue-700 transition-colors"
      >
        {label}
      </a>
    );

    lastIndex = markdownLinkRegex.lastIndex;
  }

  // Add trailing text after the last link
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}








// Helper to convert Markdown links [Label](url) into clickable anchor tags
// function renderWithLinks(text) {
//   if (!text) return null;

//   const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+\vert{}www\.[^\s)]+\vert{}[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/[^\s)]*)\)/g;
//   const parts = [];
//   let lastIndex = 0;
//   let match;

//   while ((match = linkRegex.exec(text)) !== null) {
//     if (match.index > lastIndex) {
//       parts.push(text.slice(lastIndex, match.index));
//     }

//     const label = match[1];
//     let url = match[2];
//     if (!url.startsWith("http://") && !url.startsWith("https://")) {
//       url = `https://${url}`;
//     }

//     parts.push(
//       <a
//         key={match.index}
//         href={url}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-[#407CE2] font-semibold underline underline-offset-4 hover:text-blue-700 transition-colors inline-flex items-center gap-1"
//       >
//         {label}
//         <ExternalLink size={14} className="inline flex-shrink-0" />
//       </a>
//     );

//     lastIndex = linkRegex.lastIndex;
//   }

//   if (lastIndex < text.length) {
//     parts.push(text.slice(lastIndex));
//   }

//   return parts;
// }

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(`https://gracespringhospitals.com/wp-json/wp/v2/posts?slug=${params.slug}`);
    if (res.ok) {
      const postArray = await res.json();
      if (postArray.length > 0) {
        return {
          title: postArray[0].title.rendered,
          description: postArray[0].excerpt.rendered.replace(/<[^>]+>/g, "").substring(0, 150),
        };
      }
    }
  } catch (error) {
    console.log("WP Metadata fetch failed, falling back to static");
  }

  const staticPost = BlogData.find((p) => p.slug === params.slug);
  if (staticPost) {
    return {
      title: staticPost.title,
      description: staticPost.metadata ? staticPost.metadata.substring(0, 150) : "Blog Details",
    };
  }

  return { title: "Post Not Found" };
}

export default async function SingleBlogPage({ params }) {
  let wpPost = null;

  // 1. Fetch from WordPress API
  try {
    const res = await fetch(`https://gracespringhospitals.com/wp-json/wp/v2/posts?slug=${params.slug}&_embed`, {
      next: { revalidate: 60 }
    });
    if (res.ok) {
      const postArray = await res.json();
      if (postArray.length > 0) wpPost = postArray[0];
    }
  } catch (error) {
    console.log("WP Post fetch failed, checking static data");
  }

  const staticPost = BlogData.find((p) => p.slug === params.slug);

  if (!wpPost && !staticPost) {
    return (
      <div className="flex h-[60vh] items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-500 font-medium">Publication not found.</p>
      </div>
    );
  }

  // ==========================================
  // RENDER DYNAMIC WORDPRESS POST
  // ==========================================
  if (wpPost) {
    const mainImage = wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/fallback-image.jpg";
    const authorName = wpPost._embedded?.author?.[0]?.name || "Gracespring Admin";
    const publishDate = new Date(wpPost.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    return (
      <section className="py-16 px-5 lg:px-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start w-full">
          
          <div className="w-full lg:w-2/3 flex-1 bg-white p-6 md:p-12 shadow-sm rounded-2xl border border-gray-100">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6 break-words hyphens-auto" dangerouslySetInnerHTML={{ __html: wpPost.title.rendered }} />
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
                <span>By {authorName}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                <span>{publishDate}</span>
              </div>
            </div>

            <div className="relative h-[300px] md:h-[500px] w-full mb-12 rounded-2xl overflow-hidden shadow-sm">
              <Image src={mainImage} alt={wpPost.title.rendered} fill className="object-cover" priority />
            </div>
            
            <div className="prose prose-lg prose-blue max-w-none text-gray-700 prose-img:rounded-xl prose-a:text-[#407CE2] overflow-hidden">
              <GutenbergRenderer content={wpPost.content.rendered} />
            </div>

            <hr className="my-12 border-gray-100" />
            <SharePost postTitle={wpPost.title.rendered} postURL={`https://gracespringhospitals.com/blog/${wpPost.slug}`} />
            <BlogComment postId={wpPost.id} />
            <ContactForm />
          </div>

          <div className="w-full lg:w-1/3 lg:sticky lg:top-28 self-start h-fit z-10 transition-all duration-300">
            <RelatedPost />
          </div>

        </div>
      </section>
    );
  }

  // ==========================================
  // RENDER STATIC FALLBACK POST (BlogData)
  // ==========================================
  const list = staticPost.bulletedBodyA || [];
  const contentImages = staticPost.contentImages || [];
  const references = staticPost.references || [];



  {/* ========================================== */}
  {/* RENDER STATIC FALLBACK POST (BlogData)     */}
  {/* ========================================== */}
  // const list = staticPost.bulletedBodyA || [];
  // const references = staticPost.references || [];

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="mx-auto flex flex-col lg:flex-row gap-10 items-start w-full">
        
        {/* LEFT COLUMN: Main Blog Content */}
        <div className="w-full lg:w-2/3 flex-1 bg-transparent p-2 lg:ml-10 mt-20">
          
          {/* Title & Meta Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              {staticPost.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
              <span>By Admin</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
              <span>{staticPost.publishedAt}</span>
            </div>
          </div>

          {/* Featured Main Image */}
          <div className="relative h-[300px] md:h-[500px] w-full mb-12 rounded-2xl overflow-hidden shadow-sm">
            <Image 
              src={staticPost.mainImage || "/fallback-image.jpg"} 
              alt={staticPost.title} 
              fill 
              className="object-cover" 
              priority 
            />
          </div>
          
          <div className="prose prose-lg prose-blue max-w-none text-gray-700 break-words hyphens-auto">
            {/* Introductory Lead */}
            <p className="lead text-xl text-gray-600 font-medium mb-8">
              {renderWithLinks(staticPost.metadata)}
            </p>
            
            {/* SECTION A */}
            {staticPost.subTitleA && (
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{staticPost.subTitleA}</h2>
            )}
            {staticPost.bodyA && <p>{renderWithLinks(staticPost.bodyA)}</p>}
            
            {/* IMAGE A (Between Section A and Bullet Points) */}
            {staticPost.imageA && (
              <figure className="my-8 not-prose">
                <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden shadow-sm">
                  <Image 
                    src={staticPost.imageA} 
                    alt={staticPost.imageCaptionA || staticPost.subTitleA || "Section image"} 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                {staticPost.imageCaptionA && (
                  <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
                    {staticPost.imageCaptionA}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Bulleted Highlights */}
            {staticPost.bulletedTitleA && (
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 break-words hyphens-auto">
                {staticPost.bulletedTitleA}
              </h3>
            )}
            {list.length > 0 && (
              <ul className="list-none pl-0 space-y-4 not-prose mb-8">
                {list.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <CheckCircle className="text-[#407CE2] flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{renderWithLinks(item)}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* SECTION B */}
            {staticPost.subTitleB && (
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">{staticPost.subTitleB}</h2>
            )}
            {staticPost.bodyB && <p>{renderWithLinks(staticPost.bodyB)}</p>}
            
            {/* IMAGE B (Between Section B and Section C) */}
            {staticPost.imageB && (
              <figure className="my-8 not-prose">
                <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden shadow-sm">
                  <Image 
                    src={staticPost.imageB} 
                    alt={staticPost.imageCaptionB || staticPost.subTitleB || "Section image"} 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                {staticPost.imageCaptionB && (
                  <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
                    {staticPost.imageCaptionB}
                  </figcaption>
                )}
              </figure>
            )}

            {/* SECTION C */}
            {staticPost.subTitleC && (
              <h3 className="text-xl font-bold text-gray-900 mt-12 mb-4">{staticPost.subTitleC}</h3>
            )}
            {staticPost.bodyC && <p>{renderWithLinks(staticPost.bodyC)}</p>}

            {/* IMAGE C (Closing Visual) */}
            {staticPost.imageC && (
              <figure className="my-8 not-prose">
                <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden shadow-sm">
                  <Image 
                    src={staticPost.imageC} 
                    alt={staticPost.imageCaptionC || staticPost.subTitleC || "Section image"} 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                {staticPost.imageCaptionC && (
                  <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
                    {staticPost.imageCaptionC}
                  </figcaption>
                )}
              </figure>
            )}

            {/* External References & Links */}
            {references.length > 0 && (
              <div className="my-10 p-6 rounded-2xl bg-blue-50/60 border border-blue-100 not-prose">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Related Links & Portals</h4>
                <div className="flex flex-wrap gap-3">
                  {references.map((ref, idx) => (
                    <a
                      key={idx}
                      href={ref.url.startsWith("http") ? ref.url : `https://${ref.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-blue-200 text-[#407CE2] font-semibold text-sm shadow-sm hover:bg-[#407CE2] hover:text-white transition-colors"
                    >
                      <span>{ref.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <hr className="my-12 border-gray-100" />
          <SharePost postTitle={staticPost.title} postURL={`https://gracespringhospitals.com/blog/${staticPost.slug}`} />
          <BlogComment postId={staticPost.id} />

          <div className="my-10">
            <ContactForm />
          </div>
        
        </div>

        {/* RIGHT COLUMN: Sticky Sidebar */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-28 self-start h-fit z-10 transition-all duration-300">
          <RelatedPost />
        </div>

      </div>
    </section>
  );



  // return (
  //   <section className="py-16 bg-gray-50 min-h-screen">
  //     <div className="mx-auto flex flex-col lg:flex-row gap-10 items-start w-full">
        
  //       {/* LEFT COLUMN: Main Blog Content */}
  //       <div className="w-full lg:w-2/3 flex-1 bg-transparent p-2 lg:ml-10 mt-20">
          
  //         <div className="mb-8 text-center">
  //           <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">{staticPost.title}</h1>
  //           <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
  //             <span>By Admin</span>
  //             <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
  //             <span>{staticPost.publishedAt}</span>
  //           </div>
  //         </div>

  //         <div className="relative h-[300px] md:h-[500px] w-full mb-12 overflow-hidden shadow-sm">
  //           <Image src={staticPost.mainImage || "/fallback-image.jpg"} alt={staticPost.title} fill className="object-cover" priority />
  //         </div>
          
  //         <div className="prose prose-lg prose-blue max-w-none text-gray-700 break-words hyphens-auto">
  //           <p className="lead text-xl text-gray-600 font-medium">{renderWithLinks(staticPost.metadata)}</p>
            
  //           {staticPost.subTitleA && <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{staticPost.subTitleA}</h2>}
  //           {staticPost.bodyA && <p>{renderWithLinks(staticPost.bodyA)}</p>}
            
  //           {contentImages.length > 0 && (
  //             <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
  //               {contentImages.map((img, index) => (
  //                 <div key={index} className="relative h-64 md:h-80 w-full overflow-hidden shadow-sm group">
  //                   <Image 
  //                     src={img} 
  //                     alt={`Content visual ${index + 1}`} 
  //                     fill 
  //                     className="object-cover group-hover:scale-105 transition-transform duration-700" 
  //                   />
  //                 </div>
  //               ))}
  //             </div>
  //           )}


  //           {staticPost.bulletedTitleA && (
  //             <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 break-words hyphens-auto">
  //               {staticPost.bulletedTitleA}
  //             </h3>
  //           )}

  //           {list.length > 0 && (
  //             <ul className="list-none pl-0 space-y-4 not-prose mb-8">
  //               {list.map((item, index) => (
  //                 <li
  //                   key={index}
  //                   className="flex items-start space-x-3 bg-gray-50 p-4 rounded-xl border border-gray-100"
  //                 >
  //                   <CheckCircle className="text-[#407CE2] flex-shrink-0 mt-0.5" size={20} />
  //                   <span className="text-gray-700 leading-relaxed">
  //                     {renderWithLinks(item)}
  //                   </span>
  //                 </li>
  //               ))}
  //             </ul>
  //           )}

  //           {/* {staticPost.bulletedTitleA && <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 break-words hyphens-auto">{staticPost.bulletedTitleA}</h3>}
  //           {list.length > 0 && (
  //             <ul className="list-none pl-0 space-y-4 not-prose mb-8">
  //               {list.map((item, index) => (
  //                 <li key={index} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
  //                   <CheckCircle className="text-[#407CE2] flex-shrink-0 mt-0.5" size={20} />
  //                   <span className="text-gray-700">{renderWithLinks(item)}</span>
  //                 </li>
  //               ))}
  //             </ul>
  //           )} */}

  //           {staticPost.subTitleB && <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{staticPost.subTitleB}</h2>}
  //           {staticPost.bodyB && <p>{renderWithLinks(staticPost.bodyB)}</p>}
            
  //           {staticPost.subTitleC && <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">{staticPost.subTitleC}</h3>}
  //           {staticPost.bodyC && <p>{renderWithLinks(staticPost.bodyC)}</p>}

  //           {/* Structured External References / Partners Card */}
  //           {references.length > 0 && (
  //             <div className="my-10 p-6 rounded-2xl bg-blue-50/60 border border-blue-100 not-prose">
  //               <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
  //                 <span>Related Initiatives & Official Links</span>
  //               </h4>
  //               <div className="flex flex-wrap gap-3">
  //                 {references.map((ref, idx) => (
  //                   <a
  //                     key={idx}
  //                     href={ref.url.startsWith("http") ? ref.url : `https://${ref.url}`}
  //                     target="_blank"
  //                     rel="noopener noreferrer"
  //                     className="inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-blue-200 text-[#407CE2] font-semibold text-sm shadow-sm hover:bg-[#407CE2] hover:text-white transition-colors"
  //                   >
  //                     <span>{ref.title}</span>
  //                     <ExternalLink size={15} />
  //                   </a>
  //                 ))}
  //               </div>
  //             </div>
  //           )}
  //         </div>

  //         <hr className="my-12 border-gray-100" />
  //         <SharePost postTitle={staticPost.title} postURL={`https://gracespringhospitals.com/blog/${staticPost.slug}`} />
  //         <BlogComment postId={staticPost.id} />

  //         <div className="my-10">
  //           <ContactForm />
  //         </div>
        
  //       </div>

  //       {/* RIGHT COLUMN: Sticky Sidebar */}
  //       <div className="w-full lg:w-1/3 lg:sticky lg:top-28 self-start h-fit z-10 transition-all duration-300">
  //         <RelatedPost />
  //       </div>

  //     </div>
  //   </section>
  // );


}











// import Image from "next/image";
// import SharePost from "../../../../components/Blogs/Blog/SharePost";
// import RelatedPost from "../../../../components/Blogs/Blog/RelatedPost";
// import BlogComment from "../../../../components/Blogs/Blog/BlogComment";
// import GutenbergRenderer from "../../../../components/Blogs/Blog/GutenbergRenderer";
// import BlogData from "../../../../components/Blogs/Blog/blogData";
// import ContactForm from "../../../../components/Contact/ContactForm";
// import { CheckCircle } from "lucide-react";

// export async function generateMetadata({ params }) {
//   try {
//     const res = await fetch(`https://gracespringhospitals.com/wp-json/wp/v2/posts?slug=${params.slug}`);
//     if (res.ok) {
//       const postArray = await res.json();
//       if (postArray.length > 0) {
//         return {
//           title: postArray[0].title.rendered,
//           description: postArray[0].excerpt.rendered.replace(/<[^>]+>/g, "").substring(0, 150),
//         };
//       }
//     }
//   } catch (error) {
//     console.log("WP Metadata fetch failed, falling back to static");
//   }

//   const staticPost = BlogData.find((p) => p.slug === params.slug);
//   if (staticPost) {
//     return {
//       title: staticPost.title,
//       description: staticPost.metadata ? staticPost.metadata.substring(0, 150) : "Blog Details",
//     };
//   }

//   return { title: "Post Not Found" };
// }

// export default async function SingleBlogPage({ params }) {
//   let wpPost = null;

//   // 1. Fetch from WordPress API
//   try {
//     const res = await fetch(`https://gracespringhospitals.com/wp-json/wp/v2/posts?slug=${params.slug}&_embed`, {
//       next: { revalidate: 60 }
//     });
//     if (res.ok) {
//       const postArray = await res.json();
//       if (postArray.length > 0) wpPost = postArray[0];
//     }
//   } catch (error) {
//     console.log("WP Post fetch failed, checking static data");
//   }

//   const staticPost = BlogData.find((p) => p.slug === params.slug);

//   if (!wpPost && !staticPost) {
//     return (
//       <div className="flex h-[60vh] items-center justify-center bg-gray-50">
//         <p className="text-xl text-gray-500 font-medium">Publication not found.</p>
//       </div>
//     );
//   }

//   // ==========================================
//   // RENDER DYNAMIC WORDPRESS POST
//   // ==========================================
//   if (wpPost) {
//     const mainImage = wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/fallback-image.jpg";
//     const authorName = wpPost._embedded?.author?.[0]?.name || "Gracespring Admin";
//     const publishDate = new Date(wpPost.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

//     return (
//       <section className="py-16 px-5 lg:px-20 bg-gray-50 min-h-screen">
//         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start w-full">
          
//           {/* LEFT COLUMN: Main Blog Content */}
//           <div className="w-full lg:w-2/3 flex-1 bg-white p-6 md:p-12 shadow-sm rounded-2xl border border-gray-100">
//             <div className="mb-8 text-center">
//               <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6 break-words hyphens-auto" dangerouslySetInnerHTML={{ __html: wpPost.title.rendered }} />
//               <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
//                 <span>By {authorName}</span>
//                 <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
//                 <span>{publishDate}</span>
//               </div>
//             </div>

//             <div className="relative h-[300px] md:h-[500px] w-full mb-12 rounded-2xl overflow-hidden shadow-sm">
//               <Image src={mainImage} alt={wpPost.title.rendered} fill className="object-cover" priority />
//             </div>
            
//             <div className="prose prose-lg prose-blue max-w-none text-gray-700 prose-img:rounded-xl prose-a:text-[#407CE2] overflow-hidden">
//               <GutenbergRenderer content={wpPost.content.rendered} />
//             </div>

//             <hr className="my-12 border-gray-100" />
//             <SharePost postTitle={wpPost.title.rendered} postURL={`https://gracespringhospitals.com/blog/${wpPost.slug}`} />
//             <BlogComment postId={wpPost.id} />

//             <ContactForm/>
//           </div>

//           {/* RIGHT COLUMN: Sticky Sidebar */}
//           <div className="w-full lg:w-1/3 lg:sticky lg:top-28 self-start h-fit z-10 transition-all duration-300">
//             <RelatedPost />
//           </div>

//         </div>
//       </section>
//     );
//   }

//   // ==========================================
//   // RENDER STATIC FALLBACK POST (BlogData)
//   // ==========================================
//   const list = staticPost.bulletedBodyA || [];
//   const contentImages = staticPost.contentImages || [];

//   return (
//     <section className="py-16 bg-gray-50 min-h-screen">
//       <div className="mx-auto flex flex-col lg:flex-row gap-10 items-start w-full ">
        
//         {/* LEFT COLUMN: Main Blog Content */}
//         <div className="w-full lg:w-2/3 flex-1 bg-transparent p-2 lg:ml-10 mt-20">
          
//           <div className="mb-8 text-center">
//             <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">{staticPost.title}</h1>
//             <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
//               <span>By Admin</span>
//               <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
//               <span>{staticPost.publishedAt}</span>
//             </div>
//           </div>

//           <div className="relative h-[300px] md:h-[500px] w-full mb-12 overflow-hidden shadow-sm">
//             <Image src={staticPost.mainImage || "/fallback-image.jpg"} alt={staticPost.title} fill className="object-cover" priority />
//           </div>
          
//           <div className="prose prose-lg prose-blue max-w-none text-gray-700 break-words hyphens-auto">
//             <p className="lead text-xl text-gray-600 font-medium">{staticPost.metadata}</p>
            
//             {staticPost.subTitleA && <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{staticPost.subTitleA}</h2>}
//             {staticPost.bodyA && <p>{staticPost.bodyA}</p>}
            
//             {contentImages.length > 0 && (
//               <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
//                 {contentImages.map((img, index) => (
//                   <div key={index} className="relative h-64 md:h-80 w-full overflow-hidden shadow-sm group">
//                     <Image 
//                       src={img} 
//                       alt={`Content visual ${index + 1}`} 
//                       fill 
//                       className="object-cover group-hover:scale-105 transition-transform duration-700" 
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}

//             {staticPost.bulletedTitleA && <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 break-words hyphens-auto">{staticPost.bulletedTitleA}</h3>}
//             {list.length > 0 && (
//               <ul className="list-none pl-0 space-y-4 not-prose mb-8">
//                 {list.map((item, index) => (
//                   <li key={index} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
//                     <CheckCircle className="text-[#407CE2] flex-shrink-0 mt-0.5" size={20} />
//                     <span className="text-gray-700">{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {staticPost.subTitleB && <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{staticPost.subTitleB}</h2>}
//             {staticPost.bodyB && <p>{staticPost.bodyB}</p>}
            
//             {staticPost.subTitleC && <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">{staticPost.subTitleC}</h3>}
//             {staticPost.bodyC && <p>{staticPost.bodyC}</p>}
//           </div>

//           <hr className="my-12 border-gray-100" />
//           <SharePost postTitle={staticPost.title} postURL={`https://gracespringhospitals.com/blog/${staticPost.slug}`} />
//           <BlogComment postId={staticPost.id} />

//           <div className="my-10">
  
//             <ContactForm/>
        
//           </div>
        
//         </div>

//         {/* RIGHT COLUMN: Sticky Sidebar */}
//         <div className="w-full lg:w-1/3 lg:sticky lg:top-28 self-start h-fit z-10 transition-all duration-300 ">
//           <RelatedPost />
//         </div>

//       </div>
//     </section>
//   );
// }


// import Image from "next/image";
// import SharePost from "../../../../components/Blogs/Blog/SharePost";
// import RelatedPost from "../../../../components/Blogs/Blog/RelatedPost";
// import BlogComment from "../../../../components/Blogs/Blog/BlogComment";
// import GutenbergRenderer from "../../../../components/Blogs/Blog/GutenbergRenderer";
// import BlogData from "../../../../components/Blogs/Blog/blogData";
// import { CheckCircle } from "lucide-react";

// export async function generateMetadata({ params }) {
//   try {
//     const res = await fetch(`https://gracespringhospitals.com/wp-json/wp/v2/posts?slug=${params.slug}`);
//     if (res.ok) {
//       const postArray = await res.json();
//       if (postArray.length > 0) {
//         return {
//           title: postArray[0].title.rendered,
//           description: postArray[0].excerpt.rendered.replace(/<[^>]+>/g, "").substring(0, 150),
//         };
//       }
//     }
//   } catch (error) {
//     console.log("WP Metadata fetch failed, falling back to static");
//   }

//   const staticPost = BlogData.find((p) => p.slug === params.slug);
//   if (staticPost) {
//     return {
//       title: staticPost.title,
//       description: staticPost.metadata ? staticPost.metadata.substring(0, 150) : "Blog Details",
//     };
//   }

//   return { title: "Post Not Found" };
// }

// export default async function SingleBlogPage({ params }) {
//   let wpPost = null;

//   // 1. Fetch from WordPress API
//   try {
//     const res = await fetch(`https://gracespringhospitals.com/wp-json/wp/v2/posts?slug=${params.slug}&_embed`, {
//       next: { revalidate: 60 }
//     });
//     if (res.ok) {
//       const postArray = await res.json();
//       if (postArray.length > 0) wpPost = postArray[0];
//     }
//   } catch (error) {
//     console.log("WP Post fetch failed, checking static data");
//   }

//   const staticPost = BlogData.find((p) => p.slug === params.slug);

//   if (!wpPost && !staticPost) {
//     return (
//       <div className="flex h-[60vh] items-center justify-center bg-gray-50">
//         <p className="text-xl text-gray-500 font-medium">Publication not found.</p>
//       </div>
//     );
//   }

//   // ==========================================
//   // RENDER DYNAMIC WORDPRESS POST
//   // ==========================================
//   if (wpPost) {
//     const mainImage = wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/fallback-image.jpg";
//     const authorName = wpPost._embedded?.author?.[0]?.name || "Gracespring Admin";
//     const publishDate = new Date(wpPost.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

//     return (
//       <section className="py-16 px-5 lg:px-20 bg-gray-50 min-h-screen relative">
//         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start w-full">
          
//           {/* LEFT COLUMN: Main Blog Content */}
//           <div className="w-full lg:w-2/3 flex-1 bg-white p-6 md:p-12 shadow-sm rounded-2xl border border-gray-100">
//             <div className="mb-8 text-center">
//               <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6" dangerouslySetInnerHTML={{ __html: wpPost.title.rendered }} />
//               <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
//                 <span>By {authorName}</span>
//                 <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
//                 <span>{publishDate}</span>
//               </div>
//             </div>

//             <div className="relative h-[300px] md:h-[500px] w-full mb-12 rounded-2xl overflow-hidden shadow-sm">
//               <Image src={mainImage} alt={wpPost.title.rendered} fill className="object-cover" priority />
//             </div>
            
//             <div className="prose prose-lg prose-blue max-w-none text-gray-700 prose-img:rounded-xl prose-a:text-[#407CE2] overflow-hidden">
//               <GutenbergRenderer content={wpPost.content.rendered} />
//             </div>

//             <hr className="my-12 border-gray-100" />
//             <SharePost postTitle={wpPost.title.rendered} postURL={`https://gracespringhospitals.com/blog/${wpPost.slug}`} />
//             <BlogComment postId={wpPost.id} />
//           </div>

//           {/* RIGHT COLUMN: Sticky Sidebar */}
//           {/* The self-start and h-fit classes are required to prevent flexbox stretching and allow sticky to work */}
//           <div className="w-full lg:w-1/3 lg:sticky lg:top-28 self-start h-fit z-10 transition-all duration-300">
//             <RelatedPost />
//           </div>

//         </div>
//       </section>
//     );
//   }

//   // ==========================================
//   // RENDER STATIC FALLBACK POST (BlogData)
//   // ==========================================
//   const list = staticPost.bulletedBodyA || [];
//   const contentImages = staticPost.contentImages || [];

//   return (
//     <section className="py-16 px-5 lg:px-20 bg-gray-50 min-h-screen relative">
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start w-full">
        
//         {/* LEFT COLUMN: Main Blog Content */}
//         <div className="w-full lg:w-2/3 flex-1 bg-white p-6 md:p-12 shadow-sm rounded-2xl border border-gray-100">
          
//           <div className="mb-8 text-center">
//             <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">{staticPost.title}</h1>
//             <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
//               <span>By Gracespring Admin</span>
//               <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
//               <span>{staticPost.publishedAt}</span>
//             </div>
//           </div>

//           <div className="relative h-[300px] md:h-[500px] w-full mb-12 rounded-2xl overflow-hidden shadow-sm">
//             <Image src={staticPost.mainImage || "/fallback-image.jpg"} alt={staticPost.title} fill className="object-cover" priority />
//           </div>
          
//           <div className="prose prose-lg prose-blue max-w-none text-gray-700">
//             <p className="lead text-xl text-gray-600 font-medium">{staticPost.metadata}</p>
            
//             {staticPost.subTitleA && <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{staticPost.subTitleA}</h2>}
//             {staticPost.bodyA && <p>{staticPost.bodyA}</p>}
            
//             {contentImages.length > 0 && (
//               <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
//                 {contentImages.map((img, index) => (
//                   <div key={index} className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-sm group">
//                     <Image 
//                       src={img} 
//                       alt={`Content visual ${index + 1}`} 
//                       fill 
//                       className="object-cover group-hover:scale-105 transition-transform duration-700" 
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}

//             {staticPost.bulletedTitleA && <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">{staticPost.bulletedTitleA}</h3>}
//             {list.length > 0 && (
//               <ul className="list-none pl-0 space-y-4 not-prose mb-8">
//                 {list.map((item, index) => (
//                   <li key={index} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
//                     <CheckCircle className="text-[#407CE2] flex-shrink-0 mt-0.5" size={20} />
//                     <span className="text-gray-700">{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {staticPost.subTitleB && <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{staticPost.subTitleB}</h2>}
//             {staticPost.bodyB && <p>{staticPost.bodyB}</p>}
            
//             {staticPost.subTitleC && <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">{staticPost.subTitleC}</h3>}
//             {staticPost.bodyC && <p>{staticPost.bodyC}</p>}
//           </div>

//           <hr className="my-12 border-gray-100" />
//           <SharePost postTitle={staticPost.title} postURL={`https://gracespringhospitals.com/blog/${staticPost.slug}`} />
//           <BlogComment postId={staticPost.id} />
//         </div>

//         {/* RIGHT COLUMN: Sticky Sidebar */}
//         {/* The self-start and h-fit classes are required to prevent flexbox stretching and allow sticky to work */}
//         <div className="w-full lg:w-1/3 lg:sticky lg:top-28 self-start h-fit z-10 transition-all duration-300">
//           <RelatedPost />
//         </div>

//       </div>
//     </section>
//   );
// }
// import Image from "next/image";
// import SharePost from "../../../../components/Blogs/Blog/SharePost";
// import RelatedPost from "../../../../components/Blogs/Blog/RelatedPost";
// import BlogComment from "../../../../components/Blogs/Blog/BlogComment";
// import GutenbergRenderer from "../../../../components/Blogs/Blog/GutenbergRenderer";
// import BlogData from "../../../../components/Blogs/Blog/blogData";
// import { CheckCircle } from "lucide-react";

// export async function generateMetadata({ params }) {
//   try {
//     const res = await fetch(`https://gracespringhospitals.com/wp-json/wp/v2/posts?slug=${params.slug}`);
//     if (res.ok) {
//       const postArray = await res.json();
//       if (postArray.length > 0) {
//         return {
//           title: postArray[0].title.rendered,
//           description: postArray[0].excerpt.rendered.replace(/<[^>]+>/g, "").substring(0, 150),
//         };
//       }
//     }
//   } catch (error) {
//     console.log("WP Metadata fetch failed, falling back to static");
//   }

//   const staticPost = BlogData.find((p) => p.slug === params.slug);
//   if (staticPost) {
//     return {
//       title: staticPost.title,
//       description: staticPost.metadata ? staticPost.metadata.substring(0, 150) : "Blog Details",
//     };
//   }

//   return { title: "Post Not Found" };
// }

// export default async function SingleBlogPage({ params }) {
//   let wpPost = null;

//   // 1. Fetch from WordPress API
//   try {
//     const res = await fetch(`https://gracespringhospitals.com/wp-json/wp/v2/posts?slug=${params.slug}&_embed`, {
//       next: { revalidate: 60 }
//     });
//     if (res.ok) {
//       const postArray = await res.json();
//       if (postArray.length > 0) wpPost = postArray[0];
//     }
//   } catch (error) {
//     console.log("WP Post fetch failed, checking static data");
//   }

//   const staticPost = BlogData.find((p) => p.slug === params.slug);

//   if (!wpPost && !staticPost) {
//     return (
//       <div className="flex h-[60vh] items-center justify-center bg-gray-50">
//         <p className="text-xl text-gray-500 font-medium">Publication not found.</p>
//       </div>
//     );
//   }

//   // ==========================================
//   // RENDER DYNAMIC WORDPRESS POST
//   // ==========================================
//   if (wpPost) {
//     const mainImage = wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/fallback-image.jpg";
//     const authorName = wpPost._embedded?.author?.[0]?.name || "Gracespring Admin";
//     const publishDate = new Date(wpPost.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

//     return (
//       <section className="py-16 px-5 lg:px-20 bg-gray-50 min-h-screen ">
//         {/* ADDED items-start HERE TO FIX STICKY SCROLLING */}
//         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start">
          
//           {/* LEFT COLUMN: Main Blog Content */}
//           <div className="lg:w-2/3 bg-white p-6 md:p-12 shadow-sm rounded-2xl border border-gray-100  ">
//             <div className="mb-8 text-center">
//               <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6" dangerouslySetInnerHTML={{ __html: wpPost.title.rendered }} />
//               <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
//                 <span>By {authorName}</span>
//                 <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
//                 <span>{publishDate}</span>
//               </div>
//             </div>

//             <div className="relative h-[300px] md:h-[500px] w-full mb-12 rounded-2xl overflow-hidden shadow-sm">
//               <Image src={mainImage} alt={wpPost.title.rendered} fill className="object-cover" priority />
//             </div>
            
//             <div className="prose prose-lg prose-blue max-w-none text-gray-700 prose-img:rounded-xl prose-a:text-[#407CE2] overflow-hidden">
//               <GutenbergRenderer content={wpPost.content.rendered} />
//             </div>

//             <hr className="my-12 border-gray-100" />
//             <SharePost postTitle={wpPost.title.rendered} postURL={`https://gracespringhospitals.com/blog/${wpPost.slug}`} />
//             <BlogComment postId={wpPost.id} />
//           </div>

//           {/* RIGHT COLUMN: MOVED STICKY CLASS DIRECTLY TO THE WRAPPER */}
//           <div className="lg:w-1/3 fixed top-24  ">
//             <RelatedPost />
//           </div>

//         </div>
//       </section>
//     );
//   }

//   // ==========================================
//   // RENDER STATIC FALLBACK POST (BlogData)
//   // ==========================================
//   const list = staticPost.bulletedBodyA || [];
//   const contentImages = staticPost.contentImages || [];

//   return (
//     <section className="py-16 px-5 lg:px-20 bg-gray-50 min-h-screen">
//       {/* ADDED items-start HERE TO FIX STICKY SCROLLING */}
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start">
        
//         {/* LEFT COLUMN: Main Blog Content */}
//         <div className="lg:w-2/3 bg-white p-6 md:p-12 shadow-sm rounded-2xl border border-gray-100">
          
//           <div className="mb-8 text-center">
//             <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">{staticPost.title}</h1>
//             <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
//               <span>By Gracespring Admin</span>
//               <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
//               <span>{staticPost.publishedAt}</span>
//             </div>
//           </div>

//           <div className="relative h-[300px] md:h-[500px] w-full mb-12 rounded-2xl overflow-hidden shadow-sm">
//             <Image src={staticPost.mainImage || "/fallback-image.jpg"} alt={staticPost.title} fill className="object-cover" priority />
//           </div>
          
//           <div className="prose prose-lg prose-blue max-w-none text-gray-700">
//             <p className="lead text-xl text-gray-600 font-medium">{staticPost.metadata}</p>
            
//             {staticPost.subTitleA && <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{staticPost.subTitleA}</h2>}
//             {staticPost.bodyA && <p>{staticPost.bodyA}</p>}
            
//             {/* RESPONSIVE MULTIPLE PICTURES */}
//             {contentImages.length > 0 && (
//               <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
//                 {contentImages.map((img, index) => (
//                   <div key={index} className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-sm group">
//                     <Image 
//                       src={img} 
//                       alt={`Content visual ${index + 1}`} 
//                       fill 
//                       className="object-cover group-hover:scale-105 transition-transform duration-700" 
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}

//             {staticPost.bulletedTitleA && <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">{staticPost.bulletedTitleA}</h3>}
//             {list.length > 0 && (
//               <ul className="list-none pl-0 space-y-4 not-prose mb-8">
//                 {list.map((item, index) => (
//                   <li key={index} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
//                     <CheckCircle className="text-[#407CE2] flex-shrink-0 mt-0.5" size={20} />
//                     <span className="text-gray-700">{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {staticPost.subTitleB && <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{staticPost.subTitleB}</h2>}
//             {staticPost.bodyB && <p>{staticPost.bodyB}</p>}
            
//             {staticPost.subTitleC && <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">{staticPost.subTitleC}</h3>}
//             {staticPost.bodyC && <p>{staticPost.bodyC}</p>}
//           </div>

//           <hr className="my-12 border-gray-100" />
//           <SharePost postTitle={staticPost.title} postURL={`https://gracespringhospitals.com/blog/${staticPost.slug}`} />
//         </div>

//         {/* RIGHT COLUMN: MOVED STICKY CLASS DIRECTLY TO THE WRAPPER */}
//         <div className="lg:w-1/3 sticky top-24">
//           <RelatedPost />
//         </div>

//       </div>
//     </section>
//   );
// }

// import Image from "next/image";
// import SharePost from "../../../../components/Blogs/Blog/SharePost";
// import RelatedPost from "../../../../components/Blogs/Blog/RelatedPost";
// import BlogComment from "../../../../components/Blogs/Blog/BlogComment";
// import GutenbergRenderer from "../../../../components/Blogs/Blog/GutenbergRenderer";
// import BlogData from "../../../../components/Blogs/Blog/blogData";
// import { CheckCircle } from "lucide-react";

// export async function generateMetadata({ params }) {
//   try {
//     const res = await fetch(`https://gracespringhospitals.com/wp-json/wp/v2/posts?slug=${params.slug}`);
//     if (res.ok) {
//       const postArray = await res.json();
//       if (postArray.length > 0) {
//         return {
//           title: postArray[0].title.rendered,
//           description: postArray[0].excerpt.rendered.replace(/<[^>]+>/g, "").substring(0, 150),
//         };
//       }
//     }
//   } catch (error) {
//     console.log("WP Metadata fetch failed, falling back to static");
//   }

//   const staticPost = BlogData.find((p) => p.slug === params.slug);
//   if (staticPost) {
//     return {
//       title: staticPost.title,
//       description: staticPost.metadata ? staticPost.metadata.substring(0, 150) : "Blog Details",
//     };
//   }

//   return { title: "Post Not Found" };
// }

// export default async function SingleBlogPage({ params }) {
//   let wpPost = null;

//   // 1. Fetch from WordPress API
//   try {
//     const res = await fetch(`https://gracespringhospitals.com/wp-json/wp/v2/posts?slug=${params.slug}&_embed`, {
//       next: { revalidate: 60 }
//     });
//     if (res.ok) {
//       const postArray = await res.json();
//       if (postArray.length > 0) wpPost = postArray[0];
//     }
//   } catch (error) {
//     console.log("WP Post fetch failed, checking static data");
//   }

//   const staticPost = BlogData.find((p) => p.slug === params.slug);

//   if (!wpPost && !staticPost) {
//     return (
//       <div className="flex h-[60vh] items-center justify-center bg-gray-50">
//         <p className="text-xl text-gray-500 font-medium">Publication not found.</p>
//       </div>
//     );
//   }

//   // ==========================================
//   // RENDER DYNAMIC WORDPRESS POST
//   // ==========================================
//   if (wpPost) {
//     const mainImage = wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/fallback-image.jpg";
//     const authorName = wpPost._embedded?.author?.[0]?.name || "Gracespring Admin";
//     const publishDate = new Date(wpPost.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

//     return (
//       <section className="py-16 px-5 lg:px-20 bg-gray-50 min-h-screen">
//         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          
//           {/* LEFT COLUMN: Main Blog Content (Takes 2/3 space on Desktop) */}
//           <div className="lg:w-2/3 bg-white p-6 md:p-12 shadow-sm rounded-2xl border border-gray-100">
//             <div className="mb-8 text-center">
//               <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6" dangerouslySetInnerHTML={{ __html: wpPost.title.rendered }} />
//               <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
//                 <span>By {authorName}</span>
//                 <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
//                 <span>{publishDate}</span>
//               </div>
//             </div>

//             <div className="relative h-[300px] md:h-[500px] w-full mb-12 rounded-2xl overflow-hidden shadow-sm">
//               <Image src={mainImage} alt={wpPost.title.rendered} fill className="object-cover" priority />
//             </div>
            
//             <div className="prose prose-lg prose-blue max-w-none text-gray-700 prose-img:rounded-xl prose-a:text-[#407CE2] overflow-hidden">
//               <GutenbergRenderer content={wpPost.content.rendered} />
//             </div>

//             <hr className="my-12 border-gray-100" />
//             <SharePost postTitle={wpPost.title.rendered} postURL={`https://gracespringhospitals.com/blog/${wpPost.slug}`} />
//             <BlogComment postId={wpPost.id} />
//           </div>

//           {/* RIGHT COLUMN: Sidebar / Related Posts (Takes 1/3 space and becomes sticky on Desktop) */}
//           <div className="lg:w-1/3">
//             <div className="sticky top-24">
//               <RelatedPost />
//             </div>
//           </div>

//         </div>
//       </section>
//     );
//   }

//   // ==========================================
//   // RENDER STATIC FALLBACK POST (BlogData)
//   // ==========================================
//   const list = staticPost.bulletedBodyA || [];
//   const contentImages = staticPost.contentImages || [];

//   return (
//     <section className="py-16 px-5 lg:px-20 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        
//         {/* LEFT COLUMN: Main Blog Content (Takes 2/3 space on Desktop) */}
//         <div className="lg:w-2/3 bg-white p-6 md:p-12 shadow-sm rounded-2xl border border-gray-100">
          
//           <div className="mb-8 text-center">
//             <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">{staticPost.title}</h1>
//             <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
//               <span>By Gracespring Admin</span>
//               <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
//               <span>{staticPost.publishedAt}</span>
//             </div>
//           </div>

//           <div className="relative h-[300px] md:h-[500px] w-full mb-12 rounded-2xl overflow-hidden shadow-sm">
//             <Image src={staticPost.mainImage || "/fallback-image.jpg"} alt={staticPost.title} fill className="object-cover" priority />
//           </div>
          
//           <div className="prose prose-lg prose-blue max-w-none text-gray-700">
//             <p className="lead text-xl text-gray-600 font-medium">{staticPost.metadata}</p>
            
//             {staticPost.subTitleA && <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{staticPost.subTitleA}</h2>}
//             {staticPost.bodyA && <p>{staticPost.bodyA}</p>}
            
//             {/* RESPONSIVE MULTIPLE PICTURES */}
//             {contentImages.length > 0 && (
//               <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
//                 {contentImages.map((img, index) => (
//                   <div key={index} className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-sm group">
//                     <Image 
//                       src={img} 
//                       alt={`Content visual ${index + 1}`} 
//                       fill 
//                       className="object-cover group-hover:scale-105 transition-transform duration-700" 
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}

//             {staticPost.bulletedTitleA && <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">{staticPost.bulletedTitleA}</h3>}
//             {list.length > 0 && (
//               <ul className="list-none pl-0 space-y-4 not-prose mb-8">
//                 {list.map((item, index) => (
//                   <li key={index} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
//                     <CheckCircle className="text-[#407CE2] flex-shrink-0 mt-0.5" size={20} />
//                     <span className="text-gray-700">{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {staticPost.subTitleB && <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{staticPost.subTitleB}</h2>}
//             {staticPost.bodyB && <p>{staticPost.bodyB}</p>}
            
//             {staticPost.subTitleC && <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">{staticPost.subTitleC}</h3>}
//             {staticPost.bodyC && <p>{staticPost.bodyC}</p>}
//           </div>

//           <hr className="my-12 border-gray-100" />
//           <SharePost postTitle={staticPost.title} postURL={`https://gracespringhospitals.com/blog/${staticPost.slug}`} />
//         </div>

//         {/* RIGHT COLUMN: Sidebar / Related Posts (Takes 1/3 space and becomes sticky on Desktop) */}
//         <div className="lg:w-1/3">
//           <div className="sticky top-24">
//             <RelatedPost />
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }
// import Image from "next/image";
// import SharePost from "../../../../components/Blogs/Blog/SharePost";
// import RelatedPost from "../../../../components/Blogs/Blog/RelatedPost";
// import BlogComment from "../../../../components/Blogs/Blog/BlogComment";
// import GutenbergRenderer from "../../../../components/Blogs/Blog/GutenbergRenderer";
// import BlogData from "../../../../components/Blogs/Blog/blogData";

// // FIX: Use default import for MUI icons in Server Components
// // import CheckCircleOutline from "@mui/icons-material";
// import { CheckCircle } from "lucide-react";

// // Fetch SEO Metadata dynamically from WordPress, fallback to static data
// export async function generateMetadata({ params }) {
//   try {
//     const res = await fetch(`https://gracespringhospitals.com/wp-json/wp/v2/posts?slug=${params.slug}`);
//     if (res.ok) {
//       const postArray = await res.json();
//       if (postArray.length > 0) {
//         return {
//           title: postArray[0].title.rendered,
//           description: postArray[0].excerpt.rendered.replace(/<[^>]+>/g, "").substring(0, 150),
//         };
//       }
//     }
//   } catch (error) {
//     console.log("WP Metadata fetch failed, falling back to static");
//   }

//   // Fallback to Static Data
//   const staticPost = BlogData.find((p) => p.slug === params.slug);
//   if (staticPost) {
//     return {
//       title: staticPost.title,
//       description: staticPost.metadata ? staticPost.metadata.substring(0, 150) : "Blog Details",
//     };
//   }

//   return { title: "Post Not Found" };
// }

// export default async function SingleBlogPage({ params }) {
//   let wpPost = null;

//   // 1. Try to fetch the specific post by its slug from WordPress API
//   try {
//     const res = await fetch(`https://gracespringhospitals.com/wp-json/wp/v2/posts?slug=${params.slug}&_embed`, {
//       next: { revalidate: 60 }
//     });
//     if (res.ok) {
//       const postArray = await res.json();
//       if (postArray.length > 0) wpPost = postArray[0];
//     }
//   } catch (error) {
//     console.log("WP Post fetch failed, checking static data");
//   }

//   // 2. Check Static Data
//   const staticPost = BlogData.find((p) => p.slug === params.slug);

//   if (!wpPost && !staticPost) {
//     return <p className="text-center py-20">Blog post not found.</p>;
//   }

//   // ==========================================
//   // RENDER DYNAMIC WORDPRESS POST
//   // ==========================================
//   if (wpPost) {
//     const mainImage = wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/fallback-image.jpg";
//     return (
//       <section className="py-16 px-5 lg:px-20 bg-[#f9fbff]">
//         <div className="max-w-4xl mx-auto bg-white p-8 shadow-sm rounded-xl border border-gray-100">
//           <div className="relative h-[400px] w-full mb-8">
//             <Image src={mainImage} alt={wpPost.title.rendered} fill className="object-cover rounded-xl" />
//           </div>
//           <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900" dangerouslySetInnerHTML={{ __html: wpPost.title.rendered }} />
//           <GutenbergRenderer content={wpPost.content.rendered} />
//           <SharePost postTitle={wpPost.title.rendered} postURL={`https://gracespringhospitals.com/blog/${wpPost.slug}`} />
//           <BlogComment postId={wpPost.id} />
//         </div>
//         <div className="max-w-4xl mx-auto mt-12"><RelatedPost /></div>
//       </section>
//     );
//   }

//   // ==========================================
//   // RENDER STATIC FALLBACK POST (BlogData)
//   // ==========================================
//   const list = staticPost.bulletedBodyA || [];
//   return (
//     <section className="py-16 px-5 lg:px-20 bg-[#f9fbff]">
//       <div className="max-w-4xl mx-auto bg-white p-8 shadow-sm rounded-xl border border-gray-100">
//         <div className="relative h-[400px] w-full mb-8">
//           <Image src={staticPost.mainImage || "/fallback-image.jpg"} alt={staticPost.title} fill className="object-cover rounded-xl" />
//         </div>

//         <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900">{staticPost.title}</h1>
        
//         <div className="prose lg:prose-lg max-w-none text-gray-800">
//           <p>{staticPost.metadata}</p>
          
//           {staticPost.subTitleA && <h3>{staticPost.subTitleA}</h3>}
//           {staticPost.bodyA && <p>{staticPost.bodyA}</p>}
          
//           {staticPost.bulletedTitleA && <h3>{staticPost.bulletedTitleA}</h3>}
//           {list.length > 0 && (
//             <ul className="list-none pl-0 space-y-3">
//               {list.map((item, index) => (
//                 <li key={index} className="flex items-start space-x-3">
    

//                 <CheckCircle className="text-[#407CE2] flex-shrink-0 mt-1" size={20} />
    
//                   {/* <CheckCircleOutline className="text-[#407CE2] flex-shrink-0 mt-1" /> */}
//                   <span>{item}</span>
//                 </li>
//               ))}
//             </ul>
//           )}

//           {staticPost.subTitleB && <h3>{staticPost.subTitleB}</h3>}
//           {staticPost.bodyB && <p>{staticPost.bodyB}</p>}
          
//           {staticPost.subTitleC && <h3>{staticPost.subTitleC}</h3>}
//           {staticPost.bodyC && <p>{staticPost.bodyC}</p>}
//         </div>

//         <SharePost postTitle={staticPost.title} postURL={`https://gracespringhospitals.com/blog/${staticPost.slug}`} />
//       </div>
//       <div className="max-w-4xl mx-auto mt-12"><RelatedPost /></div>
//     </section>
//   );
// }

