import { Dispatch } from "redux";
import axios from 'axios';
import * as actions from '../constants/BookingConstants';
import { IRoom } from "../../interfaces/IRoom";
import { IBooking, ICreateBooking } from "../../interfaces/IBooking";
import api from './Api'

export const checkRoomBooking = (id: IRoom['_id'], checkInDate: Date, checkOutDate: Date) => async (dispatch: Dispatch) => {

    try {
        dispatch({ type: actions.CHECK_ROOM_BOOKING_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/JSON",
            }
        }
        await api.post(`/api/bookings/check`, {id, checkInDate, checkOutDate}, config);

        dispatch({ type: actions.CHECK_ROOM_BOOKING_SUCCESS });

    } catch (error: any) {
        dispatch({ 
            type: actions.CHECK_ROOM_BOOKING_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}

export const createBooking = (bookingData: ICreateBooking) => async (dispatch: Dispatch, getState: any) => {

    try {
        dispatch({ type: actions.CREATE_BOOKING_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/JSON",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        await api.post(`/api/bookings`, bookingData, config);

        dispatch({ type: actions.CREATE_BOOKING_SUCCESS });

    } catch (error: any) {
        dispatch({ 
            type: actions.CREATE_BOOKING_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}

export const getBookedDates = (roomId:  IRoom['_id']) => async (dispatch: Dispatch) => {

    try {
        dispatch({ type: actions.GET_BOOKED_DATES_REQUEST });

        const { data } = await api.get(`/api/bookings/dates/${roomId}`);

        dispatch({ type: actions.GET_BOOKED_DATES_SUCCESS, payload: data });

    } catch (error: any) {
        dispatch({ 
            type: actions.GET_BOOKED_DATES_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}

export const getMyBookings = () => async (dispatch: Dispatch, getState: any) => {

    try {
        dispatch({ type: actions.GET_MY_BOOKINGS_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/JSON",
                "Authorization": `Bearer ${userInfo.token}`
            }
        };

        const { data } = await api.get(`/api/bookings/me`, config);

        dispatch({ type: actions.GET_MY_BOOKINGS_SUCCESS, payload: data });

    } catch (error: any) {
        dispatch({ 
            type: actions.GET_MY_BOOKINGS_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}

export const getAllBookings = (currentPage: number) => async (dispatch: Dispatch, getState: any) => {

    try {
        dispatch({ type: actions.FETCH_BOOKINGS_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/JSON",
                "Authorization": `Bearer ${userInfo.token}`
            }
        };

        const { data } = await api.get(`/api/bookings/?pageNumber=${currentPage}`, config);

        dispatch({ type: actions.FETCH_BOOKINGS_SUCCESS, payload: data });

    } catch (error: any) {
        dispatch({ 
            type: actions.FETCH_BOOKINGS_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}

export const deleteBooking = (bookingId: IBooking['_id']) => async (dispatch: Dispatch, getState: any) => {

    try {
        dispatch({ type: actions.DELETE_BOOKING_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        };

        await api.delete(`/api/bookings/${bookingId}`, config);

        dispatch({ type: actions.DELETE_BOOKING_SUCCESS });

    } catch (error: any) {
        dispatch({ 
            type: actions.DELETE_BOOKING_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message });
    }

}