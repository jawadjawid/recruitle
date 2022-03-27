# Recruitle!
Created by: Muhammad Osman Amjad, Ali Al Rawaf, Jawad Jawid

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
