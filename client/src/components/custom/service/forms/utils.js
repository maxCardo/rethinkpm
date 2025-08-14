
const serviceTypeObject = {
	plumbing: {
		item: 'plumbing', 
		display:'Plumbing',
		subCat: {
			hotwater:{
				display: 'Hot Water',
				tShoot: {   
					gasService: {
						display: 'please confirm that your gas service is on',
						response: [{label: 'gas is on', value: true, action: 'next'}, {label: 'gas is off at meter', value: false, action: 'display: msg'} ],
						msg: 'Please call your gas utility provider to inquire about your gas service'
					},
					tankLeaking: {
						display: 'Is the water tank leaking?',
						response: [{label: 'There is no water around the water tank', value: true, action: 'next'}, {label: 'The tank is leaking', value: false, action: 'dispatch: priority'} ]
					},
					pioltOut: {
						display: 'Please follow instruction on water tank and confirm piolt lite is lit',
						response: [{label: 'piolt is lit', value: true, action: 'display: msg'}, {label: 'I can not relight to piolt', value: false, action: 'dispatch: priority'} ],
						msg: 'Everything looks to be in working order. Please let us know if this issues accures again. If the water is not hot enough you can raise the tempture on the tank. '
					}
					
				},
			}, 
			backUp: {
				display: 'Back Up',
			},
			fixtureDrip: {
				display: 'Fixture Drip',
			},
			plumbingLeak: {
				display: 'Plumbing Leak',
			},
			gasSmell: {
				display: 'Gas Smell',
			},
		}

	},
	havc: {display: 'Heating & Cooling'},
	electric: {display: 'Electrical'},
	appliances: {display: 'Appliances'},
	roof: {display: 'Roof Leak'},
	grounds: {display: 'Landscaping'},
	dwt: {display: 'Doors, Walls & Trim'},
	locks:{display: 'Locks & Keys'},
	smokes: {display: 'Smoke Detectors'},
	exterior: {display: 'Exterior Repairs'},
	pest: {display: 'Pest Control'},
	dispute: {display: 'Naighbor Dispute'},
	webAccess: {display: 'Web Access Tech Support'},
	contactRequest: {display: 'Property Manager Contact Request'},
	Billing: {display: 'Tenant/Billing Inquiry'},
	other: {display: 'Other'}
}

export const getServiceTypes = () => {
    const keys = Object.keys(serviceTypeObject)
    const arr = keys.map(x => {return {label: serviceTypeObject[x].display, value: x}})   
    return arr
}

export const getSubServiceType = (type) => {
 	const subCat = serviceTypeObject[type].subCat

	if(subCat){
		const keys = Object.keys(subCat)

		const arr = keys.map((x, index) => {
				return {label: serviceTypeObject[type].subCat[x].display, value: x, id: index}
		});

		return arr
	} else {
		return []
	}	
}

