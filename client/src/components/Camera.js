import React,{ useRef, useEffect, useState} from 'react'

export default function Camera({camId}) {
    const [mediaStream, setMediaStream] = useState(null);

      useEffect(() => {

        async function enableStream() {
          try {
            const stream =await navigator.mediaDevices.getUserMedia(
                { video:  {
                    deviceId: { exact: camId }
                  }}
                
              );
            setMediaStream(stream);
          } catch(err) {
            // Removed for brevity
          }
        }
    
        if (!mediaStream) {
          enableStream();
        } else {
          return function cleanup() {
            mediaStream.getTracks().forEach(track => {
              track.stop();
            });
          }
        }
      }, [mediaStream]);

      const videoRef = useRef();
  
      if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = mediaStream;
      }
    
      function handleCanPlay() {
        videoRef.current.play();
      }
    
      return (
        <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
      );
}
