import { Types } from './types';

export const changePasswordVisibility = ({ current }: { current: Types} ) => {
    return current === Types.PASSWORD? Types.TEXT : Types.PASSWORD
}