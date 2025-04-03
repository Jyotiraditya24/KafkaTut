import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([]);

  useEffect(()=>{
     async function getData(){
      const response = await fetch('http://localhost:3001/serverData');
      const data  = await response.json();
      setData(data);
     }
     getData();
  },[])

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-800 text-white text-left">
            <th className="p-3">Topic</th>
            <th className='p-3'>Parameter</th>
            <th className="p-3">Partition</th>
            <th className="p-3">Value</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d: any, index: number) => (
            <tr
              key={index}
              className={`border-b border-gray-300 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
            >
              <td className="p-3">{d.topic}</td>
              <td className='p-3'>{d.parameter}</td>
              <td className="p-3">{d.partition}</td>
              <td className="p-3">{d.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default App



createdAt:"2025-04-02T17:01:07.018Z"
partition:"0"
topic:"weather-topic"
updatedAt:"2025-04-02T17:01:07.018Z"
value:"61"
__v:0
_id:"67ed6d53e4b07cddb827e02a"
