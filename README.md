# PlatWrightRealisation

# E2E Testing Framework (Playwright + TypeScript)

This document serves as the final report and documentation for the comprehensive End-to-End (E2E) testing framework developed using **Playwright** and **TypeScript**. The framework is designed to validate both the **User Interface (UI)** for the Sauce Demo application and the core functionality of the **Petstore RESTful API**, fulfilling all technical assignment requirements.

---

## 1. Architectural Overview and Core Principles

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Test Runner** | **Playwright Test** | Provides a single, unified framework for highly reliable UI and API automation with built-in auto-waits. |
| **Language** | **TypeScript** | Enforces strong **Type Safety**, catching errors at compile time and ensuring superior code maintainability. |
| **UI Pattern** | **Page Object Model (POM)** | Isolates locators and page logic, making tests readable, stable, and easy to maintain. |
| **Reporting** | **Allure Report** | Provides professional, interactive, and visually detailed test execution reports for all stakeholders. |


## 2.  Project Structure

The project is organized according to Playwright and POM best practices, ensuring logical separation of concerns.

## 3. Test Plan Summary and Code Rationale

The framework covers all major features, utilizing unique user roles as **fixtures** to validate different system states and failure conditions.

| Feature / API | Scenario Coverage (2-3 tests per feature) | Rationale & Best Practice Demonstrated |
| :--- | :--- | :--- |
| **UI: Authentication** | Successful Login, Locked Out Error, Performance Glitch. | Utilizes **explicit waits** and Playwright's auto-wait feature to handle slow-loading scenarios (`performance_glitch_user`), ensuring test stability. |
| **UI: Purchase Flow** | Full E2E Checkout, Validation Errors, Broken Image/Data Check (`problem_user`), Visual Regression. | Demonstrates robust **POM methods** using dynamic locators for high reusability and complete business flow testing. |
| **API: Petstore** | **GET /findByStatus**, **POST /pet**, **DELETE /pet/{id}**. | Demonstrates **test isolation** using randomly generated IDs and crucial **cleanup** steps (`request.delete`) to ensure the test environment remains clean. |

---

## 4. Execution & Report

#### Run all tests
npx playwright test

---
#### Run report

allure generate allure-results --clean

---
#### Open report 
allure open

---

### 5. Addational annation 

I chose Playwright as the main framework for several key reasons that directly meet the requirements for a  technical assesment:
#### Combine (UI + API)
Playwright is one of the few frameworks that provides high-quality tools for both browser automation (UI) and HTTP request testing (API). This allows us to create a single, consistent framework using the same language constructs, configuration, and assertion engine.
For me is a huge plus that there is no need to mix and maintain two different libraries (for example, Cypress for UI and Axios for API).

---
#### Reliability and Stability (No Flakiness)
Playwright automatically waits for elements to become visible, enabled, and ready for action. This drastically reduces the number of flaky tests that often arise from incorrect or insufficient explicit waits.

----
#### Isolation
Playwright creates a clean, isolated browser context for each test. This guarantees that tests do not interfere with each other, which is critically important for reliability.


----

#### TypeScript Best Practices
Playwright works excellently with TypeScript  allowing me to utilize strict typing to create resilient Page Objects and tis helped me structure data during development and avoid runtime errors.

----
#### Addtional plus 
The framework easily integrates with third-party tools, such as Allure Report, for professional reporting, which was one of the requirements of the technical assignment.

