import request from "supertest"
import assert from "assert"
import app from "../server.js" // Our Express app

describe('API Tests', () => {
    it('should return Welcome to the API! message', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.strictEqual(res.body.message, 'Welcome to the API!')
          done();
        });
    });

    // Route not found
    it('should return a 404 Error (Not Found)', (done) => {
      request(app)
        .get('/undefinedRoute')
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          const keys = Object.keys(res.body)
          assert.strictEqual(keys.includes("message"), true)
          done();
        });
    });

    // global error handle
    it('should return a 500 Error', (done)=>{
      request(app)
        .get('/error')
        .expect(500)
        .end((err, res)=>{
            if(err) return done(err);
            const keys = Object.keys(res.body)
            assert.strictEqual(keys.includes("message"), true)
            done()
        })
    })
});

describe('Register User API Test', ()=>{
   it('should return 400 Error', (done)=>{
      request(app)
        .post('/users/register')
        .expect(400)
        .end((err, res)=>{
          if(err) return done(err);
          assert.strictEqual(res.body.message, "No Data provided")
          done()
        })
    });
    it('should return 400 Error', (done)=>{
      request(app)
        .post('/users/register')
        .send({username:undefined, password:undefined})
        .expect(400)
        .end((err, res)=>{
          if(err) return done(err);
          assert.strictEqual(res.body.message, "username or password not provided")
          done()
        })
    });

    it('should return 400 Error', (done)=>{
      request(app)
        .post('/users/register')
        .send({username:'admin'})
        .expect(400)
        .end((err, res)=>{
          if(err) return done(err);
          assert.strictEqual(res.body.message,"username or password not provided")
          done()
        })
    });

    it('should return 400 Error', (done)=>{
      request(app)
        .post('/users/register')
        .send({password:'password'})
        .expect(400)
        .end((err, res)=>{
          if(err) return done(err);
          done()
        })
    });

    it('should return 201 Success', (done)=>{
      request(app)
        .post('/users/register')
        .send({username:'admin', password:'password'})
        .expect(201)
        .end((err, res)=>{
          if(err) return done(err);
          done()
        })
    });
})

describe('User Login test', ()=>{
   it('should return 400 Error', (done)=>{
      request(app)
        .post('/users/login')
        .expect(400)
        .end((err, res)=>{
          if(err) return done(err);
          assert.strictEqual(res.body.message, "username or password not provided")
          done()
        })
    });
    it('should return 400 Error', (done)=>{
      request(app)
        .post('/users/login')
        .send({username:undefined, password:undefined})
        .expect(400)
        .end((err, res)=>{
          if(err) return done(err);
          assert.strictEqual(res.body.message, "username or password not provided")
          done()
        })
    });
    it('should return 401 Error', (done)=>{
      request(app)
        .post('/users/login')
        .send({username:"notusername", password:"notpassword"})
        .expect(401)
        .end((err, res)=>{
          if(err) return done(err);
          assert.strictEqual(res.body.message, "username or password incorrect")
          done()
        })
    })
    it('should return 401 Error', (done)=>{
      request(app)
        .post('/users/login')
        .send({username:"notusername", password:"password"})
        .expect(401)
        .end((err, res)=>{
          if(err) return done(err);
          assert.strictEqual(res.body.message, "username or password incorrect")
          done()
        })
    })
    it('should return 401 Error', (done)=>{
      request(app)
        .post('/users/login')
        .send({username:"username", password:"notpassword"})
        .expect(401)
        .end((err, res)=>{
          if(err) return done(err);
          assert.strictEqual(res.body.message, "username or password incorrect")
          done()
        })
    })
     it('should return 200 Success', (done)=>{
      request(app)
        .post('/users/login')
        .send({username:"username", password:"password"})
        .expect(200)
        .end((err, res)=>{
          if(err) return done(err);
          assert.strictEqual(res.body.message, "Login Successfully")
          done()
        })
    })
})


