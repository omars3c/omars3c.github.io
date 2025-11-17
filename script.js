const terminal = document.getElementById('terminal');
const output = document.getElementById('output');
const commandInput = document.getElementById('commandInput');
let commandHistory = [];
let historyIndex = -1;
let currentPath = '~';

const fileSystem = {
    '~': {
        'about.txt': 'Hi, I\'m Omar - Security Engineer @ IKTEX LLC (Red Team)\n\nAt 18, I hacked a Fortune 500 company in just two days and took 30 million users data (legally).',
        'projects': {
            'tmeet.txt': 'Founder of a full-cycle AI platform for HR industry (12+ engineers)',
            'ai-security.txt': 'Building a new AI Security standard that could shake the tech world',
            'fortune500.txt': 'Fortune 500 Security Assessment - 30M users data accessed (legally)'
        },
        'skills.txt': 'Black & White Box Penetration Testing\nNetwork\nActive Directory\nInfrastructure Pentesting\nPython, C++, JavaScript\nBash, Powershell',
        'contact.txt': 'LinkedIn: https://www.linkedin.com/in/alikhanovv/',
        'README.md': 'Welcome to my portfolio terminal!\n\nType "help" to see available commands.\nType "ls" to list files.\nType "cat <filename>" to read files.'
    }
};

const portfolioData = {
    name: "Omar",
    title: "Security Engineer @ IKTEX LLC (Red Team)",
    about: `Hi, I'm Omar - Security Engineer specializing in Red Team operations.

🎯 My Story:
At 18, I hacked a Fortune 500 company in just two days and took 30 million users data (legally) - one of very few stories like that in the world :)

I break things so companies can fix them. My passion lies in finding vulnerabilities before malicious actors do, helping organizations strengthen their security posture through ethical hacking and penetration testing.

🚀 Current Projects:
• Founder of tmeet - a full-cycle AI platform for HR industry (12+ engineers)
• Building a new AI Security standard that could shake the tech world

My work combines deep security expertise with cutting-edge AI technology to create innovative solutions that protect businesses and their users.`,
    
    skills: [
        "Black & White Box Penetration Testing", "Network", "Active Directory", 
        "Infrastructure Pentesting", "Python", "C++", "JavaScript",
        "Bash", "Powershell"
    ],
    
    projects: [
        {
            name: "tmeet",
            description: "Founder of a full-cycle AI platform for HR industry. Leading a team of 12+ engineers to revolutionize how companies handle human resources through artificial intelligence. The platform streamlines recruitment, employee management, and HR analytics using advanced AI algorithms.",
            tech: ["AI/ML", "Python", "Full-Cycle Development", "HR Tech", "Team Leadership"]
        },
        {
            name: "AI Security Standard",
            description: "Developing a groundbreaking AI Security standard that could fundamentally change how the tech industry approaches AI security. This initiative aims to establish new protocols and best practices for securing AI systems and preventing AI-based attacks.",
            tech: ["AI Security", "Security Standards", "Research & Development", "Industry Innovation"]
        },
        {
            name: "Fortune 500 Security Assessment",
            description: "At age 18, successfully identified critical vulnerabilities in a Fortune 500 company's infrastructure within two days. Legally obtained access to 30 million user records, demonstrating the severity of security gaps. This achievement is one of very few such documented cases globally.",
            tech: ["Penetration Testing", "Security Research", "Vulnerability Assessment", "Ethical Hacking"]
        }
    ],
    
    contact: {
        linkedin: "https://www.linkedin.com/in/alikhanovv/"
    }
};

