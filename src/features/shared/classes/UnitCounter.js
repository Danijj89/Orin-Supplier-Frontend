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
        return {...this._data};
    }

    get stringRep() {
        return Object.entries(this.data).map(([unit, amount]) =>
            `${amount} ${unit}`
        ).join(' + ');
    }

    set data(data) {
        this._data = {...data};
    }
}