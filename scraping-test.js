const express = require("express");
const jsdom = require("jsdom");
const axios = require("axios");
const mongoose = require('mongoose')
const { JSDOM } = jsdom;
const app = express();

mongoose.connect("mongodb://localhost:27017/jobPosts", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
  
const postSchema = {
    company: String,
    position: String,
    description: String,
    location: String,
    refer: String
};
const naukriSchema = {
    position: String,
    positionLink: String,
    company: String,
    experience: String,
    salary: String,
    location: String,
    refer: String,
}

const goodSpaceSchema = {
    company: String,
    position: String,
    location: String,
    experience: String,
    refer: String
};
  
const posts = mongoose.model("posts", postSchema);
const naukriPosts = mongoose.model("naukri", naukriSchema)
const goodSpace = mongoose.model('goodSpace', goodSpaceSchema)

app.set('view engine', 'ejs')

const URL = "https://www.freshersworld.com/jobs/jobsearch";

async function fetchData() {
    try {
        const response = await axios(URL, {
            method: "GET",
            headers: {
                Host: "www.freshersworld.com",
                Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
                'upgrade-insecure-requests': 1,
            },
        });
         const {document} = ( new JSDOM (response.data)).window
        

        document.querySelectorAll("#all-jobs-append .job-container").forEach(async (data)=>{
           await posts({
                company: data.querySelector('h3').textContent,
                position: data.querySelector('.left_move_up div').textContent,
                description: data.querySelector('.desc').textContent,
                refer: "Job world"
            }).save()
        })
    } catch (err) {
        console.log(err + "===error");
    }
}

async function naukri() {
    try {
        const response = await axios('https://www.naukri.com/software-developer-jobs?k=software%20developer&nignbevent_src=jobsearchDeskGNB', {
            method: "GET",
            headers: {
                Host: "www.naukri.com",
                appid: 109,
                systemid: 109,
                Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
                'upgrade-insecure-requests': 1,
            },
        });
         const {document} = ( new JSDOM (response.data)).window
        console.log("succced");

        document.querySelectorAll(".list .jobTupleHeader").forEach(async (data)=>{
           await naukriPosts({
                position: data.querySelector('.info .title').textContent,
                positionLink: data.querySelector('.info .title').href,
                company: data.querySelector('.companyInfo .subTitle').textContent,
                experience: data.querySelector('ul .experience span').textContent,
                salary: data.querySelector('ul .salary span').textContent,
                location: data.querySelector('ul .location span').textContent,
                refer: "Naukri"
            }).save()
        })
    } catch (err) {
        console.log(err );
    }
}


async function goodSpaceFn() {
    try {
        const response = await axios('https://ourgoodspace.com/jobs', {
            method: "GET",
            headers: {
                Host: "ourgoodspace.com",
                Referer: 'https://www.google.com/',
                'Accept-Encoding': 'gzip, deflate, br',
                Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
                'upgrade-insecure-requests': 1,
            },
        });
         const {document} = ( new JSDOM (response.data)).window
         console.log(document.querySelector(".JobCard_container__EaEzL"));

        document.querySelectorAll(".JobCard_container__EaEzL").forEach(async (data)=>{
           await goodSpace({
                position: data.querySelector('.JobCard_title__JkIbK').textContent,
                company: data.querySelector('.JobCard_hirerDetails__xWjzR .JobCard_hirerDetailsOrg__wh3rn').textContent,
                experience: data.querySelector('JobCard_detailCard__1pOfg').textContent,
                location: data.querySelector('JobCard_location_foLN8').textContent,
                refer: "GoodSpace"
            }).save()
        })
    } catch (err) {
        console.log(err+"====error" );
    }
}

async function linkedin() {
    try {
        const response = await axios('https://www.linkedin.com/jobs/search/?currentJobId=3431384207&distance=25&geoId=102713980&keywords=it', {
            method: "GET",
            headers: {
                Host: "www.linkedin.com",
                Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
                'upgrade-insecure-requests': 1,
            },
        });
        
      
         const {document} = ( new JSDOM (response.data)).window
        console.log(document.querySelector('.scaffold-layout__list-container '));
        // document.querySelectorAll(".job-card-container").forEach(async (data)=>{
        //    await posts({
        //         company: data.querySelector('h3').textContent,
        //         position: data.querySelector('.left_move_up div').textContent,
        //         description: data.querySelector('.desc').textContent,
        //         refer: "Job world"
        //     }).save()
        // })
    } catch (err) {
        console.log(err + "===error");
    }
}
// linkedin()

// app.get('/',(req,res)=>{
//     res.render('index.ejs',)
// })

app.listen(3000, () => console.log("sever connected"));
