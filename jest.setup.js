// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
// import { setConfig } from 'next/config'
// import config from './next.config'

// Make sure you can use "publicRuntimeConfig" within tests.
// setConfig(config)
jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    ENV: process.env.NODE_ENV,
  },
}));

jest.mock("./src/pocketbase/pb", () => ({
  pb: {
    collection: jest.fn().mockReturnThis(),
    authWithPassword: jest.fn(),
    create: jest.fn(),
    getOne: jest.fn(),
    getList: jest.fn(),
    getFullList: jest.fn(),
    update: jest.fn(),
  },
}));
