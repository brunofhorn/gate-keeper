export type Status = 'active' | 'paused' | 'vacation';

export const statusColorMap: Record<Status, "success" | "danger" | "warning"> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};