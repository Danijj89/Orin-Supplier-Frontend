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
            inventory: 'Inventory',
        },
    },
    order: {
        OrdersOverview: {
            newOrder: 'New Order',
            columns: [
                'Purchase Order',
                'Quantity',
                'Cargo Ready',
                'Client',
                'Procurement',
                'Production',
                'QA',
                'Notes',
            ],
            deleteOrderDialogMessage:
                'Are you sure you want to delete this order?',
            deleteOrderDialogCancelButton: 'Cancel',
            deleteOrderDialogConfirmButton: 'Confirm',
        },
        createOrder: {
            steps: ['Order', 'Products'],
            titleLabel: 'New Order',
        },
        orderDetailsForm: {
            orderReferenceLabel: 'Order Number*',
            dateLabel: 'Order Date',
            clientLabel: 'Client*',
            clientAddressLabel: 'Delivery Address*',
            crdLabel: 'Cargo Ready Date',
            incotermLabel: 'Incoterm',
            paymentMethodLabel: 'Payment Method',
            remarksLabel: 'Remarks',
            cancelButton: 'Cancel',
            nextButton: 'Next',
        },
        shippingInfo: {
            shippingInformation: 'Shipping Information (Optional)',
            deliveryMethod: 'Delivery Method',
            portOfLoading: 'Port of Loading',
            portOfDestination: 'Port of Destination',
            shippingCarrier: 'Shipping Carrier',
        },
        orderProductInfo: {
            currencyLabel: 'Currency',
            saveItemsLabel: 'Save New Items To Inventory',
            prevButton: 'Order Details',
            nextButton: 'Submit',
            errorMessages: {
                currency: 'You must select a currency.',
                missingItemInfo: 'Some item is missing information.',
            }
        },
        productTable: {
            totals: 'Total:',
            addRowButton: 'Add',
            headerLabelsMap: {
                'Item Ref': 'Item Ref',
                'Product Description': 'Product Description',
                'Quantity': 'Quantity',
                'Unit Price': 'Unit Price',
                'Amount': 'Amount'
            }
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
            totalAmountLabel: 'Amount:'
        },
        order: {
            orderDetailsTab: 'Order Details',
            documentsTab: 'Documents',
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
        orderInfoCard: {
            editButton: 'Edit',
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
        }
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
        }
    },
    shipments: {
        overview: {
            addShipmentButton: 'New Shipment'
        },
        createShipment: {
            steps: ['Orders', 'Details', 'Product Info', 'Review'],
            titleLabel: 'New Shipment'
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
            nextButton: 'Next'
        }
    },
    shared: {
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
        deleteButton: {
            cancelButton: 'Cancel',
            confirmButton: 'Confirm',
        },
        statusButtonMenu: {
            orderStatusLabelsMap: {
                'Not Started': 'Not Started',
                'In Progress': 'In Progress',
                Completed: 'Completed',
                Exception: 'Exception',
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
