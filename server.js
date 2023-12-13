const express=require('express');
const app=express();
const dotenv=require('dotenv').config({path:'config.env'});
const ejs=require('ejs');
const fs=require('fs');
const session=require('express-session');
const mongoose=require('mongoose');
const registermodel=require('./models/registermodel.js');
const enquirymodel=require('./models/Enquiry.js');
const cookieparser=require('cookie-parser');

mongoose.connect('mongodb+srv://gopichowdaryp1997:gopi123@cluster0.b6yedvb.mongodb.net/',{
dbName:'equipmentsales'
}).then(e=>{console.log('database connected!');}).catch(e=>{
    console.log(e.message);
});

app.use(cookieparser());
app.use(express.json());
app.use(session({
    secret:'123456',
    resave:false,
    saveUninitialized:true,
}));

app.use(express.urlencoded({extended:true}));
const filejson=fs.readFileSync('./EquipmentInformation.json');
const data=JSON.parse(filejson);

app.set('view engine','ejs');

app.use(express.static(__dirname+'/views'));
// app.use('js',express.static(__dirname+'/views/js'));



app.get('/',(req,res)=>{
    const body=req.cookies.ID;
    if(!body)
      res.render('index.ejs',{cart:req.session.cart?.length,login:"Login",url:'/login'});
    else
      res.render('index.ejs',{cart:req.session.cart?.length,login:"Logout",url:'/login'});
});
app.get('/productdescription',(req,res)=>{
    const query=req.query.id;
   // Check if req.session.file is defined and has data
   if (req.session.file && req.session.file[query - 1]) {
    const productData = req.session.file[query - 1];
    res.render('productdescription.ejs', { data: productData.items, id: query, cart: req.session.cart.length,login:"Logout",url:'/' });
} else {
    // Handle the case where data is not available
    res.status(404).send('Product not found');
}
});
app.get('/enquiry',(req,res)=>{
    res.render('Enquiry',{cart:req.session.cart,login:"Logout",url:'/' });
});
app.post('/enquiry',async (req,res)=>{
    const body=req.body;
    console.log(body);
    if(body)
    {   
       const enquiry=new enquirymodel(body);
       await enquiry.save();
       res.json('Form has been submitted!');
    }
    else
    res.json('No data found!');
});
app.get('/signup',(req,res)=>{
    res.render('Registration.ejs');
});
app.post('/signup',async (req,res)=>{
    const body=req.body;
    if(body)
    {   
        var userFromModel=await registermodel.findOne({email:body.email});
        if(userFromModel)
        { 
            res.json('User already registered!');
            res.redirect('/signup');
            return;
        }
        try
        {
           const user=new registermodel(body);
           await user.save();
           req.session.username=body.username;
           res.json('user successfully registered!');
        }
         catch(exp)
         {
            res.json(exp.message);
            return;
         }
    }
});
app.get('/login',(req,res)=>{
    req.session.file=data;
    req.session.cart=req.session.cart || [];
    res.render('login.ejs');
});

app.get('/logout',(req,res)=>{
const cookie=req.cookies.ID;
if(cookie)
{
    res.cookie('ID',"",{expires:new Date(Date.now())});
}
res.redirect('/login');
});
app.post('/login',async (req,res)=>{
    const body=req.body;
    req.session.file=data;
    req.session.cart=[];
    if(body)
    {
        const user=await registermodel.findOne({email:body.email});
        if(user)
        {
            if(body.password===user.password)
            {
                res.cookie('ID','adsasda',{maxAge:40000000});
                res.render('index.ejs',{cart:0,login:"Logout",url:"/"});
            }
            else
            {
                res.json('Password is incorrect!');
            }
        }
        else
        {
            res.json('No user found!');
        }
    }
});

const a=[];
const cartItems=0;
app.get('/cart',(req,res)=>{
    const query=req.query.id;
   const product=req.session.file[query-1].items;
   
   const item=req.session.cart.filter(x=>x.id==query);
   if(item.length>0)
   {
      let index=req.session.cart.findIndex(x=>x.id===item[0].id);
      if(index!==-1)
      {
          req.session.cart[index].quantity++;
      }
   }
   else
   req.session.cart.push({'id':query,quantity:0});
   
   res.render('productdescription.ejs', { data: product, id: query, cart: req.session.cart.length,login:"Logout",url:'/'  });
});

const items=[];

app.get('/cartitems', (req, res) => {
    const cookies = req.cookies.ID;
  
    for (var i = 0; i < req.session?.file.length; i++) {
      for (var j = 0; j < req.session?.cart.length; j++) {
         
        const check =req.session?.file.some(sessionItem =>{
            items.some(item => item.id == sessionItem.id)})

            console.log('check',check);
        if (req.session?.file[i].id == req.session.cart[j].id && !check) {
          items.push(req.session?.file[i]);
        }
      }
    }
    if(!cookies)
      res.render('cart.ejs',{cart:req.session.cart?.length,login:"Login",url:'/login'});
    else
    {
        res.render('cart.ejs',{cart:req.session.cart?.length,login:"Logout",url:'/login',items:items});
    }
   
});

function check(item,arr)
{
    for(var i in arr)
    {
        if(arr[i].id==item)
           return true;
        else
        return false
    } 
} 
app.get('/:name',(req,res)=>{
  const body=req.body;
  const name=req.params.name;
  const cookies=req.cookies.ID;

  if(!cookies)
  res.render('index.ejs',{cart:0,login:"Login",url:"/"});
  else
  res.render('index.ejs',{cart:0,login:"Logout",url:"/"});
  console.log(body);
});

app.get('/cartdisplay',(req,res)=>{

});
app.listen(process.env.PORT||2000,'0.0.0.0',()=>{console.log('Connection established!')});
