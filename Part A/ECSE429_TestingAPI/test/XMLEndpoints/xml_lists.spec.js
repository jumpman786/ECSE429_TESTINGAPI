const axios = require('axios');
const { expect } = require('chai');
const { parseStringPromise } = require('xml2js');
const { BASE_URL } = require('../testConstants');

async function getXml(path) {
  return axios.get(`${BASE_URL}${path}`, {
    headers: { Accept: 'application/xml' },
    validateStatus: () => true
  });
}

describe('XML endpoints (smoke)', function () {
  it('GET /todos as XML', async function () {
    const resp = await getXml('/todos');
    expect(resp.status).to.equal(200);
    const xml = await parseStringPromise(resp.data);
    expect(xml).to.be.an('object');
  });

  it('GET /projects as XML', async function () {
    const resp = await getXml('/projects');
    expect(resp.status).to.equal(200);
    const xml = await parseStringPromise(resp.data);
    expect(xml).to.be.an('object');
  });

  it('GET /categories as XML', async function () {
    const resp = await getXml('/categories');
    expect(resp.status).to.equal(200);
    const xml = await parseStringPromise(resp.data);
    expect(xml).to.be.an('object');
  });
});
