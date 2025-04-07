import React from "react";
import { ExternalLink } from "lucide-react";
import { NavItem, DocSection } from "@/types/types";
import { BookOpen, Cpu, Github, Info, Key, Code } from "lucide-react";

// Navigation items for the aside with nested structure
export const navItems: NavItem[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: <BookOpen className="h-5 w-5" />,
    children: [
      { id: "how-it-works", title: "How It Works" },
      { id: "api-key", title: "Getting an API Key" },
    ],
  },
  {
    id: "development",
    title: "Development",
    icon: <Cpu className="h-5 w-5" />,
    children: [
      { id: "source-code", title: "Source Code" },
      { id: "architecture", title: "Architecture" },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    icon: <Github className="h-5 w-5" />,
    children: [
      { id: "hugging-face", title: "Hugging Face API" },
      { id: "contributing", title: "Contributing" },
    ],
  },
];

// Documentation content sections
export const docSections: Record<string, DocSection> = {
  "how-it-works": {
    title: "How It Works",
    content: (
      <>
        <p className="text-gray-300 mb-4">
          GenAI API Key Client provides a seamless interface to interact with
          powerful AI models through the Hugging Face API. Here's how it works:
        </p>
        <ol className="list-decimal pl-5 space-y-3 text-gray-300">
          <li>
            <strong className="text-white">Enter your API Key</strong> -
            Securely provide your Hugging Face API key to connect to the models.
          </li>
          <li>
            <strong className="text-white">Choose a Model</strong> - Select from
            various specialized AI models based on your specific needs.
          </li>
          <li>
            <strong className="text-white">Create & Analyze</strong> - Start
            generating content, analyzing sentiment, or building conversations
            with AI.
          </li>
        </ol>
        <p className="text-gray-300 mt-4">
          The application handles all the complex API interactions behind the
          scenes, allowing you to focus on creating with AI.
        </p>
      </>
    ),
  },
  "api-key": {
    title: "Getting a Hugging Face API Key",
    content: (
      <>
        <p className="text-gray-300 mb-4">
          To use this application, you'll need a Hugging Face API key. Follow
          these steps to obtain one:
        </p>
        <ol className="list-decimal pl-5 space-y-3 text-gray-300">
          <li>
            <strong className="text-white">
              Create a Hugging Face Account
            </strong>{" "}
            - Visit{" "}
            <a
              href="https://huggingface.co/join"
              className="text-purple-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              huggingface.co/join
            </a>{" "}
            and sign up for an account.
          </li>
          <li>
            <strong className="text-white">Access Your Profile</strong> - Once
            logged in, click on your profile picture in the top right corner and
            select "Settings".
          </li>
          <li>
            <strong className="text-white">Generate an API Key</strong> - In the
            settings page, navigate to the "Access Tokens" section and click
            "New Token".
          </li>
          <li>
            <strong className="text-white">Set Permissions</strong> - Give your
            token a name and select the appropriate permissions (read for most
            use cases).
          </li>
          <li>
            <strong className="text-white">Copy Your API Key</strong> - After
            generating the token, copy it and store it securely. You'll need
            this to use in the application.
          </li>
        </ol>
        <div className="bg-gray-800/80 p-4 rounded-md mt-4 border border-gray-700/60">
          <p className="text-yellow-300 text-sm">
            <strong>Important:</strong> Keep your API key secure and never share
            it publicly. The application stores your key only in your browser's
            local storage and never transmits it to any third parties.
          </p>
        </div>
      </>
    ),
  },
  "source-code": {
    title: "Source Code",
    content: (
      <>
        <p className="text-gray-300 mb-4">
          This project is open source and available on GitHub. Feel free to
          explore the code, contribute, or fork it for your own projects.
        </p>
        <div className="bg-gray-800/80 p-5 rounded-md border border-gray-700/60 flex flex-col space-y-4">
          <h3 className="text-white font-semibold">Repository</h3>
          <a
            href="https://github.com/cvscharan/genai-api-key-client"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-purple-400 hover:underline"
          >
            github.com/cvscharan/genai-api-key-client
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>

          <h3 className="text-white font-semibold mt-2">Technologies Used</h3>
          <ul className="list-disc pl-5 text-gray-300">
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Framer Motion</li>
            <li>Hugging Face API</li>
          </ul>
        </div>
      </>
    ),
  },
  architecture: {
    title: "Architecture",
    content: (
      <>
        <p className="text-gray-300 mb-4">
          The GenAI API Key Client is built with a modern, component-based
          architecture using Next.js and React.
        </p>
        <h3 className="text-white text-xl font-semibold mt-6 mb-3">
          Frontend Architecture
        </h3>
        <p className="text-gray-300 mb-4">
          The application follows a clean, modular structure:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li>
            <strong className="text-white">Components</strong> - Reusable UI
            elements organized by function
          </li>
          <li>
            <strong className="text-white">Pages</strong> - Route-based views
            using Next.js App Router
          </li>
          <li>
            <strong className="text-white">Hooks</strong> - Custom React hooks
            for state management and API interactions
          </li>
          <li>
            <strong className="text-white">Utils</strong> - Helper functions and
            utilities
          </li>
        </ul>
      </>
    ),
  },
  "hugging-face": {
    title: "Hugging Face API",
    content: (
      <>
        <p className="text-gray-300 mb-4">
          The Hugging Face API provides access to thousands of state-of-the-art
          machine learning models.
        </p>
        <h3 className="text-white text-xl font-semibold mt-6 mb-3">
          API Endpoints
        </h3>
        <p className="text-gray-300 mb-4">
          This application primarily uses the Inference API endpoints:
        </p>
        <div className="bg-gray-800/80 p-4 rounded-md border border-gray-700/60 font-mono text-sm mb-4">
          <p className="text-purple-400">
            https://api-inference.huggingface.co/models/[MODEL_ID]
          </p>
        </div>
        <p className="text-gray-300">
          For more information, visit the{" "}
          <a
            href="https://huggingface.co/docs/api-inference/index"
            className="text-purple-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hugging Face Inference API documentation
          </a>
          .
        </p>
      </>
    ),
  },
  contributing: {
    title: "Contributing",
    content: (
      <>
        <p className="text-gray-300 mb-4">
          Contributions to the GenAI API Key Client are welcome! Here's how you
          can contribute:
        </p>
        <ol className="list-decimal pl-5 space-y-3 text-gray-300">
          <li>
            <strong className="text-white">Fork the Repository</strong> - Create
            your own fork of the project on GitHub.
          </li>
          <li>
            <strong className="text-white">Create a Branch</strong> - Make your
            changes in a new branch.
          </li>
          <li>
            <strong className="text-white">Submit a Pull Request</strong> - Open
            a PR with a clear description of your changes.
          </li>
        </ol>
        <p className="text-gray-300 mt-4">
          Please ensure your code follows the project's coding standards and
          includes appropriate tests.
        </p>
      </>
    ),
  },
};
