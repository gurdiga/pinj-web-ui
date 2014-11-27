express = require 'express'
app = express()

staticMiddleware = require 'express-static'
app.use staticMiddleware './'

browserify = require 'browserify-middleware'
coffeeify = require 'coffeeify'
browserifyOptions =
  transform: ['coffeeify']
  debug: true

for bundle, entry of require '../common/bundle-entry-pairs'
  app.use bundle, browserify(entry, browserifyOptions)

jade = require 'jade'
app.set 'views', './'
app.set 'view engine', 'jade'
app.engine 'jade', jade.__express

serve = (template) ->
  (req, res) -> res.render(template)

pairs = require '../common/page-template-pairs'
pairs[''] = pairs['index.html']

app.get "/#{htmlFile}", serve(template) for htmlFile, template of pairs

app.listen 3000, ->
  console.log 'Listening on port 3000'
