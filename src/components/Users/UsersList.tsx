import { useState, useEffect } from "react";
import PageButtons from "../ui/PageButtons";
import { IUser } from "../../interfaces";
import { SERVER_URL } from "../../API";
import UserCard from "./UserCard";
import './usersList.css';

interface IUsersListProps {
    setMessage: (arg: string) => void;
};

const UsersList = ({ setMessage }: IUsersListProps) => {
    const [users, setUsers] = useState<IUser[]>();
    const [count, setCount] = useState(5);
    const [page, setPage] = useState(1);
    const fetchUsers = async() => {
        const url = SERVER_URL + `api/users?page=${page}&count=${count}`;
        const res = await fetch(url);
        const data = await res.json();
        if(!data.success)
            return setMessage(data.message);
        setMessage('');
        setUsers(data.users);
    };
    const nextPage = () => {
        setPage(page+1);
    };
    const prevPage = () => {
        if(page - 1 < 1)
            return;
        setPage(page-1);
    };
    useEffect(() => {
        fetchUsers();
    }, [, page]);
    return (
        <section
            className={'users-list-container'}
        >
            <div
                className={'page-info-container'}
            >
                <h1>Page: {page}</h1>
                <PageButtons
                    next={nextPage}
                    prev={prevPage}
                />
            </div>
            <div
                className={'list'}
            >
                {
                    users?.map((item, index) =>
                        <UserCard
                            {...item}
                            key={`${item.id}-${index}-user`}
                        />
                    )
                }
            </div>
        </section>
    );
};

export default UsersList;
