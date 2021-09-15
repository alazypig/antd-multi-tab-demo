import {Input} from 'antd'
import React from 'react'

const Page3: React.FC = () => {
  const [value, setValue] = React.useState('')

  return (
    <div>
      <Input
        style={{width: '100px'}}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div>
        value from state: <span style={{color: 'red'}}>{value}</span>
      </div>
    </div>
  )
}

export default Page3
