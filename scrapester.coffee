request = Npm.require 'request'
cheerio = Npm.require 'cheerio'
webshot = Npm.require 'webshot'
AWS = Npm.require 'aws-sdk'
Readable = Npm.require('stream').Readable

S = Scrapester = {}

S.get = (url) ->
  Async.runSync (done) ->
    request url, (error, response, body) ->
      if error then done error, null
      done null, body

# Returns a cheerio object
S.parse = (url) ->
  response = S.get url
  if response.error then return response.error
  $ = cheerio.load response.result

# Retrieves all links from the page at the url
S.links = (url) ->
  $ = S.parse url
  l = []
  if not $.error
    links = $ 'a'
    return _.map $(links), (link) -> {href: $(link).attr('href'), text: $(link).text()}
  return $.error

# Takes a screenshot of the url and saves it to Amazon S3
S.webshot = (url, bucket) ->
  params = {Bucket: bucket, Key: "#{url}.png"}
  s3 = new AWS.S3()
  Async.runSync (done) ->
    webshot url, (err, stream) ->
      if err
        done err, null
      else
        params.Body = new Readable().wrap(stream)
        s3.upload params, (err, data) -> done err, data
