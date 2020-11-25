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


export const tableItemsToOrderItems = (tableItems) =>
    tableItems.map(item => {
        const temp = {
            product: item.product,
            ref: item.ref,
            description: item.description,
            quantity: item.quantity,
            unit: item.unit,
            price: item.price,
            total: item.total,
            custom1: item.custom1,
            custom2: item.custom2
        };
        if (item._id) temp._id = item._id;
        return temp;
    });

export const productTableItemsToItems = (tableItems, shipmentId) =>
    tableItems.map(item => {
        const temp = {
            order: item.order || null,
            shipment: shipmentId,
            ref: item.ref,
            description: item.description,
            quantity: item.quantity,
            unit: item.unit,
            price: item.price,
            total: item.total,
            ciCustom1: item.ciCustom1,
            ciCustom2: item.ciCustom2
        };
        if (item._id) temp._id = item._id;
        if (item.product) temp.product = item.product;
        return temp;
    });

export const measureTableItemsToItems = (tableItems, shipmentId) =>
    tableItems.map(item => ({
        _id: item._id,
        package: item.package,
        shipment: shipmentId,
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
    consignee: shipment.consignee,
    consigneeAdd: shipment.consigneeAdd,
    crd: shipment.crd,
    coo: shipment.coo,
    incoterm: shipment.incoterm,
    clientRefs: shipment.clientRefs,
    payRefs: shipment.payRefs,
    pol: shipment.pol,
    pod: shipment.pod,
    notes: null,
    currency: shipment.currency,
    items: shipment.items,
    quantity: shipment.quantity,
    total: shipment.total,
    custom1: shipment.ciCustom1,
    custom2: shipment.ciCustom2
});

export const shipmentToPackingList = (shipment) => ({
    autoGenerateRef: true,
    ref: null,
    sellerAdd: shipment.sellerAdd,
    consignee: shipment.consignee,
    consigneeAdd: shipment.consigneeAdd,
    shipAdd: shipment.shipAdd,
    notes: null,
    items: shipment.items,
    measurementUnit: shipment.measurementUnit,
    weightUnit: shipment.weightUnit,
    package: shipment.package,
    netWeight: shipment.netWeight,
    grossWeight: shipment.grossWeight,
    dimension: shipment.dimension,
    custom1: shipment.plCustom1,
    custom2: shipment.plCustom2
});

export const shipmentToSalesContract = (shipment) => ({
    autoGenerateRef: true,
    ref: null,
    sellerAdd: shipment.sellerAdd,
    consignee: shipment.consignee,
    consigneeAdd: shipment.consigneeAdd,
    date: new Date(),
    bankDetails: null,
    termsOfPayment: null,
    timeOfShipment: null,
    insurance: null,
    customText: null,
    pol: shipment.pol,
    pod: shipment.pod,
    notes: null,
    currency: shipment.currency,
    items: shipment.items,
    quantity: shipment.quantity,
    total: shipment.total,
    custom1: shipment.ciCustom1,
    custom2: shipment.ciCustom2
});

export const countryToCountryCode = (country) => country.code;
