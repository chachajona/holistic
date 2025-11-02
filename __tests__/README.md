# Test Suite

This directory contains unit and integration tests for the application.

## Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Structure

Tests are organized by component/feature:
- `components/` - Component unit tests

## Writing Tests

We use:
- **Vitest** as the test runner
- **React Testing Library** for component testing
- **@testing-library/user-event** for user interactions
- **@testing-library/jest-dom** for additional matchers

### Example Test

```typescript
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MyComponent from "@/components/MyComponent";

describe("MyComponent", () => {
    it("should render correctly", () => {
        render(<MyComponent />);
        expect(screen.getByText("Hello")).toBeInTheDocument();
    });
});
```

## Setup

Before running tests for the first time, install dependencies:

```bash
npm install
```

The test environment is automatically configured via `vitest.config.ts` and `vitest.setup.ts`.
