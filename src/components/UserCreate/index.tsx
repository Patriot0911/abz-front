import { FormEvent, useEffect, useRef, useState } from 'react';
import { IPosition } from '../../interfaces';
import { SERVER_URL } from '../../API';
import axios from 'axios';
import './userCreate.css';

interface IUserCreateProps {
    setMessage: (message: string) => void;
};

const UserCreate = ({ setMessage }: IUserCreateProps) => {
    const [positions, setPositions] = useState<IPosition[]>();
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const positionRef = useRef<HTMLSelectElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const tokenRef = useRef<HTMLInputElement>(null);
    const submitHandle = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const file = (fileRef.current?.files && fileRef.current?.files.length > 0) ?
            fileRef.current.files[0] : undefined;
        const token = tokenRef.current?.value;
        const user = {
            name: nameRef.current?.value,
            phone: phoneRef.current?.value,
            email: emailRef.current?.value,
            position_id: positionRef.current?.value,
            file,
        };
        const formData = new FormData();
        for(const key of Object.keys(user)) {
            formData.append(key, user[key as keyof typeof user] as string);
        };
        const headers = {
            'accept':           'application/json,*/*',
            'token':            token,
            'Accept-Language':  'en-US,en;q=0.8',
            'Content-Type':     `multipart/form-data`,
        };
        try {
            const res = await axios.post(
                SERVER_URL + 'api/users',
                formData,
                {
                    headers,
                }
            );
            console.log(res.data);
            setMessage('Success');
        } catch(e: any) {
            if(!e.response.data || !e.response.data.message)
                return;
            console.log(e.response.data);
            const message = [e.response.data.message];
            if(e.response.data.fails) {
                for(const item of Object.values(e.response.data.fails)) {
                    if(item && (item as string[]).length > 0) {
                        message.push(
                            (item as string[]).join()
                        );
                    };
                };
            };
            setMessage(message.join('; '));
        };
    };
    useEffect(
        () => {
            axios.get(
                SERVER_URL + 'api/positions',
            )
            .then(
                (res) => {
                    if(!res.data.success)
                        return;
                    setPositions(res.data.positions);
                }
            )
            .catch(
                (res) => {
                    setMessage(res.data.message);
                }
            );
        },
    []);
    return (
        <section
            className={'create-user-container'}
        >
            <form
                className={'user-create-form'}
                onSubmit={submitHandle}
            >
                <input
                    placeholder={'name'}
                    ref={nameRef}
                />
                <input
                    placeholder={'token'}
                    ref={tokenRef}
                />
                <input
                    placeholder={'phone'}
                    ref={phoneRef}
                />
                <input
                    placeholder={'email'}
                    ref={emailRef}
                />
                <select
                    ref={positionRef}
                >
                    {
                        positions?.map(
                            item =>
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.name}
                            </option>
                        )
                    }
                </select>
                <input
                    type={'file'}
                    ref={fileRef}
                />
                <button
                    type='submit'
                >Створити</button>
            </form>
        </section>
    );
};

export default UserCreate;
