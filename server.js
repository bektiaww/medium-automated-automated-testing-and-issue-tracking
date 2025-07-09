import express from "express"

const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API!' });
});

app.get('/error', (req, res, next)=>{
  throw new Error("Uncaught Exception")
})

app.post('/users/register', (req, res, next)=>{
  if(req.body===undefined){
    const err = new Error("No Data provided")
    err.statusCode = 400
    next(err)
    return
  }
  console.log(req.body)
  if(req.body.username===undefined || req.body.password===undefined){
    const err = new Error("username or password not provided")
    err.statusCode = 400
    next(err)
    return
  }
  res.status(201).json({message:"Registration Success "})
})

app.post('/users/login', (req,res, next)=>{
  if(req.body===undefined){
    const err = new Error("username or password not provided")
    err.statusCode = 400
    next(err)
    return
  }
  if(req.body.username===undefined || req.body.password===undefined){
    const err = new Error("username or password not provided")
    err.statusCode= 400
    next(err)
    return
  }
  if(req.body.username!=="username" || req.body.password!=="password"){
    const err = new Error("username or password incorrect")
    err.statusCode= 401
    next(err)
    return
  }
  res.status(200).json({message:"Login Successfully"})
})

// Route Not Found Handler
app.use((req, res, next)=>{
    const err = new Error(`The requested resource at ${req.originalUrl} was not found.`)    
    err.statusCode = 404
    next(err)
})

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({message: message});
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

export default app; // Export for Supertest