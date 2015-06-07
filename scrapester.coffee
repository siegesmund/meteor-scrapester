request = Npm.require 'request'
cheerio = Npm.require 'cheerio'
webshot = Npm.require 'webshot'
fs = Npm.require 'fs'

S = Scrapester = {}

S.get = (url) ->
  Async.runSync (done) ->
    request url, (error, response, body) ->
      if error then done error, null
      done null, body

S.parse = (url) ->
  response = S.get url
  if response.error then return response.error
  $ = cheerio.load response.result

S.links = (url) ->
  $ = S.parse url
  l = []
  if not $.error
    links = $ 'a'
    return _.map $(links), (link) -> {href: $(link).attr('href'), text: $(link).text()}
  return $.error
