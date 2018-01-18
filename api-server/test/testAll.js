const axios = require('axios')
const assert = require('assert')

let testInst = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000,
  withCredentials: true,
})

console.log('start testing')

async function testAll() {
  let url
  let res
  try{
    url = '/test'
    console.log('------begin test------', url)
    res = await testInst.get(url)
    assert.equal(res.status, 200)
    assert.equal(res.data.message, 'hello world!')
    console.log('--------end test------', url)

    url = '/news'
    console.log('------begin test------', url)
    res = await testInst.get(url)
    assert.equal(res.status, 200)
    assert(res.data.length > 0)
    let news = res.data
    console.log('--------end test------', url)

    url = '/publications'
    console.log('------begin test------', url)
    res = await testInst.get(url)
    assert.equal(res.status, 200)
    assert(res.data.length > 0)
    console.log('--------end test------', url)

    url = '/publications'
    console.log('------begin test------', url)
    res = await testInst.get(url)
    assert.equal(res.status, 200)
    assert(res.data.length > 0)
    console.log('--------end test------', url)

    url = '/labPics'
    console.log('------begin test------', url)
    res = await testInst.get(url)
    assert.equal(res.status, 200)
    console.log('--------end test------', url)

    url = '/myIdentity'
    console.log('------begin test------', url)
    res = await testInst.get(url)
    assert.equal(res.status, 200)
    assert.equal(res.data.id, 'guest')
    console.log('--------end test------', url)

    url = '/login'
    console.log('------begin test------', url)
    try{
      res = await testInst.post(url, {password: 'wrongPass'})
    } catch(err) {
      assert.equal(err.response.status, 401)
      assert.equal(err.response.data.message, 'wrong password')
    }
    console.log('--------end test------', url)

    url = '/myIdentity'
    console.log('------begin test------', url)
    res = await testInst.get(url)
    assert.equal(res.status, 200)
    assert.equal(res.data.id, 'guest')
    console.log('--------end test------', url)

    url = '/login'
    console.log('------begin test------', url)
    res = await testInst.post(url, {password: 'CaptainCYZ'})
    assert.equal(res.status, 200)
    let cookies = res.headers['set-cookie']
    console.log('cookie=', cookies)
    console.log('--------end test------', url)

    let headers = {headers:{'Cookie': cookies[0]}}
    url = '/myIdentity'
    console.log('------begin test------', url)
    res = await testInst.get(url, headers)
    assert.equal(res.status, 200)
    assert.equal(res.data.id, 'admin')
    console.log('--------end test------', url)

    url = '/news'
    console.log('------begin test------', url)
    res = await testInst.put(url, news, headers)
    assert.equal(res.status, 200)
    assert.equal(res.data.message, 'OK')
    console.log('--------end test------', url)

    url= '/logout'
    console.log('------begin test------', url)
    res = await testInst.post(url)
    assert.equal(res.status, 200)
    assert.equal(res.data.message, 'not logged in')
    console.log('------begin test------', url)

    url= '/logout'
    console.log('------begin test------', url)
    res = await testInst.post(url,{}, headers)
    assert.equal(res.status, 200)
    assert.equal(res.data.message, 'admin logged out')
    console.log('------begin test------', url)

    url = '/myIdentity'
    console.log('------begin test------', url)
    res = await testInst.get(url, headers)
    assert.equal(res.status, 200)
    assert.equal(res.data.id, 'guest')
    console.log('--------end test------', url)

  } catch (err) {
    console.log(err)
  }
}

testAll()