const fakeServer = require('../index')
const fetch = require('node-fetch')
const {expect} = require('chai')
const path = require('path')

describe('DELETE gets', () => {
  let server = null

  afterEach(() => {
    server.stop()
  })

  it('obj response', async () => {
    const model_obj = {
      "port": 8888,
      "api": [
        {
          "method": "DELETE",
          "path": "/user",
          "response": {
            "user_response_success": "user_response_success"
          }
        }
      ]
    }
    server = fakeServer(model_obj)
    const responseBody = await fetch('http://localhost:8888/user', {method: 'DELETE'}).then((res) => res.json())
    expect(responseBody.user_response_success).to.eql('user_response_success')
  })

  it('html', async () => {
    const model_obj = {
      "port": 8888,
      "api": [
        {
          "method": "DELETE",
          "path": "/index",
          "response": path.resolve(__dirname, './misc/index.html')
        }
      ]
    }
    server = fakeServer(model_obj)
    const responseBody = await fetch('http://localhost:8888/index?test=yes', {method: 'DELETE'}).then((res) => res.text())
    expect(responseBody).to.contains('<div>test</div>')
  })
})
