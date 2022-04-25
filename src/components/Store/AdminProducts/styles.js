import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexgrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginBottom:'3%',
  },
  root: {
    flexgrow: '1',
  },
  product: {
    flexgrow: '2',
  },
  productContainer: {
    [theme.breakpoints.down('sm')]: {
      minWidth: '90vw',
   },
  },
  adminOptions:{
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    gap:'2rem',
  },
  adminOption:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
  },
  adminOptionLabel:{
    fontWeight:'600',
    marginRight:'2rem',
    alignSelf:'center',
  },
}));
