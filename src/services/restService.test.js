import axios from 'axios';
import {send} from "./restService";

jest.mock('axios');

describe("RestService", () => {
    it("should return data from an API", async () => {
        const mockDevicesList = {
            data: [
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
            ]
        };
        const options = {
            method: "GET",
            url: "localhost/devices",
            data: {},
            params: {}
        }
        axios.request.mockImplementationOnce(() => Promise.resolve(mockDevicesList));

        const result = await send(options);

        expect(result).toEqual(mockDevicesList.data);

    });

    it("should reject an error when call is wrong", () => {
        const options = {
            method: "GET",
            url: "localhost/devices",
            data: {},
            params: {}
        }
        const error = new Error("some error");
        axios.request.mockImplementationOnce(() => Promise.reject(error));
        let response;
        try {
            response = send(options);
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });
});