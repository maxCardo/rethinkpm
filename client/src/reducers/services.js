
const initialState = {
  services: {
    '001': {
      _id: '001',
      opened: new Date(),
      madeBy: 'Bob',
      serviceType: 'General Maintenance',
      name: 'Renovate the main front wall of the house',
      description: 'We have to renovate the front wall of the house, because it has several water damage, for this we will have to construct a new wall, with the same materials found in the rest of the construction and then paint it accordingly to the rest of the house. This is estimated to take 4 weeks, because it was constructed with an special material hard to find, and also we will face a period when usually the majority of the vendors are very busy. Once we finish with this task we will be ready for renting the unit. WallsSmith is on charge of the whole project and made an estimate budget of 10.000$. This will also increase the property value from 90.000$ to 110.000$ because it will make the unit attractive to new owners, and will allow us to increase the rent. The agent Oscar will supervise the whole operation and inform Adam when necesary',
      status: 'In progress',
      statusDate: new Date(),
      nextDate: new Date(),
      vendor: 'WallsSmith',
      childs: ['002', '003']
    },
    '002': {
      _id: '002',
      parent: '001',
      name: 'Construct wall',
      opened: new Date(),
      madeBy: 'Bob',
      serviceType: 'General Maintenance',
      status: 'Completed',
      statusDate: new Date(),
      nextDate: new Date(),
      vendor: 'WallsSmith'
    },
    '003': {
      _id: '003',
      parent: '001',
      name: 'Paint wall',
      opened: new Date(),
      madeBy: 'Bob',
      serviceType: 'General Maintenance',
      status: 'Ready to Start',
      statusDate: new Date(),
      nextDate: new Date(),
      vendor: 'WallsSmith',
      childs: ['004', '005'],
    },
    '004': {
      _id: '004',
      parent: '003',
      name: '1st hand of paint',
      opened: new Date(),
      madeBy: 'Bob',
      serviceType: 'General Maintenance',
      status: 'Ready to Start',
      statusDate: new Date(),
      nextDate: new Date(),
      vendor: 'WallsSmith',
    },
    '005': {
      _id: '005',
      parent: '003',
      name: '2nd hand of paint',
      opened: new Date(),
      madeBy: 'Bob',
      serviceType: 'General Maintenance',
      status: 'Ready to Start',
      statusDate: new Date(),
      nextDate: new Date(),
      vendor: 'WallsSmith',
    },
  }
};

export default function (state = initialState, action) {
    const { type } = action;

    switch (type) {
      default:
          return state;
    }
}