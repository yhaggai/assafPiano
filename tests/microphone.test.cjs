const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync(require('node:path').join(__dirname,'../dist/index.html'),'utf8');
const context={};
vm.createContext(context);
vm.runInContext(html.slice(html.indexOf('function detectPitch('),html.indexOf('const micOctave=')),context);
const midiFor=frame=>{const hz=context.detectPitch(frame,48000);assert.ok(hz,'a stable note is detected');return Math.round(69+12*Math.log2(hz/440));};
test('microphone preserves distinct low and high C in each selectable octave',()=>{
 for(const transpose of [12,0,-12])for(const target of [60,62,64,65,67,69,71,72]){
  const actual=target-transpose,f=440*2**((actual-69)/12);
  const samples=Float32Array.from({length:4096},(_,i)=>.15*Math.sin(2*Math.PI*f*i/48000)+.04*Math.sin(4*Math.PI*f*i/48000));
  assert.equal(context.microphoneLessonMidi(midiFor(samples),transpose),target);
 }
});
test('silence is ignored',()=>assert.equal(context.detectPitch(new Float32Array(4096),48000),null));
test('recorded C3–B3 scale maps to lesson C4–B4',{skip:!process.env.PIANO_SAMPLE},()=>{
 const b=fs.readFileSync(process.env.PIANO_SAMPLE);const samples=new Float32Array(b.buffer,b.byteOffset,b.length/4);
 for(const [start,target] of [[2.25,60],[3.5,62],[4.75,64],[5.75,65],[7,67],[8.25,69],[9.5,71]]){
  // Enough successive frames to satisfy the real microphone's 300 ms stability gate.
  for(let frame=0;frame<6;frame++){
   const offset=Math.round((start+frame*.065)*48000);
   assert.equal(context.microphoneLessonMidi(midiFor(samples.slice(offset,offset+4096)),12),target);
  }
 }
});
