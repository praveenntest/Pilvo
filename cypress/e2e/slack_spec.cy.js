describe('Slack Automation', () => {
    let channelId;
    const initialChannelName = 'test-channel';
    const renamedChannelName = 'renamed-test-channel';
  
    it('should create a new channel', () => {
      cy.createChannel(initialChannelName).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.ok).to.be.true;
        channelId = response.body.channel.id;
      });
    });
  
    it('should join the newly created channel', () => {
      cy.joinChannel(channelId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.ok).to.be.true;
      });
    });
  
    it('should rename the channel', () => {
      cy.renameChannel(channelId, renamedChannelName).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.ok).to.be.true;
        expect(response.body.channel.name).to.eq(renamedChannelName);
      });
    });
  
    it('should list all channels and validate if the channel name has changed successfully', () => {
      cy.listChannels().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.ok).to.be.true;
        const channel = response.body.channels.find(ch => ch.id === channelId);
        expect(channel).to.not.be.undefined;
        expect(channel.name).to.eq(renamedChannelName);
      });
    });
  
    it('should archive the channel', () => {
      cy.archiveChannel(channelId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.ok).to.be.true;
      });
    });
  
    it('should validate if the channel is archived successfully', () => {
      cy.listChannels().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.ok).to.be.true;
        const channel = response.body.channels.find(ch => ch.id === channelId);
        expect(channel).to.be.undefined; // Archived channels are not listed by default
      });
    });
  });