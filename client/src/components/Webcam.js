import React,{useEffect} from 'react'

export default function Webcam() {
    function startVideo(){
        const video = document.getElementById('video')
        navigator.getUserMedia({video:{}}, 
                stream => video.srcObject = stream ,
                err => console.log(err));
    }
    useEffect(() => {
        startVideo()
      }, []);

    return (
        <div>
            <video id='video' width = '720' height='560' autoPlay  muted></video>
        </div>
    )
}
