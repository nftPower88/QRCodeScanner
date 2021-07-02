
import React, { useContext } from 'react';
import { LanguageContext } from '../../localization/LanguageContainers';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { dictionary } = useContext(LanguageContext);

  return (
    <div className={classes.root}>
    
    </div>     
  );
}

export default Home;
