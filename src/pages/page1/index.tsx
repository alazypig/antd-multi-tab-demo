import {Table} from 'antd'
import {ColumnsType} from 'antd/es/table'
import React from 'react'
import UserAgent from 'user-agents'

const Page1: React.FC = () => {
  const [agent, setAgent] = React.useState<any[]>()

  const columns: ColumnsType<any> = [
    {title: 'vendor', dataIndex: 'vendor', align: 'center'},
    {title: 'platform', dataIndex: 'platform', align: 'center'},
    {title: 'device', dataIndex: 'deviceCategory', align: 'center'},
  ]

  React.useEffect(() => {
    setAgent(undefined)

    setTimeout(() => {
      setAgent(new Array(20).fill(null).map(() => new UserAgent().data))
    }, 500)
  }, [])

  console.log(agent)
  return (
    <div>
      <Table dataSource={agent} loading={!agent} columns={columns} />
    </div>
  )
}

export default Page1
