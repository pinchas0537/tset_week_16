import { useState } from 'react'
import data from './data.json'

const defaultimgurl = "https://i.ibb.co/ycZWv253/9.png"

export default function Show() {
    const [input, setInput] = useState("")
    const [click, setClick] = useState(false)
    return (
        <div>
            <div className='input'>
                <input type="text" placeholder='Search by name' onChange={(event) => {
                    setInput(event.target.value)
                }} />
                <input type="text" placeholder='Search by number of attacks' onChange={(event) => {
                    setInput(event.target.value)
                }} />
                <label htmlFor="">Search by status
                    <select name="" id="" onChange={(event) => {
                        setInput(event.target.value)
                    }}>
                        <option value="">Select desired status</option>
                        <option value="active">Active</option>
                        <option value="quiet">Quiet</option>
                        <option value="dead">Dead</option>
                        <option value="agent">Israeli Agent</option>
                    </select>
                </label>
                <button onClick={() => {
                    setClick(!click)
                }}>most dangerous terrorist</button>
            </div>

            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Organization</th>
                        <th>attacksCount</th>
                        <th>status</th>
                        <th>relationToIsraelSummary</th>
                        <th>image</th>
                    </tr>
                </tbody>
                {!click ? <>
                    {data.filter((user) => {
                        return user.name.toLowerCase().includes(input) || user.attacksCount.toString() === input || user.status.includes(input)
                    }).map((terrorist) => {
                        return <tr className='tr'>
                            <td>{terrorist.name}</td>
                            <td>{terrorist.organization}</td>
                            <td>{terrorist.attacksCount}</td>
                            <td>{terrorist.status}</td>
                            <td>{terrorist.relationToIsraelSummary}</td>
                            <td><img src={terrorist.imageUrl || defaultimgurl}></img></td>
                        </tr>
                    })}

                </> :
                    data.filter((td) => {
                        debugger
                        return td.status === "active" && td.imageUrl !== null && td.attacksCount === (data.sort((a, b) => b.attacksCount - a.attacksCount)[0].attacksCount)
                    })
                        .map((td) => {
                            return <tr className='tr'>
                                <td>{td.name}</td>
                                <td>{td.organization}</td>
                                <td>{td.attacksCount}</td>
                                <td>{td.status}</td>
                                <td>{td.relationToIsraelSummary}</td>
                                <td><img src={td.imageUrl}></img></td>
                            </tr>
                        })
                }
            </table>
        </div>
    )
}
