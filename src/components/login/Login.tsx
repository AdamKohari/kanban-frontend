import './Login.scss';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Button, CircularProgress, TextField} from "@material-ui/core";
import {Link} from 'react-router-dom';

export default function Login () {
    // TODO Redux
    const loginLoading = false;

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        onSubmit: (values) => {
            console.log(values);
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .required('E-mail is required')
                .email('Invalid E-mail address'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password is too short (Min. 6 chars)')
        })
    });

    return (
        <div className="login">
            <h1>Login</h1>
            <div className="card-cont" style={{marginBottom: '1rem'}}>
                <div className="my-card">
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

                        {loginLoading
                            ?   <div className="loading-small">
                                <CircularProgress variant="indeterminate" size={30} />
                            </div>
                            :   <div className="action-button">
                                <Button variant="contained" color="primary"
                                        disabled={!formik.isValid}
                                        type="submit">Login</Button>
                            </div>}
                    </form>

                    <div className="not-registered">
                        <Link to="/register">Not a member yet? Register!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}