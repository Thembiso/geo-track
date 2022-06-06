import * as React from "react";
import MapView from "./mapView";
import { GetAll } from "../services/patrol_management_service";

export const Dashboard = () => {

    const [ids, setIds] = React.useState();

    const _onAllLiveSessions = (data) => {
        var ids = Object.keys(data).map((key) => key);
        setIds(ids);
    };

    React.useEffect(() => {
        if (!ids) {
            GetAll(_onAllLiveSessions);
        }
    },[]);

    return (
        <div>
            <MapView ids = {ids} single = {false} />
        </div>
    )
}