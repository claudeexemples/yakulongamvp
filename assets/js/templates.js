const templates = [
    {
        id: 1,
        name: "Landing Page",
        thumbnail: "../assets/img/template1.jpg",
        structure: [
            { type: "text", content: "Bem-vindo", x: 100, y: 50 },
            { type: "image", src: "../assets/img/placeholder.jpg", x: 100, y: 100 }
        ]
    },
    {
        id: 2,
        name: "Página de Contato",
        thumbnail: "../assets/img/template2.jpg",
        structure: [
            { type: "text", content: "Fale Conosco", x: 100, y: 50 },
            { type: "button", text: "Enviar Mensagem", x: 100, y: 150 }
        ]
    }
];

function loadTemplates() {
    const templateContainer = document.getElementById('templates');
    if (templateContainer) {
        templates.forEach(template => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card">
                    <img src="${template.thumbnail}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${template.name}</h5>
                        <button class="btn btn-primary btn-sm use-template" data-id="${template.id}">
                            Usar Template
                        </button>
                    </div>
                </div>
            `;
            templateContainer.appendChild(card);
        });
    }
}

document.addEventListener('DOMContentLoaded', loadTemplates);
