import React from 'react';
import PropTypes from 'prop-types';
import {Box, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {LANGUAGE} from 'app/utils/constants.js';
import InfoBox from './InfoBox'
import DocumentTable from "./DocumentTable";


const {
    ceTitle,
} = LANGUAGE.shipment.previewDocs.docsTitles;

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        minWidth: theme.spacing(100)
    },
    title: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    topM1: {
        marginTop: theme.spacing(2)
    },
    full: {
        width: '100%',
        height: '100%'
    }
}));

const ChinaExportPreview = React.memo(function ChinaExportPreview({document}) {
    const classes = useStyles();
    const {
        ref,
        sName,
        cName,
        mName,
        bol,
        containerNum,
        createdAt,
        del,
        destCountry,
        exPort,
        exemption,
        incoterm,
        items,
        mTaxCode,
        packageTypes,
        packageUnits,
        pod,
        pol,
        quantity,
        scRef,
        sTaxCode,
        supervision,
        totGrossWeight,
        totNetWeight,
        totalAmount,
        tradingCountry,
    } = document
    console.log(document)
    console.log(document.items)
    let quantityString = ""
    for (const [key, value] of Object.entries(quantity)) {
        quantityString += `${key}: ${value} `
    }
    return (
        <Grid className={classes.root}>
            <Grid container direction="column">
                <Grid item><Typography variant="h5">{ceTitle}</Typography></Grid>
                <Grid item xs={12} className={classes.title}>
                    <Typography variant="h5" align="center">
                        中华人民共和国海关出口货物报关单
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.title} direction="row"
                      justify="space-between" container>
                    <Typography variant="subtitle1">预录入编号：</Typography>
                    <Typography variant="subtitle1">海关编号：{ref}</Typography>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <InfoBox label={"境内发货人"} value={sName + ' ' + sTaxCode}/>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <InfoBox label={"出境关别"} value={exPort ? exPort : ''}/>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <InfoBox label={"出口日期"} value={' '}/>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <InfoBox label={"申报日期"} value={' '}/>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <InfoBox label={"备案号"} value={' '}/>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <InfoBox label={"境外收货人"} value={cName}/>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <InfoBox label={"运输方式"} value={del ? del.label.zh : ' '}/>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <InfoBox label={"运输工具名称及航次号"} value={' '}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InfoBox label={"提运单号"} value={bol ? bol : ' '}/>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <InfoBox label={"生产销售单位"} value={mName + ' ' + mTaxCode}/>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <InfoBox label={"监管方式"} value={supervision}/>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <InfoBox label={"征免性质"} value={exemption}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InfoBox label={"许可证号"} value={' '}/>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <InfoBox label={"合同协议号"} value={scRef ? scRef : ' '}/>
                    </Grid>
                    <Grid item xs={12}
                          sm={2}>
                        <InfoBox label={"贸易国（地区）"} value={tradingCountry ? tradingCountry.label.zh : ' '}/>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <InfoBox label={"运抵国（地区）"} value={destCountry ? destCountry.label.zh : ''}/>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <InfoBox label={"离境口岸"} value={pol ? pol : ''}/>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <InfoBox label={"指运港"} value={pod ? pod : ''}/>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <InfoBox label={"包装种类"} value={packageTypes ? packageTypes : ' '}/>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <InfoBox label={"件数"} value={quantityString ? quantityString : ''}/>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <InfoBox label={"毛重 千克"} value={totGrossWeight ? totGrossWeight : ''}/>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <InfoBox label={"净重 千克"} value={totNetWeight ? totNetWeight : ' '}/>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <InfoBox label={"成交方式"} value={incoterm}/>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <InfoBox label={"运费"} value={''}/>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <InfoBox label={"保费"} value={''}/>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <InfoBox label={"杂费"} value={''}/>
                    </Grid>
                </Grid>
                <Grid container>
                    <Box height="100%" border={1} borderColor="grey.main" className={classes.full}><Typography
                        variant={"caption"}> 随附单证及编号</Typography></Box>
                </Grid>
                <Grid container>
                    <Box height="100%" border={1} borderColor="grey.main" className={classes.full}><Typography
                        variant={"caption"}>标记唛码及备注</Typography></Box>
                </Grid>
                <Grid container>
                    <Box height="100%" border={1} borderColor="grey.main" className={classes.full}><Typography
                        variant={"caption"}>集装箱号及对应商品关系: {containerNum ? containerNum : ''}</Typography></Box>
                </Grid>
                <DocumentTable type={'CE'} items={items} custom1={null} custom2={null} currency={null}/>

                <Grid container className={classes.title}>
                    <Grid item container xs={9} direction={"column"}>
                        <Grid item>
                            <Box border={1} borderColor="grey.main">特殊关系确认： 价格影响确认： 支付特许权使用费确认： 自报自缴：</Box>
                            <Box border={1} borderColor="grey.main" height={"20px"}></Box>
                            <Box border={1} borderColor="grey.main">申报人员 申报人员证号 电话 兹申明以上内容承担如实申报、依法纳税之法律责任</Box>
                            <Box border={1} borderColor="grey.main" height={"20px"}></Box>
                            <Box border={1} borderColor="grey.main">申报单位 申报单位（签章）</Box>
                        </Grid>
                    </Grid>
                    <Grid item container xs={3}>
                        <Box height="100%" border={1} borderColor="grey.main" className={classes.full}>海关批注及签章</Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
});

ChinaExportPreview.propTypes = {
    document: PropTypes.object.isRequired
};

export default ChinaExportPreview;