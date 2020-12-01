import { getOptionLabel } from '../../../app/utils/options/getters.js';

export default class UnitCounter {
    data;

    constructor(initialData) {
        this.data = initialData;
    }

    addUnit(unit, amount) {
        this._data.hasOwnProperty(unit)
            ? this._data[unit] += amount
            : this._data[unit] = amount;
    }

    subtractUnit(unit, amount) {
        this.addUnit(unit, amount * -1);
    }

    get data() {
        return { ...this._data };
    }

    static stringRep(unitObj, unitsMap, locale = 'en') {
        const entries = Object.entries(unitObj);
        if (entries.length === 1) return `${ entries[0][1] } ${ getOptionLabel(unitsMap[entries[0][0]], locale) }`;
        return Object.entries(unitObj)
            .filter(([_, amount]) => amount !== 0)
            .map(([unit, amount]) => `${ amount } ${ getOptionLabel(unitsMap[unit], locale) }`)
            .join(' + ');
    };

    static totalCount(unitObj) {
        return Object.values(unitObj).reduce((acc, amount) => acc + amount, 0);
    }

    set data(data) {
        this._data = { ...data };
    }
}