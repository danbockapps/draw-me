import axios, { AxiosResponse } from 'axios'
import * as crypto from 'crypto'
import * as querystring from 'querystring'

const getRequestXml = (url: string) => `
<image_process_call>
  <image_url>${url}</image_url>
  <methods_list>
    <method>
      <name>cartoon</name>
    </method>
  </methods_list>
</image_process_call>`

const getSignData = (url: string) =>
  crypto
    .createHmac('sha1', process.env.REACT_APP_PHO_TO_KEY as string)
    .update(getRequestXml(url))
    .digest('hex')

export const sendRequest = (url: string) =>
  axios
    .post(
      'http://opeapi.ws.pho.to/addtask',
      querystring.encode({
        app_id: process.env.REACT_APP_PHO_TO_APP_ID,
        sign_data: getSignData(url),
        data: getRequestXml(url),
      }),
    )
    .then(response => {
      const xmlDoc = new DOMParser().parseFromString(response.data, 'text/xml')
      const requestId = xmlDoc.getElementsByTagName('request_id')[0].textContent
      if (requestId) {
        return pollForImageUrl(requestId)
      }
    })

const pollForImageUrl = async (requestId: string) => {
  let triesRemaining: number = 10
  while (triesRemaining) {
    const response: AxiosResponse<any> = await axios.get(
      getImageInfoUrl(requestId),
    )
    const xmlDoc = new DOMParser().parseFromString(response.data, 'text/xml')

    if (xmlDoc.getElementsByTagName('status')[0].textContent === 'OK')
      return xmlDoc.getElementsByTagName('result_url')[0].textContent
    else {
      triesRemaining--
      await new Promise(r => setTimeout(r, 1000))
    }
  }
}

export const getImageInfoUrl = (id: string) =>
  `https://opeapi.ws.pho.to/getresult?request_id=${id}`
