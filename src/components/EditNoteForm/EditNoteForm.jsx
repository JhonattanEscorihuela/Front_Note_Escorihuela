import './Notes.scss'
import { useState } from 'react';
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { allNotes, editNote } from '../../redux/actions/noteActions';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';



function EditNoteForm() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.allNotes);
    let tempNote = notes.filter(note => note.note_id === id);
    const [formData, setFormData] = useState(tempNote[0]);


    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [canSave, setCanSave] = useState(true);


    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === 'title') {
            (value.length === 0) ? setTitleError(true) : setTitleError(false), setCanSave(true)

        }
        if (name === 'content') {
            (value.length === 0) ? setContentError(true) : setContentError(false), setCanSave(true)
        }


        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }



    const onSaveNoteClicked = async () => {
        try {
            if (!titleError && !contentError) {
                const response = await dispatch(editNote(formData));
                await dispatch(allNotes());
                toast(response.data.message);
                setFormData({
                    title: '',
                    content: '',
                    active: 'true',
                    archived: 'false',
                    category: 'estudio'
                });
            }

        } catch (error) {
            toast(error.response.data.error);
        }

    }


    return (
        <>
            <section className="note-form-section">
                <h2 className="my-4 fs-16">
                    Add New Note
                </h2>
                <form className="note-form" >
                    <div className="form=element">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input required autoComplete="off" type="text" id="title" name="title" placeholder="Note title here..." onChange={handleChange} className="form-control" value={formData.title} />
                        <span className='form-error-text'>{titleError ? "Title can't be empty!" : ""}</span>
                    </div>

                    <div className='form-element'>
                        <label htmlFor='content' className='form-label'>Content:</label>
                        <textarea id="content" name="content" placeholder='Note content here ...' onChange={handleChange} className="form-control" rows="5" value={formData.content}></textarea>
                        <span className='form-error-text'>{contentError ? "Content can't be empty!" : ""}</span>
                    </div>

                    <div className="form-element">
                        <label htmlFor="category" className="form-label">Category:</label>
                        <div className="select-wrapper">
                            <select id="category" name="category" onChange={handleChange} value={formData.category}>
                                <option value="trabajo">Trabajo</option>
                                <option value="personal">Personal</option>
                                <option value="estudio">Estudio</option>
                                <option value="otros">Otros</option>
                            </select>
                        </div>
                    </div>


                    <button type="button" onClick={(onSaveNoteClicked)} className="btn btn-default" disabled={!canSave}>Save Note</button>
                    <ToastContainer />
                </form>
            </section>
        </>
    )

}

export default EditNoteForm;