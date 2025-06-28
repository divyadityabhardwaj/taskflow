// Main Application JavaScript for TaskFlow

class TaskFlowApp {
    constructor() {
        this.tasks = {
            todo: [],
            completed: [],
            archived: []
        };
        this.user = null;
        this.currentStage = 'todo'; // Track current active stage
        
        // DOM elements
        this.userNameElement = document.getElementById('userName');
        this.userAvatarElement = document.getElementById('userAvatar');
        this.signOutBtn = document.getElementById('signOutBtn');
        this.newTaskInput = document.getElementById('newTaskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.logoElement = document.querySelector('.logo h1');
        
        // Navigation elements
        this.navTabs = document.querySelectorAll('.nav-tab');
        
        // Task lists
        this.todoList = document.getElementById('todoList');
        this.completedList = document.getElementById('completedList');
        this.archivedList = document.getElementById('archivedList');
        
        // Counters
        this.todoCount = document.getElementById('todoCount');
        this.completedCount = document.getElementById('completedCount');
        this.archivedCount = document.getElementById('archivedCount');
        
        this.init();
    }
    
    init() {
        // Check authentication
        if (!this.checkAuth()) {
            window.location.href = 'index.html';
            return;
        }
        
        // Load user data
        this.loadUserData();
        
        // Load tasks from localStorage
        this.loadTasks();
        
        // Check if first visit and load dummy data
        this.checkFirstVisit();
        
        // Add event listeners
        this.addEventListeners();
        
        // Render tasks
        this.renderAllTasks();
        
        // Set initial active stage
        this.switchStage('todo');
    }
    
    checkAuth() {
        const userData = localStorage.getItem('taskflow_user');
        if (!userData) return false;
        
        try {
            this.user = JSON.parse(userData);
            return this.user.name && this.user.dateOfBirth;
        } catch (error) {
            console.error('Error parsing user data:', error);
            return false;
        }
    }
    
    loadUserData() {
        if (this.user) {
            this.userNameElement.textContent = this.user.name;
            this.loadUserAvatar();
        }
    }
    
    loadUserAvatar() {
        const userName = encodeURIComponent(this.user.name);
        const avatarUrl = `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${userName}`;
        
        this.userAvatarElement.src = avatarUrl;
    }
    
    loadTasks() {
        const savedTasks = localStorage.getItem('taskflow_tasks');
        if (savedTasks) {
            try {
                this.tasks = JSON.parse(savedTasks);
            } catch (error) {
                console.error('Error loading tasks:', error);
                this.tasks = { todo: [], completed: [], archived: [] };
            }
        }
    }
    
    saveTasks() {
        try {
            localStorage.setItem('taskflow_tasks', JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }
    
    async checkFirstVisit() {
        const hasVisited = localStorage.getItem('taskflow_has_visited');
        if (!hasVisited) {
            await this.loadDummyData();
            localStorage.setItem('taskflow_has_visited', 'true');
        }
    }
    
    async loadDummyData() {
        try {
            const response = await fetch('https://dummyjson.com/todos');
            const data = await response.json();
            
            if (data.todos && Array.isArray(data.todos)) {
                // Randomly select 5 unique tasks from the array (only on first visit)
                const shuffledTodos = [...data.todos].sort(() => Math.random() - 0.5);
                const selectedTodos = shuffledTodos.slice(0, 5);
                
                const dummyTasks = selectedTodos.map(todo => ({
                    id: this.generateId(),
                    title: todo.todo,
                    timestamp: new Date().toISOString(),
                    lastModified: new Date().toISOString()
                }));
                
                this.tasks.todo = dummyTasks;
                this.saveTasks();
                this.renderAllTasks();
            }
        } catch (error) {
            console.error('Error loading dummy data:', error);
            // Fallback dummy data
            const fallbackTasks = [
                { id: this.generateId(), title: 'Welcome to TaskFlow!', timestamp: new Date().toISOString(), lastModified: new Date().toISOString() },
                { id: this.generateId(), title: 'Create your first task', timestamp: new Date().toISOString(), lastModified: new Date().toISOString() },
                { id: this.generateId(), title: 'Organize your productivity', timestamp: new Date().toISOString(), lastModified: new Date().toISOString() }
            ];
            this.tasks.todo = fallbackTasks;
            this.saveTasks();
            this.renderAllTasks();
        }
    }
    
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    addEventListeners() {
        this.signOutBtn.addEventListener('click', () => this.signOut());
        this.addTaskBtn.addEventListener('click', () => this.addNewTask());
        this.newTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addNewTask();
            }
        });
        
        // Add logo click event
        if (this.logoElement) {
            this.logoElement.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
        
        // Add navigation tab event listeners
        this.navTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const stage = tab.dataset.stage;
                this.switchStage(stage);
            });
        });
    }
    
    switchStage(stage) {
        // Update current stage
        this.currentStage = stage;
        
        // Update navigation tabs
        this.navTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.stage === stage) {
                tab.classList.add('active');
            }
        });
        
        // Update task stages visibility
        const stages = ['todo', 'completed', 'archived'];
        stages.forEach(s => {
            const stageElement = document.getElementById(`${s}Stage`);
            if (s === stage) {
                stageElement.classList.add('active');
            } else {
                stageElement.classList.remove('active');
            }
        });
        
        // Update input placeholder based on current stage
        const placeholders = {
            todo: 'Add a new task...',
            completed: 'Add a completed task...',
            archived: 'Add a task to archive...'
        };
        this.newTaskInput.placeholder = placeholders[stage] || 'Add a new task...';
        
        // Focus on input field
        this.newTaskInput.focus();
    }
    
    signOut() {
        if (confirm('Are you sure you want to sign out?')) {
            localStorage.removeItem('taskflow_user');
            localStorage.removeItem('taskflow_tasks');
            localStorage.removeItem('taskflow_has_visited');
            window.location.href = 'index.html';
        }
    }
    
    addNewTask() {
        const taskTitle = this.newTaskInput.value.trim();
        
        if (!taskTitle) {
            this.showNotification('Please enter a task title', 'error');
            this.newTaskInput.focus();
            return;
        }
        
        const newTask = {
            id: this.generateId(),
            title: taskTitle,
            timestamp: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };
        
        // Add task to the beginning of the current stage array (top of list)
        this.tasks[this.currentStage].unshift(newTask);
        this.saveTasks();
        this.renderAllTasks();
        
        // Clear input
        this.newTaskInput.value = '';
        this.newTaskInput.focus();
        
        this.showNotification(`Task added to ${this.currentStage}!`, 'success');
    }
    
    moveTask(taskId, fromStage, toStage) {
        const taskIndex = this.tasks[fromStage].findIndex(task => task.id === taskId);
        
        if (taskIndex === -1) return;
        
        const task = this.tasks[fromStage][taskIndex];
        task.lastModified = new Date().toISOString();
        
        // Remove from current stage
        this.tasks[fromStage].splice(taskIndex, 1);
        
        // Add to new stage
        this.tasks[toStage].push(task);
        
        this.saveTasks();
        this.renderAllTasks();
        
        this.showNotification(`Task moved to ${toStage}`, 'success');
    }
    
    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    }
    
    createTaskCard(task, stage) {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.dataset.taskId = task.id;
        
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';
        
        const taskTitle = document.createElement('div');
        taskTitle.className = 'task-title';
        taskTitle.textContent = task.title;
        
        const taskTimestamp = document.createElement('div');
        taskTimestamp.className = 'task-timestamp';
        taskTimestamp.textContent = `Last modified: ${this.formatTimestamp(task.lastModified)}`;
        
        taskContent.appendChild(taskTitle);
        taskContent.appendChild(taskTimestamp);
        
        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';
        
        // Create action buttons based on stage
        if (stage === 'todo') {
            const completeBtn = this.createButton('Mark as Completed', 'btn-complete', () => {
                this.moveTask(task.id, 'todo', 'completed');
            });
            
            const archiveBtn = this.createButton('Archive', 'btn-archive', () => {
                this.moveTask(task.id, 'todo', 'archived');
            });
            
            taskActions.appendChild(completeBtn);
            taskActions.appendChild(archiveBtn);
        } else if (stage === 'completed') {
            const moveToTodoBtn = this.createButton('Move to Todo', 'btn-move-todo', () => {
                this.moveTask(task.id, 'completed', 'todo');
            });
            
            const archiveBtn = this.createButton('Archive', 'btn-archive', () => {
                this.moveTask(task.id, 'completed', 'archived');
            });
            
            taskActions.appendChild(moveToTodoBtn);
            taskActions.appendChild(archiveBtn);
        } else if (stage === 'archived') {
            const moveToTodoBtn = this.createButton('Move to Todo', 'btn-move-todo', () => {
                this.moveTask(task.id, 'archived', 'todo');
            });
            
            const moveToCompletedBtn = this.createButton('Move to Completed', 'btn-move-completed', () => {
                this.moveTask(task.id, 'archived', 'completed');
            });
            
            taskActions.appendChild(moveToTodoBtn);
            taskActions.appendChild(moveToCompletedBtn);
        }
        
        taskCard.appendChild(taskContent);
        taskCard.appendChild(taskActions);
        
        return taskCard;
    }
    
    createButton(text, className, onClick) {
        const button = document.createElement('button');
        button.className = `task-btn ${className}`;
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }
    
    renderTaskList(tasks, container, stage) {
        container.innerHTML = '';
        
        if (tasks.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <div class="empty-state-icon">📝</div>
                <p>No ${stage} tasks yet</p>
            `;
            container.appendChild(emptyState);
        } else {
            tasks.forEach(task => {
                const taskCard = this.createTaskCard(task, stage);
                container.appendChild(taskCard);
            });
        }
    }
    
    renderAllTasks() {
        this.renderTaskList(this.tasks.todo, this.todoList, 'todo');
        this.renderTaskList(this.tasks.completed, this.completedList, 'completed');
        this.renderTaskList(this.tasks.archived, this.archivedList, 'archived');
        
        // Update counters
        this.todoCount.textContent = this.tasks.todo.length;
        this.completedCount.textContent = this.tasks.completed.length;
        this.archivedCount.textContent = this.tasks.archived.length;
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;
        
        // Set background color based on type
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            info: '#3498db'
        };
        notification.style.background = colors[type] || colors.info;
        
        notification.textContent = message;
        
        // Add animation CSS if not already present
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TaskFlowApp();
}); 