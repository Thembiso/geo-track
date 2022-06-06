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

import MapView from "./mapView";

export const VehiclesTitle = () => {
    return <span>Manage Vehicles</span>;
};

const vehicleFilters = [
    <ReferenceInput source="id" label="id" reference="vehicles">
        <SelectInput optionText="id" />
    </ReferenceInput>,
    <ReferenceInput source="regno" label="regno" reference="vehicles">
        <SelectInput optionText="regno" />
    </ReferenceInput>,
];

export const VehiclesList = () => (
    <List filters = {vehicleFilters}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="regno"/>
            <TextField source="model"/>
            <TextField source="make"/>
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);

export const VehicleShow = () => (
    <Show>
        <VehicleView/>
    </Show>
);

const VehicleView = () => {
    const context = useRecordContext();
    const [id, setId] = React.useState();

    React.useEffect(() => {
        if (context && !id) {
            setId(context.id);
        }
    },[context]);

    return <div>
            <div>
                <MapView ids = {[id]} single = {true}/>
            </div>
        </div>
};


export const VehicleEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="regno" />
            <TextInput source="model" />
            <TextInput source="make" />
        </SimpleForm>
    </Edit>
)

export const VehicleCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="regno" />
            <TextInput source="model" />
            <TextInput source="make" />
        </SimpleForm>
    </Create>

);