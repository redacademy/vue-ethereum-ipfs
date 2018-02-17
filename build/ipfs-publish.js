const path = require('path')
const DaemonFactory = require('ipfsd-ctl')
const ipfsDaemon = DaemonFactory.create({ type: 'go' })

console.log('\nStarting local IPFS node...\n')
ipfsDaemon.spawn(
  {
    disposable: false,
    start: true,
    init: true
  },
  function(err, ipfsd) {
    if (err) {
      throw err
    }
    ipfsd.init(() => {
      ipfsd.start(() => {
        const dist = path.resolve('./', 'public')
        ipfsd.api.util.addFromFs(dist, { recursive: true }).then(filesAdded => {
          !err && console.log('Files were added...')

          ipfsd.api.name
            .publish(filesAdded.pop().hash)
            .then((err, result) => {
              err && console.log(err)
              !err && console.log(result)
            })
            .catch(err => {
              console.log('Error was caught', err)
            })
        })
      })
    })
  }
)
