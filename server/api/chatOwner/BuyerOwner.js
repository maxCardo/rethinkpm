const BuyerModel = require('../../db/models/prospects/BuyerPros')
class BuyerOwner {
  constructor(ownerId) {
    this.buyerId = ownerId
  }
  async getProfile() {
    const buyerData = await BuyerModel.findById(this.buyerId)
    const profile = {
      name: buyerData.fullName,
      notres: buyerData.notes
    }
    return profile
  }
  async getPhone() {
    const buyerData = await BuyerModel.findById(this.buyerId)
    const phoneNumber = buyerData.phoneNumbers.find((phone) => phone.isPrimary)
    return phoneNumber.number
  }
  async addNote() {
    const {type, content} = noteData;
    const user = await User.findById(userId)
    const note = new NoteModel({type, content, user: user._id})
    await note.save()
    await BuyerModel.findByIdAndUpdate(this.buyerId,  { $push: { notes: note } }, {new: true})
  }
}

module.exports = BuyerOwner