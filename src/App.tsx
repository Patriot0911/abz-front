import UsersList from './components/Users/UsersList';
import { useState } from 'react';
import './App.css'
import UserCreate from './components/UserCreate';
import { SERVER_URL } from './API';
import TokenPanel from './components/TokenPanel';

const App = () => {
    const [message, setMessage] = useState('');
    return (
        <main>
            <h1>{SERVER_URL + 'api'}</h1>
            <div
                className={'err-msg-container'}
            >
                {message}
            </div>
            <UsersList
                setMessage={setMessage}
            />
            <UserCreate
                setMessage={setMessage}
            />
            <TokenPanel
                setMessage={setMessage}
            />
        </main>
    );
};

export default App;
