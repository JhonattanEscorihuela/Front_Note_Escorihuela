import api from "../services/api";

export const CREATE_NOTE = 'CREATE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const ALL_NOTES = 'ALL_NOTES';
export const ARCHIVE_NOTE = 'ARCHIVE_NOTE';
export const UNARCHIVE_NOTE = 'UNARCHIVE_NOTE';
export const ACTIVE_NOTE = 'ACTIVE_NOTE';
export const UNACTIVE_NOTE = 'UNACTIVE_NOTE';

export function createNote(noteData) {
    return async function (dispatch) {

        const response = await api.post('/notes/create', noteData);

        dispatch({
            type: CREATE_NOTE,
            payload: response.data.message,
        });

        return response;
    }
}

export function editNote(noteData) {
    return async function (dispatch) {


        const { title, content, active, archived, category } = noteData;

        const response = await api.put(`/notes/edit/${noteData.note_id}`, { title, content, active, archived, category });

        dispatch({
            type: EDIT_NOTE,
            payload: response.data.message,
        });

        return response;
    }
}

export function deleteNote(id) {
    return async function (dispatch) {

        await api.delete(`/notes/delete/${id}`);

        dispatch({
            type: DELETE_NOTE,
            payload: id,
        });


    }
}

export function allNotes() {
    return async function (dispatch) {

        const response = await api.get(`/notes/all`);

        dispatch({
            type: ALL_NOTES,
            payload: response.data.message,
        });

    }
}

export function archiveNote(id) {
    return async function (dispatch) {
        await api.put(`/notes/archive/${id}`);
        dispatch({
            type: ARCHIVE_NOTE,
            payload: id,
        });
    }
}

export function unarchiveNote(id) {
    return async function (dispatch) {
        await api.put(`/notes/unarchive/${id}`);
        dispatch({
            type: UNARCHIVE_NOTE,
            payload: id,
        });
    }
}

export function activeNote(id) {
    return async function (dispatch) {
        await api.put(`notes/active/${id}`);
        dispatch({
            type: ACTIVE_NOTE,
            payload: id
        })
    }
}

export function unActiveNote(id) {
    return async function (dispatch) {
        await api.put(`notes/unactive/${id}`);
        dispatch({
            type: UNACTIVE_NOTE,
            payload: id
        })
    }
}


