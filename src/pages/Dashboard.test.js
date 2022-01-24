import Dashboard from "./Dashboard";
import {render, screen, fireEvent} from '@testing-library/react';

jest.mock("./CreateEditForm", () => () => <>{"create new form"}</>);
jest.mock("../components/DevicesTable", () => () => <>{"any table data"}</>);

describe("Dashboard", () => {

    it("should display all objects when loading", () => {
        render(<Dashboard/>)

        expect(screen.getByText(/devices management/i)).toBeInTheDocument();
        expect(screen.getByText(/filters/i)).toBeInTheDocument();
        expect(screen.getByText(/device type/i)).toBeInTheDocument();
        expect(screen.getByText(/for sorting select each header/i)).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "New"})).toBeInTheDocument();
        expect(screen.getAllByRole("option").length).toEqual(4);
    });

    it("should display options for filtering when loading", () => {
        render(<Dashboard/>)

        const dropdown = screen.getByRole("combobox");
        fireEvent.click(dropdown);

        expect(screen.getByText(/windows server/i)).toBeInTheDocument();
        expect(screen.getByText(/windows workstation/i)).toBeInTheDocument();
        expect(screen.getByText(/mac/i)).toBeInTheDocument();

    });

    it("should display modal to add a device when clicking on new button", () => {
        render(<Dashboard/>)

        const newButton = screen.getByRole("button", {name: "New"});
        fireEvent.click(newButton);

        expect(screen.getByText(/create new form/i)).toBeInTheDocument();

    });
})
;