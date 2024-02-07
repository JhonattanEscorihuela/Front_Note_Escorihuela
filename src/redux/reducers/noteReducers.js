import { CREATE_NOTE, EDIT_NOTE, DELETE_NOTE, ALL_NOTES, ARCHIVE_NOTE, UNARCHIVE_NOTE, ACTIVE_NOTE, UNACTIVE_NOTE } from "../actions/noteActions";

const initialState = {
    allNotes: [],
}

function noteReducer(state = initialState, { type, payload }) {

    console.log('estoy en el reducer', state.allNotes);

    switch (type) {
        case EDIT_NOTE:
            return {
                ...state,
                allNotes: state.allNotes.map(note => {
                    if (note.note_id === payload.note_id) {
                        return payload;
                    }
                    return note;
                })
            };
        case DELETE_NOTE:
            return { ...state, allNotes: state.allNotes.filter(note => note.note_id !== payload) };
        case CREATE_NOTE:
            return { ...state, allNotes: [...state.allNotes, payload] };
        case ALL_NOTES:
            return { ...state, allNotes: payload };
        case ARCHIVE_NOTE:
            return {
                ...state,
                allNotes: state.allNotes.map(note => {
                    if (note.note_id === payload) {
                        return { ...note, archived: true };
                    }
                    return note;
                })
            };
        case UNARCHIVE_NOTE:
            return {
                ...state,
                allNotes: state.allNotes.map(note => {
                    if (note.note_id === payload) {
                        return { ...note, archived: false };
                    }
                    return note;
                })
            };
        case ACTIVE_NOTE:
            return {
                ...state,
                allNotes: state.allNotes.map(note => {
                    if (note.note_id === payload) {
                        return { ...note, active: true };
                    }
                    return note;
                })
            };
        case UNACTIVE_NOTE:
            return {
                ...state,
                allNotes: state.allNotes.map(note => {
                    if (note.note_id === payload) {
                        return { ...note, active: false };
                    }
                    return note;
                })
            };
        default:
            return state;
    }


}


export default noteReducer;
