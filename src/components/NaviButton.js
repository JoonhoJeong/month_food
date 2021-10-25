import React from 'react';

function NaviButton({ isLoading, voiceStatus, setVoiceStatus }) {
  const clickVoiceBtn = () => {
    setVoiceStatus(!voiceStatus);
    console.log('navi - ' + voiceStatus);
  };

  return (
    <div>
      <div className="gnb" data-ani={!isLoading && 'fadein__bottom'}>
        <button className="button button__back">
          <span className="blind">back</span>
        </button>
        <a href="#a" className="button button__home">
          <span className="blind">home</span>
        </a>
        <button
          className={
            voiceStatus ? 'button button__voice' : 'button button__voice__off'
          }
          onClick={clickVoiceBtn}
        >
          <span className="blind">voice</span>
        </button>
      </div>
    </div>
  );
}

export default NaviButton;
