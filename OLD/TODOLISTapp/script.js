
let todos = {
    todo: [],
    doing: [],
    done: []
};

let isEditing = false;

let searchTerm = '';
let filterResponsible = '';
let filterStatus = '';

function formatDate(date) {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
    return d.toLocaleDateString('pt-BR');
}

function formatDateTime(date) {
    return new Date(date).toLocaleString('pt-BR');
}

function isOverdue(deadline) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    return deadlineDate < today;
}

function openModal(taskId, status) {
    const modal = document.getElementById('todoModal');
    const modalTitle = modal.querySelector('.modal-title');
    const subtasksList = document.querySelector('#subtasksList .subtask-list');
    subtasksList.innerHTML = '';

    if (taskId) {
        isEditing = true;
        const task = todos[status].find(t => t.id === taskId);
        if (task) {
            document.getElementById('newTodo').value = task.title;
            document.getElementById('responsible').value = task.responsible;
            document.getElementById('deadline').value = task.deadline.split('T')[0];
            document.getElementById('editingTaskId').value = taskId;
            document.getElementById('editingTaskStatus').value = status;
            modalTitle.textContent = 'Editar Tarefa';

            if (task.subtasks) {
                task.subtasks.forEach(subtask => {
                    const li = document.createElement('li');
                    li.className = 'subtask-item';
                    li.innerHTML = `
    <div class="subtask-input-group">
        <input type="text" class="search-input" style="flex: 1;" value="${subtask.text}">
        <input type="date" class="subtask-date" value="${subtask.deadline || ''}">
        <button class="subtask-delete" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
`;
                    subtasksList.appendChild(li);
                });
            }
        }
    } else {
        isEditing = false;
        document.getElementById('newTodo').value = '';
        document.getElementById('responsible').value = '';
        document.getElementById('deadline').value = '';
        document.getElementById('editingTaskId').value = '';
        document.getElementById('editingTaskStatus').value = '';
        modalTitle.textContent = 'Nova Tarefa';
    }

    modal.style.display = 'block';
    document.getElementById('newTodo').focus();
}
function closeModal() {
    document.getElementById('todoModal').style.display = 'none';
    isEditing = false;
}

function saveTask() {
    const title = document.getElementById('newTodo').value.trim();
    const responsible = document.getElementById('responsible').value.trim();
    const deadline = document.getElementById('deadline').value;
    const editingTaskId = document.getElementById('editingTaskId').value;
    const editingTaskStatus = document.getElementById('editingTaskStatus').value;

    if (title && responsible && deadline) {
        if (isEditing && editingTaskId) {
            const taskIndex = todos[editingTaskStatus].findIndex(t => t.id === parseInt(editingTaskId));
            if (taskIndex !== -1) {
                todos[editingTaskStatus][taskIndex] = {
                    ...todos[editingTaskStatus][taskIndex],
                    title,
                    responsible,
                    deadline,
                };
            }
        } else {
            const todo = {
                id: Date.now(),
                title,
                responsible,
                deadline,
                createdAt: new Date().toISOString(),
                completedAt: null
            };
            todos.todo.push(todo);
        }

        saveToLocalStorage();
        closeModal();
        renderLists();
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

function deleteTask(id, status) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        todos[status] = todos[status].filter(todo => todo.id !== id);
        saveToLocalStorage();
        renderLists();
    }
}

let isDoneListCollapsed = false;

function toggleDoneList() {
    const doneList = document.getElementById('doneList');
    const accordionIcon = document.querySelector('.accordion-icon');
    const taskCount = document.querySelector('.task-count');

    isDoneListCollapsed = !isDoneListCollapsed;

    if (isDoneListCollapsed) {
        doneList.classList.remove('expanded');
        doneList.classList.add('collapsed');
        accordionIcon.classList.add('collapsed');
    } else {
        doneList.classList.remove('collapsed');
        doneList.classList.add('expanded');
        accordionIcon.classList.remove('collapsed');
    }
}

let currentSortBy = 'none';
let isAscending = true;

function updateSort() {
    currentSortBy = document.getElementById('sortBy').value;
    sortTodos();
    renderLists();
}

function toggleSortDirection() {
    isAscending = !isAscending;
    document.getElementById('sortDirection').textContent = isAscending ? '↓' : '↑';
    if (currentSortBy !== 'none') {
        sortTodos();
        renderLists();
    }
}

