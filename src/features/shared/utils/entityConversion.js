import { getOptionId } from '../../../app/utils/options/getters.js';

export const addressToDocAddress = (address) => (
    {
        addressId: address._id,
        name: address.name,
        address: address.address,
        address2: address.address2,
        city: address.city,
        administrative: address.administrative,
        country: getOptionId(address.country),
        zip: address.zip
    }
);

export const productTableItemsToOrderItems = (tableItems) =>
    tableItems.map(item => {
        const temp = {
            product: item.product,
            ref: item.ref,
            description: item.description,
            localD: item.localD,
            hsc: item.hsc,
            quantity: item.quantity,
            unit: getOptionId(item.unit),
            price: item.price,
            total: item.total,
            custom1: item.custom1,
            custom2: item.custom2
        };
        if (item._id) temp._id = item._id;
        return temp;
    });

export const tableItemsToItems = (tableItems) =>
    tableItems.map(item => {
        const temp = {
            order: item.order || null,
            ref: item.ref,
            description: item.description,
            localD: item.localD,
            hsc: item.hsc,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
            package: item.package,
            netW: item.netW,
            grossW: item.grossW,
            dim: item.dim,
            ciCustom1: item.ciCustom1,
            ciCustom2: item.ciCustom2,
            plCustom1: item.plCustom1,
            plCustom2: item.plCustom2
        };
        if (item._id) temp._id = item._id;
        if (item.product) temp.product = item.product;
        if (item.pUnit) temp.pUnit = getOptionId(item.pUnit);
        if (item.unit) temp.unit = getOptionId(item.unit)
        return temp;
    });

export const itemsToConsolidationItems =
    (items, currency, countryOfOrigin, destinationCountry) =>
        items.map(item => ({
            hsc: item.hsc,
            localD: item.localD,
            quantity: item.quantity,
            unit: item.unit,
            price: item.price,
            total: item.total,
            currency: currency,
            coo: countryOfOrigin,
            fdc: destinationCountry,
            dop: '',
            package: item.package,
            pUnit: item.pUnit,
            netW: item.netW,
            grossW: item.grossW,
            dim: item.dim,
            description: item.description,
            dg: false
        }));

export const consolidationTableItemsToConsolidationItems = (items) =>
    items.map(item => {
        const temp = {
            hsc: item.hsc,
            localD: item.localD,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
            dop: item.dop,
            description: item.description,
            package: item.package,
            pUnit: item.pUnit,
            netW: item.netW,
            grossW: item.grossW,
            dim: item.dim,
            dg: false
        };
        if (item.unit) temp.unit = getOptionId(item.unit);
        if (item.currency) temp.currency = getOptionId(item.currency);
        if (item.coo) temp.coo = getOptionId(item.coo);
        if (item.fdc) temp.fdc = getOptionId(item.fdc);
        if (item.pUnit) temp.pUnit = getOptionId(item.pUnit);
        return temp;
    });

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
    scRef: shipment.scRef,
    pol: shipment.pol || null,
    pod: shipment.pod || null,
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
    pol: shipment.pol,
    pod: shipment.pod,
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
    pol: shipment.pol || null,
    pod: shipment.pod || null,
    notes: null,
    currency: shipment.currency,
    items: shipment.items,
    quantity: shipment.quantity,
    total: shipment.total,
    custom1: shipment.ciCustom1,
    custom2: shipment.ciCustom2
});

export const shipmentToChinaExport = (shipment) => {
    const packageTypes = new Set();
    let packageUnits = 0;
    for (const [unit, quantity] of Object.entries(shipment.package)) {
        packageTypes.add(unit);
        packageUnits += quantity;
    }
    return {
        autoGenerateRef: true,
        ref: null,
        sName: null,
        sTaxCode: shipment.seller.taxNumber,
        mName: null,
        mTaxCode: null,
        cName: shipment.consigneeAdd,
        supervision: null,
        exemption: null,
        tradingCountry: shipment.sellerAdd.country,
        destCountry: shipment.consigneeAdd.country,
        pol: shipment.pol || null,
        pod: shipment.pod || null,
        packageTypes: Array.from(packageTypes).join(','),
        packageUnits: packageUnits,
        netWeight: shipment.netWeight,
        grossWeight: shipment.grossWeight,
        incoterm: shipment.incoterm,
        containerNum: null,
        scRef: shipment.scRef,
        exPort: null,
        del: shipment.del,
        bol: shipment.bol,
        coItems: itemsToConsolidationItems(
            shipment.items,
            shipment.currency,
            shipment.sellerAdd.country,
            shipment.consigneeAdd.country
        ),
        quantity: shipment.quantity,
        totalAmount: { [getOptionId(shipment.currency)]: shipment.total },
        marks: shipment.marks
    };
}

export const prepareShippingSplits = shippingSplits =>
    shippingSplits.map(split => {
        const splitData = {
            crd: split.crd,
            items: split.items.map(item => ({
                _id: item._id,
                quantity: item.quantity
            }))
        };
        if (split.ref) splitData.ref = split.ref;
        if (split.realCrd) splitData.realCrd = split.realCrd;
        if (split.procurement) splitData.procurement = {
            ...split.procurement,
            status: getOptionId(split.procurement.status)
        };
        if (split.production) splitData.production = {
            ...split.production,
            status: getOptionId(split.production.status)
        };
        if (split.qa) splitData.qa = {
            ...split.qa,
            status: getOptionId(split.qa.status)
        };
        if (split._id) splitData._id = split._id;
        return splitData;
    });
