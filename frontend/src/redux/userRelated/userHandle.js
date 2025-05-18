import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const handleError = (dispatchFn, error) => {
    const message = error?.response?.data?.message || "Something went wrong.";
    dispatchFn(message);
};

// LOGIN
export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const res = await axios.post(`${BASE_URL}/${role}Login`, fields);
        if (res.data?.role) {
            dispatch(authSuccess(res.data));
        } else {
            dispatch(authFailed(res.data?.message || "Login failed"));
        }
    } catch (error) {
        handleError(dispatch, authError, error);
    }
};

// REGISTER
export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const res = await axios.post(`${BASE_URL}/${role}Reg`, fields);
        const data = res.data;

        if (data?.schoolName) {
            dispatch(authSuccess(data));
        } else if (data?.school) {
            dispatch(stuffAdded());
        } else {
            dispatch(authFailed(data?.message || "Registration failed"));
        }
    } catch (error) {
        handleError(dispatch, authError, error);
    }
};

// LOGOUT
export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

// GET USER DETAILS
export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const res = await axios.get(`${BASE_URL}/${address}/${id}`);
        dispatch(doneSuccess(res.data));
    } catch (error) {
        handleError(dispatch, getError, error);
    }
};

// DISABLED DELETE FUNCTION
export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    dispatch(getFailed("Sorry, the delete function has been disabled for now."));
};

// UPDATE USER
export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const res = await axios.put(`${BASE_URL}/${address}/${id}`, fields);
        const data = res.data;

        if (data?.schoolName) {
            dispatch(authSuccess(data));
        } else {
            dispatch(doneSuccess(data));
        }
    } catch (error) {
        handleError(dispatch, getError, error);
    }
};

// ADD STUFF (e.g., complain)
export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const res = await axios.post(`${BASE_URL}/${address}Create`, fields);
        const data = res.data;

        if (data?.message) {
            dispatch(authFailed(data.message));
        } else {
            dispatch(stuffAdded(data));
        }
    } catch (error) {
        handleError(dispatch, authError, error);
    }
};
