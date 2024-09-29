const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var DB = {
    games: [
        {
            id: 1, 
            title: "COD",
            year: "2021",
            price: 200
        },
        {
            id: 2, 
            title: "Fifa",
            year: "2016",
            price: 150
        },
        {
            id: 3, 
            title: "Sea of Thieves",
            year: "2021",
            price: 30
        }
    ]
}

app.get("/games",(req, res)=> {
    res.statusCode = 200;
    res.json(DB.games)
});
app.get("/game/:id",(req, res)=> {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }

    }
});

app.post("/game",(req, res)=> {
    var {title, price, year} = req.body;
    DB.games.push({
        id: 4,
        title,
        price,
        year
    });

    res.sendStatus(200);

})
app.delete("/game/:id",(req, res)=> {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);
         
        if(index == -1){
            res.sendStatus(404);
        } else {
            DB.games.splice(index,1);
            res.sendStatus(200);
        }
    }
});
app.put("/game/:id",(req, res)=> {

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if(game != undefined){
            var {title, price, year} = req.body;

            if(title != undefined){
                game.title = title;               
            }
            if(price != undefined){
                game.price = price;
            }
            if(year != undefined){
                game.year = year;
            }
            res.sendStatus(200);
        }
    }
});


app.listen(1234,()=>{
    console.log("Api rodando!")
});

