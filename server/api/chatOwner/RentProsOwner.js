const RentInqModel = require('../../db/models/prospects/RentLeads/RentInq')
const RentProsModel = require('../../db/models/prospects/RentLeads/RentPros')
//const NoteModel = require('../../db/models/common/Note')
class RentProsOwner {
  constructor(ownerId) {
    this.rentInqId = ownerId
  }
  async getProfile() {
    const rentInqData = await RentInqModel.findById(this.rentInqId).populate('prospect')
    const profile = {
      name: rentInqData.prospect.fullName,
      notes: rentInqData.notes
    }
    return profile
  }
  async getPhone() {
    const rentInqData = await RentInqModel.findById(this.rentInqId).populate('prospect')
    const phoneNumber = rentInqData.prospect.phoneNumbers.find((phone) => phone.isPrimary)
    return phoneNumber.number
  }
  // async addNote(noteData, userId) {
  //   const {type, content} = noteData;
  //   const user = await User.findById(userId)
  //   const note = new NoteModel({type, content, user: user._id})
  //   await note.save()
  //   await RentInqModel.findByIdAndUpdate(this.rentInqId,  { $push: { notes: note } }, {new: true})
  // }
}

module.exports = RentProsOwner