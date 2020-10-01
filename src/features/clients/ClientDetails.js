import React from 'react';
import InfoCard from '../shared/components/InfoCard.js';
import { Typography } from '@material-ui/core';
import ButtonDialog from '../shared/components/ButtonDialog.js';

export default function ClientDetails() {

    return (
        <InfoCard
            title="Apple Inc"
            button={<ButtonDialog dialogTitle="hello its me" buttonLabel="edit"/>}
        >
            <Typography>hello world</Typography>
        </InfoCard>
    )
}