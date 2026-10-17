'use client';

import { useEffect, useState } from 'react';
import SharePost from './SharePost';

const SingleBlogClient = ({ postTitle }) => {
  const [postURL, setPostURL] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPostURL(window.location.href);
    }
  }, []);

  return postURL ? <SharePost postTitle={postTitle} postURL={postURL} /> : null;
};

export default SingleBlogClient;



// 'use client';

// import { useEffect, useState } from 'react';
// import SharePost from '@/components/About/Blog/SharePost';

// type Props = {
//   postTitle: string;
// };

// const SingleBlogClient = ({ postTitle }: Props) => {
//   const [postURL, setPostURL] = useState<string | null>(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setPostURL(window.location.href);
//     }
//   }, []);

//   return postURL ? <SharePost postTitle={postTitle} postURL={postURL} /> : null;
// };

// export default SingleBlogClient;