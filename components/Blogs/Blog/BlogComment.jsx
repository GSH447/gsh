'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [likes, setLikes] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', content: '' });

  // Only fetch WP features if postId is a valid numeric WP ID
  const isWpPost = typeof postId === 'number';

  useEffect(() => {
    if (!isWpPost || comments.length === 0) return;
    
    const fetchLikes = async () => {
      const allLikes = await Promise.all(
        comments.map(async (c) => {
          try {
            const res = await fetch(`https://gracespringhospitals.com/wp-json/custom/v1/comment-like/${c.id}`);
            if(res.ok) {
              const json = await res.json();
              return [c.id, json.likes];
            }
          } catch (e) {
            // Ignore error
          }
          return [c.id, 0];
        })
      );
      setLikes(Object.fromEntries(allLikes));
    };
  
    fetchLikes();
  }, [comments, isWpPost]);

  useEffect(() => {
    if (!isWpPost) return;

    const fetchComments = async () => {
      try {
        const res = await fetch(`https://gracespringhospitals.com/wp-json/wp/v2/comments?post=${postId}`);
        if(res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
    const interval = setInterval(fetchComments, 10000);
    return () => clearInterval(interval);
  }, [postId, isWpPost]);

  const handleSubmit = async (e, parent = 0) => {
    e.preventDefault();
    setStatus('Submitting...');

    if (!isWpPost) {
      setStatus('✅ Comment submitted. Awaiting approval from Gracespring admin.');
      setFormData({ name: '', email: '', content: '' });
      setReplyingTo(null);
      return;
    }

    try {
      const res = await fetch('https://gracespringhospitals.com/wp-json/wp/v2/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post: postId,
          author_name: formData.name,
          author_email: formData.email,
          content: parent !== 0 ? `@${getCommentAuthor(parent)} ${formData.content}` : formData.content,
          parent,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus('✅ Comment submitted and awaiting approval.');
        setFormData({ name: '', email: '', content: '' });
        setReplyingTo(null);
      } else {
        setStatus('❌ Failed to submit comment: ' + (result.message || 'Please try again.'));
      }
    } catch (error) {
      setStatus('❌ Network error. Please try again later.');
    }
  };

  const getCommentAuthor = (id) => {
    const parent = comments.find((c) => c.id === id);
    return parent ? parent.author_name : '';
  };

  const handleLike = async (id) => {
    if (!isWpPost) return;

    try {
      const res = await fetch(`https://gracespringhospitals.com/wp-json/custom/v1/comment-like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment_id: id }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setLikes((prev) => ({ ...prev, [id]: data.likes }));
      }
    } catch (error) {
      console.error("Failed to like comment", error);
    }
  };
  
  const renderComments = (parentId = 0, level = 0) => {
    const nested = comments.filter((c) => c.parent === parentId);

    return (
      <ul className={`space-y-5 ${level > 0 ? 'ml-6 border-l pl-4 border-gray-300' : ''}`}>
        {nested.map((comment) => (
          <li key={comment.id}>
            <div className="mb-2">
              <p className="font-semibold text-primary">{comment.author_name}</p>
              <div
                className="text-gray-800"
                dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
              />
              <div className="text-sm mt-1 flex gap-3">
                <button
                  onClick={() => setReplyingTo(comment.id)}
                  className="text-blue-500 hover:underline"
                >
                  Reply
                </button>
                <button
                  onClick={() => handleLike(comment.id)}
                  className="text-pink-500 hover:underline"
                >
                  ❤️ {likes[comment.id] || 0}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {replyingTo === comment.id && (
                <motion.form
                  onSubmit={(e) => handleSubmit(e, comment.id)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3 mt-3"
                >
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full p-2 rounded border border-gray-300 bg-white text-black"
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your Email"
                    className="w-full p-2 rounded border border-gray-300 bg-white text-black"
                  />
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Your Reply"
                    rows={3}
                    className="w-full p-2 rounded border border-gray-300 bg-white text-black"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1 bg-primary text-white rounded hover:bg-blue-700 transition"
                  >
                    Post Reply
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {renderComments(comment.id, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="mt-10 pt-10 border-t border-gray-100">
      <h3 className="text-xl font-bold mb-6 text-gray-900">Comments</h3>

      {comments.length > 0 ? (
        renderComments()
      ) : (
        <p className="text-gray-500 mb-6 italic">No comments yet. Be the first to share your thoughts!</p>
      )}

      <form onSubmit={(e) => handleSubmit(e, 0)} className="mt-10 space-y-5">
        <h3 className="text-xl font-semibold text-gray-900">Leave a Comment</h3>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your Name"
          className="w-full p-3 rounded border border-gray-300 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        />
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Your Email"
          className="w-full p-3 rounded border border-gray-300 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        />
        <textarea
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Your Comment"
          rows={5}
          className="w-full p-3 rounded border border-gray-300 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        />
        <button
          type="submit"
          className="px-8 py-3 font-semibold bg-primary text-white rounded-lg hover:bg-[#5CB338] transition-colors shadow-sm"
        >
          Submit Comment
        </button>
        {status && <p className="text-sm mt-3 text-gray-700 font-medium">{status}</p>}
      </form>
    </div>
  );
};

export default CommentsSection;

// 'use client';

// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const CommentsSection = ({ postId }) => {
//   const [comments, setComments] = useState([]);
//   const [status, setStatus] = useState('');
//   const [replyingTo, setReplyingTo] = useState(null);
//   const [likes, setLikes] = useState({});
//   const [formData, setFormData] = useState({ name: '', email: '', content: '' });

//   useEffect(() => {
//     const fetchLikes = async () => {
//       const allLikes = await Promise.all(
//         comments.map(async (c) => {
//           const res = await fetch(`https://gracespringhospitals.com/wp-json/custom/v1/comment-like/${c.id}`);
//           if(res.ok) {
//             const json = await res.json();
//             return [c.id, json.likes];
//           }
//           return [c.id, 0];
//         })
//       );
//       setLikes(Object.fromEntries(allLikes));
//     };
  
//     if (comments.length > 0) fetchLikes();
//   }, [comments]);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const res = await fetch(`https://gracespringhospitals.com/wp-json/wp/v2/comments?post=${postId}`);
//         if(res.ok) {
//           const data = await res.json();
//           setComments(data);
//         }
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };

//     if(postId) {
//       fetchComments();
//       const interval = setInterval(fetchComments, 10000);
//       return () => clearInterval(interval);
//     }
//   }, [postId]);

//   const handleSubmit = async (e, parent = 0) => {
//     e.preventDefault();
//     setStatus('Submitting...');

//     const res = await fetch('https://gracespringhospitals.com/wp-json/wp/v2/comments', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         post: postId,
//         author_name: formData.name,
//         author_email: formData.email,
//         content: parent !== 0 ? `@${getCommentAuthor(parent)} ${formData.content}` : formData.content,
//         parent,
//       }),
//     });

//     const result = await res.json();

//     if (res.ok) {
//       setStatus('✅ Comment submitted and awaiting approval.');
//       setFormData({ name: '', email: '', content: '' });
//       setReplyingTo(null);
//     } else {
//       setStatus('❌ Failed to submit comment: ' + (result.message || 'Please try again.'));
//     }
//   };

//   const getCommentAuthor = (id) => {
//     const parent = comments.find((c) => c.id === id);
//     return parent ? parent.author_name : '';
//   };

//   const handleLike = async (id) => {
//     try {
//       const res = await fetch(`https://gracespringhospitals.com/wp-json/custom/v1/comment-like`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ comment_id: id }),
//       });
  
//       const data = await res.json();
  
//       if (res.ok) {
//         setLikes((prev) => ({ ...prev, [id]: data.likes }));
//       }
//     } catch (error) {
//       console.error("Failed to like comment", error);
//     }
//   };
  
//   const renderComments = (parentId = 0, level = 0) => {
//     const nested = comments.filter((c) => c.parent === parentId);

//     return (
//       <ul className={`space-y-5 ${level > 0 ? 'ml-6 border-l pl-4 border-gray-300' : ''}`}>
//         {nested.map((comment) => (
//           <li key={comment.id}>
//             <div className="mb-2">
//               <p className="font-semibold text-primary">{comment.author_name}</p>
//               <div
//                 className="text-gray-800"
//                 dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
//               />
//               <div className="text-sm mt-1 flex gap-3">
//                 <button
//                   onClick={() => setReplyingTo(comment.id)}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Reply
//                 </button>
//                 <button
//                   onClick={() => handleLike(comment.id)}
//                   className="text-pink-500 hover:underline"
//                 >
//                   ❤️ {likes[comment.id] || 0}
//                 </button>
//               </div>
//             </div>

//             <AnimatePresence>
//               {replyingTo === comment.id && (
//                 <motion.form
//                   onSubmit={(e) => handleSubmit(e, comment.id)}
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="space-y-3 mt-3"
//                 >
//                   <input
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     placeholder="Your Name"
//                     className="w-full p-2 rounded border border-gray-300 bg-white text-black"
//                   />
//                   <input
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     placeholder="Your Email"
//                     className="w-full p-2 rounded border border-gray-300 bg-white text-black"
//                   />
//                   <textarea
//                     required
//                     value={formData.content}
//                     onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                     placeholder="Your Reply"
//                     rows={3}
//                     className="w-full p-2 rounded border border-gray-300 bg-white text-black"
//                   />
//                   <button
//                     type="submit"
//                     className="px-4 py-1 bg-primary text-white rounded hover:bg-blue-700 transition"
//                   >
//                     Post Reply
//                   </button>
//                 </motion.form>
//               )}
//             </AnimatePresence>

//             {renderComments(comment.id, level + 1)}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   // Do not render comments input if this is a static post with no WP post ID
//   if(!postId) return null;

//   return (
//     <div className="mt-10 pt-10 border-t border-gray-100">
//       <h3 className="text-xl font-bold mb-6 text-gray-900">Comments</h3>

//       {comments.length > 0 ? (
//         renderComments()
//       ) : (
//         <p className="text-gray-600 mb-6">No comments yet.</p>
//       )}

//       <form onSubmit={(e) => handleSubmit(e, 0)} className="mt-10 space-y-5">
//         <h3 className="text-xl font-semibold text-gray-900">Leave a Comment</h3>
//         <input
//           type="text"
//           required
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           placeholder="Your Name"
//           className="w-full p-3 rounded border border-gray-300 bg-white text-black"
//         />
//         <input
//           type="email"
//           required
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           placeholder="Your Email"
//           className="w-full p-3 rounded border border-gray-300 bg-white text-black"
//         />
//         <textarea
//           required
//           value={formData.content}
//           onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//           placeholder="Your Comment"
//           rows={5}
//           className="w-full p-3 rounded border border-gray-300 bg-white text-black"
//         />
//         <button
//           type="submit"
//           className="px-6 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
//         >
//           Submit Comment
//         </button>
//         {status && <p className="text-sm mt-2 text-gray-700">{status}</p>}
//       </form>
//     </div>
//   );
// };

// export default CommentsSection;



// 'use client';

// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const CommentsSection = ({ postId }) => {
//   const [comments, setComments] = useState([]);
//   const [status, setStatus] = useState('');
//   const [replyingTo, setReplyingTo] = useState(null);
//   const [likes, setLikes] = useState({});
//   const [formData, setFormData] = useState({ name: '', email: '', content: '' });

//   useEffect(() => {
//     const fetchLikes = async () => {
//       const allLikes = await Promise.all(
//         comments.map(async (c) => {
//           const res = await fetch(`https://blog.timobhealthinternational.org/wp-json/custom/v1/comment-like/${c.id}`);
//           const json = await res.json();
//           return [c.id, json.likes];
//         })
//       );
//       setLikes(Object.fromEntries(allLikes));
//     };
  
//     if (comments.length > 0) fetchLikes();
//   }, [comments]);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const res = await fetch(
//           `https://blog.timobhealthinternational.org/wp-json/wp/v2/comments?post=${postId}`
//         );
//         const data = await res.json();
//         setComments(data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };

//     fetchComments();
//     const interval = setInterval(fetchComments, 10000);
//     return () => clearInterval(interval);
//   }, [postId]);

//   const handleSubmit = async (e, parent = 0) => {
//     e.preventDefault();
//     setStatus('Submitting...');

//     const res = await fetch('https://blog.timobhealthinternational.org/wp-json/wp/v2/comments', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         post: postId,
//         author_name: formData.name,
//         author_email: formData.email,
//         content: parent !== 0 ? `@${getCommentAuthor(parent)} ${formData.content}` : formData.content,
//         parent,
//       }),
//     });

//     const result = await res.json();

//     if (res.ok) {
//       setStatus('✅ Comment submitted and awaiting approval.');
//       setFormData({ name: '', email: '', content: '' });
//       setReplyingTo(null);
//     } else {
//       setStatus('❌ Failed to submit comment: ' + (result.message || 'Please try again.'));
//     }
//   };

//   const getCommentAuthor = (id) => {
//     const parent = comments.find((c) => c.id === id);
//     return parent ? parent.author_name : '';
//   };

//   const handleLike = async (id) => {
//     try {
//       const res = await fetch(`https://blog.timobhealthinternational.org/wp-json/custom/v1/comment-like`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ comment_id: id }),
//       });
  
//       const data = await res.json();
  
//       if (res.ok) {
//         setLikes((prev) => ({ ...prev, [id]: data.likes }));
//       }
//     } catch (error) {
//       console.error("Failed to like comment", error);
//     }
//   };
  
//   const renderComments = (parentId = 0, level = 0) => {
//     const nested = comments.filter((c) => c.parent === parentId);

//     return (
//       <ul className={`space-y-5 ${level > 0 ? 'ml-6 border-l pl-4 border-gray-300 dark:border-gray-700' : ''}`}>
//         {nested.map((comment) => (
//           <li key={comment.id}>
//             <div className="mb-2">
//               <p className="font-semibold text-primary">{comment.author_name}</p>
//               <div
//                 className="text-gray-800 dark:text-gray-200"
//                 dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
//               />
//               <div className="text-sm mt-1 flex gap-3">
//                 <button
//                   onClick={() => setReplyingTo(comment.id)}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Reply
//                 </button>
//                 <button
//                   onClick={() => handleLike(comment.id)}
//                   className="text-pink-500 hover:underline"
//                 >
//                   ❤️ {likes[comment.id] || 0}
//                 </button>
//               </div>
//             </div>

//             <AnimatePresence>
//               {replyingTo === comment.id && (
//                 <motion.form
//                   onSubmit={(e) => handleSubmit(e, comment.id)}
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="space-y-3 mt-3"
//                 >
//                   <input
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     placeholder="Your Name"
//                     className="w-full p-2 rounded border border-gray-300 bg-white text-black"
//                   />
//                   <input
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     placeholder="Your Email"
//                     className="w-full p-2 rounded border border-gray-300 bg-white text-black"
//                   />
//                   <textarea
//                     required
//                     value={formData.content}
//                     onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                     placeholder="Your Reply"
//                     rows={3}
//                     className="w-full p-2 rounded border border-gray-300 bg-white text-black"
//                   />
//                   <button
//                     type="submit"
//                     className="px-4 py-1 bg-primary text-white rounded hover:bg-blue-700 transition"
//                   >
//                     Post Reply
//                   </button>
//                 </motion.form>
//               )}
//             </AnimatePresence>

//             {renderComments(comment.id, level + 1)}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   return (
//     <div className="mt-10">
//       <h3 className="text-xl font-bold mb-6 text-gray-900">Comments</h3>

//       {comments.length > 0 ? (
//         renderComments()
//       ) : (
//         <p className="text-gray-600 mb-6">No comments yet.</p>
//       )}

//       <form onSubmit={(e) => handleSubmit(e, 0)} className="mt-10 space-y-5">
//         <h3 className="text-xl font-semibold text-gray-900">Leave a Comment</h3>
//         <input
//           type="text"
//           required
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           placeholder="Your Name"
//           className="w-full p-3 rounded border border-gray-300 bg-white text-black"
//         />
//         <input
//           type="email"
//           required
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           placeholder="Your Email"
//           className="w-full p-3 rounded border border-gray-300 bg-white text-black"
//         />
//         <textarea
//           required
//           value={formData.content}
//           onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//           placeholder="Your Comment"
//           rows={5}
//           className="w-full p-3 rounded border border-gray-300 bg-white text-black"
//         />
//         <button
//           type="submit"
//           className="px-6 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
//         >
//           Submit Comment
//         </button>
//         {status && <p className="text-sm mt-2 text-gray-700">{status}</p>}
//       </form>
//     </div>
//   );
// };

// export default CommentsSection;






// 'use client';

// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface Comment {
//   id: number;
//   parent: number;
//   author_name: string;
//   content: {
//     rendered: string;
//   };
//   likeCount?: number; // Local like state
// }

// interface CommentsSectionProps {
//   postId: number;
// }

// const CommentsSection = ({ postId }: CommentsSectionProps) => {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [status, setStatus] = useState('');
//   const [replyingTo, setReplyingTo] = useState<number | null>(null);
//   const [likes, setLikes] = useState<Record<number, number>>({});

//   const [formData, setFormData] = useState({ name: '', email: '', content: '' });

//   useEffect(() => {
//     const fetchLikes = async () => {
//       const allLikes = await Promise.all(
//         comments.map(async (c) => {
//           const res = await fetch(`https://blog.timobhealthinternational.org/wp-json/custom/v1/comment-like/${c.id}`);
//           const json = await res.json();
//           return [c.id, json.likes];
//         })
//       );
//       setLikes(Object.fromEntries(allLikes));
//     };
  
//     if (comments.length > 0) fetchLikes();
//   }, [comments]);

  
//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const res = await fetch(
//           `https://blog.timobhealthinternational.org/wp-json/wp/v2/comments?post=${postId}`
//         );
//         const data = await res.json();
//         setComments(data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };

//     fetchComments();
//     const interval = setInterval(fetchComments, 10000);
//     return () => clearInterval(interval);
//   }, [postId]);

//   const handleSubmit = async (e: React.FormEvent, parent = 0) => {
//     e.preventDefault();
//     setStatus('Submitting...');

//     const res = await fetch('https://blog.timobhealthinternational.org/wp-json/wp/v2/comments', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         post: postId,
//         author_name: formData.name,
//         author_email: formData.email,
//         content: parent !== 0 ? `@${getCommentAuthor(parent)} ${formData.content}` : formData.content,
//         parent,
//       }),
//     });

//     const result = await res.json();

//     if (res.ok) {
//       setStatus('✅ Comment submitted and awaiting approval.');
//       setFormData({ name: '', email: '', content: '' });
//       setReplyingTo(null);
//     } else {
//       setStatus('❌ Failed to submit comment: ' + (result.message || 'Please try again.'));
//     }
//   };

//   const getCommentAuthor = (id: number) => {
//     const parent = comments.find((c) => c.id === id);
//     return parent ? parent.author_name : '';
//   };

// //   const handleLike = (id: number) => {
// //     setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
// //   };



// const handleLike = async (id: number) => {
//     try {
//       const res = await fetch(`https://blog.timobhealthinternational.org/wp-json/custom/v1/comment-like`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ comment_id: id }),
//       });
  
//       const data = await res.json();
  
//       if (res.ok) {
//         setLikes((prev) => ({ ...prev, [id]: data.likes }));
//       }
//     } catch (error) {
//       console.error("Failed to like comment", error);
//     }
//   };
  
//   const renderComments = (parentId = 0, level = 0) => {
//     const nested = comments.filter((c) => c.parent === parentId);

//     return (
//       <ul className={`space-y-5 ${level > 0 ? 'ml-6 border-l pl-4 border-gray-300 dark:border-gray-700' : ''}`}>
//         {nested.map((comment) => (
//           <li key={comment.id}>
//             <div className="mb-2">
//               <p className="font-semibold text-primary">{comment.author_name}</p>
//               <div
//                 className="text-black dark:text-white"
//                 dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
//               />
//               <div className="text-sm mt-1 flex gap-3">
//                 <button
//                   onClick={() => setReplyingTo(comment.id)}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Reply
//                 </button>
//                 <button
//                   onClick={() => handleLike(comment.id)}
//                   className="text-pink-500 hover:underline"
//                 >
//                   ❤️ {likes[comment.id] || 0}
//                 </button>
//               </div>
//             </div>

//             <AnimatePresence>
//               {replyingTo === comment.id && (
//                 <motion.form
//                   onSubmit={(e) => handleSubmit(e, comment.id)}
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="space-y-3 mt-3"
//                 >
//                   <input
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     placeholder="Your Name"
//                     className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-blacksection text-black dark:text-white"
//                   />
//                   <input
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     placeholder="Your Email"
//                     className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-blacksection text-black dark:text-white"
//                   />
//                   <textarea
//                     required
//                     value={formData.content}
//                     onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                     placeholder="Your Reply"
//                     rows={3}
//                     className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-blacksection text-black dark:text-white"
//                   />
//                   <button
//                     type="submit"
//                     className="px-4 py-1 bg-primary text-white rounded hover:bg-black dark:hover:bg-white dark:hover:text-black transition"
//                   >
//                     Post Reply
//                   </button>
//                 </motion.form>
//               )}
//             </AnimatePresence>

//             {renderComments(comment.id, level + 1)}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   return (
//     <div className="mt-10">
//       <h3 className="text-xl font-bold mb-6 text-black dark:text-white">Comments</h3>

//       {comments.length > 0 ? (
//         renderComments()
//       ) : (
//         <p className="text-black dark:text-white mb-6">No comments yet.</p>
//       )}

//       <form onSubmit={(e) => handleSubmit(e, 0)} className="mt-10 space-y-5">
//         <h3 className="text-xl font-semibold text-black dark:text-white">Leave a Comment</h3>
//         <input
//           type="text"
//           required
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           placeholder="Your Name"
//           className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-blacksection text-black dark:text-white"
//         />
//         <input
//           type="email"
//           required
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           placeholder="Your Email"
//           className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-blacksection text-black dark:text-white"
//         />
//         <textarea
//           required
//           value={formData.content}
//           onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//           placeholder="Your Comment"
//           rows={5}
//           className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-blacksection text-black dark:text-white"
//         />
//         <button
//           type="submit"
//           className="px-6 py-2 bg-primary text-white rounded hover:bg-black dark:hover:bg-white dark:hover:text-black transition"
//         >
//           Submit Comment
//         </button>
//         {status && <p className="text-sm mt-2 dark:text-white text-black">{status}</p>}
//       </form>
//     </div>
//   );
// };

// export default CommentsSection;