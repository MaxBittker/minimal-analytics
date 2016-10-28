import {get,set} from 'js-cookie'
import {v4} from 'node-uuid'
import {stringify} from 'query-string'

const endpoint = 'http://localhost:5000/api/ping/'

const ping = (extraData) => {

    const url = window.location.href
    const path = window.location.pathname
    const referrer = document.referrer
    const title = document.title

    const gsId = extraData && extraData.gsId

    let anonId = undefined
    if(!gsId){
      anonId = get('anonId')
      if(!anonId){
        anonId = v4();
        set('anonId',anonId);
      }
    }

  let data = {
    gsId,
    anonId,
    url,
    path,
    referrer,
    title,
  }

  // Object.assign(data,extraData)

  const xhr = new XMLHttpRequest()
  console.log(data)
  xhr.open('GET', endpoint + '?' +stringify(data))
  xhr.send();
}
ping()
// module.exports = ping
