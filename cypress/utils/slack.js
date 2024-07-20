const token = 'your_slack_api_token';
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