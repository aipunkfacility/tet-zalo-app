import { describe, it, expect } from 'vitest';
import { buildNanoPrompt } from './prompt-builder';

describe('prompt-builder', () => {
    it('should generate a prompt for a man', () => {
        const attributes = { gender: 'man', age: 'adult' };
        const prompt = buildNanoPrompt(attributes);
        expect(prompt).toContain('man');
        expect(prompt).toContain('adult');
        expect(prompt).toContain('Act as a world-class art photographer');
    });

    it('should generate a prompt for an elderly woman', () => {
        const attributes = { gender: 'woman', age: 'elder' };
        const prompt = buildNanoPrompt(attributes);
        expect(prompt).toContain('woman');
        expect(prompt).toContain('elder');
        expect(prompt).toContain('Áo dài');
    });

    it('should generate a prompt for a child', () => {
        const attributes = { gender: 'man', age: 'child' };
        const prompt = buildNanoPrompt(attributes);
        expect(prompt).toContain('child');
        expect(prompt.toLowerCase()).toContain('man');
        expect(prompt.toLowerCase()).toContain('child');
    });
});
