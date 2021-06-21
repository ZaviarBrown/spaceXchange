
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


function Buy() {
    const assets = useSelector(state => state.assets)





    if (!assets) {
        return null
    }

    return (
        <div>

        </div>
    )
}

export default Buy
