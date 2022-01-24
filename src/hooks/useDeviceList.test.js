import * as deviceService from "../services/deviceService";
import useDeviceList from "./useDeviceList";
import {renderHook, act, cleanup} from "@testing-library/react-hooks";
import * as DeviceService from "../services/deviceService";

jest.mock("../services/deviceService");

describe("useDeviceList", () => {
    beforeEach(() => {
        jest.spyOn(deviceService, "execute").mockReturnValue({});
    });

    afterEach(() => {
        cleanup();
        jest.restoreAllMocks();
    });

    it("should return a list of devices", async () => {
        const executeSpy = jest.spyOn(DeviceService, 'execute');

        await act(async () => {
            renderHook(() => {
                useDeviceList();
            })
        })
        expect(executeSpy).toBeCalled();
    });

});
