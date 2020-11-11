export function addressToDocAddress(address) {
    return {
        addressId: address._id,
        name: address.name,
        address: address.address,
        address2: address.address2,
        city: address.city,
        administrative: address.administrative,
        country: address.country,
        zip: address.zip
    };
}