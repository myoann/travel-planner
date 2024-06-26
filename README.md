# Travel Planner Frontend Application

This project is a frontend web application developed using [Next.js](https://nextjs.org/) to assist travelers in planning trips to various countries. The application leverages an open GraphQL API to provide detailed information on countries, cities, continents, locations, exchange rates, and more. The goal is to make travel planning effortless and enjoyable by providing comprehensive data about travel destinations.

## Features

- **Comprehensive Information:** Get details like currency, exchange rates, and geography for each city.
- **User-Friendly Interface:** Designed to be engaging and easy to use.
- **Search Functionality:** Search for continents, countries, or cities to explore new destinations.
- **Compare Functionaly:** Compare two countries to find out more the differences

## Technologies Used

- **Next.js** and **React** for building the user interface.
- **URQL** for handling GraphQL queries.
- **TypeScript** for type safety and better developer experience.
- **Unsplash-js** for generating images.
- **Tailwind CSS** for styling.
- **Jest** and **React Testing Library** for unit testing.

## Getting Started

### Prerequisites

Ensure you have Node.js and npm (or yarn, pnpm, or bun) installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/myoann/travel-planner.git
   cd travel-planner
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Running the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building the Project

To build the project for production, run:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

## Docker Setup

A `Dockerfile` and `docker-compose.yml` are included to facilitate easy setup and deployment.

### Building the Docker Image

To build the Docker image, run:

```bash
docker-compose build
```

### Running the Docker Container

To start the Docker container, run:

```bash
docker-compose up
```

Open http://localhost:3000 with your browser to see the result.

To stop the Docker container, press Ctrl+C in the terminal where docker-compose up is running, or run docker-compose down in another terminal.

## Testing

Unit tests are included. To run the tests:

```bash
npm test
# or
yarn test
# or
pnpm test
# or
bun test
```

## Project Structure

- `app/`: Contains the application's pages.
- `components/`: Reusable UI components.
- `types/`: TypeScript types.
- `utils/`: Utility functions.

## API

This project uses an open GraphQL API to fetch geographic information, providing data on countries, cities, continents, locations, and exchange rates.

## External Tools

- **GraphQL Client:** [URQL](https://formidable.com/open-source/urql/) for GraphQL queries.
- **Image Generation:** [Unsplash-js](https://github.com/unsplash/unsplash-js) for fetching images.
