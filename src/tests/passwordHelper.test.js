const { deepEqual, ok } = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')

const PASSWORD = 'youssef@123'
const HASH = '$2b$04$pHOB1JroEboVt4k450Evke7N.LwfHHT4Ra.mXremTandaqOmCTS1u'

describe.only('User Helper test suite', function () {
  it('Should generate a hash with a password', async () => {
    const res = await PasswordHelper.hashPassword(PASSWORD)
    ok(res.length > 10)
  })

  it('Should validade a password with its hash', async () => {
    const res = await PasswordHelper.comparePassword(PASSWORD, HASH)
    ok(res, true)
  })
})