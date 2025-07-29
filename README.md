# TS-PlayWright
Test project showing TypeScript/PlayWright. Uses the Lambdatest mock website (https://ecommerce-playground.lambdatest.io/) for tests.

- Very much a work in progress

- Page Object Model implemented throughout
    - 'basePom' contains properties and methods that used by all other POMs
    - The other POMs extend basePom.

- The tests in directly in the 'tests' folder (i.e. not the subfolders) are standard Playwright tests

- The 'BDD' subfolder of 'tests' has Behaviour-driven development tests in Cucumber 
