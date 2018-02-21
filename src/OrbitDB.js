import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'

// OrbitDB uses Pubsub which is an experimental feature
// and need to be turned on manually.
// Note that these options need to be passed to IPFS in
// all examples even if not specfied so.
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  }
}

const ipfs = new IPFS(ipfsOptions)

export default function() {
  return new Promise((resolve, reject) => {
    ipfs.on('error', e => reject(e))
    ipfs.on('ready', async () => {
      // Create a database
      const orbitdb = new OrbitDB(ipfs)

      const db = await orbitdb.keyvalue('exampleDB')
      resolve(db)
    })
  })
}
