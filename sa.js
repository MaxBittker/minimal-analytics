import {get,set} from 'js-cookie'
import {v4} from 'node-uuid'

const _endpoint = 'http://localhost:5000/api/'

const getAnonId = () => {
  let anonId = get('anonId')
  if(!anonId){
    anonId = v4();
    set('anonId', anonId);
  }
  return anonId
}

const getContext = () => ({
    url: window.location.href,
    path: window.location.pathname,
    referrer: document.referrer,
    title: document.title,
    userAgent: navigator.userAgent,
})

const page = extraData => {

  const gsId = get('gsId')
  const anonId = getAnonId()

  let data = {
    gsId,
    anonId,
  }

  Object.assign(data, getContext())
  Object.assign(data, extraData)

  console.log(data)

  const xhr = new XMLHttpRequest();
  xhr.open("POST", _endpoint+ "page/");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(data));
}

const identify = gsId => {
  set('gsId', gsId)

  let data = {
    gsId,
    anonId: getAnonId()
  }

  console.log(data)

  const xhr = new XMLHttpRequest();
  xhr.open("POST", _endpoint+ "identify/");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(data));
}

const group = orgId => {
  let data = {
    orgId,
    gsId:get('gsId'),
    anonId: getAnonId(),
  }

  console.log(data)

  const xhr = new XMLHttpRequest();
  xhr.open("POST", endpoint+ "group/");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(data));
}

// page();
// identify('12345');
// group('99');
window.sa  = {
 page, identify, group
}
// module.exports = ping
