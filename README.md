# Recruitle!
Created by: Muhammad Osman Amjad, Ali Al Rawaf, Jawad Jawid

## Project URL

http://recruitle.me

## Project Video URL 

**Task:** Provide the link to your youtube video. Please make sure the link works. 

## Project Description

**Task:** Provide a detailed description of your app

## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. 

## Deployment

![image](https://user-images.githubusercontent.com/54965155/162344149-f89f8c26-eeb5-40c7-b9c6-a125e62a8171.png)

Instead of having seperate frontend and backend applications, we decided to go with a single express app that serves the frontend statically from the client/build folder (in app.js)

![image](https://user-images.githubusercontent.com/54965155/162347111-0d2db39a-34a9-4fed-8afb-5d0503e33472.png)

For production, the app is ran in a Docker container on a Digital ocean Ubuntu VM that is then proxied through NGINX.

The Dockerfile creates the image by simply installing the dependencies of both the front and the back end, then builds the frontend and runs the express app, which is now ready to serve the built react files.

![image](https://user-images.githubusercontent.com/54965155/162343764-1b2af548-6c2f-40cf-98d1-f77c38784aa6.png)

The image is built using the Dockerfile above after every push to main that changes relavant files. After the image is built, it's pushed to github registry, and after that another workflow runs which pulls the new image and deploys the changes on the server (/.github/workflows/RECRUITLE.yml).

![image](https://user-images.githubusercontent.com/54965155/162346036-09750e79-fa22-4ceb-901c-8e4219f051fd.png)

We decided to user docker-compose for simlicity, espcially that we wanted pass an env variables file and specify the ports mapping. As we can see on the last line of the image above, the deployment part of the github worlkflow simply pulls all the images in the dockercompose file (one image) and runs docker compose up on it.

![image](https://user-images.githubusercontent.com/54965155/162346468-e75348ea-6861-4a74-8881-7a4d2738c0cc.png) We can see how the docker compose forwards port 3000 of the container to port 3000 of the VM server. So after deployemnt, the express app is accsesable on port 3000 of the VM, and all we need to do is proxy it to the outside world.

Thats the strcture of the VM. It contains regural NGINX files and some certificate files for https. On top of that it contains a secret file that stores the values of all the env variables (db, email connection, twillo, etc..), and also the docker compose files that is used to run the container.

![image](https://user-images.githubusercontent.com/54965155/162346312-00a38380-807b-44ac-92c8-ba0a05f37c92.png)

As mentioned earlier, the app is served on an NGINX DigitalOcean Ubuntu machine. The VM runs NGINX naitevly as opposed to in a container. So at any given time there is only one container running, which is the express app serving react files. The container runs on PORT 3000 of the digital ocean vm, and then NGINX proxies that to port 80 of that vm.

![image](https://user-images.githubusercontent.com/54965155/162349279-89990694-cc33-4b86-a615-bf6fd3002ca8.png)

So this NGINX config file is a standard one that maps port 80 of the VM to the express app, and the second flag is to to assure the express app that the connection is secure.

### Domain and HTTPS
We use namecheap to get a domain, and used thesse steps to acquire an automatically renwable https certifacte https://certbot.eff.org/instructions?ws=nginx&os=ubuntubionic

## Maintenance

**Task:** Explain how you monitor your deployed app to make sure that everything is working as expected.

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1. Deployment
2.
3. 

## Contributions

### Mahamad Jawad Jawid
- Setup database
- Setup overall structure of the app
- SignIn and SignUp pages
- Search and pagination
- Deployment, and security

# One more thing? 

**Task:** Any additional comment you want to share with the course staff? 

## How to run
- Clone repo
- Navigate to ```recruitle```
- Run ```npm install``` and wait for it to finish
- Run ```npm start```
- Done. App should start running on PORT 3000

## How to run locally with docker
- Clone repo
- Navigate to ```recruitle```
- Run ```docker build -t recruitle .``` and wait for it to finish
- Run ```docker run -dp 3000:3000 recruitle```
- Done. App should start running on PORT 3000

## How to deploy latest version of the app
- Wokring on that rn

## Description
The idea is to create an application similar to Glassdoor/LinkedIn. We want a web application that will allows companies to post job postings, let candidates apply to postings, let candidates review companies, let candidates submit their salaries. 

## Key Features
* Candidate sign-up
* Employer sign-up
* Employer adds job posting
* Candidate applies to job posting (name, address, resume, etc.)
* Candidate reviews company
* Candidates can browse companies
* User profiles for employers and candidates
* Search filter on job postings

## Beta
* Employer sign-up
* Candidate sign-up
* User profiles for both employers and candidates
* Employer adds job posting
* Candidate applies to job posting
* Employer receives application in email
* Send emails on job application

## Final
* Search filter on job postings
* Candidates can browse jobs for specific companies
* User can see their own applications
* Company can see/edit their own job postings
* Descriptions for jobs
* Employers can request interview to applicants thru video call

## Potential Features
* Premium feature maybe
* Activate emails
* Password reset
* Easy apply vs hard apply with leetcode question

## Tech Stack
Node/Express/MongoDB for backend, React on frontend, and GraphQL for data exchange. We will deploy on a VM using Azure.

## Top 5 Challenges
* Learning GraphQL from scratch
* Learning React from scratch
* Setting up the front-end from scratch
* Managing different user roles (candidates vs employers)
* Implementing all features on time!



