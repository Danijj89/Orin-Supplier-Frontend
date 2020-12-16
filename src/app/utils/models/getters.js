export const getAddressName = (address) => address.name;
export const getCompanyLegalName = (company) =>
    company.addresses.find(address => address.legal).name;