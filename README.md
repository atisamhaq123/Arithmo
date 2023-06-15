# Arithmo

Arithmo is a web application built using Node.js, Socket.IO, and Express that challenges your math skills in a fast-paced environment. With Arithmo, you can compete against other users in real-time and see who can solve math questions the quickest...

<img src="https://github.com/atisamhaq123/Arithmo/blob/main/images/im1.PNG">
<br>
<img src="https://github.com/atisamhaq123/Arithmo/blob/main/images/im2.PNG"> 

## Features

- Real-time Multiplayer: Compete against other users from around the world in solving math questions.
- Time-Limited Questions: Each question is displayed for 30 seconds, testing your ability to think and respond quickly.
- Notifications: Get instant notifications when a question is solved, and see who solved it first.
- Scoring System: Earn points for each correct answer, and see your score increase in real-time.
- Smooth User Interface: The application has a sleek design with a black background and an azure header, providing a visually pleasing    experience.
- Live User List: The left side of the screen shows a scrollable list of live users, represented by green dots.
- Leaderboard: The user with the highest score is prominently displayed at the top of the user list.

## Installation

To run Arithmo on your local machine, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/arithmo.git`
2. Navigate to the project directory: `cd arithmo`
3. Install the dependencies: `npm install`
4. Start the server: `node app.js`
5. Open your web browser and visit `http://localhost:3000` to access Arithmo.

## Requirements

- Node.js (version 12 or higher)
- npm (Node Package Manager)
- Express
- Socket.io

## Usage

1. Upon accessing the application, you will be prompted to enter your username.
2. Once logged in, you will join the pool of live users.
3. Questions will appear on the screen, and you need to provide your answer within the given time limit.
4. If you solve a question correctly before others, you will earn points, and your score will increase.
5. Notifications will inform all users when a question is solved and display the user who solved it first.
6. After a question is solved, a 5-second delay is given before the next question appears.
7. The leaderboard on the left side displays the users' scores, with the highest scorer at the top.

## Contributing

We welcome contributions to Arithmo! If you would like to contribute, please follow these guidelines:

1. Fork the repository and create your branch: `git checkout -b my-branch`
2. Make your changes and commit them: `git commit -m "Add my feature"`
3. Push to your branch: `git push origin my-branch`
4. Submit a pull request outlining your changes.

## License

Arithmo is licensed under the [MIT License](https://opensource.org/licenses/MIT).
