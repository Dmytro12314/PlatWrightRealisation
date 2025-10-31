# Test Plan

 This plan outlines the specific scenarios automated in the Playwright framework, categorized by the major feature they validate.
 Set of UI tests, located in the `spec/` directory.


 ## Entry & Exit Criteria

### Entry Criteria
Environment: The test environment https://www.saucedemo.com/  and the API Test environment https://petstore.swagger.io/v2 must be stable and accessible.

Code: The entire framework code must be complete, compiled (for TypeScript), and ready to execution.

### Exit Criteria

Success Rate: 100% of critical functional tests (Login, Full Checkout) must be executed and passed.

Errors: The count of non-test-related errors (e.g., framework errors or network errors) must be zero.

Visuals: Visual regression scenarios  must show a pixel difference of less than 1% compared to the baseline snapshot.

Reporting: The Allure report must be successfully generated and contain no framework-related failure



## Roles and Responsibilities 

QA Engineer / Automation Specialist : Primary owner of the automation code, execution, debugging, and maintenance of the UI tests and API test suite.

QA Lead : Responsible for defining coverage targets and reviewing overall test results .

Developer : Responsible for code review of the test automation and fixing application defects identified by failing tests.


## Environment and Tools:

Test Runner : Playwright Test

API Client :	Playwright APIRequestContext.

CI/CD System : Jenkins/Github Actions.

Reporting Tool : Allure.

Target Browsers : Chromium, Firefox.

Target API : https://petstore.swagger.io/v2.

Execution Mode : Headless, Debug

## Test Types Covered in This Plan:

Functional Testing : Verifies the core business requirements (Successful Login, Full Checkout Cycle).

Functional Testing (API): Verifies the CRUD (Create, Read, Delete) operations on the Petstore service.

Negative Testing : Ensures proper error handling for invalid input (Form Errors, Locked Access).

Non-Functional Testing - Stability : Checks system behavior under varying conditions (Performance Check).

Non-Functional Testing - Visual/Integrity : Validates the correct rendering of the UI (Visual Regression, Broken Images).

----
## Features under the tests : 

Feature A: Authentication and Session.

Feature B: Purchase Flow and Form Validation (Purchase Flow and Form Validation).

Feature C: Integrity and Visual Quality (Visual and UI Integrity).

Feature D: API Testing (Petstore Service).

----

## Test Cases :

This plan outlines the specific, automated scenarios organized by the major feature they validate, ensuring compliance with the requirement of covering **2-3 tests per major feature**.

### Feature A: Authentication and Session Management

**Goal:** To verify all critical login paths and ensure proper error handling across various user states.

| ID | Scenario | User Role | Test Type | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **AUTH-001** | Successful Login  | `standard_user` | **Functional** | Verify that the user successfully logs in and is redirected to the Inventory page. |
| **AUTH-002** | Blocking Access | `locked_out_user` | **Negative / Functional** | Verify that login fails and a specific lockout error message is displayed. |
| **AUTH-003** | Performance Issue | `performance_glitch_user` | **Non-Functional (Reliability)** | Verify that the framework waits for the long server response (10s+) but successfully completes the login without a timeout error. |

### Feature B: Purchase Flow and Validation

**Goal:** To verify the end-to-end business process (add to cart, checkout, completion) and validate form integrity.

| ID | Scenario | User Role | Test Type |  Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **PURCH-001** | Full Checkout Cycle | `standard_user` | **Functional (E2E)** | Verify successful item addition, navigation to Checkout, data submission, and successful order completion. |
| **PURCH-002** | Negative Test: Form Error | `standard_user` | **Negative / Functional** | Verify that checkout fails and the appropriate error message is displayed when a mandatory field (e.g., Last Name) is omitted. |
| **PURCH-003** | Data Validation: Broken Links | `problem_user` | **Negative / Integrity** | Verify that product images fail to load (404), confirming a known application bug. |

### Feature C: Integrity and Visual Quality

**Goal:** To verify that the UI's appearance is stable and cart state is managed correctly.

| ID | Scenario | User Role | Test Type |  Expected Result  |
| :--- | :--- | :--- | :--- | :--- |
| **VIS-001** | Visual Regression | `visual_user` | **Non-Functional (Visual)** | Take a screenshot of the Inventory page after login and compare it against the baseline snapshot. |
| **VIS-002** | Cart State Reset | `standard_user` | **Functional** | Verify that after successful order completion ("Checkout Complete"), the shopping cart badge count is reset and disappears. |



### Feature D: API Testing (Petstore Service).

**Goal:** To verify the core CRUD operations on the Petstore API, ensuring data integrity and test isolation.

| ID | Scenario | User Role | Test Type | Detailed Objective |
|:---|:---|:---|:---|:---|
| API-001 | Resource Creation (POST) | N/A | Functional (CRUD) | Verify that a new pet resource can be successfully created with a unique, randomized ID (Status 200/201). |
| API-002 | Resource Retrieval (GET) | N/A | Functional (Read) | Verify the ability to retrieve existing pet resources by status (e.g., available) and validate the response structure (JSON array). |
| API-003 | Cleanup/Isolation (DELETE) | N/A | Functional (Isolation) | Verify the newly created resource from API-001 can be successfully deleted immediately after creation, ensuring the test environment remains clean. |
