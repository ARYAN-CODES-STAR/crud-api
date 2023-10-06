const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());
 
const courses = [
    { id: 1, name: 'Course1'},
    { id: 2, name: 'Course1'},
    { id: 3, name: 'Course1'},
]

app.get('/', (req,res) => {
    res.send('Hey');
});



app.get('/api/courses', (req,res) => {
    res.send(courses);
});

app.post('/api/courses', (req,res) => {
    const {error} = validateCourse(req.body);
    
    if(error) return res.status(400).send(result.error.details[0].message);
    
    const course = {
        id:course.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("Not found");
        
    
        
    // If invalid, return 400 - Bad Request
    // const result = validateCourse(req.body);
    
    const {error} = validateCourse(req.body);
    
    if(error) 
    return res.status(400).send(result.error.details[0].message);
        
    

    course.name = req.body.name;
    res.send(course)
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

 return Joi.validate(course, schema);
  
}

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("Not found");
        res.send(course);
    
});

const port = process.env.PORT || 4000;
// process because we can't rely on 3000 port, what if your hostinger type host provider provides some other port, otherwise 3000 is available.
app.listen(port, () => {
    console.log(`APP LISTENING AT ${port} `);
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("Not found");
  
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

})