function sortTodos() {
    if (currentSortBy === 'none') return;

    const sortFunction = (a, b) => {
        let comparison = 0;

        switch (currentSortBy) {
            case 'deadline':
                comparison = new Date(a.deadline) - new Date(b.deadline);
                break;
            case 'responsible':
                comparison = a.responsible.localeCompare(b.responsible);
                break;
            case 'title':
                comparison = a.title.localeCompare(b.title);
                break;
        }

        return isAscending ? comparison : -comparison;
    };

    todos.todo.sort(sortFunction);
    todos.doing.sort(sortFunction);
    todos.done.sort(sortFunction);
}


function renderLists() {
    if (currentSortBy !== 'none') {
        sortTodos();
    }

    ['todo', 'doing', 'done'].forEach(status => {
        const list = document.getElementById(`${status}List`);
        list.innerHTML = '';

        const filteredTodos = filterTasks(todos[status]);
        const taskCount = list.closest('.list').querySelector('.task-count');
        taskCount.textContent = filteredTodos.length;

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            const isTaskOverdue = isOverdue(todo.deadline) && status !== 'done';
            const hasSubtasks = todo?.subtasks?.length > 0;

            li.className = `todo-item ${isTaskOverdue ? 'overdue' : ''}`;
            li.draggable = true;
            li.dataset.id = todo.id;
            li.dataset.status = status;

            li.innerHTML = `
                <div class="todo-item-row">
                    <span class="todo-item-title">${todo.title}</span>
                    ${isTaskOverdue ? `<div class="todo-item-warning">⚠️ Atividade atrasada!</div>` : ''}
                    ${todo.completedAt ? `<div class="completion-date">✓ Concluído em: ${formatDateTime(todo.completedAt)}</div>` : ''}
                </div>
                <div class="todo-item-details">
                    <div class="todo-item-info">
                        <div>Responsável: ${todo.responsible}</div>
                        <div>Prazo: ${formatDate(todo.deadline)}</div>
                    </div>
                    <div class="todo-item-actions">
                        ${hasSubtasks ? `
                            <button class="toggle-subtasks-btn ${collapsedSubtasks.has(todo.id) ? 'collapsed' : ''}" 
                                    onclick="event.stopPropagation(); toggleSubtaskVisibility(${todo.id}, '${status}')">
                                <span class="toggle-icon">▼</span>
                                Subtarefas
                            </button>
                        ` : ''}
                        <button class="edit-btn" onclick="openModal(${todo.id}, '${status}')">Editar</button>
                        <button class="delete-btn" onclick="deleteTask(${todo.id}, '${status}')">Excluir</button>
                    </div>
                </div>
                ${renderSubtasks(todo.subtasks, todo.id, status)}`;

            if (todo.subtasks && todo.subtasks.length > 0 && collapsedSubtasks.has(todo.id)) {
                const subtaskList = li.querySelector(`.subtask-list[data-task-id="${todo.id}"]`);
                const toggleButton = subtaskList.previousElementSibling.querySelector('.toggle-subtasks');
                subtaskList.classList.add('hidden');
                toggleButton.classList.add('collapsed');
            }

            li.addEventListener('dragstart', handleDragStart);
            li.addEventListener('dragend', handleDragEnd);

            list.appendChild(li);
        });
    });
}

function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', JSON.stringify({
        id: parseInt(e.target.dataset.id),
        status: e.target.dataset.status
    }));
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.list').forEach(list => {
        list.classList.remove('dragover');
    });
}

function handleDragOver(e) {
    e.preventDefault();
    const list = e.target.closest('.list');
    if (list) {
        list.classList.add('dragover');
    }
}

function handleDragLeave(e) {
    const list = e.target.closest('.list');
    if (list) {
        list.classList.remove('dragover');
    }
}

function moveTask(id, fromStatus, toStatus) {
    const taskIndex = todos[fromStatus].findIndex(todo => todo.id === id);
    if (taskIndex !== -1) {
        const task = todos[fromStatus].splice(taskIndex, 1)[0];

        if (toStatus === 'done' && !task.completedAt) {
            task.completedAt = new Date().toISOString();
        }
        if (toStatus !== 'done') {
            task.completedAt = null;
        }

        todos[toStatus].push(task);
        saveToLocalStorage();
        renderLists();
    }
}

