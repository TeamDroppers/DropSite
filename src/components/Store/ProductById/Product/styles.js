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
    paddingTop: '40%', // 16:9
    backgroundSize:'contain'
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
    justifyContent: 'center',
    margin:'2rem auto',
  },
  addedFavorite:{
    color: 'red',
  },
  productName:{
    marginRight: '2rem',
  },
  description:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  }
}));
