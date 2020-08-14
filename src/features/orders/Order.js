import React, { useEffect, useState } from 'react';
import OrderService from './services.js';
import OrderInfoTile from './OrderInfoTile.js';
import { Container, Tabs, Tab, Button } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DownloadButton from '../shared/DownloadButton.js';

const { orderDetailsTab, documentsTab, generateDocumentButton } = LANGUAGE.order;

const useStyles = makeStyles({
    gridContainer: {
        minHeight: 600,
        height: '50%',
        padding: '3% 0'
    },
    sideButton: {
        marginBottom: '5%',
        width: '80%',
        minHeight: 50
    },
    preview: {
        width: '100%',
        height: '100%'
    }
})

export default function Order({match}) {
    const classes = useStyles();
    const { id } = match.params;
    const [order, setOrder] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const order = await OrderService.fetchOrderById(id);
            setOrder(order);
            try {
                const file = await OrderService.getPdfFilePreview(order.fileName);
                setPreview(window.URL.createObjectURL(file));
            } catch (err) {
                document.querySelector('iframe').contentDocument.write('<h1>Content Not Found</h1>');
                document.close();
            }
        };
        fetchData().then();
    }, [id]);

    const onTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Container>
            {order && <OrderInfoTile order={order} />}
            <Tabs
                value={tabValue}
                onChange={onTabChange}
                indicatorColor='primary'
                textColor='primary'
            >
                <Tab label={orderDetailsTab} component="span"/>
                <Tab label={documentsTab} component="span"/>
            </Tabs>
            <Grid
                container
                className={classes.gridContainer}
            >
                <Grid
                    item
                    xs={9}
                >
                    <iframe
                        className={classes.preview}
                        title='Order Details'
                        src={preview}
                    />
                </Grid>
                <Grid
                    container
                    item
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    xs
                >
                    {order && <DownloadButton styles={classes.sideButton} fileName={order.fileName} />}
                    <Button className={classes.sideButton} variant="contained">{generateDocumentButton}</Button>
                </Grid>
            </Grid>
        </Container>
    )
}