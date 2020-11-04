export default class UnitCounter {
    units;
    data;

    constructor(units, initialData) {
        this.units = units;
        this.data = initialData;
    }

    addUnit(unit, amount) {
        if (!this.units.includes(unit))
            throw new Error(`Unable to add unit. The given unit ${ unit } does not belong to this counter`);
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

    get units() {
        return this._units;
    }

    set units(units) {
        this._units = [...units];
    }

    static stringRep(unitObj) {
        const entries = Object.entries(unitObj);
        if (entries.length === 1) return entries.map(([unit, amount]) => `${ amount } ${ unit }`)
        return Object.entries(unitObj)
            .filter(([unit, amount]) => amount !== 0)
            .map(([unit, amount]) => `${ amount } ${ unit }`)
            .join(' + ');
    };

    static totalCount(unitObj) {
        return Object.values(unitObj).reduce((acc, amount) => acc + amount, 0);
    }

    set data(data) {
        this._data = { ...data };
    }
}