import bitcoin from './bitcoin.svg';
import React, { Component } from "react";
import Moment from 'react-moment';
import './App.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

class App extends Component {

  constructor(props){
    super(props) 
    this.state = {
      isLoading : true,
      btc : 0.00,
      eth : 0.00,
      xrp : 0.00,
      ltc : 0.00,
      lastUpdate : new Date()
    }

    this.updateState = this.updateState.bind(this) 
  }

  updateState(btc, eth, xrp, ltc, lastUpdate){  
    this.setState({
      isLoading : false,
      btc : btc,
      eth : eth,
      xrp : xrp,
      ltc : ltc,
      lastUpdate : lastUpdate
    })
  }

  getUpdatedBrl(amount){
    amount = (amount * 5.22).toLocaleString('pt-br', {minimumFractionDigits: 2});
    return amount;
  }

  componentDidMount() {
    fetch("https://fcsapi.com/api-v3/crypto/latest?id=78,79,80,81&access_key=oy4xEFrg9BO6F6iq4kX1sCB")
      .then(res => res.json())
      .then(
        (result) => {
          this.updateState(result.response[0].c, result.response[1].c, result.response[2].c, result.response[3].c, result.response[0].tm);
        },
        (error) => {
          console.log(`Erro na consulta de API: ${error}`);
        }
      )
  }

  render(){
    const { isLoading } = this.state;
    if(isLoading) {
      return(
        <div className="App">
        <header className="App-header">
          <div id="app" class="loader"></div>
        </header>
      </div>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={bitcoin} className="App-logo" alt="bitcoin" />
          <p>1 Bitcoin custa ${parseFloat(this.state.btc).toFixed(2)} (R${this.getUpdatedBrl(parseFloat(this.state.btc))})</p>
          <p className="App-caption">atualizado em <Moment format="DD/MM/YYYY hh:mm:ss">{this.state.lastUpdate}</Moment></p>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#282c34' }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Ethereum" secondary={`$${parseFloat(this.state.eth).toFixed(2)} (R$${this.getUpdatedBrl(parseFloat(this.state.eth))})`} secondaryTypographyProps={{
                    color: 'primary',
                    fontWeight: 'medium',
                    variant: 'body2',
                  }}/>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Ripple" secondary={`$${parseFloat(this.state.xrp).toFixed(2)} (R$${this.getUpdatedBrl(parseFloat(this.state.xrp))})`} secondaryTypographyProps={{
                    color: 'primary',
                    fontWeight: 'medium',
                    variant: 'body2',
                  }} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Litecoin" secondary={`$${parseFloat(this.state.ltc).toFixed(2)} (R$${this.getUpdatedBrl(parseFloat(this.state.ltc))})`} secondaryTypographyProps={{
                    color: 'primary',
                    fontWeight: 'medium',
                    variant: 'body2',
                  }} />
            </ListItem>
          </List>
        </header>
      </div>
    )
  }
}

export default App;
