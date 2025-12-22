document.addEventListener('DOMContentLoaded', () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) projectsSection.style.display = 'block';

    const container = document.getElementById('product-list');
    if (!container) return;


    const staticProjects = [
        { name: "Mandalorian", img: "/images/product1.jpg", desc: "Товщина шару друку 0,03 мм" },
        { name: "машина DeLorean", img: "/images/product2.jpg", desc: "Може виконуватись у різних масштабах" },
        { name: "Top Gun: Maverich", img: "/images/product3.jpg", desc: "Товщина шару 0,03 мм" },
        { name: "Baby Yoda", img: "/images/product4.jpg", desc: "Фігурка до обробки та видалення підтримок" },
        { name: "Pegasus", img: "/images/product5.jpg", desc: "До розмальовування" },
        { name: "Harry Potter", img: "/images/product6.jpg", desc: "Підставка + фігура" },
        { name: "Harry Potter Owl", img: "/images/product7.jpg", desc: "Товщина шару 0,02 мм" },
        { name: "Doctor Liwsi", img: "/images/product8.jpg", desc: "Товщина шару 0,02 мм" },
        { name: "Афродіта", img: "/images/product9.jpg", desc: "Висота 25,5 см; без попереднього оброблення" }
    ];


    function createCard(p) {
        const card = document.createElement('div');
        card.className = 'bg-[#1c143f] rounded-2xl overflow-hidden shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 hover:-translate-y-4';
        card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="w-full h-80 object-cover">
      <div class="p-8 text-center">
        <h3 class="text-2xl font-bold text-white mb-3">${p.name}</h3>
        <p class="text-gray-400 text-sm">${p.desc}</p>
      </div>
    `;
        container.appendChild(card);
    }


    staticProjects.forEach(createCard);


    async function loadFromDB() {
        try {
            const response = await fetch('/projects');  // без localhost — работает везде
            if (!response.ok) throw new Error();
            const dbProjects = await response.json();

            dbProjects.forEach(p => {
                // Добавляем только если нет дубликата по имени
                if (!staticProjects.some(s => s.name === p.name)) {
                    createCard(p);
                }
            });
        } catch (err) {
            console.log('БД не доступна — показываем только статические проекты');
        }
    }

    loadFromDB();


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
                const res = await fetch('/contact/send', {  // без localhost
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone, email, description })
                });
                if (res.ok) {
                    successMsg.classList.add('show');
                    form.reset();
                    setTimeout(() => successMsg.classList.remove('show'), 5000);
                } else {
                    alert('Помилка відправки');
                }
            } catch {
                alert('Помилка відправки — сервер недоступний');
            } finally {
                btn.disabled = false;
                btn.textContent = txt;
            }
        });
    }


    const closeModal = () => {
        document.getElementById('contactModal')?.classList.add('hidden');
        document.body.style.overflow = '';
    };
    document.getElementById('closeModal')?.addEventListener('click', closeModal);
    document.getElementById('modalBg')?.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => e.key === 'Escape' && closeModal());
});