import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  itemContainer:{
    position:'relative',
  },
  media: {
    height: 260,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  favorite:{
    position: 'absolute',
    display: 'flex',
    right: '5%',
  },

}));