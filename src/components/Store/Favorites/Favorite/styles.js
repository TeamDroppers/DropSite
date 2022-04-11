import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position:'relative',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex:'2',
  },
  media: {
    paddingTop: '40%', // 16:9
    '&:hover': {
      cursor:'pointer'
   },
  },  
  cardContent: {
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'space-between',
    flexGrow: '2',
    gap: '2rem',
  },
  cardActions: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '0',
    // marginTop: "auto",
  },

  favorite:{
    color: 'red',
  },
  productPrice:{
    marginTop: 'auto',
    '&:hover': {
      cursor:'pointer'
   },
  },
}));
