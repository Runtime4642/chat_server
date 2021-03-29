import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import { message } from 'antd';

import * as api from '../../lib/api';

const INITIALIZE = 'list/INITIALIZE';
const CHANGE_INPUT = 'list/CHANGE_INPUT';
const DATA = 'list/DATA';
const FULL_TABLE_LIST = 'list/FULL_TABLE_LIST';
const CLICK = 'list/CLICK';

const SAVEDATA = "calendar/SAVE_DATA";

export const getData = createAction(DATA, api.getCalendarData);

export const saveData = createAction(SAVEDATA, api.saveCalendarData);

const initialState = Map({
    searchFromDate: '',
    data:[]
});

export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const { name, value} = action.payload;
        //console.log("CHANGE_INPUT" + name + " " + value)
        return state.set(name, value);
    },
    [CLICK]: (state, action) => {
        const value = action.payload;
        return state.set('searchUserNo', value);
    },
    ...pender({
        type: DATA,
        onSuccess: (state, action) => {
          //  //console.log(action.payload);
            // const { data: tables } = action.payload.data;
            return state.set('data',  action.payload.data)
                       // .set('lastpage', parseInt(lastPage, 10));
        }
    })
}, initialState);