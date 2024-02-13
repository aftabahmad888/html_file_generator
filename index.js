const Manager = require("./starter/lib/Manager.js");
const Engineer = require("./starter/lib/Engineer.js");
const Intern = require("./starter/lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./starter/src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.


const teamMembers = [];

function promptManager() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter team manager's name:"
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter team manager's ID:"
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter team manager's email:"
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Enter team manager's office number:"
        }
    ]);
}

function promptEngineer() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter engineer's name:"
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter engineer's ID:"
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter engineer's email:"
        },
        {
            type: 'input',
            name: 'github',
            message: "Enter engineer's GitHub username:"
        }
    ]);
}

function promptIntern() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter intern's name:"
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter intern's ID:"
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter intern's email:"
        },
        {
            type: 'input',
            name: 'school',
            message: "Enter intern's school:"
        }
    ]);
}

function promptMenu() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
        }
    ]);
}

async function init() {
    try {
        console.log("Please enter the team manager's information:");
        const managerData = await promptManager();
        const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);
        teamMembers.push(manager);

        let addingEmployees = true;
        while (addingEmployees) {
            const { choice } = await promptMenu();
            switch (choice) {
                case 'Add an engineer':
                    const engineerData = await promptEngineer();
                    const engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);
                    teamMembers.push(engineer);
                    break;
                case 'Add an intern':
                    const internData = await promptIntern();
                    const intern = new Intern(internData.name, internData.id, internData.email, internData.school);
                    teamMembers.push(intern);
                    break;
                case 'Finish building the team':
                    addingEmployees = false;
                    break;
            }
        }

        const html = render(teamMembers);
        fs.writeFileSync(outputPath, html);
        console.log(`HTML written to ${outputPath}`);
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

init();
