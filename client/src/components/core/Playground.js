import React from 'react';
import { Container } from 'react-bootstrap';
import CustomForm from "./CustomForm/CustomForm";
import {emailRegex, phoneRegex, urlRegex} from "../../util/commonFunctions";

const Playground = () => {


  let INPUTS = [
    {
      label: 'Email Address',
      variation: 'email',
      name: 'emailAddress',
      refObject: {required: true, pattern: emailRegex()}
    },
    {
      label: 'Full Name',
      name: 'fullName',
    },
    {
      variation: 'phone',
      label: 'Phone',
      name: 'phone',
      refObject: {required: true, pattern: phoneRegex()}
    },
    {
      refObject: {required: true},
      variation: 'select',
      label: 'Geneder',
      name: 'gender',
      options: [
        {
          value: 'male',
          label: 'Male',
        },
        {
          value: 'female',
          label: 'Female',
        },
        {
          value: 'dodge',
          label: 'Dodge',
        },
      ]
    },
    {
      variation: 'react-select',
      label: 'React select',
      name: 'reactselect',
      options: [
        {value: "chocolate", label: "Chocolate"},
        {value: "strawberry", label: "Strawberry"},
        {value: "vanilla", label: "Vanilla"}
      ],
      value:  {value: "vanilla", label: "Vanilla"}
    },
    {
      variation: 'multi-select',
      label: 'Select Multi',
      name: 'multiselect',
      options: [
        {value: "chocolate", label: "Chocolate"},
        {value: "strawberry", label: "Strawberry"},
        {value: "vanilla", label: "Vanilla"}
      ],
      value: []
    },
    {
      variation: 'checkbox',
      label: 'Preference',
      name: 'preference',
    },
    {
      variation: 'multi-select',
      label: 'Phone Numbers',
      name: 'phoneNumbers',
      options: [
        {value: "555555555", label: "5555555555"},
        {value: "6666666", label: "666666"},
        {value: "7777777", label: "7777777"}
      ],
      /*TODO: DELETE VALUE FIELD TO FILL FROM DB*/
      value: [{value: "555555555", label: "5555555555"}],
      mapper: (data) => {
        return data.map((item) => {
          return {
            label: item.number,
            value: item.number
          }
        })
      }
    },
    {
      variation: 'url',
      label: 'Link',
      name: 'link',
      refObject: {required: true, pattern: urlRegex()}
    },
    {
      variation: 'range',
      label: 'Price range',
      name: 'priceRange',
      refObject: {required: true, max: 5000000, min: 20000}
    },
  ]

  //TODO: for testing purposes Agent object is used
  const editData = {
    "zipCodes": [],
    "areas": [],
    "fullName": "Admin User",
    "status": "new",
    "_id": "5e8ddd2e3be1fc57a66bce20",
    "agentId": "650401",
    "lastName": "User",
    "firstName": "Admin",
    "emailAddress": "mailz@gmail.coom",
    "officeId": "13418",
    "sales": 0,
    "__v": 35,
    "phone": "",
    "office": {
      "_id": "5edfc3f54f6e27392eaa63db",
      "officeId": "13418",
      "name": "HOWARD HANNA",
      "__v": 0
    },
    "notes": [
      {
        "date": "2020-05-19T15:18:37.984Z",
        "_id": "5ec3f8cd1af24f12b42af4d2",
        "content": "test one note",
        "user": "5d4abb06d345d233a8ddb812",
        "type": "note"
      },
      {
        "date": "2020-05-19T15:21:47.717Z",
        "_id": "5ec3f98b1af24f12b42af4d3",
        "content": "Testing add note to see what happens when a note with too many words is added, ",
        "user": "5d4abb06d345d233a8ddb812",
        "type": "note"
      },
      {
        "date": "2020-05-27T15:36:26.138Z",
        "_id": "5ece88fa5e47da4d9cc8b754",
        "content": "test adding note",
        "user": "5d4abb06d345d233a8ddb812",
        "type": "note"
      },
      {
        "date": "2020-05-27T15:36:55.792Z",
        "_id": "5ece89175e47da4d9cc8b755",
        "content": "again",
        "user": "5d4abb06d345d233a8ddb812",
        "type": "note"
      },
      {
        "date": "2020-06-02T14:31:56.558Z",
        "_id": "5ed662dc776bcf510818908e",
        "content": "test again",
        "user": "5d4abb06d345d233a8ddb812",
        "type": "note"
      },
      {
        "date": "2020-06-02T14:32:06.617Z",
        "_id": "5ed662e6776bcf510818908f",
        "content": "and again",
        "user": "5d4abb06d345d233a8ddb812",
        "type": "note"
      },
      {
        "date": "2020-06-02T14:32:15.081Z",
        "_id": "5ed662ef776bcf5108189090",
        "content": "and again",
        "user": "5d4abb06d345d233a8ddb812",
        "type": "note"
      },
      {
        "date": "2020-06-02T14:32:24.789Z",
        "_id": "5ed662f8776bcf5108189091",
        "content": "one more time",
        "user": "5d4abb06d345d233a8ddb812",
        "type": "note"
      },
      {
        "date": "2020-06-09T16:38:50.601Z",
        "_id": "5edfbb1a4b9fd25578372539",
        "content": "test",
        "user": "5d4abb06d345d233a8ddb812",
        "type": "note"
      },
      {
        "date": "2020-06-09T18:25:20.964Z",
        "_id": "5edfd410a2ec8e4a9443dd57",
        "content": "test",
        "user": "5d4abb06d345d233a8ddb812",
        "type": "note"
      },
      {
        "date": "2020-06-09T19:07:36.164Z",
        "_id": "5edfddf8ab98374d486bd8ca",
        "content": "tetsingslknlklkdjsf",
        "user": "5d4abb06d345d233a8ddb812",
        "type": "note"
      }
    ],
    "email": [
      {
        "_id": "5ed91540635d2f610097584c",
        "address": "notPrime@test.com",
        "isPrimary": false
      },
      {
        "_id": "5ed9154d635d2f610097584d",
        "address": "prime@test.com",
        "isPrimary": true
      }
    ],
    "phoneNumbers": [
      {
        "_id": "5ed9151066f1652a5c8a011e",
        "number": "4125138992",
        "isPrimary": false,
        "okToText": true
      },
      {
        "_id": "5ed9151d66f1652a5c8a011f",
        "number": "4124445181",
        "okToText": true,
        "isPrimary": false
      },
      {
        "_id": "5f6c15165206542f94713aec",
        "number": "1111111111",
        "okToText": true,
        "isPrimary": true
      },
      {
        "_id": "5f6c157356496c4084c8009e",
        "number": "5551114445",
        "isPrimary": false,
        "okToText": true
      }
    ]
  }

  const mapData = (mapper, data) => mapper(data);

  const editRecord = () => {
    INPUTS.forEach((item, idx) => {
      if (item) {
        Object.keys(editData).map(function (key, index) {
          if (item.name === key) {
            INPUTS[idx].data = editData[key];
            if (INPUTS[idx].mapper) {
              INPUTS[idx].options = mapData(INPUTS[idx].mapper, editData[key]);

            }
            if (INPUTS[idx].variation === 'react-select') {
              INPUTS[idx].options = mapData(INPUTS[idx].mapper, INPUTS[idx].data)
              console.log(INPUTS[idx].options);
            }
            if (!INPUTS[idx].value && INPUTS[idx].variation === 'multi-select') {
              INPUTS[idx].selected = mapData(INPUTS[idx].mapper, INPUTS[idx].data)
              INPUTS[idx].options = mapData(INPUTS[idx].mapper, INPUTS[idx].data)

            } else if (INPUTS[idx].variation === 'multi-select') {
              INPUTS[idx].selected = INPUTS[idx].value;
            }
          }
        });
      }
    });
  }
  // COMMENT OUT TO SEE EMPTY FORM
  editRecord();

  return (
    <Container>
      <h2 className="form-title">Form Title</h2>
      <CustomForm inputs={INPUTS}/>
    </Container>

  );
}


export default Playground
