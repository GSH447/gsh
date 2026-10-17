"use client";
import { Blog } from "../../../../types/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// const BlogItem = ({ blog }: { blog: Blog }) => {

const BlogItem = ({ blog, locale }: { blog: Blog; locale: string }) => {

  const { mainImage, title, metadata } = blog;
  

  return (

    <div className="-mx-2 flex flex-wrap">

      

      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="animate_top rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
      >
        {/* <Link href={`/blog/${blog.id}`} className="relative block aspect-[368/239]"> */}
        <Link href={`/${locale}/blog/${blog.slug}`} className="relative block aspect-[368/239]">

          <Image 
            src={mainImage} 
            alt={title}
            width={500}
            height={500} 
          />
        </Link>

        <div className="px-4">
          <h3 className="mt-2.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
            {/* <Link href={`/blog/${blog.id}`}> */}
            {/* <Link href={`/${locale}/blog/${blog.id}`}> */}
            <Link href={`/${locale}/blog/${blog.slug}`}>

              {`${title.slice(0, 40)}...`}
            </Link>
          </h3>
          <p className="line-clamp-3 text-black dark:text-white dark:hover:text-primary">{metadata}</p>
        </div>
      </motion.div>

    </div>

  );
};

export default BlogItem;