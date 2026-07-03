import { Star, StarHalf } from "lucide-react";

import React from 'react'

function Stars({value}) {

    return (
        <>
            <div className="flex gap-2">

                {
                    [0, 1, 2, 3, 4].map(item => (
                        item <= value ?  item == value-0.5  ? <StarHalf fill="yellow" /> : <Star fill="yellow" /> : <Star fill="#111"/>)
                    )
                
                }
            </div>

        </>
    )
}

export default Stars