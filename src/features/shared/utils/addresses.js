
export function isAddressEqualToDocAddress(address, docAddress) {
    return address._id === docAddress._id
        || address._id === docAddress.addressId;
}