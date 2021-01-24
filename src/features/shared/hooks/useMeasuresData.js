import { getOptionId } from 'app/utils/options/getters.js';
import { useState } from 'react';

export default function useMeasuresData(items) {
    const totalPackages = {};
    let netWeight = 0;
    let grossWeight = 0;
    let dimension = 0;

    items.forEach(item => {
        const { package: packageQ, pUnit, netW, grossW, dim } = item;
        const unitId = getOptionId(pUnit);
        if (totalPackages.hasOwnProperty(unitId)) totalPackages[unitId] += packageQ;
        else totalPackages[unitId] = packageQ;
        netWeight += netW;
        grossWeight += grossW;
        dimension += dim;
    });

    return useState({
        package: totalPackages,
        netWeight,
        grossWeight,
        dimension
    });
}