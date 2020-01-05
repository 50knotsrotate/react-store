import { UPDATE_USERNAME } from '../constants/action-types';

export function updateUsername(payload) { 
    return {type: UPDATE_USERNAME, payload}
}