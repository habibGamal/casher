import React from 'react'
import { Divider } from 'antd'

export default function PageTitle({name}: {name: string}) {
    return (
        <Divider
            orientation="left"
            className="font-bold before:bg-indigo-100 after:bg-indigo-100">
            
            {name}
        </Divider>

    )
}
