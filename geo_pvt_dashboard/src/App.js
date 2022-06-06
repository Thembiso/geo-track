import * as React from "react";

import { Admin, Resource, defaultTheme, Title} from 'react-admin';
//icons
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';

//screens
import { Dashboard } from "./screens/dashboard";
import { VehiclesTitle, VehiclesList, VehicleCreate, VehicleEdit, VehicleShow} from "./screens/vehicles"
import { RespondersTitle, RespondersList, ResponderCreate, ResponderEdit, ResponderShow} from "./screens/responders"
import CustomLayout from "./components/customLayout";
//providers
import { DataProvider, AuthProvider } from "./providers/firebaseprovider";

const theme = {
  ...defaultTheme,
  palette: {
      type: 'dark', // Switching the dark mode on is a single property value change.
  },
};

const App = () => {
  return (
    <Admin 
      dashboard={Dashboard}
      theme = {theme}
      layout = {CustomLayout}
      dataProvider={DataProvider} 
      authProvider={AuthProvider}>
        <Resource
          name = "vehicles"
          list = { VehiclesList }
          edit = { VehicleEdit }
          show = { VehicleShow }
          create = { VehicleCreate }
          icon = {DirectionsCarIcon}
        />
        <Resource
          name = "responders"
          list = { RespondersList }
          edit = { ResponderEdit }
          show = { ResponderShow }
          create = { ResponderCreate }
          icon = {PeopleIcon}
        />
    </Admin>
  )
};

export default App;