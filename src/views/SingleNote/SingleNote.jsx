import { useSelector } from 'react-redux'
import './SingleNote.scss'
import { useParams } from 'react-router-dom'

function SingleNote() {
    const { id } = useParams();
    const notes = useSelector((state) => state.allNotes);
    let tempNote = notes.filter(note => note.note_id === id)[0];

    return (
        <>
            <section className='note-single-section px-4'>
                <div className='note-single-title'>
                    <h2 className='my-2 fs-20'>{tempNote.title}</h2>
                </div>

                <div className='py-4'>
                    <p>{tempNote.content}</p>
                </div>
            </section>
        </>
    )
}

export default SingleNote   