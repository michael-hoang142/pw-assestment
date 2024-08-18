# DCID_UI_AUTOMATION

<!-- TABLE OF CONTENTS -->
<h2>
    <details open="open">
        <summary class="normal">Table of Contents</summary>
        <h5>
          <ol>
            <li>
              <a href="#about the Project">Getting Started</a>
              <ul>
                <li><a href="#prerequisites">Prerequisites</a>
                <li><a href="#installation">Installation</a>
              </ul>
            </li>
            <li><a href="#folder structure & usage">Usage</a></li>
          </ol>
        </h5>    
    </details>
</h2>

<!-- ABOUT THE PROJECT -->

## About the Project

Playwright Demo - This project is showcase some basic technique of PW on https://demoqa.com/

Top Features:

- POM applied
- Test drive development applied
- Data driven test applied
- Using fixture to shared token applied



## Getting Started

### Prerequisites

The following software are required:

- nodejs : Download and Install Node JS from
  ```sh
  https://nodejs.org/en/download/
  ```
- visual studio code install from
   ```sh
  https://code.visualstudio.com/download
  ```  
### Installation

1. Clone the repo using below URL
  - https://github.com/michael-hoang142/pw-assestment
```sh
  git clone https://github.com/michael-hoang142/pw-assestment.git
```

2. Navigate to folder, and install npm packages using:

```sh
npm install
```

3. Install Playwright
```sh
npx playwright install
```

<!-- USAGE EXAMPLES-->

## Folder structure & usage

1. ./fixture: contains prerequisites api configuration at the moment only 
2. ./page: contains page object model, handling page action
3. ./tests: contains automation test cases
4. Running scripts:
  - UI testcase: 
  ```sh
    npm run test-ui
  ```
  - API testcase: 
  ```sh
    npm run test-api
  ```
5. For any futher guidance / queries: please book me an interview :D 