import * as React from "react";
import { 
    List, 
    Datagrid, 
    TextField, 
    Create, 
    TextInput,
    SimpleForm,
    Show,
    Edit,
    ReferenceInput,
    SelectInput,
    useRecordContext,
    EditButton,
    ShowButton
} from 'react-admin';
import './styles/responders.css';

export const RespondersTitle = () => {
    return <span>Manage Responders</span>;
};

const userFilters = [
    <ReferenceInput source="id" label="id" reference="users">
        <SelectInput optionText="id" />
    </ReferenceInput>,
];

export const RespondersList = () => (
    <List filters = {userFilters}>
        <Datagrid rowClick="show">
            <TextField source="firstname" />
            <TextField source="lastname" />
            <TextField source="age"/>
            <TextField source="licenseno"/>
            <TextField source="id" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);

export const ResponderShow = () => (
    <Show>
        <ResponderView/>
    </Show>
);

const ResponderView = () => {
    const context = useRecordContext();
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [licenseno, setLicenceNo] = React.useState("");
    const [age, setAge] = React.useState("");
    const [profilepicture, setProfilePicture] = React.useState("");



    React.useEffect(() => {
        if(context){
          setFirstname(context.firstname);
          setLastname(context.lastname);
          setAge(context.age);
          setProfilePicture(context.profilepicture);
          setLicenceNo(context.licenseno);
        }
      },[context]);

    return ( 
        <div class="card_responder">
            <img src={profilepicture} alt="John" style={{width:"100%"}}/>
            <h1>{firstname} {lastname} ({age})</h1>
            <p class="title_responder">responder and responder</p>
            <p>Johannesburg</p>
            <p> LICENSE NO : {licenseno}</p>
            <p><button>Contact</button></p>
        </div>
    )
};


export const ResponderEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="firstname" />
            <TextInput source="lastname" />
            <TextInput source="age"/>
            <TextInput source="profilepicture"/>
            <TextInput source="licenseno"/>
        </SimpleForm>
    </Edit>
)

export const ResponderCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="firstname" />
            <TextInput source="lastname" />
            <TextInput source="age"/>
            <TextInput source="profilepicture"/>
            <TextInput source="licenseno"/>
        </SimpleForm>
    </Create>

);