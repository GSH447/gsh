"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";

const HeroVideo = () => {

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null); 
  const [showControls, setShowControls] = useState(true);


  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const handleFastForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  useEffect(() => {
  if (videoRef.current) {
    videoRef.current.play().catch((error) => {
      console.warn('Autoplay prevented:', error);
    });
  }}, []);

  return (


    <div className="inset-0 bg-opacity-50 flex items-center justify-center my-auto">
        <div className="bg-white overflow-hidden w-full h-full relative">

        
        {/* Video Embed */}
        <div className="relative w-[98%] mx-auto rounded-lg">

        {/* Custom Video Player */}
        <div className="relative w-full flex items-center rounded-lg justify-center"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        >
            {/* <video className="w-full h-full object-cover rounded-lg" autoPlay muted controlsList="nodownload noremoteplayback nofullscreen"> */}

        {/* <Image
          src={"/video-png.jpg"}
          width={500}
          height={500}
          alt='Build Web Simple'
          className=''

        /> */}
            {/* <video 
                ref={videoRef} 
                className="w-full h-full object-cover rounded-lg" 
                controlsList="nodownload noremoteplayback nofullscreen"
                autoPlay
            >
            

            <source src="/glesyde.mp4?v=2" type="video/mp4"  />
            Your browser does not support the video tag.
            </video> */}

            <video
  ref={videoRef}
  className="w-full h-full object-cover"
  controlsList="nodownload noremoteplayback nofullscreen"
  autoPlay
  // muted
  playsInline
  preload="auto"
  onError={() => console.log("Video Failed to Load")}
>
  {/* <source src="https://glesyde.one/glesyde.mp4?v=2.7" type="video/mp4" /> */}

  
  <source src="/glesyde.mp4" type="video/mp4"  />

  Your browser does not support the video tag.
</video>


            {/* Custom Play Button */}

            {showControls && (
            <div className="absolute w-full flex justify-between px-10 my-10 ">

            
                <button 
                className="play-button bg-[grey] bg-opacity-50 p-2 my-auto rounded-full shadow-md hover:bg-opacity-100 w-20 h-20"
                onClick={handleRewind}
                >
                <Image 
                    src={isPlaying ? '/assets/icons/previous.svg' : '/assets/icons/previous.svg'}
                    width={50} 
                    height={50} 
                    alt={isPlaying ? 'Rewind Video' : 'Rewind Video'} 
                />

                </button>
                
                <button 
                className="play-button bg-[grey] bg-opacity-50 p-6 rounded-full shadow-md hover:bg-opacity-100"
                onClick={togglePlayPause}
                >
                <Image 
                    src={isPlaying ? '/assets/icons/play-new.svg' : '/assets/icons/play-new.svg'}
                    width={50} 
                    height={50} 
                    alt={isPlaying ? 'Pause Video' : 'Play Video'} 
                />

                </button>
                
                <button 
                className="play-button bg-[grey] bg-opacity-50 p-3 my-auto rounded-full shadow-md hover:bg-opacity-100 w-20 h-20"
                onClick={handleFastForward}
                >
                <Image 
                    src={isPlaying ? '/assets/icons/forward.svg' : '/assets/icons/forward.svg'}
                    width={50} 
                    height={50} 
                    alt={isPlaying ? 'Fast-forward Video' : 'Fast-forward Video'} 
                />

                </button>

            </div>
            )}


        </div>

        </div>
        </div>
    </div>

  );
};

export default HeroVideo;
