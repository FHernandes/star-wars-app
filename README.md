# Star Wars Character Explorer

This project is a **React + TypeScript** application built with **Vite** that allows users to search, filter, and explore Star Wars characters using the [SWAPI](https://swapi.dev/) API.

## Features

### 1. Character List

- Fetches data from the SWAPI `/people` endpoint.
- Implements pagination for handling large datasets.
- Displays a loading indicator while fetching data.
- Handles API errors gracefully.

### 2. Character Card

- Displays each character in a card format with their name.
- Includes a hover animation for better UI experience.
- Clicking a card opens a modal with detailed character information.

### 3. Character Modal

- Fetches character images from the [Star Wars Databank](https://starwars-databank.vercel.app/character/single#filter-by-name).
- Displays character details such as:
  - Name
  - Height (in meters)
  - Mass (in kg)
  - Gender
  - Birth year
  - Number of films the character appears in
- Fetches and displays homeworld information:
  - Name
  - Terrain
  - Climate
  - Population

### 4. Search & Filter

- Implements a search bar that allows users to filter characters by name.
- Adds filter options for **Homeworld, Starships, and Species**.
- Combines search functionality with filters for an improved user experience.

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js (v18 or later)**
- **Yarn** (recommended) or **npm**
- **Docker** (optional for containerized deployment)

### Clone the repository


### How to use
1. Enter a character's name in the search bar.

2. Use the filters (homeworld, species, starships) to refine results.

Click on a **View more** to view detailed information in a modal.

![image](https://github.com/user-attachments/assets/a98a5f3d-107f-4211-b8e2-4fba910d1df8)


```sh
git clone https://github.com/yourusername/star-wars-app.git
cd star-wars-app
```

### Install dependencies

```sh
yarn install
# or
npm install
```

### Start the development server

```sh
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:3000`.

## Running the App with Docker

### Build the Docker image

```sh
docker build -t star-wars-app .
```

### Run the Docker container

```sh
docker run -p 3000:3000 star-wars-app
```

The application will be available at `http://localhost:3000` inside the container.

## Technologies Used

- **React** with **TypeScript**
- **Vite** for fast build and development
- **Styled Components** for styling
- **React Query** for data fetching and caching
- **Docker** for containerization (optional deployment)
- **SWAPI** & **Star Wars Databank** APIs
