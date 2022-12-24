import {Link} from 'react-router-dom'
function Users(props) {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Games</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
            </ul>
            <h1>Users</h1>
            <ul>
                {props.users.map(el => 
                    <li key={el.id}>
                        <b>{el.name}</b>
                        <br/>{el.e_mail}
                    </li>)}
            </ul>
        </div>
        
        
    )
}


export default Users;

import { BrowserRouter, Route,   Routes } from "react-router-dom";
import Games from "./Games";
import GameInf from "./GameInf";
import Users from "./Users";
function App() {

    const games = [
        {
            id: '1',
            title: 'Red Dead Redemption',
            developer:'Rockstar Games',
            release_date: '26.10.2018',
            genre: 'action-adventure'
        },
        {
            id: '2',
            title: 'Overwatch',
            developer:'Blizzard Entertainment',
            release_date: '24.05.2016',
            genre: 'online-shooter'
        },
        {
            id: '3',
            title: 'Crysis',
            developer:'Crytek',
            release_date: '17.09.2021',
            genre: 'stealth-action'
        },
    ]
    const users = [
        {
            id: 1,
            name: 'Alex',
            e_mail: '1234'
        },
        {
            id: 2,
            name: 'Dan',
            e_mail: '12345'
        },
        {
            id: 1,
            name: 'Serega',
            e_mail: '123456'
        },
    ]
    
  return (
      <div className="App">
        <BrowserRouter basename="/">
            
        <Routes>
            <Route path="/" element={<Games games={games}/>}/>
            <Route path="/:title" element={<GameInf games={games}/>}/>
            <Route path="/users" element={<Users users={users}/>}/>
        </Routes>

        </BrowserRouter>
        
        
        
      </div>
  )
}



export default App;