import './Manager.scss';
import {Button, IconButton, TextField, Tooltip} from "@material-ui/core";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useState, Fragment, useEffect} from "react";
import {AddCircleRounded, DeleteRounded} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {useStore} from "../../redux/UseStore";
import {createProject, getUserData, inspectProject, projectSelected} from "../../redux/actions";
import {checkEmailAPI} from "../../redux/Api";
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';

export default function Manager() {
    const history = useHistory();
    const [state, dispatch] = useStore();
    const [emailArray, setEmailArray] = useState([0]);
    const [emailInfo, setEmailInfo] = useState({} as any);
    const formik = useFormik({
        initialValues: {
            name: '',
            shortName: ''
        },

        onSubmit: (values: any) => {
            dispatch(createProject({
                name: values.name,
                shortName: values.shortName,
                emails: Object.keys(values).reduce((prev: any, curr: any) => {
                    const email = curr.includes('addPerson') ? values[curr] : null;
                    if (email) {
                        prev.push(email);
                    }
                    return prev;
                }, [])
            }))
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required'),
            shortName: Yup.string()
                .required('Short name is required!')
                .max(10, 'Short name can be 10 characters long only!')
        })
    });

    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    const projectClicked = (project: any) => {
        history.push('/board/' + project.id);
        dispatch(projectSelected(project));
    };

    const deleteInputRow = (id: number) => {
        const emailArrayCopy = emailArray.slice();
        emailArrayCopy.splice(id, 1);
        setEmailArray(emailArrayCopy);
    }

    const checkEmail = (event: any) => {
        const val = event.target.value;
        const fieldName = event.target.name;
        if (!val) return;

        checkEmailAPI(val).then(res => {
            setEmailInfo({
                ...emailInfo,
                [fieldName]: res.data
            })
        });
    };

    const emailInputs = emailArray.map(id => (
        <div className="input-field" key={id}>
            <TextField name={"addPerson-" + id} label="Add Person by E-mail"
                       onChange={formik.handleChange}
                       fullWidth={true}
                       onBlur={checkEmail}
                       size="small" variant="outlined"/>
            { emailInfo['addPerson-' + id] &&
                <div className="email-valid-icon">
                    { emailInfo['addPerson-' + id] === 'NO_USER_FOUND'
                        ? <Tooltip title="No user with this e-mail address">
                            <ErrorIcon fontSize="small" color="error"/>
                        </Tooltip>
                        : <Tooltip title={'User: ' + emailInfo['addPerson-' + id]}>
                            <InfoIcon fontSize="small" color="action"/>
                        </Tooltip>
                    }
                </div>
            }
            {id === emailArray.length -1  &&
            <Fragment>
                <IconButton color="secondary"
                            onClick={() => deleteInputRow(id)} disabled={id === 0}>
                    <DeleteRounded />
                </IconButton>

                <IconButton color="primary"
                            onClick={() => setEmailArray([...emailArray, emailArray.length ])}>
                    <AddCircleRounded />
                </IconButton>
            </Fragment>}
        </div>
    ));

    const projects = state.kanban.ownedProjects.map(project => (
        <div className="project-row">
            <div className="project-card" key={project.id}
                 onClick={() => projectClicked(project)}>
                <div>{project.name}</div>
                <div className="proj-id">#{project.shortName.toUpperCase()}</div>
            </div>
            <div>
                <Button onClick={() => dispatch(inspectProject(project.id))}>Show Info</Button>
            </div>
        </div>
    ));

    const authToken = sessionStorage.getItem('authToken');
    if (state.kanban.app.loading) {
        return (
            <div className="manager">
                <h1 style={{marginTop: '1rem'}}>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="manager">
            <div className="your-projects">
                <h1>Select an existing project</h1>
                {projects.length !== 0
                    ? projects
                    : <div>You haven't created a project yet. Create one below, or ask for invitation to an existing one.</div>
                }
            </div>

            { state.kanban.inspectedProjectId &&
            <div style={{marginBottom: '2rem', width: '800px'}}>
                {/* @ts-ignore */}
                <project-details auth-token={authToken} project-id={state.kanban.inspectedProjectId}/>
            </div>}

            <h1>OR</h1>

            <div className="create-project">
                <h1>Create a new project</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="input-field">
                        <TextField name="name" label="Name"
                                   onChange={formik.handleChange}
                                   fullWidth={true}
                                   onBlur={formik.handleBlur}
                                   size="small" variant="outlined"/>
                    </div>
                    { formik.touched.name && formik.errors.name &&
                    <div className="validation-error">
                        {formik.errors.name}
                    </div>}

                    <div className="input-field">
                        <TextField name="shortName" label="Short Name"
                                   onChange={formik.handleChange}
                                   fullWidth={true}
                                   onBlur={formik.handleBlur}
                                   size="small" variant="outlined"/>
                    </div>
                    { formik.touched.shortName && formik.errors.shortName &&
                    <div className="validation-error">
                        {formik.errors.shortName}
                    </div>}

                    {emailInputs}

                    <div className="action-button">
                        <Button variant="contained"
                                className="green-button"
                                disabled={!formik.isValid}
                                type="submit">Create Project</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}