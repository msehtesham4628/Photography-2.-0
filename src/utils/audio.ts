// Web Audio API ambient cinematic soundscape synthesizer
class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private intervalId: any = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);
      this.gainNode.connect(this.ctx.destination);

      // Warm cinematic pentatonic chord drone (D - A - D - F# - A)
      const frequencies = [146.83, 220.0, 293.66, 369.99, 440.0];
      this.oscillators = frequencies.map((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const oscGain = this.ctx!.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
        oscGain.gain.setValueAtTime(0.04 / (idx + 1), this.ctx!.currentTime);
        osc.connect(oscGain);
        oscGain.connect(this.gainNode!);
        osc.start();
        return osc;
      });

      this.isPlaying = true;
    } catch (e) {
      console.warn('AudioContext not allowed yet without user interaction', e);
    }
  }

  public stop() {
    if (!this.isPlaying) return;
    try {
      if (this.gainNode && this.ctx) {
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
        setTimeout(() => {
          this.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (e) {}
          });
          this.oscillators = [];
          if (this.ctx) {
            this.ctx.close();
            this.ctx = null;
          }
        }, 1100);
      }
    } catch (e) {}
    this.isPlaying = false;
  }
}

export const cinematicAudio = new CinematicAudioEngine();
