import './Register.scss';
import {Button, CircularProgress, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import * as Yup from "yup";
import {ArrowBackRounded} from "@material-ui/icons";
import {useHistory} from "react-router-dom";

export default function Register() {
    const history = useHistory();
    // TODO Redux
    const registerLoading = false;

    const formik = useFormik({
        initialValues: {
            email: '',
            fullName: '',
            password: ''
        },

        onSubmit: (values) => {
            console.log(values);
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .required('E-mail is required')
                .email('Invalid E-mail address'),
            fullName: Yup.string()
                .required('Full Name is required')
                .matches(new RegExp('^[a-zAz]{2,} [a-zA-z]{2,}$'),
                    'Not a valid full name. Please give your first and last name only!'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password is too short (Min. 6 chars)')
        })
    });

    const backToLogin = () => {
        history.push('..');
    }

    return (
        <div className="register">
            <h1>Registration</h1>
            <div className="card-cont" style={{marginBottom: '1rem'}}>
                <div className="my-card">
                    <div className="back-btn" onClick={backToLogin}>
                        <ArrowBackRounded/>
                        <span>BACK TO LOGIN</span>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="input-field">
                            <TextField label="E-mail" variant='outlined'
                                       name="email"
                                       type="email"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       fullWidth={true}/>
                        </div>
                        { formik.touched.email && formik.errors.email &&
                        <div className="validation-error">
                            {formik.errors.email}
                        </div>}

                        <div className="input-field">
                            <TextField label="Full Name" variant='outlined'
                                       name="fullName"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       fullWidth={true}/>
                        </div>
                        { formik.touched.fullName && formik.errors.fullName &&
                        <div className="validation-error">
                            {formik.errors.fullName}
                        </div>}

                        <div className="input-field">
                            <TextField label="Password" type="password" variant='outlined'
                                       name="password"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       fullWidth={true}/>
                        </div>
                        { formik.touched.password && formik.errors.password &&
                        <div className="validation-error">
                            {formik.errors.password}
                        </div>}

                        {registerLoading
                            ?   <div className="loading-small">
                                <CircularProgress variant="indeterminate" size={30} />
                            </div>
                            :   <div className="action-button">
                                <Button variant="contained" color="primary"
                                        disabled={!formik.isValid}
                                        type="submit">Register</Button>
                            </div>}
                    </form>
                </div>
            </div>
        </div>
    );
}