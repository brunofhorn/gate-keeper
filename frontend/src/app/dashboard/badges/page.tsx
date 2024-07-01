"use client";

import { useEffect, useState } from "react";
import PageTitle from "@/layouts/partials/PageTitle";
import { Button, Spacer } from "@nextui-org/react";
import { toast } from "react-toastify";
import Modal from "@/layouts/components/Modal";
import { IBadge } from "@/interfaces/badge";
import BadgeForm from "@/layouts/components/badge/BadgeForm";
import BadgeList from "@/layouts/components/badge/BadgeList";
import { BadgeDetail } from "@/layouts/components/badge/BadgeDetail";

export default function Badges() {
    const [loadingBadges, setLoadingBadges] = useState<boolean>(true);
    const [badges, setBadges] = useState<IBadge[]>([]);
    const [filteredBadges, setFilteredBadges] = useState<IBadge[]>([]);
    const [editBadge, setEditBadge] = useState<IBadge | null>(null);
    const [detailBadge, setDetailBadge] = useState<IBadge | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [badgeToRemove, setBadgeToRemove] = useState<IBadge | null>(null);

    useEffect(() => {
        setLoadingBadges(true);

        const fetchBadges = async () => {
            const data: IBadge[] = await fetch('/api/badge').then(res => res.json());
            setBadges(data);
            setFilteredBadges(data);
            setLoadingBadges(false);
        };

        fetchBadges();
    }, []);

    const addBadge = (newBadge: IBadge) => {
        const updatedBadges = [...badges, newBadge].sort((a, b) =>
            a.code.localeCompare(b.code)
        );

        setBadges(updatedBadges);
        setFilteredBadges(updatedBadges);
    };

    const updateBadge = (updatedBadge: IBadge) => {
        const updatedBadges = badges.map((badge) =>
            badge.id === updatedBadge.id ? updatedBadge : badge
        ).sort((a, b) => a.code.localeCompare(b.code));

        setBadges(updatedBadges);
        setFilteredBadges(updatedBadges);
    };

    const handleDetailBadge = (badge: IBadge | null) => {
        setDetailBadge(badge);
        setShowDetailModal(true);
    };

    const confirmRemoveBadge = async () => {
        if (badgeToRemove !== null) {
            try {
                setShowConfirmModal(false);
                setLoadingBadges(true);

                const response = await fetch(`/api/badge/${badgeToRemove.id}`, {
                    method: 'PUT',
                });

                if (response.ok) {
                    toast.success("O crachá foi inativado com sucesso.");

                    const updatedBadge = await response.json();

                    updateBadge(updatedBadge);
                } else {
                    toast.error("Ocorreu um erro ao tentar inativar o crachá.");
                }
            } catch (error) {
                toast.error("Ocorreu um erro ao tentar inativar o crachá.");
                console.error('Erro ao inativar crachá:', error);
            } finally {
                setBadgeToRemove(null);
                setLoadingBadges(false);
            }
        }
    };

    const cancelRemoveBadge = () => {
        setBadgeToRemove(null);
        setShowConfirmModal(false);
    };

    const handleRemoveBadge = (badge: IBadge) => {
        setBadgeToRemove(badge);
        setShowConfirmModal(true);
    };

    return (
        <>
            <PageTitle title="Crachás" />
            <div className="bg-black h-screen p-10 pb-44 overflow-y-auto">
                <BadgeForm addBadge={addBadge} />
                <Spacer y={8} />
                <BadgeList
                    loadingBadges={loadingBadges}
                    badges={badges}
                    filteredBadges={filteredBadges}
                    setFilteredBadges={setFilteredBadges}
                    onRemove={handleRemoveBadge}
                    onDetail={handleDetailBadge}
                />
            </div>
            <Modal
                open={showConfirmModal}
                title="Confirmar Exclusão"
                message={<div className="text-center"><p>Tem certeza que deseja inativar o crachá <b>{badgeToRemove?.code}</b>?</p><small>Esta ação não poderá ser desfeita.</small></div>}
                onCancel={cancelRemoveBadge}
                buttons={[
                    <Button color="primary" onPress={confirmRemoveBadge} key={"confirm_button"}>
                        Confirmar
                    </Button>,
                    <Button color="danger" variant="light" onClick={cancelRemoveBadge} key={"cancel_button"}>
                        Cancelar
                    </Button>
                ]}
            />
            <Modal
                open={showDetailModal}
                title="Detalhes do Crachá"
                message={<BadgeDetail {...detailBadge} />}
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