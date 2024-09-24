import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import { ButtonPrimary } from 'components/ButtonPrimary/ButtonPrimary';
import { useState } from 'react';
import { ValidatorService } from 'services/form-validators';
import { FieldError } from 'components/FieldError/FieldError';
import { useEffect, useRef } from 'react';
import s from './style.module.css';

const VALIDATORS = {
    title: (value) => {
        return ValidatorService.min(value, 3) || ValidatorService.max(value, 20);
    },
    content: (value) => {
        return ValidatorService.min(value, 3);
    },
};

export function NoteForm({
    title,
    note,
    onClickEdit,
    onClickTrash,
    onSubmit,
    isEditable=true
}) {
    const [formValues, setFormValues] = useState({
        title: note?.title || '',
        content: note?.content || ''
    });
    const [formErrors, setFormErrors] = useState({
        title: note?.title ? undefined : '',
        content: note?.content ? undefined : '',
    });
    function updateFormValues(e) {
        setFormValues({...formValues, [e.target.name]: e.target.value});
        validate(e.target.name, e.target.value);
    };
    function validate(fieldName, fieldValue) {
        setFormErrors({...formErrors, [fieldName]: VALIDATORS[fieldName](fieldValue)});
    }
    function hasError() {
        return Object.values(formErrors).some(error => error !== undefined);
    };
    const actionsIcons = (
        <>
            <div className='col-1'>
                {onClickEdit &&
                    <PencilFill
                        className={s.icon}
                        onClick={onClickEdit}
                    />
                }
            </div>
            <div className='col-1'>
                {onClickTrash &&
                    <TrashFill
                        className={s.icon}
                        onClick={onClickTrash}
                    />
                }  
            </div>
        </>
    );
    const titleInput = (
        <div className='mb-5'>
            <label className='form-label'>Title</label>
            <input
                type='text'
                name='title'
                className='form-control'
                onChange={updateFormValues}
                value={formValues.title}
            />
            <FieldError msg={formErrors.title} />
        </div>
    );
    const contentInput = (
        <div className='mb-5'>
            <label className='form-label'>Content</label>
            <textarea
                type='text'
                name='content'
                className='form-control'
                rows='5' 
                onChange={updateFormValues}
                value={formValues.content}
            />
            <FieldError msg={formErrors.content} />
        </div>
    );
    const submitButton = (
        <div className={s.submit_btn}>
            <ButtonPrimary
                isDisabled={hasError()}
                onClick={() => onSubmit(formValues)}
            >
                Submit
            </ButtonPrimary>
        </div>
    );
    const contentRef = useRef(null);
    // Scrollbar horizontal
    useEffect(() => {
        const content = contentRef.current;
        if (content) {
            const handleScroll = (e) => {
                if (e.deltaY !== 0) {
                    e.preventDefault();
                    content.scrollLeft += e.deltaY;
                };
            }
            content.addEventListener("wheel", (handleScroll));
            return () => {
                content.removeEventListener("wheel", (handleScroll));
            };
        };
    }, []);
    return (
        <form className={s.container}>
            <div className='row justify-content-space-between'>
                <div className='col-10'>
                    <h2 className='mb-3'>{title}</h2>
                </div>
                {actionsIcons}
            </div>
            <div className={`mb-3 ${s.title_input_container}`}>
                {isEditable && titleInput}
            </div>
            <div className='mb-3'>
                {isEditable ? contentInput : <pre ref={contentRef} className={s.content}>{note.content}</pre>}
            </div>
            {onSubmit && submitButton}
        </form>
    );
};