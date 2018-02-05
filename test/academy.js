const Academy = artifacts.require('Academy')

require('chai').should()

contract('Academy', function () {
  const creator = web3.eth.accounts[0]

  beforeEach(async function () {
    this.academy = await Academy.new('TEST', { form: creator })
  })

  it('Should create a new Academy with a name and owner!', async function () {
    const name = await this.academy.name()
    const owner = await this.academy.owner()

    web3.toUtf8(name).should.be.equal('TEST')
    owner.should.be.equal(creator)
  })
})
