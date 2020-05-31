import React, {useState} from 'react'

import Screen from './screens/Screen'

const ProfileDetails = ({settings: {screens, profileType}}) => {
    const [activeScreen, selectScreen] = useState('notes')
    

    return (
        <div className='bottom-navigation__container'>
            <div className='bottom-navigation__screen'>
                {<Screen screen={activeScreen} profileType={profileType}/>}
            </div>
            <div className='bottom-navigation__tabs'>
                {screens.map((screen, index) => (
                    <button key={index} className={((activeScreen === screen) ? 'active' : '') + ' bottom-navigation__tab'} active={activeScreen} onClick={() => selectScreen(screen)}>
                        {screen}
                    </button>
                ))}
            </div>
        </div>
    )

} 

export default ProfileDetails
