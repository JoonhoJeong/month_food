import React, { useState, useEffect } from 'react';
import video from '../resources/loading_video.mp4';
function LoadingComponent() {
  let [loadingVideo, setLoadingVideo] = useState(true);
  let [startFadeout, setStartFadeout] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoadingVideo(false);
    }, 3000);
    setTimeout(() => {
      setStartFadeout(true);
    }, 2000);
  });

  console.log('LoadingComponent!!!');
  return (
    <>
      {loadingVideo && (
        <div
          style={{
            height: '1280px',
            width: '720px',
            zIndex: '1000',
            background: 'white',
            position: 'fixed',
            left: '0',
            right: '0',
            margin: 'auto',
            opacity: startFadeout ? '0' : '1',
            transition: 'opacity, 1s ease-in-out',
          }}
        >
          <video
            autoPlay
            playsInline
            muted
            src={video}
            style={{
              position: 'fixed',
              top: '0%',
              left: '0%',
            }}
          />
          <p
            style={{
              fontFamily: 'Noto Serif KR, serif, Exo, Arial',
              fontWeight: '700',
              fontSize: '35px',
              lineHeight: '36px',
              color: '#ddccbb',
              zIndex: '20',
              position: 'fixed',
              top: '40%',
              left: '35%',
            }}
          >
            이달의 레시피
          </p>
        </div>
      )}
    </>
  );
}

export default LoadingComponent;
