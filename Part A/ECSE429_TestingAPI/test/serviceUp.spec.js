const axios = require('axios');
const { expect } = require('chai');
const { BASE_URL } = require('./testConstants');

describe('Service readiness', function () {
  it('docs endpoint reachable', async function () {
    const resp = await axios.get(`${BASE_URL}/docs`, { maxRedirects: 0, validateStatus: () => true });
    expect([200,301,302]).to.include(resp.status);
  });
});
