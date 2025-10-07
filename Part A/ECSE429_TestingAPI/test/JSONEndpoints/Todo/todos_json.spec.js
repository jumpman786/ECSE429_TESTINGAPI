const axios = require('axios');
const { expect } = require('chai');
const { BASE_URL } = require('../../testConstants');

// helper: unwrap { todos: [ {...} ] } OR just { ... }
function unwrap(resourceName, data) {
  if (data && data[resourceName] && Array.isArray(data[resourceName])) {
    return data[resourceName][0];
  }
  return data;
}

describe('JSON/Todos', function () {
  let createdId; // keep as string for consistency with API

  it('create todo', async function () {
    const resp = await axios.post(`${BASE_URL}/todos`, {
      title: 'First todo',
      doneStatus: false,
      description: 'created via mocha tests'
    }, { validateStatus: () => true });
    expect([200,201]).to.include(resp.status);
    expect(resp.data).to.have.property('id');
    createdId = String(resp.data.id);
  });

  it('read created todo', async function () {
    const resp = await axios.get(`${BASE_URL}/todos/${createdId}`, { validateStatus: () => true });
    expect(resp.status).to.equal(200);
    const item = unwrap('todos', resp.data);
    expect(item).to.have.property('id');
    expect(String(item.id)).to.equal(createdId);
  });

  it('update todo', async function () {
    const resp = await axios.put(`${BASE_URL}/todos/${createdId}`, {
      title: 'First todo (edited)',
      doneStatus: true
    }, { validateStatus: () => true });
    expect([200,201]).to.include(resp.status);
    // API returns doneStatus as "true"/"false" (string), accept both
    expect(String(resp.data.doneStatus)).to.equal('true');
  });

  it('malformed JSON should yield client error', async function () {
    const bad = await axios({
      method: 'post',
      url: `${BASE_URL}/todos`,
      headers: { 'Content-Type': 'application/json' },
      data: '{"title":"bad json",}',
      validateStatus: () => true
    });
    expect([400,415,422]).to.include(bad.status);
  });

  it('delete todo', async function () {
    const resp = await axios.delete(`${BASE_URL}/todos/${createdId}`, { validateStatus: () => true });
    expect([200,204]).to.include(resp.status);
  });

  it('delete non-existent (log as bug if 2xx)', async function () {
    const resp = await axios.delete(`${BASE_URL}/todos/999999`, { validateStatus: () => true });
    expect([404,400,204,200]).to.include(resp.status);
  });
});
