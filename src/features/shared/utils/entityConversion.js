export const addressToDocAddress = (address) => (
    {
        addressId: address._id,
        name: address.name,
        address: address.address,
        address2: address.address2,
        city: address.city,
        administrative: address.administrative,
        country: address.country,
        zip: address.zip
    }
);


export const tableItemsToOrderItems = (tableItems, orderId = null) =>
    tableItems.map(item => ({
        _id: item._id,
        order: orderId,
        product: item.product,
        ref: item.ref,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        total: item.total,
        custom1: item.custom1,
        custom2: item.custom2
    }));

export const productTableItemsToItems = (tableItems) =>
    tableItems.map(item => ({
        _id: item._id,
        product: item.product,
        ref: item.ref,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        total: item.total,
        ciCustom1: item.ciCustom1,
        ciCustom2: item.ciCustom2,
    }));

export const measureTableItemsToItems = (tableItems) =>
    tableItems.map(item => ({
        _id: item._id,
        package: item.package,
        pUnit: item.pUnit,
        netW: item.netW,
        grossW: item.grossW,
        dim: item.dim,
        plCustom1: item.plCustom1,
        plCustom2: item.plCustom2,
    }));

export const shipmentToCommercialInvoice = (shipment) => ({
    autoGenerateRef: true,
    ref: null,
    sellerAdd: shipment.sellerAdd,
    consigneeAdd: shipment.consigneeAdd,
    coo: shipment.coo,
    clientRefs: shipment.clientRefs,
    payRefs: shipment.payRefs,
    notes: null,
    currency: shipment.currency,
    items: shipment.items,
    quantity: shipment.quantity,
    total: shipment.total,
    custom1: shipment.ciCustom1,
    custom2: shipment.ciCustom2
});
