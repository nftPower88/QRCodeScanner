
import React, { useContext } from 'react';
import { LanguageContext } from '../../localization/LanguageContainers';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Home from '../home';
import './index.css';

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  titlebar: {
  },
  progresscontents: {
    padding: '30px',
    fontFamily: 'Muli',
    textAlign: 'center',
    minWidth: '210px'
  }
}));

const MasterLayout = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { dictionary } = useContext(LanguageContext);
  const location = useLocation();
  const colors = {
    backgroundColor: useSelector((store) => store.accountSettings.backgroundColor),
    primaryColor: useSelector((store) => store.accountSettings.primaryColor),
    secondaryColor: useSelector((store) => store.accountSettings.secondaryColor),
    textColor: useSelector((store) => store.accountSettings.textColor)
  }
  
  const theme = React.useMemo(() =>
    createMuiTheme({
      palette: {
        primary: {
          main: colors.primaryColor ? colors.primaryColor : "#0000ff",
        },
        secondary: {
          main: colors.secondaryColor ? colors.secondaryColor : "#00FF00",
        },
        textPrimary: {
          main: colors.textColor ? colors.textColor : "#FFFFFF",
        },
      },
    })
  );

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <main className={classes.content}>
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              classNames="fade"
              timeout={300}
            >              
              <Switch location={location}>
                <Route path="/" exact render={(props) => <Home {...props}/>} />
                <Route path="/home" exact render={(props) => <Home {...props}/>} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </main>
      </div>     
    </ThemeProvider>
  );
}

export default connect(s => ({}))(MasterLayout);
