import { useEffect, useState } from 'react';
import './NotesList.scss';
import { ImCancelCircle } from 'react-icons/im';
import { FiEdit } from 'react-icons/fi';
import { RiArchiveDrawerFill } from "react-icons/ri";
import { MdOutlineUnarchive } from "react-icons/md";
import { PiRadioactiveFill } from "react-icons/pi";
import { PiRadioactive } from "react-icons/pi";
import { parseISO, formatDistanceToNow } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allNotes, archiveNote, deleteNote, unarchiveNote, activeNote, unActiveNote } from '../../redux/actions/noteActions';

function NotesList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.allNotes);
    const [filter, setFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);

    useEffect(() => {
        dispatch(allNotes());
    }, [dispatch]);

    const handleDeleteNote = (id) => {
        dispatch(deleteNote(id));
        dispatch(allNotes());
        navigate('/home')
    };

    const handleArchiveNote = (id) => {
        dispatch(archiveNote(id));
        dispatch(allNotes());
    };

    const handleUnarchiveNote = (id) => {
        dispatch(unarchiveNote(id));
        dispatch(allNotes());
    };

    const handleActiveNote = (id) => {
        dispatch(activeNote(id));
        dispatch(allNotes());
    }

    const handleUnActiveNote = (id) => {
        dispatch(unActiveNote(id));
        dispatch(allNotes());
    }

    const filteredNotes = () => {
        let filtered = notes;
        if (filter === 'active') {
            filtered = filtered.filter(note => note.active);
        }
        if (categoryFilter) {
            filtered = filtered.filter(note => note.category === categoryFilter);
        }

        return filtered;
    };

    const handleCategoryFilterChange = (category) => {
        if (category === categoryFilter) {
            setCategoryFilter(null);
        } else {
            setCategoryFilter(category);
        }
    };

    return (
        <div className='notes'>
            <h5 className='fs-18 fw-8 text-uppercase notes-title'>
                notes
            </h5>
            <div className='filter-buttons'>
                <button
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    Todas
                </button>
                <button
                    className={filter === 'active' ? 'active' : ''}
                    onClick={() => setFilter('active')}
                >
                    <PiRadioactiveFill /> Activas
                </button>
                {/* Botón para filtrar por categoría */}
                <div className="category-menu">
                    <button className="category-menu-toggle" onClick={() => setShowCategoryMenu(!showCategoryMenu)}>
                        Categoría
                    </button>
                    {showCategoryMenu && (
                        <div className="category-menu-content">
                            <button className={categoryFilter === 'trabajo' ? 'active' : ''} onClick={() => handleCategoryFilterChange('trabajo')}>
                                Trabajo
                            </button>
                            <button className={categoryFilter === 'personal' ? 'active' : ''} onClick={() => handleCategoryFilterChange('personal')}>
                                Personal
                            </button>
                            <button className={categoryFilter === 'estudio' ? 'active' : ''} onClick={() => handleCategoryFilterChange('estudio')}>
                                Estudio
                            </button>
                            <button className={categoryFilter === 'otros' ? 'active' : ''} onClick={() => handleCategoryFilterChange('otros')}>
                                Otros
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className='notes-list grid'>
                {filteredNotes().map(note => {
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
                                    <button type='button' className='notes-item-btn' onClick={() => handleDeleteNote(note.note_id)}>
                                        <ImCancelCircle />
                                    </button>

                                    <Link to={`/edit/${note.note_id}`} className='notes-item-btn' >
                                        <FiEdit />
                                    </Link>
                                    {note.archived ? (
                                        <button type='button' className='notes-item-btn' onClick={() => handleUnarchiveNote(note.note_id)}>
                                            <MdOutlineUnarchive />
                                        </button>
                                    ) : (
                                        <button type='button' className='notes-item-btn' onClick={() => handleArchiveNote(note.note_id)}>
                                            <RiArchiveDrawerFill />
                                        </button>
                                    )}
                                    {note.active ? (
                                        <button type='button' className='notes-item-btn' onClick={() => handleUnActiveNote(note.note_id)}>
                                            <PiRadioactiveFill />
                                        </button>
                                    ) : (
                                        <button type='button' className='notes-item-btn' onClick={() => handleActiveNote(note.note_id)}>
                                            <PiRadioactive />
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
    )
}

export default NotesList;