const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    {id:1,genre:"genre1"},
    {id:2,genre:"genre2"},
    {id:3,genre:"genre3"}
];

app.get('/', (req,res) => {
    res.send("HI, how are you... me?");
});

app.get('/api/genres',(req,res) => {
    res.send(genres);
});

app.get('/api/genres/:id',(req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.send('This id is not valid');
    res.send(genre);
});

app.post('/api/genres',(req,res) => {
    const { error } = ValidateGenre(req.body);

    if(error) return res.send(error.message);

    const genre = {
        id: genres.length+1,
        genre: req.body.genre
    }

    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id',(req,res)=>{
    const { error } = ValidateGenre(req.body);
    if(error) return res.send(error.message);

    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.send('This id is not valid');

    genre.genre = req.body.genre;
    res.send(genre);

});

app.delete('/api/genres/:id', (req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.send('This id is not valid');

    var index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genres);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


function ValidateGenre(genre){
    const schema = Joi.object({
        genre: Joi.string().min(3).required()
    });

    return schema.validate(genre);
}