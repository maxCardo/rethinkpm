const { sendEmail } = require('../../3ps/email')
const express = require('express');
const auth = require('../../middleware/auth');
const SalesListings = require('../../db/models/sales/SalesListings');
const Pipeline = require('../../db/models/sales/Pipeline');
const {addIdxListing, removeIdxListing} = require('../../3ps/idx')
const {emailTemplate} = require('./emailTemplates/recomendedProperties')


const router = express.Router();

router.use(auth);


const PROPERTIES = [
    {
        "active": true,
        "_id": "5f708356b975d20f68430f45",
        "buyer": "5f4e4934f8e1720650a531c5",
        "agent": "5d4abac5d345d233a8ddb80f",
        "deal": {
            "data": {
                "county": {
                    "ran": true,
                    "success": false,
                    "errorRes": "does not match county req"
                },
                "idx": {
                    "ran": true,
                    "add": "success",
                    "success": true
                },
                "walkScore": {
                    "ran": false
                },
                "census": {
                    "ran": true,
                    "success": false,
                    "errorRes": "TypeError: Cannot read property 'geographies' of undefined"
                },
                "rents": {
                    "HA": {
                        "ran": true,
                        "success": false,
                        "errorRes": "listing does not match county req"
                    }
                }
            },
            "images": [
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/463f/f3643dfe0de6e3a0cc05c6a8f298a9ab/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/55f6/6f550d5e5c1bf539db4cf220611c9132/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/1f78/87f166526dfe344c2486767fa96ee2d6/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/a3ae/ea3ada5317d65104113ce91eca24acad/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/fe0d/d0ef158ed127e0c4d50478779a600efb/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/a65e/e56abacd460f2054d96a755bdb82cfda/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/8cbd/dbc8a611baeeb3e0d5946c8a4cc5afa6/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/4e8e/e8e445a991a894065c1d326e42d9695f/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/4114/41142e29e1c377ceb5115c3f990219cc/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/56cc/cc6575a14b7fd52eebe8b44d497906a2/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/639b/b93613becb23b09322d019b5121520c8/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/cb32/23bc92e0468e693603d3a32bbf504d96/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/0a8c/c8a06116b31562b870ca17178fcd67db/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/9dbb/bbd922cbb1f0c42fd968f09591ecfaf8/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/63da/ad366145a28cca136ff7fe7316fa64c5/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/5eaa/aae56ac1066fea17304797cf9ece8f6b/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/3d56/65d3dc48dfb7bca869bd2d04fc9fdced/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/bd6f/f6db1118c40dbd0ecc9b57190a1dad91/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/318d/d8137f146a2938029443377a991d2d2d/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/b1ca/ac1b114a7df763a65248c2ae01097ebe/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/5d6c/c6d5ceffdeeba2e2b5a0f331bdecd19a/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/9ac7/7ca9fee70c9134e990a495bcd72b7807/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/c954/459c00b0e96ef3fff19c02b792b828b0/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/32b1/1b2312bedb66603c86a99d8840b4d07d/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/5f6c/c6f549ae5342987c5cf490c7c9fa5ef4/d504",
                null
            ],
            "_id": "5f7069aa60c36a0017d69848",
            "propertyType": "res",
            "listDate": "2020-09-26T05:00:00.000Z",
            "listNumber": "1470221",
            "mlsStatus": "A",
            "listingAgentID": "225767",
            "listingOfficeID": "13646",
            "listPrice": 255000,
            "bedrooms": 3,
            "bathsFull": 2,
            "bathsPartial": 1,
            "totalBaths": 3,
            "streetNumber": "301",
            "streetName": "Northglen Ct",
            "city": "Gibsonia",
            "state": "Pennsylvania",
            "zipcode": "15044",
            "county": "Butler",
            "latitude": 40.68325,
            "longitude": -80.032144,
            "history": [],
            "__v": 0,
            "condition": "8",
            "unitSch": []
        },
        "status": "recommend",
        "history": [
            {
                "date": "2020-09-27T12:19:23.292Z",
                "_id": "5f708356b975d20f68430f46",
                "event": "recommend",
                "statusTo": "recommend"
            },
            {
                "date": "2020-09-27T12:22:56.020Z",
                "_id": "5f70842a6cd42f1934c7fe3d",
                "event": "recommend",
                "statusTo": "recommend",
                "statusFrom": "recommend",
                "note": "property rerecomended from marketplace"
            },
            {
                "date": "2020-09-27T12:25:28.972Z",
                "_id": "5f7084bdaf4ecf4aec62f066",
                "event": "recommend",
                "statusTo": "recommend",
                "statusFrom": "recommend",
                "note": "property rerecomended from marketplace"
            },
            {
                "date": "2020-09-27T12:25:28.972Z",
                "_id": "5f708562af4ecf4aec62f067",
                "event": "recommend",
                "statusTo": "recommend",
                "statusFrom": "recommend",
                "note": "property rerecomended from marketplace"
            },
            {
                "date": "2020-09-27T12:25:28.972Z",
                "_id": "5f7085aeaf4ecf4aec62f068",
                "event": "recommend",
                "statusTo": "recommend",
                "statusFrom": "recommend",
                "note": "property rerecomended from marketplace"
            }
        ],
        "__v": 4
    },
    {
        "active": true,
        "_id": "5f70865caf4ecf4aec62f069",
        "buyer": "5f4e4934f8e1720650a531c5",
        "agent": "5d4abac5d345d233a8ddb80f",
        "deal": {
            "data": {
                "county": {
                    "ran": true,
                    "success": false,
                    "errorRes": "does not match county req"
                },
                "idx": {
                    "ran": true,
                    "add": "success",
                    "success": true
                },
                "walkScore": {
                    "ran": false
                },
                "census": {
                    "ran": true,
                    "success": false,
                    "errorRes": "TypeError: Cannot read property 'geographies' of undefined"
                },
                "rents": {
                    "HA": {
                        "ran": true,
                        "success": false,
                        "errorRes": "listing does not match county req"
                    }
                }
            },
            "images": [
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/8545/545835e87d817e5c69f975d2aed7a0ed/d504",
                null
            ],
            "_id": "5f7069aa60c36a0017d69832",
            "propertyType": "res",
            "listDate": "2020-09-26T05:00:00.000Z",
            "listNumber": "1470253",
            "mlsStatus": "A",
            "listingAgentID": "222387",
            "listingOfficeID": "26201",
            "listPrice": 470785,
            "bedrooms": 4,
            "bathsFull": 3,
            "bathsPartial": 1,
            "totalBaths": 4,
            "streetNumber": "3037",
            "streetName": "Eagle Ridge Drive",
            "city": "Valencia",
            "state": "Pennsylvania",
            "zipcode": "16059",
            "county": "Butler",
            "latitude": 0,
            "longitude": 0,
            "history": [],
            "__v": 0,
            "condition": "8",
            "unitSch": []
        },
        "status": "recommend",
        "history": [
            {
                "date": "2020-09-27T12:25:28.972Z",
                "_id": "5f70865caf4ecf4aec62f06a",
                "event": "recommend",
                "statusTo": "recommend"
            },
            {
                "date": "2020-09-27T12:25:28.972Z",
                "_id": "5f708691af4ecf4aec62f06b",
                "event": "recommend",
                "statusTo": "recommend",
                "statusFrom": "recommend",
                "note": "property rerecomended from marketplace"
            },
            {
                "date": "2020-09-27T12:33:44.524Z",
                "_id": "5f7086ab5197fb44403b11ee",
                "event": "recommend",
                "statusTo": "recommend",
                "statusFrom": "recommend",
                "note": "property rerecomended from marketplace"
            }
        ],
        "__v": 2
    },
    {
        "active": true,
        "_id": "5f70975954ef3140604a79d6",
        "buyer": "5f4e4934f8e1720650a531c5",
        "agent": "5d4abac5d345d233a8ddb80f",
        "deal": {
            "data": {
                "county": {
                    "ran": true,
                    "success": true
                },
                "idx": {
                    "ran": true,
                    "add": "success",
                    "success": true
                },
                "walkScore": {
                    "ran": false
                },
                "census": {
                    "ran": true,
                    "success": true
                },
                "rents": {
                    "HA": {
                        "ran": true,
                        "success": true
                    }
                }
            },
            "lastSold": {
                "date": "06-18-2018",
                "price": 580000
            },
            "rents": {
                "HA": {
                    "tier": "5"
                }
            },
            "images": [
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/07a8/8a707107f6dafbad0d7faade82069988/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/8743/3478faa4f3c9e42f1ea3378acfc6d2d9/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/966e/e6691ede73b82ef6840eb4e6a146746a/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/5fb2/2bf517548c2797a2f308fe482f9dcf51/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/73aa/aa3731ffbba92eda1f0ed89e99fa8a89/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/f5c2/2c5f23b3d411da2a01f098b6b823d5fd/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/5da1/1ad52450773d82cb9f7da09e6d5d8c11/d504",
                null
            ],
            "_id": "5f6ba5a200c0d126ec515af0",
            "propertyType": "multi",
            "listNumber": "1462171",
            "mlsStatus": "A",
            "listingAgentID": "220730",
            "listingOfficeID": "13408",
            "listPrice": 995000,
            "streetNumber": "660",
            "streetName": "New Texas Rd",
            "city": "Pittsburgh",
            "state": "Pennsylvania",
            "zipcode": "15239",
            "county": "Allegheny-East",
            "latitude": 40.460914,
            "longitude": -79.724847,
            "history": [],
            "schoolDistrict": "Plum Boro",
            "lotSize": 321503,
            "buildingSize": null,
            "totalRooms": null,
            "zoning": "APART: 5-19 UNITS",
            "numUnits": 0,
            "ownerOcc": false,
            "lotBlock": "1104B00112000000",
            "tract": "5262.02",
            "opZone": false,
            "__v": 0,
            "condition": "4",
            "unitSch": []
        },
        "status": "recommend",
        "history": [
            {
                "date": "2020-09-27T13:36:51.193Z",
                "_id": "5f70975954ef3140604a79d7",
                "event": "recommend",
                "statusTo": "recommend"
            },
            {
                "date": "2020-09-27T14:24:32.383Z",
                "_id": "5f70a4d7e2a3733a18edd104",
                "event": "recommend",
                "statusTo": "recommend",
                "statusFrom": "recommend",
                "note": "property rerecomended from marketplace"
            }
        ],
        "__v": 1
    },
    {
        "active": true,
        "_id": "5f7097c354ef3140604a79d8",
        "buyer": "5f4e4934f8e1720650a531c5",
        "agent": "5d4abac5d345d233a8ddb80f",
        "deal": {
            "data": {
                "county": {
                    "ran": true,
                    "success": true
                },
                "idx": {
                    "ran": true,
                    "add": "success",
                    "success": true
                },
                "walkScore": {
                    "ran": false
                },
                "census": {
                    "ran": true,
                    "success": true
                },
                "rents": {
                    "HA": {
                        "ran": true,
                        "success": true
                    }
                }
            },
            "lastSold": {
                "date": "01-04-1985",
                "price": 58000
            },
            "rents": {
                "HA": {
                    "tier": "5"
                }
            },
            "images": [
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/c58e/e85cdbc763e812c04de3940520254b74/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/259a/a9527b85c7758563991f04d6da3ee936/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/a1ac/ca1afbef7cee8f65d920cfb3547747e1/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/67d4/4d76593e43713ea9be3d3c1672a4111c/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/4607/7064f881f573133cd7110bdb16ce429f/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/647d/d746bf5dede695ea967fea98b505cea1/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/5715/51755245756ea898cb6b0e6d09ec1986/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/18c6/6c81ad696a6ff765977e27a22db1a971/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/59f4/4f959f5d50bef03a7c4c3fbd142618fb/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/3016/61034800b633dbdd3927b9acfcc2ffed/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/fff4/4fff4994ae8953d266eb0be0c0d4b023/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/d305/503d041b452ec9f7e51affde69113dd0/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/dae9/9ead330ef86f38eb6a9b5130983f6d4e/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/b3d3/3d3b7b94dda7f92c5e5d0596a7a0d8ce/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/e902/209e81f05a3e8d8ddf7ed72215435ff1/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/41df/fd1460b78fadede5762cdbe85620d057/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/5adc/cda587606a7397ae3897142ff3f5a0b9/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/ab01/10ba867c853e29ed0fd7e4a3de1c6124/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/170b/b071aeda3cdd9b6fa4872aadf50af8d3/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/0db4/4bd0448a96595a957791c46d094b2dfd/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/52b1/1b25fbbc351ca232f7ca33c79efecd84/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/0827/728054098d574162cc168e6c95575186/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/7b6b/b6b795ec36c2d5ee2c4a6e44e4bd2d09/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/b4ac/ca4b955fcc2165d74e074f1fce396fab/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/13c3/3c3162d7630dcfa5b9fc7279b296465e/d504",
                null
            ],
            "_id": "5f6ba5a200c0d126ec515a48",
            "propertyType": "multi",
            "listNumber": "1469458",
            "mlsStatus": "A",
            "listingAgentID": "227546",
            "listingOfficeID": "77611",
            "listPrice": 170000,
            "streetNumber": "716",
            "streetName": "5th Ave",
            "city": "Coraopolis",
            "state": "Pennsylvania",
            "zipcode": "15108",
            "county": "Allegheny-Northwest",
            "latitude": 40.520125,
            "longitude": -80.171112,
            "history": [],
            "schoolDistrict": "Cornell",
            "lotSize": 5365,
            "buildingSize": "2270",
            "totalRooms": "7",
            "zoning": "SINGLE FAMILY",
            "numUnits": 0,
            "ownerOcc": false,
            "lotBlock": "0419C00301000000",
            "tract": "4508",
            "opZone": false,
            "__v": 0,
            "condition": "4",
            "unitSch": []
        },
        "status": "recommend",
        "history": [
            {
                "date": "2020-09-27T13:36:51.193Z",
                "_id": "5f7097c354ef3140604a79d9",
                "event": "recommend",
                "statusTo": "recommend"
            },
            {
                "date": "2020-09-27T14:24:32.383Z",
                "_id": "5f70a4bee2a3733a18edd0fb",
                "event": "recommend",
                "statusTo": "recommend",
                "statusFrom": "recommend",
                "note": "property rerecomended from marketplace"
            }
        ],
        "__v": 1
    },
    {
        "active": true,
        "_id": "5f70a4c2e2a3733a18edd0fc",
        "buyer": "5f4e4934f8e1720650a531c5",
        "agent": "5d4abac5d345d233a8ddb80f",
        "deal": {
            "data": {
                "county": {
                    "ran": true,
                    "success": true
                },
                "idx": {
                    "ran": true,
                    "add": "success",
                    "success": true
                },
                "walkScore": {
                    "ran": false
                },
                "census": {
                    "ran": true,
                    "success": true
                },
                "rents": {
                    "HA": {
                        "ran": true,
                        "success": true
                    }
                }
            },
            "lastSold": {
                "date": "01-14-1985",
                "price": 35000
            },
            "rents": {
                "HA": {
                    "tier": "5"
                }
            },
            "images": [
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/9eb1/1be9da9525817b4b61332044e1d38315/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/a0e4/4e0a37bef1fd5c505a421495cc645a32/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/9223/3229b74508f014b8655af73273969174/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/80e2/2e0843c4ce244afcac5ce9c9677d86e3/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/6b22/22b6a67e2715d2c7edfce14c167140af/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/aedb/bdeaaf0839c23a84e464678b468acede/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/9f90/09f92cd80de6d313ef2b782ac33ace51/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/7f66/66f7184d3873544b55ca2305df73e6f7/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/7bf3/3fb796cf7d124248216554e6a803f815/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/4d84/48d49688a37d1fa8f7b3e7724f581579/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/58ff/ff856d22ac9224c892161a2822a0add5/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/d4b8/8b4ddb0455d064463763767ec6e60285/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/8281/1828badcdb621b980f077642a4f6cbb0/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/686a/a6863a653fb651ea41d8c99e6c9a88b1/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/6018/8106aa217c8078a6f9534d2011931571/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/9656/6569f5ef1ddaf4ba95cc9e8cd52fafbf/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/1096/69019d103ccc9eb05d6ce459fd6c066b/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/758d/d857cfd21ea045cd6fc83c6ecfdff97a/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/1bea/aeb108c7071f0540995d10110aa6ab10/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/b421/124bf6c4718ec262112a3227da1f835a/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/468e/e86463c8c8529040d74420bbc67ad45e/d504",
                "https://s3.amazonaws.com/mlsphotos.idxbroker.com/photos/d59b/b95dc36ff520cc7ae980471b919244e9/d504",
                null
            ],
            "_id": "5f6ba5a200c0d126ec515a78",
            "propertyType": "multi",
            "listNumber": "1467167",
            "mlsStatus": "A",
            "listingAgentID": "220879",
            "listingOfficeID": "77608",
            "listPrice": 30000,
            "streetNumber": "119",
            "streetName": "Hawkins Ave",
            "city": "Pittsburgh",
            "state": "Pennsylvania",
            "zipcode": "15214",
            "county": "Allegheny-North",
            "latitude": 40.472343,
            "longitude": -80.014714,
            "history": [],
            "schoolDistrict": "Pittsburgh",
            "lotSize": 2354,
            "buildingSize": "2053",
            "totalRooms": "6",
            "zoning": "SINGLE FAMILY",
            "numUnits": 0,
            "ownerOcc": false,
            "lotBlock": "0077N00323000000",
            "tract": "2615",
            "opZone": true,
            "__v": 0,
            "condition": "2",
            "unitSch": []
        },
        "status": "recommend",
        "history": [
            {
                "date": "2020-09-27T14:24:32.383Z",
                "_id": "5f70a4c2e2a3733a18edd0fd",
                "event": "recommend",
                "statusTo": "recommend"
            }
        ],
        "__v": 0
    },
];

