import { useState } from 'react';
import './tokenPanel.css';
import axios from 'axios';
import { SERVER_URL } from '../../API';
interface ITokenPanelProps {
    setMessage: (message: string) => void;
};

const TokenPanel = ({ setMessage } : ITokenPanelProps) => {
    const [token, setToken] = useState('');
    const fetchHandle = async () => {
        try {
            const res = await axios.get(
                SERVER_URL + 'api/token'
            );
            if(!res.data.success)
                return setMessage(res.data.message);
            setToken(res.data.token);
        } catch(e: any) {
            if(e.response.data.message)
                setMessage(e.response.data.message);
        };
    };
    return (
        <section
            className={'token-container'}
        >
            <textarea
                value={token}
                disabled
                onClick={
                    () => navigator.clipboard.writeText(token)
                }
            />
            <button
                onClick={fetchHandle}
            >
                Отримати Токен
            </button>
        </section>
    );
};

export default TokenPanel;
