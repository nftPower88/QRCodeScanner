import qs from 'qs';
import {setUploadSize,
unsetUploadSize } from '../reducer/upload';

const apicall = ({url, params, file, headers, method='GET', type='json', dispatch}): Promise => {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let token = window.localStorage.getItem("token")
    let name = window.localStorage.getItem("name")
    let GuestToken = window.localStorage.getItem("guesttoken")
    let GuestName = window.localStorage.getItem("guestname")
    let full_url = type==="form" ? `${url}${params ? '?' : ''}${qs.stringify(params)}` : url
    request.open(method,  full_url, true);

    //Required headers
    request.setRequestHeader("Accept","application/json")
    request.setRequestHeader("Content-Type","application/json")
    if(token && String(token)!=='null')
      request.setRequestHeader("token", token);
    if(GuestToken && String(GuestToken)!=='null')
      request.setRequestHeader("GuestToken", GuestToken);
    if(GuestName && String(GuestName)!=='null')
      request.setRequestHeader("GuestName", GuestName);

    if(Array.isArray(headers)){
      headers.map(([key,value]) => request.setRequestHeader(key, value))
    
    }

    request.onloadend = () => {
        resolve(request);
    };

    request.onload = () => {   
      //if (dispatch)   
      //  dispatch(unsetUploadSize());
    }

    request.upload.onprogress = (e) => {
      //console.log(e);
      if (dispatch)
        dispatch(setUploadSize({size: e.loaded, path: file.name}));
    }

    if(file){
      request.send(file)
    }else{
      request.send( type==='json' ? JSON.stringify(params) : "");
    }
  })
}
export default apicall
