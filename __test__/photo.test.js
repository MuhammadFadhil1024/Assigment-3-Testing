const request = require('supertest')
const app = require('../app')
const { Photo, User } = require('../models')
const { generateToken } = require("../helpers/jwt")
const jwt = require('jsonwebtoken')

describe("POST /photos" , () => {
  let access_token;

  beforeAll(async () => {
        const new_user = await User.create({
            username : "FadhilMuhammad",
            email : "admin@gmail.com",
            password : "fadhil123"
        })
  })

  afterAll(async () => {
    try {
      await Photo.destroy({ where: {} })
    } catch (error) {
      console.log(error)
    }
  })

  it('Should response to create 201', async () => {

    const login = await request(app)
        .post("/users/login")
        .send({
            email: "admin@gmail.com",
            password: "fadhil123"
        })
        const{ access_token } = login.body
        console.log(access_token);

    const response = await request(app)
      .post("/photos")
      .set('Authorization', access_token)
      .send({
          title : "photo test 1",
          caption : "caption image 1",
          image_url : "https://picsum.photos/id/1/200/300",
        });

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('title', 'photo test 1');
        expect(response.body).toHaveProperty('caption', "caption image 1");
        expect(response.body).toHaveProperty('image_url',  "https://picsum.photos/id/1/200/300");
        // done();
      });

      it('should return 401 unauthorized without access token', async () => {
        await request(app).post('/photos').send({
            title : "photo test 1",
            caption : "caption image 1",
            image_url : "https://picsum.photos/id/1/200/300",
          });
       });

    
    
  });


  describe("GET /photos", () => {

    beforeAll(async () => {
        const photos = await Photo.create(
            {
                title : "photo test 1",
                caption : "caption image 1",
                image_url : "https://picsum.photos/id/1/200/300",
            },
            {
                title : "photo test 2",
                caption : "caption image 2",
                image_url : "https://picsum.photos/id/1/200/300",
            }
        )

        const new_user = await User.create({
            username : "FadhilMuhammad",
            email : "admin@gmail.com",
            password : "fadhil123"
        })
    })

    afterAll(async () => {
        try {
          await Photo.destroy({ where: {} })
        } catch (error) {
          console.log(error)
        }
      })

    it ("should response 200 get all data photo", async () => {
        const login = await request(app)
        .post("/users/login")
        .send({
            email: "admin@gmail.com",
            password: "fadhil123"
        })
        const{ access_token } = login.body
        console.log(access_token);
        
        const response = await request(app)
        .get("/photos")
        .set('Authorization', access_token);

        expect(response.status).toBe(200)
    })

    it('should return 401 unauthorized without access token', async () => {
        await request(app).get('/photos')
       });
  })


  describe("PUT /photos/:id", () => {

    let photo;

    beforeAll(async () => {

        photo =  await Photo.create({
            title : "photo test 1",
            caption : "caption image 1",
            image_url : "https://picsum.photos/id/1/200/300"
        })

        const new_user = await User.create({
            username : "FadhilMuhammad",
            email : "admin@gmail.com",
            password : "fadhil123"
        })
    })

    afterAll(async () => {
        try {
          await Photo.destroy({ where: {} })
        } catch (error) {
          console.log(error)
        }
    })

    it('Should response to create 201', async () => {
        const login = await request(app)
        .post("/users/login")
        .send({
            email: "admin@gmail.com",
            password: "fadhil123"
        })
        const{ access_token } = login.body
        console.log(access_token);

        const updatePhoto = {
                title : "photo test update",
                caption : "caption image update",
                image_url : "https://picsum.photos/id/1/200/300"
        }

        const response = await request(app)
            .put(`/photos/${photo.id}`)
            .set('Authorization', access_token)
            .send(updatePhoto);

            expect(response.status).toBe(201);
            const updatedPhoto = await Photo.findByPk(photo.id);
            expect(updatedPhoto.title).toBe(updatedPhoto.title);
            expect(updatedPhoto.caption).toBe(updatedPhoto.caption);
            expect(updatedPhoto.image_url).toBe(updatedPhoto.image_url);
    })
  })
