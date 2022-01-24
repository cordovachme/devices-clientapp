import React, { useState } from "react";
import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import Constants from "../util/Constants";
import {execute} from "../services/deviceService";

const {DEVICE_TYPE} = Constants;
const {POST, PUT} = Constants;


const CreateEditForm = (props) => {
    const [show, setShow] = useState(true);
    const [validated, setValidated] = useState(false);
    const {entity} = props;
    let entityData;

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        entityData = {
            system_name: form.elements['system_name'].value,
            type: form.elements['type'].value,
            hdd_capacity: form.elements['hdd_capacity'].value
        };
        if (!entity?.id) {
            execute({data: entityData, method: POST});
        }else{
            const data = {...entityData, id: entity.id};
            execute({data,  method: PUT});
        }
    };

    const drawOptions = (data) => {
        let options = [];
        data.forEach((option) => {
            options.push(<option key={option.value} value={option.value}>{option.text}</option>);
        })
        return options;
    };


    const handleClose = () => setShow(false);

    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>System name *</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter system name"
                        required
                        id="system_name"
                        defaultValue={entity?.system_name}
                        onKeyPress={(event) => {
                            if (event.target.value.length > 40) {
                                event.preventDefault();
                            }
                        }}
                    />
                    <Form.Control.Feedback
                        type="invalid">
                        {"System name is required"}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Type *</Form.Label>
                    <Form.Control
                        as="select"
                        id="type"
                        defaultValue={entity?.type}
                    >
                        {drawOptions(DEVICE_TYPE)}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>HDD Capacity (GB) *</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter an HDD Capacity"
                        id="hdd_capacity"
                        defaultValue={entity?.hdd_capacity}
                        required
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}/>
                    <Form.Control.Feedback type="invalid">
                        {"HDD Capacity is required"}
                    </Form.Control.Feedback>
                </Form.Group>
                <div align={"right"}>
                <Button variant="primary" type="submit">
                    Save
                </Button> &nbsp;&nbsp;
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </div>

            </Form>
        </Modal.Body>
    </Modal>

}

CreateEditForm.propTypes = {
    entity:   PropTypes.shape({
        id: PropTypes.string,
        system_name: PropTypes.string,
        type: PropTypes.string,
        hdd_capacity: PropTypes.string,
    }),
}
CreateEditForm.defaultProps = {
    entity: {},
}

export default CreateEditForm;