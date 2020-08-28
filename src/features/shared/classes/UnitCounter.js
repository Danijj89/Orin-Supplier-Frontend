export default class UnitCounter {
    #units;
    #state;

    constructor(units, initialState) {
        this.#units = units;
        this.#state = initialState;
    }

    addUnit(unit, amount) {
        if (!this.#units.includes(unit))
            throw new Error(`Unable to add unit. The given unit ${ unit } does not belong to this counter`);
        this.#state.hasOwnProperty(unit)
            ? this.#state[unit] += amount
            : this.#state[unit] = amount;
    }

    get state() {
        return {...this.#state};
    }

    get stringRep() {
        return Object.entries(this.#state).map(([unit, amount]) =>
            `${amount} ${unit}`
        ).join(' + ');
    }
}