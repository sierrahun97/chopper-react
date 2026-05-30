import "@testing-library/jest-dom";
// Polyfill TextEncoder/TextDecoder for Node (used by some libs like react-router)
// Use Node's util TextEncoder/TextDecoder via globalThis
const { TextEncoder, TextDecoder } = require("util");
(globalThis as any).TextEncoder = TextEncoder;
(globalThis as any).TextDecoder = TextDecoder;
