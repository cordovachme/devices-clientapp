import React from "react";
import DevicesTable from "./DevicesTable";
import {cleanup, render, screen, fireEvent} from '@testing-library/react';
import useDeviceList from "../hooks/useDeviceList";
import * as deviceService from "../services/deviceService";

jest.mock("../services/deviceService");
jest.mock("../hooks/useDeviceList");
jest.mock("../pages/CreateEditForm", () => () => <>{"create new form"}</>);

describe("DevicesTable", () => {
    const mockDevicesList = [
        {
            id: "e8okoP2l5",
            system_name: "DESKTOP-SMART",
            type: "WINDOWS_WORKSTATION",
            hdd_capacity: "10"
        },
        {
            id: "Th3ngERn9",
            system_name: "MAC-LEADER",
            type: "MAC",
            hdd_capacity: "2048"
        },
        {
            id: "e7ocoQ2n3",
            system_name: "ANGEL-PC",
            type: "WINDOWS_WORKSTATION",
            hdd_capacity: "500"
        },
        {
            id: "e7ocoQ2n4",
            system_name: "MIGUEL-PC",
            type: "WINDOWS_SERVER",
            hdd_capacity: "550"
        }
    ];
    const buildExpectedElement=(name)=>{
        const element = `<table><tr id="row1"><td>${name}</td></tr></tr></table>`;
        let document = new DOMParser().parseFromString(element, 'text/html');
        return document.getElementById("row1").children[0];
    };
    let spyExecute;

    beforeEach(() => {
        useDeviceList.mockImplementation(() => ({devicesList: mockDevicesList}));
        spyExecute= jest.spyOn(deviceService, "execute").mockReturnValue({});
    });

    afterEach(() => {
        cleanup();
        jest.restoreAllMocks();
    });

    it("should display an initial table", () => {
        render(<DevicesTable/>);

        expect(screen.getAllByRole("table").length).toBe(1);
        expect(screen.getAllByRole("row").length).toBe(5);
    });

    it.each`
    header               
    ${"System name"}       
    ${"Type"} 
    ${"HDD Capacity"} 
  `("should render expected header", ({header}) => {
        render(<DevicesTable/>);

        const expected = screen.getByRole("columnheader", {name: header});

        expect(expected).toBeInTheDocument();
    });

    it.each`
    button               
    ${"Edit"}       
    ${"Delete"} 
  `("should render expected buttons", ({button}) => {
        render(<DevicesTable/>);

        const expected = screen.getAllByRole("button", {name: button});

        expect(expected.length).toEqual(4);
    });

    it("should display proper data when filter is WINDOWS_WORKSTATION", () => {
        render(<DevicesTable filterBy="WINDOWS_WORKSTATION"/>);

        expect(screen.getAllByRole("row").length).toBe(3);
    });

    it("should display proper data when filter is WINDOWS_SERVER", () => {
        render(<DevicesTable filterBy="WINDOWS_SERVER"/>);

        expect(screen.getAllByRole("row").length).toBe(2);
    });

    it("should display proper data when filter is MAC", () => {
        render(<DevicesTable filterBy="MAC"/>);

        expect(screen.getAllByRole("row").length).toBe(2);
    });

    it("should display modal when click on Edit button", () => {
        render(<DevicesTable filterBy="MAC"/>);

        const editButton = screen.getByRole("button", {name: "Edit"});
        fireEvent.click(editButton);

        expect(screen.getByText("create new form")).toBeInTheDocument();
    });

    it("should delete a device when click on Delete button", () => {
        render(<DevicesTable/>);

        const deleteButton = screen.getAllByRole("button", {name: "Delete"});

        fireEvent.click(deleteButton[0]);

        expect(screen.getAllByRole("row").length).toBe(4);
        expect(spyExecute).toBeCalled();
    });

    it("should sort name column when click on header button", () => {
        render(<DevicesTable/>);

        const systemNameHeader = screen.getByRole("button", {name: "System name"});
        const initialRows = [
            "DESKTOP-SMART",
            "MAC-LEADER",
            "ANGEL-PC",
            "MIGUEL-PC"
        ];
        fireEvent.click(systemNameHeader);

        const rows = screen.getAllByRole("row");

        expect(rows[1].children[0]).toEqual(buildExpectedElement(initialRows[2]));
        expect(rows[2].children[0]).toEqual(buildExpectedElement(initialRows[0]));
        expect(rows[3].children[0]).toEqual(buildExpectedElement(initialRows[1]));
        expect(rows[4].children[0]).toEqual(buildExpectedElement(initialRows[3]));

    });
});