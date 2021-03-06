const fakeServer = require('../index')
const fetch = require('node-fetch')
const {expect} = require('chai')
const path = require('path')

describe('Body equal gets', () => {
  let server = null
  const model_obj = {
    "port": 8888,
    "api": [{
      "method": "POST",
      "path": "/user",
      "request_body_equal": {
        "status": 404,
        "expected_body": {
          "username": "test",
          "password": "test_pass"
        }
      },
      "response": {
        "success": true
      }
    }]
  }
  beforeEach(() => {
    server = fakeServer(model_obj)
  })
  afterEach(() => {
    server.stop()
  })

  it('success', async () => {
    const responseBody = await fetch('http://localhost:8888/user', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"username": "test", "password": "test_pass"})
    }).then((res) => res.json())
    expect(responseBody.success).to.eql(true)
  })

  it('invalid', async () => {
    const responseBody = await fetch('http://localhost:8888/user', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"username": "test---", "password": "test_pass"})
    }).then((res) => res.json())
    expect(responseBody.data).to.eql('invalid request')
  })
})
