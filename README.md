# CyberCat Academy

Welcome to CyberCat Academy, a cutting-edge cybersecurity platform designed to challenge and enhance your skills. Solve real-world challenges, earn points, and climb the leaderboard across multiple categories and challenge types.

## Features

- **Diverse Challenges**: Tackle a wide range of cybersecurity challenges, from cryptography to network security.
- **Dynamic Leaderboard**: Earn points and track your progress against other cybersecurity enthusiasts.
- **Multiple Categories**: Explore various cybersecurity domains, each with unique challenges and learning paths.
- **Real-time Feedback**: Get instant feedback on your solutions and learn from your mistakes.
- **Community Interaction**: Engage with fellow learners and experts in our community forums.

## Tech Stack

- **Frontend**: Next.js with TypeScript
- **Backend**: Next.js API routes with a custom backend structure
- **Database**: Supabase
- **UI Components**: shadcn/ui and v0.dev
- **Styling**: Tailwind CSS
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- A Supabase account and project

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/cybercat-academy.git
    cd cybercat-academy
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
    ```
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Contributing

We welcome contributions from the community! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to this project.

## Development

- Run `npm run dev` to start the development server.
- Run `npm run build` to create a production build.
- Run `npm run start` to start the production server.
- Run `npm run lint` to lint the codebase.

## Deployment

This project is set up for easy deployment on Vercel. Connect your GitHub repository to Vercel for automatic deployments on every push to the main branch.

## Testing

(Add information about your testing setup and how to run tests)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact us at [contact@cybercatacademy.com](mailto:contact@cybercatacademy.com).

## Acknowledgments

- Thanks to all contributors who have helped shape CyberCat Academy.
- Special thanks to the cybersecurity community for inspiration and support.
