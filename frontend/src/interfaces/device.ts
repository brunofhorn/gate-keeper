import { IArea } from "./area";

export interface IDevice {
    id: string;
    name: string;
    description: string;
    ip: string;
    image: string;
    belongsArea: IArea;
}

export interface DeviceFormProps {
    addDevice: (device: IDevice) => void;
    updateDevice: (device: IDevice) => void;
    editDevice: IDevice | null;
    setEditDevice: (device: IDevice | null) => void;
}

export interface DeviceListProps {
    loadingDevices: boolean;
    devices: IDevice[];
    filteredDevices: IDevice[];
    setFilteredDevices: (devices: IDevice[]) => void;
    onEdit: (devices: IDevice) => void;
    onRemove: (devices: IDevice) => void;
    onDetail: (device: IDevice) => void;
}

export interface IDeviceDetail {
    id?: string;
    name?: string;
    description?: string;
    ip?: string;
    image?: string;
    belongsArea?: IArea;
}