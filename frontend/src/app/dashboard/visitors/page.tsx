"use client";

import { IVisitor } from "@/interfaces/visitor";
import Modal from "@/layouts/components/Modal";
import { VisitorDetail } from "@/layouts/components/visitor/VisitorDetail";
import VisitorForm from "@/layouts/components/visitor/VisitorForm";
import VisitorList from "@/layouts/components/visitor/VisitorList";
import PageTitle from "@/layouts/partials/PageTitle";
import { Button, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Visitors() {
    const [loadingVisitors, setLoadingVisitors] = useState<boolean>(true);
    const [visitors, setVisitors] = useState<IVisitor[]>([]);
    const [filteredVisitors, setFilteredVisitors] = useState<IVisitor[]>([]);
    const [editVisitor, setEditVisitor] = useState<IVisitor | null>(null);
    const [detailVisitor, setDetailVisitor] = useState<IVisitor | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [visitorToRemove, setVisitorToRemove] = useState<IVisitor | null>(null);

    useEffect(() => {
        setLoadingVisitors(true);

        const fetchVisitors = async () => {
            const data: IVisitor[] = await fetch('/api/visitor').then(res => res.json());

            setVisitors(data);
            setFilteredVisitors(data);
            setLoadingVisitors(false);
        };

        fetchVisitors();
    }, []);

    const addVisitor = (newVisitor: IVisitor) => {
        const updatedVisitors = [...visitors, newVisitor].sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        setVisitors(updatedVisitors);
        setFilteredVisitors(updatedVisitors);
    };

    const updateVisitor = (updatedVisitor: IVisitor) => {
        const updatedVisitors = visitors.map((visitor) =>
            visitor.id === updatedVisitor.id ? updatedVisitor : visitor
        ).sort((a, b) => a.name.localeCompare(b.name));

        setVisitors(updatedVisitors);
        setFilteredVisitors(updatedVisitors);
    };

    const handleEditVisitor = (visitor: IVisitor | null) => {
        setEditVisitor(visitor);
    };

    const handleDetailVisitor = (visitor: IVisitor | null) => {
        setDetailVisitor(visitor);
        setShowDetailModal(true);
    };

    const confirmRemoveVisitor = async () => {
        if (visitorToRemove !== null) {
            try {
                setShowConfirmModal(false);
                setLoadingVisitors(true);

                const response = await fetch(`/api/visitor/${visitorToRemove.id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    toast.success("O visitante foi removido com sucesso.");
                    setVisitors(prevVisitors => prevVisitors.filter(visitor => visitor.id !== visitorToRemove.id));
                    setFilteredVisitors(prevVisitors => prevVisitors.filter(visitor => visitor.id !== visitorToRemove.id));
                } else {
                    toast.error("Ocorreu um erro ao tentar remover o visitante.");
                }
            } catch (error) {
                toast.error("Ocorreu um erro ao tentar remover o visitante.");
                console.error('Erro ao remover o visitante:', error);
            } finally {
                setVisitorToRemove(null);
                setLoadingVisitors(false);
            }
        }
    };

    const cancelRemoveVisitor = () => {
        setVisitorToRemove(null);
        setShowConfirmModal(false);
    };

    const handleRemoveVisitor = (visitor: IVisitor) => {
        setVisitorToRemove(visitor);
        setShowConfirmModal(true);
    };

    return (
        <>
            <PageTitle title="Visitantes" />
            <div className="bg-black h-screen p-10 pb-44 overflow-y-auto">
                <VisitorForm
                    addVisitor={addVisitor}
                    editVisitor={editVisitor}
                    setEditVisitor={setEditVisitor}
                    updateVisitor={updateVisitor}
                />
                <Spacer y={8} />
                <VisitorList
                    visitors={visitors}
                    filteredVisitors={filteredVisitors}
                    setFilteredVisitors={setFilteredVisitors}
                    loadingVisitors={loadingVisitors}
                    onDetail={handleDetailVisitor}
                    onEdit={handleEditVisitor}
                    onRemove={handleRemoveVisitor}
                />
            </div>
            <Modal
                open={showConfirmModal}
                title="Confirmar Exclusão"
                message={<div className="text-center"><p>Tem certeza que deseja excluir o visitante <b>{visitorToRemove?.name}</b>?</p><small>Esta ação não poderá ser desfeita.</small></div>}
                onCancel={cancelRemoveVisitor}
                buttons={[
                    <Button color="primary" onPress={confirmRemoveVisitor} key={"confirm_button"}>
                        Confirmar
                    </Button>,
                    <Button color="danger" variant="light" onClick={cancelRemoveVisitor} key={"cancel_button"}>
                        Cancelar
                    </Button>
                ]}
            />
            <Modal
                open={showDetailModal}
                title="Detalhes do Funcionário"
                message={<VisitorDetail {...detailVisitor} />}
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