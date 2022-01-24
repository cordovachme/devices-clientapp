import CreateEditForm from "./CreateEditForm";
import {cleanup, render, screen, fireEvent} from '@testing-library/react';
import React from "react";
import * as deviceService from "../services/deviceService";

jest.mock("../services/deviceService");

describe("CreateEditForm", () => {

    afterEach(() => {
        cleanup();
        jest.restoreAllMocks();
    });

    it("should display an empty form", () => {
        render(<CreateEditForm/>);

        expect(screen.getByText(/add device/i)).toBeInTheDocument();
        expect(screen.getAllByText(/system name/i).length).toBeGreaterThan(1);
        expect(screen.getByText(/type/i)).toBeInTheDocument();
        expect(screen.getAllByText(/hdd capacity/i).length).toBeGreaterThan(1);
    });

    it("should display error when click on Save without data", () => {
        render(<CreateEditForm/>);

        const saveButton = screen.getByRole("button", {name: "Save"});
        fireEvent.click(saveButton);
        expect(screen.getByText(/system name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/hdd capacity is required/i)).toBeInTheDocument();
        expect(screen.getByText(/type/i)).toBeInTheDocument();
    });

    it("should call save method when click on save button", () => {
        const spyExecute = jest.spyOn(deviceService, "execute").mockReturnValue({})
        const newDummyEntity = {
            system_name: "New System Name",
            type: "WINDOWS_WORKSTATION",
            hdd_capacity: "390"
        }

        render(<CreateEditForm/>);

        const textBoxes = screen.getAllByRole("textbox");
        fireEvent.change(textBoxes[0], {
            target: {value: newDummyEntity.system_name},
        });
        fireEvent.change(textBoxes[1], {
            target: {value: newDummyEntity.hdd_capacity},
        });
        const saveButton = screen.getByRole("button", {name: "Save"});
        fireEvent.click(saveButton);

        expect(spyExecute).toBeCalledWith({data: newDummyEntity, method: "POST"});
    });


    it("should display data when entity is passed", () => {
        const dummyEntity = {
            id: "e8okoP2l5",
            system_name: "DESKTOP-SMART",
            type: "WINDOWS_WORKSTATION",
            hdd_capacity: "10"
        }

        render(<CreateEditForm entity={dummyEntity}/>);

        const textBoxes = screen.getAllByRole("textbox");
        const options = screen.getAllByRole("option");

        expect(textBoxes[0]).toHaveAttribute("value", dummyEntity.system_name);
        expect(textBoxes[1]).toHaveAttribute("value", dummyEntity.hdd_capacity);
        expect(options[0]).toHaveAttribute("value", dummyEntity.type);
    });

    it("should call edit method when click on save button", () => {
        const spyExecute = jest.spyOn(deviceService, "execute").mockReturnValue({})
        const dummyEntity = {
            id: "e8okoP2l5",
            system_name: "DESKTOP-SMART",
            type: "WINDOWS_WORKSTATION",
            hdd_capacity: "10"
        }

        render(<CreateEditForm entity={dummyEntity}/>);

        const saveButton = screen.getByRole("button", {name: "Save"});
        fireEvent.click(saveButton);

        expect(spyExecute).toBeCalledWith({data: dummyEntity, method: "PUT"});

    });

});