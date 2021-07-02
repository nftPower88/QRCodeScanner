
import React, { useContext, useState } from 'react';
import { LanguageContext } from '../../localization/LanguageContainers';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import QrReader from 'react-qr-scanner';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    textAlign: 'center',
    justifyContent: 'center'
  },
  control: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center'
  }
}));

const Home = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { dictionary } = useContext(LanguageContext);
  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState('No result');

  const previewStyle = {
    height: 240,
    width: 320,
  }

  const handleScan = (data) => {
    setResult(data);
  }

  const handleError = (err) => {
    console.log(err)
  }

  return (
    <div className={classes.root}>
        <QrReader
          delay={delay}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
        <p>{result}</p>
        <div className={classes.control}>
          <Button>{dictionary.btnLabelCam}</Button>
          <Button>{dictionary.btnLabelScreen}</Button>
          <Button>{dictionary.btnLabelRecord}</Button>
        </div>
    </div>     
  );
}

export default Home;
