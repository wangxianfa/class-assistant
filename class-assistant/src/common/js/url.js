const buildQuery = (querySet) => {
  let build_query = ''
  for (const key of Object.keys(querySet)) {
    build_query += '&' + key + '=' + querySet[key]
  }
  return build_query.substring(1)
}

export function replaceParamVal (paramName, replaceWith) {
  const _hash = location.hash.substring(2) && location.hash.substring(2).split('?')[0]
  const _query = _hash && _hash.split('&')
  var querySet = {}

  for (const item of _query) {
    const key = item.split('=')[0]
    const value = item.split('=')[1]
    querySet[key] = value
  }

  querySet[paramName] = replaceWith
  const build_query = buildQuery(querySet)
  var nUrl = location.href.split('?')[0] + '?' + build_query
  window.location = nUrl 
} 
