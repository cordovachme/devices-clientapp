import * as DeviceService from "../services/deviceService";
import {useEffect, useState} from "react";
import Constants from "../util/Constants";

const {GET} = Constants;

const useDeviceList = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        const getList = async () => {
            setData(await DeviceService.execute({method:GET}));
        };
        getList();
    }, []);
    return {
        devicesList: data,
    };
};

export default useDeviceList;
