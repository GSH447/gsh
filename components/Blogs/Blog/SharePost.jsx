'use client';

import React from 'react';
import { 
  Facebook, 
  Twitter, 
  LinkedIn, 
  Mail, 
  WhatsApp, 
  Instagram, 
  Reddit, 
} from '@mui/icons-material';

const SharePost = ({ postTitle, postURL }) => {
  const encodeURL = encodeURIComponent(postURL);
  const encodedTitle = encodeURIComponent(postTitle);

  return (
    <div className="mt-11 flex flex-wrap gap-4 md:items-center md:justify-between md:gap-0">
      <ul className="flex items-center gap-6">
        <li>
          <p className="text-gray-900 font-semibold">Share On:</p>
        </li>
        <li>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURL}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
            <Facebook className="!fill-[#407CE2] hover:opacity-80 transition-all duration-300" fontSize="large" />
          </a>
        </li>
        <li>
          <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodeURL}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
            <Twitter className="!fill-[#1DA1F2] hover:opacity-80 transition-all duration-300" fontSize="large" />
          </a>
        </li>
        <li>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURL}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
            <LinkedIn className="!fill-[#0077B5] hover:opacity-80 transition-all duration-300" fontSize="large" />
          </a>
        </li>
        <li>
          <a href={`mailto:?subject=${encodedTitle}&body=${encodeURL}`} target="_blank" rel="noopener noreferrer" aria-label="Share via Email">
            <Mail className="!fill-[#D44638] hover:opacity-80 transition-all duration-300" fontSize="large" />
          </a>
        </li>
        <li>
          <a href={`https://wa.me/?text=${encodedTitle}%20${encodeURL}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
            <WhatsApp className="!fill-[#25D366] hover:opacity-80 transition-all duration-300" fontSize="large" />
          </a>
        </li>
        <li>
          <a href={`https://www.instagram.com/?url=${encodeURL}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Instagram">
            <Instagram className="!fill-[#E1306C] hover:opacity-80 transition-all duration-300" fontSize="large" />
          </a>
        </li>
        <li>
          <a href={`https://www.reddit.com/submit?url=${encodeURL}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Reddit">
            <Reddit className="!fill-[#FF4500] hover:opacity-80 transition-all duration-300" fontSize="large" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SharePost;

// import React from 'react';
// import { 
//   Facebook, 
//   Twitter, 
//   LinkedIn, 
//   Mail, 
//   WhatsApp, 
//   Instagram, 
//   Reddit, 
// } from '@mui/icons-material';

// const SharePost = ({ postTitle, postURL }) => {
//   const encodeURL = encodeURIComponent(postURL);
//   const encodedTitle = encodeURIComponent(postTitle);

//   return (
//     <div className="mt-11 flex flex-wrap gap-4 md:items-center md:justify-between md:gap-0">
//       <ul className="flex items-center gap-6">
//         <li>
//           <p className="text-gray-900 font-semibold">Share On:</p>
//         </li>
//         <li>
//           <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURL}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
//             <Facebook className="!fill-[#407CE2] hover:opacity-80 transition-all duration-300" fontSize="large" />
//           </a>
//         </li>
//         <li>
//           <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodeURL}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
//             <Twitter className="!fill-[#1DA1F2] hover:opacity-80 transition-all duration-300" fontSize="large" />
//           </a>
//         </li>
//         <li>
//           <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURL}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
//             <LinkedIn className="!fill-[#0077B5] hover:opacity-80 transition-all duration-300" fontSize="large" />
//           </a>
//         </li>
//         <li>
//           <a href={`mailto:?subject=${encodedTitle}&body=${encodeURL}`} target="_blank" rel="noopener noreferrer" aria-label="Share via Email">
//             <Mail className="!fill-[#D44638] hover:opacity-80 transition-all duration-300" fontSize="large" />
//           </a>
//         </li>
//         <li>
//           <a href={`https://wa.me/?text=${encodedTitle}%20${encodeURL}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
//             <WhatsApp className="!fill-[#25D366] hover:opacity-80 transition-all duration-300" fontSize="large" />
//           </a>
//         </li>
//         <li>
//           <a href={`https://www.instagram.com/?url=${encodeURL}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Instagram">
//             <Instagram className="!fill-[#E1306C] hover:opacity-80 transition-all duration-300" fontSize="large" />
//           </a>
//         </li>
//         <li>
//           <a href={`https://www.reddit.com/submit?url=${encodeURL}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Reddit">
//             <Reddit className="!fill-[#FF4500] hover:opacity-80 transition-all duration-300" fontSize="large" />
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default SharePost;








// import React from 'react';
// import { 
//   Facebook, 
//   Twitter, 
//   LinkedIn, 
//   Mail, 
//   WhatsApp, 
//   Instagram, 
//   Reddit, 
// } from '@mui/icons-material';

// interface PostSharing {
//   postTitle: string;
//   postURL: string;
// }

// const SharePost = ({ postTitle, postURL }: PostSharing) => {
  
//   const encodeURL = encodeURIComponent(postURL);
//   const encodedTitle = encodeURIComponent(postTitle);

//   return (
//     <div className="mt-11 flex flex-wrap gap-4 md:items-center md:justify-between md:gap-0">
//       <ul className="flex items-center gap-6">
//         <li>
//           <p className="text-black dark:text-white">Share On:</p>
//         </li>
//         <li>
//           <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURL}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
//             <Facebook
//               className="!fill-[#407CE2] hover:fill-primary transition-all duration-300"
//               fontSize="large"
//             />
//           </a>
//         </li>
//         <li>
//           <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodeURL}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
//             <Twitter
//               className="!fill-[#1DA1F2] hover:fill-primary transition-all duration-300"
//               fontSize="large"
//             />
//           </a>
//         </li>
//         <li>
//           <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURL}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
//             <LinkedIn
//               className="!fill-[#0077B5] hover:fill-primary transition-all duration-300"
//               fontSize="large"
//             />
//           </a>
//         </li>
//         <li>
//           <a href={`mailto:?subject=${encodedTitle}&body=${encodeURL}`} target="_blank" rel="noopener noreferrer" aria-label="Share via Email">
//             <Mail
//               className="!fill-[#D44638] hover:fill-primary transition-all duration-300"
//               fontSize="large"
//             />
//           </a>
//         </li>
//         <li>
//           <a href={`https://wa.me/?text=${encodedTitle}%20${encodeURL}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
//             <WhatsApp
//               className="!fill-[#25D366] hover:fill-primary transition-all duration-300"
//               fontSize="large"
//             />
//           </a>
//         </li>
//         <li>
//           <a href={`https://www.instagram.com/?url=${encodeURL}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Instagram">
//             <Instagram
//               className="!fill-[#E1306C] hover:fill-primary transition-all duration-300"
//               fontSize="large"
//             />
//           </a>
//         </li>
//         <li>
//           <a href={`https://www.reddit.com/submit?url=${encodeURL}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Reddit">
//             <Reddit
//               className="!fill-[#FF4500] hover:fill-primary transition-all duration-300"
//               fontSize="large"
//             />
//           </a>
//         </li>
//         {/* <li>
//           <a href={`https://medium.com/share?url=${encodeURL}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Medium">
//             <Medium
//               className="fill-[#D1D8E0] hover:fill-[#00AB6C] transition-all duration-300"
//               fontSize="large"
//             />
//           </a>
//         </li> */}
//       </ul>
//     </div>
//   );
// };

// export default SharePost;