function handleDrop(e) {
    e.preventDefault();

    const list = e.target.closest('.list');
    if (!list) return;

    list.classList.remove('dragover');

    try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const newStatus = list.dataset.status;

        if (data.status !== newStatus) {
            moveTask(data.id, data.status, newStatus);
        }
    } catch (error) {
        console.error('Erro ao mover a tarefa:', error);
    }
}

function initializeDragAndDrop() {
    document.querySelectorAll('.list').forEach(list => {
        list.addEventListener('dragover', handleDragOver);
        list.addEventListener('dragleave', handleDragLeave);
        list.addEventListener('drop', handleDrop);
    });
}

document.querySelectorAll('.list').forEach(list => {
    list.addEventListener('dragover', handleDragOver);
    list.addEventListener('dragleave', handleDragLeave);
    list.addEventListener('drop', handleDrop);
});

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    initializeDragAndDrop();

    ['todo', 'doing', 'done'].forEach(status => {
        const taskCount = document.querySelector(`.list[data-status="${status}"] .task-count`);
        taskCount.textContent = todos[status].length;
    });
});
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (['newTodo', 'responsible', 'deadline'].includes(activeElement.id)) {
            addTodo();
        }
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.getElementById('todoModal').style.display === 'block') {
        closeModal();
    }
});

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadFromLocalStorage() {
    const storedTodos = localStorage.getItem('todos');
    const storedCollapsedSubtasks = localStorage.getItem('collapsedSubtasks');

    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        document.getElementById('sortBy').value = currentSortBy;
        document.getElementById('sortDirection').textContent = isAscending ? '↓' : '↑';
        updateResponsibleFilter();
    }

    if (storedCollapsedSubtasks) {
        collapsedSubtasks = new Set(JSON.parse(storedCollapsedSubtasks));
    }

    renderLists();
}

function exportTodos() {
    const todosJSON = JSON.stringify(todos, null, 2);
    const blob = new Blob([todosJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importTodos(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const importedTodos = JSON.parse(e.target.result);
            if (validateTodosStructure(importedTodos)) {
                todos = importedTodos;
                saveToLocalStorage();
                renderLists();
                alert('Dados importados com sucesso!');
            } else {
                alert('Arquivo inválido. Por favor, selecione um arquivo de exportação válido.');
            }
        } catch (error) {
            alert('Erro ao importar arquivo. Verifique se o arquivo está no formato correto.');
            console.error('Erro na importação:', error);
        }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset file input
}

function validateTodosStructure(data) {
    if (!data || typeof data !== 'object') return false;
    if (!('todo' in data && 'doing' in data && 'done' in data)) return false;
    if (!Array.isArray(data.todo) || !Array.isArray(data.doing) || !Array.isArray(data.done)) return false;

    const validateTask = task => {
        return (
            task.hasOwnProperty('id') &&
            task.hasOwnProperty('title') &&
            task.hasOwnProperty('responsible') &&
            task.hasOwnProperty('deadline') &&
            task.hasOwnProperty('createdAt')
        );
    };

    return (
        data.todo.every(validateTask) &&
        data.doing.every(validateTask) &&
        data.done.every(validateTask)
    );
}

function updateResponsibleFilter() {
    const responsibleSelect = document.getElementById('filterResponsible');
    const responsibles = new Set();

    Object.values(todos).forEach(list => {
        list.forEach(todo => {
            responsibles.add(todo.responsible);
        });
    });

    responsibleSelect.innerHTML = '<option value="">Todos Responsáveis</option>';
    [...responsibles].sort().forEach(responsible => {
        const option = document.createElement('option');
        option.value = responsible;
        option.textContent = responsible;
        responsibleSelect.appendChild(option);
    });
}

function checkDueDate(deadline, filter) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);

    if (filter === 'dueToday') {
        return deadlineDate.getTime() === today.getTime();
    } else if (filter === 'dueWeek') {
        const weekFromNow = new Date(today);
        weekFromNow.setDate(today.getDate() + 7);
        return deadlineDate >= today && deadlineDate <= weekFromNow;
    }
    return true;
}

function filterTasks(tasks) {
    return tasks.filter(todo => {
        const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            todo.responsible.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesResponsible = !filterResponsible || todo.responsible === filterResponsible;
        let matchesStatus = true;

        if (filterStatus === 'overdue') {
            matchesStatus = isOverdue(todo.deadline);
        } else if (filterStatus === 'dueToday' || filterStatus === 'dueWeek') {
            matchesStatus = checkDueDate(todo.deadline, filterStatus);
        }

        return matchesSearch && matchesResponsible && matchesStatus;
    });
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderLists();
});

