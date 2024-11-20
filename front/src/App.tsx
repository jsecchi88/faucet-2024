import { useEffect, useState } from "react"

/*
curl --location 'localhost:5556/' \
--header 'Content-Type: application/json' \
--data '{
	"jsonrpc":"2.0",
	"method":"eth_getBalance",
	"params":[
		"0x7256ad738AA6A91a06801DCfDd1DE8DE20b1F91D", 
		"latest"
	],
	"id":1
}'
*/

type Data = {
  p1: string
  p2: string
}

export default function Home() {
  const [data, setData] = useState<Data | null>(null)
  useEffect (() => {
    fetch ('http://localhost:3333/111/222')
    .then(res => res.json())
    .then(data => setData(data))
  },[])

  if (!data) return <div>Loading...</div>

  return (
    <div>
      {data.p1} {data.p2}
    </div>
  )
}
