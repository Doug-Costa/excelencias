/* ==========================================================================
   Interactivity & WebGL 3D System - DentalPress Excelência
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialise Scroll Reveal Effect
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = window.innerHeight * 0.82;
            if (elementTop < revealPoint) {
                element.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 2. Sticky Header style addition on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Custom Luxurious Cursor follow logic
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followX = 0, followY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth movement for follower
    const updateFollower = () => {
        const ease = 0.15;
        followX += (mouseX - followX) * ease;
        followY += (mouseY - followY) * ease;
        
        follower.style.left = followX + 'px';
        follower.style.top = followY + 'px';
        
        requestAnimationFrame(updateFollower);
    };
    updateFollower();

    // Hover effect for interactive items
    const hoverElements = document.querySelectorAll('a, button, .bento-card, .video-placeholder, select, input');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    // 4. Mobile Menu toggle behavior
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Toggle mobile overlay styling if menu is active
        if (navMenu.classList.contains('active')) {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'fixed';
            navMenu.style.top = '70px';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.background = 'rgba(11, 12, 16, 0.95)';
            navMenu.style.padding = '2rem';
            navMenu.style.borderBottom = '1px solid var(--glass-border)';
        } else {
            navMenu.style.display = '';
        }
    });

    // 5. Magnetic CTA Button micro-interaction
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            // Pull the button towards the cursor
            btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // 6. Statistics Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const duration = 2000; // ms
            const stepTime = Math.abs(Math.floor(duration / target));
            
            const timer = setInterval(() => {
                if (target === 100) {
                    current += 1;
                    stat.textContent = current + '%';
                } else if (target === 25) {
                    current += 1;
                    stat.textContent = '+' + current;
                } else {
                    current += Math.ceil(target / 40);
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = '+' + current.toLocaleString('pt-BR');
                }
                
                if (current >= target) {
                    if (target === 100) stat.textContent = '100%';
                    else if (target === 25) stat.textContent = '+25';
                    else stat.textContent = '+' + target.toLocaleString('pt-BR');
                    clearInterval(timer);
                }
            }, Math.max(stepTime, 20));
        });
    };

    const statsSection = document.getElementById('autoridade');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedStats) {
                animateStats();
                animatedStats = true;
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) statsObserver.observe(statsSection);

    // 7. Course Details Modal Injection (SPA Feeling)
    const coursesData = {
        orto: {
            tag: 'ORTODONTIA - O CLÁSSICO',
            title: 'Excelência na Orto',
            desc: 'A formação premium definitiva em Ortodontia baseada em evidência científica, biomecânica e controle clínico total de casos simples e complexos.',
            duration: '18 meses (Encontros presenciais de 4 dias a cada dois meses)',
            level: 'Pós-Graduação / Especialização Avançada',
            focus: 'Biomecânica clínica, novos aparelhos, gestão de consultório.',
            highlights: [
                'Tradição de 25 anos moldando os melhores especialistas.',
                'Aulas presenciais intensivas em nossa sede de alta tecnologia.',
                'Fóruns de debate de casos clínicos e mentoria direta com os professores.'
            ]
        },
        alinhadores: {
            tag: 'TECNOLOGIA - O FUTURO DIGITAL',
            title: 'Excelência em Alinhadores',
            desc: 'Domine a Ortodontia Digital. Aprenda a planejar setups 3D, entender a biomecânica de plásticos termoformados e gerenciar fluxos digitais de ponta em consultório.',
            duration: '12 meses (Encontros modulares híbridos)',
            level: 'Avançado / Master',
            focus: 'Fluxo 3D digital, setup e modelagem de alinhadores, biomecânica com attachments.',
            highlights: [
                'Uso intensivo de scanners intraorais de última geração.',
                'Análise de softwares CAD de planejamento e biomecânica.',
                'Integração de alinhadores modernos na prática diária.'
            ]
        },
        elas: {
            tag: 'EXCLUSIVO - INOVAÇÃO E MULTIDISCIPLINARIDADE',
            title: 'Excelência Com Elas',
            desc: 'A formação que integra a excelência científica à visão multidisciplinar de ponta com foco em liderança feminina de impacto clínico e mercadológico.',
            duration: '10 meses (Imersão intensiva presencial)',
            level: 'Executive Master',
            focus: 'Prática multidisciplinar integrada, reabilitação estética, marca pessoal.',
            highlights: [
                'Conexão única e mentoria com as maiores expoentes femininas da odontologia.',
                'Foco em experiência do paciente, gestão humanizada e alto ticket.',
                'Ambiente intimista planejado para alta performance profissional.'
            ]
        },
        dtm: {
            tag: 'DISFUNÇÃO ARTICULAR - SAÚDE E PRECISÃO',
            title: 'Excelência em DTM',
            desc: 'Foco aprofundado no diagnóstico de desordens temporomandibulares, controle da dor orofacial e tratamento clínico integrado da articulação temporomandibular.',
            duration: '12 meses (Encontros presenciais)',
            level: 'Especialização Avançada',
            focus: 'Dores de cabeça tensionais, placas oclusais, anatomia da ATM, farmacologia.',
            highlights: [
                'Abordagem baseada nas diretrizes científicas mais atuais de dor orofacial.',
                'Confecção prática de placas miorrelaxantes e acompanhamento de pacientes reais.',
                'Diagnóstico diferencial complexo de dores crônicas cefálicas.'
            ]
        }
    };

    const bentoCards = document.querySelectorAll('.bento-card');
    const overlay = document.getElementById('courseOverlay');
    const overlayBody = document.getElementById('overlayBody');
    const closeOverlayBtn = document.getElementById('closeOverlayBtn');

    bentoCards.forEach(card => {
        card.addEventListener('click', () => {
            const courseKey = card.getAttribute('data-course');
            const data = coursesData[courseKey];
            if (!data) return;

            // Inject template dynamically
            overlayBody.innerHTML = `
                <div class="overlay-header">
                    <span class="overlay-tag">${data.tag}</span>
                    <h3 class="overlay-title">${data.title}</h3>
                </div>
                <div class="overlay-body-grid">
                    <div class="overlay-text-rich">
                        <h4>Apresentação do Programa</h4>
                        <p>${data.desc}</p>
                        
                        <h4>Destaques do Curso</h4>
                        <ul class="card-features" style="margin-bottom: 2rem;">
                            ${data.highlights.map(item => `<li><i class="fa-solid fa-check" style="color:var(--color-gold);"></i> ${item}</li>`).join('')}
                        </ul>
                        
                        <a href="#aplicacao" class="btn btn-primary close-to-apply" style="margin-top: 1rem;">Quero me candidatar</a>
                    </div>
                    <div>
                        <div class="overlay-meta-card">
                            <div class="meta-item">
                                <div class="meta-label">Duração</div>
                                <div class="meta-value">${data.duration}</div>
                            </div>
                            <div class="meta-item">
                                <div class="meta-label">Nível de Formação</div>
                                <div class="meta-value">${data.level}</div>
                            </div>
                            <div class="meta-item">
                                <div class="meta-label">Foco de Estudo</div>
                                <div class="meta-value">${data.focus}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Open overlay with animation
            overlay.classList.add('active');
            
            // Add handler inside dynamically rendered element
            const applyBtn = overlayBody.querySelector('.close-to-apply');
            applyBtn.addEventListener('click', () => {
                overlay.classList.remove('active');
                // Pre-select course in dropdown
                const selectElement = document.getElementById('course-select');
                if (selectElement) selectElement.value = courseKey;
            });
        });
    });

    closeOverlayBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    // Close on clicking outside of container
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });

    // 8. Application Form Submission
    const form = document.getElementById('applicationForm');
    const formSuccess = document.getElementById('formSuccess');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.style.display = 'none';
            formSuccess.style.display = 'block';
        });
    }

    // ==========================================================================
    // 9. WebGL 3D Interactive Scene - Three.js
    // ==========================================================================
    const canvas = document.getElementById('webgl-canvas');
    if (canvas) {
        const scene = new THREE.Scene();
        
        // Custom perspective Camera
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 12;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true // transparent background
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create stylized polygonal geometry representating a luxury element
        const geometry = new THREE.IcosahedronGeometry(3.5, 1); // stylized polygon structure
        
        // Luxury wireframe + points styling in Gold
        const material = new THREE.MeshBasicMaterial({
            color: 0xd4af37, // Champagne Gold color
            wireframe: true,
            transparent: true,
            opacity: 0.12
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Add matching dots on vertices
        const pointsMaterial = new THREE.PointsMaterial({
            color: 0xd4af37,
            size: 0.1,
            transparent: true,
            opacity: 0.4
        });
        const pointCloud = new THREE.Points(geometry, pointsMaterial);
        scene.add(pointCloud);

        // Resize behavior
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Mouse tracking for subtle 3D hover response
        let targetX = 0;
        let targetY = 0;
        document.addEventListener('mousemove', (event) => {
            targetX = (event.clientX - window.innerWidth / 2) * 0.0003;
            targetY = (event.clientY - window.innerHeight / 2) * 0.0003;
        });

        // Animation Loop
        const tick = () => {
            // Auto constant rotation
            mesh.rotation.y += 0.0015;
            mesh.rotation.x += 0.0008;
            pointCloud.rotation.y += 0.0015;
            pointCloud.rotation.x += 0.0008;

            // React to mouse
            mesh.rotation.y += (targetX - mesh.rotation.y) * 0.05;
            mesh.rotation.x += (targetY - mesh.rotation.x) * 0.05;
            pointCloud.rotation.y += (targetX - pointCloud.rotation.y) * 0.05;
            pointCloud.rotation.x += (targetY - pointCloud.rotation.x) * 0.05;

            // React to scroll height
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            mesh.position.y = -scrollPercent * 3.5;
            pointCloud.position.y = -scrollPercent * 3.5;

            renderer.render(scene, camera);
            requestAnimationFrame(tick);
        };
        tick();
    }
});
