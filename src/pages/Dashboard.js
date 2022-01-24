import DevicesTable from "../components/DevicesTable";
import React, {useState} from "react";
import Constants from "../util/Constants";
import  {Form, Button, Stack} from "react-bootstrap";
import CreateEditForm from "./CreateEditForm";

const {DEVICE_TYPE, LABELS} = Constants;

const Dashboard = () => {
    const [filterBy, setFilterBy] = useState(undefined);
    const [showNew, setShowNew] = useState(false);

    const handleFilter = (event) => {
        setFilterBy(event.target.value);
    };

    const drawOptions = (data) => {
        let options = [];
        data.forEach((option) => {
            options.push(<option key={option.value} value={option.value}>{option.text}</option>);
        })
        return options;
    };

    const handleNew = () => {
        setShowNew(true);
    }


    return (<>
            <br/><br/><div align={"center"}><h4>DEVICES MANAGEMENT</h4></div>
            <br/>
            <h5>Filters:</h5> <br/>
            <Stack direction="horizontal" gap={4}>
                <Form.Label>{LABELS.filter_device} </Form.Label>
                <Form.Control as="select" onChange={handleFilter} className={"customSelect"}>
                    <option>All</option>
                    {drawOptions(DEVICE_TYPE)}
                </Form.Control>
            </Stack>
            <hr/><br/>
            <Form.Label>{"For sorting select each header"}</Form.Label>
            <p align={"right"}>
                <Button variant="outline-primary"
                        onClick={handleNew}>
                    New
                </Button>
            </p>
            <p>
                {showNew ? <CreateEditForm/> : <></>}
            </p>
            <DevicesTable
                filterBy={filterBy}
            />
        </>
    )
};

export default Dashboard;