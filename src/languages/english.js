export const ENGLISH = {
    login: {
        loginImage: {
            title: 'Export has never been this easy',
            subText: `Seamlessly accept client orders and generate 
        professional and compliant export documentation`
        },
        login: {
            signIn: 'Sign In',
            missingAccountText: 'Don\'t have an account?',
            signUp: 'Sign up to be a free Beta User'
        },
        loginForm: {
            email: 'Email',
            password: 'Password',
            signIn: 'Sign In'
        }
    },
    home: {
        sidePanel: {
            orders: 'Orders',
            clients: 'Clients',
            documents: 'Documents'
        },
        searchBar: {
            search: 'Search'
        }
    },
    order: {
        OrdersOverview: {
            newOrder: 'New Order',
            columns: ['Status', 'Purchase Order', 'Quantity', 'Cargo Ready', 'Client', 'Notes'],
            deleteOrderDialogMessage: 'Are you sure you want to delete this order?',
            deleteOrderDialogCancelButton: 'Cancel',
            deleteOrderDialogConfirmButton: 'Confirm'
        },
        createOrder: {
            steps: ['Order', 'Products', 'Review'],
            newOrder: 'New Order'
        },
        orderDetailsForm: {
            orderReferenceLabel: 'Order Number',
            dateLabel: 'Order Date',
            clientLabel: 'Client',
            clientAddressLabel: 'Delivery Address',
            crdLabel: 'Cargo Ready Date',
            incotermLabel: 'Incoterm',
            paymentMethodLabel: 'Payment Method',
            referenceLabel: 'Order Name or Reference',
            remarksLabel: 'Remarks',
            cancelButton: 'Cancel',
            nextButton: 'Next: Product Info'
        },
        shippingInfo: {
            shippingInformation: 'Shipping Information (Optional)',
            deliveryMethod: 'Delivery Method',
            portOfLoading: 'Port of Loading',
            portOfDestination: 'Port of Destination',
            shippingCarrier: 'Shipping Carrier'
        },
        orderProductInfo: {
            currencyLabel: 'Currency',
            prevButton: 'Order Details',
            nextButton: 'Next: Review',
            errorMessages: {
                items: 'You must fill at least one row of data.',
                currency: 'You must select a currency.'
            }
        },
        productTable: {
            defaultHeaders: ['Item Ref', 'Product Description', null, null, 'Quantity', 'Unit Price', 'Amount'],
            totals: 'Total:',
            addRowButton: 'Add'

        },
        orderPreview: {
            buttonProductInfo: 'Product Info',
            buttonSubmit: 'Submit'
        },
        orderInfoTile: {
            dateTitle: 'Purchase Order Date',
            crdTitle: 'CRD',
            quantityTitle: 'Quantity',
            incotermTitle: 'Incoterm',
            editButton: 'Edit',
            deleteOrderDialogMessage: 'Are you sure you want to delete this order?',
            deleteOrderDialogCancelButton: 'Cancel',
            deleteOrderDialogConfirmButton: 'Confirm'
        },
        order: {
            orderDetailsTab: 'Order Details',
            documentsTab: 'Documents'
        },
        orderDocuments: {
            tableTitle: 'Generated Documents',
            tableHeaders: ['Document Type', 'Created By', 'Date Created'],
            docTypeMap: {
                'CI': 'Commercial Invoice',
                'PO': 'Purchase Order',
                'PL': 'Packing List'
            },
            deleteDocumentMessage: 'Are you sure you want to delete this document?',
            deleteDocumentButtonCancel: 'Cancel',
            deleteDocumentButtonConfirm: 'Delete'
        }
    },
    commercialInvoice: {
        createCI: {
            steps: ['Invoice Info', 'Products', 'Review'],
            title: 'Commercial Invoice'
        },
        createCIDetailsForm: {
            invoiceNumber: 'Invoice Number',
            invoiceDate: 'Invoice Date',
            importer: 'Importer',
            importerAddress: 'Importer Address',
            exporter: 'Exporter',
            exporterAddressLabel: 'Exporter Address',
            countryOfManufacture: 'Country of Manufacture',
            buttonCancel: 'Cancel',
            buttonNext: 'Next: Product Info'
        },
        createCIAdditionalInfo: {
            title: 'Additional Information (Optional)',
            additionalNotes: 'Additional Notes',
            salesContract: 'Sales Contract Number',
            paymentReference: 'Payment Reference',
            portOfLoading: 'Port of Loading',
            portOfDestination: 'Port of Destination'
        },
        createCIProductInfo: {
            ordersLabel: 'Purchase Orders',
            currencyLabel: 'Currencies',
            marksLabel: 'Marks and Numbers',
            buttonPrev: 'Back: Invoice Details',
            buttonNext: 'Next: Review'
        },
        createCIProductTable: {
            defaultHeaders: ['Item Ref', 'Product Description', null, null, 'Quantity', 'Unit', 'Unit Price', 'Amount'],
            totalQuantity: 'Total:'
        },
        createCIPreview: {
            buttonPrev: 'Back: Product Info',
            buttonNext: 'Submit'
        }
    },
    packingList: {
        createPL: {
            steps: ['Packing List', 'Product Info', 'Review'],
            title: 'Packing List'
        },
        createPLDetailsForm: {
            plRefLabel: 'Packing List Number',
            dateLabel: 'Packing List Date',
            notesLabel: 'Notes',
            cancelButton: 'Cancel',
            nextButton: 'Next: Product Data'
        },
        createPLProductInfo: {
            measurementUnitLabel: 'Measurement Unit',
            weightUnitLabel: 'Weight Unit',
            marksLabel: 'Marks and Numbers',
            prevButton: 'Back: Details',
            nextButton: 'Next: Preview',
            errorMessages: {
                items: 'You must fill at least one row of data.',
                mUnit: 'You must select a measurement unit.',
                wUnit: 'You must select a weight unit.'
            }
        },
        createPLProductTable: {
            defaultHeaders: [
                'Item Ref',
                'Product Description',
                null,
                null,
                'Quantity',
                'Packaging',
                'Net Weight',
                'Gross Weight',
                'Dimension'
            ],
            addRowButton: 'Add',
            totalsText: 'Totals:'
        },
        createPLPreview: {
            prevButton: 'Back: Product Data',
            submitButton: 'Submit'
        }
    },
    shared: {
        downloadButton: {
            buttonText: 'Download',
            dialogTitle: 'Select the file type to download',
            dialogCancel: 'Cancel',
            dialogConfirm: 'Download',
            typeLabel: 'Document Type'
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
                plExists: 'A Packing List already exists for this order'
            }
        },
        addColumnButton: {
            buttonText: 'Add Column',
            dialogTitle: 'Type The Column Name',
            dialogCancel: 'Cancel',
            dialogConfirm: 'Add',
            errorMessage: 'Maximum number of columns reached'
        }
    },
    defaults: {
        documentNames: {
            PO: 'Purchase Order',
            CI: 'Commercial Invoice',
            PL: 'Packing List'
        }
    }
};