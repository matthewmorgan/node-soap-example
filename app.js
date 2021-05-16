import soap from 'soap'
import express from 'express'
import fs from 'fs'

const WSDL_PATH = "/wsdl"
const PORT = process.env.port || 8000

const splitFunction = ({message, splitChar}) => ({
  result: message.split(splitChar)
})

const serviceObject = {
  MessageSplitterService: {
    MessageSplitterServiceSoapPort:   {
      MessageSplitter: splitFunction
    },
    MessageSplitterServiceSoap12Port: {
      MessageSplitter: splitFunction
    }
  }
}

const wsdlXML = fs.readFileSync('service.wsdl', 'utf8')
const app = express()

app.get('/', (req, res) => {
  res.send('Node Soap Example!<br /><a href="https://github.com/matthewmorgan/node-soap-example#readme">Git README</a>')
})

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`)
  soap.listen(app, WSDL_PATH, serviceObject, wsdlXML)
  console.log(`Check http://localhost:${PORT}${WSDL_PATH}?wsdl to see if the service is working`)
})

export default app