document.getElementById('filterResponsible').addEventListener('change', (e) => {
    filterResponsible = e.target.value;
    renderLists();
});

document.getElementById('filterStatus').addEventListener('change', (e) => {
    filterStatus = e.target.value;
    renderLists();
});

function updateTodoStructure(todo) {
    if (todo.subtasks) {
        todo.subtasks = todo.subtasks.map(subtask => ({
            ...subtask,
            completedAt: subtask.completed ? (subtask.completedAt || new Date().toISOString()) : null,
            order: subtask.order || 0
        }));
    }
    return todo;
}

function renderSubtasks(subtasks, taskId, status) {
    if (!subtasks || subtasks.length === 0) {
        return '';
    }

    // Sort subtasks by order
    const sortedSubtasks = [...subtasks].sort((a, b) => a.order - b.order);
    const isCollapsed = collapsedSubtasks.has(taskId);
    const containerClass = isCollapsed ? 'subtasks-container collapsed' : 'subtasks-container';
    const toggleClass = isCollapsed ? 'toggle-subtasks collapsed' : 'toggle-subtasks';

    return `
<div class="${containerClass}" draggable="false">
<div class="subtasks-header" onclick="toggleSubtaskVisibility(${taskId}, '${status}')">
    <div class="subtasks-title">
        ${isCollapsed ? 'Subtarefas' : ''}
        <span class="subtasks-count">${getSubtaskCount(subtasks)}</span>
    </div>
    <button class="${toggleClass}">▼</button>
</div>
<ul class="subtask-list ${isCollapsed ? 'hidden' : ''}" data-task-id="${taskId}">
    ${sortedSubtasks.map((subtask, index) => {
        const isSubtaskOverdue = subtask.deadline && isOverdue(subtask.deadline);
        return `
            <li class="subtask-item" draggable="true" data-index="${index}" 
                ondragstart="handleSubtaskDragStart(event)" 
                ondragend="handleSubtaskDragEnd(event)"
                ondragover="handleSubtaskDragOver(event)"
                ondrop="handleSubtaskDrop(event)">
                <div class="subtask-content">
                    <span class="subtask-drag-handle">⋮⋮</span>
                    <input 
                        type="checkbox" 
                        class="subtask-checkbox" 
                        ${subtask.completed ? 'checked' : ''} 
                        onchange="toggleSubtask(${taskId}, '${status}', ${index})"
                    >
                    <span class="subtask-text ${subtask.completed ? 'completed' : ''}">${subtask.text}</span>
                    ${subtask.deadline ? `
                        <span class="subtask-deadline ${isSubtaskOverdue ? 'overdue' : ''}">
                            ${isSubtaskOverdue ? '⚠️ ' : ''}${formatDate(subtask.deadline)}
                        </span>
                    ` : ''}
                    ${subtask.completedAt ? `
                        <span class="subtask-completed-date">
                            Concluído em: ${formatDateTime(subtask.completedAt)}
                        </span>
                    ` : ''}
                </div>
                <button class="subtask-delete" onclick="deleteSubtask(${taskId}, '${status}', ${index})">×</button>
            </li>
        `;
    }).join('')}
</ul>
</div>`;
}

let draggedSubtask = null;

function handleSubtaskDragStart(event) {
    draggedSubtask = event.target;
    event.target.classList.add('dragging');
    event.stopPropagation();
}

function handleSubtaskDragEnd(event) {
    event.target.classList.remove('dragging');
    event.stopPropagation();
}

function handleSubtaskDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
}

function handleSubtaskDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    const dropTarget = event.target.closest('.subtask-item');
    if (!dropTarget || !draggedSubtask || dropTarget === draggedSubtask) return;

    const taskId = parseInt(dropTarget.closest('.subtask-list').dataset.taskId);
    const status = dropTarget.closest('.list').dataset.status;
    const task = todos[status].find(t => t.id === taskId);

    if (!task || !task.subtasks) return;

    const fromIndex = parseInt(draggedSubtask.dataset.index);
    const toIndex = parseInt(dropTarget.dataset.index);

    // Update order values
    const subtask = task.subtasks.splice(fromIndex, 1)[0];
    task.subtasks.splice(toIndex, 0, subtask);

    // Reassign order values
    task.subtasks.forEach((subtask, index) => {
        subtask.order = index;
    });

    saveToLocalStorage();
    renderLists();
}


