const {
  build_response_default,
  build_request_params_response,
  build_request_authorization_response,
  build_request_from_other_server_response,
  build_request_queries_response
} = require('./build_koa_router_model')


/**
  * @param {object} get_api_object
  * @param {object} get_api_object.path
  * @param {object} get_api_object.response
  * @param {number|undefined} get_api_object.status
  * @param {object|undefined} get_api_object.params_response
  * @param {object|undefined} get_api_object.authorization
  * @returns {string}
*/
function get_template({path, response = {ok: 'OK'}, status = 200, params_response, authorization, response_from_url}) {
  let internal_body_part = ''

  if(authorization) {
    internal_body_part += build_request_authorization_response(authorization, path, 'GET')
  }

  if(response_from_url) {
    internal_body_part += build_request_from_other_server_response(response_from_url, path, 'GET')
  }

  if(params_response) {
    internal_body_part += build_request_params_response(params_response, path, 'GET')
  }

  internal_body_part += build_request_queries_response(response, path, 'GET')

  response = build_response_default(response, path, 'GET')

  return `
    router.get('${path}', async (ctx) => {
      ctx.status = ${status}
      ${internal_body_part}
      ctx.body = ${response}
      return ctx
    })`
}

module.exports = {
  get_template
}
