import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: 'same-as-height',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    height: 0,
    paddingTop: '40%',
    backgroundSize:'contain',
    '&:hover': {
      cursor:'pointer'
   },
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    bottom: '0',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  itemLink: {
    display: 'flex',
    justifyContent: 'space-between',
    '&:hover': {
      cursor:'pointer'
   },
  },
  addedFavorite:{
    color: 'red',
  },
  productName:{
    marginRight: '2rem',
    maxHeight: '2rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

  },
  description:{
    display: 'flex',
    alignSelf: 'center',
    justifyContent:'center',
    maxWidth: '90%',
    '& > *':{
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'center',
    margin: '0 auto',
    }
  }
}));
