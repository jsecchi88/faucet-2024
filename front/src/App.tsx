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
// {"jsonrpc":"2.0","id":1,"result":"0x8ac7230489e80000"}

type Data = {
  jsonrpc: string
  id: number
  result: string
}

export default function Home() {
  const [data, setData] = useState<Data | null>(null)
  useEffect(() => {
    fetch('http://localhost:5556/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [
          "0x7256ad738AA6A91a06801DCfDd1DE8DE20b1F91D",
          "latest"
        ],
        id: 1
      })
    })
      .then((res: Response) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);
  
  if (!data) return <div>Loading...</div>;
  
  return (
    <div>
      {Number(data.result) / 10**18} ETH
    </div>
  );
}
