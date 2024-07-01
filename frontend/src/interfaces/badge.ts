import { IArea } from "./area";
import { IEmployee } from "./employee";
import { IVisitor } from "./visitor";

export enum IBadgeType {
    FIXED = "FIXED",
    TEMPORARY = "TEMPORARY",
}

export interface IBadge {
    id: string;
    type: IBadgeType;
    code: string;
    createdAt: Date;
    active: boolean;
    employee: IEmployee;
    visit: IVisit[];
    permissions: IPermission[];
}

export interface IVisit {
    id: string;
    startDate: string;
    endDate: string;
    observations: string;
    badgeId: string;
    responsibleForTheVisitId: string;
    visitorId: string;
    badge: IBadge;
    responsibleForTheVisit: IEmployee;
    visitor: IVisitor;
}

export interface IPermission {
    id: string;
    badgeId: string;
    badge: IBadge;
    areaId: string;
    area: IArea;
}

export interface BadgeFormProps {
    addBadge: (badge: IBadge) => void;
}

export interface BadgeListProps {
    loadingBadges: boolean;
    badges: IBadge[];
    filteredBadges: IBadge[];
    setFilteredBadges: (badges: IBadge[]) => void;
    onRemove: (badges: IBadge) => void;
    onDetail: (badge: IBadge) => void;
}


export interface IBadgeDetail {
    id?: string;
    type?: IBadgeType;
    code?: string;
    createdAt?: Date;
    active?: boolean;
    employee?: IEmployee;
    visit?: IVisit[];
    permissions?: IPermission[];
}