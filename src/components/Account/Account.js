import React from 'react';

import './account.scss'

function Account(props) {

    const bg = { backgroundImage: `url(${props.user.photoURL})` }
    return (
        <div className='account flex'>
            <div className='account__info flex'>
                <div className='avatar' style={bg}></div>
                <h4>{props.user.displayName}</h4>
            </div>
            <span>Theo dõi</span>
        </div>
    )
}

export default Account