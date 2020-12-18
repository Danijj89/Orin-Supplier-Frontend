
export const isClientOwner = (userId, client) =>
    userId === client?.assignedTo || userId === client?.createdBy;