let {
    TypeFactory,
    Types
} = require('js-amino');

let Coin = TypeFactory.create('Coin', [
    {
        name: "denom",
        type: Types.String
    },   
    {
        name: "amount",
        type: Types.String
    }
])


create = coinObj => {   
    let coin = new Coin(coinObj.denom, coinObj.amount.toString())
    return coin;
}

module.exports = {
    create,    
}