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
            clients: 'Clients',
            documents: 'Documents',
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
            steps: ['Order', 'Products', 'Review'],
            newOrder: 'New Order',
        },
        orderDetailsForm: {
            orderReferenceLabel: 'Order Number*',
            dateLabel: 'Order Date',
            clientLabel: 'Client*',
            clientAddressLabel: 'Delivery Address*',
            crdLabel: 'Cargo Ready Date',
            incotermLabel: 'Incoterm',
            paymentMethodLabel: 'Payment Method',
            referenceLabel: 'Order Name or Reference',
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
            prevButton: 'Order Details',
            nextButton: 'Next: Review',
            errorMessages: {
                currency: 'You must select a currency.',
                missingItemInfo: 'Some item is missing information.',
            },
        },
        productTable: {
            defaultHeaders: [
                'Item Ref',
                'Product Description',
                null,
                null,
                'Quantity',
                'Unit Price',
                'Amount',
            ],
            totals: 'Total:',
            addRowButton: 'Add',
        },
        orderPreview: {
            buttonProductInfo: 'Product Info',
            buttonSubmit: 'Submit',
        },
        orderInfoTile: {
            title: 'Order Overview',
            orderLabel: 'Order Number:',
            dateTitle: 'Purchase Order Date:',
            crdTitle: 'CRD:',
            quantityTitle: 'Quantity:',
            incotermTitle: 'Incoterm:'
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
            editButton: 'Edit'
        }
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
        createCIPreview: {
            buttonPrev: 'Back: Product Info',
            buttonNext: 'Submit',
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
            defaultHeaders: [
                'Item Ref',
                'Product Description',
                null,
                null,
                'Quantity',
                'Packaging',
                'Net Weight',
                'Gross Weight',
                'Dimension',
            ],
            addRowButton: 'Add',
            totalsText: 'Totals:',
        },
        createPLPreview: {
            prevButton: 'Back: Product Data',
            submitButton: 'Submit',
        },
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
                'Completed': 'Completed',
                'Exception': 'Exception',
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
