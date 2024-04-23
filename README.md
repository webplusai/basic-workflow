# Simple Workflow Application with Next.js

This project builds a user-friendly workflow application using Next.js. It allows you to define a trigger and configure a single action that executes when the trigger fires.

## Features

- Create workflows with triggers and actions.
- Simple and intuitive user interface.

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed on your system.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Set Up Environment Variables
Copy the .env.example file to a new file named .env. Fill in the required credentials according to the instructions within the .env.example file. These credentials might include API keys or authentication details.

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

This will start the development server and open your application in the default browser window at [http://localhost:1688](http://localhost:1688).

## User Authentication
This project uses OAuth for user authentication. Currently, it supports both Github and Google login. To enable this feature, you'll need to obtain the necessary credentials and configure them in your `.env` file.

## How to use the App

- After you have configured the .env credentials and run the app successfully, you will be shown a screen as depicted below. Click on the **Circular button** at the center of the screen to create a trigger.
![Step 1](/public/basic-1.png)

- When a trigger is created, it auto matically provisions an endpoint your workflow, for example http://localhost:1688/api/workflows/jj9_LBRa64 was provisioned in the example below. This endpoint will be used by your server to fire the trigger by making a `POST` request to it. The endpoint accepts data as query params or in the request body.
![Step 2](/public/basic-2.png)

- After you have created a trigger, you can then proceed to Add an action, an action requires that you provide a target endpoint which the system will make a request to when the trigger is fired. You can as well add custom query parameters which will also be sent together with any data received from the trigger event request.
![Step 3](/public/basic-3.png)


## Deployment

### Vercel Deployment (Recommended)
The recommended deployment method is using the Vercel platform. Vercel is a serverless platform built by the creators of Next.js, making it a seamless choice for your Next.js application.

Visit the Vercel Platform: https://vercel.com/
Follow their instructions to create a new project and deploy your application.

### Alternative: Deploying on AWS EC2 (Advanced)
For a more advanced deployment scenario, you can deploy the application on an AWS EC2 instance.

A helpful guide for this process can be found [here](https://medium.com/@mudasirhaji/deploying-a-next-js-app-manually-on-aws-ec2-a-step-by-step-guide-58b266ff1c52).

## Additional Resources
Next.js Deployment Documentation: https://nextjs.org/docs