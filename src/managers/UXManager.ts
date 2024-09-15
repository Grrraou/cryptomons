import { toast } from 'vue3-toastify';
class UXManager {

  static showSuccess(text: string) {
    toast.success(text);
  }

  static showError(text: string) {
    toast.error(text);
  }

  static showFlyingText(text: string, image: string|null = null, x: number|null = null, y: number|null = null) {
    const textElement = document.createElement('div');
    textElement.innerText = ` ${text}`;
          
    // Apply initial styles directly with JavaScript
    textElement.style.position = 'fixed';
    textElement.style.left = `${x}px`;
    textElement.style.top = `${y}px`;
    textElement.style.fontSize = '24px';
    textElement.style.fontWeight = 'bold';
    textElement.style.color = 'green';
    textElement.style.opacity = '1';
    textElement.style.pointerEvents = 'none';
    textElement.style.transition = 'transform 2s ease-out, opacity 2s ease-out';
    textElement.style.zIndex = '9999';
  
    if (image) {
      const imgElement = document.createElement('img');
      imgElement.src = image; 
      imgElement.style.width = '16px';
      imgElement.style.height = '16px'; 
      imgElement.style.marginLeft = '8px';
      textElement.appendChild(imgElement);
    }
        
    document.body.appendChild(textElement);
    textElement.offsetHeight;
    textElement.style.transform = 'translateY(-50px)';
    textElement.style.opacity = '0';

    setTimeout(() => {
      if (textElement && textElement.parentElement) {
        textElement.parentElement.removeChild(textElement);
      }
    }, 2000);
  }

  static showFlyingTextOnElement(text: string, image: string|null = null, elementId: string, randomness: number = 15) {
    const element = document.getElementById(elementId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const x = rect.left + Math.floor(Math.random() * (randomness - 1 + 1)) + 1;
      const y = rect.top + Math.floor(Math.random() * (randomness - 1 + 1)) + 1;
      this.showFlyingText(text, image, x, y);
    } 
  }
}

export default UXManager;
