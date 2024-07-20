const token = '885e635bc9e9519645n55n4n4n13d3c0d19d8';
const baseUrl = 'https://slack.com/api';

function createChannel(name) {
  return cy.request({
    method: 'POST',
    url: `${baseUrl}/conversations.create`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: {
      name: name
    }
  });
}

function joinChannel(channelId) {
  return cy.request({
    method: 'POST',
    url: `${baseUrl}/conversations.join`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: {
      channel: channelId
    }
  });
}

function renameChannel(channelId, newName) {
  return cy.request({
    method: 'POST',
    url: `${baseUrl}/conversations.rename`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: {
      channel: channelId,
      name: newName
    }
  });
}

function listChannels() {
  return cy.request({
    method: 'GET',
    url: `${baseUrl}/conversations.list`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

function archiveChannel(channelId) {
  return cy.request({
    method: 'POST',
    url: `${baseUrl}/conversations.archive`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: {
      channel: channelId
    }
  });
}

module.exports = {
  createChannel,
  joinChannel,
  renameChannel,
  listChannels,
  archiveChannel
};