import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/lottie/Animation - 1721911402742.json';

const LoadingAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div style={{width:'100%',height:'50vh',display:'flex',alignItems:'center',justifyContent:'center',zIndex:'1000'}}>
      <Lottie options={defaultOptions} height={250} width={250} padding={250} />
    </div>
  );
};

export default LoadingAnimation;
