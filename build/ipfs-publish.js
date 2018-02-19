const path = require('path')
const DaemonFactory = require('ipfsd-ctl')
const ipfsDaemon = DaemonFactory.create({ type: 'go' })

console.log('\nStarting local IPFS node...\n')
ipfsDaemon.spawn(
  {
    // Set disposable to false to publish to your
    // IPFS repo public key
    disposable: false
  },
  function(err, ipfsd) {
    if (err) {
      throw err
    }
    ipfsd.start(() => {
      const dist = path.resolve('./', 'dist')
      ipfsd.api.util.addFromFs(dist, { recursive: true }).then(filesAdded => {
        console.log(filesAdded)
        console.log('\nFiles were added... Publishing...\n')
        ipfsd.api.name.publish(filesAdded.pop().hash).then(result => {
          console.log('Site was published!')
          console.log(`\nVisit: https://gateway.ipfs.io/ipns/${result.name}\n`)
          ipfsd.stop()
        })
      })
    })
  }
)
