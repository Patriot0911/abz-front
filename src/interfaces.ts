export interface IUser {
    id:           number;
    name:         string;
    email:        string;
    phone:        string;
    photo?:       string;
    position_id:  number;
    position:     string;
};

export interface IPosition {
    id: number;
    name: string;
};
