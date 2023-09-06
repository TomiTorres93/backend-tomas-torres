import { Router } from "express";
import cookieParser from "cookie-parser";



const router = Router();

//Sin firma
// router.use(cookieParser())

// Con firma
router.use(cookieParser("CookieFirmada"))

//setCookie

// router.get('/setCookie', async (req,res)=>{ SIN FIRMA
//   res.cookie('CoderCookie', 'Esta cookie es poderosa', {maxAge: 30000}).send("Cookie asignada con éxito")
// })

router.get('/setCookie', async (req,res)=>{ // CON FIRMA
  const cookieValue = req.query.value; 
  res.cookie('UserCookie', cookieValue , {maxAge: 30000, signed: true}).send("Cookie asignada con éxito")
})

//getCookie

router.get('/getCookies', async (req,res)=>{
    //FIRMADAS
    res.send(req.signedCookies)
  })

//deleteCookie

router.get('/deleteCookie', async (req,res)=>{
    res.clearCookie('CoderCookie').send("Cookie borrada")
  })





// SESSIONS

//Session management

router.get('/session', async (req, res)=>{
    if(req.session.counter) {
        req.session.counter++
        res.send(`Se ha visitado este sitio ${req.session.counter}`)
    } else  {
        req.session.counter = 1;
        res.send("Bienvenido")
    }
  })


  router.get('/logout', async (req, res)=>{
    req.session.destroy(error => {
        if(error) {
            res.json({error: "error de logout", msg: "Error al cerrar la sesion"})
        }

        res.send("Sesión cerrada correctamente")

    })
  })


  router.get('/login', async (req, res, user, pass)=>{
      //Lógica
      const {username, password} = req.query
      if(username !== user|| password !== pass ) {
        return res.status(401).send("Login failed, check your username and password.")
      } else {
        req.session.user = username
        req.session.admin = true
        res.send("Login success!!")
      }
  })


  // AUTH MIDDLEWARE

 function auth(req, res, next) {
    if(req.session.username === "pepe" && req.session.admin) {
       return next()
    } else {
       return res.status(403).send("Ruta prohibida")
    }
 }

  router.get('/private', auth, (req, res)=>{
    //Lógica
    res.send("Si estás viendo esto es porque pasaste la autorización y sos un admin")
  })




export default router;