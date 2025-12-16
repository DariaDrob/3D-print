document.addEventListener('DOMContentLoaded', () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) projectsSection.style.display = 'block';

    // Загружаем проекты с бэкенда
    async function renderProducts() {
        const container = document.getElementById('product-list');
        if (!container) return;

        container.innerHTML = '<p class="text-center text-2xl py-20 text-orange-300">Завантаження проектів...</p>';

        try {
            const response = await fetch('http://localhost:3000/projects');
            if (!response.ok) throw new Error('Сервер не отвечает');
            const projects = await response.json();

            container.innerHTML = '';

            projects.forEach(p => {
                const card = document.createElement('div');
                card.className = 'bg-[#1c143f] rounded-2xl overflow-hidden shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 hover:-translate-y-4';
                card.innerHTML = `
          <img src="${p.img.startsWith('http') ? p.img : 'http://localhost:3000' + p.img}" alt="${p.name}" class="w-full h-80 object-cover">
          <div class="p-8 text-center">
            <h3 class="text-2xl font-bold text-white mb-3">${p.name}</h3>
            <p class="text-gray-400 text-sm">${p.desc}</p>
          </div>
        `;
                container.appendChild(card);
            });
        } catch (err) {
            container.innerHTML = '<p class="text-center text-red-400 text-xl">Не вдалося завантажити проекти</p>';
        }
    }

    renderProducts();

    // Плавная прокрутка
    document.querySelectorAll('.navigation a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href === '#contact') {
                e.preventDefault();
                document.getElementById('contactModal').classList.remove('hidden');
                document.getElementById('contactModal').classList.add('flex');
                document.body.style.overflow = 'hidden';
                return;
            }
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 160,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Форма отправки
    const form = document.getElementById('consultForm');
    const successMsg = document.getElementById('successMsg');
    if (form) {
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const phone = form.phone.value.trim();
            const email = form.email.value.trim();
            const description = form.description.value.trim();
            const btn = form.querySelector('button');
            const txt = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Відправляємо...';

            try {
                const res = await fetch('http://localhost:3000/contact/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone, email, description })
                });
                if (res.ok) {
                    successMsg.classList.add('show');
                    form.reset();
                    setTimeout(() => successMsg.classList.remove('show'), 5000);
                }
            } catch {
                alert('Помилка відправки');
            } finally {
                btn.disabled = false;
                btn.textContent = txt;
            }
        });
    }

    // Модалка контактов
    const closeModal = () => {
        document.getElementById('contactModal')?.classList.add('hidden');
        document.body.style.overflow = '';
    };
    document.getElementById('closeModal')?.addEventListener('click', closeModal);
    document.getElementById('modalBg')?.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => e.key === 'Escape' && closeModal());
});