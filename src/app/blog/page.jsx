import BlogStories from "../../../components/Blogs";

export const metadata = {
  title: "Blog | Gracespring Hospitals",
  description: "Stay informed with medical insights, wellness guidance, and healthcare updates from Gracespring Hospitals.",
};

export default function BlogListingPage() {
  return (
    <div className="pt-20">
      {/* Blog Page shows ALL stories */}
      <BlogStories featuredOnly={false} />
    </div>
  );
}