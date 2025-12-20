const getJSON = async(url,callback) => await fetch(API_LOCATION + url)
.then(x => x.json())
.then(data => callback(data))

const postJSON = async(url,payload,callback) => await fetch(API_LOCATION + url,
{ method: 'POST', 
 headers: {
 'Accept': 'application/json',
 'Content-Type': 'application/json'
 },
 body: JSON.stringify(payload)
})
.then(x => x.json())
.then(data => callback(data))

export {getJSON,postJSON}
