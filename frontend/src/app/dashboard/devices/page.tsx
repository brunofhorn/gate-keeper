"use client";

import { IDevice } from "@/interfaces/device";
import Modal from "@/layouts/components/Modal";
import { DeviceDetail } from "@/layouts/components/device/DeviceDetail";
import DeviceForm from "@/layouts/components/device/DeviceForm";
import DeviceList from "@/layouts/components/device/DeviceList";
import PageTitle from "@/layouts/partials/PageTitle";
import { Button, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Devices() {
    const [loadingDevices, setLoadingDevices] = useState<boolean>(true);
    const [devices, setDevices] = useState<IDevice[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<IDevice[]>([]);
    const [editDevice, setEditDevice] = useState<IDevice | null>(null);
    const [detailDevice, setDetailDevice] = useState<IDevice | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [deviceToRemove, setDeviceToRemove] = useState<IDevice | null>(null);

    useEffect(() => {
        setLoadingDevices(true);

        const fetchDevices = async () => {
            const data: IDevice[] = await fetch('/api/device').then(res => res.json());

            setDevices(data);
            setFilteredDevices(data);
            setLoadingDevices(false);
        };

        fetchDevices();
    }, []);

    const addDevice = (newDevice: IDevice) => {
        const updatedDevices = [...devices, newDevice].sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        setDevices(updatedDevices);
        setFilteredDevices(updatedDevices);
    };

    const updateDevice = (updatedDevice: IDevice) => {
        const updatedDevices = devices.map((device) =>
            device.id === updatedDevice.id ? updatedDevice : device
        ).sort((a, b) => a.name.localeCompare(b.name));

        setDevices(updatedDevices);
        setFilteredDevices(updatedDevices);
    };

    const handleEditDevice = (device: IDevice | null) => {
        setEditDevice(device);
    };

    const handleDetailDevice = (device: IDevice | null) => {
        setDetailDevice(device);
        setShowDetailModal(true);
    };

    const confirmRemoveDevice = async () => {
        if (deviceToRemove !== null) {
            try {
                const response = await fetch(`/api/device/${deviceToRemove.id}`, {
                    method: 'DELETE',
                });

                setShowConfirmModal(false);

                if (response.ok) {
                    toast.success("O dispositivo foi removido com sucesso.");
                    setDevices(prevDevices => prevDevices.filter(device => device.id !== deviceToRemove.id));
                    setFilteredDevices(prevDevices => prevDevices.filter(device => device.id !== deviceToRemove.id));
                } else {
                    toast.error("Ocorreu um erro ao tentar remover o dispositivo.");
                }
            } catch (error) {
                toast.error("Ocorreu um erro ao tentar remover o dispositivo.");
                console.error('Erro ao remover o dispositivo:', error);
            } finally {
                setDeviceToRemove(null);
                setLoadingDevices(false);
            }
        }
    };

    const cancelRemoveDevice = () => {
        setDeviceToRemove(null);
        setShowConfirmModal(false);
    };

    const handleRemoveDevice = (device: IDevice) => {
        setDeviceToRemove(device);
        setShowConfirmModal(true);
    };

    return (
        <>
            <PageTitle title="Dispositivos" />
            <div className="bg-black h-screen p-10 pb-44 overflow-y-auto">
                <DeviceForm
                    addDevice={addDevice}
                    editDevice={editDevice}
                    setEditDevice={setEditDevice}
                    updateDevice={updateDevice}
                />
                <Spacer y={8} />
                <DeviceList
                    devices={devices}
                    loadingDevices={loadingDevices}
                    filteredDevices={filteredDevices}
                    setFilteredDevices={setFilteredDevices}
                    onDetail={handleDetailDevice}
                    onEdit={handleEditDevice}
                    onRemove={handleRemoveDevice}
                />
            </div>
            <Modal
                open={showConfirmModal}
                title="Confirmar Exclusão"
                message={<div className="text-center"><p>Tem certeza que deseja excluir o dispositivo <b>{deviceToRemove?.name} - IP: {deviceToRemove?.ip}</b>?</p><small>Esta ação não poderá ser desfeita.</small></div>}
                onCancel={cancelRemoveDevice}
                buttons={[
                    <Button color="primary" onPress={confirmRemoveDevice} key={"confirm_button"}>
                        Confirmar
                    </Button>,
                    <Button color="danger" variant="light" onClick={cancelRemoveDevice} key={"cancel_button"}>
                        Cancelar
                    </Button>
                ]}
            />
            <Modal
                open={showDetailModal}
                title="Detalhes do Dispositivo"
                message={<DeviceDetail {...detailDevice} />}
                size="3xl"
                onCancel={() => setShowDetailModal(false)}
                buttons={[
                    <Button color="danger" variant="light" onClick={() => setShowDetailModal(false)} key={2}>
                        Fechar
                    </Button>
                ]}
            />
        </>
    );
}