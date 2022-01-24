import React, {useMemo, useState} from "react";
import useDeviceList from "../hooks/useDeviceList";
import Constants from "../util/Constants";
import PropTypes from "prop-types";
import {Button, Table} from "react-bootstrap";
import CreateEditForm from "../pages/CreateEditForm";
import {execute} from "../services/deviceService";

const {COLUMNS, DELETE} = Constants;

const DevicesTable = (props) => {
    const {filterBy} = props;
    const {devicesList} = useDeviceList();
    const [entityDeleted, setEntityDeleted] = useState();
    const [entity, setEntity] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [sortConfig, setSortConfig] = useState(null);
    const [sortBy, setSortBy] = useState(undefined);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const data = useMemo(() => {
        let newData = devicesList;
        if (filterBy && filterBy !== "All") {
            newData = devicesList.filter(device => device.type === filterBy);
        }
        if(sortBy && sortConfig){
            newData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return Object.keys(newData).map(
            (key) => {
                if (entityDeleted !== newData[key]) {
                    return newData[key]
                }else{
                    return undefined;
                }
            }
        );
    }, [devicesList, filterBy, entityDeleted, sortBy, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        setSortBy(key);
    };


    const createHeader = () => {
        let header = [];
        COLUMNS.forEach(({text, sort}, index) => {
            header.push(<th key={text}><button
                type="button"
                onClick={() => requestSort(sort)}
                className={getClassNamesFor(sort)}
            >
                {text}
            </button></th>);
        })
        header.push(<th>{}</th>);
        return header;
    };

    const createBody = () => {
        let table = [];
        data.forEach((entity, index) => {
            let children = [];
            if (entity) {
                const {id, system_name, type, hdd_capacity} = entity;
                const key=`${id}${index}`;
                children.push(<td>{system_name}</td>);
                children.push(<td>{type}</td>);
                children.push(<td>{hdd_capacity}</td>);
                children.push(<td><Button variant="light"
                    onClick={e => onSelect(e, entity)}
                    >Edit </Button>&nbsp;&nbsp; <Button
                    variant="light"
                    onClick={e => onDelete(e, entity)}
                > Delete </Button></td>);

                table.push(<tr key={key}>{children}</tr>);
            }
        });
        return table;
    };

    const onSelect = (event, entity) => {
        setShowModal(true);
        setEntity(() => entity);
    };
    const onDelete = (event, entity) => {
        execute({data: entity, method: DELETE});
        setEntityDeleted(entity);
    };

    return (<>
            <Table key="table">
                <thead>
                <tr key="headers">
                    {createHeader()}
                </tr>
                </thead>
                <tbody key={"body"}>
                {createBody()}
                </tbody>
            </Table>
            <br/>
            {showModal ? <CreateEditForm entity={entity}/> : <></>}
        </>
    );
};

DevicesTable.propTypes = {
    filterBy: PropTypes.string,
}

DevicesTable.defaultProps = {
    filterBy: undefined,
}
export default DevicesTable;