const commands = {
    help: () => {
        return `<span class="info">Доступные команды:</span>

<span class="command-name">Linux команды:</span>
<span class="command-name">ls</span> <span class="command-desc">- Список файлов и директорий</span>
<span class="command-name">cd</span> <span class="command-desc">- Перейти в директорию</span>
<span class="command-name">pwd</span> <span class="command-desc">- Текущая директория</span>
<span class="command-name">cat</span> <span class="command-desc">- Показать содержимое файла</span>
<span class="command-name">whoami</span> <span class="command-desc">- Имя пользователя</span>
<span class="command-name">date</span> <span class="command-desc">- Текущая дата и время</span>
<span class="command-name">echo</span> <span class="command-desc">- Вывести текст</span>

<span class="command-name">Портфолио команды:</span>
<span class="command-name">help</span> <span class="command-desc">- Показать список всех команд</span>
<span class="command-name">about</span> <span class="command-desc">- Обо мне</span>
<span class="command-name">skills</span> <span class="command-desc">- Мои навыки и технологии</span>
<span class="command-name">projects</span> <span class="command-desc">- Портфолио проектов</span>
<span class="command-name">contact</span> <span class="command-desc">- Контактная информация</span>
<span class="command-name">clear</span> <span class="command-desc">- Очистить терминал</span>
<span class="command-name">exit</span> <span class="command-desc">- Выход (обновит страницу)</span>

<span class="success">💡 Совет:</span> Используйте стрелки ↑↓ для навигации по истории команд`;
    },
    
    about: () => {
        return `<span class="info">${portfolioData.name}</span>
<span class="success">${portfolioData.title}</span>

${portfolioData.about}`;
    },
    
    skills: () => {
        let skillsHTML = '<span class="info">Мои навыки и технологии:</span>\n\n<div class="skills-container">';
        portfolioData.skills.forEach((skill, index) => {
            skillsHTML += `<span class="skill-tag" style="animation-delay: ${index * 0.05}s">${skill}</span>`;
        });
        skillsHTML += '</div>';
        return skillsHTML;
    },
    
    projects: () => {
        let projectsHTML = '<span class="info">Мои проекты:</span>\n\n';
        portfolioData.projects.forEach((project, index) => {
            projectsHTML += `
<div class="project-item" style="animation-delay: ${index * 0.1}s">
    <div class="project-title">${index + 1}. ${project.name}</div>
    <div class="project-desc">${project.description}</div>
    <div style="margin-top: 8px;">
        ${project.tech.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
    </div>
</div>`;
        });
        return projectsHTML;
    },
    
    contact: () => {
        return `<span class="info">Свяжитесь со мной:</span>

<div class="contact-item">🔗 LinkedIn: <a href="${portfolioData.contact.linkedin}" target="_blank" class="contact-link">${portfolioData.contact.linkedin}</a></div>

<span class="success">Буду рад обсудить возможности сотрудничества!</span>`;
    },
    
    clear: () => {
        output.innerHTML = '';
        return '';
    },
    
    exit: () => {
        return '<span class="warning">До свидания! Обновляю страницу...</span>';
    },
    
    ls: (args) => {
        const path = args[0] || currentPath;
        const dir = getDirectory(path);
        if (!dir) {
            return `<span class="error">ls: cannot access '${path}': No such file or directory</span>`;
        }
        
        let result = '';
        const files = [];
        const dirs = [];
        
        for (const item in dir) {
            if (typeof dir[item] === 'object' && dir[item] !== null) {
                dirs.push(`<span class="info">${item}/</span>`);
            } else {
                files.push(item);
            }
        }
        
        result = dirs.sort().join('  ') + '  ' + files.sort().join('  ');
        return result || '<span class="info">(empty directory)</span>';
    },
    
    cd: (args) => {
        const target = args[0] || '~';
        if (target === '~' || target === '..') {
            currentPath = '~';
            updatePrompt();
            return '';
        }
        
        const dir = getDirectory(currentPath);
        if (dir && dir[target] && typeof dir[target] === 'object') {
            currentPath = currentPath === '~' ? target : `${currentPath}/${target}`;
            updatePrompt();
            return '';
        }
        
        return `<span class="error">cd: no such file or directory: ${target}</span>`;
    },
    
    pwd: () => {
        return currentPath === '~' ? '/home/omar' : `/home/omar/${currentPath}`;
    },
    
    cat: (args) => {
        if (!args[0]) {
            return '<span class="error">cat: missing file operand</span>';
        }
        
        const filePath = args[0].split('/');
        const fileName = filePath[filePath.length - 1];
        const dirPath = filePath.length > 1 ? filePath.slice(0, -1).join('/') : currentPath;
        
        const dir = getDirectory(dirPath === '~' ? '~' : dirPath);
        if (!dir || !dir[fileName] || typeof dir[fileName] === 'object') {
            return `<span class="error">cat: ${args[0]}: No such file or directory</span>`;
        }
        
        return dir[fileName].replace(/\n/g, '<br>');
    },
    
    whoami: () => {
        return 'omar';
    },
    
    date: () => {
        const now = new Date();
        return now.toLocaleString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    },
    
    echo: (args) => {
        return args.join(' ');
    }
};

