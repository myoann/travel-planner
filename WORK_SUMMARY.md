# Work Summary

This document outlines the steps taken to develop the Travel Planner Frontend Application, detailing the technologies used, the project structure, and the processes followed to build and test the application.

## Step 1: Project Setup

1. **Initialize Project:**

   - I first had to choose the technologies I want to use. I chose Next.js with React for this project as the newest version of Next has a lot of features related to the server component that could benefit this project
   - I used `create-next-app` to bootstrap a new Next.js project.

2. **Set Up TypeScript:**
   - I converted the project to TypeScript in order to have a clean and typed project
   - I added the necessary TypeScript configuration files (`tsconfig.json`).

## Step 2: Directory Structure

1. **Organized the project structure:**
   - Next.JS has two models for building applications: Pages Router and App Router. I mainly worked with Pages Router on my previous projects but decided to go on App Router, their new model, for this project (based on the features it propose)
   - To feat with the App Router model, I created a `src` directory to house all the application code.
   - Inside `src`, created the following directories:
     - `app/` for the Next.js pages.
     - `components/` for reusable UI components.
     - `types/` for TypeScript type definitions.
     - `utils/` for utility functions.

## Step 3: Implementing Features

1. **GraphQL Integration with URQL:**

   - I wanted to go with Apollo but found urql to be a great alternative for this project, with a cache that it efficient and which has some specific features dedicated to Next.js App Router projects
   - I installed `urql` to manage GraphQL queries and configured URQL in the project to fetch data from the open GraphQL API.

2. **Styling with Tailwind CSS:**

   - For the CSS, I chose Tailwind CSS which is one of the most known utility-first CSS framework these days and which is simple to use and also has a short learning curve thanks to its intuitive class-based approach.
   - I configured Tailwind CSS by creating a `tailwind.config.js` file and adding necessary configurations.

3. **Image Generation with Unsplash-js:**
   - I wanted to add pictures for every country and found Unsplash to be a great solution as it can find an image related to a specific query
   - I integrated Unsplash API to dynamically generate images for each country.

## Step 4: Pages

1. **Homepage:**

   - I wanted the homepage to be simple and to display all the countries.
   - I added a filter by continent and a search bar to find specific countries based on what the user types. It could be either the name of a continent, the name of a country or the name of a city.
   - I also added a footer, only displayed when the user wants to compare two countries. It seemed to me a nice approach to make this intuitive

2. **Country page:**

   - Each country has its own page. Based on the little data we have for the GraphQL API, I wanted to make a "wow" effect on this page.
   - To do so, I used a big image to welcome the user
   - Also, I used sentences to display the data instead of a simple table and used external links for the user to discover more on this country

3. **Comparison of countries page:**
   - I decided to limit here the comparison of two countries
   - The data are displayed in a nice way in order for the user to read easily the differences between the two countries

## Step 5: Testing

1. **Unit Testing with Jest and React Testing Library:**
   - I wanted to use Jest and React Testing Library as they are very convenient for such a project
   - I created test files alongside component files to ensure each component works as expected.

## Step 6: Docker Setup

1. **Creating Docker Configuration:**

   - I created a `Dockerfile` to containerize the application.
   - I created a `docker-compose.yml` file to simplify Docker commands.

2. **Building and Running Docker Container:**
   - I built the Docker image and ran the docker contrainer

## Conclusion

The project was successfully set up with a clean and organized structure. The application uses modern technologies such as Next.js, React, TypeScript, URQL, Tailwind CSS, and Unsplash-js to create a user-friendly and responsive travel planning tool. The integration of Docker ensures the application can run consistently across different environments. Unit tests were written and executed to maintain code quality and reliability.