// Função para adicionar input de subtarefa no modal
function addSubtaskInput() {
    const subtasksList = document.querySelector('#subtasksList .subtask-list');
    const li = document.createElement('li');
    li.className = 'subtask-item';//style="flex: 1;"
    li.innerHTML = `
        <div class="subtask-input-group">
            <input type="text" class="search-input"  placeholder="Digite a subtarefa">
            <input type="date" class="subtask-date">
            <button class="subtask-delete" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    subtasksList.appendChild(li);
}

function toggleSubtask(taskId, status, subtaskIndex) {
    const task = todos[status].find(t => t.id === taskId);
    if (task && task.subtasks) {
        const subtask = task.subtasks[subtaskIndex];
        subtask.completed = !subtask.completed;
        subtask.completedAt = subtask.completed ? new Date().toISOString() : null;
        saveToLocalStorage();
        renderLists();
    }
}

function deleteSubtask(taskId, status, subtaskIndex) {
    const task = todos[status].find(t => t.id === taskId);
    if (task && task.subtasks) {
        task.subtasks.splice(subtaskIndex, 1);

        if (task.subtasks.length === 0) {
            delete task.subtasks;
        }

        saveToLocalStorage();
        renderLists();
    }
}

function saveTask() {
    const title = document.getElementById('newTodo').value.trim();
    const responsible = document.getElementById('responsible').value.trim();
    const deadline = document.getElementById('deadline').value;
    const editingTaskId = document.getElementById('editingTaskId').value;
    const editingTaskStatus = document.getElementById('editingTaskStatus').value;
    const subtaskInputs = document.querySelectorAll('#subtasksList .subtask-list .subtask-input-group');
    const subtasks = Array.from(subtaskInputs)
        .map(group => ({
            text: group.querySelector('input[type="text"]').value.trim(),
            deadline: group.querySelector('input[type="date"]').value,
        }))
        .filter(subtask => subtask.text !== '')
        .map(subtask => ({
            ...subtask,
            completed: false
        }));

    if (title && responsible && deadline) {
        if (isEditing && editingTaskId) {
            const taskIndex = todos[editingTaskStatus].findIndex(t => t.id === parseInt(editingTaskId));
            if (taskIndex !== -1) {
                const existingSubtasks = todos[editingTaskStatus][taskIndex].subtasks || [];
                const updatedSubtasks = subtasks.map(newSubtask => {
                    const existing = existingSubtasks.find(es => es.text === newSubtask.text);
                    return existing ? { ...existing, deadline: newSubtask.deadline } : newSubtask;
                });

                todos[editingTaskStatus][taskIndex] = {
                    ...todos[editingTaskStatus][taskIndex],
                    title,
                    responsible,
                    deadline,
                    subtasks: updatedSubtasks
                };
            }
        } else {
            const todo = {
                id: Date.now(),
                title,
                responsible,
                deadline,
                createdAt: new Date().toISOString(),
                completedAt: null,
                subtasks: subtasks.length > 0 ? subtasks : undefined
            };
            todos.todo.push(todo);
        }

        saveToLocalStorage();
        closeModal();
        renderLists();
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

function getSubtaskCount(subtasks) {
    if (!subtasks) return '0/0';
    const completed = subtasks.filter(s => s.completed).length;
    return `${completed}/${subtasks.length}`;
}

let collapsedSubtasks = new Set();

function toggleSubtaskVisibility(taskId, status) {
    const container = document.querySelector(`.subtask-list[data-task-id="${taskId}"]`).parentElement;
    const subtaskList = container.querySelector('.subtask-list');
    const toggleButton = container.querySelector('.toggle-subtasks');

    if (collapsedSubtasks.has(taskId)) {
        container.classList.remove('collapsed');
        subtaskList.classList.remove('hidden');
        toggleButton.classList.remove('collapsed');
        collapsedSubtasks.delete(taskId);
    } else {
        container.classList.add('collapsed');
        subtaskList.classList.add('hidden');
        toggleButton.classList.add('collapsed');
        collapsedSubtasks.add(taskId);
    }

    localStorage.setItem('collapsedSubtasks', JSON.stringify([...collapsedSubtasks]));
}

document.addEventListener('DOMContentLoaded', loadFromLocalStorage);
