# YearGoals

**YearGoals** is a web platform that allows users to share and track their yearly goals. It enables individuals to view others' goals, get inspired, and stay motivated by making their own goals public. The app provides an engaging way to set, update, and achieve personal objectives in a supportive community.

## Running with Docker (Containerized branch)

The `docker-compose.yml` file is added in the `containerized` branch to allow you to run the YearGoals project locally using Docker. Follow these steps:

### Steps to Run Locally with Docker

1. **To run it localy(in container)**:

   ```bash
   git clone https://github.com/VPS010/YearGoals.git
   cd YearGoals
   git checkout containerized
   docker-compose up -d
2. **To stop it**:

   ```bash   
   docker-compose down

## Features

- **Goal Sharing**: Share your yearly goals with others, or keep them private.
- **Progress Tracking**: Mark goals as "In Progress" or "Completed."
- **Inspiration**: View other users' goals for motivation and ideas.

## Tech Stack

- **Frontend**: React.js for building the user interface.
- **Backend**: Express.js (Node.js) for handling server-side logic.
- **Database**: MongoDB for storing user data and goals.

## Future Plans

- [ ] **User Testing**: Gather feedback to improve usability.
- [ ] **User Profiles**: Allow users to create profiles to track their goals.
- [ ] **Public and Private Goals**: Users can choose whether to make their goals visible to the public or keep them private.
- [ ] **Feature Enhancement**: Add notifications, reminders, and goal suggestions.

❤️
