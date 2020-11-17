
export function isAddressEqualToDocAddress(address, docAddress) {
    return address._id === docAddress._id
        || address._id === docAddress.addressId;
}

export function findAddressFromAddresses(address, addresses) {
    // if it has an addressId it means it is a docAddress
    if (address.addressId) return addresses.find(a => a._id === address.addressId);
    return addresses.find(a => a._id === address._id);
}