const BUYER = {
    "priceRange": [],
    "otherPref": [],
    "status": "new",
    "createData": "2020-09-16T00:50:03.776Z",
    "_id": "5ee6a880aa3a870abc98a9ab",
    "targetArea": [],
    "targetZip": [],
    "createDate": "2020-06-14T22:37:29.142Z",
    "firstName": "Joanne",
    "lastName": "Benedetto",
    "fullName": "Joanne Benedetto",
    "phoneNumbers": [
        {
            "_id": "5ee6a880aa3a870abc98a9ac",
            "number": "8648847491",
            "isPrimary": true,
            "okToText": true
        }
    ],
    "email": [
        {
            "_id": "5ee6a880aa3a870abc98a9ad",
            "address": "joannebenedetto5@yahoo.com",
            "isPrimary": true
        }
    ],
    "notes": [],
    "inqListings": [],
    "__v": 1
};

const AGENT = {
    "zipCodes": [],
    "areas": [],
    "fullName": "Sarah Searcy",
    "status": "agent",
    "_id": "5e8ddd2f3be1fc57a66bce2d",
    "agentId": "501054",
    "lastName": "Searcy",
    "firstName": "Sarah",
    "emailAddress": "ssearcy@tprsold.com",
    "officeId": "15141",
    "sales": 0,
    "__v": 7,
    "phone": "",
    "office": {
        "_id": "5edfc3f44f6e27392eaa63da",
        "officeId": "15141",
        "name": "BERKSHIRE HATHAWAY",
        "__v": 0
    },
    "email": [
        {
            "_id": "5ea862f608bf82435c806b29",
            "address": "ssearcy@tprsold.com",
            "isPrimary": true
        }
    ],
    "phoneNumbers": [],
    "notes": [
        {
            "date": "2020-07-03T19:27:21.902Z",
            "_id": "5eff86992b723de719323f6e",
            "content": "Add note",
            "user": "5dbeaa9886f37f6b5272fe55",
            "type": "note"
        }
    ]
};

