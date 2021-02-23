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
                '轻松的管理客户、订单、和自动化外贸单证。我们帮您们减少外贸的繁琐工作、为您们抽出更多时间赢取新业务',
            errorMessages: {
                emailRequired: '请输入邮件',
                passwordRequired: '请输入密码',
                emailOrPasswordWrong: '邮件或密码不符合',
            },
        },
        register: {
            formLabels: {
                firstName: '名',
                lastName: '姓',
                email: '邮件',
                password: '密码',
                confirmPassword: '确认密码'
            }
        }
    },
    dashboard: {
        dashboard: {
            title: '仪表板',
        },
        ordersStats: {
            new: '新订单',
            inProcurement: '采购中',
            inProduction: '生产中',
            inQA: '验检中',
            exception: '意外',
            completed: '7天内完毕',
            title: '订单总结',
        },
        orderCountGraph: {
            title: '订单量',
        },
        orderRevenueGraph: {
            title: '订单金额',
            cny: '人民币',
            eur: '欧元',
            usd: '美金',
        },
        leads: {
            title: '销售线索',
            newLeads: '新线索',
            wipLeads: '销售中',
            blockedLeads: '无法成交',
            closedLeads: '近7天赢得',
        },
        clients: {
            title: '客户',
            newClients: '新客户',
            totClients: '总客户',
        },
        crdStats: {
            title: '货好日期',
            crdOT: '按时率',
            crdDiff: '平均日差',
        },
    },
    admin: {
        admin: {
            tabsLabelsMap: {
                resources: 'Resources',
                permissions: 'Permissions',
                roles: 'Roles',
                users: 'Users',
                companies: 'Companies',
            },
            permissions: {
                newPermissionButton: {
                    buttonLabel: 'New Permission',
                    dialogTitle: 'Permission Info',
                    dialogSubmit: 'Create',
                    formLabels: {
                        _id: 'Permission Name',
                        resource: 'Resource',
                        action: 'Action',
                        attributes: 'Attributes',
                    },
                },
                tableHeaderLabels: {
                    _id: 'Name',
                    resource: 'Resource',
                    action: 'Action',
                    attributes: 'Attributes',
                },
            },
            resources: {
                newResourceButton: {
                    buttonLabel: 'New Resource',
                    dialogTitle: 'Resource Info',
                    dialogSubmit: 'Create',
                    formLabels: {
                        _id: 'Resource Name',
                    },
                },
                tableHeaderLabels: {
                    _id: 'Name',
                },
            },
            roles: {
                newRoleButton: {
                    buttonLabel: 'New Role',
                    dialogTitle: 'Role Info',
                    dialogSubmit: 'Create',
                    formLabels: {
                        _id: 'Role Name',
                        company: 'Company',
                    },
                },
                tableHeaderLabels: {
                    _id: 'Role Name',
                },
                dialogTitleLabel: 'Role Permissions',
                dialogSubmitLabel: 'Update',
            },
            users: {
                companyLabel: 'Company',
                dialogTitleLabel: 'User Roles',
                dialogSubmitLabel: 'Update',
                tableHeaderLabels: {
                    name: 'Name',
                    email: 'Email',
                    roles: 'Roles',
                },
                newUserButton: {
                    buttonLabel: 'New User',
                    dialogTitleLabel: 'New User',
                    dialogSubmitLabel: 'Create',
                },
            },
            companies: {
                tableHeaderLabels: {
                    name: 'Name',
                    industries: 'Industries',
                    city: 'City',
                },
                newCompanyButton: {
                    buttonLabel: 'New Company',
                    dialogTitleLabel: 'Company Info',
                    dialogSubmitLabel: 'Create',
                },
            },
            adminUserDialog: {
                formLabels: {
                    name: 'Name',
                    email: 'Email',
                    password: 'Password',
                    confirmPassword: 'Confirm Password',
                    company: 'Company',
                    roles: 'Roles',
                },
            },
            adminCompanyDialog: {
                formLabels: {
                    type: 'Type',
                    name: 'Name',
                    address: 'Address',
                    address2: 'Address 2',
                    city: 'City',
                    administrative: 'State',
                    country: 'Country',
                    zip: 'Zip Code',
                    phone: 'Phone',
                    email: 'Email',
                    taxNumber: 'Tax Number',
                    currency: 'Default Currency',
                    industries: 'Industries',
                },
            },
        },
    },
    home: {
        navbar: {
            tabsLabelsMap: {
            orders: '订单',
                shipments: '运输',
                leads: '线索',
                clients: '客户',
                products: '产品',
                admin: '管理',
                settings: '设置',
                dashboard: '数据',
                signOut: '推出登入',
            },
            helloMessageLabel: '您好',
        },
        settings: {
            tabsLabelsMap: {
                account: '账号',
                colleagues: '公司人员',
                company: '公司',
            },
        },
        accountDetails: {
            titleLabel: '账户设置',
            nameLabel: '姓名',
            emailLabel: '邮件',
            editButtonLabel: '编辑',
            dialogTitleLabel: '账户',
            dialogSubmitLabel: '确定',
        },
        companyDetails: {
            editButtonLabel: '编辑',
            dialogTitleLabel: '编辑公司',
            dialogSubmitLabel: '公司',
            addressesTableTitleLabel: '地址',
            editAddressDialogTitleLabel: '编辑地址',
            editAddressDialogSubmitLabel: '更新地址',
            newAddressButtonLabel: '新地址',
            newAddressDialogTitleLabel: '新地址',
            newAddressDialogSubmitLabel: '创建新地址',
            taxNumberLabel: '企业号',
            currencyLabel: '默认货币',
            industriesLabel: '行业',
            emailLabel: '公司邮件',
            phoneLabel: '公司电话',
            tabsLabelsMap: {
                addresses: '地址',
                bankDetails: '银行信息',
            },
            bankDetails: {
                titleLabel: '银行账户信息',
                dialogTitleLabel: '编辑银行账户信息',
                dialogSubmitLabel: '编辑',
                tableHeaderLabelsMap: {
                    detail: '银行账户信息',
                },
            },
            bankDetailDialog: {
                detailLabel: '银行账户信息',
                deleteMessage: '您确认有删除公司银行信息？',
            },
            newBankDetailButton: {
                buttonLabel: '添加银行信息',
                dialogTitleLabel: '创建银行信息',
                dialogSubmitLabel: '创建',
            },
        },
        newAddressButton: {
            typeLabel: '地址类型',
            nameLabel: '公司名称',
            addressLabel: '地址（第一行）',
            address2Label: '地址（第二行）',
            cityLabel: '城市',
            administrativeLabel: '省区',
            countryLabel: '国际或地区',
            zipLabel: '邮政编码',
            phoneLabel: '电话',
            emailLabel: '邮件',
        },
        resetPasswordButton: {
            resetButtonLabel: '重设密码',
            dialogTitleLabel: '重设密码',
            dialogSubmitLabel: '重设',
            passwordLabel: '久密码',
            newPasswordLabel: '新密码',
            confirmPasswordLabel: '确认新密码',
        },
        companyUsers: {
            titleLabel: '公司人员设置',
            inactivateUserButtonLabel: '取消账户',
            activateUserButtonLabel: '激活账户'
        },
        newUserButton: {
            formLabels: {
                name: '姓名',
                email: '邮件',
                password: '密码',
                confirmPassword: '确定密码',
                role: '职位'
            },
            titles: {
                newUser: '新用户',
                rolePicker: '职位'
            },
            buttons: {
                newUser: '要求新用户',
                newUserSubmit: '要求'
            },
            errorMessages: {
                missingName: '请填写新用户姓名.',
                missingEmail: '请填写新用户邮件.',
                missingPassword: '请填写新用户首次密码.',
                confirmPasswordMismatch: '密码和确认密内容值不符合.',
                missingRole: '请填写新用户职位.'
            }
        }
    },
    client: {
        clientOverview: {
            newClientButtonLabel: '新客户',
            newClientDialogTitleLabel: '添加新客户',
            newClientSubmitButtonLabel: '添加新客户',
            clientTableHeadersMap: {
                name: '公司',
                contactName: '联系人姓名',
                contactEmail: '邮件',
                lastOrder: '最近订单',
                orderCountYTD: '年度订单量',
                assignedTo: '业务员',
                notes: '备注',
            },
        },
        clientDetails: {
            clientDetailsDataDisplay: {
                formLabels: {
                    assignedTo: '业务员',
                    primaryContact: '主要联络人',
                    contactEmail: '邮件',
                    taxNumber: '企业或税号',
                    source: '来源',
                    incoterm: '默认条款',
                    payment: '默认付款模式',
                    clientSince: '客户历史',
                },
            },
            notesLabel: '备注',
            tabsLabelsMap: {
                addresses: '地址',
                contacts: '联系人',
                orders: '订单',
            },
            editClientButton: {
                buttonLabel: '编辑',
                dialogTitleLabel: '编辑客户',
                dialogSubmitLabel: '确定',
            },
            clientAddressCards: {
                addressesTableTitleLabel: '地址',
                editAddressDialogTitleLabel: '编辑地址',
                editAddressDialogSubmitLabel: '更新地址',
            },
            clientContactsTable: {
                contactTableHeadersMap: {
                    name: '姓名',
                    email: '邮件',
                    phone: '电话',
                    fax: '传真',
                    title: '职位',
                    department: '部门',
                    additional: '更多',
                },
                editDialogTitleLabel: '编辑客户',
                editDialogSubmitLabel: '确定',
                newDialogTitleLabel: '新客户',
                newDialogSubmitLabel: '添加',
                newButtonLabel: '添加客户',
                defaultButtonLabel: '默认',
                setDefaultButtonLabel: '设置默认',
            },
            clientOrdersTable: {
                ordersTableHeadersMap: {
                    ref: '订单号',
                    clientRef: '客户编号',
                    crd: '约定货好时间',
                    realCrd: '时间货好时间',
                    totalQ: '数量',
                    totalA: '金额',
                    del: '运输模式',
                },
            },
        },
    },
    product: {
        overview: {
            newProductButton: {
                buttonLabel: '新产品',
                dialogTitleLabel: '添加新产品',
                dialogSubmitLabel: '创建新产品',
            },
            productTable: {
                tableHeadersMap: {
                    sku: 'SKU',
                    name: '产品名称',
                    description: '产品描述',
                    lastOrder: '最近订单',
                    orderCountYTD: '年度订单',
                    hsc: 'HS 编码',
                },
                editDialogTitleLabel: '编辑产品',
                editDialogSubmitLabel: '确定',
            },
        },
    },
    lead: {
        overview: {
            newLeadButton: {
                buttonLabel: '新销售线索',
                dialogTitleLabel: '新销售线索',
                dialogSubmitLabel: '创建',
            },
            leadDialog: {
                formLabels: {
                    name: '公司名称',
                    contactName: '主要联系人',
                    contactEmail: '主要联系人邮件',
                    phone: '电话',
                    source: '来源',
                    assignedTo: '业务员',
                },
            },
            leadsTable: {
                tableHeaders: {
                    name: '客户名称',
                    contactName: '联系人',
                    contactEmail: '邮件',
                    salesStatus: '销售阶段',
                    leadType: '线索级别',
                    source: '来源',
                    quotation: '报价日期',
                    sample: '样板日期',
                    lastContact: '最近联系日期',
                    assignedTo: '业务员',
                    notes: '备注',
                },
            },
        },
        lead: {
            tabsLabelsMap: {
                details: '详情',
                addresses: '地址',
            },
            leadDetails: {
                formLabels: {
                    name: '公司',
                    contactName: '联系人姓名',
                    contactEmail: '邮件',
                    phone: '电话',
                    additional: '其他联系方式',
                    source: '来源',
                    quotation: '报价日期',
                    sample: '样板日期',
                    lastContact: '最近联系日期',
                    assignedTo: '业务员',
                    notes: '备注',
                    salesStatus: '销售阶段',
                    leadType: '线索级别',
                    leadPotential: '线索潜力',
                },
                createdAtLabel: '创建于',
                leadInfoTitleLabel: '线索信息',
                salesInfoTitleLabel: '销售信息',
                saveButtonLabel: '保存',
                deleteMessage: '您确定要删除这条销售线索吗',
                convertButtonLabel: '转为客户',
            },
            leadAddresses: {
                newLeadAddressButton: {
                    buttonLabel: '新地址',
                    dialogTitleLabel: '新线索地址',
                    dialogSubmitLabel: '添加',
                },
                editDialogTitleLabel: '编辑线索',
                editDialogSubmitLabel: '保存',
            },
        },
    },
    order: {
        ordersOverview: {
            newOrderButtonLabel: '新订单',
            ordersTableHeadersMap: {
                ref: '订单号',
                totalQ: '数量',
                crd: '货好日期',
                toName: '客户',
                procurement: '采购',
                production: '生产',
                qa: '验检',
                notes: '备注',
            },
            shippingPlanTableHeaders: {
                ref: '销售订单',
                quantity: '数量',
                crd: '货好日期',
                procurement: '采购',
                production: '生产',
                qa: '验检',
                notes: '备注',
            }
        },
        createOrder: {
            stepLabelsMap: {
                details: '订单',
                products: '产品',
            },
            titleLabel: '新订单',
            createOrderDetails: {
                prevButtonLabel: '取消',
                nextButtonLabel: '下一步: 产品',
            },
            createOrderProducts: {
                prevButtonLabel: '上一步: 详情',
                nextButtonLabel: '确定',
            },
        },
        order: {
            tabsLabelsMap: {
                details: '订单详情',
                products: '产品',
            },subTabsLabels: {
                products: '产品',
                documents: '单证',
                status: '状态和备注'
            },
            titles: {
                details: '订单详情',
                productTable: '产品',
                fulfillmentPlan: '交货表',
                editDetailsDialog: '编辑订单',
                editProductsDialog: '产品',
                splitStatus: '订单进度',
                editSplitStatusDialog: '订单状态',
                procurement: '采购',
                production: '生产',
                qa: '验检',
                notes: '备注',
                documentCard: '运输 No:',
            },
            labels: {
                orderReference: '订单号码',
                company: '卖家',
                date: '订单日期',
                crd: '货好日期',
                incoterm: '贸易条款',
                quantity: '数量',
                client: '买家',
                author: '制造者',
                realCrd: '实际货好日期',
                paymentMethod: '付款模式',
                total: '总',
                status: '状态',
                estimated: '预计完毕',
                actual: '实际完毕',
                clientRef: '客户编号',
                noOrder: '订单没未安排运输',
            },
            tableHeaderLabels: {
                procurement: '采购',
                production: '生产',
                qa: '验检',
            },
            buttons: {
                editDetails: '编辑',
                submitDetails: '更新',
                editProducts: '编辑',
                submitProducts: '更新',
                editFulfillment: '编辑交货表',
                editSplitStatus: '编辑',
                submitSplitStatus: '更新',
                generateExcel: '生成 Excel',
                generatePdf: '生成 PDF',
            },
            orderProductTable: {
                tableHeaderLabelsMap: {
                    ref: '产品编号',
                    description: '产品描述',
                    quantity: '数量',
                    unit: '单位',
                    price: '单价',
                    total: '总额',
                },
                totalLabel: '总：',
            },
            editFulfillmentPlan: {
                labels: {
                    newSplitButton: '添加分批',
                    cancelButton: '取消',
                    submitButton: '确定',
                    crd: '货好日期',
                    emptyDateLabel: '没日期',
                    clientRef: '客户编号'
                },
                tableHeaderLabels: {
                    ref: 'SKU',
                    description: '描述',
                    quantity: '数量',
                    allocated: '已安排'
                },
                errorMessages: {
                    itemOverflow: (ref, diff) => `产品编号 ${ ref } 有输入 ${ diff } 过多的数量.`,
                    itemTooFew: (ref, diff) => `产品编号 ${ ref } 有缺少 ${ diff } 的数量.`,
                    emptySplit: '请删除空的分批.',
                    baseSplitDeletion: '不能删除原始订单.'
                }
            },
            errorMessages: {
                orderWasDeleted: '您选的订单已不存在.',
            },
        },
    },
    shipment: {
        overview: {
            newShipmentButtonLabel: '新运输',
            shipmentsTable: {
                tableHeadersMap: {
                    ref: '运输编号',
                    consignee: '收货人',
                    crd: '货好日期',
                    status: '状态',
                    pod: '目的港',
                    del: '运输模式',
                    containerQ: '货柜',
                },
            },
        },
        createShipment: {
            titles: {
                newTitle: '新运输',
                editTitle: '编辑',
            },
            labels: {
                companyAddress: 'Shipper / 卖家',
                client: 'Consignee / 买家',
                clientAddress: '买家地址',
            },
            tableHeaderLabels: {
                ref: '销售订单',
                clientRef: '客户编号',
                quantity: '数量',
                crd: '货好日期',
                del: '运输模式',
                production: '生产',
                qa: '验检',
                notes: '备注',
                fulfilled: '% 已出货',
            },
            prevButtonLabel: '取消',
            nextButtonLabel: '确定',
            errorMessages: {
                missingSupplierAddress: '请填写卖家地址.',
                missingConsignee: '请选择买家.',
                missingConsigneeAddress: '请填写买家地址.',
                atLeastOneOrder: '必须选择起码一个订单.',
            },
        },
        shipment: {
            tabLabels: {
                orders: '运输订单',
                documents: '单证',
            },
            buttons: {
                editShipment: '编辑运输信息',
                editShipmentOrders: '改变已包括的订单'
            },
            titles: {
                shipmentInfo: '运输信息',
                documentStatus: '单证状态'
            },
            labels: {
                status: '状态',
                crd: '货好日期',
                del: '运输模式',
                carrier: '运输代理',
                pol: '起运港',
                pod: '目的港',
                etd: '预计出发',
                eta: '预计到达',
                docCutOff: '单证截日',
                bol: '提单号码',
                bolType: '提单放行类型',
                released: '提单放行',
                releasedYes: '是',
                releasedNo: '否'
            },
            tableHeaderLabels: {
                ref: '销售订单',
                clientRef: '客户编号',
                quantity: '数量',
                crd: '货好日期',
                del: '运输模式',
                production: '生产',
                qa: '验检',
                fulfilled: '已出货 %',
            },
            documentTableHeaders: {
                ref: '单证 No.',
                type: '单证种类',
                createdAt: '生成时间',
                createdBy: '制造者',
                excel: '下载 Excel',
                pdf: '下载 PDF',
            },
            documentButton: {
                buttonLabel: '生成单证',
                dialogTitleLabel: '请选想生成的单证',
                submitButtonLabel: '继续',
                formLabels: {
                    document: '单证',
                },
            },
            messages: {
                documentDeleteMessage: '您确认要删除这个文件吗?',
            },
            errorMessages: {
                shipmentNonExistent: '这个运输已不存在.'
            }
        },
        editShipment: {
            tabLabels: {
                shipment: '运输',
                products: '产品',
                measures: '尺寸',
            },
            titles: {
                shipment: '运输信息',
                parties: '参与方',
                orderInfo: '订单信息',
                shipping: '运输信息',
                containers: '货柜类型',
                documentStatus: '单证状态'
            },
            buttons: {
                back: '回上一页',
                submit: '确定',
                cancel: '取消',
                containersSubmit: '确定',
                containers: '请选择货柜类型',
            },
            formLabels: {
                sellerAdd: '卖方',
                consigneeAdd: '买方',
                shipAdd: '发货地址',
                crd: '货好日期',
                incoterm: '贸易条款',
                clientRef: '客户订单号.',
                payRefs: '付款编号',
                coo: '制造国家',
                clientRefs: '客户其他编号',
                del: '运输模式',
                pol: '起运港',
                pod: '目的港',
                carrier: '货代',
                eta: '预计到达',
                etd: '预计出发',
                docCutOff: '单证截日',
                bol: '提单',
                bolType: '提单类型',
                released: '已放行',
            },
            tableHeaderLabels: {
                type: '货柜类型',
                quantity: '数量',
            },
            messages: {
                deleteShipment: '您确定要删除这个运输吗?'
            },
            errorMessages: {
                missingSellerAdd: '必须选择卖方地址.',
                missingConsigneeAdd: '必须选择买方地址.',
            },
            measureTable: {
                cancelButtonLabel: '取消',
                submitButtonLabel: '确定',
            },
            consolidationTable: {
                cancelButtonLabel: '取消',
                submitButtonLabel: '确定',
            },
        },
    },
    documents: {
        ci: {
            details: {
                titleLabel: '业务发票详情',
                formLabels: {
                    autoGenerateRef: '知道生成发票号',
                    ref: '发票号',
                    sellerAdd: '卖家地址',
                    consignee: '客户',
                    consigneeAdd: '客户地址',
                    crd: '货好日期',
                    coo: '制造国',
                    incoterm: '贸易条款',
                    clientRefs: '客户PO编号',
                    payRefs: '付款编号',
                    scRef: '业务员',
                    pol: '起运港',
                    pod: '目的港',
                    notes: '备注',
                },
                prevButtonLabel: '取消',
                nextButtonLabel: '下一步',
            },
            products: {
                titleLabel: '发票产品',
                prevButtonLabel: '详情',
                nextButtonLabel: '产生',
            },
        },
        pl: {
            details: {
                titleLabel: '装箱单详情',
                formLabels: {
                    autoGenerateRef: '自动生成装箱单号',
                    ref: '装箱单号码',
                    sellerAdd: '卖家地址',
                    consignee: '客户',
                    consigneeAdd: '客户地址',
                    shipAdd: '发货地址',
                    ciRef: '发票号',
                    scRef: '合同号',
                    pol: '起运港',
                    pod: '目的港',
                    notes: '备注',
                },
                prevButtonLabel: '取消',
                nextButtonLabel: '下一步',
            },
            products: {
                titleLabel: '装箱单产品',
                prevButtonLabel: '详情',
                nextButtonLabel: '生成',
            },
        },
        sc: {
            details: {
                titleLabel: '销售合同详情',
                formLabels: {
                    autoGenerateRef: '自动生成合同号',
                    ref: '合同号',
                    sellerAdd: '卖家地址',
                    consignee: '客户',
                    consigneeAdd: '客户地址',
                    date: '日期',
                    bankDetails: '银行信息',
                    termsOfPayment: '付款条件',
                    timeOfShipment: '发货期',
                    insurance: '保险',
                    customText: '而外条件（可选）',
                    pol: '起运港',
                    pod: '目的港',
                    notes: '包装',
                },
                prevButtonLabel: '取消',
                nextButtonLabel: '下一步',
            },
            products: {
                titleLabel: '合同产品',
                prevButtonLabel: '详情',
                nextButtonLabel: '生成',
            },
        },
        ce: {
            details: {
                titleLabel: '出口报关单',
                formLabels: {
                    autoGenerateRef: '自动生成编号',
                    ref: '出口报关单编号',
                    sName: '境内发货人',
                    sTaxCode: '境内发货人企业号',
                    cName: '境外收货人',
                    mName: '生产销售单位',
                    mTaxCode: '生产销售单位企业号',
                    supervision: '监管方式',
                    exemption: '征免性质',
                    tradingCountry: '贸易国（地区）',
                    destCountry: '运抵国（地区）',
                    packageTypes: '包装种类',
                    packageUnits: '件数',
                    pol: '离境口岸',
                    pod: '指运港',
                    totNetWeight: '净重（千克）',
                    totGrossWeight: '毛重（千克）',
                    incoterm: '成交方式',
                },
                prevButtonLabel: '取消',
                nextButtonLabel: '下一步',
            },
            optional: {
                titleLabel: '海关出口单 (可选)',
                formLabels: {
                    exPort: '出口口岸',
                    del: '运输方式',
                    bol: '提运单号',
                    scRef: '合同协议号',
                    containerNum: '集装箱号及对应商品关系：',
                },
                prevButtonLabel: '上一步',
                nextButtonLabel: '下一步',
            },
            products: {
                titleLabel: '产品',
                prevButtonLabel: '上一步',
                nextButtonLabel: '生成',
            },
        },
    },
    shared: {
        wrappers: {
            formDialog: {
                cancelLabel: '取消',
            },
        },
        forms: {
            userDialog: {
                nameLabel: '姓名',
                emailLabel: '邮件',
            },
            resetPasswordDialog: {
                formLabels: {
                    newPassword: '新密码',
                    confirmNewPassword: '确认新密码',
                    code: '一次性密码',
                },
                buttons: {
                    resetCode: '发送一次性密码'
                },
                errorMessages: {
                    confirmPasswordMismatch: '密码和确认密码内容不符合.'
                }
            },
            companyDialog: {
                taxNumberLabel: '企业号',
                currencyLabel: '默认货币',
                industriesLabel: '行业',
            },
            addressDialog: {
                typeLabel: '地址标签',
                nameLabel: '公司名称',
                addressLabel: '地址 （第一行）',
                address2Label: '地址 （第二行）',
                cityLabel: '城市',
                administrativeLabel: '省区',
                countryLabel: '国际或地区',
                zipLabel: '邮政编码',
                phoneLabel: '电话',
                emailLabel: '邮件',
                deleteMessage: '您确定要删除这个地址吗？',
            },
            clientDialog: {
                nameLabel: '公司名称',
                assignedToLabel: '业务员',
                contactNameLabel: '主要联系人姓名',
                contactEmailLabel: '联系人邮件',
                taxNumberLabel: '企业号',
                sourceLabel: '来源',
                incotermLabel: '默认贸易条款',
                paymentTermLabel: '默认付款模式',
                notesLabel: '备注',
                deleteMessage: '您确定要删除这个客户吗？',
            },
            contactDialog: {
                nameLabel: '姓名',
                emailLabel: '邮件',
                phoneLabel: '电话',
                faxLabel: '传真',
                titleLabel: '职位',
                departmentLabel: '部门',
                additionalLabel: '额外信息',
                deleteMessage: '您确定要删除这个联系人吗?',
            },
            productDialog: {
                autoGenerateRefLabel: '自动生成编号',
                skuLabel: 'SKU',
                nameLabel: '产品名称',
                descriptionLabel: '产品描述 (英文)',
                localDescriptionLabel: '产品描述 (中文)',
                hscLabel: 'HS 编码',
                deleteMessage: '您确定要删除这个产品吗?',
            },
            orderDetailsDialog: {
                deleteMessage: '您确定要删除这个订单吗?',
            },
        },
        rhf: {
            forms: {
                orderDetails: {
                    detailsTitleLabel: '订单详情',
                    shippingInfoTitleLabel: '运输详情 (可选))',
                    formLabels: {
                        archived: '标记为已完成',
                        autoGenerateRef: '自动生成编号',
                        ref: '订单号码',
                        date: '订单日期',
                        fromAdd: '卖家地址',
                        to: '买家',
                        toAdd: '买家地址',
                        crd: '货好日期',
                        realCrd: '实际货好日期',
                        incoterm: '贸易条款',
                        pay: '付款模式',
                        clientRef: '客户编号',
                        notes: '备注',
                        shipAdd: '发货地址',
                        del: '运输模式',
                        pol: '起运港',
                        pod: '目的港',
                        carrier: '运输代理',
                    },
                },
                productTable: {
                    formLabels: {
                        currency: '货币',
                        saveItems: '保存新产品',
                    },
                    totalLabel: '总:',
                    notInOrderLabel: '无',
                    tableHeaderLabels: {
                        order: '订单号',
                        ref: '产品编号',
                        description: '产品描述',
                        quantity: '数量',
                        unit: '单位',
                        price: '单价',
                        total: '金额',
                    },
                    marksPlaceholderLabel: '唛头',
                    errorMessages: {
                        missingCurrency: '请选择货币',
                        missingCustomColumnName: '请添加colunmn名称',
                        missingItemInfo: '有产品缺少信息',
                        missingItems: '请选择产品',
                    },
                },
                measureTable: {
                    formLabels: {
                        measurementUnit: '尺寸单位',
                        weightUnit: '重量单位',
                    },
                    tableHeaderLabels: {
                        ref: '产品编号',
                        description: '产品描述',
                        package: '包装',
                        pUnit: '包装单位',
                        netW: '淨重',
                        grossW: '毛重',
                        dim: '尺寸',
                    },
                    totalLabel: '总:',
                    marksLabel: '唛头',
                    errorMessages: {
                        missingMeasurementUnit: '请选择尺寸单位',
                        missingWeightUnit: '请选择重量单位',
                        missingCustomColumnName: '请填写column名称',
                        missingItemInfo: '有产品缺少信息',
                        missingItems: '请选择产品',
                    },
                },
                consolidationTable: {
                    formLabels: {
                        measurementUnit: '尺寸单位',
                        weightUnit: '重量单位',
                    },
                    tableHeaderLabels: {
                        description: '产品描述',
                        localD: '中文描述',
                        hsc: 'HS 编号',
                        dg: '危险物品',
                        package: '包装',
                        pUnit: '单位',
                        netW: '淨重',
                        grossW: '毛重',
                        dim: '尺寸',
                    },
                    totalLabel: '总:',
                    errorMessages: {
                        missingCustomColumnName: '请填写column名称',
                    },
                },
                chinaExportTable: {
                    tableHeaderLabels: {
                        hsc: 'HS 编号',
                        localD: '中文产品描述',
                        quantity: '数量',
                        unit: '单位',
                        price: '单价',
                        total: '总价',
                        currency: '币制',
                        coo: '原产地',
                        fdc: '最终目的国',
                        dop: '境内货源地 ',
                    },
                    totalLabel: '总:',
                    marksPlaceholderLabel: '随附单证及编号',
                    errorMessages: {
                        missingItemInfo: '有产品缺少信息',
                        missingItems: '请选择产品',
                    },
                },
            },
        },
        components: {
            table: {
                paginationAllLabel: '全部',
                rowsPerPageLabel: '每页行数',
                tools: {
                    filter: {
                        filterPopoverButtonLabel: '筛选',
                        clearButtonLabel: '清除赛选',
                        saveButtonLabel: '保存',
                        filters: {
                            dateFilter: {
                                emptyLabel: '请选日期...',
                                startLabel: '开始',
                                endLabel: '结束',
                            },
                            textFilter: {
                                searchTermLabel: '搜索文字',
                            },
                            rangeFilter: {
                                minLabel: '最低',
                                maxLabel: '最高',
                            },
                        },
                    },
                    archive: {
                        includeLabel: '包括已存档的订单?',
                    },
                },
            },
            editableTable: {
                addRowButtonLabel: '添加',
            },
            notFound: {
                message: '404 - 未找到!',
                homeButtonLabel: '回到首页',
            },
            addressCard: {
                typeLabel: '标签:',
                phoneLabel: '电话:',
                emailLabel: '邮件:',
                editButtonLabel: '编辑',
                deleteButtonLabel: '删除',
                defaultButtonLabel: '默认',
                setDefaultButtonLabel: '设置为默认',
            },
            textAreaCard: {
                submitLabel: '确定',
            },
            errorPage: {
                backButtonLabel: '回上一页',
            },
        },
        buttons: {
            deleteButton: {
                cancelButton: '取消',
                confirmButton: '确定',
                deleteButtonLabel: '删除',
            },
        },
        downloadButton: {
            buttonText: '下载',
            dialogTitle: '请选择下载格式',
            dialogCancel: '取消',
            dialogConfirm: '下载',
            typeLabel: '单证类型',
        },
        generateDocumentButton: {
            buttonText: '生成单证',
            dialogTitle: '请选择要生成的单证',
            dialogCancel: '取消',
            dialogConfirm: '生成',
            typeLabel: '单证类型',
            errors: {
                ciFirst: '请先产生业务发票.',
                ciExists: '业务发票已生成.',
                plExists: '装箱单已生成',
            },
        },
        addColumnButton: {
            buttonText: '添加 Column',
            dialogTitle: '输入 Column 名称',
            fieldLabel: 'Column 名称',
            dialogCancel: '取消',
            dialogConfirm: '添加',
            errorMessage: '已达到最多 columns 数目',
        },
        documentTag: {
            docTypesAcronyms: {
                PO: 'PO',
                CI: 'CI',
                PL: 'PL',
            },
        },
        featureInProgressTag: {
            title: '功能开发中',
        },
        statusButtonMenu: {
            orderStatusLabelsMap: {
                'Not Started': '未开始',
                'In Progress': '进行中',
                Completed: '完毕',
                Exception: '意外',
            },
        },
        status: {
            statusHandler: {
                successMessage: '操作成功!',
            },
        },
    },
    defaults: {
        documentNames: {
            PO: '销售订单',
            CI: '业务发票',
            PL: '装箱单',
        },
    },
};
