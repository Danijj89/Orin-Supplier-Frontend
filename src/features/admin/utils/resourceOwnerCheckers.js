
export const isClientOwner = (userId, client) =>
    userId === client?.assignedTo || userId === client?.createdBy;

export const isOrderOwner = (userId, order) =>
    userId === order?.createdBy;