const MESSAGE = 'This message should come from the form'

// @route: POST api/marketplace/testRecommend
// @desc: recomend propertie(s) to buyer(s) with email templet
// @ access: Public
router.post('/testRecommend', async (req, res) => {

    const {properties, buyers, customMessage} = req.body
    const html = emailTemplate(properties, customMessage);

    //sendEmail('bushavio@gmail.com', 'Testing Email Design', 'WHERE DOES THIS SHOW', html);

    try {
        //let pipeline = await Pipeline.find({}).populate('deal')
        res.status(200).send(html)
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }})


// @route: Get api/marketplace/pipeline
// @desc: get pipeline deals for a buyerPros
// @ access: Public
router.get('/', async (req, res) => {
    try {
        let pipeline = await Pipeline.find({}).populate('deal')
        res.status(200).send(pipeline)
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }})

// @route: Get api/marketplace/pipeline
// @desc: get pipeline deals for a buyerPros
// @ access: Public
router.get('/:id', async (req, res) => {
 try {
    let buyerId = req.params.id;
    let pipeline = await Pipeline.find({ "buyer": buyerId }).populate('deal')
    res.status(200).send(pipeline)   
 } catch (err) {
    console.error(err);
    res.status(500).send(err)
 }})

 // @route: Put api/marketplace/pipeline/trash
