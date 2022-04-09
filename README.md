# Recruitle!
Created by: Muhammad Osman Amjad, Ali Al Rawaf, Jawad Jawid

## Project URL

https://recruitle.me/

## Project Video URL 

https://youtu.be/jGsyYRGayhw
(Due to time restriction, didn't get to mention that employers receive emails with resume when an applicant applies to one of their jobs)

## Project Description

Our motivation for this app was to make it easier for applicants to apply to jobs, and make it easier for recruiters to schedule interviews with applicants. 
Overall our application's main features are to create jobs, see your job postings, see applicants to your jobs, schedule and finish video interviews with applicants, allow applicants to apply to jobs, and allow applicants to see their job applications. Below, we will explain the workflow of our application.

On the landing page of our application, the user is prompted to sign in. If they don't have an account, they can visit the sign-up page and sign up as either 
an applicant or as an employer. Once a user is signed up, they are redirected to the sign-in page where they can sign in with their email and password.
Upon successfully signing in, the user will be redirected to their own profile page.

If the user who signed in is an applicant, their profile page will include their first and last name, email, and their resume on file (if they've attached one).
It will also include a paginated list of their job applications (jobs they've applied to). An applicant is also able to modify their first or last name from the profile page. They can also upload a resume from the profile page. If they've already uploaded a resume and try to upload another one, the resume on file will be replaced by the new resume. An applicant is also able to click on the Jobs section from the navigation bar, and they will be redirected to the Jobs page. On the jobs page, an applicant will see a paginated list of jobs with the associated company, location, salary, and job description. They can filter for specific jobs or companies using the search bar. They can apply for a job by clicking "Quick Apply" and their information along with their resume will be emailed to the company who made that job posting. If the applicant does not have a resume on file, they will not be able to apply for jobs and they will be prompted to attach a resume from their profile page.
If an employer requests an interview with an applicant, it will show up in the interviews page for the applicant, and the applicant can join the video call interview from there. This is the workflow in the point of view of an applicant. 

If the user signed in is an employer, their profile page will include their company name, email, and a paginated list of their job postings. For each job posting, there is a "View Applicants" button so the employer can view the applicants for a specific job posting. If the employer clicks "View Applicants" on a job posting, they will be redirected to a new page showing the applicants for that job posting, and a button to schedule an interview with the applicant. The employer can choose the date and time to schedule the interview. Once the interview is scheduled, it will show up in the "Interviews" page for the employer, and they can join the video call interview from there. An employer is also able to click "Create Job" which will prompt them with a form that allows them to create a job. They will have to input the job title, the job description, the location of the job, and the salary of the job (with its associated currency). Once they post the job, it will display on their profile page under their job postings, and it will show on the jobs page for any applicant-type users. This is the workflow in the point of view of an employer.

## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. 

## Deployment

![image](https://user-images.githubusercontent.com/54965155/162344149-f89f8c26-eeb5-40c7-b9c6-a125e62a8171.png)

Instead of having separate frontend and backend applications, we decided to go with a single express app that serves the frontend statically from the client/build folder (in app.js)

![image](https://user-images.githubusercontent.com/54965155/162347111-0d2db39a-34a9-4fed-8afb-5d0503e33472.png)

For production, the app is ran in a Docker container on a Digital ocean Ubuntu VM that is then proxied through NGINX.

The Dockerfile creates the image by simply installing the dependencies of both the front and the back end, then builds the frontend and runs the express app, which is now ready to serve the built react files.

![image](https://user-images.githubusercontent.com/54965155/162343764-1b2af548-6c2f-40cf-98d1-f77c38784aa6.png)

The image is built using the Dockerfile above after every push to main that changes relavant files. After the image is built, it's pushed to github registry, and after that another workflow runs which pulls the new image and deploys the changes on the server (/.github/workflows/RECRUITLE.yml).

![image](https://user-images.githubusercontent.com/54965155/162346036-09750e79-fa22-4ceb-901c-8e4219f051fd.png)

We decided to use docker-compose for simplicity, especially because we wanted to pass an env variables file and specify the ports mapping. As we can see on the last line of the image above, the deployment part of the github workflow simply pulls all the images in the dockercompose file (one image) and runs docker compose up on it.

![image](https://user-images.githubusercontent.com/54965155/162346468-e75348ea-6861-4a74-8881-7a4d2738c0cc.png) We can see how the docker compose forwards port 3000 of the container to port 3000 of the VM server. So after deployemnt, the express app is accessable on port 3000 of the VM, and all we need to do is proxy it to the outside world.

Thats the structure of the VM. It contains regular NGINX files and some certificate files for https. On top of that it contains a secret file that stores the values of all the env variables (db, email connection, twillo, etc..), and also the docker compose files that is used to run the container.

![image](https://user-images.githubusercontent.com/54965155/162346312-00a38380-807b-44ac-92c8-ba0a05f37c92.png)

As mentioned earlier, the app is served on an NGINX DigitalOcean Ubuntu machine. The VM runs NGINX natively as opposed to in a container. So at any given time there is only one container running, which is the express app serving react files. The container runs on PORT 3000 of the digital ocean vm, and then NGINX proxies that to port 80 of that vm.

![image](https://user-images.githubusercontent.com/54965155/162349279-89990694-cc33-4b86-a615-bf6fd3002ca8.png)

So this NGINX config file is a standard one that maps port 80 of the VM to the express app, and the second flag is to ensure in the express app that the connection is secure.

### Domain and HTTPS
We use namecheap to get a domain, and used these steps to acquire an automatically renewable https certifacte https://certbot.eff.org/instructions?ws=nginx&os=ubuntubionic

## Maintenance

Due to time constraints we dont have any autoamted system in place to mointor bugs. We make sure to check the docker container logs constantly to notice any unexpected behvour. But thats about it.

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1. Deployment. This was definitely one of the most challenging parts of this project as it involved lots of research, learning, understanding and experimentation.
2. React: We were just not used to the react way of doing things, and it took some time to get used to states, and other react concepts.
3. Video calling: We chose to use the Twilio API to support our interviews, but with the official frontend APIs available for implementing a twilio client, the developers are responsible for implementing their own hooks to control the state of the room. Programmable video APIs were low level, and required a lot of learning and understanding of audio and video, participants, and room logic.

## Contributions

### Mahamad Jawad Jawid
- Setup database
- Setup overall structure of the app
- SignIn and SignUp pages
- Search and pagination
- Deployment, and security

### Muhammad Osman Amjad
- Setting up the backend to work with graphql
- Show a user's personal info on profile page
- Show an applicant's applications on their profile page
- Show an employer's job postings on their profile page
- Allow employer to see applicants for each job posting

### Ali Al Rawaf
- Full stack job creation
- Applicants can see and apply to jobs
- Employers recieve emails about applications to their postings
- Employers can request interviews to specific applicants for specific jobs with a selected date
- Employers and applicants can join a room where they can see and interview with eachother 1 on 1

# One more thing? 
Thank you very an amazing course. We thought that the work was challnging, but only now as we are finishing up the app, we are realizing how satsfying it all is. This course covered so many useful concepts in web develpoment, and we are excited to apply our skills in the outside world. Thanks :)
