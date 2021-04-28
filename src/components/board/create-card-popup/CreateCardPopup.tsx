import './CreateCardPopup.scss';
import {Button, MenuItem, Select, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import * as Yup from 'yup';

type CreateCardPopupProps = {
    close: () => void
}
export default function CreateCardPopup({ close }: CreateCardPopupProps) {
    const formik = useFormik({
        initialValues: {
            title: '',
            desc: '',
            person: 'SELF'
        },

        onSubmit: (values) => {
            console.log(values);
        },

        validationSchema: Yup.object({
            title: Yup.string()
                .required('Title is required'),
            desc: Yup.string()
                .required('Description is required!')
        })
    });


    return (
        <div className="create-card-popup">
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

                <div className="input-field">
                    <Select variant="outlined" fullWidth={true} value={formik.values.person}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange} name="person">
                        <MenuItem value="SELF">Adam</MenuItem>
                    </Select>
                </div>

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