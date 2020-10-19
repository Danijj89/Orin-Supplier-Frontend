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
        sidePanel: {
            orders: 'Orders',
            shipments: 'Shipments',
            clients: 'Clients',
            products: 'Products',
            settings: 'Settings',
        },
        settings: {
            tabsLabelMap: {
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
            defaultCurrencyLabel: 'Default Currency',
            industriesLabel: 'Industry',
            emailLabel: 'Company Email',
            phoneLabel: 'Company Phone',
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
            assignedToLabel: 'Assigned To',
            primaryContactLabel: 'Primary Contact',
            contactEmailLabel: 'Contact Email',
            taxNumberLabel: 'Tax Number',
            sourceLabel: 'Source',
            incotermLabel: 'Default Incoterm',
            paymentLabel: 'Default Payment Term',
            clientSinceLabel: 'Client Since',
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
            clientAddressTable: {
                editAddressDialogTitleLabel: 'Edit Address',
                editAddressDialogSubmitLabel: 'Update Address',
                defaultAddressButtonLabel: 'Default',
                setDefaultButtonLabel: 'Set Default',
                addressTableHeadersMap: {
                    type: 'Label',
                    name: 'Entity Name',
                    address: 'Address',
                    address2: 'Address 2',
                    city: 'City',
                    administrative: 'State',
                    country: 'Country',
                    zip: 'Zip',
                    phone: 'Phone',
                    email: 'Email',
                },
            },
            clientContactsTable: {
                contactTableHeadersMap: {
                    name: 'Name',
                    email: 'Email',
                    phone: 'Phone',
                    fax: 'Fax',
                    title: 'Title',
                    department: 'Department',
                    additional: 'Additional',
                },
                editDialogTitleLabel: 'Edit Contact',
                editDialogSubmitLabel: 'Update',
                newDialogTitleLabel: 'New Contact',
                newDialogSubmitLabel: 'Add',
                newButtonLabel: 'Add Contact',
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
            prevButtonLabel: {
                details: 'Cancel',
                products: 'Back: Details',
            },
            nextButtonLabel: {
                details: 'Next: Products',
                products: 'Submit',
            },
            createOrderDetails: {
                detailsTitleLabel: 'Order Details',
                autoGenerateRefLabel: 'Auto-generate Order Number?',
                orderReferenceLabel: 'Order Number',
                dateLabel: 'Order Date',
                companyAddressLabel: 'Seller Address',
                clientLabel: 'Buyer',
                clientAddressLabel: 'Buyer Address',
                crdLabel: 'Cargo Ready Date',
                incotermLabel: 'Incoterm',
                paymentMethodLabel: 'Payment Method',
                clientReferenceLabel: 'Client Reference',
                notesLabel: 'Remarks',
                shippingInfoTitleLabel: 'Shipping Information (Optional)',
                deliveryMethodLabel: 'Delivery Method',
                portOfLoadingLabel: 'Port of Loading',
                portOfDestinationLabel: 'Port of Destination',
                shippingCarrierLabel: 'Shipping Carrier',
            },
            createOrderProducts: {
                currencyLabel: 'Currency',
                saveItemsLabel: 'Save New Items To Inventory',
                createOrderProductTable: {
                    totalLabel: 'Total:',
                    tableHeaderLabelsMap: {
                        ref: 'Item Reference',
                        description: 'Product Description',
                        quantity: 'Quantity',
                        unit: 'Unit',
                        price: 'Unit Price',
                        total: 'Amount'
                    }
                }
            },
            errorMessages: {
                currency: 'You must select a currency.',
                missingItemInfo: 'Some item is missing information.',
            },
        },
        orderTableRow: {
            deleteOrderDialogMessage:
                'Are you sure you want to delete this order?',
        },
        orderInfoTile: {
            title: 'Order Overview',
            orderLabel: 'Order Number:',
            dateTitle: 'Date:',
            crdTitle: 'CRD:',
            quantityTitle: 'Quantity:',
            incotermTitle: 'Incoterm:',
            remarksLabel: 'Remarks:',
            companyNameLabel: 'To:',
            companyAddressLabel: 'Address:',
            totalAmountLabel: 'Amount:',
        },
        order: {
            tabsLabel: ['Order Details', 'Product components'],
        },
        orderStatusInfoTile: {
            title: 'Order Progress',
            headers: ['Procurement', 'Production', 'QA'],
            rowLabels: [
                'Status:',
                'Estimated Completion:',
                'Actual Completion:',
            ],
        },
        orderDocuments: {
            tableTitle: 'Generated Documents',
            tableHeaders: ['Document Type', 'Created By', 'Date Created'],
            docTypeMap: {
                CI: 'Commercial Invoice',
                PO: 'Purchase Order',
                PL: 'Packing List',
            },
            deleteDocumentMessage:
                'Are you sure you want to delete this document?',
            deleteDocumentButtonCancel: 'Cancel',
            deleteDocumentButtonConfirm: 'Delete',
        },
        orderProductTable: {
            tableTitleLabel: 'Product components',
            editButtonLabel: 'Edit',
            addRowButton: 'Add',
            errorMessages: {
                currencyRequired: 'You must select a currency.',
                missingItemInfo: 'Some item is missing information.',
            },
            totalsLabel: 'Total:',
        },
    },

    commercialInvoice: {
        createCI: {
            steps: ['Invoice Info', 'Products', 'Review'],
            title: 'Commercial Invoice',
        },
        createCIDetailsForm: {
            invoiceNumber: 'Invoice Number*',
            invoiceDate: 'Invoice Date',
            importer: 'Importer',
            importerAddress: 'Importer Address',
            exporter: 'Exporter',
            exporterAddressLabel: 'Exporter Address',
            countryOfManufacture: 'Country of Manufacture',
            buttonCancel: 'Cancel',
            buttonNext: 'Next: Product Info',
        },
        createCIAdditionalInfo: {
            title: 'Additional Information (Optional)',
            additionalNotes: 'Additional Notes',
            salesContract: 'Sales Contract Number',
            paymentReference: 'Payment Reference',
            portOfLoading: 'Port of Loading',
            portOfDestination: 'Port of Destination',
        },
        createCIProductInfo: {
            ordersLabel: 'Purchase Orders',
            currencyLabel: 'Currencies',
            marksLabel: 'Marks and Numbers',
            buttonPrev: 'Back: Invoice Details',
            buttonNext: 'Next: Review',
            errorMessages: {
                poRefs: 'You must reference at least one Purchase Order.',
                currency: 'You must select a currency.',
                atLeastOneOrder: 'You must choose at least one Purchase Order.',
                missingItemInfo: 'Some item is missing information.',
            },
        },
        createCIProductTable: {
            totals: 'Total:',
            addRowButton: 'Add',
        },
    },
    packingList: {
        createPL: {
            steps: ['Packing List', 'Product Info', 'Review'],
            title: 'Packing List',
        },
        createPLDetailsForm: {
            plRefLabel: 'Packing List Number*',
            dateLabel: 'Packing List Date',
            notesLabel: 'Notes',
            cancelButton: 'Cancel',
            nextButton: 'Next: Product Data',
        },
        createPLProductInfo: {
            measurementUnitLabel: 'Measurement Unit',
            weightUnitLabel: 'Weight Unit',
            marksLabel: 'Marks and Numbers',
            prevButton: 'Back: Details',
            nextButton: 'Next: Preview',
            errorMessages: {
                missingItemInfo: 'Some item is missing information.',
                mUnit: 'You must select a measurement unit.',
                wUnit: 'You must select a weight unit.',
            },
        },
        createPLProductTable: {
            addRowButton: 'Add',
            totalsText: 'Totals:',
        },
    },
    shipments: {
        overview: {
            addShipmentButton: 'New Shipment',
        },
        createShipment: {
            steps: ['Orders', 'Details', 'Product Info', 'Review'],
            titleLabel: 'New Shipment',
        },
        createShipmentOrders: {
            chipTitleLabel: 'Orders',
            detailsTitleLabel: 'Order Details',
            clientDropdownLabel: 'Clients',
            orderNumberLabel: 'Order No.:',
            orderDateLabel: 'Date:',
            clientNameLabel: 'Client:',
            orderCRDLabel: 'CRD:',
            quantityLabel: 'Quantity:',
            incotermLabel: 'Incoterm:',
            remarksLabel: 'Remarks:',
            cancelButton: 'Cancel',
            nextButton: 'Next',
        },
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
                defaultCurrencyLabel: 'Default Currency',
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
                autoGenerateLabel: 'auto generate',
                skuLabel: 'SKU',
                nameLabel: 'Product Name',
                descriptionLabel: 'Product Description (EN)',
                localDescriptionLabel: 'Product Description (CN)',
                hscLabel: 'HS Code',
                deleteMessage: 'Are you sure you want to delete this product?'
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
            errorDisplay: {
                titleLabel: 'Errors:',
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
        },
        dropdowns: {
            currency: {
                label: 'Currency',
            },
        },
    },
    defaults: {
        documentNames: {
            PO: 'Purchase Order',
            CI: 'Commercial Invoice',
            PL: 'Packing List',
        },
    },
};