function getDirectory(path) {
    if (path === '~') {
        return fileSystem['~'];
    }
    
    const parts = path.split('/').filter(p => p);
    let current = fileSystem['~'];
    
    for (const part of parts) {
        if (current[part] && typeof current[part] === 'object') {
            current = current[part];
        } else {
            return null;
        }
    }
    
    return current;
}

function executeCommand(command) {
    const parts = command.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    if (!cmd) {
        return '';
    }
    
    if (commands[cmd]) {
        if (cmd === 'exit') {
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
        if (cmd === 'clear') {
            output.innerHTML = '';
            return '';
        }
        
        const commandFunc = commands[cmd];
        if (typeof commandFunc === 'function') {
            if (cmd === 'help' || cmd === 'about' || cmd === 'skills' || cmd === 'projects' || 
                cmd === 'contact' || cmd === 'pwd' || cmd === 'whoami' || cmd === 'date') {
                return commandFunc();
            }
            return commandFunc(args);
        }
        return commandFunc();
    } else {
        return `<span class="error">❌ Команда "${command}" не найдена.</span>
<span class="info">Введите <span class="command-hint">help</span> для списка доступных команд.</span>`;
    }
}

function getPrompt() {
    const path = currentPath === '~' ? '~' : currentPath;
    return `omar@terminal:${path}$`;
}

function updatePrompt() {
    const promptElements = document.querySelectorAll('.prompt');
    promptElements.forEach(el => {
        el.textContent = getPrompt() + ' ';
    });
    const titleElement = document.querySelector('.terminal-title');
    if (titleElement) {
        titleElement.textContent = getPrompt();
    }
}

function addOutput(command, result) {
    const commandLine = document.createElement('div');
    commandLine.className = 'command-line';
    commandLine.innerHTML = `<span class="command-prompt">${getPrompt()}</span> <span class="command-text">${command}</span>`;
    
    output.appendChild(commandLine);
    
    if (result) {
        setTimeout(() => {
            const resultLine = document.createElement('div');
            resultLine.className = 'output-text';
            resultLine.innerHTML = result;
            output.appendChild(resultLine);
            terminal.scrollTop = terminal.scrollHeight;
        }, 100);
    }
    
    updatePrompt();
    terminal.scrollTop = terminal.scrollHeight;
}

commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = commandInput.value;
        
        if (command.trim()) {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            
            const result = executeCommand(command);
            addOutput(command, result);
        }
        
        commandInput.value = '';
        
        if (command.trim().toLowerCase() === 'clear') {
            return;
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            commandInput.value = commandHistory[historyIndex];
        } else if (historyIndex === 0) {
            commandInput.value = commandHistory[0];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            commandInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            commandInput.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const input = commandInput.value.toLowerCase();
        const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
        if (matches.length === 1) {
            commandInput.value = matches[0];
        } else if (matches.length > 1) {
            const suggestions = matches.join(', ');
            addOutput(commandInput.value, `<span class="info">Возможные команды: ${suggestions}</span>`);
        }
    }
});

terminal.addEventListener('click', () => {
    commandInput.focus();
});

window.addEventListener('load', () => {
    updatePrompt();
    setTimeout(() => {
        commandInput.focus();
    }, 500);
});

commandInput.addEventListener('blur', () => {
    setTimeout(() => {
        if (document.activeElement !== commandInput) {
            commandInput.focus();
        }
    }, 100);
});

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (btn.classList.contains('btn-close')) {
            if (confirm('Закрыть терминал?')) {
                window.close();
            }
        } else if (btn.classList.contains('btn-minimize')) {
            terminal.style.display = terminal.style.display === 'none' ? 'block' : 'none';
        }
    });
});

