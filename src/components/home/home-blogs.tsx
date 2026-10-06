"use client";

import { useState, useEffect } from "react";
import { BlogItem } from "@/types/blog";
import BlogCard from "@/components/blogs/blog-card";
import Slider from "@/components/ui/slider";

const LIMIT = 8;

interface HomeBlogsProps {
  initialBlogs?: BlogItem[];
}

export default function HomeBlogs({ initialBlogs = [] }: HomeBlogsProps) {
  const [blogs, setBlogs] = useState<BlogItem[]>(initialBlogs.slice(0, LIMIT));
  const [prevInitial, setPrevInitial] = useState(initialBlogs);

  if (initialBlogs !== prevInitial) {
    setPrevInitial(initialBlogs);
    setBlogs(initialBlogs.slice(0, LIMIT));
  }

  useEffect(() => {
    let isMounted = true;
    const fetchLatest = () => {
      import("@/lib/supabase/queries").then(({ getBlogs }) => getBlogs()).then((data) => {
        if (isMounted && data) {
          setBlogs(data.slice(0, LIMIT));
        }
      });
    };

    if (!initialBlogs || initialBlogs.length === 0) {
      fetchLatest();
    }

    const handleUpdate = () => fetchLatest();
    window.addEventListener("dmn-blogs-updated", handleUpdate);
    window.addEventListener("focus", handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("dmn-blogs-updated", handleUpdate);
      window.removeEventListener("focus", handleUpdate);
    };
  }, [initialBlogs]);

  if (blogs.length === 0) return null;

  return (
    <section className="block" id="journal" aria-labelledby="journal-title">
      <div className="container-wide">
        <div className="block-head reveal">
          <h2 id="journal-title" className="block-title">
            Our <span className="hl">Blogs</span>
          </h2>
        </div>

        <div className="reveal">
          <Slider label="Blog articles" perView={[1.2, 2, 3, 4]} arrowTop="30%">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
