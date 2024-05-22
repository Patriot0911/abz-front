import { SERVER_URL } from "../../API";
import { IUser } from "../../interfaces";

const UserCard = (props: IUser) => {
    return (
        <div
            className={'user-container'}
        >
            <div
                className={'img-container'}
            >
                {
                    props.photo &&
                    <img
                        src={SERVER_URL + 'assets/' + props.photo}
                    />
                }
            </div>
            <div
                className={'user-content'}
            >
                <h2>{props.name}</h2>
                <p>Email: {props.email}</p>
                <p>Phone: {props.phone}</p>
                <p>Position: {props.position} [{props.position_id}]</p>
            </div>
        </div>
    );
};

export default UserCard;
