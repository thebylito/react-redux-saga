import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Creators } from '../../configureStore/ducks/user';
import { Title, ListContainer } from '../../components/pages/homePage/Styled'
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Dialog, Slide } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const HomePage = () => {
  const [localState, setLocalState] = React.useState({
    alertOpen: false,
  })

  const dispatch = useDispatch();
  const { userList, userListLoading, userListError, count } = useSelector(state => state.user);

  React.useEffect(() => {
    dispatch(Creators.getUsersRequest())
    dispatch({ type: 'GET_FORK_REQUEST' })

  }, [dispatch]);

  React.useEffect(() => {
    if (userListError !== '') {
      setLocalState({
        alertOpen: true
      })
    }
  }, [userListError]);


  const onVerAgora = () => {
    dispatch({ type: 'VER_AGORA' })
  }
  const onCancelar = () => {
    dispatch({ type: 'CANCELAR' })
  }
  const onIncrementEvery = () => {
    dispatch({ type: 'ON_INCREMENT_EVERY' })
  }
  const onIncrementLatest = () => {
    dispatch({ type: 'ON_INCREMENT_LATEST' })
  }

  return (
    <div>
    <button onClick={onVerAgora}>VER AGORA</button>
    <button onClick={onCancelar}>CANCELAR</button>
    <button onClick={onIncrementEvery}>onIncrementEvery</button>
    <button onClick={onIncrementLatest}>onIncrementLatest</button>
    <div>{count}</div>

      <Title>Lista de usuarios</Title>
      {userListError !== '' && <div>{userListError}</div>}
      {userListLoading && <div>Carregando</div>}
      <ListContainer>
        <List>
          {userList.map(user => (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1" />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {user.username}
                    </Typography>
                    <div>{user.email}</div>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </ListContainer>
      <Dialog
        open={localState.alertOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => { }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div>{userListError}</div>
      </Dialog>
    </div>
  )
}

export default HomePage;