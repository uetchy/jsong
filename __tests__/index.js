const request = require('supertest')
const app = require('..')

test('It should be responded with correct result', async () => {
  const response = await request(app).get('/?query=Test')
  const body = response.body
  expect(body).toHaveProperty(['links'])
  expect(body.links.length).toBeGreaterThan(0)
})

test('It should be failed with invalid query', async () => {
  const response = await request(app).get('/')
  const body = response.body
  expect(body).toHaveProperty('error')
})
