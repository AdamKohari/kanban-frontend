import './CreateCardPopup.scss';
import {Button, MenuItem, Select, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useStore} from "../../../redux/UseStore";
import {Person} from "../../../redux/reducers";
import {createCard} from "../../../redux/actions";

type CreateCardPopupProps = {
    close: () => void
}
export default function CreateCardPopup({ close }: CreateCardPopupProps) {
    const getTimeStamp = () => {
        const date = new Date();
        const dateAndTime = date.toISOString().split('.')[0].split('T');
        return dateAndTime[0] + '-' + dateAndTime[1];
    };
    const [state, dispatch] = useStore();
    const formik = useFormik({
        initialValues: {
            title: '',
            desc: '',
            user: ''
        },

        onSubmit: (values) => {
            dispatch(createCard({
                ...values,
                id: state.kanban.currentBoardShortName + '-' + getTimeStamp()
            }, state.kanban.currentBoardId, state.kanban.currentBoard.addedPeople));
        },

        validationSchema: Yup.object({
            title: Yup.string()
                .required('Title is required'),
            desc: Yup.string()
                .required('Description is required'),
            user: Yup.string()
                .required('You have to assign this card to someone!')
        })
    });


    return (
        <div className="create-card-popup popup">
            <div className="header">
                <h2>Create a new task</h2>
                <div onClick={close}>🗙</div>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="input-field">
                    <TextField name="title" label="Title"
                               onChange={formik.handleChange}
                               fullWidth={true}
                               onBlur={formik.handleBlur}
                               size="small" variant="outlined"/>
                </div>
                { formik.touched.title && formik.errors.title &&
                <div className="validation-error">
                    {formik.errors.title}
                </div>}

                <div className="input-field">
                    <TextField name="desc" label="Description"
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               fullWidth={true} multiline={true}
                               rows={12} variant="outlined"/>
                </div>
                { formik.touched.desc && formik.errors.desc &&
                <div className="validation-error">
                    {formik.errors.desc}
                </div>}

                <div>Assigned to:</div>
                <div className="input-field">
                    <Select variant="outlined" fullWidth={true} value={formik.values.user}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange} name="user">
                        {state.kanban.currentBoard.addedPeople.map((person: Person) => (
                            <MenuItem key={person.email} value={person.fullName}>{person.fullName} ({person.email})</MenuItem>
                        ))}
                    </Select>
                </div>
                { formik.touched.user && formik.errors.user &&
                <div className="validation-error">
                    {formik.errors.user}
                </div>}

                <div className="action-button">
                    <Button variant="contained"
                            className="green-button"
                            disabled={!formik.isValid}
                            type="submit">Create Card</Button>
                </div>
            </form>
        </div>
    );
}