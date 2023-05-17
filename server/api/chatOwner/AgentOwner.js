const AgentModel = require('../../db/models/prospects/agentPros/agent')
const NoteModel = require('../../db/models/common/Note')
class AgentOwner {
  constructor(ownerId) {
    this.agentId = ownerId
  }
  async getProfile() {
    const agentData = await AgentModel.findById(this.agentId)
    const profile = {
      name: agentData.fullName,
      notres: agentData.notes
    }
    return profile
  }
  async getPhone() {
    const agentData = await AgentModel.findById(this.agentId)
    const phoneNumber = agentData.phoneNumbers.find((phone) => phone.isPrimary)
    return phoneNumber.number
  }
  async addNote() {
    const {type, content} = noteData;
    const user = await User.findById(userId)
    const note = new NoteModel({type, content, user: user._id})
    await note.save()
    await AgentModel.findByIdAndUpdate(this.agentId,  { $push: { notes: note } }, {new: true}).populate({path:'notes'})
  }
}

module.exports = AgentOwner