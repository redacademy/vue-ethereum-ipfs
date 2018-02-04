module.exports = {
  build: {
    'index.html': 'index.html',
    'app.js': ['javascripts/app.js'],
    'app.css': ['stylesheets/app.css'],
    'images/': 'images/'
  },
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // Match any network id
    }
  }
}