// @desc: update deal status
// @ access: Public
router.put('/status', async (req, res) => {
    try { 
        //TODO: change status from recommend to dead
        const {id,action} = req.body
        let deal = await Pipeline.findById(id).populate('deal', 'listNumber').populate('buyer', 'idxId')
        if (action === 'liked') {
            const idxDealId = await addIdxListing(deal.buyer.idxId, deal.deal.listNumber)
            deal.idxDealId = idxDealId
        }else if (action === 'dead' && deal.status === 'liked') {
            removeIdxListing(deal.buyer.idxId, deal.idxDealId)            
        }
        deal.history.push({
            event: 'updated status',
            statusFrom: deal.status,
            statusTo: action,
            note: 'agent manual updated deal from app',
        });
        deal.status = action;
        await deal.save()
        res.status(200).send(deal)
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }})

//ToDo: I will refactor this in the future. 
// @route: GET /api/marketplace/pipeline/sync;
// @desc: Sync and update buyer pipeline deals with website
// @ access: Public * ToDo: update to make private
router.post("/sync", async (req, res) => {
    try {
        let buyerId = req.body._id;
        let buyerIdxId = req.body.idxId;
        let currentBuyerListings = [];
        /*TODO: CHANGE BACK TO DYNAMIC idxId after completion*/
        let idxBuyerListings = await getIdxSavedListings(39);

        for (let i = 0; i < idxBuyerListings.data.length; i++) {

            const propertyId = idxBuyerListings.data[i].property.listingID;
            let currentProperty = await SalesListings.find({listNumber: propertyId});
            let shet = await currentProperty.map((value, index) => {
                return {
                    deal: value._id,
                    address: value.address,
                    city: value.area,
                    state: 'Pensilvania',
                    zip: value.zipcode,
                    listingId: value.listNumber
                }
            });

            currentBuyerListings.push(shet[0]);
        }

        let buyer = await model.findById(buyerId);
        await buyer.set({
            ...buyer,
            inqListings: currentBuyerListings
        });
        var result = await buyer.save();
        console.log(currentBuyerListings);
        let pipeline = await Pipeline.find({"buyer": buyerId});
        // //TODO: create the new pipeline object
        // pipeline.set({
        //     active: true,
        //     _id: 5f52910241efce07e4484fc8,
        //     buyer: 5f4e4934f8e1720650a531c5,
        //     agent: 5d4abac5d345d233a8ddb80f,
        //     deal: 5f1089e337328534946f090c,
        //     status: 'recommend',
        //     history: [ [Object] ],
        //     __v: 0
        // })
        console.log(pipeline);

        res.status(200).send(result);

    } catch (err) {
        console.error(err)
        res.status(500).send(err);
    }
});


module.exports = router;
