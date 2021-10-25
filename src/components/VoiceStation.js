import React, { useState, useEffect, useRef } from 'react';

function VoiceStation({ setDisplayStatus }) {
  var initialText = [
    '안녕하세요. 다음과 같이 말해 보세요.',
    <br />,
    '"된장찌개 동영상 틀어줘"',
  ];

  const [responseText, setResponseText] = useState(initialText);
  const [isListening, setIsListening] = useState(false);

  const webSocketUrl = 'ws://localhost:8009/nlu/dialogflow/stream';
  let ws = useRef(null);

  useEffect(() => {
    start();

    return () => {
      console.log('clean up');
      ws.current.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = () => {
    console.log('start');
    ws.current = new WebSocket(webSocketUrl);
    ws.current.onopen = () => {
      console.log('connected to ' + webSocketUrl);
      ws.current.send(
        JSON.stringify({
          project_id: 'damda-329607',
          session_id: '123456',
          language_code: 'ko',
          credential: 'demo',
          response_format: 'tts_play',
        })
      );
      setIsListening(true);
    };

    ws.current.onclose = (error) => {
      console.log('disconnect from ' + webSocketUrl);
      setIsListening(false);
    };

    ws.current.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      console.log(data);
      if (data.response_type === 'intermediate_transcript') {
        setResponseText(data.text);
        console.log(data.text);
      } else {
        var responses = {
          default_fallback_intent_response_1: '이해할 수 없는 말이에요.',
          default_fallback_intent_response_2: '잘 못 알아 들었어요.',
          default_fallback_intent_response_3: '제가 할 수 없는 일이에요.',
          feature_description_intent_response:
            '지금은 "레시피 검색" 기능을 사용할 수 있어요.',
          recipe_search_intent_response: '레시피를 알려드릴게요.',
        };

        setIsListening(false);
        setResponseText(data.result.response_text);

        if (data.result.intent === 'Recipe Search Intent') {
          setResponseText(
            data.result.parameters.food + ' 레시피를 알려드릴게요.'
          );
          setDisplayStatus(false);
          if (data.result.parameters.food) {
            document.location.href =
              'http://127.0.0.1:9007/search/' + data.result.parameters.food;
          }
        } else if (data.result.intent === 'Default Welcome Intent') {
          setResponseText(data.result.response_text);
        } else if (data.result.intent === 'Youtube Search Request') {
          setDisplayStatus(false);
          if (data.result.parameters.keyword) {
            document.location.href =
              'http://127.0.0.1:9107/search/' + data.result.parameters.keyword;
          }
        }
      }
    };
  };

  return (
    <div
      className="dim"
      onClick={() => {
        if (isListening === false) setDisplayStatus(false);
      }}
    >
      <div className="voice__box">
        <p className="text__slarge color__white">{responseText}</p>
        <div
          className={isListening ? 'voice__icon effect' : 'voice__icon'}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <i
            className="icon__voice"
            onClick={(e) => {
              console.log('refresh');
              e.stopPropagation();
              setResponseText('');
              start();
            }}
          ></i>
          {isListening && <div className="effect__out"></div>}
        </div>
      </div>
    </div>
  );
}

export default VoiceStation;
