const RentProsOwner = require('./RentProsOwner')
const AgentOwner = require('./AgentOwner')
const BuyerOwner = require('./BuyerOwner')


function getOwner(ownerId, ownerType) {
  if(ownerType === 'rentPros') {
    return new RentProsOwner(ownerId)
  }
  if(ownerType === 'agentPros') {
    return new AgentOwner(ownerId)
  }
  if(ownerType === 'buyerPros') {
    return new BuyerOwner(ownerId)
  }
}

module.exports = getOwner