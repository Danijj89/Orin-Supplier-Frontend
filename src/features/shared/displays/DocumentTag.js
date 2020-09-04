import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../../constants.js';

const { docTypesAcronyms } = LANGUAGE.shared.documentTag;

const useStyles = makeStyles({
  text: {
    width: 36,
    height: 36,
    padding: 2,
    lineHeight: '32px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: '5%',
    marginLeft: 8,
    textAlign: 'center',
  },
});

export default function DocumentTag({ docType }) {
  const classes = useStyles();
  console.log(docType);

  return (
    <Typography className={classes.text}>{docTypesAcronyms[docType]}</Typography>
  );
}
