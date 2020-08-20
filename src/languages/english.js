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
            orderNumber: 'Order Number',
            orderDate: 'Order Date',
            from: 'Client',
            fromAddress: 'Delivery Address',
            crd: 'Cargo Ready Date',
            incoterm: 'Incoterm',
            paymentMethod: 'Payment Method',
            reference: 'Order Name or Reference',
            remarks: 'Remarks',
            buttonCancel: 'Cancel',
            buttonNext: 'Next: Product Info'
        },
        shippingInfo: {
            shippingInformation: 'Shipping Information (Optional)',
            deliveryMethod: 'Delivery Method',
            portOfLoading: 'Port of Loading',
            portOfDestination: 'Port of Destination',
            shippingCarrier: 'Shipping Carrier'
        },
        orderProductInfo: {
            currency: 'Currency',
            buttonOrderDetails: 'Order Details',
            buttonReview: 'Next: Review',
            buttonAddColumn: 'Add Column',
            addColumnDialog: 'Choose a Column Name',
            dialogButtonCancel: 'Cancel',
            maxColumnError: 'Maximum number of columns reached.'
        },
        productTable: {
            defaultColumns: ['Item Ref', 'Product Description', 'Quantity', 'Unit', 'Unit Price', 'Amount'],
            total: 'Total:'
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
            exporterAddress: 'Exporter Address',
            countryOfManufacture: 'Country of Manufacture',
            buttonCancel: 'Cancel',
            buttonNext: 'Next: Product Info'
        },
        createCIAdditionalInfo: {
            title: 'Additional Information (Optional)',
            additionalNotes: 'Additional Notes',
            salesContract: 'Sales Contract Number',
            paymentReference: 'Payment Reference'
        },
        createCIProductInfo: {
            ordersLabel: 'Purchase Orders',
            currencyLabel: 'Currencies',
            buttonPrev: 'Back: Invoice Details',
            buttonNext:'Next: Review'
        },
        createCIProductTable: {
            defaultHeaders: ['Item Ref', 'Product Description', null, null, 'Quantity', 'Unit', 'Unit Price', 'Amount'],
            totalQuantity: 'Total:'
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
            typeLabel: 'Document Type'
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