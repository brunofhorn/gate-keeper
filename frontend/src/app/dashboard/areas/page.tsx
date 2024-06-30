"use client";

import { IArea } from "@/interfaces/area";
import Modal from "@/layouts/components/Modal";
import { AreaDetail } from "@/layouts/components/area/AreaDetail";
import AreaForm from "@/layouts/components/area/AreaForm";
import AreaList from "@/layouts/components/area/AreaList";
import PageTitle from "@/layouts/partials/PageTitle";
import { Button, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Areas() {
    const [loadingAreas, setLoadingAreas] = useState<boolean>(true);
    const [areas, setAreas] = useState<IArea[]>([]);
    const [filteredAreas, setFilteredAreas] = useState<IArea[]>([]);
    const [editArea, setEditArea] = useState<IArea | null>(null);
    const [detailArea, setDetailArea] = useState<IArea | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [areaToRemove, setAreaToRemove] = useState<IArea | null>(null);

    useEffect(() => {
        setLoadingAreas(true);

        const fetchAreas = async () => {
            const data: IArea[] = await fetch('/api/area').then(res => res.json());

            setAreas(data);
            setFilteredAreas(data);
            setLoadingAreas(false);
        };

        fetchAreas();
    }, []);

    const addArea = (newArea: IArea) => {
        const updatedAreas = [...areas, newArea].sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        setAreas(updatedAreas);
        setFilteredAreas(updatedAreas);
    };

    const updateArea = (updatedArea: IArea) => {
        const updatedAreas = areas.map((area) =>
            area.id === updatedArea.id ? updatedArea : area
        ).sort((a, b) => a.name.localeCompare(b.name));

        setAreas(updatedAreas);
        setFilteredAreas(updatedAreas);
    };

    const handleEditArea = (area: IArea | null) => {
        setEditArea(area);
    };

    const handleDetailArea = (area: IArea | null) => {
        setDetailArea(area);
        setShowDetailModal(true);
    };

    const confirmRemoveArea = async () => {
        if (areaToRemove !== null) {
            try {
                const response = await fetch(`/api/area/${areaToRemove.id}`, {
                    method: 'DELETE',
                });

                setShowConfirmModal(false);

                if (response.ok) {
                    toast.success("A área foi removida com sucesso.");
                    setAreas(prevAreas => prevAreas.filter(area => area.id !== areaToRemove.id));
                    setFilteredAreas(prevAreas => prevAreas.filter(area => area.id !== areaToRemove.id));
                } else {
                    toast.error("Ocorreu um erro ao tentar remover a área.");
                }
            } catch (error) {
                toast.error("Ocorreu um erro ao tentar remover a área.");
                console.error('Erro ao remover área:', error);
            } finally {
                setAreaToRemove(null);
                setLoadingAreas(false);
            }
        }
    };

    const cancelRemoveArea = () => {
        setAreaToRemove(null);
        setShowConfirmModal(false);
    };

    const handleRemoveArea = (area: IArea) => {
        setAreaToRemove(area);
        setShowConfirmModal(true);
    };

    return (
        <>
            <PageTitle title="Áreas" />
            <div className="bg-black h-screen p-10 pb-44 overflow-y-auto">
                <AreaForm
                    addArea={addArea}
                    editArea={editArea}
                    setEditArea={setEditArea}
                    updateArea={updateArea}
                />
                <Spacer y={8} />
                <AreaList
                    loadingAreas={loadingAreas}
                    areas={areas}
                    filteredAreas={filteredAreas}
                    setFilteredAreas={setFilteredAreas}
                    onEdit={handleEditArea}
                    onRemove={handleRemoveArea}
                    onDetail={handleDetailArea}
                />
            </div>
            <Modal
                open={showConfirmModal}
                title="Confirmar Exclusão"
                message={<div className="text-center"><p>Tem certeza que deseja excluir a área <b>{areaToRemove?.name}</b>?</p><small>Esta ação não poderá ser desfeita.</small></div>}
                onCancel={cancelRemoveArea}
                buttons={[
                    <Button color="primary" onPress={confirmRemoveArea} key={"confirm_button"}>
                        Confirmar
                    </Button>,
                    <Button color="danger" variant="light" onClick={cancelRemoveArea} key={"cancel_button"}>
                        Cancelar
                    </Button>
                ]}
            />
            <Modal
                open={showDetailModal}
                title="Detalhes da Área"
                message={<AreaDetail {...detailArea} />}
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