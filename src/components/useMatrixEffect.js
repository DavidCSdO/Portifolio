import { useCallback, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789^#$%&';
const DURATION = 1000;
const STEPS = 10;

/**
 * useMatrixEffect
 *
 * Retorna dois handlers: onMouseEnter e onMouseLeave.
 * Passe-os para qualquer elemento que deva ter o efeito.
 *
 * @param {string} label  – texto original do link
 * @param {function} setText – setter do useState que controla o texto exibido
 */
export function useMatrixEffect(label, setText) {
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    // Cancela animação anterior caso o mouse entre novamente antes do fim
    if (intervalRef.current) clearInterval(intervalRef.current);

    let step = 0;

    intervalRef.current = setInterval(() => {
      step++;

      // Animação concluída: restaura o texto original
      if (step >= STEPS) {
        setText(label);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        return;
      }

      // Percentual de caracteres já revelados (esquerda → direita)
      const progress = step / STEPS;

      let result = '';
      for (let i = 0; i < label.length; i++) {
        if (i < label.length * progress) {
          // Posição revelada → letra correta
          result += label[i];
        } else {
          // Posição ainda embaralhada → caractere aleatório
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setText(result);
    }, DURATION / STEPS);
  }, [label, setText]);

  const stop = useCallback(() => {
    // Mouse saiu antes do fim → cancela e restaura imediatamente
    if (intervalRef.current) clearInterval(intervalRef.current);
    setText(label);
  }, [label, setText]);

  return { onMouseEnter: start, onMouseLeave: stop };
}
