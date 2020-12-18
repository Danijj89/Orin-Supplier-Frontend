export const getAddressName = (address) => address.name;
export const getCompanyLegalName = (company) =>
    company.addresses.find(address => address.legal).name;
export const getCompanyLegalAddress = (company) =>
    company.addresses.find(address => address.legal);