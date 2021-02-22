import { getOptionId } from 'app/utils/options/getters.js';

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
            split: item.split || null,
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
            hsc: item.hsc || null,
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

export const shipmentToCommercialInvoice = (shipment, documentId) => {
    let source = shipment;
    if (documentId) source = shipment.documents.find(doc => doc._id === documentId);
    const initialDoc = {
        sellerAdd: source.sellerAdd,
        consignee: shipment.consignee,
        consigneeAdd: source.consigneeAdd,
        crd: source.crd || new Date(),
        coo: source.coo,
        incoterm: source.incoterm,
        clientRefs: source.clientRefs,
        payRefs: source.payRefs,
        scRef: source.scRef,
        pol: source.pol || null,
        pod: source.pod || null,
        currency: source.currency,
        items: source.items,
        quantity: source.quantity,
        total: source.total,
        custom1: source.ciCustom1,
        custom2: source.ciCustom2
    };
    if (documentId) {
        initialDoc.autoGenerateRef = false;
        initialDoc.ref = source.ref;
        initialDoc.notes = source.notes;
    } else {
        initialDoc.autoGenerateRef = true;
        initialDoc.ref = null;
        initialDoc.notes = null;
    }
    return initialDoc;
};

export const shipmentToPackingList = (shipment, documentId) => {
    let source = shipment;
    if (documentId) source = shipment.documents.find(doc => doc._id === documentId);
    const initialDoc = {
        sellerAdd: source.sellerAdd,
        consignee: shipment.consignee,
        consigneeAdd: source.consigneeAdd,
        shipAdd: source.shipAdd,
        pol: source.pol,
        pod: source.pod,
        items: shipment.items,
        measurementUnit: shipment.measurementUnit,
        weightUnit: shipment.weightUnit,
        package: shipment.package,
        netWeight: shipment.netWeight,
        grossWeight: shipment.grossWeight,
        dimension: shipment.dimension,
        custom1: shipment.plCustom1,
        custom2: shipment.plCustom2
    };
    if (documentId) {
        initialDoc.autoGenerateRef = false;
        initialDoc.ref = source.ref;
        initialDoc.notes = source.notes;
    } else {
        initialDoc.autoGenerateRef = true;
        initialDoc.ref = null;
        initialDoc.notes = null;
    }
    return initialDoc;
};

export const shipmentToSalesContract = (shipment, documentId) => {
    let source = shipment;
    if (documentId) source = shipment.documents.find(doc => doc._id === documentId);
    const initialDoc = {
        sellerAdd: source.sellerAdd,
        consignee: shipment.consignee,
        consigneeAdd: source.consigneeAdd,
        date: new Date(),
        bankDetails: null,
        termsOfPayment: null,
        timeOfShipment: null,
        insurance: null,
        customText: null,
        pol: source.pol || null,
        pod: source.pod || null,
        currency: source.currency,
        items: source.items,
        quantity: source.quantity,
        total: source.total,
        custom1: source.ciCustom1,
        custom2: source.ciCustom2
    };
    if (documentId) {
        initialDoc.autoGenerateRef = false;
        initialDoc.ref = source.ref;
        initialDoc.notes = source.notes;
    } else {
        initialDoc.autoGenerateRef = true;
        initialDoc.ref = null;
        initialDoc.notes = null;
    }
    return initialDoc;
};

export const shipmentToChinaExport = (shipment, documentId) => {
    let source = shipment;
    if (documentId) source = shipment.documents.find(doc => doc._id === documentId);
    const initialDoc = {
        pol: source.pol || null,
        pod: source.pod || null,
        incoterm: source.incoterm,
        sName: null,
        mName: null,
        mTaxCode: null,
        supervision: null,
        exemption: null,
        containerNum: null,
        exPort: null,
        scRef: source.scRef,
        del: source.del,
        bol: source.bol,
        quantity: source.quantity,
        totalAmount: { [getOptionId(source.currency)]: source.total },
        marks: source.marks
    };
    if (documentId) {
        initialDoc.totNetWeight = source.totNetWeight;
        initialDoc.totGrossWeight = source.totGrossWeight;
        initialDoc.cName = source.cName;
        initialDoc.autoGenerateRef = false;
        initialDoc.ref = source.ref;
        initialDoc.notes = source.notes;
        initialDoc.sName = source.sName;
        initialDoc.sTaxCode = source.sTaxCode;
        initialDoc.mName = source.mName || null;
        initialDoc.mTaxCode = source.mTaxCode || null;
        initialDoc.supervision = source.supervision || null;
        initialDoc.exemption = source.exemption || null;
        initialDoc.containerNum = source.containerNum || null;
        initialDoc.exPort = source.exPort || null;
        initialDoc.packageTypes = source.packageTypes;
        initialDoc.packageUnits = source.packageUnits;
        initialDoc.tradingCountry = source.tradingCountry;
        initialDoc.destCountry = source.destCountry;
        initialDoc.coItems = source.items;
    } else {
        initialDoc.autoGenerateRef = true;
        initialDoc.ref = null;
        initialDoc.notes = null;
        initialDoc.sTaxCode = source.seller.taxNumber;
        initialDoc.tradingCountry = source.sellerAdd.country;
        initialDoc.destCountry = source.consigneeAdd.country;
        initialDoc.cName = source.consigneeAdd;
        initialDoc.totNetWeight = source.netWeight;
        initialDoc.totGrossWeight = source.grossWeight;
        const packageTypes = new Set();
        let packageUnits = 0;
        for (const [unit, quantity] of Object.entries(shipment.package)) {
            packageTypes.add(unit);
            packageUnits += quantity;
        }
        initialDoc.packageTypes = Array.from(packageTypes).join(',');
        initialDoc.packageUnits = packageUnits;
        initialDoc.coItems = itemsToConsolidationItems(
            source.items,
            source.currency,
            source.sellerAdd.country,
            source.consigneeAdd.country
        );
    }
    return initialDoc;
};

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
        if (split.clientRef) splitData.clientRef = split.clientRef;
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
