const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const cors=require('cors');

app.use(cors({origin:'*'}));
app.use(bodyparser.json());

const url="mongodb+srv://sweettreatsonline2023:Sweetonline%402023@sweetcluster.jqctkcw.mongodb.net/sweettreats";

const connection=mongoose.connect(url).then(()=>{
    app.listen(8000,(err)=>{
        if(err) throw err;
        else{

            console.log("DB Connected");
            console.log("Port Connected");
        }
    })
})

app.get('/',(req,res)=>{
    res.send("This is Demo purpose");
})

app.post('/register',async(req,res)=>{
    await mongoose.connection.collection("Register").find().toArray().then((userDetails)=>{
        res.send(userDetails);
    })
})

app.post('/newuser',async(req,res)=>{
    await mongoose.connection.collection('Register').insertOne(req.body).then((message)=>{
        res.send(message);
    })
})

app.post('/forgotpassword',async(req,res)=>{
    console.log(req.body);
    await mongoose.connection.collection('Register').updateOne({email:req.body.email},{$set:{password:req.body.password,confirmpassword:req.body.confirmpassword}}).then(()=>{
        res.send({message:"Update Successfull"});
    })
})

app.get ('/products',async(req,res)=>{
    await mongoose.connection.collection('Products').find().toArray().then((products)=>{
        res.send(products);
    })
})

app.post('/bookproduct',async(req,res)=>{
    // console.log(req.body);
    // const order="order";
    await mongoose.connection.collection('Register').find({email:req.body[0].email}).toArray().then((details)=>{
        // console.log(details[0].order);
        if(details[0].order){
            // console.log(details[0].order.length);
            if(details[0].order.length>0){
                const orders=details[0].order;
                for(var i=0;i<req.body.length;i++){
                    orders.push(req.body[i]);
                }
                console.log(orders);
                mongoose.connection.collection('Register').updateOne({email:req.body[0].email},{$set:{order:orders}}).then((result)=>{
                    res.send(result);
                })
            }
        }
        else{  
            mongoose.connection.collection('Register').updateOne({email:req.body[0].email},{$set:{order:req.body}}).then((result)=>{
                res.send(result);
            })
        }
    })

})

app.post('/login',async(req,res)=>{
    await mongoose.connection.collection("Register").find().toArray().then((userDetails)=>{
        res.send(userDetails);
    })
})

app.get('/categories',async(req,res)=>{
    await mongoose.connection.collection("Categories").find().toArray().then((categoriesresult)=>{
        res.send(categoriesresult);
    })
})
