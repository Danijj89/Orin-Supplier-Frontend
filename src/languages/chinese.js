export const CHINESE = {
    login: {
        login: {
            title: '登入',
            footerText: '没账户?',
            emailLabel: '邮件',
            passwordLabel: '密码',
            signInButton: '登入',
            signUpText: '申请成为我们的测试者',
            imageTitle: '外贸出口从未如此轻松',
            imageSubText:
                '轻松的管理客户、订单、和自动化外贸单证。我们帮您们减少外贸的繁琐工作、为您们抽出更多时间赢取新业务 ',
            errorMessages: {
                emailRequired: '请输入邮件',
                passwordRequired: '请输入密码',
                emailOrPasswordWrong: '邮件或密码不符合',
            },
        },
    },
    home: {
        sidePanel: {
            orders: '订单',
            shipments: 'Shipments',
            clients: '客户',
            inventory: '库存',
        },
    },
    order: {
        ordersOverview: {
            newOrder: '新订单',
            columns: [
                '订单',
                '数量',
                '货好日期',
                '客户',
                '采购',
                '生产',
                '验检',
                '备注',
            ],
            deleteOrderDialogMessage: '您确定要删除订单吗?',
            deleteOrderDialogCancelButton: '取消',
            deleteOrderDialogConfirmButton: '确定',
        },
        orderTableRow: {
            deleteOrderDialogMessage:
                'Are you sure you want to delete this order?',
        },
        createOrder: {
            steps: ['订单', '产品'],
            titleLabel: '新订单',
        },
        orderDetailsForm: {
            orderReferenceLabel: '订单号*',
            dateLabel: '订单日期',
            clientLabel: '客户*',
            clientAddressLabel: '客户地址*',
            crdLabel: '货好日期',
            incotermLabel: '贸易条款',
            paymentMethodLabel: '付款模式',
            remarksLabel: '备注',
            cancelButton: '取消',
            nextButton: '下一步',
        },
        shippingInfo: {
            shippingInformation: '运输信息 (可选)',
            deliveryMethod: '运输方法',
            portOfLoading: '起运港',
            portOfDestination: '目的港',
            shippingCarrier: '运输代理',
        },
        orderProductInfo: {
            currencyLabel: '货币',
            saveItemsLabel: 'Save New Items To Inventory',
            prevButton: '订单详情',
            nextButton: '确定并完成',
            errorMessages: {
                items: '必须完整的填写起码一行资料.',
                currency: '必须选择货币.',
            }
        },
        productTable: {
            totals: '合计:',
            addRowButton: '添加',
            headerLabelsMap: {
                'Item Ref': 'Item Ref',
                'Product Description': 'Product Description',
                'Quantity': 'Quantity',
                'Unit Price': 'Unit Price',
                'Amount': 'Amount'
            }
        },
        orderInfoTile: {
            title: '订单详情',
            orderLabel: '订单号码:',
            dateTitle: '订单日期:',
            crdTitle: '货好日期:',
            quantityTitle: '数量:',
            incotermTitle: '贸易条款:',
            remarksLabel: 'Remarks',
            companyNameLabel: 'To:',
            companyAddressLabel: 'Address:',
            totalAmountLabel: 'Amount:'
        },
        order: {
            orderDetailsTab: '订单详情',
            documentsTab: '单证',
        },
        orderStatusInfoTile: {
            title: '订单进度',
            headers: ['采购', '生产', '验检'],
            rowLabels: ['状态', '预计完成', '实际完成'],
        },
        orderDocuments: {
            tableTitle: '已生成的单据',
            tableHeaders: ['单据类型', '制作者', '生成日期'],
            docTypeMap: {
                CI: '业务发票',
                PO: '订单',
                PL: '装箱单',
            },
            deleteDocumentMessage: '您确定要删除此单据吗?',
            deleteDocumentButtonCancel: '取消',
            deleteDocumentButtonConfirm: '删除',
        },
        orderInfoCard: {
            editButton: '编辑',
        },
        orderProductTable: {
            tableTitleLabel: 'Product Table',
            editButtonLabel: 'Edit',
            addRowButton: 'Add',
            errorMessages: {
                currencyRequired: 'You must select a currency.',
                missingItemInfo: 'Some item is missing information.'
            }
        }
    },
    commercialInvoice: {
        createCI: {
            steps: ['发票信息', '货物信息', '审核'],
            title: '业务发票',
        },
        createCIDetailsForm: {
            invoiceNumber: '发票号码*',
            invoiceDate: '发票日期',
            importer: '进口商',
            importerAddress: '进口商地址',
            exporter: '出口商',
            exporterAddressLabel: '出口商地址',
            countryOfManufacture: '制造国家',
            buttonCancel: '取消',
            buttonNext: '下步: 货物信息',
        },
        createCIAdditionalInfo: {
            title: '额外信息 (可选)',
            additionalNotes: '备注',
            salesContract: '销售合同号码',
            paymentReference: '付款编号',
            portOfLoading: '起运港',
            portOfDestination: '目的港',
        },
        createCIProductInfo: {
            ordersLabel: '订单号码',
            currencyLabel: '货币',
            marksLabel: '唛头',
            buttonPrev: '上一步: 发票信息',
            buttonNext: '下一步: 审核',
            errorMessages: {
                poRefs: '必须起码填写一个订单号.',
                currency: '必须选择货币.',
                atLeastOneOrder: '必须起码填写一个订单号.',
                missingItemInfo: '有列行缺少信息，请补充并继续',
            },
        },
        createCIProductTable: {
            totalQuantity: '合计:',
            addRowButton: '添加',
        }
    },
    packingList: {
        createPL: {
            steps: ['装箱单信息', '货物信息', '审核'],
            title: '装箱单',
        },
        createPLDetailsForm: {
            plRefLabel: '装箱单号*',
            dateLabel: '装箱单日期',
            notesLabel: '备注',
            cancelButton: '取消',
            nextButton: '下一步: 产品信息',
        },
        createPLProductInfo: {
            measurementUnitLabel: '计量单位',
            weightUnitLabel: '重量单位',
            marksLabel: '唛头',
            prevButton: '上一步: 装箱单信息',
            nextButton: '下一步: 审核',
            errorMessages: {
                items: '必须完整的填写起码一行资料',
                mUnit: '必须选择货币单位',
                wUnit: '必须选择重量单位',
            },
        },
        createPLProductTable: {
            addRowButton: '添加',
            totalsText: '合计:',
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
            buttonText: '下载',
            dialogTitle: '请选择下载文件类型',
            dialogCancel: '取消',
            dialogConfirm: '下载',
            typeLabel: '文件类型',
        },
        generateDocumentButton: {
            buttonText: '产生单证',
            dialogTitle: '请选择想产生的单据',
            dialogCancel: '取消',
            dialogConfirm: '产生',
            typeLabel: '单据类型',
            errors: {
                ciFirst: '请先建立业务发票',
                ciExists: '业务发票已经存在',
                plExists: '装箱单已经存在',
            },
        },
        addColumnButton: {
            buttonText: '添加直行',
            dialogTitle: '填写直行名称',
            fieldLabel: '直行名称',
            dialogCancel: '取消',
            dialogConfirm: '添加',
            errorMessage: '已经达到最多直行数目',
        },
        documentTag: {
            docTypesAcronyms: {
                PO: 'PO',
                CI: 'CI',
                PL: 'PL',
            },
        },
        featureInProgressTag: {
            title: '开发功能中',
        },
        deleteButton: {
            cancelButton: '取消',
            confirmButton: '确定',
        },
        statusButtonMenu: {
            orderStatusLabelsMap: {
                'Not Started': '未开始',
                'In Progress': '进行中',
                Completed: '完毕',
                Exception: '意外/延迟',
            },
        },
    },
    defaults: {
        documentNames: {
            PO: '订单',
            CI: '业务发票',
            PL: '装箱单',
        },
    },
};
