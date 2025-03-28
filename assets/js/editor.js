class Editor {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.elements = [];
        this.selectedElement = null;
        this.init();
    }

    init() {
        // Configura eventos de arrastar
        document.querySelectorAll('.draggable').forEach(item => {
            item.addEventListener('dragstart', this.dragStart.bind(this));
        });

        // Configura área de drop
        this.canvas.addEventListener('dragover', this.dragOver.bind(this));
        this.canvas.addEventListener('drop', this.drop.bind(this));

        // Botão de exportação
        document.getElementById('exportBtn')?.addEventListener('click', this.export.bind(this));

        // Carrega projeto salvo
        this.loadProject();
    }

    dragStart(e) {
        e.dataTransfer.setData('type', e.target.dataset.type);
    }

    dragOver(e) {
        e.preventDefault();
    }

    drop(e) {
        e.preventDefault();
        const type = e.dataTransfer.getData('type');
        this.createElement(type, e.clientX, e.clientY);
    }

    createElement(type, x, y) {
        const rect = this.canvas.getBoundingClientRect();
        const xPos = x - rect.left;
        const yPos = y - rect.top;

        const element = document.createElement('div');
        element.className = 'element';
        element.style.position = 'absolute';
        element.style.left = `${xPos}px`;
        element.style.top = `${yPos}px`;

        switch(type) {
            case 'text':
                element.contentEditable = true;
                element.innerHTML = 'Clique para editar texto';
                break;
            case 'image':
                element.innerHTML = `
                    <img src="../assets/img/placeholder.jpg" style="max-width: 200px;">
                    <div class="element-controls">×</div>
                `;
                break;
            case 'button':
                element.innerHTML = `
                    <button class="btn btn-primary">Botão</button>
                    <div class="element-controls">×</div>
                `;
                break;
        }

        // Adiciona controles
        element.querySelector('.element-controls')?.addEventListener('click', () => {
            element.remove();
            this.saveProject();
        });

        // Permite mover elementos
        element.draggable = true;
        element.addEventListener('dragstart', (e) => {
            this.selectedElement = element;
            e.dataTransfer.setData('moving', 'true');
        });

        this.canvas.appendChild(element);
        this.elements.push(element);
        this.saveProject();
    }

    saveProject() {
        const project = {
            elements: Array.from(this.canvas.children).map(el => ({
                html: el.outerHTML,
                x: el.style.left,
                y: el.style.top
            }))
        };
        localStorage.setItem('yakulonga-project', JSON.stringify(project));
    }

    loadProject() {
        const saved = localStorage.getItem('yakulonga-project');
        if (saved) {
            const project = JSON.parse(saved);
            project.elements.forEach(item => {
                const temp = document.createElement('div');
                temp.innerHTML = item.html;
                const element = temp.firstChild;
                element.style.left = item.x;
                element.style.top = item.y;
                
                // Reconfigura eventos
                element.querySelector('.element-controls')?.addEventListener('click', () => {
                    element.remove();
                    this.saveProject();
                });

                this.canvas.appendChild(element);
            });
        }
    }

    export() {
        const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Site Gerado no YaKulonga</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { padding: 20px; }
        .element { position: absolute; }
    </style>
</head>
<body>
    ${this.canvas.innerHTML}
</body>
</html>
        `;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'site-yakulonga.html';
        a.click();
    }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new Editor();
});
