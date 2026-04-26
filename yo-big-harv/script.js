document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('custom-text');
    const dynamicText = document.getElementById('dynamic-text');
    const logoUrlInput = document.getElementById('logo-url');
    const logoImg = document.querySelector('.harvard-logo');
    const downloadBtn = document.getElementById('download-btn');
    const memeContainer = document.getElementById('meme-container');
    
    // Default text
    const defaultText = "yo big Harv.";

    // Real-time update
    input.addEventListener('input', (e) => {
        let val = e.target.value;
        if (val.trim() === '') {
            dynamicText.textContent = defaultText;
        } else {
            dynamicText.textContent = val;
        }
    });

    // Logo URL update
    logoUrlInput.addEventListener('input', (e) => {
        let val = e.target.value;
        if (val.trim() !== '') {
            logoImg.src = val;
        } else {
            // Default logo if empty
            logoImg.src = './logo.png';
        }
    });

    // Download Functionality
    downloadBtn.addEventListener('click', () => {
        const originalContent = downloadBtn.innerHTML;
        downloadBtn.innerHTML = 'Gerando...';
        downloadBtn.disabled = true;

        // Temporarily remove transform or any hover effects that might mess up canvas rendering
        const originalTransform = memeContainer.style.transform;
        memeContainer.style.transform = 'none';

        html2canvas(memeContainer, {
            scale: 2, // High resolution
            useCORS: true,
            backgroundColor: '#ffffff', // Ensures proper background
            logging: false
        }).then(canvas => {
            // Restore styling
            memeContainer.style.transform = originalTransform;

            // Trigger download
            const link = document.createElement('a');
            link.download = 'harvard-rejection-meme.png';
            link.href = canvas.toDataURL('image/png');
            link.click();

            // Revert Button
            downloadBtn.innerHTML = originalContent;
            downloadBtn.disabled = false;
        }).catch(err => {
            console.error("Erro ao gerar a imagem: ", err);
            alert("Ocorreu um erro ao baixar a imagem. Tente novamente.");
            
            // Revert
            memeContainer.style.transform = originalTransform;
            downloadBtn.innerHTML = originalContent;
            downloadBtn.disabled = false;
        });
    });
});
