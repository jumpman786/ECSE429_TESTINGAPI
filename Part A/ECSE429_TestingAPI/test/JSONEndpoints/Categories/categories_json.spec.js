const axios = require('axios');
const { expect } = require('chai');
const { BASE_URL } = require('../../testConstants');

describe('JSON/Categories', function () {
  let cid;
  it('create category', async function () {
    const resp = await axios.post(`${BASE_URL}/categories`, {
      title: 'School',
      description: 'Assignments'
    }, { validateStatus: () => true });
    expect([200,201]).to.include(resp.status);
    cid = resp.data.id;
  });

  it('update category description', async function () {
    const resp = await axios.put(`${BASE_URL}/categories/${cid}`, {
      title: 'School',
      description: 'Updated assignments'
    }, { validateStatus: () => true });
    expect([200,201]).to.include(resp.status);
    expect(resp.data.description).to.match(/Updated/);
  });
});
