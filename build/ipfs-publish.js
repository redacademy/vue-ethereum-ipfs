const IPFS = require('ipfs')
const ipfsAPI = require('ipfs-api')
const node = new IPFS()
const fs = require('fs')
const path = require('path')

const dir = path.resolve(__dirname, '../dist')
const root = 'vue-ipfs'

// Can't be bothered to get these dynamically.
const files = [
  root,
  `${root}/static`,
  `${root}/static/css`,
  `${root}/static/js`,
  `${root}/static/img`
]

// https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
function walkSync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach(function(name) {
    let filePath = path.join(currentDirPath, name)
    let stat = fs.statSync(filePath)
    if (stat.isFile()) {
      callback(filePath, stat)
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback)
    }
  })
}
console.log('\nConnecting local IPFS node...\n')
node.on('ready', () => {
  const ipfs = ipfsAPI('localhost', '5001', { protocol: 'http' })

  walkSync(dir, function(filePath, stat) {
    files.push({
      path: `${root}${filePath.split('/dist').pop()}`,
      content: fs.readFileSync(
        `${path.resolve(__dirname, '../dist')}${filePath.split('/dist').pop()}`
      )
    })
  })
  console.log('\nPublishing to IPFS...')
  node.files.add(files, { recursive: true }, (err, filesAdded) => {
    filesAdded.forEach(file => {
      if (file.path === root) {
        ipfs.name.publish(`${file.hash}`, (err, name) => {
          fs.writeFileSync(
            path.resolve(__dirname, '../ipfs.json'),
            JSON.stringify(name)
          )
          node.stop(() =>
            console.log(
              `\nDone! Vist: https://gateway.ipfs.io/ipns/${name.name}`
            )
          )
        })
      }
    })
  })
})
