document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('story-form');
    const loading = document.getElementById('loading');
    const storyContent = document.getElementById('story-content');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            loading.classList.remove('hidden');
            form.classList.add('opacity-50');

            const formData = {
                name: form.name.value,
                website: form.website.value,
                tagline: form.tagline.value
            };

            try {
                const response = await fetch('https://your-backend.onrender.com/api/generate-story', {  // Replace with actual Render URL
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('brandStory', data.story);
                    window.location.href = 'result.html';
                } else {
                    throw new Error(data.error || 'Failed to generate story');
                }
            } catch (error) {
                window.location.href = '/error';
            } finally {
                loading.classList.add('hidden');
                form.classList.remove('opacity-50');
            }
        });
    }

    if (storyContent) {
        const story = localStorage.getItem('brandStory');
        if (story) {
            storyContent.textContent = story;
            gsap.from(storyContent, { opacity: 0, y: 50, duration: 1, ease: 'power2.out' });
        } else {
            window.location.href = '/';
        }
    }
});