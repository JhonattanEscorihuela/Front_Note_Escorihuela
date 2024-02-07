import { RiArchiveDrawerFill } from "react-icons/ri";
import { MdOutlineUnarchive } from "react-icons/md";
import { parseISO, formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { archiveNote, unarchiveNote } from '../../redux/actions/noteActions'

function ArchivedNotes() {
    const dispatch = useDispatch();
    const allNotes = useSelector(state => state.allNotes);
    const archivedNotes = allNotes.filter(note => note.archived);

    const handleArchiveNote = (id) => {
        dispatch(archiveNote(id));
        dispatch(allNotes());
    };

    const handleUnarchiveNote = (id) => {
        dispatch(unarchiveNote(id));
        dispatch(allNotes());
    };

    return (
        <div className='notes'>
            <h5 className='fs-18 fw-8 text-uppercase notes-title'>
                archived notes
            </h5>
            <div className='notes-list grid'>
                {archivedNotes.map(note => {
                    return (
                        <div className='notes-item' key={note.note_id}>
                            <div className='notes-item-title'>
                                {note.title.substring(0, 80) + '...'}
                            </div>
                            <div className='notes-item-body'>
                                {note.content.substring(0, 150) + '...'}
                            </div>
                            <div className='notes-item-date text-capitalize'>
                                {formatDistanceToNow(parseISO(note.createdAt))}
                            </div>
                            <div className='notes-item-btns flex align-center justify-between'>
                                <div>

                                    {note.archived ? (
                                        <button type='button' className='notes-item-btn' onClick={() => handleUnarchiveNote(note.note_id)}>
                                            <MdOutlineUnarchive />
                                        </button>
                                    ) : (
                                        <button type='button' className='notes-item-btn' onClick={() => handleArchiveNote(note.note_id)}>
                                            <RiArchiveDrawerFill />
                                        </button>
                                    )}

                                </div>
                                <Link to={`/note/${note.note_id}`} className='read-more-btn fs-14'>
                                    Read More
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ArchivedNotes;
