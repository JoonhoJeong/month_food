import axios from 'axios';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { API_KEY, IMAGE_BASE_URL } from '../Config';
import Axios from 'axios';
import XMLParser from 'react-xml-parser';
import './RecipeDetail.css';
import NutritionTable from './NutritionTable';
const { exec } = require('child_process');

let motionDeviceId;

function RecipeDetail(props) {
  let cntntsNo = props.match.params.cntntsNo;
  const [recipeDetail, setRecipeDetail] = useState(null);
  const stepRef = useRef([]);
  const stepCount = useRef(0);
  let WS = useRef(null);

  useEffect(() => {
    var host = window.location.protocol
      .concat('//')
      .concat(window.location.host);
    // let url = `${host}/monthNewFdDtl`;
    let url = 'http://api.nongsaro.go.kr/service/monthFd/monthNewFdDtl';
    Axios.post(url, null, {
      params: {
        cntntsNo: cntntsNo,
        apiKey: API_KEY,
      },
    })
      .then((response) => {
        let xml = new XMLParser().parseFromString(response.data);
        console.log(xml);
        let items = xml.getElementsByTagName('item');
        console.log(items);
        let obj;
        let howToCook = [];
        let imagesPath = [];
        let imagesName = [];
        let ingredientStr = [];

        items.map((item) => {
          howToCook = item
            .getElementsByTagName('ckngMthInfo')[0]
            .value.replace(/ >|\r\n/g, '')
            .split(/[0-9][.]/); //조리 방법
          imagesPath = item
            .getElementsByTagName('rtnFileCours')[0]
            .value.replace(/ >/g, '')
            .split('|');
          imagesName = item
            .getElementsByTagName('rtnStreFileNm')[0]
            .value.replace(/ >/g, '')
            .split('|');
          ingredientStr = item
            .getElementsByTagName('matrlInfo')[0]
            .value.replace(/ >/g, '')
            .split('▶');
          obj = {
            fdNm: item.getElementsByTagName('fdNm')[0].value.replace(/ >/g, ''), //요리명
            howToCook: howToCook,
            imagesPath: imagesPath,
            imagesName: imagesName,
            ingredientStr: ingredientStr,
            calcium: item
              .getElementsByTagName('clciQy')[0]
              .value.replace(/ >/g, ''), //칼슘
            carbohydrate: item
              .getElementsByTagName('crbQy')[0]
              .value.replace(/ >/g, ''), //탄수화물
            // matrlInfo: item
            //   .getElementsByTagName("matrlInfo")[0]
            //   .value.replace(/ >/g, ""), //재료정보
            phphmntNm: item
              .getElementsByTagName('phphmntNm')[0]
              .value.replace(/ >/g, ''), //인분명
            enargy: item
              .getElementsByTagName('energyQy')[0]
              .value.replace(/ >/g, ''), //에너지양
            fat: item
              .getElementsByTagName('ntrfsQy')[0]
              .value.replace(/ >/g, ''), //지질량
            protein: item
              .getElementsByTagName('protQy')[0]
              .value.replace(/ >/g, ''), //단백질
            fiber: item
              .getElementsByTagName('edblfibrQy')[0]
              .value.replace(/ >/g, ''), //식이섬유
            vtmA: item
              .getElementsByTagName('vtmaQy')[0]
              .value.replace(/ >/g, ''), //비타민A
            vtmE: item
              .getElementsByTagName('vteQy')[0]
              .value.replace(/ >/g, ''), //비타민E
            vtmC: item
              .getElementsByTagName('vtcQy')[0]
              .value.replace(/ >/g, ''), //비타민C
            thiaQy: item
              .getElementsByTagName('thiaQy')[0]
              .value.replace(/ >/g, ''), //티아민
            niboplaQy: item
              .getElementsByTagName('niboplaQy')[0]
              .value.replace(/ >/g, ''), //리보플라빈
            na: item.getElementsByTagName('naQy')[0].value.replace(/ >/g, ''), //나트륨
            kal: item
              .getElementsByTagName('ptssQy')[0]
              .value.replace(/ >/g, ''), //칼륨
            iron: item
              .getElementsByTagName('irnQy')[0]
              .value.replace(/ >/g, ''), //철분
          };
        });
        console.log(obj);
        setRecipeDetail(obj);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cntntsNo]);

  const initWebSocket = useCallback(() => {
    console.log('initWebSocket');
    let access_token = window.localStorage.getItem('access_token');

    WS.current = new WebSocket(
      `wss://s7vajyybvf.execute-api.ap-northeast-2.amazonaws.com/websocket?access_token=${access_token}`
    );
    WS.current.onopen = (event) => {
      console.log('webSocket.onopen');
    };
    WS.current.onclose = (event) => {
      console.log('webSocket.onclose: ' + event);
    };
    WS.current.onerror = (event) => {
      console.log('webSocket.onerror: ' + event);
    };
    WS.current.onmessage = ({ data }) => {
      console.log('webSocket.onmessage: ' + data);
      //     "notification": {
      //   "push": [
      //     "MOTION_IS_DETECTED"
      //   ]
      // }
      if (data === 'normal_water_start') {
        nextStep();
      }
    };
  }, []);

  const registerPush = (deviceId) => {
    let access_token = window.localStorage.getItem('access_token');
    const uuid = require('uuid');
    console.log('registerPush:', deviceId);
    Axios.post(`http://localhost:5010/push/${deviceId}`, {
      headers: {
        'x-country-code': 'KR',
        'x-message-id': Buffer.from(uuid.v4()).toString('base64').slice(0, 22),
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('register push success', response);
        initWebSocket();
      })
      .catch((error) => {
        console.log('Error : ', error);
      });
  };

  useEffect(() => {
    let access_token = window.localStorage.getItem('access_token');
    console.log('get access_token', access_token);
    const uuid = require('uuid');
    console.log('uuid', uuid);
    Axios.get('http://localhost:5010/devices', {
      headers: {
        'x-country-code': 'KR',
        'x-message-id': Buffer.from(uuid.v4()).toString('base64').slice(0, 22),
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        let arr = response.data.response;
        console.log('devices listsss:', arr.length, response.data.response);
        for (let i = 0; i < arr.length; i++) {
          console.log(
            'item.deviceInfo.deviceType arr',
            arr[i].deviceInfo.deviceType
          );
          if (arr[i].deviceInfo.deviceType === 'DEVICE_LUMI_MOTION_SENSOR') {
            motionDeviceId = arr[i].deviceId;
            registerPush(arr[i].deviceId);
          }
        }
      })
      .catch((error) => {
        console.log('Error : ', error);
      });
  }, []);

  console.log('recipeDetail', recipeDetail);

  const speak = (text, opt_prop) => {
    console.log(SpeechSynthesisUtterance);
    if (
      typeof SpeechSynthesisUtterance === 'undefined' ||
      typeof window.speechSynthesis === 'undefined'
    ) {
      alert('이 브라우저는 음성 합성을 지원하지 않습니다.');
      return;
    }

    window.speechSynthesis.cancel(); // 현재 읽고있다면 초기화

    const prop = opt_prop || {};

    const speechMsg = new SpeechSynthesisUtterance();
    speechMsg.rate = prop.rate || 1; // 속도: 0.1 ~ 10
    speechMsg.pitch = prop.pitch || 1; // 음높이: 0 ~ 2
    speechMsg.lang = prop.lang || 'ko-KR';
    speechMsg.text = text;

    // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
    window.speechSynthesis.speak(speechMsg);

    // exec('ls -la', (error, stdout, stderr) => {
    //   if (error) {
    //     console.log(`error: ${error.message}`);
    //     return;
    //   }
    //   if (stderr) {
    //     console.log(`stderr: ${stderr}`);
    //     return;
    //   }
    //   console.log(`stdout: ${stdout}`);
    // });
  };

  const nextStep = () => {
    if (stepCount.current < recipeDetail.howToCook.length - 1) {
      console.log(
        'stepCount.current',
        stepCount.current,
        recipeDetail.howToCook.length,
        stepRef.current
      );
      stepCount.current++;
      stepRef.current[stepCount.current].scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
      stepRef.current[stepCount.current].className = 'stepBoxSelected';
      stepRef.current[stepCount.current].children[2].style.color = 'brown';
      stepRef.current[stepCount.current].children[2].style.fontWeight = 'bold';
      if (stepCount.current > 1) {
        stepRef.current[stepCount.current - 1].className = 'stepBox';
        stepRef.current[stepCount.current - 1].children[2].style.color =
          '#757575';
        stepRef.current[stepCount.current - 1].children[2].style.fontWeight =
          '';
      }
      speak(recipeDetail.howToCook[stepCount.current], {
        rate: 1,
        pitch: 1.2,
        lang: 'ko-KR',
      });
    }
  };
  return (
    <>
      {recipeDetail && (
        <>
          <div
            style={{ position: 'fixed', zIndex: '10', left: '300px' }}
            onClick={() => {
              nextStep();
            }}
          >
            hello
          </div>
          <div className='mainBox'>
            <div className='ImageBox'>
              <img
                src={`${IMAGE_BASE_URL}${recipeDetail.imagesPath[0]}/${recipeDetail.imagesName[0]}`}
                alt='recipe main'
              />
              <h1>{recipeDetail.fdNm}</h1>
            </div>
          </div>
          <div className='recipeDetailMain'>
            <NutritionTable recipeDetail={recipeDetail} />
            <div className='ingredient'>
              <h1>재료</h1>
              <div className='content'>
                <div className='ImageBox'>
                  <img
                    src={`${IMAGE_BASE_URL}${recipeDetail.imagesPath[1]}/${recipeDetail.imagesName[1]}`}
                    alt='recipe ingrendient'
                  />
                </div>
                <ul className='igroups'>
                  {recipeDetail.ingredientStr.map((item, index) => {
                    if (index === 0) {
                      return (
                        <li className='personNm' key={index}>
                          {recipeDetail.ingredientStr[index]}
                        </li>
                      );
                    } else {
                      return (
                        <li className='ginredientDetail' key={index}>
                          {recipeDetail.ingredientStr[index]}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
            <div className='recipeStep'>
              <h1>레시피</h1>
              <div className='content'>
                {recipeDetail.howToCook.map((item, index) => {
                  if (recipeDetail.howToCook[index + 1]) {
                    return (
                      <div
                        className='stepBox'
                        id={`step${index + 1}`}
                        ref={(el) => (stepRef.current[index + 1] = el)}
                      >
                        <div className='ImageBox'>
                          <img
                            src={`${IMAGE_BASE_URL}${
                              recipeDetail.imagesPath[index + 2]
                            }/${recipeDetail.imagesName[index + 2]}`}
                            alt='recipe ingrendient'
                          />
                        </div>
                        <div className='step'>Step {index + 1}</div>
                        <div className='howToCook'>
                          {recipeDetail.howToCook[index + 1]}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default RecipeDetail;
