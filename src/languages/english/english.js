export const ENGLISH = {
    login: {
        login: {
            title: 'Sign In',
            footerText: "Don't have an account?",
            emailLabel: 'Email',
            passwordLabel: 'Password',
            signInButton: 'Sign In',
            signUpText: 'Sign up to be a free Beta User',
            imageTitle: 'Export has never been this easy',
            imageSubText:
                'Seamlessly accept client orders and generate professional and compliant export documentation',
            errorMessages: {
                emailRequired: 'You need to insert an email',
                passwordRequired: 'You need to insert a password',
                emailOrPasswordWrong:
                    'Email or Password does not match any existing one',
            },
        },
    },
    home: {
        navbar: {
            tabsLabelsMap: {
                orders: 'Orders',
                shipments: 'Shipments',
                leads: 'Leads',
                clients: 'Clients',
                products: 'Products',
                settings: 'Settings',
            },
            helloMessageLabel: 'Hello'
        },
        settings: {
            tabsLabelsMap: {
                account: 'Account',
                colleagues: 'Colleagues',
                company: 'Company',
            },
        },
        accountDetails: {
            titleLabel: 'Account preferences',
            nameLabel: 'Your Name',
            emailLabel: 'Email',
            editButtonLabel: 'Edit',
            dialogTitleLabel: 'Account',
            dialogSubmitLabel: 'Update',
        },
        companyDetails: {
            editButtonLabel: 'Edit',
            dialogTitleLabel: 'Edit Company',
            dialogSubmitLabel: 'Update',
            addressesTableTitleLabel: 'Addresses',
            editAddressDialogTitleLabel: 'Edit Address',
            editAddressDialogSubmitLabel: 'Update Address',
            newAddressButtonLabel: 'New Address',
            newAddressDialogTitleLabel: 'New Address',
            newAddressDialogSubmitLabel: 'Create Address',
            taxNumberLabel: 'Tax Number',
            currencyLabel: 'Default Currency',
            industriesLabel: 'Industry',
            emailLabel: 'Company Email',
            phoneLabel: 'Company Phone',
            tabsLabelsMap: {
                addresses: 'Addresses',
                bankDetails: 'Bank Details'
            },
            bankDetails: {
                titleLabel: 'Bank Details',
                dialogTitleLabel: 'Edit Bank Details',
                dialogSubmitLabel: 'Update',
                tableHeaderLabelsMap: {
                    detail: 'Bank Details'
                }
            },
            bankDetailDialog: {
                detailLabel: 'Bank Details',
                deleteMessage: 'Are you sure you want to delete this bank details?'
            },
            newBankDetailButton: {
                buttonLabel: 'Add Bank Details',
                dialogTitleLabel: 'New Bank Details',
                dialogSubmitLabel: 'Create'
            }
        },
        newAddressButton: {
            typeLabel: 'Address Type',
            nameLabel: 'Company Name',
            addressLabel: 'Address line 1',
            address2Label: 'Address line 2',
            cityLabel: 'City',
            administrativeLabel: 'State',
            countryLabel: 'Country',
            zipLabel: 'Zip',
            phoneLabel: 'Phone',
            emailLabel: 'Email',
        },
        resetPasswordButton: {
            resetButtonLabel: 'Reset Password',
            dialogTitleLabel: 'Reset Password',
            dialogSubmitLabel: 'Reset',
            passwordLabel: 'Old Password',
            newPasswordLabel: 'New Password',
            confirmPasswordLabel: 'Confirm Password',
        },
        companyUsers: {
            titleLabel: 'Colleagues preferences',
            inviteButtonLabel: 'invite new',
            nameLabel: 'Name',
        },
    },
    client: {
        clientOverview: {
            newClientButtonLabel: 'New Client',
            newClientDialogTitleLabel: 'Add new client',
            newClientSubmitButtonLabel: 'Add Client',
            clientTableHeadersMap: {
                name: 'Company Name',
                contactName: 'Contact',
                contactEmail: 'Email',
                lastOrder: 'Last order',
                salesYTD: 'Sales YTD',
                orderCountYTD: 'Order Count YTD',
                assignedTo: 'Sales',
                notes: 'Notes',
            },
        },
        clientDetails: {
            clientDetailsDataDisplay: {
                formLabels: {
                    assignedTo: 'Assigned To',
                    primaryContact: 'Primary Contact',
                    contactEmail: 'Contact Email',
                    taxNumber: 'Tax Number',
                    source: 'Source',
                    incoterm: 'Default Incoterm',
                    payment: 'Default Payment Term',
                    clientSince: 'Client Since'
                }
            },
            notesLabel: 'Notes',
            tabsLabelsMap: {
                addresses: 'Addresses',
                contacts: 'Contacts',
                orders: 'Orders',
            },
            editClientButton: {
                buttonLabel: 'Edit',
                dialogTitleLabel: 'Edit Client',
                dialogSubmitLabel: 'Update',
            },
            clientAddressCards: {
                addressesTableTitleLabel: 'Addresses',
                editAddressDialogTitleLabel: 'Edit Address',
                editAddressDialogSubmitLabel: 'Update Address'
            },
            clientContactsTable: {
                contactTableHeadersMap: {
                    name: 'Name',
                    email: 'Email',
                    phone: 'Phone',
                    fax: 'Fax',
                    title: 'Title',
                    department: 'Department',
                    additional: 'Additional'
                },
                editDialogTitleLabel: 'Edit Contact',
                editDialogSubmitLabel: 'Update',
                newDialogTitleLabel: 'New Contact',
                newDialogSubmitLabel: 'Add',
                newButtonLabel: 'Add Contact',
                defaultButtonLabel: 'Default',
                setDefaultButtonLabel: 'Set Default'
            },
            clientOrdersTable: {
                ordersTableHeadersMap: {
                    ref: 'Order Number',
                    clientRef: 'Client Reference',
                    crd: 'Original Cargo Ready',
                    realCrd: 'Actual Cargo Ready',
                    totalQ: 'Quantity',
                    totalA: 'Total',
                    del: 'Mode',
                },
            },
        },
    },
    product: {
        overview: {
            newProductButton: {
                buttonLabel: 'New Product',
                dialogTitleLabel: 'Add new product',
                dialogSubmitLabel: 'Create Product'
            },
            productTable: {
                tableHeadersMap: {
                    sku: 'SKU',
                    name: 'Product Name',
                    description: 'Product Description',
                    lastOrder: 'Last Order',
                    salesYTD: 'Sales YTD',
                    orderCountYTD: 'Order Count YTD',
                    hsc: 'HS Code'
                },
                editDialogTitleLabel: 'Edit Product',
                editDialogSubmitLabel: 'Update'
            }
        }
    },
    order: {
        ordersOverview: {
            newOrderButtonLabel: 'New Order',
            ordersTableHeadersMap: {
                ref: 'Purchase Order',
                totalQ: 'Quantity',
                crd: 'Cargo Ready',
                toName: 'Client',
                procurement: 'Procurement',
                production: 'Production',
                qa: 'QA',
                notes: 'Notes',
            },
        },
        createOrder: {
            stepLabelsMap: {
                details: 'Order',
                products: 'Products',
            },
            titleLabel: 'New Order',
            createOrderDetails: {
                prevButtonLabel: 'Cancel',
                nextButtonLabel: 'Next: Products'
            },
            createOrderProducts: {
                prevButtonLabel: 'Back: Details',
                nextButtonLabel: 'Submit'
            }
        },
        order: {
            tabsLabelsMap: {
                details: 'Order Details',
                documents: 'Documents'
            },
            orderDetails: {
                detailsInfoCard: {
                    titleLabel: 'Order Overview',
                    orderReferenceLabel: 'Order Number',
                    companyLabel: 'Seller',
                    dateLabel: 'Order Date',
                    crdLabel: 'CRD',
                    incotermLabel: 'Incoterm',
                    quantityLabel: 'Quantity',
                    clientReferenceLabel: 'Client Reference',
                    clientLabel: 'Buyer',
                    authorLabel: 'Created By',
                    realCrdLabel: 'Actual CRD',
                    paymentMethodLabel: 'Payment Method',
                    totalLabel: 'Total',
                    editOrderDetailsButton: {
                        buttonLabel: 'Edit',
                        dialogTitleLabel: 'Edit Order',
                        dialogSubmitLabel: 'Update'
                    }
                },
                statusInfoCard: {
                    title: 'Order Progress',
                    headerLabelsMap: {
                        procurement: 'Procurement',
                        production: 'Production',
                        qa: 'QA'
                    },
                    statusLabel: 'Status',
                    estimatedLabel: 'Estimated Completion',
                    actualLabel: 'Actual Completion',
                    editOrderStatusButton: {
                        buttonLabel: 'Edit',
                        titleLabel: 'Order Status',
                        submitLabel: 'Update'
                    },
                    orderStatusDialog: {
                        procurementTitleLabel: 'Procurement',
                        productionTitleLabel: 'Production',
                        qaTitleLabel: 'QA',
                        statusLabel: 'Status',
                        estimatedLabel: 'Estimated',
                        actualLabel: 'Actual'
                    }
                },
                notesLabel: 'Notes',
                productTableTitleLabel: 'Products',
                orderProductTable: {
                    tableHeaderLabelsMap: {
                        ref: 'Item Reference',
                        description: 'Product Description',
                        quantity: 'Quantity',
                        unit: 'Unit',
                        price: 'Unit Price',
                        total: 'Amount'
                    },
                    totalLabel: 'Total',
                    editOrderProductsButton: {
                        buttonLabel: 'Edit',
                        dialogTitleLabel: 'Products',
                        dialogSubmitLabel: 'Update'
                    }
                }
            },
            orderDocuments: {
                buttonLabels: {
                    generateExcel: 'Generate Excel',
                    generatePdf: 'Generate PDF'
                },
                textLabels: {
                    noOrder: 'No Orders'
                },
                shipmentDocumentsCard: {
                    titleLabel: 'Shipment No:',
                }
            },
            errorMessages: {
                orderWasDeleted: 'The order you selected is no longer existent.'
            }
        }
    },
    shipment: {
        overview: {
            newShipmentButtonLabel: 'New Shipment',
            shipmentsTable: {
                tableHeadersMap: {
                    consigneeName: 'Consignee'
                }
            }
        },
        createShipment: {
            newTitleLabel: 'New Shipment',
            editTitleLabel: 'Edit',
            companyAddressLabel: 'Shipper / Supplier',
            clientLabel: 'Consignee / Client',
            clientAddressLabel: 'Client Address',
            tableHeaderLabelsMap: {
                ref: 'Sales Order',
                clientRef: 'Client Ref',
                totalQ: 'Quantity',
                crd: 'Cargo Ready',
                del: 'Shipping Mode',
                production: 'Production',
                qa: 'QA',
                notes: 'Notes',
                fulfilled: '% Fulfilled'
            },
            prevButtonLabel: 'Cancel',
            nextButtonLabel: 'Submit',
            errorMessages: {
                missingSupplierAddress: 'You must select a supplier address.',
                missingConsignee: 'You must select a consignee.',
                missingConsigneeAddress: 'You must select a consignee address.',
                atLeastOneOrder: 'You must select at least one order.'
            }
        },
        shipment: {
            editShipmentButtonLabel: 'Edit Shipment Information',
            tabsLabelsMap: {
                orders: 'Orders Included',
                documents: 'Documents'
            },
            documentButton: {
                buttonLabel: 'Generate Document',
                dialogTitleLabel: 'Choose a Document to Generate',
                submitButtonLabel: 'Continue',
                formLabels: {
                    document: 'Document'
                }
            },
            shipmentOrdersTable: {
                tableHeaderLabelsMap: {
                    ref: 'Sales Order',
                    clientRef: 'Client Ref',
                    totalQ: 'Quantity',
                    crd: 'Cargo Ready',
                    del: 'Shipping Mode',
                    production: 'Production',
                    qa: 'QA',
                    notes: 'Notes'
                },
                editOrdersButtonLabel: 'Edit Included Orders'
            },
            shipmentDocumentTable: {
                tableHeaderLabelsMap: {
                    ref: 'Document No.',
                    type: 'Document Type',
                    createdAt: 'Created At',
                    createdBy: 'Created By',
                    excel: 'Download Excel',
                    pdf: 'Download PDF'
                }
            },
            shipmentInfoCard: {
                titleLabel: 'Shipment Information',
                labels: {
                    status: 'Status',
                    crd: 'Cargo Ready',
                    del: 'Mode',
                    carrier: 'Forwarder',
                    pol: 'Port of Loading',
                    pod: 'Port of Destination',
                    etd: 'ETD',
                    eta: 'ETA'
                }
            },
            documentStatusCard: {
                titleLabel: 'Document Status',
                labels: {
                    docCutOff: 'Doc Cut Off',
                    bol: 'Bill of Landing No',
                    bolType: 'Bill Release Type',
                    released: 'Released'
                }
            }
        },
        editShipment: {
            titleLabel: 'Shipment Information',
            cancelButtonLabel: 'Cancel',
            deleteMessage: 'Are you sure you want to delete this shipment?',
            tabsLabelsMap: {
                shipment: 'Shipment',
                products: 'Products',
                measures: 'Measures'
            },
            successMessage: 'Update Successful!',
            shipmentInfo: {
                partiesTitleLabel: 'Parties',
                orderInfoTitleLabel: 'Order Information',
                shippingTitleLabel: 'Shipping Information',
                formLabels: {
                    sellerAdd: 'Shipper',
                    consigneeAdd: 'Consignee',
                    shipAdd: 'Ship To',
                    crd: 'Cargo Ready Date',
                    incoterm: 'Incoterm',
                    clientRef: 'Client Order Ref.',
                    bolType: 'Bill of Landing Type',
                    coo: 'Country of Manufacture',
                    clientRefs: 'Client References',
                    del: 'Delivery Method',
                    pol: 'Port of Loading',
                    pod: 'Port of Discharge',
                    carrier: 'Freight Forwarder',
                    eta: 'ETA',
                    etd: 'ETD'
                },
                submitButtonLabel: 'Update',
                errorMessages: {
                    missingSellerAdd: 'You must select a seller address.',
                    missingConsigneeAdd: 'You must select a consignee address.'
                }
            },
            productTable: {
                submitButtonLabel: 'Submit'
            },
            measureTable: {
                submitButtonLabel: 'Submit'
            },
            consolidationTable: {
                submitButtonLabel: 'Submit'
            }
        }
    },
    documents: {
        ci: {
            details: {
                titleLabel: 'Commercial Invoice Details',
                formLabels: {
                    autoGenerateRef: 'Auto-generate Invoice Number',
                    ref: 'Invoice Number',
                    sellerAdd: 'Seller Address',
                    consignee: 'Client',
                    consigneeAdd: 'Client Address',
                    crd: 'Cargo Ready',
                    coo: 'Country of Manufacture',
                    incoterm: 'Incoterm',
                    clientRefs: 'PO References',
                    payRefs: 'Payment References',
                    pol: 'Port of Loading',
                    pod: 'Port of Destination',
                    notes: 'Notes'
                },
                prevButtonLabel: 'Cancel',
                nextButtonLabel: 'Next',
            },
            products: {
                titleLabel: 'Commercial Invoice Products',
                prevButtonLabel: 'Details',
                nextButtonLabel: 'Generate',
            }
        },
        pl: {
            details: {
                titleLabel: 'Packing List Details',
                formLabels: {
                    autoGenerateRef: 'Auto-generate Packing List Number',
                    ref: 'Invoice Number',
                    sellerAdd: 'Seller Address',
                    consignee: 'Client',
                    consigneeAdd: 'Client Address',
                    shipAdd: 'Shipping Address',
                    ciRef: 'Invoice Number',
                    notes: 'Notes'
                },
                prevButtonLabel: 'Cancel',
                nextButtonLabel: 'Next',
            },
            products: {
                titleLabel: 'Packing List Products',
                prevButtonLabel: 'Details',
                nextButtonLabel: 'Generate',
            }
        },
        sc: {
            details: {
                titleLabel: 'Sales Contract Details',
                formLabels: {
                    autoGenerateRef: 'Auto-generate Contract Number',
                    ref: 'Invoice Number',
                    sellerAdd: 'Seller Address',
                    consignee: 'Client',
                    consigneeAdd: 'Client Address',
                    date: 'Date',
                    bankDetails: 'Bank Details',
                    termsOfPayment: 'Terms of Payment',
                    timeOfShipment: 'Time of Shipment',
                    insurance: 'Insurance',
                    customText: 'Custom Text',
                    pol: 'Port of Loading',
                    pod: 'Port of Destination',
                    notes: 'Package'
                },
                prevButtonLabel: 'Cancel',
                nextButtonLabel: 'Next',
            },
            products: {
                titleLabel: 'Contract Products',
                prevButtonLabel: 'Details',
                nextButtonLabel: 'Generate',
            }
        }
    },
    shared: {
        wrappers: {
            formDialog: {
                cancelLabel: 'Cancel',
            },
        },
        forms: {
            userDialog: {
                nameLabel: 'Your Name',
                emailLabel: 'Email',
            },
            resetPasswordDialog: {
                passwordLabel: 'Old Password',
                newPasswordLabel: 'New Password',
                confirmPasswordLabel: 'Confirm Password',
            },
            companyDialog: {
                taxNumberLabel: 'Tax Number',
                currencyLabel: 'Default Currency',
                industriesLabel: 'Industry',
            },
            addressDialog: {
                typeLabel: 'Address Type',
                nameLabel: 'Company Name',
                addressLabel: 'Address line 1',
                address2Label: 'Address line 2',
                cityLabel: 'City',
                administrativeLabel: 'State',
                countryLabel: 'Country',
                zipLabel: 'Zip',
                phoneLabel: 'Phone',
                emailLabel: 'Email',
                deleteMessage: 'Are you sure you want to delete this address?',
            },
            clientDialog: {
                nameLabel: 'Company Name',
                assignedToLabel: 'Assigned To',
                contactNameLabel: 'Primary Contact Name',
                contactEmailLabel: 'Primary Contact Email',
                taxNumberLabel: 'Tax Number',
                sourceLabel: 'Source',
                incotermLabel: 'Default Incoterm',
                paymentTermLabel: 'Default Payment Term',
                notesLabel: 'Notes',
                deleteMessage: 'Are you sure you want to delete this client?'
            },
            contactDialog: {
                nameLabel: 'Name',
                emailLabel: 'Email',
                phoneLabel: 'Phone',
                faxLabel: 'Fax',
                titleLabel: 'Title',
                departmentLabel: 'Department',
                additionalLabel: 'Additional Info',
                deleteMessage: 'Are you sure you want to delete this contact?',
            },
            productDialog: {
                autoGenerateRefLabel: 'auto generate',
                skuLabel: 'SKU',
                nameLabel: 'Product Name',
                descriptionLabel: 'Product Description (EN)',
                localDescriptionLabel: 'Product Description (CN)',
                hscLabel: 'HS Code',
                deleteMessage: 'Are you sure you want to delete this product?'
            },
            orderDetailsDialog: {
                deleteMessage: 'Are you sure you want to delete this order?'
            }
        },
        rhf: {
            forms: {
                orderDetails: {
                    detailsTitleLabel: 'Order Details',
                    shippingInfoTitleLabel: 'Shipping Information (Optional)',
                    formLabels: {
                        archived: 'Mark as Fulfilled',
                        autoGenerateRef: 'Auto-generate Order Number?',
                        ref: 'Order Number',
                        date: 'Order Date',
                        fromAdd: 'Seller Address',
                        to: 'Buyer',
                        toAdd: 'Buyer Address',
                        crd: 'Cargo Ready Date',
                        realCrd: 'Actual Ready Date',
                        incoterm: 'Incoterm',
                        pay: 'Payment Method',
                        clientRef: 'Client Reference',
                        notes: 'Remarks',
                        shipAdd: 'Ship to',
                        del: 'Delivery Method',
                        pol: 'Port of Loading',
                        pod: 'Port of Destination',
                        carrier: 'Shipping Carrier'
                    }
                },
                productTable: {
                    formLabels: {
                        currency: 'Currency',
                        saveItems: 'Save New Items To Inventory'
                    },
                    totalLabel: 'Total:',
                    notInOrderLabel: 'None',
                    tableHeaderLabels: {
                        order: 'Order ID',
                        ref: 'Item Reference',
                        description: 'Product Description',
                        quantity: 'Quantity',
                        unit: 'Unit',
                        price: 'Unit Price',
                        total: 'Amount'
                    },
                    marksPlaceholderLabel: 'Marks...',
                    errorMessages: {
                        missingCurrency: 'You must select a currency.',
                        missingCustomColumnName: 'You must give a name to all custom columns.',
                        missingItemInfo: 'Some item is missing information.',
                        missingItems: 'You need to add at least one item'
                    }
                },
                measureTable: {
                    formLabels: {
                        measurementUnit: 'Measurement Unit',
                        weightUnit: 'Weight Unit'
                    },
                    tableHeaderLabels: {
                        ref: 'Item Reference',
                        description: 'Product Description',
                        package: 'Packaging',
                        pUnit: 'P. Unit',
                        netW: 'Net Weight',
                        grossW: 'Gross Weight',
                        dim: 'Volume'
                    },
                    totalLabel: 'Total:',
                    marksLabel: 'Marks:',
                    errorMessages: {
                        missingMeasurementUnit: 'You must select a measurement unit.',
                        missingWeightUnit: 'You must select a weight unit.',
                        missingCustomColumnName: 'You must give a name to all custom columns.',
                        missingItemInfo: 'Some item is missing information.',
                        missingItems: 'You need to add at least one item'
                    }
                },
                consolidationTable: {
                    formLabels: {
                        measurementUnit: 'Measurement Unit',
                        weightUnit: 'Weight Unit'
                    },
                    tableHeaderLabels: {
                        description: 'Description',
                        localD: 'Local Description',
                        hsc: 'HTS Code',
                        dg: 'DG',
                        package: 'Packaging',
                        pUnit: 'Unit',
                        netW: 'Net Weight',
                        grossW: 'Gross Weight',
                        dim: 'Volume'
                    },
                    totalLabel: 'Total:',
                    errorMessages: {
                        missingCustomColumnName: 'You must give a name to all custom columns.'
                    }
                }
            }
        },
        components: {
            table: {
                paginationAllLabel: 'All',
                rowsPerPageLabel: 'Rows per page',
            },
            editableTable: {
                addRowButtonLabel: 'Add'
            },
            notFound: {
                message: '404 - Not Found!',
                homeButtonLabel: 'Go Home',
            },
            addressCard: {
                typeLabel: 'Type:',
                phoneLabel: 'Phone number:',
                emailLabel: 'Email:',
                editButtonLabel: 'Edit',
                deleteButtonLabel: 'Delete',
                defaultButtonLabel: 'Default',
                setDefaultButtonLabel: 'Set as Default'
            },
            textAreaCard: {
                submitLabel: 'Edit'
            },
            errorPage: {
                backButtonLabel: 'Go Back'
            }
        },
        buttons: {
            deleteButton: {
                cancelButton: 'Cancel',
                confirmButton: 'Confirm',
                deleteButtonLabel: 'Delete',
            },
        },
        downloadButton: {
            buttonText: 'Download',
            dialogTitle: 'Select the file type to download',
            dialogCancel: 'Cancel',
            dialogConfirm: 'Download',
            typeLabel: 'Document Type',
        },
        generateDocumentButton: {
            buttonText: 'Generate Documents',
            dialogTitle: 'Select the document to generate',
            dialogCancel: 'Cancel',
            dialogConfirm: 'Create',
            typeLabel: 'Document Type',
            errors: {
                ciFirst: 'You need to create a Commercial Invoice first.',
                ciExists: 'A Commercial Invoice already exists for this order.',
                plExists: 'A Packing List already exists for this order',
            },
        },
        addColumnButton: {
            buttonText: 'Add Column',
            dialogTitle: 'Type A Column Name',
            fieldLabel: 'Column Name',
            dialogCancel: 'Cancel',
            dialogConfirm: 'Add',
            errorMessage: 'Maximum number of columns reached',
        },
        documentTag: {
            docTypesAcronyms: {
                PO: 'PO',
                CI: 'CI',
                PL: 'PL',
            },
        },
        featureInProgressTag: {
            title: 'Feature in Progress',
        },
        statusButtonMenu: {
            orderStatusLabelsMap: {
                'Not Started': 'Not Started',
                'In Progress': 'In Progress',
                Completed: 'Completed',
                Exception: 'Exception',
            },
        }
    },
    defaults: {
        documentNames: {
            PO: 'Purchase Order',
            CI: 'Commercial Invoice',
            PL: 'Packing List',
        },
    },
};
