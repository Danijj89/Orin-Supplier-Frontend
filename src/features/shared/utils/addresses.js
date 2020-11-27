
export function findAddressFromAddresses(address, addresses) {
    // if it has an addressId it means it is a docAddress
    if (address.addressId) return addresses.find(a => a._id === address.addressId);
    return addresses.find(a => a._id === address._id);
}