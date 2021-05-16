import soap from 'soap'

const url = 'http://localhost:8000/wsdl?wsdl'

soap.createClient(url, (err, client) => {
  if (err) {
    throw err
  }
  /*
  * Parameters of the service call: they need to be called as specified
  * in the WSDL file
  */
  const args = {
    message:  "id1:12:34:56:out42",
    splitChar: ":"
  }

  client.MessageSplitter(args, (err, res) => {
    if (err) {
      throw err
    }
    console.log(res)
  })
})
