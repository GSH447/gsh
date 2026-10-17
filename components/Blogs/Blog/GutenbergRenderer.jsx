'use client';

import React from 'react';

const GutenbergRenderer = ({ content }) => {
  return (
    <div
      className="prose lg:prose-lg max-w-none text-gray-800"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default GutenbergRenderer;



// // components/GutenbergRenderer.tsx
// 'use client';

// import React from 'react';

// interface GutenbergRendererProps {
//   content: string;
// }

// const GutenbergRenderer = ({ content }: GutenbergRendererProps) => {
//   return (

//     <>

//     {/* <div
//       className="gutenberg-content prose lg:prose-lg dark:prose-invert max-w-none text-black dark:text-white"
//       dangerouslySetInnerHTML={{ __html: content }}
//     />
//   */}
    
//     <div
//       className="gutenberg-content prose lg:prose-lg dark:prose-invert max-w-none text-black dark:text-white"
//       dangerouslySetInnerHTML={{ __html: content }}
//     />
    
//     </>
    
//     );
// };

// export default GutenbergRenderer;