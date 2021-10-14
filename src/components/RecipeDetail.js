import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_KEY, IMAGE_BASE_URL } from '../Config';
import Axios from 'axios';
import XMLParser from 'react-xml-parser';

function RecipeDetail(props) {
  // let cntntsNo = props.match.params.cntntsNo;
  const [recipeDetail, setRecipeDetail] = useState(null);

  useEffect(() => {
    var host = window.location.protocol
      .concat('//')
      .concat(window.location.host);
    let url = `${host}/monthNewFdDtl`;
    Axios.post(url, null, {
      params: {
        cntntsNo: 203703,
        apiKey: API_KEY,
      },
    })
      .then((response) => {
        let xml = new XMLParser().parseFromString(response.data);
        console.log(xml);
        let items = xml.getElementsByTagName('item');
        console.log(items);
        // let arr = [];
        // items.map((item) => {
        //   arr.push({
        //     fdNm: item.getElementsByTagName('fdNm')[0].value.replace(/ >/g, ''),
        //     fdSeCode: item
        //       .getElementsByTagName('fdNm')[0]
        //       .value.replace(/ >/g, ''),
        //     rtnFileCours: item
        //       .getElementsByTagName('rtnFileCours')[0]
        //       .value.replace(/ >/g, '')
        //       .split('|')[0],
        //     rtnStreFileNm: item
        //       .getElementsByTagName('rtnStreFileNm')[0]
        //       .value.replace(/ >/g, '')
        //       .split('|')[0],
        //     cntntsNo: item
        //       .getElementsByTagName('cntntsNo')[0]
        //       .value.replace(/ >/g, ''),
        //   });
        // });
        // setRecipeDetail(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <div></div>;
}

export default RecipeDetail;
