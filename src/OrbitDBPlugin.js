import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'

const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  }
}

export default {
  install: async function(Vue) {
    const ipfs = new IPFS(ipfsOptions)
    console.log('Installing OrbitDB ...')
    function createDB() {
      new Promise((resolve, reject) => {
        ipfs.on('error', e => reject(e))
        ipfs.on('ready', async () => {
          // Create a database
          const orbitdb = new OrbitDB(ipfs)

          const db = await orbitdb.docstore('obligatron.test')
          resolve(db)
        })
      })
    }

    try {
      const db = await createDB()
      Vue.prototype.orbit = {
        get(query) {
          return db.get(query)
        },
        put(doc) {
          return db.put(doc)
        },
        query(queryFn) {
          return db.query(queryFn)
        }
      }
      console.log('OrbitDB installed ...')
    } catch (e) {
      console.log(e, 'Error installing orbit-db plugin...')
    }
  }
}
