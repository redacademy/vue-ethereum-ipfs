const path = require('path')
const DaemonFactory = require('ipfsd-ctl')
const ipfsDaemon = DaemonFactory.create({ type: 'js' })

console.log('\nStarting local IPFS node...\n')
ipfsDaemon.spawn(
  {
    disposable: false,
    start: true,
    init: true
  },
  function (err, ipfsd) {
    if (err) {
      throw err
    }
    ipfsd.init(err => {
      ipfsd.start(err => {
        const dist = path.resolve('./', 'dist')
        ipfsd.api.util.addFromFs(dist, { recursive: true }, (err, result) => {
          if (err) {
            throw err
          }
          console.log(result)
          console.log(`\nThe above files & directories were added to IPFS!\n`)
          ipfsd.getConfig((err, cfg) => {
            cfg = JSON.parse(cfg) // wtf
            const distHash = `${result.pop().hash}`
            console.log(`Publishing ${distHash} to ${cfg.Identity.PeerID}\n`)
            ipfsd.api.name.publish(distHash, (err, name) => {
              console.log(err, name)
            })
          })
        })
      })
    })
  }
)
